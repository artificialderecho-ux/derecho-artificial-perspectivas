import type { Metadata } from "next";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { getAllPosts } from "@/lib/mdx-utils";
import { UnifiedSectionLayout, type UnifiedItem, type SectionConfig } from "@/components/layout/UnifiedSectionLayout";

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
  const slugs = await listSectionResourceSlugs("guias");
  const entries = await Promise.all(slugs.map((slug) => getSectionResourceEntry("guias", slug)));
  const resolved = entries.filter((e): e is NonNullable<typeof e> => Boolean(e));

  // Mejorar el filtrado para incluir posts de guías desde MDX también
  const posts = getAllPosts().filter(
    (p) => 
      p.frontmatter.category === "recursos" && 
      (p.frontmatter.subcategory === "guias" || p.frontmatter.tags?.includes("guias")) ||
      (p.frontmatter.category || "").toLowerCase().replace(/-/g, ' ') === "actualidad ia" &&
      (p.frontmatter.tags?.includes("guias") || p.frontmatter.tags?.includes("guías"))
  );

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const formatDateEs = (ms?: number | null) => {
    if (!ms || Number.isNaN(ms)) return null;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  // Items desde recursos (sistema legacy)
  const resourceItems: UnifiedItem[] = resolved.map((g) => {
    const dateLabel = formatDateEs(g.displayDateMs ?? g.dateMs);
    const parts: string[] = [];
    if (dateLabel) parts.push(dateLabel);
    if (g.sourceUrl) parts.push("Incluye descarga del documento original");
    
    return {
      id: `resource-${g.slug}`,
      href: `/recursos/guias/${g.slug}`,
      title: g.title,
      description: g.description || (g.summaryHtml ? g.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : ""),
      badge: "Guía",
      meta: parts.join(" · "),
      dateMs: g.dateMs ?? 0,
      displayDateMs: g.displayDateMs,
    };
  });

  // Items desde posts MDX
  const mdxItems: UnifiedItem[] = posts.map((post) => {
    const dateMs = new Date(post.frontmatter.date).getTime();
    return {
      id: `mdx-${post.slug}`,
      href: post.url,
      title: post.frontmatter.title,
      description: post.excerpt,
      badge: "Guía",
      meta: `${formatDate(post.frontmatter.date)} · ${post.frontmatter.author || "Derecho Artificial"}`,
      dateMs: dateMs,
      displayDateMs: dateMs,
    };
  });

  // Combinar y ordenar todos los items
  const items: UnifiedItem[] = [...resourceItems, ...mdxItems].sort(
    (a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs)
  );

  const config: SectionConfig = {
    title: "Guías y Protocolos",
    description: "Repositorio completo de guías prácticas y protocolos de referencia sobre inteligencia artificial. Documentación técnica para implementar IA de manera responsable y conforme al marco regulatorio.",
    heroImage: "/images/heroes/guias-ia-hero.webp",
    heroAlt: "Guías y Protocolos",
    footerTitle: "Enfoque práctico",
    footerDescription: "Nuestras guías están diseñadas para ser herramientas de aplicación directa. Incluyen checklists, plantillas y flujos de trabajo que facilitan la implementación de sistemas de IA en entornos profesionales y regulatorios.",
    breadcrumbItems: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Actualidad IA",
        url: "https://derechoartificial.com/actualidad-ia",
      },
      {
        name: "Guías y Protocolos",
        url: "https://derechoartificial.com/recursos/guias",
      },
    ],
    metadata: metadata,
  };

  return <UnifiedSectionLayout config={config} items={items} />;
}
