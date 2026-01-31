import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jurisprudencia",
  description:
    "Selección y análisis de resoluciones relevantes sobre tecnología, datos e inteligencia artificial.",
  keywords: [
    "jurisprudencia IA",
    "derecho digital",
    "protección de datos",
    "RGPD",
    "decisiones judiciales",
    "algoritmos",
    "responsabilidad",
  ],
  alternates: {
    canonical: "/jurisprudencia",
    languages: {
      "es-ES": "/jurisprudencia",
      "en-US": "/en/jurisprudence",
    },
  },
  openGraph: {
    type: "website",
    title: "Jurisprudencia",
    description:
      "Selección y análisis de resoluciones relevantes sobre tecnología, datos e inteligencia artificial.",
    url: "/jurisprudencia",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
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
          <p className="lead mt-6 text-justify max-w-3xl">
            Repositorio crítico de resoluciones judiciales y administrativas que definen el Derecho de la IA. 
            Analizamos sentencias que sientan precedente sobre transparencia algorítmica, responsabilidad civil 
            y protección de derechos fundamentales en la era digital.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <Link
            href="/jurisprudencia/sentencia-bosco-transparencia-algoritmica"
            className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
          >
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Sentencia clave</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">
              Sentencia BOSCO: Transparencia Algorítmica y Código Fuente
            </h2>
            <p className="text-body mb-6">
              Análisis jurídico de la STS 1119/2025 que consolida el derecho de acceso al código fuente cuando un
              algoritmo determina prestaciones sociales.
            </p>
            <div className="text-sm text-caption">STS 1119/2025 · 11 de septiembre de 2025</div>
          </Link>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Enfoque</p>
            <h3 className="font-serif text-2xl text-foreground mb-4">Criterios de lectura</h3>
            <ul className="list-disc pl-6 text-body space-y-3">
              <li>Impacto directo sobre derechos y garantías fundamentales.</li>
              <li>Razonamiento judicial sobre transparencia y rendición de cuentas.</li>
              <li>Consecuencias prácticas para cumplimiento y diseño de sistemas.</li>
            </ul>
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
          <p className="text-xs uppercase tracking-widest text-caption mb-3">Líneas de seguimiento</p>
          <p className="text-body max-w-3xl">
            Seguimos de cerca la evolución de la jurisprudencia sobre automatización administrativa, protección de
            datos y responsabilidad por sistemas algorítmicos. Las nuevas resoluciones se incorporarán a esta sección
            con análisis comparado y notas prácticas.
          </p>
        </section>
      </div>
    </main>
  );
}
