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

        <section className="grid gap-6 md:grid-cols-2">
          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Marco europeo</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">AI Act</h2>
            <p className="text-body">
              Referencia principal para la gobernanza del riesgo en sistemas de IA. Seguimos su despliegue en España,
              los estándares técnicos y los calendarios de cumplimiento sectoriales.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Protección de datos</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">RGPD y LOPDGDD</h2>
            <p className="text-body">
              Base jurídica para el tratamiento algorítmico y la adopción de garantías. Incluimos criterios de la AEPD,
              resoluciones y buenas prácticas aplicables a IA.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Transparencia</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">LTAIBG y acceso a la información</h2>
            <p className="text-body">
              Normativa clave para evaluar transparencia algorítmica en el sector público y el derecho de acceso a
              código fuente cuando impacta en derechos sociales.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Responsabilidad</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Marco de riesgos y sanciones</h2>
            <p className="text-body">
              Lectura combinada de la normativa sectorial, régimen sancionador y obligaciones de diligencia para
              proveedores y usuarios de IA.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
          <p className="text-xs uppercase tracking-widest text-caption mb-3">Estructura 2026</p>
          <p className="text-body max-w-3xl">
            El repositorio normativo se organiza por bloques: marco europeo, derecho nacional y guías institucionales.
            Cada ficha incluirá síntesis ejecutiva, implicaciones prácticas y enlaces a fuentes oficiales.
          </p>
        </section>
      </div>
    </main>
  );
}
