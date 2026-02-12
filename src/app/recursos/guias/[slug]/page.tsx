import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";
import {
  StructuredData,
  createArticleJsonLd,
  createGenericArticleJsonLd,
  createBreadcrumbJsonLd,
} from "@/components/seo/StructuredData";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const slugs = await listSectionResourceSlugs("guias");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getSectionResourceEntry("guias", slug);
  if (!entry) return {};
  
  const title = `${entry.title} | Derecho Artificial`;
  const description = entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 158) || entry.title.slice(0, 158);
  const canonical = `https://www.derechoartificial.com/recursos/guias/${entry.slug}`;
  const ogImage = "/logo-principal.png";

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

export default async function GuiasSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = await getSectionResourceEntry("guias", slug);
  if (!entry) notFound();

  const url = `https://derechoartificial.com/recursos/guias/${entry.slug}`;
  const description = entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200);

  const datePublished =
    entry.dateMs != null && !Number.isNaN(entry.dateMs)
      ? new Date(entry.dateMs).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

  const jsonLd = createArticleJsonLd({
    url,
    headline: entry.title,
    description,
    datePublished,
  });

  const genericJsonLd = createGenericArticleJsonLd({
    url,
    headline: entry.title,
    description,
    datePublished,
  });

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Guías y Protocolos",
        url: "https://derechoartificial.com/recursos/guias",
      },
      {
        name: entry.title,
        url,
      },
    ],
  });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": entry.title,
    "description": description,
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
    "datePublished": datePublished,
    "dateModified": datePublished,
    "image": "https://www.derechoartificial.com/og-default-1200x630.jpg",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <StructuredData data={[jsonLd, genericJsonLd, breadcrumbJsonLd]} />
      <LegalLayout title={entry.title} category="Guías y Protocolos">
        <Breadcrumbs items={[
          { label: 'Inicio', href: '/' },
          { label: 'Guías y Protocolos', href: '/recursos/guias' },
          { label: entry.title, href: `/recursos/guias/${entry.slug}` }
        ]} />
        <div className="mb-12 p-8 bg-slate-50 border border-slate-200 rounded-sm not-prose">
          {entry.summaryHtml ? (
            <div
              className="prose prose-slate max-w-none mb-6"
              dangerouslySetInnerHTML={{ __html: entry.summaryHtml }}
            />
          ) : null}
          {entry.sourceUrl ? (
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-slate-800 transition !text-white"
            >
              Descargar documento original
            </a>
          ) : null}
        </div>
        {entry.bodyHtml ? (
          <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />
        ) : null}
        <RelatedArticles currentSlug={slug} />
      </LegalLayout>
    </>
  );
}
