import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import { createNewsArticleJsonLd, createGenericArticleJsonLd, StructuredData } from "@/components/seo/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
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

  const title = `${entry.title} | Derecho Artificial`;
  const description =
    jsonEntry?.description ??
    resourceEntry?.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 158) ??
    entry.title.slice(0, 158);

  const canonical = jsonEntry?.urlPath ? `https://www.derechoartificial.com${jsonEntry.urlPath}` : `https://www.derechoartificial.com/actualidad-ia/${entry.slug}`;

  const ogImage = "https://www.derechoartificial.com/og-default-1200x630.jpg";

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      title: entry.title,
      description,
      url: canonical,
      siteName: "Derecho Artificial",
      locale: "es_ES",
      images: [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: entry.title
      }],
      publishedTime: jsonEntry?.datePublished || (resourceEntry as any)?.dateMs ? new Date(jsonEntry?.datePublished || (resourceEntry as any)?.dateMs).toISOString() : undefined,
      authors: ['Ricardo Scarpa']
    },
    twitter: {
      card: "summary_large_image",
      title: entry.title,
      description,
      images: [ogImage],
      creator: "@RicardoScarpa",
    },
  };
}

export default async function ActualidadIASlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const jsonEntry = await getContentEntry("actualidad-ia", slug);
  const resourceEntry = jsonEntry ? null : await getSectionResourceEntry("actualidad-ia", slug);

  if (!jsonEntry && !resourceEntry) notFound();

  if (jsonEntry) {
    const authorName = jsonEntry.author === "Derecho Artificial" ? "Ricardo Scarpa" : jsonEntry.author;

    const jsonLd = createNewsArticleJsonLd({
      url: jsonEntry.url,
      headline: jsonEntry.title,
      description: jsonEntry.description,
      datePublished: jsonEntry.datePublished,
      authorName: authorName,
    });

    const genericJsonLd = createGenericArticleJsonLd({
      url: jsonEntry.url,
      headline: jsonEntry.title,
      description: jsonEntry.description,
      datePublished: jsonEntry.datePublished,
      authorName: authorName,
    });

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": jsonEntry.title,
      "description": jsonEntry.description,
      "author": { 
        "@type": "Person", 
        "name": authorName,
        "url": "https://www.derechoartificial.com/quienes-somos"
      },
      "publisher": { 
        "@type": "Organization", 
        "name": "Derecho Artificial",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.derechoartificial.com/logo-principal.png"
        }
      },
      "datePublished": jsonEntry.datePublished,
      "dateModified": jsonEntry.datePublished,
      "image": {
        "@type": "ImageObject",
        "url": "https://www.derechoartificial.com/og-default-1200x630.jpg",
        "width": 1200,
        "height": 630
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": jsonEntry.url
      }
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <Script id={`ld-article-actualidad-ia-${slug}`} type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(jsonLd)}
        </Script>
        <StructuredData data={genericJsonLd} />
        <LegalLayout
          title={jsonEntry.title}
          category="Actualidad IA"
          date={jsonEntry.datePublished}
          author={{ 
            name: authorName,
            href: "/quienes-somos"
          }}
        >
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/' },
            { label: 'Actualidad IA', href: '/actualidad-ia' },
            { label: jsonEntry.title, href: `/actualidad-ia/${jsonEntry.slug}` }
          ]} />
          <div className="mb-10">
            <Button asChild variant="outline" size="sm">
              <Link href="/actualidad-ia">Volver a Actualidad IA</Link>
            </Button>
          </div>
          <p className="lead text-muted-foreground mb-8">{jsonEntry.description}</p>
          <div dangerouslySetInnerHTML={{ __html: jsonEntry.html }} />
          <RelatedArticles currentSlug={slug} />
        </LegalLayout>
      </>
    );
  }

  // It's a resource entry
  const entry = resourceEntry!;
  const datePublished = (entry as any).dateMs != null && !Number.isNaN((entry as any).dateMs)
    ? new Date((entry as any).dateMs).toISOString().slice(0, 10)
    : new Date().toISOString().slice(0, 10);

  const postDate = (entry as any).date || (entry as any).publishedAt || (entry as any).updatedAt || datePublished;

  const jsonLd = createNewsArticleJsonLd({
    url: `https://www.derechoartificial.com/actualidad-ia/${entry.slug}`,
    headline: entry.title,
    description: entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
    datePublished: postDate,
    authorName: "Ricardo Scarpa",
  });

  const genericJsonLd = createGenericArticleJsonLd({
    url: `https://www.derechoartificial.com/actualidad-ia/${entry.slug}`,
    headline: entry.title,
    description: entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
    datePublished: postDate,
    authorName: "Ricardo Scarpa",
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": entry.title,
    "description": entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
    "author": { 
      "@type": "Person", 
      "name": "Ricardo Scarpa",
      "url": "https://www.derechoartificial.com/quienes-somos"
    },
    "publisher": { 
      "@type": "Organization", 
      "name": "Derecho Artificial",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.derechoartificial.com/logo-principal.png"
      }
    },
    "datePublished": postDate,
    "dateModified": (entry as any).updatedAt || postDate,
    "image": {
      "@type": "ImageObject",
      "url": "https://www.derechoartificial.com/og-default-1200x630.jpg",
      "width": 1200,
      "height": 630
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.derechoartificial.com/actualidad-ia/${entry.slug}`
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id={`ld-article-actualidad-ia-${slug}`} type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(jsonLd)}
      </Script>
      <StructuredData data={genericJsonLd} />
      <LegalLayout
        title={entry.title}
        category="Actualidad IA"
        date={postDate}
        author={{ name: "Ricardo Scarpa" }}
      >
        <Breadcrumbs items={[
          { label: 'Inicio', href: '/' },
          { label: 'Actualidad IA', href: '/actualidad-ia' },
          { label: entry.title, href: `/actualidad-ia/${entry.slug}` }
        ]} />
        <div className="mb-10">
          <Button asChild variant="outline" size="sm">
            <Link href="/actualidad-ia">Volver a Actualidad IA</Link>
          </Button>
        </div>
        {entry.summaryHtml && (
          <div className="lead text-muted-foreground mb-8" dangerouslySetInnerHTML={{ __html: entry.summaryHtml }} />
        )}
        <div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
        <RelatedArticles 
          currentSlug={slug} 
          currentCategory="actualidad-ia"
          currentTags={(resourceEntry as any)?.tags || []}
        />
      </LegalLayout>
    </>
  );
}
