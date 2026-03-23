import type { Metadata } from "next";
import Link from "next/link";
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
    post.frontmatter.category === "Global IA" ||
    post.frontmatter.category === "ia-global" ||
    post.frontmatter.category === "global-ia" ||
    (post.frontmatter.category && post.frontmatter.category.toLowerCase().replace(/-/g, " ") === "ia global")
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
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="relative overflow-hidden text-white">
          <div className="absolute inset-0">
            <img
              src="/images/heroes/ia-global-hero.webp"
              alt="Inteligencia Artificial Global"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/45"></div>
          <div className="relative container mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Global IA
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Inteligencia Artificial en el Derecho Global
              </p>
              <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto">
                Análisis exhaustivo de la regulación de IA a nivel mundial, incluyendo AI Act europeo,
                executive orders de EE.UU., regulaciones asiáticas y estándares internacionales.
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Análisis de Regulación Global de IA
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explora nuestro análisis detallado de cómo diferentes jurisdicciones están abordando
                los desafíos regulatorios de la inteligencia artificial.
              </p>
            </div>

            {/* Posts Grid */}
            {mdxItems.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {mdxItems
                  .sort((a, b) => b.dateMs - a.dateMs)
                  .map((post) => (
                    <div
                      key={post.id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                            Análisis
                          </span>
                          <span className="text-sm text-gray-500">
                            {post.meta}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          <Link href={post.href} className="hover:underline">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {post.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Link
                            href={post.href}
                            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Leer análisis
                            <svg
                              className="ml-2 h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No hay análisis disponibles en este momento.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
