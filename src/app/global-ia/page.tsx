import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Global IA - Inteligencia Artificial en el Derecho Global",
  description: "Análisis exhaustivo de la regulación de inteligencia artificial a nivel mundial, incluyendo AI Act europeo, executive orders de EE.UU., regulaciones asiáticas y estándares internacionales de IA.",
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
    description: "Análisis exhaustivo de la regulación de inteligencia artificial a nivel mundial, incluyendo AI Act europeo, executive orders de EE.UU., regulaciones asiáticas y estándares internacionales de IA.",
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
};

export default async function GlobalIAPage() {
  const mdxPosts = getAllPosts().filter(post => 
    post.frontmatter.category === 'Global IA' || 
    post.frontmatter.category === 'ia-global' ||
    (post.frontmatter.category && post.frontmatter.category.toLowerCase().replace(/-/g, ' ') === 'ia global')
  );

  const mdxItems: GlobalIAPost[] = mdxPosts.map(post => {
    const dateMs = new Date(post.frontmatter.date).getTime();
    return {
      id: `mdx-${post.slug}`,
      href: post.url,
      title: post.frontmatter.title,
      description: post.excerpt,
      meta: `${new Date(post.frontmatter.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })} · ${post.frontmatter.authors?.[0] || "Derecho Artificial"}`,
      dateMs: dateMs,
    };
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Global IA",
        url: "https://derechoartificial.com/global-ia",
      },
    ],
  });

    return (
    <div>
      <StructuredData data={breadcrumbJsonLd} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* ...todo tu contenido actual... */}
      </div>
    </div>
  );
}
