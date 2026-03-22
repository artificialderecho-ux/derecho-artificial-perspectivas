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
  const mdxPosts = getAllPosts().filter((post) => {
    const normalizedCategory = (post.frontmatter.category || "").toLowerCase().replace(/_/g, "-").trim();
    const normalizedSection = (post.frontmatter.section || "").toLowerCase().replace(/_/g, "-").trim();

    return (
      normalizedCategory === "global-ia" ||
      normalizedCategory === "ia-global" ||
      normalizedCategory.replace(/-/g, " ") === "ia global" ||
      normalizedSection === "global-ia" ||
      normalizedSection === "ia-global"
    );
  });

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
  const sortedItems = [...mdxItems].sort((a, b) => b.dateMs - a.dateMs);
  const featuredItem = sortedItems[0];
  const remainingItems = sortedItems.slice(1);

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
          <div className="relative h-64 md:h-96" />
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

            {sortedItems.length > 0 ? (
              <div className="space-y-8">
                {featuredItem ? (
                  <Link
                    href={featuredItem.href}
                    className="block card-elevated p-8 hover:border-primary/30 transition-all duration-300 bg-slate-50/50"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">Análisis</p>
                    <h3 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
                      {featuredItem.title}
                    </h3>
                    {featuredItem.description && (
                      <p className="text-lg text-body leading-relaxed max-w-4xl mb-4">{featuredItem.description}</p>
                    )}
                    <p className="text-sm text-caption">{featuredItem.meta}</p>
                  </Link>
                ) : null}

                <div className="grid gap-6 md:grid-cols-2">
                  {remainingItems.map((post) => (
                    <Link
                      key={post.id}
                      href={post.href}
                      className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
                    >
                      <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Análisis</p>
                      <h3 className="font-serif text-2xl text-foreground mb-4">{post.title}</h3>
                      <p className="text-body mb-4 line-clamp-3">{post.description}</p>
                      <p className="text-sm text-caption">{post.meta}</p>
                    </Link>
                  ))}
                </div>
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
