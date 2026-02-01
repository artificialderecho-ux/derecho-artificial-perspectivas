import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import { createNewsArticleJsonLd } from "@/components/seo/StructuredData";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { Button } from "@/components/ui/button";

export async function generateStaticParams() {
  const slugs = await listContentSlugs("actualidad-ia");
  const seed = slugs.length ? slugs : ["primer-briefing"];
  return seed.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentEntry("actualidad-ia", slug);
  if (!entry) return {};

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: entry.urlPath,
    },
    openGraph: {
      type: "article",
      title: entry.title,
      description: entry.description,
      url: entry.urlPath,
      locale: "es_ES",
    },
  };
}

export default async function ActualidadIASlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getContentEntry("actualidad-ia", slug);
  if (!entry) notFound();

  const jsonLd = createNewsArticleJsonLd({
    url: entry.url,
    headline: entry.title,
    description: entry.description,
    datePublished: entry.datePublished,
    authorName: entry.author,
  });

  return (
    <>
      <Script id={`ld-article-actualidad-ia-${slug}`} type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <LegalLayout
        title={entry.title}
        category="Actualidad IA"
        date={entry.datePublished}
        author={{ name: entry.author }}
      >
        <div className="mb-10">
          <Button asChild variant="outline" size="sm">
            <Link href="/actualidad-ia">Volver a Actualidad IA</Link>
          </Button>
        </div>
        <p className="lead text-muted-foreground mb-8">{entry.description}</p>
        <div dangerouslySetInnerHTML={{ __html: entry.html }} />
      </LegalLayout>
    </>
  );
}
