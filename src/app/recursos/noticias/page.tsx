import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { getAllPosts } from "@/lib/mdx-utils";
import { ContentPreviewGrid, type PreviewItem } from "@/components/ContentPreviewCard";

export const metadata: Metadata = {
  title: "Noticias IA",
  description: "Selección y monitor de noticias reguladoras e institucionales sobre IA.",
  alternates: { canonical: "/recursos/noticias" },
  openGraph: {
    type: "website",
    title: "Noticias IA",
    description: "Selección y monitor de noticias reguladoras e institucionales sobre IA.",
    url: "/recursos/noticias",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default async function NoticiasIndexPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Recursos IA", url: "https://derechoartificial.com/recursos" },
      { name: "Noticias IA", url: "https://derechoartificial.com/recursos/noticias" },
    ],
  });

  const slugs = await listSectionResourceSlugs("actualidad-ia");
  const entries = await Promise.all(slugs.map((slug) => getSectionResourceEntry("actualidad-ia", slug)));
  const resolved = entries.filter((e): e is NonNullable<typeof e> => Boolean(e));

  const posts = getAllPosts().filter(
    (p) => p.frontmatter.category === "actualidad-ia" || p.frontmatter.tags?.includes("noticia"),
  );

  const formatDateEs = (ms?: number | null) => {
    if (!ms || Number.isNaN(ms)) return null;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const items: PreviewItem[] = [
    ...resolved.map((n) => {
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
    ...posts.map((p) => {
      const d = new Date(p.frontmatter.date).getTime();
      const dateLabel = formatDateEs(d);
      const parts: string[] = [];
      if (dateLabel) parts.push(dateLabel);
      if (p.frontmatter.author) parts.push(p.frontmatter.author);
      return {
        id: `mdx-${p.slug}`,
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
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Recursos IA", href: "/recursos" },
          { label: "Noticias IA", href: "/recursos/noticias" },
        ]}
      />
      <LegalLayout title="Noticias IA" category="Recursos IA" date={new Date().toISOString().slice(0, 10)}>
        <ContentPreviewGrid items={items} columns={2} size="medium" />
      </LegalLayout>
    </>
  );
}
