import type { Metadata } from "next";
import Link from "next/link";
import { listContentSlugs, getContentEntry } from "@/lib/content";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { Badges, isNew, isRecent, formatDateFromMs, getItemDateMs } from "@/lib/badges";
import { IndicatorsLegend } from "@/components/ui/IndicatorsLegend";

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
      date: new Date(e.datePublished).getTime(),
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
      date: new Date(e.datePublished).getTime(),
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
      <section className="section-spacing bento-surface">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">
                Mapa de referencia
              </p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Derecho e IA en un vistazo
              </h2>
            </div>
            <p className="text-sm text-caption max-w-xl">
              Acceso directo a las áreas clave del proyecto con contexto y actividad reciente.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 auto-rows-[minmax(160px,_auto)]">
            <Link href="/glosario-ia-legal" className="bg-card border border-border rounded-sm p-6 lg:col-span-3 lg:row-span-2 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Glosario</p>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">Glosario de IA legal</h3>
              <p className="text-sm text-body">Diccionario técnico y jurídico del ecosistema europeo.</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-caption">
                <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Nuevo</span>
                <span>Actualizado</span>
              </div>
            </Link>
            <Link href="/actualidad-ia" className="bg-card border border-border rounded-sm p-6 lg:col-span-3 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Actualidad IA</p>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Briefings y análisis editoriales</h3>
              <p className="text-sm text-body">Últimas entradas y recursos de actualidad.</p>
              <p className="mt-4 text-xs text-caption">Entradas recientes: {unifiedActualidad.length}</p>
              {latestActualidadMs > 0 && (
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                  {isNew(latestActualidadMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Nuevo</span>
                  )}
                  {isRecent(latestActualidadMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Actualizado</span>
                  )}
                  <span>{formatDateFromMs(latestActualidadMs, "es-ES")}</span>
                </div>
              )}
            </Link>
            <Link href="/jurisprudencia" className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Jurisprudencia</p>
              <h3 className="font-display text-xl text-foreground mb-2">Resoluciones clave</h3>
              <p className="text-sm text-body">Selección de casos sobre algoritmos y derechos.</p>
              <p className="mt-4 text-xs text-caption">Entradas: {jurisprudenciaSlugs.length}</p>
              {latestJurisprudenciaMs > 0 && (
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                  {isNew(latestJurisprudenciaMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Nuevo</span>
                  )}
                  {isRecent(latestJurisprudenciaMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Actualizado</span>
                  )}
                  <span>{formatDateFromMs(latestJurisprudenciaMs, "es-ES")}</span>
                </div>
              )}
            </Link>
            <Link href="/normativa" className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Normativa</p>
              <h3 className="font-display text-xl text-foreground mb-2">Marco regulatorio</h3>
              <p className="text-sm text-body">EU AI Act y regulación aplicable.</p>
              <p className="mt-4 text-xs text-caption">Entradas: {normativaSlugs.length}</p>
              {latestNormativaMs > 0 && (
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                  {isNew(latestNormativaMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Nuevo</span>
                  )}
                  {isRecent(latestNormativaMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Actualizado</span>
                  )}
                  <span>{formatDateFromMs(latestNormativaMs, "es-ES")}</span>
                </div>
              )}
            </Link>
            <Link href="/recursos/guias" className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Guías y Protocolos</p>
              <h3 className="font-display text-xl text-foreground mb-2">Biblioteca técnica y ética</h3>
              <p className="text-sm text-body">Documentación oficial y soft law.</p>
              <p className="mt-4 text-xs text-caption">Documentos: {guiasSlugs.length}</p>
              {latestGuiasMs > 0 && (
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                  {isNew(latestGuiasMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Nuevo</span>
                  )}
                  {isRecent(latestGuiasMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Actualizado</span>
                  )}
                  <span>{formatDateFromMs(latestGuiasMs, "es-ES")}</span>
                </div>
              )}
            </Link>
            <Link href="/firma-scarpa" className="bg-card border border-border rounded-sm p-6 lg:col-span-4 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Firma Scarpa</p>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Ensayos y notas de trabajo</h3>
              <p className="text-sm text-body">Análisis propios y materiales descargables.</p>
              <p className="mt-4 text-xs text-caption">Entradas: {unifiedFirma.length}</p>
              {latestFirmaMs > 0 && (
                <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                  {isNew(latestFirmaMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Nuevo</span>
                  )}
                  {isRecent(latestFirmaMs) && (
                    <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">Actualizado</span>
                  )}
                  <span>{formatDateFromMs(latestFirmaMs, "es-ES")}</span>
                </div>
              )}
            </Link>
          </div>
          <IndicatorsLegend locale="es-ES" />
        </div>
      </section>
      <section className="py-20 md:py-28 bg-surface border-b border-divider">
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">
            Derecho, ética y regulación de la IA
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-[1.05]">
            Derecho Artificial
          </h1>
          <p className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mx-auto">
            Inteligencia Artificial, derecho y criterio. Referencia práctica para decisiones informadas.
          </p>
        </div>
      </section>

      <section className="section-spacing bento-surface">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">
                Novedades
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Lo último en Derecho e IA
              </h2>
            </div>
            <p className="text-sm text-caption max-w-xl">
              Selección de los últimos briefings, ensayos y documentos críticos sobre inteligencia artificial,
              ordenados de más reciente a más antiguo.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {latestActualidad && (
              <Link
                href={latestActualidad.urlPath}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Actualidad IA
                </p>
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {latestActualidad.title}
                </h3>
                <p className="text-sm text-body mb-4 line-clamp-3">
                  {latestActualidad.description}
                </p>
                <p className="mt-auto text-xs text-caption">
                  {formatDate(latestActualidad.date)} · {latestActualidad.author}
                </p>
              </Link>
            )}

            {latestFirma && (
              <Link
                href={latestFirma.urlPath}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Firma Scarpa
                </p>
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {latestFirma.title}
                </h3>
                <p className="text-sm text-body mb-4 line-clamp-3">
                  {latestFirma.description}
                </p>
                <p className="mt-auto text-xs text-caption">
                  {formatDate(latestFirma.date)} · {latestFirma.author}
                </p>
              </Link>
            )}

            {latestNormativa && (
              <Link
                href={`/normativa/${latestNormativa.slug}`}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Normativa
                </p>
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {latestNormativa.title}
                </h3>
                {latestNormativa.summaryHtml && (
                  <p className="text-sm text-body mb-4 line-clamp-3">
                    {latestNormativa.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)}
                  </p>
                )}
                <p className="mt-auto text-xs text-caption">
                  Análisis normativo con fuentes oficiales
                </p>
              </Link>
            )}

            {latestJurisprudencia && (
              <Link
                href={`/jurisprudencia/${latestJurisprudencia.slug}`}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Jurisprudencia
                </p>
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {latestJurisprudencia.title}
                </h3>
                {latestJurisprudencia.summaryHtml && (
                  <p className="text-sm text-body mb-4 line-clamp-3">
                    {latestJurisprudencia.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)}
                  </p>
                )}
                <p className="mt-auto text-xs text-caption">
                  Resoluciones clave sobre algoritmos y derechos
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
