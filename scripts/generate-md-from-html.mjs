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

function extractTitleAndSummary(html) {
  const $ = cheerioLoad(html);
  const h1 = $("h1").first().text().trim();
  const docTitle = $("title").first().text().trim();
  const title = h1 || docTitle || "";
  const paragraphs = [];
  $("p").each((_, el) => {
    const t = $(el).text().trim();
    if (t) paragraphs.push(t);
  });
  const summary = paragraphs.slice(0, 3).join("\n\n");
  return { title, summary };
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
  const dateIso =
    stat && stat.mtime instanceof Date ? new Date(stat.mtime).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10);
  const frontmatterLines = [];
  if (title) frontmatterLines.push(`title: "${title.replace(/"/g, '\\"')}"`);
  frontmatterLines.push(`date: ${dateIso}`);
  const bodyLines = [];
  if (title) bodyLines.push(`# ${title}`);
  if (summary) bodyLines.push("", summary);
  const mdContent = `${frontmatterLines.join("\n")}\n\n${bodyLines.join("\n")}\n`;
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
