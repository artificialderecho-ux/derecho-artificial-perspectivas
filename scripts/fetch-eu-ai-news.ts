import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import Parser from "rss-parser";
import { load } from "cheerio";

type FeedSource = {
  name: string;
  url: string;
  keywords: string[];
  tags: string[];
};

type RawItem = {
  title: string;
  link: string;
  date: string;
  description: string;
  source: string;
  tags: string[];
  pdf: string;
  image: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");
const parser = new Parser();

const keywordPool = [
  "ai act",
  "inteligencia artificial",
  "reglamento ia",
  "regulation (eu) 2024/1689",
  "guía",
  "guia",
  "guideline",
  "aepd",
  "aesia",
  "euipo",
  "aesía",
  "supervision de la inteligencia artificial",
  "reglamento de ia",
];

const detectLanguage = (title: string, description: string): "es" | "en" | "other" => {
  const text = normalizeText(`${title} ${description}`.toLowerCase());
  const countMatches = (words: string[]) =>
    words.reduce((acc, word) => acc + (text.match(new RegExp(`\\b${word}\\b`, "g"))?.length ?? 0), 0);

  const esScore = countMatches([
    "el",
    "la",
    "los",
    "las",
    "de",
    "del",
    "y",
    "para",
    "datos",
    "proteccion",
    "privacidad",
    "agencia",
    "inteligencia",
  ]);

  const frScore = countMatches(["le", "les", "des", "dans", "droits", "effacement"]);

  if (esScore === 0) return "other";
  if (esScore > frScore) return "es";
  return "other";
};

const isAllowedLanguage = (title: string, description: string) => {
  const lang = detectLanguage(title, description);
  return lang === "es";
};

const feeds: FeedSource[] = [
  {
    name: "AEPD",
    url: "https://www.aepd.es/noticias/feed.xml",
    keywords: ["inteligencia artificial", "deepfake", "rgpd", "sancion", "proteccion de datos"],
    tags: ["aepd", "es"],
  },
];

const normalizeText = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");

const slugify = (value: string) =>
  normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const formatDate = (value: string | undefined) => {
  const d = value ? new Date(value) : new Date();
  if (Number.isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
  return d.toISOString().slice(0, 10);
};

const cleanText = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .replace(/<[^>]+>/g, "")
    .trim();

const isRelevant = (title: string, description: string) => {
  const haystack = `${title} ${description}`.toLowerCase();
  return keywordPool.some((kw) => haystack.includes(kw));
};

const detectPdf = (text: string, link?: string) => {
  const match = text.match(/https?:\/\/\S+\.pdf/gi);
  if (match?.length) return match[0];
  if (link && link.toLowerCase().endsWith(".pdf")) return link;
  return "";
};

const detectImage = (text: string) => {
  const match = text.match(/https?:\/\/\S+\.(png|jpg|jpeg|webp)/gi);
  if (match?.length) return match[0];
  return "";
};

const detectCategory = (title: string, description: string) => {
  const t = `${title} ${description}`.toLowerCase();
  if (t.includes("guía") || t.includes("guia") || t.includes("guideline") || t.includes("guide")) {
    return "guia";
  }
  return "noticia";
};

const enrichTags = (baseTags: string[], title: string, description: string) => {
  const tags = new Set(baseTags.map((t) => t.toLowerCase()));
  const t = `${title} ${description}`.toLowerCase();
  if (t.includes("ai act") || t.includes("regulation (eu) 2024/1689") || t.includes("reglamento ia")) {
    tags.add("ai-act");
  }
  if (t.includes("jurisprudencia")) tags.add("jurisprudencia");
  if (t.includes("guía") || t.includes("guia") || t.includes("guideline") || t.includes("guide")) {
    tags.add("guia");
  }
  return Array.from(tags);
};

const buildFrontmatter = (item: RawItem) => {
  const title = item.title.replace(/"/g, "'");
  const description = item.description.replace(/"/g, "'");
  const tags = item.tags.map((tag) => `"${tag}"`).join(", ");
  return `---\ntitle: "${title}"\ndate: "${item.date}"\ncategory: "${detectCategory(item.title, item.description)}"\ntags: [${tags}]\nsource: "${item.source}"\nurl: "${item.link}"\ndescription: "${description}"\npdf: "${item.pdf}"\nimage: "${item.image}"\n---\n\n${item.description}\n`;
};

const writeMdx = async (item: RawItem) => {
  await fs.mkdir(postsDir, { recursive: true });
  const slug = `${item.date}-${slugify(item.title)}`;
  const filePath = path.join(postsDir, `${slug}.mdx`);
  if (existsSync(filePath)) return;
  const content = buildFrontmatter(item);
  await fs.writeFile(filePath, content, "utf8");
};

const readFeed = async (source: FeedSource): Promise<RawItem[]> => {
  try {
    const feed = await parser.parseURL(source.url);
    const items = feed.items ?? [];
    return items
      .map((item) => {
        const title = cleanText(item.title || "");
        const description = cleanText(item.contentSnippet || item.content || "");
        const link = item.link || "";
        const date = formatDate(item.isoDate || item.pubDate);
        return {
          title,
          description,
          link,
          date,
          source: source.name,
          tags: enrichTags(source.tags, title, description),
          pdf: detectPdf(item.contentSnippet || item.content || "", link),
          image: detectImage(item.content || ""),
        };
      })
      .filter((item) => item.title && item.link)
      .filter((item) => isAllowedLanguage(item.title, item.description))
      .filter((item) => isRelevant(item.title, item.description) || source.keywords.some((k) => item.title.toLowerCase().includes(k)));
  } catch {
    return [];
  }
};

const readAesiaNews = async (): Promise<RawItem[]> => {
  try {
    const response = await fetch("https://aesia.digital.gob.es/es/actualidad");
    const html = await response.text();
    const $ = load(html);
    const items: RawItem[] = [];
    $("article, .views-row, .noticia, .news-item, .node--type-noticia").each((_, el) => {
      const title = cleanText($(el).find("a").first().text());
      const linkRaw = $(el).find("a").first().attr("href") || "";
      const link = linkRaw.startsWith("http") ? linkRaw : `https://www.aesia.gob.es${linkRaw}`;
      const dateText = cleanText($(el).find("time").attr("datetime") || $(el).find("time").text());
      const date = formatDate(dateText);
      const description = cleanText($(el).find("p").first().text());
      if (!title || !link) return;
      const image = $(el).find("img").first().attr("src") || "";
      items.push({
        title,
        description,
        link,
        date,
        source: "AESIA",
        tags: enrichTags(["aesia", "ue", "ia"], title, description),
        pdf: detectPdf(description, link),
        image,
      });
    });
    return items
      .filter((item) => isAllowedLanguage(item.title, item.description))
      .filter((item) => isRelevant(item.title, item.description));
  } catch {
    return [];
  }
};

const readEuDigitalNews = async (): Promise<RawItem[]> => {
  try {
    const response = await fetch("https://digital-strategy.ec.europa.eu/es/news");
    const html = await response.text();
    const $ = load(html);
    const items: RawItem[] = [];

    $("article, .ecl-list-item, .listing__item").each((_, el) => {
      const title = cleanText(
        $(el).find("h2, h3, .ecl-link, .listing__title").first().text(),
      );
      const linkRaw = $(el).find("a").first().attr("href") || "";
      const link = linkRaw.startsWith("http")
        ? linkRaw
        : `https://digital-strategy.ec.europa.eu${linkRaw}`;
      const dateText = cleanText($(el).find("time, .ecl-meta__item, .date").first().text());
      const date = formatDate(dateText);
      const description = cleanText(
        $(el).find("p, .listing__summary, .ecl-link__description").first().text(),
      );
      if (!title || !link) return;
      items.push({
        title,
        description,
        link,
        date,
        source: "EU Digital Strategy (ES)",
        tags: enrichTags(["ue", "digital-strategy"], title, description),
        pdf: detectPdf(description, link),
        image: detectImage(html),
      });
    });

    return items
      .filter((item) => isAllowedLanguage(item.title, item.description))
      .filter((item) => isRelevant(item.title, item.description));
  } catch {
    return [];
  }
};

const readEuipoNews = async (): Promise<RawItem[]> => {
  try {
    const response = await fetch("https://www.euipo.europa.eu/es/news-and-events/news");
    const html = await response.text();
    const $ = load(html);
    const items: RawItem[] = [];

    $("article, .card, .news, .o-layout__item").each((_, el) => {
      const title = cleanText(
        $(el).find("h2, h3, .title, .card-title").first().text(),
      );
      const linkRaw = $(el).find("a").first().attr("href") || "";
      const link = linkRaw.startsWith("http")
        ? linkRaw
        : `https://www.euipo.europa.eu${linkRaw}`;
      const dateText = cleanText($(el).find("time, .date").first().text());
      const date = formatDate(dateText);
      const description = cleanText($(el).find("p, .card-text").first().text());
      if (!title || !link) return;
      const image = $(el).find("img").first().attr("src") || detectImage(html);
      items.push({
        title,
        description,
        link,
        date,
        source: "EUIPO",
        tags: enrichTags(["ue", "euipo"], title, description),
        pdf: detectPdf(description, link),
        image,
      });
    });

    return items
      .filter((item) => isAllowedLanguage(item.title, item.description))
      .filter((item) => isRelevant(item.title, item.description));
  } catch {
    return [];
  }
};

const run = async () => {
  const feedItems = (await Promise.all(feeds.map(readFeed))).flat();
  const aesiaItems = await readAesiaNews();
  const [euDigitalItems, euipoItems] = await Promise.all([
    readEuDigitalNews(),
    readEuipoNews(),
  ]);
  const allItems = [...feedItems, ...aesiaItems, ...euDigitalItems, ...euipoItems];
  for (const item of allItems) {
    await writeMdx(item);
  }
};

run();
