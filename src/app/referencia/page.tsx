import type { Metadata } from "next";
import Link from "next/link";
import { listContentSlugs, getContentEntry } from "@/lib/content";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { Badges, formatDateFromMs, isNew } from "@/lib/badges";

export const metadata: Metadata = {
  title: "Referencia | Derecho Artificial",
  description:
    "Mapa de valor y capacidades editoriales: legislación, jurisprudencia, actualidad y biblioteca técnica con señales dinámicas.",
  alternates: {
    canonical: "/referencia",
    languages: {
      "es-ES": "/referencia",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    title: "Referencia | Derecho Artificial",
    description:
      "Mapa de valor y capacidades editoriales: legislación, jurisprudencia, actualidad y biblioteca técnica con señales dinámicas.",
    url: "/referencia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default async function ReferenciaPage() {
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
      description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
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
      description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
      date: e.dateMs ?? 0,
      urlPath: `/firma-scarpa/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ];
  unifiedActualidad.sort((a, b) => b.date - a.date);
  unifiedFirma.sort((a, b) => b.date - a.date);

  const [normativaTopEntries, jurisprudenciaTopEntries, guiasTopEntries] = await Promise.all([
    Promise.all(normativaSlugs.slice(0, 3).map((slug) => getSectionResourceEntry("normativa", slug))),
    Promise.all(
      jurisprudenciaSlugs.slice(0, 3).map((slug) => getSectionResourceEntry("jurisprudencia", slug)),
    ),
    Promise.all(guiasSlugs.slice(0, 3).map((slug) => getSectionResourceEntry("guias", slug))),
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
        meta: `${formatDateFromMs(e.dateMs, "es-ES")} · Biblioteca técnica y ética`,
        dateMs: e.dateMs ?? 0,
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

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Referencia", url: "https://derechoartificial.com/referencia" },
    ],
  });

  const latestActualidadMs = unifiedActualidad[0]?.date ?? 0;
  const latestFirmaMs = unifiedFirma[0]?.date ?? 0;

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Referencia | Derecho Artificial",
          description:
            "Mapa de valor y capacidades editoriales: legislación, jurisprudencia, actualidad y biblioteca técnica.",
          url: "https://derechoartificial.com/referencia",
        }}
      />
      <main>
        <section className="section-spacing bento-surface">
          <div className="container-wide">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Referencia</p>
                <h1 className="font-display text-2xl md:text-3xl text-foreground">
                  Rigor editorial y señalización dinámica
                </h1>
              </div>
              <div className="text-sm">
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
                >
                  Contacto
                </Link>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 auto-rows-[minmax(160px,_auto)]">
              <Link
                href="/actualidad-ia"
                className="bg-card border border-border rounded-sm p-6 lg:col-span-3 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Actualidad IA</p>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Briefings y análisis</h3>
                <p className="text-sm text-body">Últimas entradas y recursos de actualidad.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-caption">
                  <Badges
                    ms={latestActualidadMs}
                    locale="es-ES"
                    newLabel="Nuevo"
                    updatedLabel="Actualizado"
                  />
                </div>
              </Link>
              <Link
                href="/firma-scarpa"
                className="bg-card border border-border rounded-sm p-6 lg:col-span-3 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Firma Scarpa</p>
                <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Ensayos y notas</h3>
                <p className="text-sm text-body">Análisis propios y materiales descargables.</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs text-caption">
                  <Badges ms={latestFirmaMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" />
                </div>
              </Link>
              <Link
                href="/normativa"
                className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Normativa</p>
                <h3 className="font-display text-xl text-foreground mb-2">Marco regulatorio</h3>
                <p className="text-sm text-body">EU AI Act y regulación aplicable.</p>
              </Link>
              <Link
                href="/jurisprudencia"
                className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Jurisprudencia</p>
                <h3 className="font-display text-xl text-foreground mb-2">Resoluciones clave</h3>
                <p className="text-sm text-body">Casos sobre algoritmos y derechos.</p>
              </Link>
              <Link
                href="/recursos/guias"
                className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Guías y Protocolos</p>
                <h3 className="font-display text-xl text-foreground mb-2">Biblioteca técnica</h3>
                <p className="text-sm text-body">Documentación oficial y soft law.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="section-spacing bento-surface">
          <div className="container-wide">
            <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">Secciones</h2>
            <div className="space-y-6">
              <div className="card-elevated p-6 md:p-8 hover:border-primary/20 transition-all duration-300 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-2">Sección</p>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground">Normativa</h3>
                  </div>
                  <Link href="/normativa" className="text-sm font-medium text-primary inline-flex items-center gap-1">
                    Ver sección <span>→</span>
                  </Link>
                </div>
                <div className="mt-2 flex flex-col gap-3">
                  {uniqueByHref(normativaItems).slice(0, 2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="border border-dashed border-divider rounded-sm p-4 hover:border-primary/40 transition-colors"
                    >
                      <p className="font-medium text-sm text-foreground mb-1">{item.title}</p>
                      <Badges
                        ms={item.dateMs}
                        locale="es-ES"
                        newLabel="Nuevo"
                        updatedLabel="Actualizado"
                        className="mb-2 inline-flex items-center gap-2 text-xs text-caption"
                      />
                      {item.description && <p className="text-sm text-body line-clamp-2">{item.description}</p>}
                      {item.meta && <p className="mt-2 text-xs text-caption">{item.meta}</p>}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card-elevated p-6 md:p-8 hover:border-primary/20 transition-all duration-300 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-2">Sección</p>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground">Jurisprudencia</h3>
                  </div>
                  <Link href="/jurisprudencia" className="text-sm font-medium text-primary inline-flex items-center gap-1">
                    Ver sección <span>→</span>
                  </Link>
                </div>
                <div className="mt-2 flex flex-col gap-3">
                  {uniqueByHref(jurisprudenciaItems).slice(0, 2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="border border-dashed border-divider rounded-sm p-4 hover:border-primary/40 transition-colors"
                    >
                      <p className="font-medium text-sm text-foreground mb-1">{item.title}</p>
                      <Badges
                        ms={item.dateMs}
                        locale="es-ES"
                        newLabel="Nuevo"
                        updatedLabel="Actualizado"
                        className="mb-2 inline-flex items-center gap-2 text-xs text-caption"
                      />
                      {item.description && <p className="text-sm text-body line-clamp-2">{item.description}</p>}
                      {item.meta && <p className="mt-2 text-xs text-caption">{item.meta}</p>}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card-elevated p-6 md:p-8 hover:border-primary/20 transition-all duration-300 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-2">Sección</p>
                    <h3 className="font-serif text-xl md:text-2xl text-foreground">Guías y Protocolos</h3>
                  </div>
                  <Link href="/recursos/guias" className="text-sm font-medium text-primary inline-flex items-center gap-1">
                    Ver sección <span>→</span>
                  </Link>
                </div>
                <div className="mt-2 flex flex-col gap-3">
                  {uniqueByHref(guiasItems).slice(0, 2).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="border border-dashed border-divider rounded-sm p-4 hover:border-primary/40 transition-colors"
                    >
                      <p className="font-medium text-sm text-foreground mb-1">{item.title}</p>
                      <Badges
                        ms={item.dateMs}
                        locale="es-ES"
                        newLabel="Nuevo"
                        updatedLabel="Actualizado"
                        className="mb-2 inline-flex items-center gap-2 text-xs text-caption"
                      />
                      {item.description && <p className="text-sm text-body line-clamp-2">{item.description}</p>}
                      {item.meta && <p className="mt-2 text-xs text-caption">{item.meta}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing">
          <div className="container-wide">
            <div className="rounded-lg border border-divider bg-surface p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Contacto</p>
                <h2 className="font-serif text-2xl md:text-3xl text-foreground">Colabora con el proyecto</h2>
                <p className="text-sm text-body mt-2">
                  Enlaces verificables, análisis riguroso y señalización dinámica del ecosistema legal de la IA.
                </p>
              </div>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors"
              >
                Abrir formulario
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
