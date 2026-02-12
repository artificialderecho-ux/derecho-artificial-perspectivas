import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ResolvedContentEntry } from "@/lib/content";
import { getContentEntry, listContentSlugs } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { LegalLayout } from "@/components/layout/LegalLayout";
import {
  StructuredData,
  createArticleJsonLd,
  createGenericArticleJsonLd,
} from "@/components/seo/StructuredData";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RelatedArticles } from "@/components/RelatedArticles";

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

  const title = `${entry.title} | Derecho Artificial`;
  const description =
    jsonEntry?.description ||
    (resourceEntry as ResourceEntry)?.description ||
    resourceEntry?.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 158) ||
    entry.title.slice(0, 158);

  const canonical = jsonEntry?.urlPath ?? `https://www.derechoartificial.com/firma-scarpa/${entry.slug}`;
  
  // Get published time for OpenGraph
  const publishedTime = jsonEntry?.datePublished || (resourceEntry as any)?.datePublished;
  
  // Get tags/keywords
  const keywords = "derecho artificial, inteligencia artificial, AI Act, RGPD, discriminación algorítmica, compliance IA, Ricardo Scarpa";
  
  // Get author information
  const authors = jsonEntry?.author ? [jsonEntry.author] : ["Ricardo Scarpa"];

  const ogImage = "/logo-principal.png"; // Use default if no specific image

  return {
    title,
    description,
    keywords,
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
      publishedTime,
      authors,
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

    const genericJsonLd = createGenericArticleJsonLd({
      url: jsonEntry.url,
      headline: jsonEntry.title,
      description: jsonEntry.description,
      datePublished: jsonEntry.datePublished,
      authorName: jsonEntry.author,
    });

    const faqJsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "¿Qué es la discriminación algorítmica?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "La discriminación algorítmica ocurre cuando un sistema de IA toma decisiones que generan trato desigual basado en características protegidas (edad, género, raza, etc.)."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué obligaciones tiene el AI Act respecto al sesgo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "El AI Act exige evaluaciones de impacto, datasets representativos, pruebas de sesgo y supervisión humana en sistemas de alto riesgo."
          }
        },
        {
          "@type": "Question",
          "name": "¿Qué multas puede haber por incumplir el AI Act?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Hasta 35 millones de euros o el 7% de la facturación global para infracciones graves."
          }
        }
      ]
    };

    const authorJsonLd = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Ricardo Scarpa",
      "jobTitle": "Abogado experto en Derecho Digital e Inteligencia Artificial",
      "url": "https://www.derechoartificial.com/quienes-somos",
      "sameAs": [
        "https://www.linkedin.com/in/ricardoscarpa",
        // Añade aquí tu ORCID o Twitter si lo tienes
      ],
      "affiliation": [
        {
          "@type": "Organization",
          "name": "Universidad Europea de Madrid"
        },
        {
          "@type": "Organization",
          "name": "UNED"
        },
        {
          "@type": "Organization",
          "name": "IE Business School"
        }
      ],
      "knowsAbout": [
        "Derecho Digital",
        "Inteligencia Artificial",
        "AI Act",
        "RGPD",
        "Discriminación algorítmica",
        "Compliance tecnológico",
        "Responsabilidad civil en IA"
      ],
      "description": "Abogado y académico especializado en la regulación de la inteligencia artificial, protección de datos y ética tecnológica. Profesor en UEM, UNED e IE Business School."
    };

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: jsonEntry.title,
      description: jsonEntry.description,
      author: { "@type": "Person", name: "Ricardo Scarpa" },
      publisher: { "@type": "Organization", name: "Derecho Artificial" },
      datePublished: jsonEntry.datePublished,
      image: "/logo-principal.png"
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <StructuredData data={jsonLd} />
        <StructuredData data={genericJsonLd} />
        <StructuredData data={faqJsonLd} />
        <StructuredData data={authorJsonLd} />
        <LegalLayout
          title={jsonEntry.title}
          category="Firma Scarpa"
          date={jsonEntry.datePublished}
          author={{
            name: jsonEntry.author,
            href: "https://derechoartificial.com/quienes-somos#ricardoscarpa",
          }}
        >
          {/* Breadcrumbs para navegación y SEO */}
          <Breadcrumbs items={[
            { label: 'Inicio', href: '/' },
            { label: 'Firma Scarpa', href: '/firma-scarpa' },
            { label: jsonEntry.title, href: `/firma-scarpa/${jsonEntry.slug}` }
          ]} />
          
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

          {/* Artículos relacionados */}
          <RelatedArticles currentSlug={slug} />
        </LegalLayout>
      </>
    );
  }

  const entry = resourceEntry as ResourceEntry;

  const url = `https://derechoartificial.com/firma-scarpa/${entry.slug}`;
  const description =
    entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) || entry.title;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: description,
    author: { "@type": "Person", name: "Ricardo Scarpa" },
    publisher: { "@type": "Organization", name: "Derecho Artificial" },
    datePublished: new Date().toISOString().slice(0, 10),
    image: "/logo-principal.png"
  };

  const jsonLd = createArticleJsonLd({
    url,
    headline: entry.title,
    description,
    datePublished: new Date().toISOString().slice(0, 10),
    authorName: "Ricardo Scarpa",
  });

  const genericJsonLd = createGenericArticleJsonLd({
    url,
    headline: entry.title,
    description,
    datePublished: new Date().toISOString().slice(0, 10),
    authorName: "Ricardo Scarpa",
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es la discriminación algorítmica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La discriminación algorítmica ocurre cuando un sistema de IA toma decisiones que generan trato desigual basado en características protegidas (edad, género, raza, etc.)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué obligaciones tiene el AI Act respecto al sesgo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El AI Act exige evaluaciones de impacto, datasets representativos, pruebas de sesgo y supervisión humana en sistemas de alto riesgo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué multas puede haber por incumplir el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hasta 35 millones de euros o el 7% de la facturación global para infracciones graves."
        }
      }
    ]
  };

  const authorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ricardo Scarpa",
    "jobTitle": "Abogado experto en Derecho Digital e Inteligencia Artificial",
    "url": "https://www.derechoartificial.com/quienes-somos",
    "sameAs": [
      "https://www.linkedin.com/in/ricardoscarpa",
      // Añade aquí tu ORCID o Twitter si lo tienes
    ],
    "affiliation": [
      {
        "@type": "Organization",
        "name": "Universidad Europea de Madrid"
      },
      {
        "@type": "Organization",
        "name": "UNED"
      },
      {
        "@type": "Organization",
        "name": "IE Business School"
      }
    ],
    "knowsAbout": [
      "Derecho Digital",
      "Inteligencia Artificial",
      "AI Act",
      "RGPD",
      "Discriminación algorítmica",
      "Compliance tecnológico",
      "Responsabilidad civil en IA"
    ],
    "description": "Abogado y académico especializado en la regulación de la inteligencia artificial, protección de datos y ética tecnológica. Profesor en UEM, UNED e IE Business School."
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <StructuredData data={jsonLd} />
      <StructuredData data={genericJsonLd} />
      <StructuredData data={faqJsonLd} />
      <StructuredData data={authorJsonLd} />
      <LegalLayout
        title={entry.title}
        category="Firma Scarpa"
        author={{
          name: "Ricardo Scarpa",
          href: "https://derechoartificial.com/quienes-somos#ricardoscarpa",
        }}
      >
        {/* Breadcrumbs para navegación y SEO */}
        <Breadcrumbs items={[
          { label: 'Inicio', href: '/' },
          { label: 'Firma Scarpa', href: '/firma-scarpa' },
          { label: entry.title, href: `/firma-scarpa/${entry.slug}` }
        ]} />

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

        {/* Artículos relacionados */}
        <RelatedArticles currentSlug={slug} />
      </LegalLayout>
    </>
  );
}
