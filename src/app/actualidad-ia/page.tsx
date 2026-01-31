import type { Metadata } from "next";
import Link from "next/link";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Actualidad IA",
  description:
    "Monitor editorial de novedades regulatorias, institucionales y jurisprudenciales sobre inteligencia artificial.",
  keywords: [
    "actualidad IA",
    "regulación IA",
    "AI Act",
    "AESIA",
    "AEPD",
    "cumplimiento IA",
    "noticias derecho digital",
  ],
  alternates: {
    canonical: "/actualidad-ia",
    languages: {
      "es-ES": "/actualidad-ia",
      "en-US": "/en/ai-news",
    },
  },
  openGraph: {
    type: "website",
    title: "Actualidad IA",
    description:
      "Monitor editorial de novedades regulatorias, institucionales y jurisprudenciales sobre inteligencia artificial.",
    url: "/actualidad-ia",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function ActualidadIAPage() {
  const slugs = await listContentSlugs("actualidad-ia");
  const entries = await Promise.all(slugs.map((slug) => getContentEntry("actualidad-ia", slug)));
  const resolvedEntries = entries.filter((entry): entry is ResolvedContentEntry => Boolean(entry));
  const sortedEntries = resolvedEntries.sort((a, b) => {
    const aTime = new Date(a.datePublished).getTime();
    const bTime = new Date(b.datePublished).getTime();
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
    return bTime - aTime;
  });

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Sección</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            Actualidad IA
          </h1>
          <p className="text-lg text-body mt-6">
            Novedades institucionales y análisis con foco en cumplimiento y práctica jurídica.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {sortedEntries.length ? (
            sortedEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={entry.urlPath}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-widest text-caption mb-3">Briefing editorial</p>
                <h2 className="font-serif text-2xl text-foreground mb-4">{entry.title}</h2>
                <p className="text-body mb-6">{entry.description}</p>
                <div className="text-sm text-caption">
                  {formatDate(entry.datePublished)} · {entry.author}
                </div>
              </Link>
            ))
          ) : (
            <div className="card-elevated p-6 md:col-span-2">
              <p className="text-xs uppercase tracking-widest text-caption mb-3">Repositorio</p>
              <h2 className="font-serif text-2xl text-foreground">Contenido en preparación</h2>
              <p className="text-body mt-4 max-w-2xl">
                Estamos organizando nuevos briefings sobre la agenda regulatoria de IA, criterios de cumplimiento
                y referencias institucionales. Próximas publicaciones durante el primer trimestre de 2026.
              </p>
            </div>
          )}
        </section>

        <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
          <p className="text-xs uppercase tracking-widest text-caption mb-3">Metodología editorial</p>
          <p className="text-body max-w-3xl">
            Cada briefing sintetiza documentos oficiales, posicionamientos regulatorios y criterios jurisprudenciales
            relevantes para equipos jurídicos y responsables de cumplimiento. La prioridad es la trazabilidad de
            fuentes y la aplicación práctica en entornos profesionales.
          </p>
        </section>
      </div>
    </main>
  );
}
