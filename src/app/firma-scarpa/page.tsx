import type { Metadata } from "next";
import Link from "next/link";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Firma Scarpa",
  description:
    "Textos y análisis firmados por el responsable editorial sobre Derecho e Inteligencia Artificial.",
  keywords: [
    "Ricardo Scarpa",
    "derecho artificial",
    "análisis jurídico IA",
    "opinión jurídica",
    "regulación IA",
    "AI Act",
    "cumplimiento",
  ],
  alternates: {
    canonical: "/firma-scarpa",
    languages: {
      "es-ES": "/firma-scarpa",
      "en-US": "/en/scarpa-firm",
    },
  },
  openGraph: {
    type: "website",
    title: "Firma Scarpa",
    description:
      "Textos y análisis firmados por el responsable editorial sobre Derecho e Inteligencia Artificial.",
    url: "/firma-scarpa",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function FirmaScarpaPage() {
  const slugs = await listContentSlugs("firma-scarpa");
  const entries = await Promise.all(slugs.map((slug) => getContentEntry("firma-scarpa", slug)));
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
            Firma Scarpa
          </h1>
          <p className="lead mt-6 text-justify max-w-3xl">
            Columna editorial y ensayos jurídicos bajo la firma de Ricardo Scarpa. Un espacio de reflexión 
            profunda sobre la intersección entre tecnología y ley, abordando desde la ética del algoritmo 
            hasta las implicaciones prácticas del Reglamento de IA en el sector legal.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {sortedEntries.map((entry) => (
            <Link
              key={entry.slug}
              href={entry.urlPath}
              className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
            >
              <p className="text-xs uppercase tracking-widest text-caption mb-3">Ensayo</p>
              <h2 className="font-serif text-2xl text-foreground mb-4">{entry.title}</h2>
              <p className="text-body mb-6">{entry.description}</p>
              <div className="text-sm text-caption">
                {formatDate(entry.datePublished)} · {entry.author}
              </div>
            </Link>
          ))}
        </section>

        <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
          <p className="text-xs uppercase tracking-widest text-caption mb-3">Enfoque editorial</p>
          <p className="text-body max-w-3xl">
            La firma aborda el impacto jurídico de la IA desde la práctica profesional: cumplimiento normativo,
            responsabilidad y diseño de garantías. Cada texto se construye a partir de fuentes verificables y
            experiencias de implementación en entornos regulatorios complejos.
          </p>
        </section>
      </div>
    </main>
  );
}
