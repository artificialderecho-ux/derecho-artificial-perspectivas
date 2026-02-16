import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { getAllPosts } from "@/lib/mdx-utils";
import { ContentPreviewGrid, type PreviewItem } from "@/components/ContentPreviewCard";

export const metadata: Metadata = {
  title: "Recursos IA",
  description: "Sección Recursos IA en desarrollo: incluye guías y noticias.",
  alternates: { canonical: "/recursos" },
  openGraph: {
    type: "website",
    title: "Recursos IA",
    description: "Sección Recursos IA en desarrollo: incluye guías y noticias.",
    url: "/recursos",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default async function RecursosPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Recursos IA", url: "https://derechoartificial.com/recursos" },
    ],
  });

  const guideSlugs = await listSectionResourceSlugs("guias");
  const guideEntries = await Promise.all(guideSlugs.map((slug) => getSectionResourceEntry("guias", slug)));
  const resolvedGuides = guideEntries.filter((e): e is NonNullable<typeof e> => Boolean(e));

  const newsSlugs = await listSectionResourceSlugs("actualidad-ia");
  const newsEntries = await Promise.all(newsSlugs.map((slug) => getSectionResourceEntry("actualidad-ia", slug)));
  const resolvedNews = newsEntries.filter((e): e is NonNullable<typeof e> => Boolean(e));

  const mdxPosts = getAllPosts();
  const mdxGuides = mdxPosts.filter(
    (p) => p.frontmatter.category === "recursos" && (p.frontmatter.subcategory === "guias" || p.frontmatter.tags?.includes("guias")),
  );
  const mdxNews = mdxPosts.filter((p) => p.frontmatter.category === "actualidad-ia" || p.frontmatter.tags?.includes("noticia"));

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
        title: g.title,
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
        href: `/recursos/guias/${p.slug}`,
        title: p.frontmatter.title,
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

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Recursos IA", href: "/recursos" }]} />
      <LegalLayout
        title="Recursos IA"
        category="Secciones"
        date={new Date().toISOString().slice(0, 10)}
        hero={
          <div className="relative w-full h-64 md:h-96">
            <Image
              src="/images/sections/recursos.jpg"
              alt="Recursos IA"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
                Recursos IA
              </h1>
            </div>
          </div>
        }
      >
        <div className="container mx-auto px-4 py-8">
          <p className="text-body">
            Sección Recursos IA en desarrollo: incluye guías y noticias.
          </p>
        </div>
        <section className="mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">Subsección</p>
          <h2 className="font-serif text-3xl text-foreground mb-6">Guías y Protocolos</h2>
          <ContentPreviewGrid items={guideItems} columns={2} size="medium" />
        </section>
        <section className="mt-12 pt-8 border-t border-divider">
          <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">Subsección</p>
          <h2 className="font-serif text-3xl text-foreground mb-6">Noticias IA</h2>
          <ContentPreviewGrid items={newsItems} columns={2} size="medium" />
        </section>
      </LegalLayout>
    </>
  );
}
