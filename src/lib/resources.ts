import { promises as fs } from "fs";
import path from "path";
import { renderMarkdownToHtml } from "./content";

const recursosBaseDir = path.join(process.cwd(), "public", "Recursos");
const analisisDir = path.join(recursosBaseDir, "Analisis");
const fuentesDir = path.join(recursosBaseDir, "Fuentes");

export type ResourceKind = "Article" | "Legislation";

export type ResourceEntry = {
  slug: string;
  title: string;
  summaryHtml: string;
  bodyHtml: string;
  kind: ResourceKind;
  sourceUrl: string | null;
};

function slugifyBaseName(baseName: string) {
  return baseName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function inferTitleFromFileName(fileName: string) {
  const withoutExt = fileName.replace(/\.[^/.]+$/, "");
  const withSpaces = withoutExt.replace(/[_-]+/g, " ").trim();
  return withSpaces;
}

function inferKindFromTitle(title: string): ResourceKind {
  const normalized = title.toLowerCase();
  const legislationKeywords = [
    "reglamento",
    "regulation",
    "ley",
    "act",
    "directiva",
    "directive",
  ];
  if (legislationKeywords.some((k) => normalized.includes(k))) {
    return "Legislation";
  }
  return "Article";
}

async function readTextFile(filePath: string) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return "";
  }
}

type AnalysisFile = {
  fileName: string;
  relativeDir: string;
};

async function listAnalysisFiles(): Promise<AnalysisFile[]> {
  try {
    const entries = await fs.readdir(analisisDir, { withFileTypes: true });
    const files: AnalysisFile[] = [];

    for (const entry of entries) {
      if (entry.isFile()) {
        const lower = entry.name.toLowerCase();
        if (lower.endsWith(".md") || lower.endsWith(".markdown") || lower.endsWith(".txt")) {
          files.push({ fileName: entry.name, relativeDir: "" });
        }
      } else if (entry.isDirectory()) {
        const subDirPath = path.join(analisisDir, entry.name);
        try {
          const subEntries = await fs.readdir(subDirPath, { withFileTypes: true });
          for (const subEntry of subEntries) {
            if (!subEntry.isFile()) continue;
            const lower = subEntry.name.toLowerCase();
            if (lower.endsWith(".md") || lower.endsWith(".markdown") || lower.endsWith(".txt")) {
              files.push({ fileName: subEntry.name, relativeDir: entry.name });
            }
          }
        } catch {
        }
      }
    }

    return files;
  } catch {
    return [];
  }
}

export async function listResourceSlugs(): Promise<string[]> {
  const files = await listAnalysisFiles();
  return files
    .map((entry) => slugifyBaseName(entry.fileName.replace(/\.[^/.]+$/, "")))
    .filter((slug, index, all) => slug && all.indexOf(slug) === index)
    .sort((a, b) => a.localeCompare(b, "es"));
}

type RawAnalysis = {
  slug: string;
  title: string;
  markdown: string;
  sourceFileName: string | null;
};

async function resolveRawAnalysisBySlug(slug: string): Promise<RawAnalysis | null> {
  const files = await listAnalysisFiles();
  for (const entry of files) {
    const baseName = entry.fileName.replace(/\.[^/.]+$/, "");
    const fileSlug = slugifyBaseName(baseName);
    if (fileSlug !== slug) continue;
    const filePath =
      entry.relativeDir === ""
        ? path.join(analisisDir, entry.fileName)
        : path.join(analisisDir, entry.relativeDir, entry.fileName);
    const markdown = await readTextFile(filePath);
    const title = inferTitleFromFileName(entry.fileName);
    const sourceFileName = await findMatchingSourceFileName(baseName);
    return {
      slug,
      title,
      markdown,
      sourceFileName,
    };
  }
  return null;
}

async function findMatchingSourceFileName(baseName: string) {
  try {
    const entries = await fs.readdir(fuentesDir, { withFileTypes: true });
    const normalizedTarget = slugifyBaseName(baseName);
    for (const entry of entries) {
      if (entry.isFile()) {
        const sourceBaseName = entry.name.replace(/\.[^/.]+$/, "");
        const normalizedSource = slugifyBaseName(sourceBaseName);
        if (normalizedSource === normalizedTarget) {
          return entry.name;
        }
      } else if (entry.isDirectory()) {
        const subDirPath = path.join(fuentesDir, entry.name);
        try {
          const subEntries = await fs.readdir(subDirPath, { withFileTypes: true });
          for (const subEntry of subEntries) {
            if (!subEntry.isFile()) continue;
            const sourceBaseName = subEntry.name.replace(/\.[^/.]+$/, "");
            const normalizedSource = slugifyBaseName(sourceBaseName);
            if (normalizedSource === normalizedTarget) {
              return `${entry.name}/${subEntry.name}`;
            }
          }
        } catch {
        }
      }
    }
  } catch {
    return null;
  }
  return null;
}

function splitSummaryAndBody(markdown: string) {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return { summary: "", body: "" };
  }
  const lines = normalized.split("\n");
  const summaryLines: string[] = [];
  let index = 0;
  while (index < lines.length && lines[index].trim()) {
    summaryLines.push(lines[index]);
    index += 1;
  }
  const summary = summaryLines.join("\n").trim();
  const body = lines.slice(index).join("\n").trim();
  return { summary, body };
}

export async function getResourceEntry(slug: string): Promise<ResourceEntry | null> {
  const raw = await resolveRawAnalysisBySlug(slug);
  if (!raw) return null;
  const { summary, body } = splitSummaryAndBody(raw.markdown);
  const kind = inferKindFromTitle(raw.title);
  const summaryHtml = summary ? renderMarkdownToHtml(summary) : "";
  const bodyHtml = body ? renderMarkdownToHtml(body) : "";
  const sourceUrl =
    raw.sourceFileName != null
      ? `/Recursos/Fuentes/${encodeURIComponent(raw.sourceFileName).replace(/%2F/g, "/")}`
      : null;
  return {
    slug,
    title: raw.title,
    summaryHtml,
    bodyHtml,
    kind,
    sourceUrl,
  };
}
