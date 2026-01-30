import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jurisprudencia",
  description:
    "Selección y análisis de resoluciones relevantes sobre tecnología, datos e inteligencia artificial.",
};

export default function JurisprudenciaPage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Sección</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            Jurisprudencia
          </h1>
          <p className="text-lg text-body mt-6">
            Resoluciones y criterios judiciales con impacto en IA, datos y garantías.
          </p>
        </header>
      </div>
    </main>
  );
}

