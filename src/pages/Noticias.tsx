import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { NewsCard } from "@/components/ui/NewsCard";
import { Link } from "react-router-dom";

const noticias = [
  {
    title: "El AI Act: claves del primer marco legal europeo sobre inteligencia artificial",
    summary: "El Reglamento (UE) 2024/1689, conocido como AI Act, establece el primer marco normativo integral sobre inteligencia artificial en la Unión Europea. Su arquitectura basada en niveles de riesgo —inaceptable, alto, limitado y mínimo— determina obligaciones diferenciadas para proveedores y operadores de sistemas de IA. Para los profesionales del Derecho, el Reglamento implica nuevas responsabilidades de cumplimiento, especialmente en el uso de sistemas de alto riesgo como los destinados a la administración de justicia o la interpretación jurídica. El texto entró en vigor el 1 de agosto de 2024, con aplicación gradual hasta 2027.",
    date: "Diciembre 2024",
    source: "EUR-Lex",
    sourceUrl: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689",
    tags: ["AI Act", "Regulación UE", "Alto riesgo", "Cumplimiento normativo"],
  },
  {
    title: "Guías oficiales sobre el uso responsable de la IA en el ámbito jurídico",
    summary: "Diversas instituciones europeas y nacionales han publicado directrices sobre el uso de sistemas de inteligencia artificial en la práctica jurídica. La Carta Ética del CEPEJ (Consejo de Europa) establece cinco principios fundamentales: respeto a los derechos fundamentales, no discriminación, calidad y seguridad, transparencia y control por el usuario. Estas guías, aunque no vinculantes, configuran un marco de soft law que orienta la interpretación del deber de diligencia profesional y anticipa futuras exigencias regulatorias. Su conocimiento resulta imprescindible para abogados, jueces y operadores jurídicos que incorporan herramientas de IA en su actividad.",
    date: "Diciembre 2024",
    source: "CEPEJ / Consejo de Europa",
    sourceUrl: "https://www.coe.int/en/web/cepej/cepej-european-ethical-charter-on-the-use-of-artificial-intelligence-ai-in-judicial-systems-and-their-environment",
    tags: ["Ética", "Soft law", "Práctica jurídica", "CEPEJ"],
  },
  {
    title: "La Unión Europea financia proyectos de IA con impacto legal y ético",
    summary: "El programa Horizonte Europa y otros instrumentos de financiación de la UE impulsan proyectos de investigación que abordan las dimensiones jurídicas y éticas de la inteligencia artificial. A través de CORDIS (Servicio de Información Comunitario sobre Investigación y Desarrollo), es posible acceder a iniciativas que estudian gobernanza algorítmica, sistemas de IA explicable, evaluación de impacto en derechos fundamentales y herramientas de cumplimiento normativo. Estos proyectos generan conocimiento científico y metodologías que alimentan el debate regulatorio y ofrecen recursos para profesionales interesados en la intersección entre tecnología y Derecho.",
    date: "Diciembre 2024",
    source: "CORDIS",
    sourceUrl: "https://cordis.europa.eu/",
    tags: ["Investigación", "Horizonte Europa", "Financiación UE", "Gobernanza"],
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
