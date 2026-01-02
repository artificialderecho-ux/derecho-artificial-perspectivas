import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <Layout>
      <SEOHead 
        title="Derecho Artificial | Análisis jurídico y ético de la inteligencia artificial"
        description="Proyecto editorial independiente dedicado al análisis crítico del Derecho, la ética y la práctica jurídica en la era de la inteligencia artificial."
        canonical="https://derechoartificial.com"
      />

      {/* Hero Section */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial text-center">
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8">
            Derecho Artificial
          </h1>
          <p className="text-xl md:text-2xl text-body leading-relaxed max-w-2xl mx-auto font-serif italic">
            Análisis jurídico y ético independiente sobre la inteligencia artificial en el ámbito legal.
          </p>
        </div>
      </section>

      {/* Editorial Introduction */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <div className="prose-editorial">
            <p className="text-lg md:text-xl leading-[1.9] first-letter:text-5xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-foreground">
              Derecho Artificial es un proyecto editorial independiente dedicado al análisis 
              crítico de la inteligencia artificial en el ámbito jurídico. Su propósito 
              es ofrecer un espacio de reflexión rigurosa, alejado del entusiasmo tecnológico 
              y de los discursos promocionales, donde profesionales del Derecho y ciudadanos 
              informados puedan encontrar análisis fundamentados sobre las transformaciones 
              que la IA introduce en la regulación, la ética y la práctica legal.
            </p>
            <p className="text-lg md:text-xl leading-[1.9]">
              Este proyecto no pretende celebrar ni demonizar la tecnología. Pretende 
              comprenderla, contextualizarla jurídicamente y someterla al escrutinio crítico 
              que exige su creciente influencia en decisiones que afectan a derechos 
              y libertades fundamentales. La independencia editorial es el fundamento 
              de toda la actividad de análisis.
            </p>
          </div>
        </div>
      </section>

      {/* Análisis Destacado */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <p className="text-sm uppercase tracking-widest text-caption mb-8">
            Análisis destacado
          </p>
          <Link to="/analisis/ai-act-reglamento-europeo" className="block group">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight group-hover:text-muted-foreground transition-colors duration-300 mb-6">
              Reglamento Europeo de Inteligencia Artificial (AI Act): análisis jurídico
            </h2>
            <p className="text-body text-lg leading-relaxed mb-6 max-w-3xl">
              El AI Act establece el primer marco regulatorio integral para la inteligencia 
              artificial en la Unión Europea. Este análisis examina su arquitectura normativa 
              basada en el riesgo, las obligaciones para sistemas de alto riesgo y sus 
              implicaciones para la práctica jurídica y las administraciones públicas.
            </p>
            <span className="inline-flex items-center text-sm text-caption group-hover:text-foreground transition-colors duration-300">
              Acceder al análisis
              <span className="ml-2">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Ámbitos de Análisis */}
      <section className="section-spacing border-b border-divider">
        <div className="container-wide">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Ámbitos de análisis
            </h2>
            <p className="text-body text-lg max-w-xl mx-auto">
              Áreas de convergencia entre el Derecho y la inteligencia artificial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-divider">
            <Link 
              to="/analisis" 
              className="bg-background p-10 md:p-14 group hover:bg-highlight transition-colors duration-300"
            >
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                Análisis jurídico
              </h3>
              <p className="text-body leading-relaxed">
                Estudios en profundidad sobre las implicaciones legales de la IA: responsabilidad, 
                propiedad intelectual, protección de datos y regulación sectorial.
              </p>
            </Link>
            
            <Link 
              to="/documentos" 
              className="bg-background p-10 md:p-14 group hover:bg-highlight transition-colors duration-300"
            >
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                Documentos y marcos normativos
              </h3>
              <p className="text-body leading-relaxed">
                Recopilación comentada de normativas, directrices y documentos de referencia 
                sobre inteligencia artificial en el ámbito europeo e internacional.
              </p>
            </Link>
            
            <Link 
              to="/software-ia-legal" 
              className="bg-background p-10 md:p-14 group hover:bg-highlight transition-colors duration-300"
            >
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                Software de IA legal
              </h3>
              <p className="text-body leading-relaxed">
                Evaluación crítica de herramientas de inteligencia artificial para el sector 
                jurídico desde una perspectiva de auditoría y cumplimiento normativo.
              </p>
            </Link>
            
            <Link 
              to="/noticias" 
              className="bg-background p-10 md:p-14 group hover:bg-highlight transition-colors duration-300"
            >
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                Noticias y novedades
              </h3>
              <p className="text-body leading-relaxed">
                Seguimiento editorial de desarrollos regulatorios, institucionales y 
                tecnológicos con relevancia jurídica en el ámbito de la IA.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Closing */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <div className="mb-12">
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-[1.4] italic">
              "El rigor sobre la rapidez, la responsabilidad sobre la promoción, 
              la reflexión sobre el ruido."
            </p>
          </div>
          <div className="prose-editorial text-center mx-auto">
            <p>
              En un entorno donde la inmediatez prevalece sobre la precisión y el entusiasmo 
              tecnológico sustituye al análisis crítico, Derecho Artificial apuesta por un 
              enfoque sereno y fundamentado ante las transformaciones del sector jurídico.
            </p>
            <p className="text-caption text-sm mt-8">
              Este proyecto no acepta patrocinios ni acuerdos comerciales que comprometan 
              su independencia editorial.
            </p>
          </div>
          <div className="mt-14">
            <Link 
              to="/manifiesto" 
              className="inline-flex items-center text-sm font-medium tracking-wide text-caption hover:text-foreground transition-colors duration-300 uppercase"
            >
              Manifiesto editorial
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
