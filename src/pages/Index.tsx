import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Scale, FileText, Cpu, Newspaper } from "lucide-react";
import heroBackground from "@/assets/hero-abstract-bg.jpg";

const Index = () => {
  return (
    <Layout>
      <SEOHead 
        title="Derecho Artificial | Análisis jurídico y ético de la inteligencia artificial"
        description="Proyecto editorial independiente dedicado al análisis crítico del Derecho, la ética y la práctica jurídica en la era de la inteligencia artificial."
        canonical="https://derechoartificial.com"
      />

      {/* Hero Section with Background */}
      <section 
        className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        <div className="container-editorial text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8">
              Derecho Artificial
            </h1>
            <p className="text-xl md:text-2xl text-body leading-relaxed max-w-2xl mx-auto font-serif italic">
              Análisis jurídico y ético independiente sobre la inteligencia artificial en el ámbito legal.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Introduction */}
      <section className="section-spacing-sm border-b border-divider">
        <div className="container-editorial">
          <div className="card-elevated p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="prose-editorial">
              <p className="text-lg md:text-xl leading-[1.9] first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-primary">
                Derecho Artificial es un proyecto editorial jurídico independiente, centrado 
                en el análisis normativo y regulatorio de la inteligencia artificial en Europa. 
                No es un medio de noticias tecnológicas, un blog de opinión ni un escaparate 
                comercial de herramientas. Es un espacio de reflexión rigurosa donde profesionales 
                del Derecho y ciudadanos informados pueden encontrar análisis fundamentados 
                sobre las implicaciones jurídicas, éticas y regulatorias de la IA.
              </p>
              <p className="text-lg md:text-xl leading-[1.9]">
                El proyecto se enmarca en el ordenamiento jurídico europeo, con especial 
                atención al Reglamento de Inteligencia Artificial (AI Act), el RGPD y el 
                ecosistema normativo de la Unión Europea. La independencia editorial y la 
                ausencia de vínculos comerciales son el fundamento de toda la actividad 
                de análisis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Análisis Destacado */}
      <section className="section-spacing border-b border-divider section-muted">
        <div className="container-editorial">
          <p className="text-sm uppercase tracking-widest text-caption mb-8 flex items-center gap-2">
            <Scale className="h-4 w-4 text-primary" strokeWidth={1.5} />
            Análisis destacado
          </p>
          <Link 
            to="/analisis/ai-act-reglamento-europeo" 
            className="block group card-elevated p-8 md:p-10"
          >
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight group-hover:text-primary transition-colors duration-300 mb-6">
              Reglamento Europeo de Inteligencia Artificial (AI Act): análisis jurídico
            </h2>
            <p className="text-body text-lg leading-relaxed mb-6 max-w-3xl">
              El AI Act establece el primer marco regulatorio integral para la inteligencia 
              artificial en la Unión Europea. Este análisis examina su arquitectura normativa 
              basada en el riesgo, las obligaciones para sistemas de alto riesgo y sus 
              implicaciones para la práctica jurídica y las administraciones públicas.
            </p>
            <span className="inline-flex items-center text-sm text-primary font-medium group-hover:text-primary/80 transition-colors duration-300">
              Acceder al análisis
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
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
          
          {/* Asymmetric Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link 
              to="/analisis" 
              className="card-elevated p-8 md:p-10 group md:row-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Scale className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
              </div>
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
              className="card-elevated p-8 md:p-10 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <FileText className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                </div>
              </div>
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
              className="card-elevated p-8 md:p-10 group"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Cpu className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
              </div>
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
              className="card-elevated p-8 md:p-10 group md:col-span-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-secondary/10">
                  <Newspaper className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                Noticias y novedades
              </h3>
              <p className="text-body leading-relaxed max-w-2xl">
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
          <div className="card-elevated p-8 md:p-12 text-left">
            <div className="prose-editorial mx-auto">
              <p>
                En un entorno donde la inmediatez prevalece sobre la precisión y el entusiasmo 
                tecnológico sustituye al análisis crítico, Derecho Artificial apuesta por un 
                enfoque sereno y fundamentado ante las transformaciones del sector jurídico.
              </p>
              <p className="text-caption text-sm mt-8 border-t border-divider pt-6">
                Este proyecto no acepta patrocinios ni acuerdos comerciales que comprometan 
                su independencia editorial.
              </p>
            </div>
          </div>
          <div className="mt-14">
            <Link 
              to="/manifiesto" 
              className="inline-flex items-center text-sm font-medium tracking-wide text-primary hover:text-primary/80 transition-colors duration-300 uppercase"
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
