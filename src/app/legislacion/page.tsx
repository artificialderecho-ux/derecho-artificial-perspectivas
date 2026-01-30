import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legislación",
  description:
    "Normativa esencial sobre inteligencia artificial, datos y regulación tecnológica en Europa y España.",
};

export default function LegislacionPage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Sección</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            Legislación
          </h1>
          <p className="text-lg text-body mt-6">
            Guía de referencia normativa para entender obligaciones, riesgos y garantías.
          </p>
        </header>
      </div>
    </main>
  );
}

