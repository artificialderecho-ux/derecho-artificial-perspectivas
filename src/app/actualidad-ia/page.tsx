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
    const category = (p.frontmatter.category || "").toLowerCase().trim();
    const section = (p.frontmatter.section || "").toLowerCase().trim();
    return category === "guias" || section === "guias";
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
  const featuredItem = guideItems[0];
  const remainingItems = guideItems.slice(1);

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
          <div className="absolute inset-0 bg-black/35"></div>
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

            {guideItems.length > 0 ? (
              <div className="space-y-8">
                {featuredItem ? (
                  <Link
                    href={featuredItem.href}
                    className="block card-elevated p-8 hover:border-primary/30 transition-all duration-300 bg-slate-50/50"
                  >
                    <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">{featuredItem.badge}</p>
                    <h3 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">{featuredItem.title}</h3>
                    <p className="text-lg text-body leading-relaxed max-w-4xl mb-4">{featuredItem.description}</p>
                    <p className="text-sm text-caption">{featuredItem.meta}</p>
                  </Link>
                ) : null}
                <div className="grid gap-6 md:grid-cols-2">
                {remainingItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
                  >
                    <span className="text-xs uppercase tracking-[0.25em] text-caption mb-3">
                      {item.badge}
                    </span>
                    <h3 className="font-serif text-2xl text-foreground mb-3 flex-1 hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-body text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-caption">{item.meta}</span>
                    </div>
                  </Link>
                ))}
                </div>
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
