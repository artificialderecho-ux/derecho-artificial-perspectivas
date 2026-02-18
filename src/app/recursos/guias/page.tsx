import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { getAllPosts } from "@/lib/mdx-utils";
import { ContentPreviewGrid, type PreviewItem } from "@/components/ContentPreviewCard";

export const metadata: Metadata = {
  title: "Guías y Protocolos",
  description: "Selección de guías y protocolos de referencia sobre IA.",
  alternates: { canonical: "/recursos/guias" },
  openGraph: {
    type: "website",
    title: "Guías y Protocolos",
    description: "Selección de guías y protocolos de referencia sobre IA.",
    url: "/recursos/guias",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default async function GuiasIndexPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Actualidad IA", url: "https://derechoartificial.com/actualidad-ia" },
      { name: "Guías y Protocolos", url: "https://derechoartificial.com/recursos/guias" },
    ],
  });

  const slugs = await listSectionResourceSlugs("guias");
  const entries = await Promise.all(slugs.map((slug) => getSectionResourceEntry("guias", slug)));
  const resolved = entries.filter((e): e is NonNullable<typeof e> => Boolean(e));

  const posts = getAllPosts().filter(
    (p) => p.frontmatter.category === "recursos" && (p.frontmatter.subcategory === "guias" || p.frontmatter.tags?.includes("guias")),
  );

  const formatDateEs = (ms?: number | null) => {
    if (!ms || Number.isNaN(ms)) return null;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const items: PreviewItem[] = [
    ...resolved.map((g) => {
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
    ...posts.map((p) => {
      const d = new Date(p.frontmatter.date).getTime();
      const dateLabel = formatDateEs(d);
      const parts: string[] = [];
      if (dateLabel) parts.push(dateLabel);
      if (p.frontmatter.author) parts.push(p.frontmatter.author);
      return {
        id: `mdx-${p.slug}`,
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

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Actualidad IA", href: "/actualidad-ia" },
          { label: "Guías y Protocolos", href: "/recursos/guias" },
        ]}
      />
      <LegalLayout title="Guías y Protocolos" category="Actualidad IA" date={new Date().toISOString().slice(0, 10)}>
        <ContentPreviewGrid items={items} columns={2} size="medium" />
      </LegalLayout>
    </>
  );
}
