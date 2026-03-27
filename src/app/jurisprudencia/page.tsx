import type { Metadata } from "next";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { SectionLanding } from "@/components/SectionLanding";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Jurisprudencia",
  description:
    "Selección y análisis de resoluciones relevantes sobre tecnología, datos e inteligencia artificial.",
  keywords: [
    "jurisprudencia IA",
    "derecho digital",
    "protección de datos",
    "RGPD",
    "decisiones judiciales",
    "algoritmos",
    "responsabilidad",
  ],
  alternates: {
    canonical: "/jurisprudencia",
    languages: {
      "es-ES": "/jurisprudencia",
      "en-US": "/en/jurisprudence",
    },
  },
  openGraph: {
    type: "website",
    title: "Jurisprudencia",
    description:
      "Selección y análisis de resoluciones relevantes sobre tecnología, datos e inteligencia artificial.",
    url: "/jurisprudencia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

type SentenciaItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  meta: string;
  dateMs: number;
  badge: string;
};

export default async function JurisprudenciaPage() {
  const resourceSlugs = await listSectionResourceSlugs("jurisprudencia");
  const resourceEntries = await Promise.all(
    resourceSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug)),
  );
  const resolvedResourceEntries = resourceEntries.filter(
    (entry): entry is NonNullable<typeof entry> => Boolean(entry),
  );

  const mdxPosts = getAllPosts().filter((post) => {
    const section = (post.frontmatter.section || "").toLowerCase().trim();
    const category = (post.frontmatter.category || "").toLowerCase().trim();
    return section === "jurisprudencia" || category === "jurisprudencia" || category === "jurisprudencia ia";
  });

  const mdxItems: SentenciaItem[] = mdxPosts.map((post) => {
    const dateMs = new Date(post.frontmatter.date).getTime();
    return {
      id: `mdx-${post.slug}`,
      href: post.url,
      title: post.frontmatter.title,
      description: post.excerpt,
      meta: `${new Date(post.frontmatter.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })} · ${post.frontmatter.author || "Ricardo Scarpa"}`,
      dateMs,
      badge: "Sentencia",
    };
  });

  const boscoDateString = "2026-01-30";
  const boscoTime = new Date(boscoDateString).getTime();
  const boscoItem: SentenciaItem = {
    id: "bosco",
    href: "/jurisprudencia/sentencia-bosco-transparencia-algoritmica",
    title: "Sentencia BOSCO: Transparencia Algorítmica y Código Fuente",
    description:
      "Análisis jurídico de la STS 1119/2025 que consolida el derecho de acceso al código fuente cuando un algoritmo determina prestaciones sociales.",
    meta: "STS 1119/2025 · 11 de septiembre de 2025",
    dateMs: Number.isNaN(boscoTime) ? 0 : boscoTime,
    badge: "Sentencia",
  };

  const resourceItems: SentenciaItem[] = resolvedResourceEntries.map((entry) => {
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
      href: `/jurisprudencia/${entry.slug}`,
      title: entry.title,
      description: plainSummary,
      meta: parts.join(" · "),
      dateMs: displayMs ?? safeTime,
      badge: "Sentencia",
    };
  });

  const items: SentenciaItem[] = [...mdxItems, boscoItem, ...resourceItems].sort((a, b) => b.dateMs - a.dateMs);

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Jurisprudencia", url: "https://derechoartificial.com/jurisprudencia" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <SectionLanding
        title="Jurisprudencia"
        heroSrc="/images/heroes/jurisprudencia-ia-hero.webp"
        heroAlt="Jurisprudencia"
        description="Repositorio crítico de resoluciones judiciales y administrativas que definen el Derecho de la IA. Analizamos sentencias que sientan precedente sobre transparencia algorítmica, responsabilidad civil y protección de derechos fundamentales en la era digital."
        items={items}
      />
    </>
  );
}
