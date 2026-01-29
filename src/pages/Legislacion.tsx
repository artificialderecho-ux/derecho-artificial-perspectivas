import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

// Static Normativa content (from Documentos.tsx)
const normativaDocs = [
  {
    title: "Reglamento (UE) 2024/1689 - Reglamento de Inteligencia Artificial (AI Act)",
    description: "Primer marco normativo integral de la UE sobre inteligencia artificial. Establece una arquitectura basada en niveles de riesgo, obligaciones para sistemas de alto riesgo y sus implicaciones directas para abogados, despachos y administraciones públicas.",
    type: "Reglamento UE",
    source: "Diario Oficial de la Unión Europea",
    year: "2024",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689",
  },
  {
    title: "Reglamento (UE) 2016/679 - Reglamento General de Protección de Datos (RGPD)",
    description: "Marco normativo europeo sobre protección de datos personales. Esencial para comprender las obligaciones de tratamiento de datos en sistemas de IA y los derechos de los afectados.",
    type: "Reglamento UE",
    source: "EUR-Lex",
    year: "2016",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679",
  },
  {
    title: "Propuesta de Directiva sobre responsabilidad en materia de IA",
    description: "Propuesta legislativa para adaptar las normas de responsabilidad civil extracontractual a los daños causados por sistemas de inteligencia artificial.",
    type: "Propuesta legislativa",
    source: "Comisión Europea",
    year: "2022",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:52022PC0496",
  },
  {
    title: "Directiva (UE) 2019/770 sobre contratos de suministro de contenidos y servicios digitales",
    description: "Regula los contratos de suministro de contenidos y servicios digitales, con implicaciones para el software de IA comercializado como servicio.",
    type: "Directiva UE",
    source: "EUR-Lex",
    year: "2019",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32019L0770",
  }
];

const Legislacion = () => {
  return (
    <Layout>
      <SEOHead 
        title="Legislación IA y Normativa Digital | Derecho Artificial"
        description="Repositorio de normativa primaria europea y nacional: AI Act, RGPD, Directivas de responsabilidad y legislación sobre tecnología."
        canonical="https://derechoartificial.com/legislacion"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/legislacion" },
          { lang: "en", href: "https://derechoartificial.com/en/legislation" }
        ]}
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">
            Marco Normativo
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Legislación y Normativa Primaria
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Acceso directo a los textos legales fundamentales que regulan la inteligencia artificial y el entorno digital en Europa.
          </p>
        </div>
      </section>

      <div className="container-wide py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {normativaDocs.map((doc) => (
            <a 
              key={doc.url} 
              href={doc.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-card p-8 border border-border rounded-sm hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 text-xs uppercase tracking-wider text-white font-medium rounded-sm bg-indigo-600">
                  {doc.type}
                </span>
                <span className="text-sm text-muted-foreground font-mono bg-surface px-2 py-1 rounded-sm">
                  {doc.year}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                {doc.title}
              </h3>
              <p className="text-body leading-relaxed mb-6">
                {doc.description}
              </p>
              <div className="flex items-center text-sm font-medium text-primary uppercase tracking-wider border-t border-border pt-4 mt-auto">
                Consultar texto oficial <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Legislacion;