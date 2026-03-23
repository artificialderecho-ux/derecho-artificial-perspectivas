import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
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
};

const normalizeGlobalIAValue = (value: string | undefined): string =>
  (value || "").trim().toLowerCase().replace(/[_\s]+/g, "-");

const isGlobalIA = (value: string | undefined): boolean => {
  const normalized = normalizeGlobalIAValue(value);
  return normalized === "global-ia" || normalized === "ia-global";
};

export default async function GlobalIAPage() {
  const mdxPosts = getAllPosts().filter((post) => {
    return isGlobalIA(post.frontmatter.category) || isGlobalIA(post.frontmatter.section);
  });

  const mdxItems: GlobalIAPost[] = mdxPosts.map((post) => {
    const dateMs = new Date(post.frontmatter.date).getTime();

    return {
      id: `mdx-${post.slug}`,
      href: post.url,
      title: post.frontmatter.title,
      description: post.excerpt,
      meta: `${new Date(post.frontmatter.date).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })} · ${post.frontmatter.authors?.[0] || "Derecho Artificial"}`,
      dateMs,
    };
  });

  const items = [...mdxItems].sort((a, b) => b.dateMs - a.dateMs);
  const featuredItem = items[0];
  const remainingItems = items.slice(1);

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
    <main className="section-spacing">
      <StructuredData data={breadcrumbJsonLd} />

      <section className="relative w-full h-64 md:h-96">
        <Image
          src="/images/heroes/ia-global-hero.webp"
          alt="Global IA"
          fill
          sizes="100vw"
          className="object-cover"
          priority={false}
        />
      </section>

      <div className="container mx-auto px-4 py-8">
        <p className="lead text-justify max-w-3xl">
          Inteligencia Artificial en el Derecho Global. Análisis sobre gobernanza internacional, AI Act,
          estrategia regulatoria comparada y tendencias en jurisdicciones clave.
        </p>
      </div>

      <div className="container-editorial">
        {featuredItem ? (
          <section className="mb-12">
            <Link
              href={featuredItem.href}
              className="block card-elevated p-8 hover:border-primary/30 transition-all duration-300 bg-slate-50/50"
            >
              <div className="flex flex-col gap-4">
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold">Análisis</p>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                  {featuredItem.title}
                </h2>
                {featuredItem.description && (
                  <p className="text-lg text-body leading-relaxed max-w-4xl">{featuredItem.description}</p>
                )}
                {featuredItem.meta && <div className="text-sm text-caption mt-2">{featuredItem.meta}</div>}
                <div className="mt-4">
                  <span className="text-primary font-medium inline-flex items-center gap-2">
                    Leer análisis completo <span className="text-xl">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        ) : (
          <div className="text-center py-12">
            <p className="text-body text-lg">No hay análisis disponibles en este momento.</p>
          </div>
        )}

        {remainingItems.length > 0 && (
          <section className="grid gap-6 md:grid-cols-2">
            {remainingItems.map((post) => (
              <Link
                key={post.id}
                href={post.href}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Análisis</p>
                <h2 className="font-serif text-2xl text-foreground mb-4">{post.title}</h2>
                {post.description && <p className="text-body mb-6">{post.description}</p>}
                {post.meta && <div className="text-sm text-caption">{post.meta}</div>}
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
