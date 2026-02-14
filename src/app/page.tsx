import type { Metadata } from "next";
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
      key: "actualidad-ia",
      label: "Actualidad IA",
      href: "/actualidad-ia",
      items: uniqueByHref(
        [unifiedActualidad[0], unifiedActualidad[1]]
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
      case "actualidad-ia":
        return "Leer actualidad";
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
      <section className="py-20 md:py-28 bg-surface border-b border-divider">
        <div className="container-narrow text-center">
          <h1 className="font-sans text-4xl md:text-6xl text-foreground mb-6 leading-[1.05]">
            Derecho, ética y regulación de la IA
          </h1>
          <p className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mx-auto">
            Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/recursos/noticias" className="px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors">
              Ver noticias IA
            </Link>
            <Link href="/#secciones" className="px-4 py-2 border border-divider rounded-sm text-foreground hover:bg-surface transition-colors">
              Explorar secciones
            </Link>
          </div>
        </div>
      </section>
      <section className="section-spacing bento-surface">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/firma-scarpa" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Firma Scarpa</h3>
              <h2 className="text-sm md:text-base text-body">La Firma: Opinión experta y análisis crítico del Derecho Digital</h2>
            </Link>
            <Link href="/jurisprudencia" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Jurisprudencia</h3>
              <h2 className="text-sm md:text-base text-body">Observatorio de Jurisprudencia: Sentencias y fallos sobre Inteligencia Artificial</h2>
            </Link>
            <Link href="/actualidad-ia" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Actualidad IA</h3>
              <h2 className="text-sm md:text-base text-body">Actualidad Legal Tech: Novedades e impacto jurídico de la tecnología</h2>
            </Link>
            <Link href="/normativa" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Normativa</h3>
              <h2 className="text-sm md:text-base text-body">Marco Regulatorio: Leyes, reglamentos y Compliance en IA</h2>
            </Link>
            <Link href="/recursos/guias" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Guías y Protocolos</h3>
              <h2 className="text-sm md:text-base text-body">Guías Prácticas y Protocolos de actuación profesional</h2>
            </Link>
            <Link href="/glosario-ia-legal" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Glosario IA</h3>
              <h2 className="text-sm md:text-base text-body">Diccionario de términos y conceptos legales</h2>
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
                  href="/recursos/noticias"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Ver todas las noticias
                </Link>
              </div>
            </div>
          </div>
          {(() => {
            const sections = [
              { key: "firma-scarpa", label: "Firma Scarpa", category: "firma-scarpa" },
              { key: "normativa", label: "Normativa IA", category: "normativa" },
              { key: "jurisprudencia", label: "Jurisprudencia IA", category: "jurisprudencia" },
              { key: "recursos", label: "Recursos IA", category: "recursos" },
              { key: "propiedad-intelectual-ia", label: "Propiedad Intelectual IA", category: "propiedad-intelectual-ia" },
              { key: "etica-ia", label: "Ética IA", category: "etica-ia" },
              { key: "ia-global", label: "IA Global", category: "ia-global" },
            ];
            const getLatestByCategory = (cat: string) =>
              mdxPosts
                .filter((post) => (post.frontmatter.category || "").toLowerCase() === cat)
                .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
                .slice(0, 2);
            return (
              <div className="space-y-8">
                {sections.map((sec) => {
                  const items = getLatestByCategory(sec.category);
                  return (
                    <div key={sec.key}>
                      <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">{sec.label}</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        {items.length > 0 ? (
                          items.map((post) => (
                            <Link
                              key={post.slug}
                              href={post.url}
                              className="group bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                            >
                              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                                {sec.label}
                              </p>
                              <h4 className="font-serif text-lg text-foreground mb-2">
                                {post.frontmatter.title}
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                              </h4>
                              <p className="text-xs text-caption mb-2">{formatDate(post.frontmatter.date)}</p>
                              <p className="text-sm text-body line-clamp-3">{post.excerpt}</p>
                            </Link>
                          ))
                        ) : (
                          <>
                            <div className="border border-dashed border-divider rounded-sm p-5">
                              <p className="text-sm text-body">Próximamente contenido</p>
                            </div>
                            <div className="hidden md:block border border-transparent rounded-sm p-5" />
                          </>
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

      <section id="secciones" className="section-spacing bento-surface">
        <div className="container-wide">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Secciones
          </h2>
          {
            // Build section cards aligned to 7-menu order with placeholders for new sections
          }
          {(() => {
            const recursosItems = uniqueByHref([
              ...guiasItems.slice(0, 1),
              ...[unifiedActualidad[0]]
                .filter((e): e is NonNullable<typeof e> => Boolean(e))
                .map((e) => ({
                  title: e.title,
                  href: e.urlPath,
                  description: e.description ?? "",
                  meta: `${formatDate(e.date)} · ${e.author}`,
                  dateMs: e.date,
                })),
            ]);
            const filterByCategory = (cat: string) =>
              mdxPosts
                .filter((post) => {
                  const c = (post.frontmatter.category || "").toLowerCase();
                  const tags = (post.frontmatter.tags || []).map((t: string) => t.toLowerCase());
                  return c === cat || tags.includes(cat);
                })
                .sort(
                  (a, b) =>
                    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
                )
                .slice(0, 2)
                .map((post) => ({
                  title: post.frontmatter.title,
                  href: post.url,
                  description: post.excerpt,
                  dateMs: new Date(post.frontmatter.date).getTime(),
                  meta: undefined,
                }));
            const propiedadItems = filterByCategory("propiedad-intelectual-ia");
            const eticaItems = filterByCategory("etica-ia");
            const globalItems = filterByCategory("ia-global");
            const cards = [
              {
                key: "firma-scarpa",
                label: "Firma Scarpa",
                href: "/firma-scarpa",
                description: "Opinión experta y análisis crítico del Derecho Digital",
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
                key: "normativa",
                label: "Normativa IA",
                href: "/normativa",
                description: "Leyes, reglamentos y cumplimiento de IA",
                items: uniqueByHref(normativaItems).slice(0, 2),
              },
              {
                key: "jurisprudencia",
                label: "Jurisprudencia IA",
                href: "/jurisprudencia",
                description: "Sentencias clave sobre algoritmos y derechos",
                items: uniqueByHref(jurisprudenciaItems).slice(0, 2),
              },
              {
                key: "recursos",
                label: "Recursos IA",
                href: "/recursos",
                description: "Guías, protocolos y noticias especializadas",
                items: recursosItems,
              },
              {
                key: "propiedad-intelectual-ia",
                label: "Propiedad Intelectual IA",
                href: "/propiedad-intelectual-ia",
                description: "Sección en desarrollo, pronto contenido",
                items: propiedadItems,
              },
              {
                key: "etica-ia",
                label: "Ética IA",
                href: "/etica-ia",
                description: "Sección en desarrollo, pronto contenido",
                items: eticaItems,
              },
              {
                key: "ia-global",
                label: "IA Global",
                href: "/ia-global",
                description: "Sección en desarrollo, pronto contenido",
                items: globalItems,
              },
            ];
            return (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cards.map((section) => (
                  <div
                    key={section.key}
                    className="card-elevated p-6 md:p-8 hover:border-primary/20 transition-all duration-300 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        {(section.items && section.items.length > 0) && (
                          <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-2">
                            Sección
                          </p>
                        )}
                        <h3 className="font-serif text-xl md:text-2xl text-foreground">{section.label}</h3>
                        {(!section.items || section.items.length === 0) && (
                          <p className="text-sm text-body mt-2">{section.description}</p>
                        )}
                      </div>
                      <Link
                        href={section.href}
                        className="text-sm font-medium text-primary inline-flex items-center gap-1 flex-shrink-0"
                      >
                        {getCtaLabel(section.key)} <span>→</span>
                      </Link>
                    </div>
                    {section.items && section.items.length > 0 && (
                      <div className="mt-2 flex flex-col gap-3">
                        {section.items.slice(0, 2).map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="border border-dashed border-divider rounded-sm p-4 hover:border-primary/40 transition-colors"
                          >
                            <p className="font-medium text-sm text-foreground mb-1">{item.title}</p>
                            <Badges
                              ms={getItemDateMs(item)}
                              locale="es-ES"
                              newLabel="Nuevo"
                              updatedLabel="Actualizado"
                              className="mb-2 inline-flex items-center gap-2 text-xs text-caption"
                            />
                            {item.description &&
                              item.title &&
                              item.description.trim().toLowerCase() !== item.title.trim().toLowerCase() && (
                                <p className="text-sm text-body line-clamp-2">{item.description}</p>
                              )}
                            {item.meta && <p className="mt-2 text-xs text-caption">{item.meta}</p>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      </section>
    </main>
    </>
  );
}
