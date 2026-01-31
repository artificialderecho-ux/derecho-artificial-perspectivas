import { promises as fs } from "fs";
import path from "path";

export type ContentSection = "actualidad-ia" | "firma-scarpa";

export type ContentEntry = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  author: string;
  body: string;
};

export type ResolvedContentEntry = ContentEntry & {
  urlPath: string;
  url: string;
  html: string;
};

const siteUrl = "https://derechoartificial.com";

function primaryContentDir(section: ContentSection) {
  return path.join(process.cwd(), "src", "content", section);
}

function legacyContentDir(section: ContentSection) {
  return path.join(process.cwd(), "content", section);
}

async function resolveContentDir(section: ContentSection) {
  try {
    await fs.access(primaryContentDir(section));
    return primaryContentDir(section);
  } catch {
    return legacyContentDir(section);
  }
}

async function readEntryFile(section: ContentSection, slug: string) {
  const fileName = `${slug}.json`;
  const primaryPath = path.join(primaryContentDir(section), fileName);
  const legacyPath = path.join(legacyContentDir(section), fileName);

  try {
    return await fs.readFile(primaryPath, "utf8");
  } catch {
    return await fs.readFile(legacyPath, "utf8");
  }
}

export async function listContentSlugs(section: ContentSection): Promise<string[]> {
  try {
    const dir = await resolveContentDir(section);
    const entries = await fs.readdir(dir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => entry.name.replace(/\.json$/, ""))
      .sort((a, b) => a.localeCompare(b, "es"));
  } catch {
    return [];
  }
}

function isValidEntry(value: unknown): value is Omit<ContentEntry, "slug"> {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.title === "string" &&
    typeof record.description === "string" &&
    typeof record.datePublished === "string" &&
    typeof record.author === "string" &&
    typeof record.body === "string"
  );
}

export async function getContentEntry(
  section: ContentSection,
  slug: string,
): Promise<ResolvedContentEntry | null> {
  try {
    const raw = await readEntryFile(section, slug);
    const parsed: unknown = JSON.parse(raw);
    if (!isValidEntry(parsed)) return null;

    const urlPath = `/${section}/${slug}`;

    return {
      slug,
      title: parsed.title,
      description: parsed.description,
      datePublished: parsed.datePublished,
      author: parsed.author,
      body: parsed.body,
      urlPath,
      url: `${siteUrl}${urlPath}`,
      html: renderMarkdownToHtml(parsed.body),
    };
  } catch {
    return null;
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatInline(value: string) {
  const escaped = escapeHtml(value);
  const withCode = escaped.replace(/`([^`]+)`/g, (_m, code: string) => `<code>${code}</code>`);
  const withBold = withCode.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  const withItalic = withBold.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  const withLinks = withItalic.replace(
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
    '<a href="$2" rel="noopener noreferrer">$1</a>',
  );

  return withLinks;
}

export function renderMarkdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");

  let html = "";
  let inCode = false;
  let codeLines: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let listItems: string[] = [];
  let inQuote = false;
  let quoteLines: string[] = [];

  const flushList = () => {
    if (!listType) return;
    html += `<${listType}>${listItems.map((li) => `<li>${li}</li>`).join("")}</${listType}>`;
    listType = null;
    listItems = [];
  };

  const flushQuote = () => {
    if (!inQuote) return;
    html += `<blockquote>${quoteLines.map((line) => `<p>${formatInline(line)}</p>`).join("")}</blockquote>`;
    inQuote = false;
    quoteLines = [];
  };

  const flushCode = () => {
    html += `<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`;
    inCode = false;
    codeLines = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      flushList();
      flushQuote();
      if (inCode) {
        flushCode();
      } else {
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      flushList();
      flushQuote();
      continue;
    }

    const blockquoteMatch = /^>\s*(.*)$/.exec(line);
    if (blockquoteMatch) {
      flushList();
      inQuote = true;
      quoteLines.push(blockquoteMatch[1].trim());
      continue;
    }

    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(line);
    if (headingMatch) {
      flushList();
      flushQuote();
      const level = headingMatch[1].length;
      const content = formatInline(headingMatch[2].trim());
      html += `<h${level}>${content}</h${level}>`;
      continue;
    }

    const imgMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line);
    if (imgMatch) {
      flushList();
      flushQuote();
      const alt = escapeHtml(imgMatch[1]);
      const src = escapeHtml(imgMatch[2]);
      html += `<figure class="my-8"><img src="${src}" alt="${alt}" class="rounded-lg w-full h-auto shadow-md" loading="lazy" /><figcaption class="text-center text-sm text-caption mt-2">${alt}</figcaption></figure>`;
      continue;
    }

    const ulMatch = /^[-*]\s+(.*)$/.exec(line);
    if (ulMatch) {
      const content = formatInline(ulMatch[1].trim());
      if (listType && listType !== "ul") flushList();
      listType = "ul";
      listItems.push(content);
      continue;
    }

    const olMatch = /^\d+\.\s+(.*)$/.exec(line);
    if (olMatch) {
      const content = formatInline(olMatch[1].trim());
      if (listType && listType !== "ol") flushList();
      listType = "ol";
      listItems.push(content);
      continue;
    }

    flushList();
    flushQuote();
    html += `<p>${formatInline(line.trim())}</p>`;
  }

  if (inCode) flushCode();
  flushQuote();
  flushList();

  return html;
}
