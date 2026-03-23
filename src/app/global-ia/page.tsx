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
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <main className="section-spacing">
        {/* Hero Section */}
        <div className="relative w-full h-64 md:h-96">
          <Image
            src="/images/heroes/ia-global-hero.webp"
            alt="Global IA"
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-2xl">
              Global IA
            </h1>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <p className="lead text-justify max-w-3xl">
            Análisis exhaustivo de la regulación de inteligencia artificial a nivel mundial, incluyendo AI Act europeo, 
            executive orders de EE.UU., regulaciones asiáticas y estándares internacionales de IA.
          </p>
        </div>
        <div className="container-editorial">

          {/* Artículos Destacados - Uno por fila */}
          {mdxItems.length > 0 && (
            <section className="mb-12">
              <Link
                href={mdxItems[0].href}
                className="block card-elevated p-8 hover:border-primary/30 transition-all duration-300 bg-slate-50/50"
              >
                <div className="flex flex-col gap-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold">
                    Análisis
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                    {mdxItems[0].title}
                  </h2>
                  {mdxItems[0].description && (
                    <p className="text-lg text-body leading-relaxed max-w-4xl">
                      {mdxItems[0].description}
                    </p>
                  )}
                  {mdxItems[0].meta && (
                    <div className="text-sm text-caption mt-2">
                      {mdxItems[0].meta}
                    </div>
                  )}
                  <div className="mt-4">
                    <span className="text-primary font-medium inline-flex items-center gap-2">
                      Leer análisis completo <span className="text-xl">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            </section>
          )}

          <section className="grid gap-6 md:grid-cols-2">
            {(mdxItems.length > 1 ? mdxItems.slice(1) : mdxItems).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Análisis</p>
                <h2 className="font-serif text-2xl text-foreground mb-4">{item.title}</h2>
                {item.description && <p className="text-body mb-6">{item.description}</p>}
                {item.meta && <div className="text-sm text-caption">{item.meta}</div>}
              </Link>
            ))}
          </section>

          <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Enfoque global</p>
            <p className="text-body max-w-3xl">
              Análisis comparado de la regulación de IA en diferentes jurisdicciones, examinando estándares 
              internacionales, conflictos de leyes y mejores prácticas para la gobernanza global de la inteligencia artificial.
            </p>
          </section>
      </div>
  );
}

