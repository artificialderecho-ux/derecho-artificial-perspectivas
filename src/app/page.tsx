import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listContentSlugs, getContentEntry } from "@/lib/content";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { Badges, isNew, isRecent, formatDateFromMs, getItemDateMs } from "@/lib/badges";
import { IndicatorsLegend } from "@/components/ui/IndicatorsLegend";
import { StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Derecho, ética y regulación de la IA",
  description:
    "Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.",
  keywords: [
    "derecho artificial",
    "inteligencia artificial",
    "regulación IA",
    "AI Act",
    "RGPD",
    "jurisprudencia",
    "cumplimiento",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    title: "Derecho, ética y regulación de la IA",
    description:
      "Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.",
    url: "https://www.derechoartificial.com",
    siteName: "Derecho Artificial",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
        width: 1200,
        height: 630,
        alt: "Derecho Artificial - Perspectivas Legales sobre IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Derecho, ética y regulación de la IA",
    description:
      "Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.",
    images: ["/logo-principal.png"],
    creator: "@RicardoScarpa", // Assuming this from previous context
  },
};

export default async function HomePage() {
  const [
    actualidadJsonSlugs,
    actualidadResourceSlugs,
    firmaJsonSlugs,
    firmaResourceSlugs,
    normativaSlugs,
    jurisprudenciaSlugs,
    guiasSlugs,
  ] = await Promise.all([
    listContentSlugs("actualidad-ia"),
    listSectionResourceSlugs("actualidad-ia"),
    listContentSlugs("firma-scarpa"),
    listSectionResourceSlugs("firma-scarpa"),
    listSectionResourceSlugs("normativa"),
    listSectionResourceSlugs("jurisprudencia"),
    listSectionResourceSlugs("guias"),
  ]);

  const [actualidadJsonEntries, actualidadResourceEntries, firmaJsonEntries, firmaResourceEntries] =
    await Promise.all([
      Promise.all(actualidadJsonSlugs.map((slug) => getContentEntry("actualidad-ia", slug))),
      Promise.all(actualidadResourceSlugs.map((slug) => getSectionResourceEntry("actualidad-ia", slug))),
      Promise.all(firmaJsonSlugs.map((slug) => getContentEntry("firma-scarpa", slug))),
      Promise.all(firmaResourceSlugs.map((slug) => getSectionResourceEntry("firma-scarpa", slug))),
    ]);

  const resolvedActualidadJson = actualidadJsonEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );
  const resolvedActualidadResources = actualidadResourceEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );
  const resolvedFirmaJson = firmaJsonEntries.filter((e): e is NonNullable<typeof e> => Boolean(e));
  const resolvedFirmaResources = firmaResourceEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );

  const unifiedActualidad = [
    ...resolvedActualidadJson.map((e) => ({
      title: e.title,
      description: e.description,
      date: (() => {
        const publishedMs =
          typeof e.datePublished === "string" ? new Date(e.datePublished).getTime() : NaN;
        const fallback = typeof e.dateMs === "number" && !Number.isNaN(e.dateMs) ? e.dateMs : 0;
        return Number.isNaN(publishedMs) ? fallback : publishedMs;
      })(),
      urlPath: e.urlPath,
      author: e.author,
    })),
    ...resolvedActualidadResources.map((e) => ({
      title: e.title,
      description: e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
      date: e.displayDateMs ?? e.dateMs ?? 0,
      urlPath: `/actualidad-ia/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ];

  const unifiedFirma = [
    ...resolvedFirmaJson.map((e) => ({
      title: e.title,
      description: e.description,
      date: (() => {
        const publishedMs =
          typeof e.datePublished === "string" ? new Date(e.datePublished).getTime() : NaN;
        const fallback = typeof e.dateMs === "number" && !Number.isNaN(e.dateMs) ? e.dateMs : 0;
        return Number.isNaN(publishedMs) ? fallback : publishedMs;
      })(),
      urlPath: e.urlPath,
      author: e.author,
    })),
    ...resolvedFirmaResources.map((e) => ({
      title: e.title,
      description: e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
      date: e.displayDateMs ?? e.dateMs ?? 0,
      urlPath: `/firma-scarpa/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ];

  unifiedActualidad.sort((a, b) => b.date - a.date);
  unifiedFirma.sort((a, b) => b.date - a.date);

  const latestActualidad = unifiedActualidad[0] ?? null;
  const latestFirma = unifiedFirma[0] ?? null;

  const homeFeaturedSlugs = [
    "ai-act-guia-completa",
    "rgpd-gobernanza-datos-ia",
    "analisis-negligencia-chatgpt"
  ];

  const [latestNormativa, latestJurisprudencia, latestGuias] = await Promise.all([
    Promise.all(normativaSlugs.map((slug) => getSectionResourceEntry("normativa", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items[0] ?? null;
    }),
    Promise.all(jurisprudenciaSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items[0] ?? null;
    }),
    Promise.all(guiasSlugs.map((slug) => getSectionResourceEntry("guias", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items[0] ?? null;
    }),
  ]);

  const [normativaEntriesAll, jurisprudenciaEntriesAll, guiasEntriesAll] = await Promise.all([
    Promise.all(normativaSlugs.map((slug) => getSectionResourceEntry("normativa", slug))),
    Promise.all(jurisprudenciaSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug))),
    Promise.all(guiasSlugs.map((slug) => getSectionResourceEntry("guias", slug))),
  ]);

  // Crear una lista unificada de todas las entradas recientes para la sección "Actualidad y Análisis"
  const mdxPosts = getAllPosts();
  const newsMdxCandidates = mdxPosts
    .filter((post) => {
      const cat = (post.frontmatter.category || "").toLowerCase();
      const tags = (post.frontmatter.tags || []).map((t: string) => t.toLowerCase());
      return (
        cat === "noticia" ||
        cat === "actualidad-ia" ||
        tags.includes("noticia") ||
        tags.includes("actualidad-ia") ||
        tags.includes("news")
      );
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    .slice(0, 6);
  const newsEntries =
    newsMdxCandidates.length > 0
      ? newsMdxCandidates.map((post) => ({
          title: post.frontmatter.title,
          description: post.excerpt,
          date: new Date(post.frontmatter.date).getTime(),
          urlPath: post.url,
          author: post.frontmatter.author || "Derecho Artificial",
          type: "Noticias IA" as const,
        }))
      : unifiedActualidad.slice(0, 6).map((e) => ({
          title: e.title,
          description: e.description,
          date: e.date,
          urlPath: e.urlPath,
          author: e.author,
          type: "Noticias IA" as const,
        }));

  const allRecentEntries: any[] = [];

  const formatDate = (value: string | number) => {
    // Si es un timestamp numérico (milisegundos desde 1970)
    if (typeof value === 'number') {
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return "";
      return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
    }
    
    // Si es una string de fecha (como "2026-02-10")
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const toMs = (value: string | number | Date | null | undefined) => {
    if (value == null) return 0;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return 0;
    return d.getTime();
  };

  const [normativaTopEntries, jurisprudenciaTopEntries, guiasTopEntries] = await Promise.all([
    Promise.all(normativaSlugs.map((slug) => getSectionResourceEntry("normativa", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items.slice(0, 2);
    }),
    Promise.all(jurisprudenciaSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items.slice(0, 2);
    }),
    Promise.all(guiasSlugs.map((slug) => getSectionResourceEntry("guias", slug))).then((arr) => {
      const items = arr.filter((e): e is NonNullable<typeof e> => Boolean(e));
      items.sort(
        (a, b) =>
          (b.displayDateMs ?? b.dateMs ?? 0) -
          (a.displayDateMs ?? a.dateMs ?? 0),
      );
      return items.slice(0, 2);
    }),
  ]);

  const normativaItems =
    normativaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/normativa/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.displayDateMs ?? 0, "es-ES")} · Análisis normativo con fuentes oficiales`,
        dateMs: e.displayDateMs ?? e.dateMs ?? 0,
      })) ?? [];

  const jurisprudenciaItems =
    jurisprudenciaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/jurisprudencia/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.displayDateMs ?? 0, "es-ES")} · Resoluciones clave sobre algoritmos y derechos`,
        dateMs: e.displayDateMs ?? e.dateMs ?? 0,
      })) ?? [];

  const guiasItems =
    guiasTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/recursos/guias/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.displayDateMs ?? 0, "es-ES")} · Repositorio de documentación técnica y ética`,
        dateMs: e.displayDateMs ?? e.dateMs ?? 0,
      })) ?? [];

  const latestActualidadMs = toMs(unifiedActualidad[0]?.date);
  const latestJurisprudenciaMs =
    jurisprudenciaTopEntries[0]?.displayDateMs ?? jurisprudenciaTopEntries[0]?.dateMs ?? 0;
  const latestNormativaMs =
    normativaTopEntries[0]?.displayDateMs ?? normativaTopEntries[0]?.dateMs ?? 0;
  const latestGuiasMs = guiasTopEntries[0]?.displayDateMs ?? guiasTopEntries[0]?.dateMs ?? 0;
  const latestFirmaMs = toMs(unifiedFirma[0]?.date);
  const actualidadWeeklyCount = unifiedActualidad.filter((e) => isNew(e.date)).length;
  const firmaWeeklyCount = unifiedFirma.filter((e) => isNew(e.date)).length;

  const normativaWeeklyCount = normativaEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.displayDateMs ?? 0)).length;
  const jurisprudenciaWeeklyCount = jurisprudenciaEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.displayDateMs ?? 0)).length;
  const guiasWeeklyCount = guiasEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.displayDateMs ?? 0)).length;

  const uniqueByHref = <T extends { href: string }>(arr: T[]) => {
    const seen = new Set<string>();
    const res: T[] = [];
    for (const it of arr) {
      if (seen.has(it.href)) continue;
      seen.add(it.href);
      res.push(it);
    }
    return res;
  };

  const sectionCards = [
    {
      key: "firma-scarpa",
      label: "Firma Scarpa",
      href: "/firma-scarpa",
      items: uniqueByHref(
        [unifiedFirma[0], unifiedFirma[1]]
          .filter((e): e is NonNullable<typeof e> => Boolean(e))
          .map((e) => ({
            title: e.title,
            href: e.urlPath,
            description: e.description ?? "",
            meta: `${formatDate(e.date)} · ${e.author}`,
            dateMs: e.date,
          })),
      ),
    },
    {
      key: "jurisprudencia",
      label: "Jurisprudencia",
      href: "/jurisprudencia",
      items: uniqueByHref(jurisprudenciaItems).slice(0, 2),
    },
    {
      key: "normativa",
      label: "Normativa",
      href: "/normativa",
      items: uniqueByHref(normativaItems).slice(0, 2),
    },
    {
      key: "guias",
      label: "Guías y Protocolos",
      href: "/recursos/guias",
      items: uniqueByHref(guiasItems).slice(0, 2),
    },
    {
      key: "glosario",
      label: "Glosario IA legal",
      href: "/glosario-ia-legal",
    },
    {
      key: "quienes-somos",
      label: "Quiénes somos",
      href: "/quienes-somos",
    },
    {
      key: "contacto",
      label: "Contacto",
      href: "/contacto",
    },
  ];

  const getCtaLabel = (key: string) => {
    switch (key) {
      case "normativa":
        return "Ver normativa";
      case "jurisprudencia":
        return "Ver jurisprudencia";
      case "guias":
        return "Navegar guías";
      case "firma-scarpa":
        return "Conocer la firma";
      case "glosario":
        return "Ver glosario";
      case "quienes-somos":
        return "Conocer el proyecto";
      case "contacto":
        return "Contactar";
      default:
        return "Ver sección";
    }
  };

  return (
    <>
      <Breadcrumbs 
        items={[
          { label: "Inicio", href: "/" }
        ]}
      />
      <main>
      <section className="relative w-full h-80 md:h-96 lg:h-[500px]">
        <Image
          src="/images/hero-home.jpg"
          alt="Derecho e IA"
          fill
          className="object-cover bg-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl">
            Derecho, ética y regulación de la IA
          </h1>
          <p className="text-base md:text-xl lg:text-2xl mt-4 max-w-3xl drop-shadow-lg">
            Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.
          </p>
          <div className="mt-8 flex flex-col md:flex-row gap-4">
            <Link
              href="/actualidad-ia"
              className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors"
            >
              Ver noticias IA
            </Link>
            <Link
              href="/#secciones"
              className="bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Explorar secciones
            </Link>
          </div>
        </div>
      </section>
      
      

      <section className="section-spacing bento-surface">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">
                Noticias IA
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Últimas novedades por sección
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="text-sm text-caption">
                Explora nuestros últimos briefings, ensayos y actualizaciones. Selección editorial para aportar criterio técnico y jurídico.
              </p>
              <div className="mt-3">
                <Link
                  href="/actualidad-ia"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Ver todas las noticias
                </Link>
              </div>
            </div>
          </div>
          {(() => {
            const sections = [
              {
                title: "Firma Scarpa",
                category: "firma-scarpa",
                image: "/images/sections/firma-scarpa.jpg",
                href: "/firma-scarpa",
              },
              {
                title: "Normativa IA",
                category: "normativa",
                image: "/images/sections/normativa.jpg",
                href: "/normativa",
              },
              {
                title: "Jurisprudencia IA",
                category: "jurisprudencia",
                image: "/images/sections/jurisprudencia.jpg",
                href: "/jurisprudencia",
              },
              {
                title: "Actualidad IA",
                category: "actualidad-ia",
                image: "/images/sections/recursos.jpg",
                href: "/actualidad-ia",
              },
              {
                title: "Propiedad Intelectual IA",
                category: "propiedad-intelectual-ia",
                image: "/images/sections/propiedad-intelectual.jpg",
                href: "/propiedad-intelectual-ia",
              },
              {
                title: "Ética IA",
                category: "etica-ia",
                image: "/images/sections/etica.jpg",
                href: "/etica-ia",
              },
              {
                title: "IA Global",
                category: "ia-global",
                image: "/images/sections/ia-global.jpg",
                href: "/ia-global",
              },
            ];
            const getLatestByCategory = (cat: string) =>
              mdxPosts
                .filter((post) => {
                  const c = (post.frontmatter.category || "").toLowerCase();
                  if (c !== cat) return false;
                  if (c === "recursos") {
                    const subcat = (post.frontmatter.subcategory || "").toLowerCase();
                    const tags = (post.frontmatter.tags || []).map((t: string) => t.toLowerCase());
                    return subcat === "guias" || tags.includes("guias");
                  }
                  return true;
                })
                .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
                .slice(0, 2);

            const buildHref = (post: any) => {
              const c = (post.frontmatter.category || "").toLowerCase();
              const subcat = (post.frontmatter.subcategory || "").toLowerCase();
              const tags = (post.frontmatter.tags || []).map((t: string) => t.toLowerCase());

              if (c === "recursos" && (subcat === "guias" || tags.includes("guias"))) {
                return `/recursos/guias/${post.slug}`;
              }

              return post.url;
            };

            return (
              <div className="space-y-10">
                {sections.map((sec) => {
                  const items = getLatestByCategory(sec.category);
                  const slots = Array.from({ length: 2 }, (_, i) => items[i] ?? null);
                  return (
                    <div
                      key={sec.category}
                      className="group flex flex-col md:flex-col lg:flex-row rounded-lg overflow-hidden border border-divider shadow-md hover:shadow-lg transition"
                    >
                      <Link
                        href={sec.href}
                        className="relative w-full lg:w-5/12 aspect-[4/3] md:aspect-video lg:aspect-[4/3] overflow-hidden"
                      >
                        <Image
                          src={sec.image}
                          alt={sec.title}
                          fill
                          sizes="(min-width: 1024px) 40vw, 100vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105 group-hover:brightness-110"
                          priority={false}
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
                        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                          <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
                            {sec.title}
                          </h3>
                        </div>
                      </Link>
                      <div className="w-full lg:w-7/12 p-6 flex flex-col gap-6 bg-white">
                        {slots.map((post, idx) =>
                          post ? (
                            <Link
                              key={`${post.slug}-${idx}`}
                              href={buildHref(post)}
                              className="group bg-white border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                                {sec.title}
                              </p>
                              <h4 className="font-serif text-lg text-foreground mb-2">
                                {post.frontmatter.title}
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                              </h4>
                              <p className="text-xs text-caption mb-2">{formatDate(post.frontmatter.date)}</p>
                              <p className="text-sm text-body line-clamp-3">{post.excerpt}</p>
                            </Link>
                          ) : (
                            <div
                              key={`placeholder-${sec.category}-${idx}`}
                              className="border border-dashed border-divider rounded-sm p-5 bg-white"
                            >
                              <p className="text-sm text-body">Próximamente contenido</p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      
    </main>
    </>
  );
}
