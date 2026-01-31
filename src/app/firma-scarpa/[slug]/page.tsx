import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import { Button } from "@/components/ui/button";

// Map slugs to PDF files
const PDF_MAPPING: Record<string, string> = {
  "clawdbot-ilusion-privacidad": "informe-clawdbot-rgpd.pdf",
  "informe-clawdbot": "informe-clawdbot.pdf",
};

export async function generateStaticParams() {
  const slugs = await listContentSlugs("firma-scarpa");
  const seed = slugs.length ? slugs : ["nota-editorial-inaugural"];
  return seed.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getContentEntry("firma-scarpa", slug);
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

export default async function FirmaScarpaSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = await getContentEntry("firma-scarpa", slug);
  if (!entry) notFound();

  const date = new Date(entry.datePublished);
  const formattedDate = Number.isNaN(date.getTime())
    ? entry.datePublished
    : date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });

  const pdfFile = PDF_MAPPING[slug];

  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <div className="mb-10 flex items-center justify-between">
          <Button asChild variant="outline" size="sm">
            <Link href="/firma-scarpa">Volver a Firma Scarpa</Link>
          </Button>
          {pdfFile && (
             <Button asChild variant="default" size="sm">
               <a href={`/assets/docs/${pdfFile}`} target="_blank" rel="noopener noreferrer">
                 Consultar Fuente Original
               </a>
             </Button>
          )}
        </div>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">{entry.title}</h1>
          <p className="text-sm text-caption mt-4">
            {formattedDate} · {entry.author}
          </p>
          <p className="text-lg text-body mt-6 max-w-3xl">{entry.description}</p>
        </header>

        <div className="max-w-3xl">
          <div className="prose prose-lg max-w-none prose-p:text-justify prose-headings:font-display prose-a:text-primary hover:prose-a:text-primary/80">
            <div dangerouslySetInnerHTML={{ __html: entry.html }} />
            
            {pdfFile && (
              <div className="mt-8 pt-6 border-t border-border">
                <h3 className="text-xl font-semibold mb-4">Documentación Original</h3>
                <Button asChild variant="outline" className="gap-2">
                  <a 
                    href={`/assets/docs/${pdfFile}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
                    Descargar Documento PDF
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
