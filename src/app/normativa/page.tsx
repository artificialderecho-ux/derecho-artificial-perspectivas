import type { Metadata } from "next";
import Link from "next/link";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Normativa",
  description:
    "Marco regulatorio completo sobre Inteligencia Artificial: AI Act, normativa europea y directrices de cumplimiento.",
  keywords: [
    "normativa IA",
    "AI Act",
    "Reglamento Europeo IA",
    "AESIA",
    "cumplimiento normativo",
    "directrices europeas",
    "estándares IA",
  ],
  alternates: {
    canonical: "/normativa",
    languages: {
      "es-ES": "/normativa",
      "en-US": "/en/legislation",
    },
  },
  openGraph: {
    type: "website",
    title: "Normativa",
    description:
      "Marco regulatorio completo sobre Inteligencia Artificial: AI Act, normativa europea y directrices de cumplimiento.",
    url: "/normativa",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

type PreviewItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  badge: string;
  meta: string;
  dateMs: number;
  displayDateMs?: number;
};

export default async function NormativaPage() {
  const slugs = await listContentSlugs("normativa");
  const entries = await Promise.all(slugs.map((slug) => getContentEntry("normativa", slug)));
  const resolvedEntries = entries.filter((entry): entry is ResolvedContentEntry => Boolean(entry));
  const sortedEntries = resolvedEntries.sort((a, b) => {
    const aTime = typeof a.dateMs === "number" ? a.dateMs : 0;
    const bTime = typeof b.dateMs === "number" ? b.dateMs : 0;
    return bTime - aTime;
  });

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const resourceSlugs = await listSectionResourceSlugs("normativa");
  const resourceEntries = await Promise.all(
    resourceSlugs.map((slug) => getSectionResourceEntry("normativa", slug)),
  );
  const resolvedResourceEntries = resourceEntries.filter(
    (entry): entry is ResourceEntry => Boolean(entry),
  );

  const contentItems: PreviewItem[] = sortedEntries.map((entry) => {
    const time = typeof entry.dateMs === "number" && !Number.isNaN(entry.dateMs) ? entry.dateMs : 0;
    const displayMs = (() => {
      const d = new Date(entry.datePublished).getTime();
      return Number.isNaN(d) ? undefined : d;
    })();
    const parts: string[] = [];
    parts.push(formatDate(entry.datePublished));
    if (entry.author) {
      parts.push(entry.author);
    }
    return {
      id: `content-${entry.slug}`,
      href: entry.urlPath,
      title: entry.title,
      description: entry.description,
      badge: "Análisis",
      meta: parts.join(" · "),
      dateMs: time,
      displayDateMs: displayMs,
    };
  });

  const resourceItems: PreviewItem[] = resolvedResourceEntries.map((entry) => {
    const time = entry.dateMs ?? 0;
    const safeTime = Number.isNaN(time) ? 0 : time;
    const date =
      entry.displayDateMs != null && !Number.isNaN(entry.displayDateMs) ? new Date(entry.displayDateMs) : null;
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
      href: `/normativa/${entry.slug}`,
      title: entry.title,
      description: plainSummary,
      badge: "Recurso",
      meta: parts.join(" · "),
      dateMs: safeTime,
      displayDateMs: entry.displayDateMs ?? undefined,
    };
  });

  const items: PreviewItem[] = [...contentItems, ...resourceItems].sort(
    (a, b) => (b.displayDateMs ?? b.dateMs) - (a.displayDateMs ?? a.dateMs),
  );

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Normativa",
        url: "https://derechoartificial.com/normativa",
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
              Normativa
            </h1>
            <p className="lead mt-6 text-justify max-w-3xl">
              Marco regulatorio completo sobre Inteligencia Artificial. Análisis detallado del AI Act, 
              normativa europea y directrices de cumplimiento para profesionales del derecho.
            </p>
          </header>

          {/* Grid Principal - Previews Destacados */}
          <section className="grid gap-6 md:grid-cols-3 mb-12 bento-surface">
            {items.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">{item.badge}</p>
                <h2 className="font-serif text-xl md:text-2xl text-foreground mb-2">{item.title}</h2>
                <p className="text-sm text-body mb-4">{item.description}</p>
                <div className="mt-4 text-xs text-caption">{item.meta}</div>
              </Link>
            ))}
                <span>¿Cuándo entra en vigor plenamente?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="group-open:animate-fadeIn mt-3 text-muted-foreground text-sm leading-relaxed text-justify">
                El Reglamento entra en vigor 20 días después de su publicación, pero su aplicabilidad es
                escalonada. Las prohibiciones de riesgo inaceptable aplican a los 6 meses, y la mayoría
                de las normas a los 24 meses (2026).
              </p>
          </details>
        </div>

        {resolvedEntries.length > 0 && (
          <section className="mt-12">
            <h3 className="font-serif text-2xl text-foreground mb-6">Normativa relacionada</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {resolvedEntries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/normativa/${entry.slug}`}
                  className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Normativa</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">{entry.title}</h3>
                  <Badges ms={entry.dateMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" className="mb-3 inline-flex items-center gap-2 text-xs text-caption" />
                  {entry.summaryHtml && (
                    <p className="text-body">
                      {entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </LegalLayout>
    </>
  );
}
