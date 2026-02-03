import type { Metadata } from "next";
import Link from "next/link";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Jurisprudencia",
  description:
    "Selección y análisis de resoluciones relevantes sobre tecnología, datos e inteligencia artificial.",
  keywords: [
    "jurisprudencia IA",
    "derecho digital",
    "protección de datos",
    "RGPD",
    "decisiones judiciales",
    "algoritmos",
    "responsabilidad",
  ],
  alternates: {
    canonical: "/jurisprudencia",
    languages: {
      "es-ES": "/jurisprudencia",
      "en-US": "/en/jurisprudence",
    },
  },
  openGraph: {
    type: "website",
    title: "Jurisprudencia",
    description:
      "Selección y análisis de resoluciones relevantes sobre tecnología, datos e inteligencia artificial.",
    url: "/jurisprudencia",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

type SentenciaItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  meta: string;
  dateMs: number;
};

export default async function JurisprudenciaPage() {
  const resourceSlugs = await listSectionResourceSlugs("jurisprudencia");
  const resourceEntries = await Promise.all(
    resourceSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug)),
  );
  const resolvedResourceEntries = resourceEntries.filter(
    (entry): entry is NonNullable<typeof entry> => Boolean(entry),
  );

  const boscoDateString = "2026-01-30";
  const boscoTime = new Date(boscoDateString).getTime();
  const boscoItem: SentenciaItem = {
    id: "bosco",
    href: "/jurisprudencia/sentencia-bosco-transparencia-algoritmica",
    title: "Sentencia BOSCO: Transparencia Algorítmica y Código Fuente",
    description:
      "Análisis jurídico de la STS 1119/2025 que consolida el derecho de acceso al código fuente cuando un algoritmo determina prestaciones sociales.",
    meta: "STS 1119/2025 · 11 de septiembre de 2025",
    dateMs: Number.isNaN(boscoTime) ? 0 : boscoTime,
  };

  const resourceItems: SentenciaItem[] = resolvedResourceEntries.map((entry) => {
    const time = entry.dateMs ?? 0;
    const safeTime = Number.isNaN(time) ? 0 : time;
    const date =
      entry.dateMs != null && !Number.isNaN(entry.dateMs) ? new Date(entry.dateMs) : null;
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
      href: `/jurisprudencia/${entry.slug}`,
      title: entry.title,
      description: plainSummary,
      meta: parts.join(" · "),
      dateMs: safeTime,
    };
  });

  const items: SentenciaItem[] = [boscoItem, ...resourceItems].sort((a, b) => b.dateMs - a.dateMs);

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Jurisprudencia",
        url: "https://derechoartificial.com/jurisprudencia",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <main className="section-spacing">
        <div className="container-editorial">
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">Sección</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              Jurisprudencia
            </h1>
            <p className="lead mt-6 text-justify max-w-3xl">
              Repositorio crítico de resoluciones judiciales y administrativas que definen el Derecho de la IA. 
              Analizamos sentencias que sientan precedente sobre transparencia algorítmica, responsabilidad civil 
              y protección de derechos fundamentales en la era digital.
            </p>
          </header>
          
          <section className="grid gap-6 md:grid-cols-3 mb-12">
            <Link
              href={boscoItem.href}
              className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-all"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Destacada</p>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-2">Sentencia BOSCO</h2>
              <p className="text-sm text-body">Transparencia algorítmica y acceso al código fuente.</p>
              <div className="mt-4 text-xs text-caption">{boscoItem.meta}</div>
            </Link>
            <Link
              href="/jurisprudencia"
              className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-all"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Actividad</p>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-2">Últimas resoluciones</h2>
              <p className="text-sm text-body">Entradas registradas en la sección.</p>
              <div className="mt-4 text-xs text-caption">Total: {items.length}</div>
            </Link>
            <Link
              href="/normativa"
              className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-all"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Contexto</p>
              <h2 className="font-display text-xl md:text-2xl text-foreground mb-2">Marco regulatorio</h2>
              <p className="text-sm text-body">Relación con el EU AI Act y normativa aplicable.</p>
            </Link>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Sentencia</p>
                <h2 className="font-serif text-2xl text-foreground mb-4">{item.title}</h2>
                {item.description && <p className="text-body mb-6">{item.description}</p>}
                {item.meta && <div className="text-sm text-caption">{item.meta}</div>}
              </Link>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
