import { promises as fs } from "fs";
import path from "path";
import { renderMarkdownToHtml } from "./content";

const recursosBaseDir = path.join(process.cwd(), "public", "Recursos");
const analisisDir = path.join(recursosBaseDir, "Analisis");
const fuentesDir = path.join(recursosBaseDir, "Fuentes");

export type ResourceSection = "normativa" | "jurisprudencia" | "guias" | "firma-scarpa" | "actualidad-ia";

type ResourceSectionConfig = {
  id: ResourceSection;
  analysisSubdir: string;
  fuentesSubdir: string;
  categoryLabel: string;
  basePath: string;
};

const SECTION_CONFIGS: ResourceSectionConfig[] = [
  {
    id: "normativa",
    analysisSubdir: "Normativa",
    fuentesSubdir: "Normativa",
    categoryLabel: "Normativa",
    basePath: "/normativa",
  },
  {
    id: "jurisprudencia",
    analysisSubdir: "Jurisprudencia",
    fuentesSubdir: "Jurisprudencia",
    categoryLabel: "Jurisprudencia",
    basePath: "/jurisprudencia",
  },
  {
    id: "guias",
    analysisSubdir: "Guias-y-Protocolos",
    fuentesSubdir: "Guias-y-Protocolos",
    categoryLabel: "Guías y Protocolos",
    basePath: "/recursos/guias",
  },
  {
    id: "firma-scarpa",
    analysisSubdir: "Firma-Scarpa",
    fuentesSubdir: "Firma-Scarpa",
    categoryLabel: "Firma Scarpa",
    basePath: "/firma-scarpa",
  },
  {
    id: "actualidad-ia",
    analysisSubdir: "actualidad-ia",
    fuentesSubdir: "actualidad-ia",
    categoryLabel: "Actualidad IA",
    basePath: "/actualidad-ia",
  },
];

function getSectionConfig(section: ResourceSection): ResourceSectionConfig {
  const config = SECTION_CONFIGS.find((c) => c.id === section);
  if (!config) {
    throw new Error(`Unknown resource section: ${section}`);
  }
  return config;
}

export type ResourceKind = "Article" | "Legislation" | "LegalDecision" | "NewsArticle";

export type ResourceEntry = {
  slug: string;
  title: string;
  summaryHtml: string;
  bodyHtml: string;
  kind: ResourceKind;
  sourceUrl: string | null;
  dateMs: number | null;
  jurisdiction?: string | null;
  courtName?: string | null;
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
          void 0;
        }
      }
    }

    return files;
  } catch {
    return [];
  }
}

async function getFileDateMs(filePath: string) {
  const markdown = await readTextFile(filePath);
  let frontmatterDate: number | null = null;

  if (markdown.startsWith("---")) {
    const endIndex = markdown.indexOf("\n---", 3);
    if (endIndex !== -1) {
      const frontmatterLines = markdown.slice(3, endIndex).split("\n");
      for (const line of frontmatterLines) {
        const match = line.match(/^date\s*:\s*(.+)$/i);
        if (match) {
          const date = new Date(match[1].trim());
          if (!Number.isNaN(date.getTime())) {
            frontmatterDate = date.getTime();
            break;
          }
        }
      }
    }
  }

  if (frontmatterDate != null) {
    return frontmatterDate;
  }

  try {
    const stats = await fs.stat(filePath);
    return stats.birthtimeMs || stats.ctimeMs || stats.mtimeMs;
  } catch {
    return Date.now();
  }
}

function extractFrontmatterField(markdown: string, field: string) {
  if (!markdown.startsWith("---")) {
    return "";
  }
  const endIndex = markdown.indexOf("\n---", 3);
  if (endIndex === -1) {
    return "";
  }
  const frontmatterLines = markdown.slice(3, endIndex).split("\n");
  const regex = new RegExp(`^${field}\\s*:\\s*(.+)$`, "i");
  for (const line of frontmatterLines) {
    const match = line.match(regex);
    if (match) {
      let value = match[1].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1).trim();
      }
      return value;
    }
  }
  return "";
}

function extractFrontmatterTitle(markdown: string) {
  return extractFrontmatterField(markdown, "title");
}

function inferTitleFromMarkdown(markdown: string) {
  const normalized = markdown.replace(/\r\n/g, "\n").trim();
  if (!normalized) {
    return "";
  }
  const lines = normalized.split("\n");
  const blockLines: string[] = [];
  for (const line of lines) {
    if (!line.trim()) {
      if (blockLines.length > 0) {
        break;
      }
      continue;
    }
    blockLines.push(line.trim());
  }
  if (blockLines.length === 0) {
    return "";
  }
  const joined = blockLines.join(" ");
  const withoutHeading = joined.replace(/^#+\s*/, "").trim();
  if (!withoutHeading) {
    return "";
  }
  const sentenceMatch = withoutHeading.match(/^(.+?[.!?])(\s|$)/);
  const sentence = sentenceMatch ? sentenceMatch[1] : withoutHeading;
  return sentence.replace(/\s+/g, " ").trim();
}

export async function listSectionResourceSlugs(section: ResourceSection): Promise<string[]> {
  const config = getSectionConfig(section);
  const sectionDir = path.join(analisisDir, config.analysisSubdir);
  try {
    const entries = await fs.readdir(sectionDir, { withFileTypes: true });
    const fileEntries = await Promise.all(
      entries
        .filter((entry) => {
          if (!entry.isFile()) return false;
          const lower = entry.name.toLowerCase();
          return lower.endsWith(".md") || lower.endsWith(".markdown") || lower.endsWith(".txt");
        })
        .map(async (entry) => {
          const filePath = path.join(sectionDir, entry.name);
          const dateMs = await getFileDateMs(filePath);
          const slug = slugifyBaseName(entry.name.replace(/\.[^/.]+$/, ""));
          return { slug, dateMs };
        }),
    );

    fileEntries.sort((a, b) => b.dateMs - a.dateMs);

    const seen = new Set<string>();
    const slugs: string[] = [];

    for (const item of fileEntries) {
      if (!item.slug || seen.has(item.slug)) continue;
      seen.add(item.slug);
      slugs.push(item.slug);
    }

    return slugs;
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
  dateMs: number | null;
  jurisdiction: string | null;
  courtName: string | null;
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
    const frontmatterTitle = extractFrontmatterTitle(markdown);
    const title =
      frontmatterTitle || inferTitleFromMarkdown(markdown) || inferTitleFromFileName(baseName);
    const jurisdiction = extractFrontmatterField(markdown, "jurisdiction");
    const courtName = extractFrontmatterField(markdown, "court");
    const sourceFileName = await findMatchingSourceFileName(baseName, entry.relativeDir || null);
    const dateMs = await getFileDateMs(filePath);
    return {
      slug,
      title,
      markdown,
      sourceFileName,
      dateMs: Number.isNaN(dateMs) ? null : dateMs,
      jurisdiction: jurisdiction || null,
      courtName: courtName || null,
    };
  }
  return null;
}

async function findMatchingSourceFileName(baseName: string, relativeDir: string | null) {
  const normalizedTarget = slugifyBaseName(baseName);
  const searchDirs: { base: string; prefix?: string }[] = [];

  if (relativeDir) {
    const sectionSubdir = path.join(fuentesDir, relativeDir);
    searchDirs.push({ base: sectionSubdir, prefix: relativeDir });
  }

  searchDirs.push({ base: fuentesDir });

  for (const dir of searchDirs) {
    try {
      const entries = await fs.readdir(dir.base, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isFile()) continue;
        const sourceBaseName = entry.name.replace(/\.[^/.]+$/, "");
        const normalizedSource = slugifyBaseName(sourceBaseName);
        if (normalizedSource === normalizedTarget) {
          if (dir.prefix) {
            return `${dir.prefix}/${entry.name}`;
          }
          return entry.name;
        }
      }
    } catch {
      void 0;
    }
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
    dateMs: raw.dateMs,
    jurisdiction: raw.jurisdiction,
    courtName: raw.courtName,
  };
}

type RawSectionAnalysis = {
  slug: string;
  title: string;
  markdown: string;
  sourceFileName: string | null;
  dateMs: number | null;
  jurisdiction: string | null;
  courtName: string | null;
};

async function resolveSectionRawAnalysis(section: ResourceSection, slug: string): Promise<RawSectionAnalysis | null> {
  const config = getSectionConfig(section);
  const sectionDir = path.join(analisisDir, config.analysisSubdir);
  try {
    const entries = await fs.readdir(sectionDir, { withFileTypes: true });
    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const lower = entry.name.toLowerCase();
      if (!lower.endsWith(".md") && !lower.endsWith(".markdown") && !lower.endsWith(".txt")) continue;
      const baseName = entry.name.replace(/\.[^/.]+$/, "");
      const fileSlug = slugifyBaseName(baseName);
      if (fileSlug !== slug) continue;
      const filePath = path.join(sectionDir, entry.name);
      const markdown = await readTextFile(filePath);
      const frontmatterTitle = extractFrontmatterTitle(markdown);
      const title =
        frontmatterTitle || inferTitleFromMarkdown(markdown) || inferTitleFromFileName(baseName);
      const jurisdiction = extractFrontmatterField(markdown, "jurisdiction");
      const courtName = extractFrontmatterField(markdown, "court");
      const sourceFileName = await findMatchingSourceFileName(baseName, config.fuentesSubdir);
      const dateMs = await getFileDateMs(filePath);
      return {
        slug,
        title,
        markdown,
        sourceFileName,
        dateMs: Number.isNaN(dateMs) ? null : dateMs,
        jurisdiction: jurisdiction || null,
        courtName: courtName || null,
      };
    }
  } catch {
    return null;
  }
  return null;
}

function kindForSection(section: ResourceSection): ResourceKind {
  if (section === "normativa") {
    return "Legislation";
  }
  if (section === "jurisprudencia") {
    return "LegalDecision";
  }
  if (section === "actualidad-ia") {
    return "NewsArticle";
  }
  return "Article";
}

export async function getSectionResourceEntry(
  section: ResourceSection,
  slug: string,
): Promise<ResourceEntry | null> {
  const raw = await resolveSectionRawAnalysis(section, slug);
  if (!raw) return null;
  const { summary, body } = splitSummaryAndBody(raw.markdown);
  const kind = kindForSection(section);
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
    dateMs: raw.dateMs,
    jurisdiction: raw.jurisdiction,
    courtName: raw.courtName,
  };
}
