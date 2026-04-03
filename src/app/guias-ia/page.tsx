import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Guías IA",
  description: "Guías y protocolos sobre inteligencia artificial.",
  keywords: ["Guías IA", "regulación IA", "jurisprudencia IA", "noticias IA"],
  alternates: {
    canonical: "/guias-ia",
    languages: {
      "es-ES": "/guias-ia",
      "en-US": "/en/ai-news",
    },
  },
  openGraph: {
    type: "website",
    title: "Guías IA",
    description: "Guías y protocolos sobre inteligencia artificial.",
    url: "/guias-ia",
    locale: "es_ES",
    images: [{ url: "/images/heroes/guias-ia-hero.webp" }],
  },
};

const AUTOMATED_AUTHOR_PATTERNS = ["claude", "secretaría general", "secretaria general", "automatiz"];

export default async function ActualidadIAPage() {
  const posts = getAllPosts();

  const formatDateEs = (ms?: number | null) => {
    if (!ms || Number.isNaN(ms)) return null;
    const d = new Date(ms);
    if (Number.isNaN(d.getTime())) return null;
    return d.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const ownGuidePosts = posts
    .filter((p) => 
      p.frontmatter.section === "guias" || 
      p.frontmatter.category === "guias-ia" ||
      (p.frontmatter.category === "recursos" && p.frontmatter.subcategory === "guias")
    )
    .filter((p) => {
      const author = String(p.frontmatter.author || "").toLowerCase();
      return !AUTOMATED_AUTHOR_PATTERNS.some((pattern) => author.includes(pattern));
    })
    .map((p) => {
      const d = new Date(p.frontmatter.date).getTime();
      const dateLabel = formatDateEs(d);
      const metaParts = [dateLabel, p.frontmatter.author].filter(Boolean);
      return {
        id: `mdx-guide-${p.slug}`,
        href: p.url,
        title: p.frontmatter.title,
        description: p.excerpt,
        badge: "Guías y Protocolos",
        meta: metaParts.join(" · "),
        dateMs: d || 0,
        displayDateMs: d || 0,
      };
    })
    .sort((a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs));

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Guías IA", url: "https://derechoartificial.com/guias-ia" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Guías IA", href: "/guias-ia" }]} />

      <main className="section-spacing">
        <div className="relative w-full h-64 md:h-96">
          <img
            src="/images/heroes/guias-ia-hero.webp"
            alt="Guías IA"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">Guías IA</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <p className="lead text-left max-w-3xl">
            Guías y protocolos propios sobre inteligencia artificial para profesionales jurídicos. Solo se muestran
            publicaciones editoriales de elaboración propia y con enlace interno activo.
          </p>
        </div>

        <div className="container-editorial">
          <section className="grid gap-6 md:grid-cols-2">
            {ownGuidePosts.map((item) => (
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

          {ownGuidePosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No hay guías propias disponibles en este momento.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
