import { promises as fs } from "fs";
import path from "path";
import { load as cheerioLoad } from "cheerio";

const recursosBaseDir = path.join(process.cwd(), "public", "Recursos");

function slugifyBaseName(baseName) {
  return baseName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

async function exists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function listHtmlFiles(dir) {
  const results = [];
  async function walk(current) {
    let entries;
    try {
      entries = await fs.readdir(current, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile()) {
        const lower = entry.name.toLowerCase();
        if (lower.endsWith(".html")) {
          results.push(full);
        }
      }
    }
  }
  await walk(dir);
  return results;
}

function normalizeQuotes(text) {
  return text
    .replace(/&quot;|&#34;|“|”/g, '"')
    .replace(/&apos;|&#39;|‘|’/g, "'")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitleAndSummary(html) {
  const $ = cheerioLoad(html);
  const h1 = normalizeQuotes($("h1").first().text().trim());
  const docTitle = normalizeQuotes($("title").first().text().trim());
  const title = h1 || docTitle || "";
  const paragraphs = [];
  $("p").each((_, el) => {
    const t = normalizeQuotes($(el).text().trim());
    if (t) paragraphs.push(t);
  });
  const summary = paragraphs.slice(0, 3).join("\n\n");
  return { title, summary };
}

function htmlNodeToInlineMd($, el) {
  const node = $(el)[0];
  if (!node) return "";
  if (node.type === "text") {
    return normalizeQuotes($(el).text());
  }
  const tag = (node.tagName || "").toLowerCase();
  if (tag === "strong" || tag === "b") {
    return `**${htmlChildrenToInlineMd($, el)}**`;
  }
  if (tag === "em" || tag === "i") {
    return `*${htmlChildrenToInlineMd($, el)}*`;
  }
  if (tag === "code") {
    return `\`${normalizeQuotes($(el).text())}\``;
  }
  if (tag === "a") {
    const href = ($(el).attr("href") || "").trim();
    const text = htmlChildrenToInlineMd($, el) || normalizeQuotes($(el).text());
    if (href) return `[${text}](${href})`;
    return text;
  }
  return htmlChildrenToInlineMd($, el);
}

function htmlChildrenToInlineMd($, el) {
  const parts = [];
  $(el)
    .contents()
    .each((_, child) => {
      parts.push(htmlNodeToInlineMd($, child));
    });
  return parts.join("");
}

function blockToMarkdown($, el) {
  const tag = ($(el)[0]?.tagName || "").toLowerCase();
  if (tag === "h1") return `# ${normalizeQuotes($(el).text().trim())}`;
  if (tag === "h2") return `## ${normalizeQuotes($(el).text().trim())}`;
  if (tag === "h3") return `### ${normalizeQuotes($(el).text().trim())}`;
  if (tag === "h4") return `#### ${normalizeQuotes($(el).text().trim())}`;
  if (tag === "h5") return `##### ${normalizeQuotes($(el).text().trim())}`;
  if (tag === "h6") return `###### ${normalizeQuotes($(el).text().trim())}`;
  if (tag === "p") return normalizeQuotes(htmlChildrenToInlineMd($, el));
  if (tag === "blockquote") {
    const inner = normalizeQuotes($(el).text().trim());
    return inner
      .split(/\n+/)
      .map((l) => `> ${l.trim()}`)
      .join("\n");
  }
  if (tag === "pre") {
    const code = $(el).text().replace(/\r\n/g, "\n");
    return "```\n" + code + "\n```";
  }
  if (tag === "ul" || tag === "ol") {
    const ordered = tag === "ol";
    let i = 1;
    const lines = [];
    $(el)
      .children("li")
      .each((_, li) => {
        const text = normalizeQuotes(htmlChildrenToInlineMd($, li));
        const prefix = ordered ? `${i}. ` : `- `;
        lines.push(prefix + text);
        i += 1;
      });
    return lines.join("\n");
  }
  if (tag === "br") return "";
  // Fallback: flatten children paragraphs/spans
  const text = normalizeQuotes($(el).text().trim());
  return text;
}

function extractBodyMarkdown(html) {
  const $ = cheerioLoad(html);
  const root =
    $("main").length ? $("main") : $("article").length ? $("article") : $("body");
  const blocks = [];
  root.children().each((_, child) => {
    const tag = (child.tagName || "").toLowerCase();
    // Skip nav/header/footer/aside/script/style
    if (["nav", "header", "footer", "aside", "script", "style"].includes(tag)) return;
    const md = blockToMarkdown($, child);
    const clean = md.trim();
    if (clean) {
      blocks.push(clean);
    }
  });
  // Remove duplicate consecutive headings and empty lines
  const joined = blocks.join("\n\n").replace(/\n{3,}/g, "\n\n");
  return joined.trim();
}

function extractDateFromHtml(html) {
  const $ = cheerioLoad(html);
  // Try meta tags first
  const metaDate =
    $('meta[name="date"]').attr("content") ||
    $('meta[property="article:published_time"]').attr("content") ||
    $('time[datetime]').attr("datetime") ||
    "";
  const normalizedMeta = (metaDate || "").trim();
  if (normalizedMeta && /^\d{4}-\d{2}-\d{2}/.test(normalizedMeta)) {
    return normalizedMeta.slice(0, 10);
  }
  // Try visible "date: YYYY-MM-DD" patterns
  const text = $("body").text();
  const match = text.match(/date:\s*(\d{4}-\d{2}-\d{2})/i);
  if (match) return match[1];
  return "";
}

async function renameIfNeeded(fullPath, slug) {
  const dir = path.dirname(fullPath);
  const ext = path.extname(fullPath);
  const base = path.basename(fullPath, ext);
  const normalized = slugifyBaseName(base);
  if (normalized === slug) return fullPath;
  const target = path.join(dir, `${slug}${ext}`);
  if (target.toLowerCase() === fullPath.toLowerCase()) return fullPath;
  await fs.rename(fullPath, target);
  return target;
}

async function processHtmlFile(htmlPath) {
  const relative = path.relative(recursosBaseDir, htmlPath);
  const parts = relative.split(path.sep);
  if (parts.length < 2) return;
  const top = parts[0];
  const isAnalisis = top.toLowerCase() === "analisis";
  const isFuentes = top.toLowerCase() === "fuentes";
  if (!isAnalisis && !isFuentes) return;
  let html;
  try {
    html = await fs.readFile(htmlPath, "utf8");
  } catch {
    return;
  }
  const { title, summary } = extractTitleAndSummary(html);
  const baseName = path.basename(htmlPath, path.extname(htmlPath));
  const slugFromName = slugifyBaseName(baseName);
  const slug = slugFromName || (title ? slugifyBaseName(title) : slugifyBaseName("documento"));
  const renamedHtmlPath = await renameIfNeeded(htmlPath, slug);
  let mdTargetDir;
  if (isAnalisis) {
    mdTargetDir = path.dirname(renamedHtmlPath);
  } else {
    const subpath = parts.slice(1).join(path.sep);
    const analysisDir = path.join(recursosBaseDir, "Analisis", subpath ? path.dirname(subpath) : "");
    mdTargetDir = analysisDir;
  }
  await ensureDir(mdTargetDir);
  const mdPath = path.join(mdTargetDir, `${slug}.md`);
  const stat = await fs.stat(renamedHtmlPath).catch(() => null);
  const dateFromHtml = extractDateFromHtml(html);
  const fsDate =
    stat && stat.mtime instanceof Date ? new Date(stat.mtime).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  const dateIso = dateFromHtml || fsDate;
  const frontmatterLines = [];
  if (title) frontmatterLines.push(`title: "${title.replace(/"/g, '\\"')}"`);
  frontmatterLines.push(`date: ${dateIso}`);
  const bodyMd = extractBodyMarkdown(html);
  const mdContent = `${frontmatterLines.join("\n")}\n\n${bodyMd}\n`;
  const existsMd = await exists(mdPath);
  if (!existsMd) {
    await fs.writeFile(mdPath, mdContent, "utf8");
  }
  const sectionDir = parts[1] ? parts[1] : "";
  const fuentesDir =
    isAnalisis
      ? path.join(recursosBaseDir, "Fuentes", sectionDir)
      : path.dirname(renamedHtmlPath);
  const hasFuentesDir = await exists(fuentesDir);
  if (hasFuentesDir) {
    const entries = await fs.readdir(fuentesDir, { withFileTypes: true }).catch(() => []);
    const pdfs = entries.filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".pdf")).map((e) => e.name);
    if (pdfs.length > 0) {
      const candidate = pdfs.find((n) => slugifyBaseName(path.basename(n, path.extname(n))) === slug);
      if (candidate) {
        const currentPdfPath = path.join(fuentesDir, candidate);
        const targetPdfPath = path.join(fuentesDir, `${slug}.pdf`);
        if (path.basename(currentPdfPath).toLowerCase() !== path.basename(targetPdfPath).toLowerCase()) {
          try {
            await fs.rename(currentPdfPath, targetPdfPath);
          } catch {
          }
        }
      }
    }
  }
  return { htmlPath: renamedHtmlPath, mdPath };
}

async function main() {
  const htmlFiles = await listHtmlFiles(recursosBaseDir);
  const results = [];
  for (const file of htmlFiles) {
    const res = await processHtmlFile(file);
    if (res) results.push(res);
  }
  if (results.length === 0) {
    console.log("No se encontraron .html en public/Recursos para procesar.");
  } else {
    for (const r of results) {
      console.log(`Procesado: HTML=${path.relative(recursosBaseDir, r.htmlPath)} -> MD=${path.relative(recursosBaseDir, r.mdPath)}`);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
