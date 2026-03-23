import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
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

  const posts = getAllPosts().filter((p) => p.url.startsWith("/recursos/guias/"));

  const formatDateEs = (ms?: number | null) => {
    if (!ms || Number.isNaN(ms)) return null;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const items: PreviewItem[] = posts.map((p) => {
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
        badge: "Guías y Protocolos",
        meta: parts.join(" · "),
        dateMs: d || 0,
        displayDateMs: d || 0,
      };
    })
    .sort((a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs));

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
