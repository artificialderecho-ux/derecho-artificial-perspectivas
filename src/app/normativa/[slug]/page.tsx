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
  const description = entry.description || entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 158);
  const canonical = `https://www.derechoartificial.com/normativa/${entry.slug}`;
  const ogImage = "/logo-principal.png";

  return {
    title: `${entry.title} | Derecho Artificial`,
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

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: description,
    author: { 
      "@type": "Person", 
      name: "Ricardo Scarpa",
      url: "https://www.derechoartificial.com/quienes-somos#ricardoscarpa"
    },
    publisher: { 
      "@type": "Organization", 
      name: "Derecho Artificial",
      logo: {
        "@type": "ImageObject",
        url: "https://www.derechoartificial.com/logo-principal.png"
      }
    },
    datePublished: datePublished,
    image: "https://www.derechoartificial.com/default-og.jpg"
  };

  const faqJsonLd = entry.slug === "ai-act-guia-completa" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuándo es obligatorio cumplir el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La aplicación es escalonada: las prohibiciones de sistemas de riesgo inaceptable entraron en vigor el 2 de febrero de 2025. Las normas para modelos de IA de propósito general se aplican desde agosto de 2025, y la mayoría de las obligaciones para sistemas de alto riesgo serán exigibles a partir de agosto de 2026."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué sistemas de IA están prohibidos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Están prohibidos los sistemas que suponen un riesgo inaceptable, como la puntuación social (social scoring) por parte de gobiernos, la manipulación subliminal que cause daños, la explotación de vulnerabilidades de grupos específicos y el uso de sistemas de identificación biométrica remota en tiempo real en espacios públicos para fines policiales (salvo excepciones muy tasadas)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son las multas por incumplimiento?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El Reglamento establece sanciones severas: hasta 35 millones de euros o el 7% de la facturación global anual por prácticas prohibidas; hasta 15 millones o el 3% por incumplimiento de obligaciones generales; y hasta 7,5 millones o el 1,5% por proporcionar información inexacta a las autoridades."
        }
      }
    ]
  } : null;

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}
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
