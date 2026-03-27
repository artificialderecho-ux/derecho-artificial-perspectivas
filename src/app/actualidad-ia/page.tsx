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
  const featuredItem = guideItems[0];
  const remainingItems = guideItems.slice(1);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Guías IA", href: "/actualidad-ia" }]} />
      
      <main className="section-spacing">
        <section className="relative w-full h-64 md:h-96">
          <img
            src="/images/heroes/guias-ia-hero.webp"
            alt="Guías IA"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </section>

        <div className="container mx-auto px-4 py-8">
          <p className="lead text-justify max-w-3xl">
            Guías, protocolos y análisis prácticos para aplicar IA en entornos jurídicos y de cumplimiento.
          </p>
        </div>

        <div className="container-editorial">
          {featuredItem ? (
            <section className="mb-12">
              <Link
                href={featuredItem.href}
                className="block card-elevated p-8 hover:border-primary/30 transition-all duration-300 bg-slate-50/50"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">
                  {featuredItem.badge}
                </p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight mb-4">
                  {featuredItem.title}
                </h2>
                {featuredItem.description && (
                  <p className="text-lg text-body leading-relaxed max-w-4xl">{featuredItem.description}</p>
                )}
                {featuredItem.meta && <div className="text-sm text-caption mt-4">{featuredItem.meta}</div>}
              </Link>
            </section>
          ) : (
            <div className="text-center py-12">
              <p className="text-body text-lg">No hay guías disponibles en este momento.</p>
            </div>
          )}

          {remainingItems.length > 0 && (
            <section className="grid gap-6 md:grid-cols-2">
              {remainingItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">{item.badge}</p>
                  <h2 className="font-serif text-2xl text-foreground mb-4">{item.title}</h2>
                  {item.description && <p className="text-body mb-6">{item.description}</p>}
                  {item.meta && <div className="text-sm text-caption">{item.meta}</div>}
                </Link>
              ))}
            </section>
          )}
        </div>
      </main>
    </>
  );
}
