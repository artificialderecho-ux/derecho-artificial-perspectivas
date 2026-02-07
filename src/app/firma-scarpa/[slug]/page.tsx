import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createArticleJsonLd } from "@/components/seo/StructuredData";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";

// Map slugs to PDF files
const PDF_MAPPING: Record<string, string> = {
  "clawdbot-ilusion-privacidad": "informe-clawdbot-rgpd.pdf",
  "informe-clawdbot": "informe-clawdbot.pdf",
  "neuroderechos": "neuroderechos.pdf",
};

export async function generateStaticParams() {
  const [jsonSlugs, resourceSlugs] = await Promise.all([
    listContentSlugs("firma-scarpa"),
    listSectionResourceSlugs("firma-scarpa"),
  ]);
  const allSlugs = new Set<string>([...jsonSlugs, ...resourceSlugs]);
  const seed = allSlugs.size ? Array.from(allSlugs) : ["nota-editorial-inaugural"];
  return seed.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [jsonEntry, resourceEntry] = await Promise.all([
    getContentEntry("firma-scarpa", slug),
    getSectionResourceEntry("firma-scarpa", slug),
  ]);

  if (!jsonEntry && !resourceEntry) return {};

  const entry: ResolvedContentEntry | ResourceEntry = (jsonEntry ?? resourceEntry)!;

  const description =
    jsonEntry?.description ??
    resourceEntry?.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) ??
    entry.title;

  const canonical = jsonEntry?.urlPath ?? `/firma-scarpa/${entry.slug}`;

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

export default async function FirmaScarpaSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const jsonEntry = await getContentEntry("firma-scarpa", slug);
  const resourceEntry = jsonEntry ? null : await getSectionResourceEntry("firma-scarpa", slug);

  if (!jsonEntry && !resourceEntry) notFound();

  if (jsonEntry) {
    const date = new Date(jsonEntry.datePublished);
    const formattedDate = Number.isNaN(date.getTime())
      ? jsonEntry.datePublished
      : date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

    const pdfFile = PDF_MAPPING[slug];

    const jsonLd = createArticleJsonLd({
      url: jsonEntry.url,
      headline: jsonEntry.title,
      description: jsonEntry.description,
      datePublished: jsonEntry.datePublished,
      authorName: jsonEntry.author,
    });

    return (
      <>
        <StructuredData data={jsonLd} />
        <LegalLayout
          title={jsonEntry.title}
          category="Firma Scarpa"
          date={jsonEntry.datePublished}
          author={{
            name: jsonEntry.author,
            href: "https://derechoartificial.com/quienes-somos#ricardoscarpa",
          }}
        >
          <div className="mb-10 flex items-center justify-between">
            <Button asChild variant="outline" size="sm">
              <Link href="/firma-scarpa">Volver a Firma Scarpa</Link>
            </Button>
            {pdfFile && (
              <a
                href={`/assets/docs/${pdfFile}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-slate-800 transition !text-white"
              >
                Descargar documento original
              </a>
            )}
          </div>

          <p className="lead text-muted-foreground mb-8">{jsonEntry.description}</p>

          <div dangerouslySetInnerHTML={{ __html: jsonEntry.html }} />

          {pdfFile && (
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-xl font-semibold mb-4">Documentación Original</h3>
            <a
              href={`/assets/docs/${pdfFile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-slate-800 transition gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
              Descargar documento original
            </a>
            </div>
          )}
        </LegalLayout>
      </>
    );
  }

  const entry = resourceEntry as ResourceEntry;

  const url = `https://derechoartificial.com/firma-scarpa/${entry.slug}`;
  const description =
    entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) || entry.title;

  const jsonLd = createArticleJsonLd({
    url,
    headline: entry.title,
    description,
    datePublished: new Date().toISOString().slice(0, 10),
    authorName: "Ricardo Scarpa",
  });

  return (
    <>
      <StructuredData data={jsonLd} />
      <LegalLayout
        title={entry.title}
        category="Firma Scarpa"
        author={{
          name: "Ricardo Scarpa",
          href: "https://derechoartificial.com/quienes-somos#ricardoscarpa",
        }}
      >
        <div className="mb-10 flex items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link href="/firma-scarpa">Volver a Firma Scarpa</Link>
          </Button>
          {entry.sourceUrl && (
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-slate-800 transition !text-white"
            >
              Descargar documento original
            </a>
          )}
        </div>

        {entry.summaryHtml && (
          <p className="lead text-muted-foreground mb-8">
            {entry.summaryHtml.replace(/<[^>]+>/g, "")}
          </p>
        )}

        {entry.bodyHtml && <div dangerouslySetInnerHTML={{ __html: entry.bodyHtml }} />}

        {entry.sourceUrl && (
          <div className="mt-8 pt-6 border-t border-border">
            <h3 className="text-xl font-semibold mb-4">
              Documentación Original
            </h3>
            <a
              href={entry.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white text-sm font-medium tracking-wide uppercase rounded-sm hover:bg-slate-800 transition gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M12 18v-6" />
                <path d="m9 15 3 3 3-3" />
              </svg>
              Descargar documento original
            </a>
          </div>
        )}
      </LegalLayout>
    </>
  );
}
