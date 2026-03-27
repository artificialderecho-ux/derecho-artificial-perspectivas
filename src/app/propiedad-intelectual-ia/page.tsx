import type { Metadata } from "next";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { SectionLanding } from "@/components/SectionLanding";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Propiedad Intelectual IA",
  description:
    "Análisis y recursos sobre propiedad intelectual, derecho de autor e inteligencia artificial.",
  alternates: { canonical: "/propiedad-intelectual-ia" },
  openGraph: {
    type: "website",
    title: "Propiedad Intelectual IA",
    description:
      "Análisis y recursos sobre propiedad intelectual, derecho de autor e inteligencia artificial.",
    url: "/propiedad-intelectual-ia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default async function PropiedadIntelectualIAPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Propiedad Intelectual IA", url: "https://derechoartificial.com/propiedad-intelectual-ia" },
    ],
  });

  const mdxPosts = getAllPosts().filter((post) => {
    const category = (post.frontmatter.category || "").toLowerCase().trim();
    const section = (post.frontmatter.section || "").toLowerCase().trim();
    return category === "propiedad-intelectual-ia" || section === "propiedad-intelectual-ia";
  });

  const items = mdxPosts
    .map((post) => {
      const date = new Date(post.frontmatter.date);
      const safeDate = Number.isNaN(date.getTime())
        ? post.frontmatter.date
        : date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
      return {
        id: post.slug,
        title: post.frontmatter.title,
        href: post.url,
        description: post.excerpt,
        meta: `${safeDate} · ${post.frontmatter.author || "Ricardo Scarpa"}`,
        badge: "Análisis",
        dateMs: new Date(post.frontmatter.date).getTime(),
      };
    })
    .sort((a, b) => b.dateMs - a.dateMs);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <SectionLanding
        title="Propiedad Intelectual IA"
        heroSrc="/images/heroes/propiedad-intelectual-ia-hero.webp"
        heroAlt="Propiedad Intelectual IA"
        description="Selección de análisis y recursos sobre el conflicto entre IA generativa y derechos de autor, licencias de uso, text and data mining y blindaje de catálogos creativos."
        items={items}
      />
    </>
  );
}
