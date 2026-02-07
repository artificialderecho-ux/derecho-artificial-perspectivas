import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/layout/LegalLayout";
import {
  StructuredData,
  createBreadcrumbJsonLd,
  createLegislationJsonLd,
} from "@/components/seo/StructuredData";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";

type Params = {
  slug: string;
};

export async function generateStaticParams() {
  const slugs = await listSectionResourceSlugs("normativa");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getSectionResourceEntry("normativa", slug);
  if (!entry) return {};
  const description = entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200);
  return {
    title: entry.title,
    description,
    alternates: {
      canonical: `/normativa/${entry.slug}`,
    },
    openGraph: {
      type: "article",
      title: entry.title,
      description,
      url: `/normativa/${entry.slug}`,
    },
  };
}

export default async function NormativaSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = await getSectionResourceEntry("normativa", slug);
  if (!entry) notFound();

  const url = `https://derechoartificial.com/normativa/${entry.slug}`;
  const description = entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200);

  const datePublished =
    entry.dateMs != null && !Number.isNaN(entry.dateMs)
      ? new Date(entry.dateMs).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

  const jsonLd = createLegislationJsonLd({
    url,
    name: entry.title,
    description,
    datePublished,
    jurisdiction: entry.jurisdiction ?? undefined,
  });

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
      {
        name: entry.title,
        url,
      },
    ],
  });

  return (
    <>
      <StructuredData data={[jsonLd, breadcrumbJsonLd]} />
      <LegalLayout title={entry.title} category="Normativa">
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
        {entry.bodyHtml ? <div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} /> : null}
      </LegalLayout>
    </>
  );
}
