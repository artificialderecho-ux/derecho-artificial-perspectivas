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
        "name": "¿Cómo se complementan el RGPD y el AI Act?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ambas normativas son de aplicación acumulativa. Mientras el RGPD protege la privacidad y autodeterminación informativa del individuo (enfoque en derechos), el AI Act introduce una capa de seguridad de producto y gestión de riesgos sistémicos (enfoque en producto). El cumplimiento de uno no exime del otro."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuáles son las multas por incumplimiento del RGPD en sistemas de IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El régimen sancionador establece dos niveles: hasta 20M EUR o 4% de la facturación global anual para infracciones graves (Art. 83.5), y hasta 10M EUR o 2% para infracciones administrativas (Art. 83.4). En España, la AEPD ha impuesto sanciones récord concentrándose en fallos de gobernanza algorítmica."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es el 'Accountability' o responsabilidad proactiva en IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es la obligación del responsable (Art. 5.2 RGPD) de ser capaz de demostrar el cumplimiento de todos los principios de protección de datos en todo momento. En IA implica documentar la lógica del algoritmo, datasets, medidas de seguridad y realizar auditorías periódicas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuándo es obligatoria una EIPD para un sistema de IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es obligatoria (Art. 35 RGPD) antes del despliegue si el tratamiento entraña un alto riesgo para los derechos de las personas. En IA, esto ocurre casi siempre que hay decisiones automatizadas, perfiles a gran escala o uso de categorías especiales de datos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Puedo usar datos públicos de redes sociales para entrenar mi IA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No automáticamente. 'Público' no significa libre de uso. Se requiere una base legal (Art. 6) válida, y el interés legítimo suele ser difícil de sostener para scraping masivo sin consentimiento explícito del usuario para esa finalidad específica."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es legal el reconocimiento facial en el entorno laboral?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Casi nunca es proporcionado según la AEPD. Existe una asimetría de poder que invalida el consentimiento. Solo se permite en supuestos de muy alta seguridad (infraestructuras críticas) y tras una EIPD robusta que demuestre que no hay alternativas menos invasivas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué son los neurodatos y cómo se protegen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Son datos obtenidos de la actividad cerebral. Se consideran categorías especiales de datos (salud) bajo el Art. 9 del RGPD y requieren protección reforzada, consentimiento explícito informado y medidas de seguridad máximas."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué diferencia hay entre seudonimización y anonimización?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "La seudonimización (Art. 4.5) es reversible con información adicional guardada aparte; los datos siguen siendo personales. La anonimización es irreversible; los datos dejan de estar sujetos al RGPD. Para entrenamiento de IA se recomienda la seudonimización como medida de seguridad."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es válido el consentimiento dado bajo presión o asimetría?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, es nulo de pleno derecho. El consentimiento debe ser libre (Art. 4.11). Si existe un desequilibrio claro (como empleador-empleado o autoridad-ciudadano), difícilmente se considera prestado libremente si no hay una opción real de rechazo sin perjuicio."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué sanción conlleva no notificar una brecha de seguridad?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Conlleva una doble sanción: por la brecha en sí (hasta 10M EUR o 2% facturación) y un agravante por no notificar a la autoridad en 72h o a los afectados. La ocultación deliberada puede elevar la sanción al máximo permitido."
        }
      },
      {
        "@type": "Question",
        "name": "¿Quién tiene la última palabra sobre IA: AESIA o AEPD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Depende del aspecto. La AEPD tiene exclusividad en derechos fundamentales y protección de datos. La AESIA supervisa la seguridad técnica del producto IA. En caso de conflicto sobre derechos de las personas, prevalece el criterio de la AEPD."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué es la transparencia algorítmica?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Es el derecho del interesado a recibir información significativa sobre la lógica aplicada en decisiones automatizadas (Art. 13-14 RGPD). La organización debe ser capaz de explicar cómo y por qué el algoritmo llegó a un resultado específico."
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
