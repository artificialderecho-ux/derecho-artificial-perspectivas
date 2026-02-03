import type { Metadata } from "next";
import Link from "next/link";
import { listContentSlugs, getContentEntry } from "@/lib/content";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";

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

  const formatDateFromMs = (value: number | null | undefined) => {
    if (value == null) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
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
        meta: `${formatDateFromMs(e.dateMs)} · Análisis normativo con fuentes oficiales`,
      })) ?? [];

  const jurisprudenciaItems =
    jurisprudenciaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/jurisprudencia/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs)} · Resoluciones clave sobre algoritmos y derechos`,
      })) ?? [];

  const guiasItems =
    guiasTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/recursos/guias/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs)} · Repositorio de documentación técnica y ética`,
      })) ?? [];

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

  return (
    <main>
      <section className="py-20 md:py-28 bg-surface border-b border-divider">
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">
            Derecho, ética y regulación de la IA
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-[1.05]">
            Derecho Artificial
          </h1>
          <p className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mx-auto">
            Análisis jurídico y editorial independiente sobre inteligencia artificial, con foco en normativa,
            jurisprudencia y práctica profesional.
          </p>
        </div>
      </section>

      <section className="section-spacing">
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

      <section className="section-spacing">
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
                    Ver sección <span>→</span>
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
