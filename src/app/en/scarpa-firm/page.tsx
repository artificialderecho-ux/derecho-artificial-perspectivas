import type { Metadata } from "next";
import Link from "next/link";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Scarpa Firm",
  description: "In-depth legal analysis, critical opinion, and regulatory foresight.",
  keywords: [
    "Ricardo Scarpa",
    "legal analysis",
    "AI regulation",
    "EU AI Act",
    "AI compliance",
    "editorial opinion",
  ],
  alternates: {
    canonical: "/en/scarpa-firm",
    languages: {
      "es-ES": "/firma-scarpa",
      "en-US": "/en/scarpa-firm",
    },
  },
  openGraph: {
    type: "website",
    title: "Scarpa Firm",
    description: "In-depth legal analysis, critical opinion, and regulatory foresight.",
    url: "/en/scarpa-firm",
    locale: "en_US",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function ScarpaFirmPage() {
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
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const resourceSlugs = await listSectionResourceSlugs("firma-scarpa");
  const resourceEntries = await Promise.all(
    resourceSlugs.map((slug) => getSectionResourceEntry("firma-scarpa", slug)),
  );
  const resolvedResourceEntries = resourceEntries.filter(
    (entry): entry is ResourceEntry => Boolean(entry),
  );

  type UnifiedItem = {
    id: string;
    href: string;
    title: string;
    description: string;
    meta: string;
    dateMs: number;
  };

  const contentItems: UnifiedItem[] = sortedEntries.map((entry) => {
    const time = new Date(entry.datePublished).getTime();
    const safeTime = Number.isNaN(time) ? 0 : time;
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
      meta: parts.join(" · "),
      dateMs: safeTime,
    };
  });

  const resourceItems: UnifiedItem[] = resolvedResourceEntries.map((entry) => {
    const time = entry.dateMs ?? 0;
    const safeTime = Number.isNaN(time) ? 0 : time;
    const date =
      entry.dateMs != null && !Number.isNaN(entry.dateMs) ? new Date(entry.dateMs) : null;
    const dateLabel =
      date && !Number.isNaN(date.getTime())
        ? date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
        : null;
    const plainSummary = entry.summaryHtml ? entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "";
    const parts: string[] = [];
    if (dateLabel) {
      parts.push(dateLabel);
    }
    if (entry.sourceUrl) {
      parts.push("Includes original document download");
    }
    return {
      id: `resource-${entry.slug}`,
      href: `/firma-scarpa/${entry.slug}`,
      title: entry.title,
      description: plainSummary,
      meta: parts.join(" · "),
      dateMs: safeTime,
    };
  });

  const allItems: UnifiedItem[] = [...contentItems, ...resourceItems].sort((a, b) => b.dateMs - a.dateMs);

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com/en",
      },
      {
        name: "Scarpa Firm",
        url: "https://derechoartificial.com/en/scarpa-firm",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <main className="section-spacing">
        <div className="container-editorial">
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">Section</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Scarpa Firm</h1>
            <p className="text-lg text-body mt-6">
              In-depth legal analysis, critical opinion, and regulatory foresight.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            {allItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Analysis</p>
                <h2 className="font-serif text-2xl text-foreground mb-4">{item.title}</h2>
                {item.description && <p className="text-body mb-6">{item.description}</p>}
                {item.meta && <div className="text-sm text-caption">{item.meta}</div>}
              </Link>
            ))}
          </section>

          <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Editorial focus</p>
            <p className="text-body max-w-3xl">
              The Scarpa Firm series covers the legal impact of AI from practice: compliance, liability, governance, and
              safeguards. Each piece is anchored in verifiable sources and implementation experience.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
