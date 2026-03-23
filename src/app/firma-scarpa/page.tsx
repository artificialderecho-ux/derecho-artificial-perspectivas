import type { Metadata } from "next";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { SectionLanding } from "@/components/SectionLanding";
import { getAllPosts } from "@/lib/mdx-utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Firma Scarpa",
  description:
    "Textos y análisis firmados por el responsable editorial sobre Derecho e Inteligencia Artificial.",
  keywords: [
    "Ricardo Scarpa",
    "derecho artificial",
    "análisis jurídico IA",
    "opinión jurídica",
    "regulación IA",
    "AI Act",
    "cumplimiento",
  ],
  alternates: {
    canonical: "/firma-scarpa",
    languages: {
      "es-ES": "/firma-scarpa",
      "en-US": "/en/scarpa-firm",
    },
  },
  openGraph: {
    type: "website",
    title: "Firma Scarpa",
    description:
      "Textos y análisis firmados por el responsable editorial sobre Derecho e Inteligencia Artificial.",
    url: "/firma-scarpa",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

type UnifiedItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  badge: string;
  meta: string;
  dateMs: number;
  displayDateMs?: number;
};

export default async function FirmaScarpaPage() {
  const slugs = await listContentSlugs("firma-scarpa");
  const entries = await Promise.all(slugs.map((slug) => getContentEntry("firma-scarpa", slug)));
  const resolvedEntries = entries.filter((entry): entry is ResolvedContentEntry => Boolean(entry));
  const sortedEntries = resolvedEntries.sort((a, b) => {
    const aTime = typeof a.dateMs === "number" ? a.dateMs : 0;
    const bTime = typeof b.dateMs === "number" ? b.dateMs : 0;
    return bTime - aTime;
  });

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const resourceSlugs = await listSectionResourceSlugs("firma-scarpa");
  const resourceEntries = await Promise.all(
    resourceSlugs.map((slug) => getSectionResourceEntry("firma-scarpa", slug)),
  );
  const resolvedResourceEntries = resourceEntries.filter(
    (entry): entry is ResourceEntry => Boolean(entry),
  );

  const mdxPosts = getAllPosts().filter(
    (post) =>
      post.frontmatter.category &&
      (post.frontmatter.category.toLowerCase().replace(/-/g, " ") === "firma scarpa" ||
        post.frontmatter.category.toLowerCase().replace(/-/g, " ") === "firma-scarpa" ||
        (post.frontmatter.section || "").toLowerCase() === "firma-scarpa"),
  );

  const mdxItems: UnifiedItem[] = mdxPosts.map((post) => {
    const dateMs = new Date(post.frontmatter.date).getTime();
    return {
      id: `mdx-${post.slug}`,
      href: post.url,
      title: post.frontmatter.title,
      description: post.excerpt,
      badge: "Análisis",
      meta: `${formatDate(post.frontmatter.date)} · ${post.frontmatter.author || "Ricardo Scarpa"}`,
      dateMs,
      displayDateMs: dateMs,
    };
  });

  const contentItems: UnifiedItem[] = sortedEntries.map((entry) => {
    const safeTime = typeof entry.dateMs === "number" && !Number.isNaN(entry.dateMs) ? entry.dateMs : 0;
    const displayMs = (() => {
      const d = new Date(entry.datePublished).getTime();
      return Number.isNaN(d) ? undefined : d;
    })();
    const parts: string[] = [];
    parts.push(formatDate(entry.datePublished));
    if (entry.author) parts.push(entry.author);
    return {
      id: `content-${entry.slug}`,
      href: entry.urlPath,
      title: entry.title,
      description: entry.description,
      badge: "Análisis",
      meta: parts.join(" · "),
      dateMs: safeTime,
      displayDateMs: displayMs,
    };
  });

  const resourceItems: UnifiedItem[] = resolvedResourceEntries.map((entry) => {
    const time = entry.dateMs ?? 0;
    const safeTime = Number.isNaN(time) ? 0 : time;
    const date =
      entry.displayDateMs != null && !Number.isNaN(entry.displayDateMs)
        ? new Date(entry.displayDateMs)
        : null;
    const dateLabel =
      date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
        : null;
    const plainSummary = entry.description || (entry.summaryHtml ? entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "");
    const parts: string[] = [];
    if (dateLabel) parts.push(dateLabel);
    if (entry.sourceUrl) parts.push("Incluye descarga del documento original");
    return {
      id: `resource-${entry.slug}`,
      href: `/firma-scarpa/${entry.slug}`,
      title: entry.title,
      description: plainSummary,
      badge: entry.slug === "caso-eeoc-v-itutorgroup" ? "Destacado" : "Análisis",
      meta: parts.join(" · "),
      dateMs: safeTime,
      displayDateMs: entry.displayDateMs ?? undefined,
    };
  });

  const items: UnifiedItem[] = [...mdxItems, ...contentItems, ...resourceItems].sort(
    (a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs),
  );

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Firma Scarpa", url: "https://derechoartificial.com/firma-scarpa" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <SectionLanding
        title="Firma Scarpa"
        heroSrc="/images/heroes/firma-scarpa-hero.webp"
        heroAlt="Firma Scarpa"
        description="Columna editorial y ensayos jurídicos bajo la firma de Ricardo Scarpa. Un espacio de reflexión profunda sobre la intersección entre tecnología y ley, abordando desde la ética del algoritmo hasta las implicaciones prácticas del Reglamento de IA en el sector legal."
        items={items}
      />
    </>
  );
}
