import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legislación",
  description:
    "Normativa esencial sobre inteligencia artificial, datos y regulación tecnológica en Europa y España.",
  keywords: [
    "legislación IA",
    "AI Act",
    "RGPD",
    "normativa europea",
    "España",
    "cumplimiento",
    "derecho y tecnología",
  ],
  alternates: {
    canonical: "/legislacion",
    languages: {
      "es-ES": "/legislacion",
      "en-US": "/en/legislation",
    },
  },
  openGraph: {
    type: "website",
    title: "Legislación",
    description:
      "Normativa esencial sobre inteligencia artificial, datos y regulación tecnológica en Europa y España.",
    url: "/legislacion",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
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

        <section className="rounded-lg border border-divider bg-surface p-8">
          <p className="text-sm uppercase tracking-widest text-caption mb-3">Repositorio</p>
          <h2 className="font-serif text-2xl text-foreground">En actualización</h2>
          <p className="text-body mt-4 max-w-2xl">
            Repositorio en actualización bajo el nuevo plan de acción 2026. Estamos reorganizando normativa,
            guías institucionales y notas prácticas.
          </p>
        </section>
      </div>
    </main>
  );
}
