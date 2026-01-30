import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import { Button } from "@/components/ui/button";

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

  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <div className="mb-10">
          <Button asChild variant="outline" size="sm">
            <Link href="/firma-scarpa">Volver a Firma Scarpa</Link>
          </Button>
        </div>

        <header className="mb-12">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">{entry.title}</h1>
          <p className="text-sm text-caption mt-4">
            {formattedDate} · {entry.author}
          </p>
          <p className="text-lg text-body mt-6 max-w-3xl">{entry.description}</p>
        </header>

        <div className="max-w-3xl">
          <div className="prose prose-neutral max-w-none" dangerouslySetInnerHTML={{ __html: entry.html }} />
        </div>
      </div>
    </main>
  );
}
