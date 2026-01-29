import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { ArticleCard } from "@/components/ui/ArticleCard";

const articles = [
  {
    title: "Clawdbot y la Ilusión de la Privacidad: Riesgos Críticos del RGPD",
    excerpt: "Arquitectura, responsabilidad del tratamiento y riesgos de incumplimiento cuando se integran modelos externos desde soluciones autoalojadas.",
    date: "27 de enero, 2026",
    category: "Privacidad & Cumplimiento",
    href: "/firma-scarpa/clawdbot-ilusion-privacidad",
  },
  {
    title: "Neuroderechos y protección penal: riesgos del uso directo de neurotecnologías",
    excerpt: "Análisis jurídico de los riesgos penales del uso directo de neurotecnologías. Responsabilidad, indemnidad mental y tutela de la autonomía.",
    date: "23 de enero, 2025",
    category: "Derecho Penal & Neurotecnología",
    href: "/firma-scarpa/neuroderechos",
  },
  {
    title: "Informe Estratégico: El Nuevo Orden de la IA en la UE (Reglamento 2024/1689)",
    excerpt: "Análisis profundo sobre el cumplimiento del EU AI Act, arquitectura de riesgos, modelos GPAI y el papel de la AESIA en España.",
    date: "24 de enero, 2026",
    category: "Regulación & Compliance",
    href: "/analisis/analisis-ria-estrategico",
  },
  {
    title: "Cuando la IA “alucina” en los tribunales, ¿quién paga el precio?",
    excerpt: "Análisis del riesgo de alucinaciones de IA en escritos judiciales y de la responsabilidad profesional por falta de verificación.",
    date: "20 de enero, 2026",
    category: "Responsabilidad Profesional & IA",
    href: "/analisis/ia-alucina-tribunales-quien-paga-el-precio",
  },
  {
    title: "Normativa, Organismos y Tendencias en IA para el Sector Legal: Análisis Crítico 2026",
    excerpt: "Análisis independiente de normativa AI Act, organismos AESIA/UE y tendencias éticas en derecho legal España/Europa, con enfoque crítico derechos vs. mercado.",
    date: "18 de enero, 2026",
    category: "Regulación & Tendencias",
    href: "/analisis/ia-sector-legal",
  },
  {
    title: "Filosofía del Derecho e IA: una revisión doctrinal",
    excerpt: "Análisis de la obra 'Inteligencia Artificial y Filosofía del Derecho' (Ediciones Laborum, 2022). Exploración de los desafíos iusfilosóficos: identidad humana, neuroderechos y el impacto del automatismo en la práctica jurídica.",
    date: "22 de enero, 2025",
    category: "Teoría del Derecho",
    href: "/analisis/filosofia-derecho-inteligencia-artificial",
  },
  {
    title: "El AI Act y la práctica jurídica en Europa: obligaciones reales, zonas grises y riesgos operativos",
    excerpt: "Un análisis jurídico del Reglamento Europeo de Inteligencia Artificial desde la perspectiva de su aplicación práctica en despachos, departamentos legales e instituciones públicas. Más allá del texto normativo: obligaciones operativas, interacción con el RGPD y cuestiones pendientes de desarrollo.",
    date: "14 de enero, 2025",
    category: "Regulación",
    href: "/analisis/ai-act-practica-juridica",
  },
  {
    title: "Reglamento Europeo de Inteligencia Artificial (AI Act): análisis jurídico y claves para el sector legal",
    excerpt: "El AI Act establece el primer marco regulatorio integral para la inteligencia artificial en la Unión Europea. Analizamos su arquitectura normativa basada en el riesgo, las obligaciones para sistemas de alto riesgo y sus implicaciones directas para abogados, despachos y administraciones públicas.",
    date: "31 de diciembre, 2024",
    category: "Regulación",
    href: "/analisis/ai-act-reglamento-europeo",
  }
];

const FirmaScarpa = () => {
  return (
    <Layout>
      <SEOHead 
        title="Firma Scarpa | Análisis Jurídico Profundo - Derecho Artificial"
        description="Análisis jurídicos especializados sobre Inteligencia Artificial, Regulación y Neuroderechos. La firma personal de Derecho Artificial."
        canonical="https://derechoartificial.com/firma-scarpa"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <div className="flex items-center gap-2 mb-8">
            <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground leading-tight">
              Firma Scarpa
            </h1>
          </div>
          <p className="text-xl text-body max-w-2xl">
            Análisis jurídicos en profundidad, opinión crítica y prospectiva regulatoria.
          </p>
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-editorial">
          <div className="space-y-12">
            {articles.map((article, index) => (
              <ArticleCard 
                key={article.title} 
                {...article} 
                featured={index === 0}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default FirmaScarpa;
