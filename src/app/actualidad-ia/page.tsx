import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentPreviewGrid, type PreviewItem } from "@/components/ContentPreviewCard";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Actualidad IA",
  description: "Novedades diarias en regulación, jurisprudencia y guías prácticas sobre IA.",
  keywords: ["actualidad IA", "regulación IA", "jurisprudencia IA", "guías IA", "noticias IA"],
  alternates: {
    canonical: "/actualidad-ia",
    languages: {
      "es-ES": "/actualidad-ia",
      "en-US": "/en/ai-news",
    },
  },
  openGraph: {
    type: "website",
    title: "Actualidad IA",
    description: "Novedades diarias en regulación, jurisprudencia y guías prácticas sobre IA.",
    url: "/actualidad-ia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

const tabs = [
  { key: "todas", label: "Todas" },
  { key: "noticias", label: "Noticias" },
  { key: "guias", label: "Guías y Protocolos" },
];

const formatGuideTitle = (title: string) => {
  const normalized = title.trim().toLowerCase();
  if (
    normalized.startsWith("guía") ||
    normalized.startsWith("guia") ||
    normalized.startsWith("protocolo")
  ) {
    return title;
  }
  return `Guía publicada: ${title}`;
};

export default async function ActualidadIAPage({
  searchParams,
}: {
  searchParams?: { tab?: string };
}) {
  const tab = (searchParams?.tab || "todas").toLowerCase();
  const currentTab = tab === "noticias" || tab === "guias" ? tab : "todas";

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Actualidad IA", url: "https://derechoartificial.com/actualidad-ia" },
    ],
  });

  const guideSlugs = await listSectionResourceSlugs("guias");
  const guideEntries = await Promise.all(guideSlugs.map((slug) => getSectionResourceEntry("guias", slug)));
  const resolvedGuides = guideEntries.filter((entry): entry is ResourceEntry => Boolean(entry));

  const newsSlugs = await listSectionResourceSlugs("actualidad-ia");
  const newsEntries = await Promise.all(newsSlugs.map((slug) => getSectionResourceEntry("actualidad-ia", slug)));
  const resolvedNews = newsEntries.filter((entry): entry is ResourceEntry => Boolean(entry));

  const mdxPosts = getAllPosts();
  const mdxGuides = mdxPosts.filter(
    (p) =>
      p.frontmatter.category === "recursos" &&
      (p.frontmatter.subcategory === "guias" || p.frontmatter.tags?.includes("guias")),
  );
  const mdxNews = mdxPosts.filter(
    (p) => p.frontmatter.category === "actualidad-ia" || p.frontmatter.tags?.includes("noticia"),
  );

  const formatDateEs = (ms?: number | null) => {
    if (!ms || Number.isNaN(ms)) return null;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const guideItems: PreviewItem[] = [
    ...resolvedGuides.map((g) => {
      const dateLabel = formatDateEs(g.displayDateMs ?? g.dateMs);
      const parts: string[] = [];
      if (dateLabel) parts.push(dateLabel);
      if (g.sourceUrl) parts.push("Incluye descarga del documento");
      return {
        id: `guide-${g.slug}`,
        href: `/recursos/guias/${g.slug}`,
        title: formatGuideTitle(g.title),
        description: g.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 180),
        badge: "Guías y Protocolos",
        meta: parts.join(" · "),
        dateMs: g.dateMs ?? 0,
        displayDateMs: g.displayDateMs ?? undefined,
      };
    }),
    ...mdxGuides.map((p) => {
      const d = new Date(p.frontmatter.date).getTime();
      const dateLabel = formatDateEs(d);
      const parts: string[] = [];
      if (dateLabel) parts.push(dateLabel);
      if (p.frontmatter.author) parts.push(p.frontmatter.author);
      return {
        id: `mdx-guide-${p.slug}`,
        href: p.frontmatter.pdf || `/recursos/guias/${p.slug}`,
        title: formatGuideTitle(p.frontmatter.title),
        description: p.excerpt,
        badge: "Guías y Protocolos",
        meta: parts.join(" · "),
        dateMs: d || 0,
        displayDateMs: d || 0,
      };
    }),
  ].sort((a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs));

  const newsItems: PreviewItem[] = [
    ...resolvedNews.map((n) => {
      const dateLabel = formatDateEs(n.displayDateMs ?? n.dateMs);
      const parts: string[] = [];
      if (dateLabel) parts.push(dateLabel);
      if (n.sourceUrl) parts.push("Incluye documento original");
      return {
        id: `news-${n.slug}`,
        href: `/actualidad-ia/${n.slug}`,
        title: n.title,
        description: n.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 180),
        badge: "Noticias IA",
        meta: parts.join(" · "),
        dateMs: n.dateMs ?? 0,
        displayDateMs: n.displayDateMs ?? undefined,
      };
    }),
    ...mdxNews.map((p) => {
      const d = new Date(p.frontmatter.date).getTime();
      const dateLabel = formatDateEs(d);
      const parts: string[] = [];
      if (dateLabel) parts.push(dateLabel);
      if (p.frontmatter.author) parts.push(p.frontmatter.author);
      return {
        id: `mdx-news-${p.slug}`,
        href: p.url,
        title: p.frontmatter.title,
        description: p.excerpt,
        badge: "Noticias IA",
        meta: parts.join(" · "),
        dateMs: d || 0,
        displayDateMs: d || 0,
      };
    }),
  ].sort((a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs));

  const allItems: PreviewItem[] = [...newsItems, ...guideItems].sort(
    (a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs),
  );

  const items = currentTab === "guias" ? guideItems : currentTab === "noticias" ? newsItems : allItems;
  const currentLabel = tabs.find((t) => t.key === currentTab)?.label || "Todas";

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Actualidad IA", href: "/actualidad-ia" }]} />
      <LegalLayout
        title="Actualidad IA"
        category="Secciones"
        date={new Date().toISOString().slice(0, 10)}
        hero={
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/images/sections/recursos.jpg"
              alt="Actualidad IA"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <div className="max-w-3xl">
                <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
                  Actualidad IA
                </h1>
                <p className="text-base md:text-xl text-white/90 mt-4 drop-shadow-lg">
                  Novedades diarias en regulación, jurisprudencia y guías prácticas sobre IA.
                </p>
              </div>
            </div>
          </div>
        }
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-2 mb-8">
            {tabs.map((tabItem) => {
              const active = currentTab === tabItem.key;
              return (
                <Link
                  key={tabItem.key}
                  href={tabItem.key === "todas" ? "/actualidad-ia" : `/actualidad-ia?tab=${tabItem.key}`}
                  className={
                    active
                      ? "inline-flex items-center rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-medium"
                      : "inline-flex items-center rounded-full bg-slate-100 text-slate-700 px-4 py-2 text-sm font-medium hover:bg-slate-200"
                  }
                >
                  {tabItem.label}
                </Link>
              );
            })}
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">{currentLabel}</h2>
          {items.length > 0 ? (
            <ContentPreviewGrid items={items} columns={2} size="medium" />
          ) : (
            <div className="rounded-lg border border-divider bg-surface p-8 text-sm text-body">
              No hay entradas disponibles en esta pestaña.
            </div>
          )}
        </div>
      </LegalLayout>
    </>
  );
}
