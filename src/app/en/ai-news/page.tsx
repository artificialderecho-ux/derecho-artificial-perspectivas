import type { Metadata } from "next";
import Link from "next/link";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";

export const metadata: Metadata = {
  title: "AI News",
  description: "Editorial monitoring of regulatory, institutional and jurisprudential AI updates.",
  keywords: [
    "AI regulation news",
    "EU AI Act",
    "AI compliance",
    "data protection",
    "AI jurisprudence",
    "law and technology",
  ],
  alternates: {
    canonical: "/en/ai-news",
    languages: {
      "es-ES": "/actualidad-ia",
      "en-US": "/en/ai-news",
    },
  },
  openGraph: {
    type: "website",
    title: "AI News",
    description: "Editorial monitoring of regulatory, institutional and jurisprudential AI updates.",
    url: "/en/ai-news",
    locale: "en_US",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function AiNewsPage() {
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
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Section</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">AI News</h1>
          <p className="text-lg text-body mt-6">Updates and analysis focused on compliance and legal practice.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          {sortedEntries.length ? (
            sortedEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={entry.urlPath}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-widest text-caption mb-3">Editorial briefing</p>
                <h2 className="font-serif text-2xl text-foreground mb-4">{entry.title}</h2>
                <p className="text-body mb-6">{entry.description}</p>
                <div className="text-sm text-caption">
                  {formatDate(entry.datePublished)} · {entry.author}
                </div>
              </Link>
            ))
          ) : (
            <div className="card-elevated p-6 md:col-span-2">
              <p className="text-xs uppercase tracking-widest text-caption mb-3">Repository</p>
              <h2 className="font-serif text-2xl text-foreground">Content in preparation</h2>
              <p className="text-body mt-4 max-w-2xl">
                We are preparing a new briefing series on regulatory milestones, compliance updates, and institutional
                guidance. New posts will land during Q1 2026.
              </p>
            </div>
          )}
        </section>

        <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
          <p className="text-xs uppercase tracking-widest text-caption mb-3">Editorial method</p>
          <p className="text-body max-w-3xl">
            Each briefing synthesizes official documents, regulatory positions, and case law developments relevant to
            legal teams and compliance leads. We prioritize traceability of sources and practical impact.
          </p>
        </section>
      </div>
    </main>
  );
}
