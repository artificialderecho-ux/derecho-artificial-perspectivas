import type { Metadata } from "next";
import { GlossaryList } from "./glossary-list";

export const metadata: Metadata = {
  title: "Glosario de IA Legal y Regulación Europea | Derecho Artificial",
  description: "Diccionario especializado en términos de Inteligencia Artificial, EU AI Act, Legaltech y ética digital. Definiciones clave para abogados y empresas.",
  alternates: {
    canonical: "https://derechoartificial.com/glosario-ia-legal",
    languages: {
      es: "https://derechoartificial.com/glosario-ia-legal",
      en: "https://derechoartificial.com/en/legal-ai-glossary",
    },
  },
};

const terms = [
  {
    id: "sistemas-alto-riesgo",
    term: "Sistemas de Alto Riesgo",
    definition: "Sistemas de IA que suponen una amenaza para la seguridad o derechos fundamentales, sujetos a evaluación de conformidad según el EU AI Act."
  },
  {
    id: "sesgo-algoritmico",
    term: "Sesgo Algorítmico",
    definition: "Errores sistemáticos en el procesamiento de datos que generan resultados discriminatorios, prohibidos bajo el marco de ética digital europea."
  },
  {
    id: "sandbox-regulatorio",
    term: "Sandbox Regulatorio",
    definition: "Entorno controlado facilitado por la AESIA para probar sistemas de IA innovadores antes de su comercialización."
  },
  {
    id: "explicabilidad",
    term: "Explicabilidad (XAI)",
    definition: "Capacidad de un sistema de IA para presentar sus procesos de toma de decisiones de forma comprensible para humanos y autoridades legales."
  },
  {
    id: "ia-generativa",
    term: "Sistema de IA Generativa",
    definition: "Modelos de IA capaces de generar contenido (texto, imágenes, código) en respuesta a un prompt, sujetos a obligaciones específicas de transparencia bajo el AI Act."
  },
  {
    id: "deepfake",
    term: "Deepfake",
    definition: "Contenido multimedia sintético generado o manipulado por IA que parece auténtico, sujeto a obligaciones de etiquetado y transparencia."
  },
  {
    id: "evaluacion-impacto-derechos-fundamentales",
    term: "Evaluación de Impacto en los Derechos Fundamentales (FRIA)",
    definition: "Análisis obligatorio para desplegadores de sistemas de alto riesgo sobre cómo la IA afectará a los derechos de las personas antes de su puesta en uso."
  },
  {
    id: "oficina-ia",
    term: "Oficina de IA (AI Office)",
    definition: "Nuevo organismo de la Comisión Europea encargado de supervisar los modelos de IA de propósito general y coordinar la política de IA entre los Estados miembros."
  },
  {
    id: "modelo-proposito-general",
    term: "Modelo de Propósito General (GPAI)",
    definition: "Modelo de IA entrenado con gran cantidad de datos que puede realizar una amplia gama de tareas distintas y sirve como base para otros sistemas."
  },
  {
    id: "legal-prompt-engineering",
    term: "Legal Prompt Engineering",
    definition: "Técnica de diseño de instrucciones precisas y estructuradas para obtener resultados jurídicos fiables, seguros y verificables de modelos de lenguaje (LLM)."
  },
  {
    id: "gobernanza-datos",
    term: "Gobernanza de Datos",
    definition: "Conjunto de procesos y estándares que aseguran la calidad, integridad y legalidad de los datos utilizados para entrenar y operar sistemas de IA."
  },
  {
    id: "derecho-a-no-ser-objeto-de-decisiones-automatizadas",
    term: "Derecho a no ser objeto de decisiones automatizadas",
    definition: "Derecho recogido en el RGPD (Art. 22) que protege a las personas de decisiones basadas únicamente en el tratamiento automatizado que produzcan efectos jurídicos."
  }
];

const schema = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Glosario de Términos de IA Legal",
  "description": "Definiciones técnicas sobre regulación de IA, ética digital y cumplimiento normativo en Europa.",
  "hasDefinedTerm": terms.map(t => ({
    "@type": "DefinedTerm",
    "termCode": t.id,
    "name": t.term,
    "description": t.definition,
    "url": `https://derechoartificial.com/glosario-ia-legal#${t.id}`
  }))
};

export default function GlossaryPage() {
  return (
    <main className="min-h-screen pb-20 bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      <section className="pt-24 pb-16 md:pt-32 md:pb-12 px-6 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Recursos · Diccionario Jurídico
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
            Glosario de IA Legal
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-sans mb-10">
            Definiciones técnicas y jurídicas para comprender el nuevo marco regulatorio de la inteligencia artificial en Europa.
          </p>
          <GlossaryList />
        </div>
      </section>
    </main>
  );
}
