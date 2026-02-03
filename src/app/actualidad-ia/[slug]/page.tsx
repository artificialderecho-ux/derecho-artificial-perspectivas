import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import { createNewsArticleJsonLd } from "@/components/seo/StructuredData";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { Button } from "@/components/ui/button";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";

export async function generateStaticParams() {
  const [jsonSlugs, resourceSlugs] = await Promise.all([
    listContentSlugs("actualidad-ia"),
    listSectionResourceSlugs("actualidad-ia"),
  ]);
  const allSlugs = new Set<string>([...jsonSlugs, ...resourceSlugs]);
  const seed = allSlugs.size ? Array.from(allSlugs) : [""];
  return seed.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [jsonEntry, resourceEntry] = await Promise.all([
    getContentEntry("actualidad-ia", slug),
    getSectionResourceEntry("actualidad-ia", slug),
  ]);

  if (!jsonEntry && !resourceEntry) return {};

  const entry: ResolvedContentEntry | ResourceEntry = (jsonEntry ?? resourceEntry)!;

  const description =
    jsonEntry?.description ??
    resourceEntry?.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) ??
    entry.title;

  const canonical = jsonEntry?.urlPath ?? `/actualidad-ia/${entry.slug}`;

  return {
    title: entry.title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: entry.title,
      description,
      url: canonical,
      locale: "es_ES",
    },
  };
}

export default async function ActualidadIASlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jsonEntry = await getContentEntry("actualidad-ia", slug);
  const resourceEntry = jsonEntry ? null : await getSectionResourceEntry("actualidad-ia", slug);

  if (!jsonEntry && !resourceEntry) notFound();

  if (jsonEntry) {
    const jsonLd = createNewsArticleJsonLd({
      url: jsonEntry.url,
      headline: jsonEntry.title,
      description: jsonEntry.description,
      datePublished: jsonEntry.datePublished,
      authorName: jsonEntry.author,
    });

    return (
      <>
        <Script id={`ld-article-actualidad-ia-${slug}`} type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
        <LegalLayout
          title={jsonEntry.title}
          category="Actualidad IA"
          date={jsonEntry.datePublished}
          author={{ name: jsonEntry.author }}
        >
          <div className="mb-10">
            <Button asChild variant="outline" size="sm">
              <Link href="/actualidad-ia">Volver a Actualidad IA</Link>
            </Button>
          </div>
          <p className="lead text-muted-foreground mb-8">{jsonEntry.description}</p>
          <div dangerouslySetInnerHTML={{ __html: jsonEntry.html }} />
        </LegalLayout>
      </>
    );
  }

  // It's a resource entry
  const entry = resourceEntry!;
  const date =
    entry.dateMs != null && !Number.isNaN(entry.dateMs)
      ? new Date(entry.dateMs).toISOString()
      : new Date().toISOString();

  const jsonLd = createNewsArticleJsonLd({
    url: `https://derechoartificial.com/actualidad-ia/${entry.slug}`,
    headline: entry.title,
    description: entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
    datePublished: date,
    authorName: "Derecho Artificial",
  });

  return (
    <>
      <Script id={`ld-article-actualidad-ia-${slug}`} type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <LegalLayout
        title={entry.title}
        category="Actualidad IA"
        date={date}
        author={{ name: "Derecho Artificial" }}
      >
        <div className="mb-10">
          <Button asChild variant="outline" size="sm">
            <Link href="/actualidad-ia">Volver a Actualidad IA</Link>
          </Button>
        </div>
        {entry.summaryHtml && (
          <div className="lead text-muted-foreground mb-8" dangerouslySetInnerHTML={{ __html: entry.summaryHtml }} />
        )}
        <div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
      </LegalLayout>
    </>
  );
}
