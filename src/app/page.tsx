import type { Metadata } from "next";
import Link from "next/link";
import { listContentSlugs, getContentEntry } from "@/lib/content";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { Badges, isNew, isRecent, formatDateFromMs, getItemDateMs } from "@/lib/badges";
import { IndicatorsLegend } from "@/components/ui/IndicatorsLegend";
import { StructuredData } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Derecho, ética y regulación de la IA",
  description:
    "Análisis jurídico y editorial independiente sobre inteligencia artificial: normativa, jurisprudencia, cumplimiento y práctica jurídica.",
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
      "Análisis jurídico y editorial independiente sobre inteligencia artificial: normativa, jurisprudencia, cumplimiento y práctica jurídica.",
    url: "/",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
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
      date: typeof e.dateMs === "number" && !Number.isNaN(e.dateMs) ? e.dateMs : 0,
      urlPath: e.urlPath,
      author: e.author,
    })),
    ...resolvedActualidadResources.map((e) => ({
      title: e.title,
      description: e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
      date: e.dateMs ?? 0,
      urlPath: `/actualidad-ia/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ];

  const unifiedFirma = [
    ...resolvedFirmaJson.map((e) => ({
      title: e.title,
      description: e.description,
      date: typeof e.dateMs === "number" && !Number.isNaN(e.dateMs) ? e.dateMs : 0,
      urlPath: e.urlPath,
      author: e.author,
    })),
    ...resolvedFirmaResources.map((e) => ({
      title: e.title,
      description: e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
      date: e.dateMs ?? 0,
      urlPath: `/firma-scarpa/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ];

  unifiedActualidad.sort((a, b) => b.date - a.date);
  unifiedFirma.sort((a, b) => b.date - a.date);

  const latestActualidad = unifiedActualidad[0] ?? null;
  const latestFirma = unifiedFirma[0] ?? null;

  const [latestNormativa, latestJurisprudencia, latestGuias] = await Promise.all([
    normativaSlugs[0]
      ? getSectionResourceEntry("normativa", normativaSlugs[0])
      : Promise.resolve(null),
    jurisprudenciaSlugs[0]
      ? getSectionResourceEntry("jurisprudencia", jurisprudenciaSlugs[0])
      : Promise.resolve(null),
    guiasSlugs[0] ? getSectionResourceEntry("guias", guiasSlugs[0]) : Promise.resolve(null),
  ]);

  const formatDate = (value: string | number) => {
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
    Promise.all(
      normativaSlugs.slice(0, 2).map((slug) => getSectionResourceEntry("normativa", slug)),
    ),
    Promise.all(
      jurisprudenciaSlugs.slice(0, 2).map((slug) => getSectionResourceEntry("jurisprudencia", slug)),
    ),
    Promise.all(guiasSlugs.slice(0, 2).map((slug) => getSectionResourceEntry("guias", slug))),
  ]);

  const normativaItems =
    normativaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/normativa/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs, "es-ES")} · Análisis normativo con fuentes oficiales`,
        dateMs: e.dateMs ?? 0,
      })) ?? [];

  const jurisprudenciaItems =
    jurisprudenciaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/jurisprudencia/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs, "es-ES")} · Resoluciones clave sobre algoritmos y derechos`,
        dateMs: e.dateMs ?? 0,
      })) ?? [];

  const guiasItems =
    guiasTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/recursos/guias/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs, "es-ES")} · Repositorio de documentación técnica y ética`,
        dateMs: e.dateMs ?? 0,
      })) ?? [];

  const latestActualidadMs = toMs(unifiedActualidad[0]?.date);
  const latestJurisprudenciaMs = jurisprudenciaTopEntries[0]?.dateMs ?? 0;
  const latestNormativaMs = normativaTopEntries[0]?.dateMs ?? 0;
  const latestGuiasMs = guiasTopEntries[0]?.dateMs ?? 0;
  const latestFirmaMs = toMs(unifiedFirma[0]?.date);
  const actualidadWeeklyCount = unifiedActualidad.filter((e) => isNew(e.date)).length;
  const firmaWeeklyCount = unifiedFirma.filter((e) => isNew(e.date)).length;

  const [normativaEntriesAll, jurisprudenciaEntriesAll, guiasEntriesAll] = await Promise.all([
    Promise.all(normativaSlugs.map((slug) => getSectionResourceEntry("normativa", slug))),
    Promise.all(jurisprudenciaSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug))),
    Promise.all(guiasSlugs.map((slug) => getSectionResourceEntry("guias", slug))),
  ]);
  const normativaWeeklyCount = normativaEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.dateMs ?? 0)).length;
  const jurisprudenciaWeeklyCount = jurisprudenciaEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.dateMs ?? 0)).length;
  const guiasWeeklyCount = guiasEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.dateMs ?? 0)).length;

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
    <main>
      <section className="py-20 md:py-28 bg-surface border-b border-divider">
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">
            Derecho, ética y regulación de la IA
          </p>
          <h1 className="font-sans text-4xl md:text-6xl text-foreground mb-6 leading-[1.05]">
            Derecho Artificial, Ética y Regulación de la IA
          </h1>
          <h2 className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mx-auto">
            Más allá de las noticias: análisis jurídico independiente y criterio experto sobre el Reglamento de IA y su impacto legal. La referencia práctica para abogados y profesionales del compliance.
          </h2>
        </div>
      </section>
      <section className="section-spacing bento-surface">
        <div className="container-wide">
          <div className="grid gap-6 md:grid-cols-2">
            <Link href="/firma-scarpa" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Firma Scarpa</h3>
              <h2 className="text-sm md:text-base text-body">La Firma: Opinión experta y análisis crítico del Derecho Digital</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestFirmaMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" />
                <span className="text-[10px]">Entradas: {unifiedFirma.length}</span>
              </div>
            </Link>
            <Link href="/jurisprudencia" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Jurisprudencia</h3>
              <h2 className="text-sm md:text-base text-body">Observatorio de Jurisprudencia: Sentencias y fallos sobre Inteligencia Artificial</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestJurisprudenciaMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" />
                <span className="text-[10px]">Entradas: {jurisprudenciaSlugs.length}</span>
              </div>
            </Link>
            <Link href="/actualidad-ia" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Actualidad IA</h3>
              <h2 className="text-sm md:text-base text-body">Actualidad Legal Tech: Novedades e impacto jurídico de la tecnología</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestActualidadMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" />
                <span className="text-[10px]">Entradas recientes: {unifiedActualidad.length}</span>
              </div>
            </Link>
            <Link href="/normativa" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Normativa</h3>
              <h2 className="text-sm md:text-base text-body">Marco Regulatorio: Leyes, reglamentos y Compliance en IA</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestNormativaMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" />
                <span className="text-[10px]">Entradas: {normativaSlugs.length}</span>
              </div>
            </Link>
            <Link href="/recursos/guias" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Guías y Protocolos</h3>
              <h2 className="text-sm md:text-base text-body">Guías Prácticas y Protocolos de actuación profesional</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestGuiasMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" />
                <span className="text-[10px]">Documentos: {guiasSlugs.length}</span>
              </div>
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
                Actualidad
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Actualidad y Análisis: El pulso legal de la IA
              </h2>
            </div>
            <div className="max-w-xl">
              <p className="text-sm text-caption">
                Explora nuestros últimos briefings, ensayos y documentos críticos. Una selección editorial diseñada para dotar de criterio técnico y jurídico a los profesionales que lideran la transformación digital.
              </p>
              <div className="mt-3">
                <Link
                  href="/actualidad-ia"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Ver toda la actualidad
                </Link>
              </div>
            </div>
          </div>
          <StructuredData
            data={{
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                latestActualidad && {
                  "@type": "ListItem",
                  position: 1,
                  url: latestActualidad.urlPath,
                  name: latestActualidad.title,
                  datePublished: new Date(latestActualidad.date).toISOString(),
                },
                latestFirma && {
                  "@type": "ListItem",
                  position: 2,
                  url: latestFirma.urlPath,
                  name: latestFirma.title,
                  datePublished: new Date(latestFirma.date).toISOString(),
                },
                latestNormativa && {
                  "@type": "ListItem",
                  position: 3,
                  url: `/normativa/${latestNormativa.slug}`,
                  name: latestNormativa.title,
                  datePublished: latestNormativa.dateMs
                    ? new Date(latestNormativa.dateMs).toISOString()
                    : undefined,
                },
                latestJurisprudencia && {
                  "@type": "ListItem",
                  position: 4,
                  url: `/jurisprudencia/${latestJurisprudencia.slug}`,
                  name: latestJurisprudencia.title,
                  datePublished: latestJurisprudencia.dateMs
                    ? new Date(latestJurisprudencia.dateMs).toISOString()
                    : undefined,
                },
              ].filter(Boolean),
            }}
          />

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {latestActualidad && (
              <Link
                href={latestActualidad.urlPath}
                className="group bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Actualidad IA
                </p>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {latestActualidad.title}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                </h3>
                <Badges ms={latestActualidad.date} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" className="mb-3 inline-flex items-center gap-2 text-xs text-caption" />
                <p className="text-sm text-body mb-4 line-clamp-3">
                  {latestActualidad.description}
                </p>
                <p className="mt-auto text-xs text-caption">{formatDate(latestActualidad.date)}</p>
              </Link>
            )}

            {latestFirma && (
              <Link
                href={latestFirma.urlPath}
                className="group bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Firma Scarpa
                </p>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {latestFirma.title}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                </h3>
                <Badges ms={latestFirma.date} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" className="mb-3 inline-flex items-center gap-2 text-xs text-caption" />
                <p className="text-sm text-body mb-4 line-clamp-3">
                  {latestFirma.description}
                </p>
                <p className="mt-auto text-xs text-caption">{formatDate(latestFirma.date)}</p>
              </Link>
            )}

            {latestNormativa && (
              <Link
                href={`/normativa/${latestNormativa.slug}`}
                className="group bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Normativa
                </p>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {latestNormativa.title}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                </h3>
                <Badges ms={latestNormativa.dateMs ?? 0} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" className="mb-3 inline-flex items-center gap-2 text-xs text-caption" />
                {latestNormativa.summaryHtml && (
                  <p className="text-sm text-body mb-4 line-clamp-3">
                    {latestNormativa.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)}
                  </p>
                )}
                <p className="mt-auto text-xs text-caption">
                  {latestNormativa.dateMs ? formatDateFromMs(latestNormativa.dateMs, "es-ES") : ""}
                </p>
              </Link>
            )}

            {latestJurisprudencia && (
              <Link
                href={`/jurisprudencia/${latestJurisprudencia.slug}`}
                className="group bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Jurisprudencia
                </p>
                <h3 className="font-serif text-lg text-foreground mb-2">
                  {latestJurisprudencia.title}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">→</span>
                </h3>
                <Badges ms={latestJurisprudencia.dateMs ?? 0} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" className="mb-3 inline-flex items-center gap-2 text-xs text-caption" />
                {latestJurisprudencia.summaryHtml && (
                  <p className="text-sm text-body mb-4 line-clamp-3">
                    {latestJurisprudencia.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)}
                  </p>
                )}
                <p className="mt-auto text-xs text-caption">
                  {latestJurisprudencia.dateMs
                    ? formatDateFromMs(latestJurisprudencia.dateMs, "es-ES")
                    : ""}
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section-spacing bento-surface">
        <div className="container-wide">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Secciones
          </h2>
          <div className="space-y-6">
            {sectionCards.map((section) => (
              <div
                key={section.key}
                className="card-elevated p-6 md:p-8 hover:border-primary/20 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    {section.items && section.items.length > 0 && (
                      <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-2">
                        Sección
                      </p>
                    )}
                    <h3 className="font-serif text-xl md:text-2xl text-foreground">{section.label}</h3>
                  </div>
                  <Link
                    href={section.href}
                    className="text-sm font-medium text-primary inline-flex items-center gap-1"
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
        </div>
      </section>
    </main>
  );
}
