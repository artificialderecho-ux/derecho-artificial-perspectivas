import type { Metadata } from "next";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { SectionLanding } from "@/components/SectionLanding";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Normativa",
  description:
    "Marco regulatorio completo sobre Inteligencia Artificial: AI Act, normativa europea y directrices de cumplimiento.",
  keywords: [
    "normativa IA",
    "AI Act",
    "Reglamento Europeo IA",
    "AESIA",
    "cumplimiento normativo",
    "directrices europeas",
    "estándares IA",
  ],
  alternates: {
    canonical: "/normativa",
    languages: {
      "es-ES": "/normativa",
      "en-US": "/en/legislation",
    },
  },
  openGraph: {
    type: "website",
    title: "Normativa",
    description:
      "Marco regulatorio completo sobre Inteligencia Artificial: AI Act, normativa europea y directrices de cumplimiento.",
    url: "/normativa",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

type NormativaItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  meta: string;
  dateMs: number;
  badge: string;
};

export default async function NormativaPage() {
  const resourceSlugs = await listSectionResourceSlugs("normativa");
  const resourceEntries = await Promise.all(
    resourceSlugs.map((slug) => getSectionResourceEntry("normativa", slug)),
  );
  const resolvedResourceEntries = resourceEntries.filter(
    (entry): entry is NonNullable<typeof entry> => Boolean(entry),
  );

  const mdxPosts = getAllPosts().filter((post) => {
    const section = (post.frontmatter.section || "").toLowerCase().trim();
    const category = (post.frontmatter.category || "").toLowerCase().trim();
    return (
      section === "normativa" ||
      category === "normativa" ||
      category === "legislación digital" ||
      category === "legislación internacional" ||
      category === "legislación" ||
      category === "legislación ia" ||
      category === "regulación ue"
    );
  });

  const mdxItems: NormativaItem[] = mdxPosts.map((post) => {
    const dateMs = new Date(post.frontmatter.date).getTime();
    return {
      id: `mdx-${post.slug}`,
      href: post.url,
      title: post.frontmatter.title,
      description: post.excerpt,
      meta: `${new Date(post.frontmatter.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })} · ${post.frontmatter.author || "Redacción"}`,
      dateMs,
      badge: "Normativa",
    };
  });

  const resourceItems: NormativaItem[] = resolvedResourceEntries.map((entry) => {
    const time = entry.dateMs ?? 0;
    const safeTime = Number.isNaN(time) ? 0 : time;
    const displayMs =
      entry.displayDateMs != null && !Number.isNaN(entry.displayDateMs)
        ? entry.displayDateMs
        : undefined;
    const date = displayMs != null ? new Date(displayMs) : null;
    const dateLabel =
      date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
        : null;

    const plainSummary = entry.summaryHtml ? entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "";

    const parts: string[] = [];
    if (dateLabel) parts.push(dateLabel);
    if (entry.sourceUrl) parts.push("Incluye descarga del documento original");

    return {
      id: `resource-${entry.slug}`,
      href: `/normativa/${entry.slug}`,
      title: entry.title,
      description: plainSummary,
      meta: parts.join(" · "),
      dateMs: displayMs ?? safeTime,
      badge: "Normativa",
    };
  });

  const items: NormativaItem[] = [...mdxItems, ...resourceItems].sort((a, b) => b.dateMs - a.dateMs);

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Normativa", url: "https://derechoartificial.com/normativa" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <SectionLanding
        title="Normativa"
        heroSrc="/images/heroes/normativa-ia-hero.webp"
        heroAlt="Normativa"
        description="Marco regulatorio completo sobre Inteligencia Artificial. Análisis detallado del AI Act, normativa europea y directrices de cumplimiento para profesionales del derecho."
        items={items}
      />
    </>
  );
}
