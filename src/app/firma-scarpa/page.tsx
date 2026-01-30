import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Firma Scarpa",
  description:
    "Textos y análisis firmados por el responsable editorial sobre Derecho e Inteligencia Artificial.",
  keywords: [
    "Ricardo Scarpa",
    "derecho artificial",
    "análisis jurídico IA",
    "opinión jurídica",
    "regulación IA",
    "AI Act",
    "cumplimiento",
  ],
  alternates: {
    canonical: "/firma-scarpa",
    languages: {
      "es-ES": "/firma-scarpa",
      "en-US": "/en/scarpa-firm",
    },
  },
  openGraph: {
    type: "website",
    title: "Firma Scarpa",
    description:
      "Textos y análisis firmados por el responsable editorial sobre Derecho e Inteligencia Artificial.",
    url: "/firma-scarpa",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
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
