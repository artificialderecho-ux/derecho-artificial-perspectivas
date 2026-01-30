import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Firma Scarpa",
  description:
    "Textos y análisis firmados por el responsable editorial sobre Derecho e Inteligencia Artificial.",
};

export default function FirmaScarpaPage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Sección</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            Firma Scarpa
          </h1>
          <p className="text-lg text-body mt-6">
            Artículos y ensayos con enfoque jurídico, ético y regulatorio.
          </p>
        </header>
      </div>
    </main>
  );
}

