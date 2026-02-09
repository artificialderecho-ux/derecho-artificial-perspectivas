import type { Metadata } from "next";
import Link from "next/link";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { ContentPreviewGrid } from "@/components/ContentPreviewCard";
import latestNews from "@/data/latest-news.json";

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

type NewsItem = {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
  tags?: string[];
};

import type { PreviewItem } from "@/components/ContentPreviewCard";

export default async function ActualidadIAPage() {
  const slugs = await listContentSlugs("actualidad-ia");
  const entries = await Promise.all(slugs.map((slug) => getContentEntry("actualidad-ia", slug)));
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

  const resourceSlugs = await listSectionResourceSlugs("actualidad-ia");
  const resourceEntries = await Promise.all(
    resourceSlugs.map((slug) => getSectionResourceEntry("actualidad-ia", slug)),
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
      href: `/actualidad-ia/${entry.slug}`,
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

  const apiNews: NewsItem[] = latestNews as NewsItem[];

  const getSourceColor = (source: string) => {
    switch (source) {
      case "AESIA":
        return "bg-blue-600";
      case "EUR-Lex":
        return "bg-indigo-600";
      case "Comisión Europea":
        return "bg-[#003399]";
      case "CEPEJ":
        return "bg-purple-600";
      case "Abogacía Española":
        return "bg-red-700";
      default:
        return "bg-slate-500";
    }
  };

  const groupedNews: Record<string, NewsItem[]> = apiNews.reduce(
    (acc, item) => {
      if (!acc[item.source]) {
        acc[item.source] = [];
      }
      acc[item.source].push(item);
      return acc;
    },
    {} as Record<string, NewsItem[]>,
  );

  const orderedSources = ["Comisión Europea", "AESIA", "EUR-Lex", "CEPEJ", "Abogacía Española"];

  const sources = [
    ...orderedSources.filter((source) => groupedNews[source]?.length),
    ...Object.keys(groupedNews).filter((source) => !orderedSources.includes(source)),
  ];

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Actualidad IA",
        url: "https://derechoartificial.com/actualidad-ia",
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
              Actualidad IA
            </h1>
            <p className="lead mt-6 text-justify max-w-3xl">
              Monitor de novedades regulatorias e institucionales. Seguimos el pulso de la AESIA, 
              el Comité Europeo de IA y los desarrollos legislativos clave para ofrecer un briefing 
              actualizado y curado para profesionales del derecho y el cumplimiento normativo.
            </p>
          </header>

          {/* Grid Principal - Previews Destacados */}
          <section className="mb-12">
            <ContentPreviewGrid items={items.slice(0, 3)} columns={3} size="large" />
          </section>

          {/* Grid Secundario - Resto de Items */}
          <section className="mb-12">
            <ContentPreviewGrid items={items.slice(3)} columns={2} size="medium" />
          </section>

          {/* Sección de Fuentes Oficiales */}
          {sources.length > 0 && (
            <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Actualizaciones oficiales</p>
              <div className="space-y-10">
                {sources.map((source) => (
                  <div key={source} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-white font-medium ${getSourceColor(
                          source,
                        )}`}
                      >
                        {source}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {groupedNews[source]?.slice(0, 2).map((item) => (
                        <div key={item.id} className="border border-divider/60 bg-card p-4 rounded-sm">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="font-serif text-lg text-foreground hover:text-primary transition-colors"
                          >
                            {item.title}
                          </a>
                          <div className="text-xs text-caption mt-1">
                            <span>{item.date}</span>
                            {item.tags && item.tags.length > 0 && (
                              <span className="ml-2">{item.tags.join(" · ")}</span>
                            )}
                          </div>
                          {item.summary && (
                            <p className="text-sm text-body mt-2">{item.summary}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Metodología Editorial */}
          <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Metodología editorial</p>
            <p className="text-body max-w-3xl">
              Cada briefing sintetiza documentos oficiales, posicionamientos regulatorios y criterios jurisprudenciales
              relevantes para equipos jurídicos y responsables de cumplimiento. La prioridad es la trazabilidad de
              fuentes y la aplicación práctica en entornos profesionales.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
