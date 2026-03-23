import type { Metadata } from "next";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { SectionLanding } from "@/components/SectionLanding";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Global IA - Inteligencia Artificial en el Derecho Global",
  description:
    "Análisis exhaustivo de la regulación de inteligencia artificial a nivel mundial, incluyendo AI Act europeo, executive orders de EE.UU., regulaciones asiáticas y estándares internacionales de IA.",
  keywords: [
    "Global IA",
    "regulación IA mundial",
    "AI Act europeo",
    "Executive Order IA EE.UU.",
    "regulación China IA",
    "estándares internacionales IA",
    "IA derecho comparado",
    "gobernanza IA global",
  ],
  alternates: {
    canonical: "/global-ia",
    languages: {
      "es-ES": "/global-ia",
      "en-US": "/en/global-ai",
    },
  },
  openGraph: {
    type: "website",
    title: "Global IA - Inteligencia Artificial en el Derecho Global",
    description:
      "Análisis exhaustivo de la regulación de inteligencia artificial a nivel mundial, incluyendo AI Act europeo, executive orders de EE.UU., regulaciones asiáticas y estándares internacionales de IA.",
    url: "/global-ia",
    locale: "es_ES",
    images: [
      {
        url: "/images/heroes/ia-global-hero.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type GlobalIAPost = {
  id: string;
  href: string;
  title: string;
  description: string;
  meta: string;
  dateMs: number;
  badge: string;
};

export default async function GlobalIAPage() {
  const mdxPosts = getAllPosts().filter((post) => {
    const category = (post.frontmatter.category || "").toLowerCase().trim();
    const section = (post.frontmatter.section || "").toLowerCase().trim();
    return (
      section === "global-ia" ||
      section === "ia-global" ||
      category === "global ia" ||
      category === "ia-global" ||
      category === "global-ia" ||
      category.replace(/-/g, " ") === "ia global"
    );
  });

  const items: GlobalIAPost[] = mdxPosts
    .map((post) => {
      const dateMs = new Date(post.frontmatter.date).getTime();
      return {
        id: `mdx-${post.slug}`,
        href: post.url,
        title: post.frontmatter.title,
        description: post.excerpt,
        meta: `${new Date(post.frontmatter.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })} · ${post.frontmatter.author || "Derecho Artificial"}`,
        dateMs,
        badge: "Análisis global",
      };
    })
    .sort((a, b) => b.dateMs - a.dateMs);

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Global IA", url: "https://derechoartificial.com/global-ia" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <SectionLanding
        title="Global IA"
        heroSrc="/images/heroes/ia-global-hero.webp"
        heroAlt="Global IA"
        description="Análisis de cómo distintas jurisdicciones están abordando el diseño normativo, la responsabilidad y la gobernanza de la inteligencia artificial en clave comparada."
        items={items}
      />
    </>
  );
}
