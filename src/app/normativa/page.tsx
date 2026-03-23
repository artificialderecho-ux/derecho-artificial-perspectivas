import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Normativa",
  description:
    "Marco regulatorio completo sobre Inteligencia Artificial: AI Act, normativa europea y directrices de cumplimiento.",
  keywords: [
    "normativa IA",
    "AI Act",
    "Reglamento Europeo IA",
    "AESIA",
    "cumplimiento normativo",
    "directrices europeas",
    "estándares IA",
  ],
  alternates: {
    canonical: "/normativa",
    languages: {
      "es-ES": "/normativa",
      "en-US": "/en/legislation",
    },
  },
  openGraph: {
    type: "website",
    title: "Normativa",
    description:
      "Marco regulatorio completo sobre Inteligencia Artificial: AI Act, normativa europea y directrices de cumplimiento.",
    url: "/normativa",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

type NormativaItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  meta: string;
  dateMs: number;
};

export default async function NormativaPage() {
  const resourceSlugs = await listSectionResourceSlugs("normativa");
  const resourceEntries = await Promise.all(
    resourceSlugs.map((slug) => getSectionResourceEntry("normativa", slug)),
  );
  const resolvedResourceEntries = resourceEntries.filter(
    (entry): entry is NonNullable<typeof entry> => Boolean(entry),
  );

  const mdxPosts = getAllPosts().filter(post =>
    post.frontmatter.section === "normativa" ||
    post.frontmatter.category === "normativa" ||
    post.frontmatter.category === "Legislación Digital" ||
    post.frontmatter.category === "Legislación Internacional" ||
    post.frontmatter.category === "Legislación" ||
    post.frontmatter.category === "Legislación IA" ||
    post.frontmatter.category === "Regulación UE"
  );

  const mdxItems: NormativaItem[] = mdxPosts.map(post => {
    const dateMs = new Date(post.frontmatter.date).getTime();
    return {
      id: `mdx-${post.slug}`,
      href: post.url,
      title: post.frontmatter.title,
      description: post.excerpt,
      meta: `${new Date(post.frontmatter.date).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })} · ${post.frontmatter.author || "Redacción"}`,
      dateMs: dateMs,
    };
  });

  const resourceItems: NormativaItem[] = resolvedResourceEntries.map((entry) => {
    const time = entry.dateMs ?? 0;
    const safeTime = Number.isNaN(time) ? 0 : time;
    const displayMs = entry.displayDateMs != null && !Number.isNaN(entry.displayDateMs) ? entry.displayDateMs : undefined;
    const date = displayMs != null ? new Date(displayMs) : null;
    const dateLabel =
      date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })
        : null;

    const plainSummary = entry.summaryHtml
      ? entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)
      : "";

    const parts: string[] = [];
    if (dateLabel) {
      parts.push(dateLabel);
    }
    if (entry.sourceUrl) {
      parts.push("Incluye descarga del documento original");
    }

    return {
      id: `resource-${entry.slug}`,
      href: `/normativa/${entry.slug}`,
      title: entry.title,
      description: plainSummary,
      meta: parts.join(" · "),
      dateMs: displayMs ?? safeTime,
    };
  });

  const items: NormativaItem[] = [...mdxItems, ...resourceItems].sort((a, b) => b.dateMs - a.dateMs);
  const featuredItem = items[0];
  const remainingItems = items.slice(1);

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Normativa",
        url: "https://derechoartificial.com/normativa",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <main className="section-spacing">
        <div className="relative w-full h-64 md:h-96">
          <Image
            src="/images/heroes/normativa-ia-hero.webp"
            alt="Normativa"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-8">
          <p className="lead text-justify max-w-3xl">
            Marco regulatorio completo sobre Inteligencia Artificial. Análisis detallado del AI Act,
            normativa europea y directrices de cumplimiento para profesionales del derecho.
          </p>
        </div>
        <div className="container-editorial">
          {featuredItem ? (
            <section className="mb-12">
              <Link
                href={featuredItem.href}
                className="block card-elevated p-8 hover:border-primary/30 transition-all duration-300 bg-slate-50/50"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold mb-3">Normativa</p>
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
              <p className="text-body text-lg">No hay normativa disponible en este momento.</p>
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
                  <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Normativa</p>
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
