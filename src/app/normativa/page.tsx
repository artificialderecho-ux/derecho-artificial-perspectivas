import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/layout/LegalLayout";
import {
  StructuredData,
  createArticleJsonLd,
  createBreadcrumbJsonLd,
  createLegislationJsonLd,
} from "@/components/seo/StructuredData";
import type { ResourceEntry } from "@/lib/resources";
import { getSectionResourceEntry, listSectionResourceSlugs } from "@/lib/resources";
import { Badges, isNew, isRecent, formatDateFromMs } from "@/lib/badges";

export const metadata: Metadata = {
  title: "Guía del Reglamento de IA en 2026: Cumplimiento para Empresas",
  description:
    "Análisis experto sobre el EU AI Act en 2026. Niveles de riesgo, sanciones y el papel de la AESIA en España para empresas y abogados.",
  alternates: {
    canonical: "/normativa",
    languages: {
      es: "/normativa",
      en: "/en/blog/eu-ai-act-guide-2026",
    },
  },
};

export default async function NormativaPage() {
  const articleJsonLd = createArticleJsonLd({
    url: "https://derechoartificial.com/normativa",
    headline: "Guía del Reglamento de IA en 2026: Cumplimiento para Empresas",
    description:
      "Análisis experto sobre el EU AI Act en 2026. Niveles de riesgo, sanciones y el papel de la AESIA en España para empresas y abogados.",
    datePublished: "2026-01-15",
    authorName: "Ricardo Scarpa",
  });

  const legislationJsonLd = createLegislationJsonLd({
    url: "https://derechoartificial.com/normativa",
    name: "Reglamento (UE) 2024/1689 - Reglamento de Inteligencia Artificial (AI Act)",
    description:
      "Marco normativo integral de la UE sobre inteligencia artificial basado en niveles de riesgo y obligaciones para sistemas de alto riesgo.",
    datePublished: "2024-07-12",
    jurisdiction: "Unión Europea",
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué empresas deben cumplir con el AI Act?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "Todas aquellas que pongan en el mercado o utilicen sistemas de IA en la Unión Europea, " +
            "incluyendo proveedores de fuera de la Unión si el output del sistema se usa en territorio europeo.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuándo entra en vigor plenamente?",
        acceptedAnswer: {
          "@type": "Answer",
          text:
            "El Reglamento entra en vigor 20 días después de su publicación, pero su aplicabilidad es escalonada. " +
            "Las prohibiciones de riesgo inaceptable aplican a los 6 meses, y la mayoría de las normas a los 24 meses (2026).",
        },
      },
    ],
  };

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
    ],
  });

  const slugs = await listSectionResourceSlugs("normativa");
  const entries = await Promise.all(slugs.map((slug) => getSectionResourceEntry("normativa", slug)));
  const resolvedEntries = entries
    .filter((entry): entry is ResourceEntry => Boolean(entry))
    .sort((a, b) => {
      const aMs = a.displayDateMs ?? a.dateMs ?? 0;
      const bMs = b.displayDateMs ?? b.dateMs ?? 0;
      return bMs - aMs;
    });
  

  return (
    <>
      <StructuredData data={[articleJsonLd, legislationJsonLd, faqJsonLd, breadcrumbJsonLd]} />
      <LegalLayout
        title="Guía del Reglamento de IA en 2026: Cumplimiento para Empresas"
        category="Normativa"
        date="2026-01-15"
      >
        <div className="mb-12 p-8 bg-slate-50 border border-slate-200 rounded-sm not-prose">
          <h2 className="font-serif text-2xl text-slate-900 mb-4">Resumen Ejecutivo</h2>
          <p className="text-slate-700 mb-6 leading-relaxed text-justify hyphens-auto">
            El Reglamento Europeo de Inteligencia Artificial (EU AI Act) establece el primer marco
            jurídico integral del mundo para la IA. Esta guía desglosa las obligaciones clave para
            proveedores y usuarios, el sistema de clasificación de riesgos y los plazos de
            implementación escalonada que culminan en 2026. Documento esencial para departamentos
            legales y de compliance.
          </p>
          <a
            href="https://eur-lex.europa.eu/legal-content/ES/TXT/PDF/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm tracking-wide rounded-sm hover:bg-primary/90 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            DESCARGAR REGLAMENTO OFICIAL (PDF)
          </a>
        </div>

        <section className="grid gap-6 md:grid-cols-3 not-prose mb-12 bento-surface">
          <a
            href="https://eur-lex.europa.eu/legal-content/ES/TXT/PDF/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-all"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Documento oficial</p>
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">Reglamento de IA (PDF)</h3>
            <p className="text-sm text-body">Descarga directa desde EUR-Lex.</p>
          </a>
          <Link
            href="/jurisprudencia/sentencia-bosco-transparencia-algoritmica"
            className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-all"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Transparencia</p>
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">Caso BOSCO</h3>
            <p className="text-sm text-body">Acceso a código fuente en prestaciones sociales.</p>
          </Link>
          <Link
            href="/normativa"
            className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 transition-all"
          >
            <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Actividad</p>
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-2">Novedades normativas</h3>
            <p className="text-sm text-body">Entradas registradas: {resolvedEntries.length}</p>
          </Link>
        </section>

        <p className="lead">
          La entrada en vigor plena del{" "}
          <a
            href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reglamento de Inteligencia Artificial (AI Act)
          </a>{" "}
          marca un hito en la regulación digital global. Para las empresas, el{" "}
          <strong>cumplimiento legal</strong> ya no es una opción, sino un requisito de mercado
          fundamental para operar en la Unión Europea.
        </p>

        <h2>Niveles de Riesgo en el EU AI Act</h2>
        <p>
          La normativa adopta un enfoque basado en riesgos, clasificando los sistemas de IA en cuatro
          categorías distintas que determinan la carga regulatoria aplicable, asegurando un equilibrio
          entre innovación y derechos fundamentales.
        </p>

        <h3>Sistemas de Alto Riesgo</h3>
        <p>
          Aquellos utilizados en infraestructuras críticas, educación, empleo o servicios públicos
          esenciales. Estos sistemas requieren una evaluación de conformidad rigurosa, gestión de
          calidad y supervisión humana para mitigar posibles <strong>sesgos algorítmicos</strong> que
          puedan afectar a los ciudadanos.
        </p>

        <h3>Sistemas de Riesgo Inaceptable</h3>
        <p>
          Quedan terminantemente prohibidos aquellos sistemas que amenacen los{" "}
          <strong>derechos fundamentales</strong>, como el scoring social por parte de gobiernos o la
          manipulación subliminal del comportamiento humano.
        </p>

        <h2>Sanciones y Gobernanza: El papel de la AESIA</h2>
        <p>
          En España, la{" "}
          <a href="https://www.aesia.gob.es/" target="_blank" rel="noopener noreferrer">
            Agencia Española de Supervisión de la Inteligencia Artificial (AESIA)
          </a>{" "}
          asume el rol de autoridad de vigilancia de mercado. Las sanciones por incumplimiento pueden
          alcanzar hasta el 7% del volumen de negocio global anual o 35 millones de euros, lo que
          subraya la importancia crítica de una adaptación temprana.
        </p>

        <div className="my-10 p-6 bg-blue-50/50 border border-blue-100 rounded-sm not-prose">
          <h4 className="font-serif text-lg text-blue-900 mb-2">
            Relacionado: Transparencia Algorítmica en España
          </h4>
          <p className="text-sm text-blue-800 mb-3 text-justify hyphens-auto">
            Para entender cómo los tribunales aplican la transparencia en sistemas automatizados antes
            de la plena vigencia del Reglamento, consulte nuestro análisis sobre el caso BOSCO y el
            acceso al código fuente.
          </p>
          <Link
            href="/jurisprudencia/sentencia-bosco-transparencia-algoritmica"
            className="text-blue-700 font-medium hover:underline flex items-center gap-2 text-sm"
          >
            Leer análisis de la Sentencia BOSCO
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="mt-12 mb-16 not-prose">
          <h3 className="font-serif text-2xl text-foreground mb-6">
            Preguntas Frecuentes sobre Cumplimiento
          </h3>
          <div className="space-y-4">
            <details className="group border border-border rounded-sm p-4 bg-card">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                <span>¿Qué empresas deben cumplir con el AI Act?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="group-open:animate-fadeIn mt-3 text-muted-foreground text-sm leading-relaxed text-justify">
                Todas aquellas que pongan en el mercado o utilicen sistemas de IA en la UE, incluyendo
                proveedores de fuera de la Unión si el output del sistema se usa en territorio europeo.
              </p>
            </details>
            <details className="group border border-border rounded-sm p-4 bg-card">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                <span>¿Cuándo entra en vigor plenamente?</span>
                <span className="transition group-open:rotate-180">
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="group-open:animate-fadeIn mt-3 text-muted-foreground text-sm leading-relaxed text-justify">
                El Reglamento entra en vigor 20 días después de su publicación, pero su aplicabilidad es
                escalonada. Las prohibiciones de riesgo inaceptable aplican a los 6 meses, y la mayoría
                de las normas a los 24 meses (2026).
              </p>
            </details>
          </div>
        </div>

        {resolvedEntries.length > 0 && (
          <section className="mt-12">
            <h3 className="font-serif text-2xl text-foreground mb-6">Normativa relacionada</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {resolvedEntries.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/normativa/${entry.slug}`}
                  className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
                >
                  <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Normativa</p>
                  <h3 className="font-serif text-2xl text-foreground mb-4">{entry.title}</h3>
                  <Badges ms={entry.dateMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" className="mb-3 inline-flex items-center gap-2 text-xs text-caption" />
                  {entry.summaryHtml && (
                    <p className="text-body">
                      {entry.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </LegalLayout>
    </>
  );
}
