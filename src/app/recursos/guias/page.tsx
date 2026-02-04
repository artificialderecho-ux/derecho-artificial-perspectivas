import type { Metadata } from "next";
import Link from "next/link";
import { Badges } from "@/lib/badges";
import libraryDocs from "../../../data/library-docs.json";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

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

const softLawDocs = [
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
  }
];

export default function GuidesPage() {
  const docs = libraryDocs as DocCard[];
  const aesiaDocs = docs.filter((d) => d.source === "AESIA");
  const ecDocs = docs.filter((d) => d.source === "Comisión Europea");
  const cepejDocs = softLawDocs.filter((d) => d.source.startsWith("CEPEJ"));
  const softLawEcDocs = softLawDocs.filter((d) => d.source === "Comisión Europea");
  const otherDocs = softLawDocs.filter(
    (d) => d.source !== "Comisión Europea" && !d.source.startsWith("CEPEJ"),
  );
  const commissionDocs: DocCard[] = [...ecDocs, ...softLawEcDocs];
  const mainAesiaDoc = aesiaDocs[0];

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
        <div className="container mx-auto px-4 max-w-6xl">
          <header className="mb-16 text-center max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">
              Biblioteca Digital
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              Guías y Protocolos
            </h1>
            <p className="lead text-muted-foreground">
              Repositorio centralizado de documentación técnica y ética de la AESIA, la Comisión Europea y organismos internacionales.
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-3 not-prose mb-16 bento-surface">
            <a
              href="#aesia"
              className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">AESIA</p>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Documentos</h3>
              <p className="text-sm text-body">Publicaciones clave de la AESIA.</p>
              <div className="mt-4 text-xs text-caption">Total: {aesiaDocs.length}</div>
            </a>
            <a
              href="#comision-europea"
              className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Comisión Europea</p>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Documentos</h3>
              <p className="text-sm text-body">Guías y materiales oficiales.</p>
              <div className="mt-4 text-xs text-caption">Total: {commissionDocs.length}</div>
            </a>
            <a
              href="#otros-organismos"
              className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Otros</p>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Soft law</h3>
              <p className="text-sm text-body">CEPEJ, UNESCO y organismos afines.</p>
              <div className="mt-4 text-xs text-caption">Total: {otherDocs.length + cepejDocs.length}</div>
            </a>
          </section>

          <div className="space-y-20">
            <section id="aesia">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-primary"></span>
                <h2 className="text-2xl font-serif text-foreground">
                  Agencia Española de Supervisión de la IA (AESIA)
                </h2>
              </div>
              {mainAesiaDoc && (
                <div className="mb-10 p-8 bg-slate-50 border border-slate-200 rounded-sm not-prose">
                  <h3 className="font-serif text-2xl text-slate-900 mb-4">
                    Summary: Guías Prácticas de la AESIA
                  </h3>
                  <p className="text-slate-700 mb-6 leading-relaxed text-justify hyphens-auto">
                    La Agencia Española de Supervisión de la IA publica guías y
                    protocolos para ayudar a organizaciones públicas y privadas a
                    gestionar riesgos, documentar sistemas de IA y cumplir con las
                    obligaciones del Reglamento Europeo de IA. Este repositorio
                    reúne los documentos clave, con foco en notificación de
                    incidentes, gobernanza y buenas prácticas de transparencia.
                  </p>
                  <a
                    href={mainAesiaDoc.url}
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
                    DESCARGAR DOCUMENTO ORIGINAL
                  </a>
                </div>
              )}

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aesiaDocs.length > 0 ? (
                  aesiaDocs.map((doc) => (
                    <DocCardItem key={doc.id} doc={doc} color="bg-blue-600" />
                  ))
                ) : (
                  <div className="col-span-full p-6 border border-dashed border-border rounded-lg text-center text-muted-foreground">
                    No hay documentos disponibles por el momento.
                  </div>
                )}
              </div>
            </section>

            <section id="cepej">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-primary"></span>
                <h2 className="text-2xl font-serif text-foreground">
                  CEPEJ (Consejo de Europa)
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cepejDocs.length > 0 ? (
                  cepejDocs.map((doc) => (
                    <DocCardItem key={doc.id} doc={doc} color="bg-slate-500" />
                  ))
                ) : (
                  <div className="col-span-full p-6 border border-dashed border-border rounded-lg text-center text-muted-foreground">
                    No hay documentos disponibles por el momento.
                  </div>
                )}
              </div>
            </section>

            <section id="comision-europea">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-primary"></span>
                <h2 className="text-2xl font-serif text-foreground">
                  Comisión Europea
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {commissionDocs.length > 0 ? (
                  commissionDocs.map((doc) => (
                    <DocCardItem key={doc.id} doc={doc} color="bg-[#003399]" />
                  ))
                ) : (
                  <div className="col-span-full p-6 border border-dashed border-border rounded-lg text-center text-muted-foreground">
                    No hay documentos disponibles por el momento.
                  </div>
                )}
              </div>
            </section>

            <section id="otros-organismos">
              <div className="flex items-center gap-4 mb-8">
                <span className="w-12 h-[1px] bg-primary"></span>
                <h2 className="text-2xl font-serif text-foreground">
                  Otros organismos
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherDocs.length > 0 ? (
                  otherDocs.map((doc) => (
                    <DocCardItem key={doc.id} doc={doc} color="bg-slate-500" />
                  ))
                ) : (
                  <div className="col-span-full p-6 border border-dashed border-border rounded-lg text-center text-muted-foreground">
                    No hay documentos disponibles por el momento.
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

function DocCardItem({ doc, color }: { doc: DocCard; color: string }) {
  const isAesia = doc.source === "AESIA";
  const toMs = (value?: string) => {
    if (!value) return 0;
    const d = new Date(value);
    const ms = d.getTime();
    return Number.isNaN(ms) ? 0 : ms;
  };
  const dateMs = toMs(doc.date);

  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col h-full bg-card p-6 border border-border rounded-lg hover:border-primary transition-all duration-300 hover:shadow-md"
    >
      <div className="flex justify-between items-start mb-4">
        <span
          className={`px-2 py-1 text-[10px] uppercase tracking-wider text-white font-medium rounded-sm ${color}`}
        >
          {doc.source}
        </span>
        <div className="text-xs text-muted-foreground font-mono inline-flex items-center gap-2">
          <span>{doc.year || doc.date?.split("-")[0]}</span>
          <Badges ms={dateMs} locale="es-ES" newLabel="Nuevo" updatedLabel="Actualizado" />
        </div>
      </div>
      <h3 className="font-serif text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
        {doc.title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-grow">
        {doc.description}
      </p>
      <div className="flex items-center text-xs font-medium text-primary uppercase tracking-wider mt-auto">
        {isAesia ? "Descargar documento original" : "Acceder al documento"}{" "}
        <span className="ml-2 group-hover:translate-x-1 transition-transform">
          →
        </span>
      </div>
    </a>
  );
}
