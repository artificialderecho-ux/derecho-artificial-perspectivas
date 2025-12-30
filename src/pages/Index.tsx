import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            Derecho Artificial
          </h1>
          <p className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl font-serif italic">
            Derecho, ética y práctica jurídica en la era de la inteligencia artificial.
          </p>
        </div>
      </section>

      {/* Editorial Introduction */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <div className="prose-editorial">
            <p>
              Derecho Artificial es un proyecto editorial independiente dedicado al análisis 
              crítico de la inteligencia artificial en el ámbito jurídico. Nuestro propósito 
              es ofrecer un espacio de reflexión rigurosa, alejado de modas tecnológicas y 
              discursos promocionales, donde profesionales del Derecho y ciudadanos informados 
              puedan encontrar análisis fundamentados, documentación relevante y perspectivas 
              éticas sobre las transformaciones que la IA introduce en la práctica legal.
            </p>
            <p>
              No buscamos celebrar ni demonizar la tecnología. Buscamos comprenderla, 
              contextualizarla y someterla al escrutinio que exige su creciente influencia 
              en decisiones que afectan derechos y libertades fundamentales.
            </p>
          </div>
        </div>
      </section>

      {/* Ámbitos de Análisis */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Ámbitos de análisis
          </h2>
          
          <ul className="space-y-6">
            <li className="border-l-2 border-divider pl-6">
              <Link to="/analisis" className="block group">
                <h3 className="font-serif text-lg text-foreground group-hover:text-muted-foreground transition-colors">
                  Análisis jurídico
                </h3>
                <p className="text-body mt-1">
                  Estudios en profundidad sobre las implicaciones legales de la IA en distintas ramas del Derecho.
                </p>
              </Link>
            </li>
            <li className="border-l-2 border-divider pl-6">
              <Link to="/documentos" className="block group">
                <h3 className="font-serif text-lg text-foreground group-hover:text-muted-foreground transition-colors">
                  Documentos y marcos normativos
                </h3>
                <p className="text-body mt-1">
                  Recopilación comentada de normativas, directrices y documentos de referencia.
                </p>
              </Link>
            </li>
            <li className="border-l-2 border-divider pl-6">
              <Link to="/software-ia-legal" className="block group">
                <h3 className="font-serif text-lg text-foreground group-hover:text-muted-foreground transition-colors">
                  Software de IA legal
                </h3>
                <p className="text-body mt-1">
                  Evaluación crítica de herramientas de inteligencia artificial para el sector jurídico.
                </p>
              </Link>
            </li>
            <li className="border-l-2 border-divider pl-6">
              <Link to="/noticias" className="block group">
                <h3 className="font-serif text-lg text-foreground group-hover:text-muted-foreground transition-colors">
                  Noticias contextualizadas
                </h3>
                <p className="text-body mt-1">
                  Actualidad sobre IA y Derecho con análisis y perspectiva editorial.
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Editorial Closing */}
      <section className="section-spacing">
        <div className="container-editorial">
          <div className="prose-editorial">
            <p>
              En un entorno donde la inmediatez prevalece sobre la precisión y el entusiasmo 
              tecnológico sustituye al análisis crítico, Derecho Artificial apuesta por el 
              rigor sobre la rapidez, la responsabilidad sobre la promoción, y la reflexión 
              sobre el ruido.
            </p>
            <p className="text-caption">
              Este proyecto no acepta patrocinios ni acuerdos comerciales que comprometan 
              su independencia editorial.
            </p>
          </div>
          <div className="mt-10">
            <Link 
              to="/manifiesto" 
              className="inline-flex items-center text-sm text-caption hover:text-foreground transition-colors"
            >
              Leer nuestro manifiesto editorial →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
