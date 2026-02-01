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
  const sections = [
    { name: "Firma Scarpa", href: "/firma-scarpa" },
    { name: "Jurisprudencia", href: "/jurisprudencia" },
    { name: "Actualidad IA", href: "/actualidad-ia" },
    { name: "Normativa", href: "/normativa" },
    { name: "Guías y Protocolos", href: "/recursos/guias" },
    { name: "Quiénes somos", href: "/quienes-somos" },
    { name: "Contacto", href: "/contacto" },
  ];

  const [actualidadSlugs, firmaSlugs, normativaSlugs, jurisprudenciaSlugs] = await Promise.all([
    listContentSlugs("actualidad-ia"),
    listContentSlugs("firma-scarpa"),
    listSectionResourceSlugs("normativa"),
    listSectionResourceSlugs("jurisprudencia"),
  ]);

  const [actualidadEntries, firmaEntries] = await Promise.all([
    Promise.all(actualidadSlugs.map((slug) => getContentEntry("actualidad-ia", slug))),
    Promise.all(firmaSlugs.map((slug) => getContentEntry("firma-scarpa", slug))),
  ]);

  const resolvedActualidad = actualidadEntries.filter((e): e is NonNullable<typeof e> => Boolean(e));
  const resolvedFirma = firmaEntries.filter((e): e is NonNullable<typeof e> => Boolean(e));

  resolvedActualidad.sort((a, b) => {
    const aTime = new Date(a.datePublished).getTime();
    const bTime = new Date(b.datePublished).getTime();
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
    return bTime - aTime;
  });

  resolvedFirma.sort((a, b) => {
    const aTime = new Date(a.datePublished).getTime();
    const bTime = new Date(b.datePublished).getTime();
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
    return bTime - aTime;
  });

  const latestActualidad = resolvedActualidad[0] ?? null;
  const latestFirma = resolvedFirma[0] ?? null;

  const [latestNormativa, latestJurisprudencia] = await Promise.all([
    normativaSlugs[0] ? getSectionResourceEntry("normativa", normativaSlugs[0]) : Promise.resolve(null),
    jurisprudenciaSlugs[0] ? getSectionResourceEntry("jurisprudencia", jurisprudenciaSlugs[0]) : Promise.resolve(null),
  ]);

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

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
                  {formatDate(latestActualidad.datePublished)} · {latestActualidad.author}
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
                  {formatDate(latestFirma.datePublished)} · {latestFirma.author}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-medium text-foreground">{s.name}</span>
                  <span className="text-primary">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
