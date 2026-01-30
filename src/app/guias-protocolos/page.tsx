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

        <section className="rounded-lg border border-divider bg-surface p-8">
          <p className="text-sm uppercase tracking-widest text-caption mb-3">Repositorio</p>
          <h2 className="font-serif text-2xl text-foreground">En actualización</h2>
          <p className="text-body mt-4 max-w-2xl">
            Repositorio en actualización bajo el nuevo plan de acción 2026. Publicaremos guías, checklists y
            protocolos conforme se revisen y validen.
          </p>
        </section>
      </div>
    </main>
  );
}
