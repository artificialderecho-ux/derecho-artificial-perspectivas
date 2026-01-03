import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

interface Document {
  title: string;
  description: string;
  type: string;
  source: string;
  year: string;
  url: string;
  category: "normativa" | "guias" | "investigacion" | "datos";
}

const documents: Document[] = [
  // Normativa primaria
  {
    title: "Reglamento (UE) 2024/1689 - Reglamento de Inteligencia Artificial (AI Act)",
    description: "Primer marco normativo integral de la UE sobre inteligencia artificial. Establece una arquitectura basada en niveles de riesgo, obligaciones para proveedores y operadores, y prohibiciones de determinadas prácticas de IA.",
    type: "Reglamento UE",
    source: "Diario Oficial de la Unión Europea",
    year: "2024",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689",
    category: "normativa",
  },
  {
    title: "Reglamento (UE) 2016/679 - Reglamento General de Protección de Datos (RGPD)",
    description: "Marco normativo europeo sobre protección de datos personales. Esencial para comprender las obligaciones de tratamiento de datos en sistemas de IA y los derechos de los afectados.",
    type: "Reglamento UE",
    source: "EUR-Lex",
    year: "2016",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32016R0679",
    category: "normativa",
  },
  {
    title: "Propuesta de Directiva sobre responsabilidad en materia de IA",
    description: "Propuesta legislativa para adaptar las normas de responsabilidad civil extracontractual a los daños causados por sistemas de inteligencia artificial.",
    type: "Propuesta legislativa",
    source: "Comisión Europea",
    year: "2022",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:52022PC0496",
    category: "normativa",
  },
  {
    title: "Directiva (UE) 2019/770 sobre contratos de suministro de contenidos y servicios digitales",
    description: "Regula los contratos de suministro de contenidos y servicios digitales, con implicaciones para el software de IA comercializado como servicio.",
    type: "Directiva UE",
    source: "EUR-Lex",
    year: "2019",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32019L0770",
    category: "normativa",
  },
  
  // Guías oficiales
  {
    title: "Carta Ética Europea sobre el uso de la IA en sistemas judiciales",
    description: "Cinco principios fundamentales del CEPEJ para el uso de IA en la administración de justicia: respeto a derechos fundamentales, no discriminación, calidad y seguridad, transparencia y control por el usuario.",
    type: "Directrices",
    source: "CEPEJ - Consejo de Europa",
    year: "2018",
    url: "https://www.coe.int/en/web/cepej/cepej-european-ethical-charter-on-the-use-of-artificial-intelligence-ai-in-judicial-systems-and-their-environment",
    category: "guias",
  },
  {
    title: "Directrices éticas para una IA fiable",
    description: "Marco ético del Grupo de Expertos de Alto Nivel de la Comisión Europea. Establece siete requisitos clave: agencia humana, robustez técnica, privacidad, transparencia, diversidad, bienestar social y rendición de cuentas.",
    type: "Directrices",
    source: "Comisión Europea",
    year: "2019",
    url: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai",
    category: "guias",
  },
  {
    title: "Recomendación sobre la Ética de la Inteligencia Artificial",
    description: "Primera normativa mundial sobre ética de la IA adoptada por los 193 Estados miembros de la UNESCO. Establece valores y principios comunes para guiar la construcción de marcos jurídicos.",
    type: "Recomendación",
    source: "UNESCO",
    year: "2021",
    url: "https://www.unesco.org/es/artificial-intelligence/recommendation-ethics",
    category: "guias",
  },
  {
    title: "Principios de la OCDE sobre Inteligencia Artificial",
    description: "Estándares internacionales para el desarrollo y uso responsable de IA, promoviendo innovación y confianza. Incluyen recomendaciones para políticas públicas.",
    type: "Principios",
    source: "OCDE",
    year: "2019",
    url: "https://oecd.ai/en/ai-principles",
    category: "guias",
  },
  {
    title: "Libro Blanco sobre la Inteligencia Artificial",
    description: "Documento estratégico de la Comisión Europea que precedió al AI Act. Analiza los riesgos de la IA y propone un enfoque europeo basado en la excelencia y la confianza.",
    type: "Libro Blanco",
    source: "Comisión Europea",
    year: "2020",
    url: "https://ec.europa.eu/info/sites/default/files/commission-white-paper-artificial-intelligence-feb2020_es.pdf",
    category: "guias",
  },
  {
    title: "Guía de buenas prácticas para el uso de IA en la Administración",
    description: "Orientaciones de la AESIA para la implementación responsable de sistemas de IA en el sector público español.",
    type: "Guía",
    source: "AESIA - España",
    year: "2023",
    url: "https://portal.mineco.gob.es/es-es/digitalizacion/Paginas/aesia.aspx",
    category: "guias",
  },
  
  // Proyectos de investigación
  {
    title: "Proyectos de IA y Derecho en Horizonte Europa",
    description: "Acceso a proyectos de investigación financiados por la UE que abordan gobernanza algorítmica, IA explicable, evaluación de impacto en derechos fundamentales y cumplimiento normativo.",
    type: "Base de datos",
    source: "CORDIS",
    year: "2024",
    url: "https://cordis.europa.eu/search?q=artificial%20intelligence%20law",
    category: "investigacion",
  },
  
  // Datos y evidencia
  {
    title: "Portal de Datos Abiertos de la UE - Inteligencia Artificial",
    description: "Acceso a conjuntos de datos, informes y estadísticas de las instituciones europeas sobre inteligencia artificial, incluyendo indicadores de adopción y estudios de impacto.",
    type: "Portal de datos",
    source: "data.europa.eu",
    year: "2024",
    url: "https://data.europa.eu/en",
    category: "datos",
  },
];

const categoryLabels = {
  normativa: "Normativa primaria",
  guias: "Guías oficiales y soft law",
  investigacion: "Proyectos de investigación",
  datos: "Datos y evidencia",
};

const Documentos = () => {
  const categories = ["normativa", "guias", "investigacion", "datos"] as const;

  return (
    <Layout>
      <SEOHead 
        title="Documentos y recursos sobre IA y Derecho | Derecho Artificial"
        description="Base de conocimiento curada: normativa europea sobre IA, guías oficiales, proyectos de investigación y datos. Recursos esenciales para profesionales jurídicos."
        canonical="https://derechoartificial.com/documentos"
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-6">
            Base de conocimiento
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Documentos y recursos sobre inteligencia artificial y Derecho
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Recopilación curada de normativa, directrices, informes y fuentes de datos 
            esenciales para comprender el marco jurídico de la inteligencia artificial 
            en Europa.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
            <p>
              Esta sección reúne documentos de referencia para el estudio y la práctica 
              profesional en el ámbito de la inteligencia artificial y el Derecho. Se 
              incluyen textos normativos vinculantes, directrices y recomendaciones de 
              organismos internacionales, proyectos de investigación financiados por la 
              Unión Europea y fuentes de datos institucionales.
            </p>
            <p>
              Cada documento se presenta con una breve introducción editorial que 
              contextualiza su relevancia jurídica y su relación con el ecosistema 
              regulatorio europeo.
            </p>
          </div>
        </div>
      </section>

      {/* Documents by category */}
      {categories.map((category) => {
        const categoryDocs = documents.filter((doc) => doc.category === category);
        if (categoryDocs.length === 0) return null;
        
        return (
          <section key={category} className="py-12 border-t border-divider">
            <div className="container-narrow">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
                {categoryLabels[category]}
              </h2>
              
              <div className="space-y-8">
                {categoryDocs.map((doc) => (
                  <article key={doc.title} className="border-b border-divider pb-8 last:border-b-0 last:pb-0">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="text-xs px-2 py-1 bg-surface text-caption border border-divider">
                        {doc.type}
                      </span>
                      <span className="text-xs text-caption">{doc.source}</span>
                      <span className="text-caption">·</span>
                      <span className="text-xs text-caption">{doc.year}</span>
                    </div>
                    
                    <h3 className="font-serif text-xl text-foreground mb-3 leading-tight">
                      <a 
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-muted-foreground transition-colors duration-300"
                      >
                        {doc.title}
                      </a>
                    </h3>
                    
                    <p className="text-body leading-relaxed mb-4">
                      {doc.description}
                    </p>
                    
                    <a 
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-caption hover:text-foreground transition-colors duration-300"
                    >
                      Acceder al documento
                      <span className="ml-2">↗</span>
                    </a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Editorial note */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h3 className="font-serif text-xl text-foreground mb-4">
              Nota editorial
            </h3>
            <p className="text-body leading-relaxed mb-4">
              Esta sección se actualiza periódicamente con nuevos documentos relevantes. 
              Los enlaces apuntan a fuentes oficiales e institucionales. En caso de que 
              algún enlace deje de estar disponible, puede notificarlo a través del 
              <Link to="/contacto" className="text-foreground underline hover:text-caption transition-colors ml-1">
                formulario de contacto
              </Link>.
            </p>
            <p className="text-body leading-relaxed">
              La inclusión de un documento en esta sección no implica valoración jurídica 
              ni recomendación de aplicación. Los profesionales deben verificar la vigencia 
              y pertinencia de cada fuente para su caso concreto.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Documentos;
