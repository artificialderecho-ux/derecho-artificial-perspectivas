import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guías y Protocolos",
  description:
    "Biblioteca de guías, protocolos y documentación institucional relevante para IA y cumplimiento.",
  keywords: [
    "guías IA",
    "protocolos IA",
    "gobernanza de IA",
    "compliance IA",
    "evaluación de riesgos",
    "checklists",
    "políticas internas",
  ],
  alternates: {
    canonical: "/guias-protocolos",
    languages: {
      "es-ES": "/guias-protocolos",
      "en-US": "/en/guides-protocols",
    },
  },
  openGraph: {
    type: "website",
    title: "Guías y Protocolos",
    description:
      "Biblioteca de guías, protocolos y documentación institucional relevante para IA y cumplimiento.",
    url: "/guias-protocolos",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default function GuiasProtocolosPage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Sección</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            Guías y Protocolos
          </h1>
          <p className="text-lg text-body mt-6">
            Documentación de referencia para implementación, supervisión y buenas prácticas.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Gobernanza</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Protocolos de evaluación</h2>
            <p className="text-body">
              Marcos operativos para clasificar riesgos, documentar sistemas y definir responsabilidades internas
              antes del despliegue de IA.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Cumplimiento</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Checklists legales</h2>
            <p className="text-body">
              Listas de verificación para equipos jurídicos y de compliance con foco en RGPD, transparencia,
              trazabilidad y auditorías internas.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Operación</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Protocolos de supervisión</h2>
            <p className="text-body">
              Rutinas de seguimiento para monitorizar desempeño, sesgos y desviaciones, así como gestión de incidencias
              y escalado.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Documentación</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Plantillas de evidencias</h2>
            <p className="text-body">
              Modelos de registro y evidencias para demostrar diligencia, gobernanza y cumplimiento frente a clientes,
              reguladores y auditores.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
          <p className="text-xs uppercase tracking-widest text-caption mb-3">Repositorio 2026</p>
          <p className="text-body max-w-3xl">
            Este repositorio prioriza guías aplicables en proyectos reales. Cada protocolo incluirá objetivos, pasos
            operativos, responsables y métricas mínimas para facilitar su adopción inmediata.
          </p>
        </section>
      </div>
    </main>
  );
}
