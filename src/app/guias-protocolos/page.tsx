import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guías y Protocolos",
  description:
    "Biblioteca de guías, protocolos y documentación institucional relevante para IA y cumplimiento.",
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
      </div>
    </main>
  );
}

