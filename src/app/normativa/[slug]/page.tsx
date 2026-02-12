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
    "dateModified": entry.date || datePublished,
    "image": {
      "@type": "ImageObject",
      "url": "https://www.derechoartificial.com/og-default-1200x630.jpg",
      "width": 1200,
      "height": 630
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  const faqJsonLd = entry.slug === "ai-act-guia-completa" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Todos los sistemas de IA están regulados por el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SÍ, todos los sistemas IA están cubiertos por AI Act, pero con intensidad regulatoria diferente: Prohibidos (Art. 5) con prohibición absoluta; Alto riesgo (Anexo III) con obligaciones estrictas Arts. 9-15; Transparencia (Art. 52) con el deber de informar al usuario que es IA; y Mínimo riesgo con códigos de conducta voluntarios."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es un sistema de 'alto riesgo'?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sistemas IA listados Anexo III que impactan significativamente derechos fundamentales o seguridad. Ejemplos: RRHH, educación, aplicación ley, scoring crediticio, biometría, infraestructuras críticas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo sé si mi sistema es alto riesgo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consultar Anexo III AI Act. Si sistema encaja en alguna categoría → Alto riesgo. Casos frontera → Consultar autoridad nacional (AESIA) o asesor jurídico especializado."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo usar IA para selección de personal?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SÍ, pero es sistema alto riesgo (Anexo III.4.a) → Obligaciones estrictas: Gestión riesgos Art. 9, Datasets sin sesgo Art. 10, FRIAS, Supervisión humana Art. 14 y Marcado CE."
        }
      },
      {
        "@type": "Question",
        "name": "¿Mi chatbot necesita cumplir el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende: Mínimo riesgo requiere informar al usuario que es IA (Art. 52.1). Si es alto riesgo (ej: chatbot bancario toma decisiones crediticias) → Obligaciones completas Arts. 9-15."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuándo entra en vigor el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya está en vigor (1 agosto 2024), pero aplicación escalonada: 2 feb 2025 (prohibiciones Art. 5), 2 ago 2026 (sistemas alto riesgo nuevos), 2 ago 2027 (sistemas alto riesgo existentes - deadline adaptación)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es el marcado CE y cómo lo obtengo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Certificación que sistema cumple AI Act → Permite comercializar UE. Cómo obtener: Anexo VI (Autoevaluación interna para mayoría sistemas), Anexo VII (Evaluación organismo notificado para biometría), registrar en base datos UE y aplicar logo CE."
        }
      },
      {
        "@type": "Question",
        "name": "¿Necesito hacer una EIPD y una FRIAS?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Si sistema IA trata datos personales Y es alto riesgo: EIPD (RGPD Art. 35) obligatoria si alto riesgo datos; FRIAS (AI Act Art. 27) obligatoria si impacto DDHH. Ambas pueden integrarse en documento único."
        }
      },
      {
        "@type": "Question",
        "name": "¿Las multas del AI Act se suman a las del RGPD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SÍ. Si sistema IA + datos personales → Posible sanción acumulativa: AEPD hasta 20M EUR (RGPD) y AESIA hasta 35M EUR (AI Act)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo usar ChatGPT/Claude en mi empresa?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SÍ, pero: Verificar que proveedor cumple AI Act; Si usas API para decisiones alto riesgo (ej: RRHH) → TÚ eres desplegador (Obligaciones Art. 26); Si solo uso genérico (redacción emails) → Bajo riesgo."
        }
      },
      {
        "@type": "Question",
        "name": "¿Sistemas de IA actuales deben adaptarse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SÍ. Sistemas alto riesgo ya en mercado tienen hasta 2 agosto 2027 para cumplir Arts. 9-15. Si no pueden adaptarse → Retirada mercado."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué pasa si mi sistema IA causa un daño?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Responsabilidad múltiple: Administrativa (sanción AI Act si incumplió obligaciones), Civil (indemnización víctimas por productos defectuosos o negligencia) y Penal (si delito)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Necesito un DPO para cumplir el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI Act NO requiere DPO expresamente. Pero si sistema trata datos personales → RGPD puede requerir DPO (Art. 37). Recomendable: Designar Oficial IA (Chief AI Officer) responsable compliance AI Act."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo comprar sistema IA a proveedor fuera de la UE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SÍ, pero proveedor debe cumplir AI Act (efecto extraterritorial Art. 2.1). Tú como importador (Art. 24) tienes obligaciones: Verificar conformidad, conservar documentación, marcado CE y nombre tuyo en sistema como importador."
        }
      },
      {
        "@type": "Question",
        "name": "¿Dónde puedo consultar dudas sobre el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AESIA (cuando esté operativa - previsto 2026), Comisión Europea (Portal AI Act + AI Pact), Asociaciones empresariales (Guías específicas sectores) o Asesor jurídico especializado en tech/IA."
        }
      }
    ]
  } : entry.slug === "rgpd-gobernanza-datos-ia" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Es obligatorio el DPO en empresas de IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SÍ, si el tratamiento se realiza por autoridad pública, requiere observación habitual y sistemática de interesados a gran escala, o implica tratamiento a gran escala de categorías especiales de datos (salud, biometría, etc.)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo afecta el AI Act a algoritmos ya existentes antes de 2024?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sistemas alto riesgo existentes tienen hasta el 2 de agosto de 2027 para adaptarse a los requisitos de los Arts. 9-15 (gestión riesgos, calidad datos, supervisión humana) y obtener marcado CE."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es el consentimiento la mejor base legal para entrenar modelos IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NO, suele ser preferible el interés legítimo (Art. 6.1.f) con test de ponderación o la ejecución de un contrato. El consentimiento plantea problemas de granularidad y revocabilidad (machine unlearning)."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué pasa si mi proveedor de IA está fuera de la UE?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es transferencia internacional ilegal si no hay decisión de adecuación o Cláusulas Contractuales Tipo (CCT 2021) con medidas técnicas complementarias como cifrado E2E o seudonimización robusta."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo demuestro Responsabilidad Proactiva (accountability)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mediante documentación exhaustiva: Registro de Actividades (RAT), EIPDs antes del despliegue, políticas de privacidad claras, contratos conformes Art. 28.3 y auditorías técnicas periódicas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo usar datos públicos de Instagram/TikTok para entrenar mi IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "NO automáticamente. 'Público' no significa libre de uso. El scraping masivo sin base legal válida infringe el RGPD y los términos de servicio de las plataformas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es legal el reconocimiento facial en el entorno laboral?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Casi nunca es proporcionado según AEPD. La asimetría de poder invalida el consentimiento. Solo se permite en supuestos de muy alta seguridad (infraestructuras críticas) con EIPD robusta."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué son los neurodatos y cómo se protegen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Información de actividad cerebral. Se consideran datos de salud (categoría especial Art. 9 RGPD). Requieren protección reforzada, consentimiento informado médico-legal y EIPD obligatoria."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es la seudonimización y cuándo es obligatoria?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sustituir identificadores por códigos reversibles con información adicional separada. Es obligatoria para investigación científica (Art. 89) y muy recomendada para datasets de entrenamiento IA."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es nulo el consentimiento dado bajo presión?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SÍ, absolutamente. El consentimiento debe ser libre. Si hay desequilibrio claro (empleador, autoridad) y no hay opción real de rechazo sin perjuicio, el consentimiento es nulo de pleno derecho."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué sanción conlleva NO notificar una brecha de seguridad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Doble sanción: por la brecha (hasta 10M EUR) y por no notificar (agravante). La ocultación deliberada puede elevar la sanción al máximo del 4% de la facturación global."
        }
      },
      {
        "@type": "Question",
        "name": "¿Quién tiene la última palabra sobre IA: AESIA o AEPD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende: AEPD exclusiva en derechos fundamentales y datos personales; AESIA en seguridad técnica del producto IA. En caso de impacto en privacidad, prevalece la AEPD."
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
