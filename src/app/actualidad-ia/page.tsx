import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Actualidad IA",
  description: "Noticias y actualidad sobre inteligencia artificial: regulación, jurisprudencia y tendencias del sector.",
  keywords: ["actualidad IA", "noticias IA", "regulación IA", "tendencias IA", "novedades IA"],
  alternates: {
    canonical: "/actualidad-ia",
    languages: {
      "es-ES": "/actualidad-ia",
      "en-US": "/en/ai-news",
    },
  },
  openGraph: {
    type: "website",
    title: "Actualidad IA",
    description: "Noticias y actualidad sobre inteligencia artificial: regulación, jurisprudencia y tendencias del sector.",
    url: "/actualidad-ia",
    locale: "es_ES",
    images: [
      {
        url: "/images/heroes/guias-ia-hero.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

type ActualidadItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  meta: string;
  dateMs: number;
};

export default async function ActualidadIAPage() {
  const mdxPosts = getAllPosts().filter(post => 
    post.frontmatter.category && 
    (post.frontmatter.category.toLowerCase().replace(/-/g, ' ') === 'actualidad ia')
  );

  const mdxItems: ActualidadItem[] = mdxPosts.map(post => {
    const dateMs = new Date(post.frontmatter.date).getTime();
    return {
      id: `mdx-${post.slug}`,
      href: post.url,
      title: post.frontmatter.title,
      description: post.excerpt,
      meta: `${new Date(post.frontmatter.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })} · ${post.frontmatter.author || "Derecho Artificial"}`,
      dateMs: dateMs,
    };
  });

  // Ordenar por fecha (más reciente primero)
  const sortedItems = mdxItems.sort((a, b) => b.dateMs - a.dateMs);

  // El artículo destacado es automáticamente el más reciente
  const featuredItems: ActualidadItem[] = sortedItems.length > 0 ? [sortedItems[0]] : [];
  const remainingItems = sortedItems.length > 0 ? sortedItems.slice(1) : [];

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Actualidad IA",
        url: "https://derechoartificial.com/actualidad-ia",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <main className="section-spacing">
        {/* Hero Section */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src="/images/heroes/guias-ia-hero.webp"
            alt="Actualidad IA"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
              Actualidad IA
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <p className="lead text-justify max-w-3xl">
            Noticias y actualidad sobre inteligencia artificial: últimas regulaciones, jurisprudencia relevante, 
            tendencias del sector y novedades que impactan en la práctica profesional del derecho digital.
          </p>
        </div>
        <div className="container-editorial">
          {/* Artículos Destacados - Uno por fila */}
          {featuredItems.map((item) => (
            <section key={item.id} className="mb-12">
              <Link
                href={item.href}
                className="block card-elevated p-8 hover:border-primary/30 transition-all duration-300 bg-slate-50/50"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold">
                    Noticia
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                    {item.title}
                  </h2>
                  {item.description && (
                    <p className="text-lg text-body leading-relaxed max-w-4xl">
                      {item.description}
                    </p>
                  )}
                  {item.meta && (
                    <div className="text-sm text-caption mt-2">
                      {item.meta}
                    </div>
                  )}
                  <div className="mt-4">
                    <span className="text-primary font-medium inline-flex items-center gap-2">
                      Leer noticia completa <span className="text-xl">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          ))}

          <section className="grid gap-6 md:grid-cols-2">
            {remainingItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Noticia</p>
                <h2 className="font-serif text-2xl text-foreground mb-4">{item.title}</h2>
                {item.description && <p className="text-body mb-6">{item.description}</p>}
                {item.meta && <div className="text-sm text-caption">{item.meta}</div>}
              </Link>
            ))}
          </section>

          <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Enfoque de actualidad</p>
            <p className="text-body max-w-3xl">
              Cobertura continua de los desarrollos más relevantes en inteligencia artificial. 
              Desde nuevas regulaciones hasta decisiones judiciales trascendentales, 
              manteniéndote informado sobre lo que impacta directamente en tu práctica profesional.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
