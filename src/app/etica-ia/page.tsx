import type { Metadata } from "next";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { SectionLanding } from "@/components/SectionLanding";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Ética IA",
  description:
    "Análisis sobre ética algorítmica, responsabilidad profesional y gobernanza de sistemas de IA.",
  alternates: { canonical: "/etica-ia" },
  openGraph: {
    type: "website",
    title: "Ética IA",
    description:
      "Análisis sobre ética algorítmica, responsabilidad profesional y gobernanza de sistemas de IA.",
    url: "/etica-ia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default async function EticaIAPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Ética IA", url: "https://derechoartificial.com/etica-ia" },
    ],
  });

  const mdxPosts = getAllPosts().filter((post) => {
    const category = (post.frontmatter.category || "").toLowerCase().trim();
    const section = (post.frontmatter.section || "").toLowerCase().trim();
    return category === "etica-ia" || section === "etica-ia";
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
        title="Ética IA"
        heroSrc="/images/heroes/etica-ia-hero.webp"
        heroAlt="Ética IA"
        description="Casos y guías sobre riesgos éticos, negligencia profesional, seguridad de modelos de propósito general y su impacto en derechos fundamentales."
        items={items}
      />
    </>
  );
}
