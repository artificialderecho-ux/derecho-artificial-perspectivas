import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { PreviewItem } from "@/components/ContentPreviewCard";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guías IA",
  description: "Guías y protocolos sobre inteligencia artificial.",
  keywords: ["Guías IA", "regulación IA", "jurisprudencia IA", "noticias IA"],
  alternates: {
    canonical: "/actualidad-ia",
    languages: {
      "es-ES": "/actualidad-ia",
      "en-US": "/en/ai-news",
    },
  },
  openGraph: {
    type: "website",
    title: "Guías IA",
    description: "Guías y protocolos sobre inteligencia artificial.",
    url: "/actualidad-ia",
    locale: "es_ES",
    images: [{ url: "/images/heroes/guias-ia-hero.webp" }],
  },
};

export default async function ActualidadIAPage() {
  const mdxPosts = getAllPosts();
  
  const formatDateEs = (ms?: number | null) => {
    if (!ms || Number.isNaN(ms)) return null;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const mdxGuides = mdxPosts.filter((p) => {
    const tags = (p.frontmatter.tags || []).map((t: string) => t.toLowerCase());
    return tags.includes("guia") || tags.includes("protocolo");
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Guías IA", url: "https://derechoartificial.com/actualidad-ia" },
    ],
  });

  const guideItems = mdxGuides
    .map((p) => {
      const d = new Date(p.frontmatter.date).getTime();
      const dateLabel = formatDateEs(d);
      return {
        id: `mdx-guide-${p.slug}`,
        href: p.url,
        title: p.frontmatter.title,
        description: p.excerpt,
        badge: "Guías y Protocolos",
        meta: dateLabel ? `${dateLabel}` : "",
        dateMs: d || 0,
        displayDateMs: d || 0,
      };
    })
    .sort((a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs));

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Guías IA", href: "/actualidad-ia" }]} />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden text-white h-96 md:h-[500px]">
          <img
            src="/images/heroes/guias-ia-hero.webp"
            alt="Guías IA"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Guías IA</h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
              Guías, protocolos y análisis sobre inteligencia artificial para profesionales del derecho
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Últimas Guías y Protocolos
              </h2>
              <p className="text-gray-600 max-w-2xl">
                Recursos prácticos para implementar inteligencia artificial en tu organización
              </p>
            </div>

            {/* Grid */}
            {guideItems.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {guideItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                      {item.badge}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex-1 hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{item.meta}</span>
                      <span className="text-primary font-semibold">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No hay guías disponibles en este momento.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
