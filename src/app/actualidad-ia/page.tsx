import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actualidad IA",
  description:
    "Monitor editorial de novedades regulatorias, institucionales y jurisprudenciales sobre inteligencia artificial.",
};

export default function ActualidadIAPage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Sección</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
            Actualidad IA
          </h1>
          <p className="text-lg text-body mt-6">
            Novedades institucionales y análisis con foco en cumplimiento y práctica jurídica.
          </p>
        </header>
      </div>
    </main>
  );
}

