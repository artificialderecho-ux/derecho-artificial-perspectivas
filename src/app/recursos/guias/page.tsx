import type { Metadata } from "next";
import Link from "next/link";
import { Badges } from "@/lib/badges";
import libraryDocs from "../../../data/library-docs.json";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { ContentPreviewGrid, type PreviewItem } from "@/components/ContentPreviewCard";

export const metadata: Metadata = {
  title: "Guías y Protocolos | Biblioteca AESIA y Comisión Europea",
  description:
    "Hub central de documentación oficial: Guías de la AESIA, documentos de la Comisión Europea y protocolos de actuación.",
  alternates: {
    canonical: "https://derechoartificial.com/recursos/guias",
    languages: {
      es: "https://derechoartificial.com/recursos/guias",
      en: "https://derechoartificial.com/en/guides-protocols",
    },
  },
};

type DocCard = {
  id: string;
  title: string;
  description: string;
  source: string;
  url: string;
  date?: string;
  year?: string;
  language?: string;
  tags?: string[];
};

function docToPreviewItem(doc: DocCard, badge: string): PreviewItem {
  const parts: string[] = [];
  if (doc.year) parts.push(doc.year);
  if (doc.tags && doc.tags.length > 0) parts.push(doc.tags.join(" · "));
  
  return {
    id: doc.id,
    href: doc.url,
    title: doc.title,
    description: doc.description,
    badge,
    meta: parts.join(" · "),
    dateMs: doc.year ? new Date(doc.year).getTime() : Date.now(),
  };
}

const softLawDocs = [
  {
    id: "ai-act-guide-2026",
    title: "Guía práctica Reglamento Europeo de IA 2026",
    description: "Guía completa sobre el Reglamento Europeo de IA con análisis y recomendaciones para cumplimiento normativo.",
    source: "Derecho Artificial",
    year: "2026",
    url: "/normativa/ai-act-guia-completa",
    tags: ["Reglamento IA", "Guía práctica", "2026"]
  },
  {
    id: "sl-1",
    title: "Carta Ética Europea sobre el uso de la IA en sistemas judiciales",
    description: "Cinco principios fundamentales del CEPEJ para el uso de IA en la administración de justicia: respeto a derechos fundamentales, no discriminación, calidad y seguridad, transparencia y control por el usuario.",
    source: "CEPEJ - Consejo de Europa",
    year: "2018",
    url: "https://www.coe.int/en/web/cepej/cepej-european-ethical-charter-on-the-use-of-artificial-intelligence-ai-in-judicial-systems-and-their-environment",
  },
  {
    id: "sl-2",
    title: "Directrices éticas para una IA fiable",
    description: "Marco ético del Grupo de Expertos de Alto Nivel de la Comisión Europea. Establece siete requisitos clave: agencia humana, robustez técnica, privacidad, transparencia, diversidad, bienestar social y rendición de cuentas.",
    source: "Comisión Europea",
    year: "2019",
    url: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai",
  },
  {
    id: "sl-3",
    title: "Recomendación sobre la Ética de la Inteligencia Artificial",
    description: "Primera normativa mundial sobre ética de la IA adoptada por los 193 Estados miembros de la UNESCO. Establece valores y principios comunes para guiar la construcción de marcos jurídicos.",
    source: "UNESCO",
    year: "2021",
    url: "https://www.unesco.org/es/artificial-intelligence/recommendation-ethics",
  },
  {
    id: "ccbe-cloud-computing-2026",
    title: "Directrices CCBE sobre el uso de cloud computing por abogados",
    description: "Análisis exhaustivo de las recomendaciones de 2026 del Consejo de la Abogacía Europea sobre confidencialidad, seguridad y cumplimiento en la nube.",
    source: "CCBE",
    year: "2026",
    url: "/recursos/guias/en-itl-20250227-ccbe-guidelines-on-the-use-of-cloud-computing-by-lawyers",
    tags: ["Abogacía", "Cloud Computing", "Confidencialidad"]
  }
];

export default function GuidesPage() {
  const docs = libraryDocs as DocCard[];
  const aesiaDocs = docs.filter((d) => d.source === "AESIA");
  const ecDocs = docs.filter((d) => d.source === "Comisión Europea");
  const cepejDocs = softLawDocs.filter((d) => d.source.startsWith("CEPEJ"));
  const softLawEcDocs = softLawDocs.filter((d) => d.source === "Comisión Europea");
  const otherDocs = softLawDocs.filter(
    (d) =>
      d.source !== "Comisión Europea" &&
      !d.source.startsWith("CEPEJ") &&
      d.id !== "ai-act-guide-2026" &&
      d.id !== "rgpd-ia-guia-completa-2026" &&
      d.id !== "ccbe-cloud-computing-2025",
  );
  const commissionDocs: DocCard[] = [...ecDocs, ...softLawEcDocs];
  const mainAesiaDoc = aesiaDocs[0];

  // Convertir a PreviewItems
  const ccbeGuide = softLawDocs.find((d) => d.id === "ccbe-cloud-computing-2025");
  const ccbePreview = ccbeGuide ? docToPreviewItem(ccbeGuide, "Nuevo Análisis") : null;

  const rgpdGuide = softLawDocs.find((d) => d.id === "rgpd-ia-guia-completa-2026");
  const rgpdPreview = rgpdGuide ? docToPreviewItem(rgpdGuide, "Destacada") : null;

  const aiActGuide = softLawDocs.find((d) => d.id === "ai-act-guide-2026");
  const aiActPreview = aiActGuide ? docToPreviewItem(aiActGuide, "Destacada") : null;
  
  const mainAesiaPreview = mainAesiaDoc ? docToPreviewItem(mainAesiaDoc, "Guía") : null;
  const aesiaPreviews = aesiaDocs.map((doc) => docToPreviewItem(doc, "Guía"));
  const cepejPreviews = cepejDocs.map((doc) => docToPreviewItem(doc, "Protocolo"));
  const commissionPreviews = [...ecDocs, ...softLawEcDocs].map((doc) => docToPreviewItem(doc, "Documento"));
  const otherPreviews = otherDocs.map((doc) => docToPreviewItem(doc, "Recurso"));

  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com",
      },
      {
        name: "Guías y Protocolos",
        url: "https://derechoartificial.com/recursos/guias",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <main className="section-spacing">
        <div className="container-editorial">
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">Sección</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              Guías y Protocolos
            </h1>
            <p className="lead mt-6 text-justify max-w-3xl">
              Repositorio centralizado de documentación técnica y ética de la AESIA, la Comisión Europea 
              y organismos internacionales. Recursos curados para profesionales del derecho.
            </p>
          </header>

          {aiActPreview && (
            <section className="mb-12">
              <ContentPreviewGrid items={[aiActPreview]} columns={1} size="large" />
            </section>
          )}

          {ccbePreview && (
            <section className="mb-12">
              <ContentPreviewGrid items={[ccbePreview]} columns={1} size="large" />
            </section>
          )}

          {mainAesiaPreview && (
            <>
              <section className="mb-12">
                <ContentPreviewGrid items={[mainAesiaPreview]} columns={1} size="large" />
              </section>

              <section className="mb-12">
                <ContentPreviewGrid items={aesiaPreviews} columns={3} size="large" />
              </section>

              <section className="mb-12">
                <ContentPreviewGrid items={cepejPreviews} columns={2} size="medium" />
              </section>

              <section className="mb-12">
                <ContentPreviewGrid items={commissionPreviews} columns={2} size="medium" />
              </section>

              <section className="mb-12">
                <ContentPreviewGrid items={otherPreviews} columns={2} size="medium" />
              </section>

              <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Metodología editorial</p>
                <p className="text-body max-w-3xl">
                  Cada documento es seleccionado por su relevancia técnica, actualidad regulatoria y aplicabilidad práctica. 
                  Priorizamos fuentes oficiales y directrices de organismos reconocidos para garantizar la máxima 
                  trazabilidad y utilidad para profesionales del derecho.
                </p>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}
