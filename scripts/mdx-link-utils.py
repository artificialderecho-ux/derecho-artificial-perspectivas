"""Utility functions for working safely with MDX content and links.

This module is designed to:
1) Load MDX files and split frontmatter/body.
2) Detect existing links (internal, glossary, institutional) to avoid duplicates.
3) Insert a new link inside a paragraph at a safe position.
4) Wrap the first mention of a term in link syntax.
5) Perform light-weight validation that result is still reasonably valid Markdown/MDX
   (e.g. not breaking code blocks or headings).

NOTE: This implementation is intentionally conservative and text-based, and does
not attempt to fully parse MDX/JSX. It focuses on common patterns in prose
paragraphs and avoids touching code blocks, headings, and existing links.

Minimal usage examples and tests are included in the __main__ section.
"""
from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, List, Optional, Tuple, Dict

FRONTMATTER_PATTERN = re.compile(r"^---\s*\n(.*?)\n---\s*\n(.*)$", re.DOTALL)

# Markdown link: [text](url)
MARKDOWN_LINK_PATTERN = re.compile(r"\[([^\]]+)\]\(([^)]+)\)")

# Inline code: `code` (we will avoid inserting links inside)
INLINE_CODE_PATTERN = re.compile(r"`[^`]*`")

# Code fences: ``` or ~~~ blocks
FENCED_CODE_BLOCK_PATTERN = re.compile(r"(^|\n)(```|~~~)[^\n]*\n.*?(\n\2[ \t]*$)", re.DOTALL)

# Headings: lines starting with one or more #
HEADING_PATTERN = re.compile(r"^\s*#{1,6} ", re.MULTILINE)


@dataclass
class FrontmatterAndBody:
    frontmatter: str
    body: str


def load_mdx_file(path: str | Path) -> FrontmatterAndBody:
    """Load an MDX file and return its frontmatter and body.

    If no frontmatter is present, frontmatter is returned as an empty string
    and the whole file becomes the body.
    """
    text = Path(path).read_text(encoding="utf-8")
    m = FRONTMATTER_PATTERN.match(text)
    if not m:
        return FrontmatterAndBody(frontmatter="", body=text)
    return FrontmatterAndBody(frontmatter=m.group(1).strip(), body=m.group(2))


@dataclass
class DetectedLinks:
    all_links: List[Tuple[str, str]]  # (text, url)
    internal: List[Tuple[str, str]]
    glossary: List[Tuple[str, str]]
    institutional: List[Tuple[str, str]]


INSTITUTIONAL_HOSTS = [
    "commission.europa.eu",
    "oecd.org",
    "coe.int",
    "edpb.europa.eu",
]


def detect_links(body: str, glossary_base: str = "/glosario") -> DetectedLinks:
    """Detect existing links in MDX body.

    - internal: links whose URL starts with "/" (site-relative) and is not a glossary link.
    - glossary: URLs starting with the given glossary_base (e.g. "/glosario" or "/recursos/glosario").
    - institutional: links pointing to known institutional domains.
    """
    all_links: List[Tuple[str, str]] = []
    internal: List[Tuple[str, str]] = []
    glossary: List[Tuple[str, str]] = []
    institutional: List[Tuple[str, str]] = []

    for text, url in MARKDOWN_LINK_PATTERN.findall(body):
        pair = (text, url)
        all_links.append(pair)
        if url.startswith(glossary_base):
            glossary.append(pair)
        elif url.startswith("/"):
            internal.append(pair)
        else:
            if any(host in url for host in INSTITUTIONAL_HOSTS):
                institutional.append(pair)

    return DetectedLinks(
        all_links=all_links,
        internal=internal,
        glossary=glossary,
        institutional=institutional,
    )


def _split_out_code_blocks(text: str) -> List[Tuple[str, str]]:
    """Split text into segments, marking which are code blocks.

    Returns a list of (kind, segment_text) where kind is "code" or "text".
    This allows us to avoid modifying code blocks when inserting links.
    """
    segments: List[Tuple[str, str]] = []
    pos = 0
    for m in FENCED_CODE_BLOCK_PATTERN.finditer(text):
        start, end = m.span()
        if start > pos:
            segments.append(("text", text[pos:start]))
        segments.append(("code", text[start:end]))
        pos = end
    if pos < len(text):
        segments.append(("text", text[pos:]))
    return segments


def _is_inside_inline_code(segment: str, index: int) -> bool:
    """Return True if index lies inside a `inline code` span within segment."""
    for m in INLINE_CODE_PATTERN.finditer(segment):
        if m.start() <= index < m.end():
            return True
    return False


def insert_link_in_paragraph(paragraph: str, insert_pos: int, text: str, url: str) -> str:
    """Insert a Markdown link in a paragraph at a safe position.

    The function will:
    - Clamp insert_pos within bounds.
    - Avoid inserting inside existing links or inline code.
    - Try to expand to whole-word boundaries for a more natural anchor.

    If it cannot find a safe place, it appends the link at the end preceded by a space.
    """
    if not paragraph.strip():
        return paragraph

    n = len(paragraph)
    insert_pos = max(0, min(insert_pos, n))

    # Avoid inserting inside existing markdown link syntax
    for m in MARKDOWN_LINK_PATTERN.finditer(paragraph):
        if m.start() <= insert_pos <= m.end():
            insert_pos = m.end()

    # Avoid inline code
    if _is_inside_inline_code(paragraph, insert_pos):
        # move right until outside or end
        idx = insert_pos
        while idx < n and _is_inside_inline_code(paragraph, idx):
            idx += 1
        insert_pos = idx

    # Try to use neighbouring word as anchor if possible
    # Find word boundaries around insert_pos
    left = insert_pos
    while left > 0 and paragraph[left - 1].isalnum():
        left -= 1
    right = insert_pos
    while right < n and paragraph[right].isalnum():
        right += 1

    anchor_text = text
    if right > left:  # we found a word
        word = paragraph[left:right]
        # Replace that word with link
        anchor_text = word
        before = paragraph[:left]
        after = paragraph[right:]
        link = f"[{anchor_text}]({url})"
        return before + link + after

    # Fallback: insert standalone link at insert_pos
    link = f"[{text}]({url})"
    return paragraph[:insert_pos] + link + paragraph[insert_pos:]


def link_first_term_occurrence(body: str, term: str, url: str, case_sensitive: bool = False) -> Tuple[str, bool]:
    """Wrap the first mention of `term` in the body with Markdown link syntax.

    - Skips fenced code blocks and headings.
    - Avoids replacing text inside existing links or inline code.
    - Returns (new_body, changed_flag).
    """
    if not term:
        return body, False

    term_pattern = re.escape(term)
    flags = 0 if case_sensitive else re.IGNORECASE
    regex = re.compile(term_pattern, flags)

    segments = _split_out_code_blocks(body)
    changed = False
    new_segments: List[str] = []

    for kind, segment in segments:
        if changed or kind == "code":
            new_segments.append(segment)
            continue

        # We also skip heading lines entirely to avoid messing with titles
        def replace_in_non_heading_lines(seg: str) -> str:
            nonlocal changed
            lines = seg.splitlines(keepends=True)
            out_lines: List[str] = []
            for line in lines:
                if changed:
                    out_lines.append(line)
                    continue
                if HEADING_PATTERN.match(line):
                    out_lines.append(line)
                    continue

                # Now perform a careful search within this line
                def _replacement(match: re.Match) -> str:
                    nonlocal changed
                    start, end = match.span()
                    # Skip if inside existing link or inline code
                    abs_start = start
                    abs_end = end
                    for m in MARKDOWN_LINK_PATTERN.finditer(line):
                        if m.start() <= abs_start < m.end():
                            return match.group(0)
                    for m in INLINE_CODE_PATTERN.finditer(line):
                        if m.start() <= abs_start < m.end():
                            return match.group(0)

                    changed = True
                    inner_text = match.group(0)
                    return f"[{inner_text}]({url})"

                new_line = regex.sub(_replacement, line, count=1)
                out_lines.append(new_line)
            return "".join(out_lines)

        new_segment = replace_in_non_heading_lines(segment)
        new_segments.append(new_segment)

    return "".join(new_segments), changed


def validate_mdx_sanity(text: str) -> Dict[str, object]:
    """Perform basic sanity checks that the MDX/Markdown still looks correct.

    This is *not* a full parser/validator. It checks for:
    - Balanced fenced code blocks (``` and ~~~).
    - No obvious unclosed [link]( markers.
    - Frontmatter (if present) is still at the top and well delimited.

    Returns a dict with boolean flags and warnings list.
    """
    warnings: List[str] = []

    # Check fenced code blocks balance by counting opening/closing markers
    def _check_fence(marker: str) -> bool:
        count = text.count(f"\n{marker}")
        # Very rough heuristic: should be even if used as fences.
        return count % 2 == 0

    fences_ok = _check_fence("```") and _check_fence("~~~")
    if not fences_ok:
        warnings.append("Unbalanced fenced code blocks detected (``` or ~~~)")

    # Check for obviously broken link syntax: '[' not followed by ']' or '('.
    broken_link_markers = False
    for m in re.finditer(r"\[", text):
        idx = m.start()
        # Ignore if it is an image ![ ...
        if idx > 0 and text[idx - 1] == "!":
            continue
        # If there is no closing ] later, suspicious
        if "]" not in text[idx + 1 :]:
            broken_link_markers = True
            break

    if broken_link_markers:
        warnings.append("Possible broken markdown link markers '[' without matching ']' detected")

    # Frontmatter position sanity (optional)
    if text.lstrip().startswith("---"):
        if FRONTMATTER_PATTERN.match(text) is None:
            warnings.append("Frontmatter start detected but could not parse cleanly")

    ok = not warnings
    return {"ok": ok, "warnings": warnings}


# Minimal inline tests / examples
if __name__ == "__main__":
    sample = """---
    title: "Ejemplo"
    ---

    Primer párrafo sobre el AI Act y sus obligaciones.

    Segundo párrafo con un término técnico como sistema de IA.

    ```ts
    const url = "https://example.com";
    ```
    """

    fm_body = load_mdx_file("dummy.mdx") if False else FrontmatterAndBody("title: x", sample)

    body = fm_body.body
    print("Original body:\n", body)

    # Detect links (none initially)
    det = detect_links(body)
    print("Detected links:", det)

    # Link first occurrence of "AI Act"
    new_body, changed = link_first_term_occurrence(body, "AI Act", "/ai-act")
    print("Changed?", changed)
    print("After term linking:\n", new_body)

    # Validate
    validation = validate_mdx_sanity(new_body)
    print("Validation:", validation)
