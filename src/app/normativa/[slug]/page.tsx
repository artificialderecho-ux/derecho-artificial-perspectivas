import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalLayout } from "@/components/layout/LegalLayout";
import {
  StructuredData,
  createBreadcrumbJsonLd,
  createLegislationJsonLd,
} from "@/components/seo/StructuredData";
import { RelatedArticles } from "@/components/RelatedArticles";
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
  const description = entry.description || entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 158) || "Análisis jurídico experto sobre IA por Ricardo Scarpa";
  const canonical = `https://www.derechoartificial.com/normativa/${entry.slug}`;
  const ogImage = "https://www.derechoartificial.com/og-default-1200x630.jpg";

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
      publishedTime: entry.dateMs != null ? new Date(entry.dateMs).toISOString() : undefined,
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

export default async function NormativaSlugPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = await getSectionResourceEntry("normativa", slug);
  if (!entry) notFound();

  const url = `https://www.derechoartificial.com/normativa/${entry.slug}`;
  const description = entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200);

  const datePublished =
    entry.dateMs != null && !Number.isNaN(entry.dateMs)
      ? new Date(entry.dateMs).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    headline: entry.title,
    description: description,
    author: { 
      "@type": "Person", 
      name: "Ricardo Scarpa",
      url: "https://www.derechoartificial.com/quienes-somos"
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
          "text": "La aplicación es escalonada: las prohibiciones de sistemas de riesgo inaceptable (como social scoring o manipulación subliminal) entraron en vigor el 2 de febrero de 2025. Las normas para modelos de IA de propósito general (GPAI) se aplican desde el 2 de agosto de 2025. La mayoría de las obligaciones para sistemas de alto riesgo serán exigibles el 2 de agosto de 2026, y la adaptación completa de sistemas existentes finalizará el 2 de agosto de 2027."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué sistemas de IA están prohibidos?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Según el Artículo 5 del AI Act, están prohibidos los sistemas de riesgo inaceptable: puntuación social (social scoring) gubernamental, manipulación subliminal con daño potencial, explotación de vulnerabilidades (edad, discapacidad), predicción delictiva basada en perfilado, bases de datos de reconocimiento facial mediante raspado (scraping) indiscriminado e identificación biométrica remota 'en tiempo real' en espacios públicos para fines policiales (salvo excepciones críticas)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son las multas por incumplimiento del AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El régimen sancionador establece multas administrativas proporcionales: hasta 35 millones de euros o el 7% de la facturación global anual por prácticas prohibidas (Art. 5); hasta 15 millones o el 3% por incumplimiento de obligaciones de sistemas de alto riesgo; y hasta 7,5 millones o el 1,5% por proporcionar información incorrecta a las autoridades. Para las PYMEs, las multas se limitan al porcentaje menor indicado."
        }
      }
    ]
  } : entry.slug === "rgpd-gobernanza-datos-ia" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuáles son las multas por incumplimiento del RGPD en IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El régimen sancionador del RGPD establece dos niveles: multas de hasta 20 millones de euros o el 4% de la facturación global anual para infracciones graves (Art. 83.5), y hasta 10 millones o el 2% para infracciones administrativas (Art. 83.4). En España, la AEPD ha impuesto sanciones récord recientemente, destacando fallos en gobernanza algorítmica y falta de Evaluaciones de Impacto (EIPD)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué obligaciones críticas establece el RGPD para sistemas de IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Las organizaciones deben cumplir con la responsabilidad proactiva (Art. 5.2), realizar una EIPD preventiva (Art. 35) antes del despliegue si hay alto riesgo para los derechos, garantizar una base legal sólida (Art. 6) más allá del consentimiento, y asegurar la transparencia algorítmica y notificación de brechas en un plazo de 72 horas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo se complementan el RGPD y el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ambas normativas son de aplicación acumulativa. Mientras el RGPD protege la privacidad y autodeterminación informativa del individuo, el AI Act introduce una capa de seguridad de producto y gestión de riesgos sistémicos. El cumplimiento del AI Act no exime de las obligaciones de protección de datos del RGPD."
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
        <RelatedArticles 
          currentSlug={entry.slug} 
          currentCategory="normativa" 
          currentTags={entry.slug === "ai-act-guia-completa" ? ["#AIAct", "#Regulación", "#UE"] : entry.slug === "rgpd-gobernanza-datos-ia" ? ["#RGPD", "#Privacidad", "#IA"] : []}
        />
      </LegalLayout>
    </>
  );
}
