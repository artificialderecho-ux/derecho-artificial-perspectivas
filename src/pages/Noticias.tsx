import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { NewsCard } from "@/components/ui/NewsCard";
import { Link } from "react-router-dom";

interface NoticiaEditorial {
  title: string;
  date: string;
  source: string;
  sourceUrl: string;
  tags: string[];
  context: string;
  keyContent: string;
  legalRelevance: string;
  editorialNote: string;
}

const noticias: NoticiaEditorial[] = [
  {
    title: "El AI Act entra en vigor: primeras obligaciones para operadores de sistemas de IA",
    date: "Enero 2025",
    source: "EUR-Lex / Diario Oficial de la Unión Europea",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689",
    tags: ["AI Act", "Regulación UE", "Cumplimiento normativo"],
    context: "El Reglamento (UE) 2024/1689, conocido como AI Act, entró en vigor el 1 de agosto de 2024. A partir de febrero de 2025 comienzan a aplicarse las primeras prohibiciones sobre sistemas de IA de riesgo inaceptable, iniciando así el calendario de aplicación gradual que culminará en 2027.",
    keyContent: "Las primeras obligaciones afectan a los sistemas de IA prohibidos por el artículo 5 del Reglamento: manipulación subliminal, explotación de vulnerabilidades, puntuación social y predicción criminal individual. Los proveedores y operadores deben cesar el uso de estos sistemas o acreditar que no incurren en las conductas proscritas.",
    legalRelevance: "Para despachos de abogados y departamentos jurídicos, esta fase inicial exige una auditoría de las herramientas de IA actualmente en uso para verificar que ninguna incurra en prácticas prohibidas. Los sistemas de alto riesgo tendrán obligaciones adicionales a partir de agosto de 2025, lo que aconseja preparar ya los procesos de evaluación de conformidad.",
    editorialNote: "La aplicación gradual del AI Act no debe confundirse con una moratoria. Las prohibiciones del artículo 5 son de aplicación inmediata y su incumplimiento puede generar sanciones de hasta 35 millones de euros o el 7% del volumen de negocio global.",
  },
  {
    title: "CEPEJ publica directrices actualizadas sobre IA en sistemas judiciales",
    date: "Enero 2025",
    source: "CEPEJ / Consejo de Europa",
    sourceUrl: "https://www.coe.int/en/web/cepej/cepej-european-ethical-charter-on-the-use-of-artificial-intelligence-ai-in-judicial-systems-and-their-environment",
    tags: ["Ética", "Soft law", "Administración de justicia", "CEPEJ"],
    context: "La Comisión Europea para la Eficacia de la Justicia (CEPEJ) del Consejo de Europa continúa desarrollando el marco ético para el uso de inteligencia artificial en la administración de justicia, complementando su Carta Ética de 2018 con nuevas orientaciones prácticas.",
    keyContent: "Los cinco principios fundamentales de la Carta Ética —respeto a derechos fundamentales, no discriminación, calidad y seguridad, transparencia y control por el usuario— se desarrollan ahora con indicadores concretos de implementación. Se refuerza especialmente la exigencia de supervisión humana en decisiones que afecten a derechos individuales.",
    legalRelevance: "Aunque estas directrices no son vinculantes, configuran un estándar de soft law que puede influir en la interpretación del deber de diligencia profesional de jueces, fiscales y abogados. Además, anticipan criterios que podrían incorporarse a futuras reformas procesales en Estados miembros del Consejo de Europa.",
    editorialNote: "Las guías de la CEPEJ representan el consenso europeo más avanzado sobre ética judicial e IA. Su conocimiento resulta imprescindible para cualquier profesional que trabaje con herramientas de justicia predictiva o análisis jurisprudencial automatizado.",
  },
  {
    title: "Convocatoria europea para proyectos de IA responsable en el ámbito jurídico",
    date: "Enero 2025",
    source: "CORDIS / Comisión Europea",
    sourceUrl: "https://cordis.europa.eu/",
    tags: ["Investigación", "Horizonte Europa", "Financiación UE", "Gobernanza algorítmica"],
    context: "El programa Horizonte Europa mantiene abiertas líneas de financiación para proyectos de investigación sobre inteligencia artificial ética y responsable, con especial atención a aplicaciones en sectores de alto impacto como la justicia y la administración pública.",
    keyContent: "Entre los proyectos actualmente financiados figuran iniciativas sobre explicabilidad de algoritmos de decisión judicial, detección de sesgos en modelos de lenguaje aplicados al Derecho, y desarrollo de marcos de gobernanza algorítmica para instituciones públicas. Los resultados de estos proyectos alimentan directamente el debate regulatorio y ofrecen metodologías transferibles al sector privado.",
    legalRelevance: "El seguimiento de proyectos CORDIS permite a profesionales jurídicos anticipar tendencias regulatorias, acceder a herramientas de evaluación de impacto y conocer buenas prácticas validadas por la investigación académica. Los consorcios suelen publicar guías y recursos de acceso abierto.",
    editorialNote: "La financiación pública europea de proyectos de IA ética representa una alternativa al modelo de desarrollo dominado exclusivamente por intereses comerciales. Los resultados de estos proyectos merecen atención prioritaria frente a white papers corporativos.",
  },
];

const Noticias = () => {
  return (
    <Layout>
      <SEOHead 
        title="Noticias y novedades sobre IA y Derecho | Derecho Artificial"
        description="Seguimiento editorial de desarrollos regulatorios, institucionales y tecnológicos relevantes para el ámbito jurídico. Noticias seleccionadas sobre inteligencia artificial y Derecho."
        canonical="https://derechoartificial.com/noticias"
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">
              Actualidad jurídica
            </p>
            <Link 
              to="/en/news" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              English version →
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Noticias y novedades sobre inteligencia artificial y Derecho
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Seguimiento editorial de los desarrollos regulatorios, institucionales y tecnológicos 
            relevantes para el ámbito jurídico.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
            <p>
              Esta sección ofrece una selección editorial de noticias sobre inteligencia artificial 
              y Derecho. No se trata de un agregador automatizado ni de un servicio de noticias en 
              tiempo real, sino de una curación consciente de aquellos desarrollos que merecen 
              atención desde una perspectiva jurídica crítica.
            </p>
            
            <p>
              Cada publicación incluye contexto editorial que permite comprender la relevancia 
              jurídica del acontecimiento, más allá de la mera reproducción de comunicados de prensa 
              o notas institucionales.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial notice */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h2 className="font-serif text-xl text-foreground mb-4">
              Nota editorial
            </h2>
            <p className="text-body leading-relaxed">
              Esta sección <strong>no es un servicio de noticias en tiempo real</strong> ni un 
              sistema de publicación automatizada. Aunque herramientas de IA pueden asistir en 
              la detección de fuentes relevantes, la selección final y la publicación son siempre 
              humanas y editoriales.
            </p>
          </div>
        </div>
      </section>

      {/* News entries */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
            Últimas novedades
          </h2>
          
          <div>
            {noticias.map((noticia) => (
              <NewsCard key={noticia.title} {...noticia} />
            ))}
          </div>
        </div>
      </section>

      {/* Content types */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Contenido publicado
          </h2>
          
          <div className="prose-editorial mb-10">
            <p>
              Las noticias y novedades incluidas en esta sección responden a criterios 
              editoriales definidos, orientados a la relevancia jurídica y la utilidad 
              profesional.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Desarrollos regulatorios e institucionales
              </h3>
              <p className="text-body leading-relaxed">
                Normativas europeas e internacionales, resoluciones judiciales, directrices de 
                autoridades de protección de datos, posicionamientos de organismos públicos y 
                publicaciones académicas de referencia.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Desarrollos tecnológicos con impacto jurídico real
              </h3>
              <p className="text-body leading-relaxed">
                Avances tecnológicos que plantean cuestiones jurídicas concretas, casos de uso 
                documentados y análisis de herramientas cuyo despliegue afecta a derechos 
                fundamentales o responsabilidades profesionales.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Informes, directrices y documentación relevante
              </h3>
              <p className="text-body leading-relaxed">
                Publicaciones de organismos internacionales, universidades, colegios profesionales 
                y centros de investigación que aportan perspectiva fundamentada sobre la 
                intersección entre IA y Derecho.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusions */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Contenido excluido
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Contenido promocional
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Notas de prensa corporativas, lanzamientos de productos o comunicaciones 
                con finalidad comercial.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Comunicados sin relevancia jurídica
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Informaciones institucionales o empresariales que no aportan contenido 
                sustantivo para el análisis legal.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Noticias especulativas
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Contenido basado en rumores, predicciones no fundamentadas o tendencias 
                impulsadas por ciclos de hype tecnológico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial positioning */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Posicionamiento editorial
          </h2>
          
          <div className="prose-editorial">
            <p>
              Esta sección adopta una posición deliberadamente crítica y no promocional. Su 
              objetivo no es competir con agencias de noticias ni agregar contenido sin filtro, 
              sino ofrecer un espacio de seguimiento informado donde los profesionales del Derecho 
              puedan encontrar información verificada y contextualizada.
            </p>
            
            <p>
              Derecho Artificial no mantiene acuerdos comerciales con empresas tecnológicas, 
              no incluye enlaces de afiliado y no participa en ciclos de difusión de contenido 
              promocional. La selección de noticias responde exclusivamente a criterios de 
              relevancia jurídica y utilidad profesional.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Noticias;
