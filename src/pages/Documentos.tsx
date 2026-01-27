import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import libraryDocs from "../data/library-docs.json";

const copyLink = (id: string) => {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  alert("Enlace de sección copiado");
};

// Estructura por categorías
const documentosPorCategoria = {
  aesia: libraryDocs.filter(d => d.source === 'AESIA').map(d => ({
    title: d.title,
    description: d.description,
    type: "Guía Oficial",
    source: "AESIA",
    year: d.date.split('-')[0],
    url: d.url,
    category: "aesia",
    language: d.language
  })),
  ec: libraryDocs.filter(d => d.source === 'Comisión Europea').map(d => ({
    title: d.title,
    description: d.description,
    type: "Documento Estratégico",
    source: "Comisión Europea",
    year: d.date.split('-')[0],
    url: d.url,
    category: "ec",
    language: d.language
  })),
  normativa: [
    {
      title: "Reglamento (UE) 2024/1689 - Reglamento de Inteligencia Artificial (AI Act)",
      description: "Primer marco normativo integral de la UE sobre inteligencia artificial. Establece una arquitectura basada en niveles de riesgo, obligaciones para sistemas de alto riesgo y sus implicaciones directas para abogados, despachos y administraciones públicas.",
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
    }
  ],
  guias: [
    {
      title: "Carta Ética Europea sobre el uso de la IA en sistemas judiciales",
      description: "Cinco principios fundamentales del CEPEJ para el uso de IA en la administración de justicia: respeto a derechos fundamentales, no discriminación, calidad y seguridad, transparencia y control por el usuario. Se refuerza especialmente la exigencia de supervisión humana en decisiones que afecten a derechos individuales.",
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
      url: "https://aesia.digital.gob.es/",
      category: "guias",
    }
  ],
  investigacion: [
    {
      title: "Inteligencia Artificial y Filosofía del Derecho: una revisión doctrinal",
      description: "Obra colectiva coordinada por Fernando H. Llano Alonso. Análisis multidisciplinar sobre la transformación del ordenamiento jurídico ante la convergencia tecnológica. Se abordan desde la ética y la filosofía hasta la robótica militar y la administración digital.",
      type: "Libro Colectivo / Monografía",
      source: "Ediciones Laborum, S.L.",
      year: "2022",
      url: "https://derechoartificial.com/analisis/filosofia-derecho-inteligencia-artificial",
      category: "investigacion",
    },
    {
      title: "Neuroderechos y protección penal: riesgos del uso directo de neurotecnologías",
      description: "Análisis jurídico de los riesgos penales del uso directo de neurotecnologías. Responsabilidad, indemnidad mental y tutela de la autonomía. Basado en la obra de Ediciones Laborum.",
      type: "Monografía",
      source: "Ediciones Laborum, S.L.",
      year: "2022",
      url: "https://derechoartificial.com/analisis/neuroderechos",
      category: "investigacion",
    },
    {
      title: "Proyectos de IA y Derecho en Horizonte Europa",
      description: "Acceso a proyectos de investigación financiados por la UE que abordan gobernanza algorítmica, IA explicable, evaluación de impacto en derechos fundamentales y cumplimiento normativo.",
      type: "Proyecto CORDIS",
      source: "CORDIS",
      year: "2024",
      url: "https://cordis.europa.eu/search?q=artificial%20intelligence%20law",
      category: "investigacion",
    }
  ],
  datos: [
    {
      title: "Portal de Datos Abiertos de la UE - Inteligencia Artificial",
      description: "Acceso a conjuntos de datos, informes y estadísticas de las instituciones europeas sobre inteligencia artificial, incluyendo indicadores de adopción y estudios de impacto.",
      type: "Datos públicos",
      source: "data.europa.eu",
      year: "2024",
      category: "datos",
      url: "https://data.europa.eu/en",
    },
    {
      title: "Informe sobre IA Aplicada al Sector Legal",
      description: "Análisis integral sobre la aplicación de la IA en el sector legal: transformación del despacho, automatización de tareas, cambios de roles y riesgos laborales.",
      type: "Informe",
      source: "Derecho Artificial",
      year: "2025",
      url: "/analisis/ia-sector-legal",
      category: "datos",
    },
    {
      title: "Observatorio de la IA y el Derecho de la Universidad Carlos III de Madrid",
      description: "Centro interdisciplinar que analiza las implicaciones jurídicas de la Inteligencia Artificial, con enfoque en Derecho Penal y Derecho Administrativo.",
      type: "Observatorio",
      source: "Universidad Carlos III",
      year: "2025",
      category: "datos",
      url: "https://www.uc3m.es/investigacion/areas-conocimiento/inteligencia-artificial",
    }
  ]
};

const categoryLabels = {
  aesia: "Guías Oficiales AESIA",
  ec: "Biblioteca de la Comisión Europea",
  normativa: "Normativa primaria",
  guias: "Guías oficiales y soft law",
  investigacion: "Proyectos de investigación",
  datos: "Datos y evidencia",
};

const Documentos = () => {
  const categories = ["aesia", "ec", "normativa", "guias", "investigacion", "datos"] as const;
  const documents = Object.values(documentosPorCategoria).flat();

  // Schema for Official Documents (AESIA + EC)
  const officialDocsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Documentos Oficiales de IA (AESIA y Comisión Europea)",
    "description": "Recopilación de guías técnicas, libros blancos y estrategia digital de la Agencia Española de Supervisión de la IA y la Comisión Europea.",
    "publisher": {
      "@type": "Organization",
      "name": "Derecho Artificial",
      "url": "https://derechoartificial.com"
    },
    "hasPart": [
        ...documentosPorCategoria.aesia.map(doc => ({
          "@type": "Article",
          "headline": doc.title,
          "description": doc.description,
          "url": doc.url,
          "author": {
            "@type": "GovernmentOrganization",
            "name": "AESIA"
          }
        })),
        ...documentosPorCategoria.ec.map(doc => ({
            "@type": "CreativeWork",
            "headline": doc.title,
            "description": doc.description,
            "url": doc.url,
            "author": {
              "@type": "GovernmentOrganization",
              "name": "European Commission"
            },
            "inLanguage": doc.language
        }))
    ]
  };

  return (
    <Layout>
      <SEOHead 
        title="Documentos y Recursos sobre Derecho de la IA | Derecho Artificial"
        description="Biblioteca esencial sobre regulación de Inteligencia Artificial. Guías oficiales de la AESIA, AI Act, jurisprudencia y estudios académicos."
        canonical="https://derechoartificial.com/documentos"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/documentos" },
          { lang: "en", href: "https://derechoartificial.com/en/documents" }
        ]}
      />
      
      <script type="application/ld+json">
        {JSON.stringify(officialDocsSchema)}
      </script>

      {/* Hero */}
      <section id="documentos" className="py-16 md:py-24">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-6">
            Base de conocimiento
          </p>
          <div className="flex items-center gap-2 mb-8">
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
              Documentos y recursos sobre inteligencia artificial y Derecho
            </h1>
            <button
              type="button"
              onClick={() => copyLink("documentos")}
              className="text-muted-foreground hover:text-foreground transition-colors text-base"
              aria-label="Copiar enlace de sección"
            >
              🔗
            </button>
          </div>
          <p className="text-xl text-body max-w-2xl">
            Recopilación curada de normativa, directrices, informes y fuentes de datos institucionales esenciales para comprender el marco jurídico de la inteligencia artificial en Europa.
          </p>
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-editorial">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Informes de Derecho Artificial
          </h2>
          <div className="card-elevated p-6 md:p-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-primary font-medium px-2 py-1 bg-primary/10 rounded">
                Informe técnico
              </span>
              <span className="text-caption">·</span>
              <time className="text-xs text-caption">2026</time>
            </div>
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-3">
              Clawdbot y la Ilusión de la Privacidad: Riesgos Críticos del RGPD
            </h3>
            <p className="text-body leading-relaxed mb-4">
              Análisis crítico sobre la responsabilidad del tratamiento y los riesgos de incumplimiento del RGPD cuando se integran proveedores externos desde arquitecturas de IA autoalojadas.
            </p>
            <a
              href="/informe-clawdbot-rgpd.pdf"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              📥 Descargar PDF
            </a>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
             <p>
               Esta sección reúne documentos de referencia para el estudio y la práctica profesional en el ámbito de la inteligencia artificial y el Derecho. Se 
               incluyen textos normativos vinculantes, directrices y recomendaciones de organismos internacionales, proyectos de investigación financiados por la 
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
                      {doc.language && (
                        <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                          [{doc.language}]
                        </span>
                      )}
                      <span className="text-xs text-caption">{doc.source}</span>
                      <span className="text-caption">·</span>
                      <span className="text-xs text-caption">{doc.year}</span>
                    </div>
                    
                    <h3 className="font-serif text-xl text-foreground mb-3 leading-tight">
                      <a 
                        href={doc.url}
                        target="_blank"
                        rel={doc.category === 'aesia' ? "noopener noreferrer nofollow" : "noopener noreferrer"}
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
                      rel={doc.category === 'aesia' ? "noopener noreferrer nofollow" : "noopener noreferrer"}
                      className={`inline-flex items-center text-sm font-medium transition-colors duration-300 ${
                        doc.category === 'aesia' 
                          ? "px-4 py-2 border border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white rounded-[4px]"
                          : "text-caption hover:text-foreground"
                      }`}
                    >
                      {doc.category === 'aesia' ? "Consultar Guía Oficial" : "Acceder al documento"}
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
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Nota editorial
          </h2>
          <p className="text-body leading-relaxed mb-4">
            Esta sección se actualiza periódicamente con nuevos documentos relevantes. Los enlaces apuntan a fuentes oficiales e institucionales. En caso de que algún enlace deje de estar disponible, puede notificarlo a través del 
            <Link to="/contacto" className="text-foreground underline hover:text-caption transition-colors ml-1">
              formulario de contacto
            </Link>.
          </p>
          <p className="text-body leading-relaxed">
            La inclusión de un documento en esta sección no implica valoración jurídica ni recomendación de aplicación. Los profesionales deben verificar la vigencia 
            y pertinencia de cada fuente para su caso concreto.
          </p>
          <p className="text-body leading-relaxed text-sm">
            Para maximizar la utilidad de este recurso, hemos organizado los documentos por categorías: Normativa, Guías de Soft Law, Investigación y Datos.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Documentos;
