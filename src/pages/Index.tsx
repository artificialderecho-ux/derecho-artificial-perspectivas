import { useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Scale, FileText, Cpu, Newspaper, ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-abstract-bg.jpg";

// Hook for fade-in on scroll
const useFadeInOnScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = ref.current?.querySelectorAll('.fade-in-section');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
};

const Index = () => {
  const containerRef = useFadeInOnScroll();

  return (
    <Layout>
      <SEOHead 
        title="Derecho Artificial | Análisis jurídico y ético de la inteligencia artificial"
        description="Proyecto editorial independiente dedicado al análisis crítico del Derecho, la ética y la práctica jurídica en la era de la inteligencia artificial."
        canonical="https://derechoartificial.com"
      />

      <div ref={containerRef}>
        {/* Hero Section - ECIJA style: dark, corporate-tech */}
        <section 
          className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 hero-dark-overlay" />
          <div className="container-wide text-center relative z-10 py-20">
            <div className="fade-in-section visible max-w-4xl mx-auto">
              <p className="text-sm md:text-base uppercase tracking-[0.3em] text-white/60 mb-6 font-sans">
                Proyecto editorial independiente
              </p>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[0.95] mb-8 tracking-tight">
                Derecho<br />
                <span className="text-white/90">Artificial</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-white/80 leading-relaxed max-w-2xl mx-auto font-serif italic mb-12">
                La reflexión jurídica sobre IA del futuro, hoy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/analisis" 
                  className="btn-cta-primary"
                >
                  Explorar análisis
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
                <Link 
                  to="/manifiesto" 
                  className="btn-cta-secondary"
                >
                  Nuestro manifiesto
                </Link>
              </div>
            </div>
          </div>
          {/* Gradient fade to content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>

        {/* Manifesto/Vision Section - Post-hero highlight */}
        <section className="section-spacing-sm border-b border-divider">
          <div className="container-wide">
            <div className="fade-in-section grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-secondary font-semibold mb-4">
                  Nuestra visión
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-6">
                  Rigor jurídico en la era de la inteligencia artificial
                </h2>
              </div>
              <div className="prose-editorial">
                <p className="text-lg leading-[1.9]">
                  Derecho Artificial es un espacio de reflexión independiente donde el análisis 
                  normativo prevalece sobre el ruido mediático. Sin afiliaciones comerciales, 
                  sin rankings patrocinados, sin promociones encubiertas.
                </p>
                <Link 
                  to="/manifiesto" 
                  className="inline-flex items-center text-secondary font-medium mt-6 group"
                >
                  Leer el manifiesto completo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Introduction */}
        <section className="section-spacing-sm border-b border-divider section-muted">
          <div className="container-editorial">
            <div className="fade-in-section card-elevated p-8 md:p-12">
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
        <section className="section-spacing border-b border-divider">
          <div className="container-editorial">
            <div className="fade-in-section">
              <p className="text-sm uppercase tracking-[0.2em] text-secondary font-semibold mb-8 flex items-center gap-3">
                <Scale className="h-5 w-5" strokeWidth={1.5} />
                Análisis destacado
              </p>
              <Link 
                to="/analisis/ai-act-reglamento-europeo" 
                className="block group card-elevated p-8 md:p-12"
              >
                <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight group-hover:text-primary transition-all duration-300 mb-6">
                  Reglamento Europeo de Inteligencia Artificial (AI Act): análisis jurídico
                </h2>
                <p className="text-body text-lg leading-relaxed mb-8 max-w-3xl">
                  El AI Act establece el primer marco regulatorio integral para la inteligencia 
                  artificial en la Unión Europea. Este análisis examina su arquitectura normativa 
                  basada en el riesgo, las obligaciones para sistemas de alto riesgo y sus 
                  implicaciones para la práctica jurídica y las administraciones públicas.
                </p>
                <span className="inline-flex items-center text-sm text-secondary font-semibold group-hover:text-secondary/80 transition-all duration-300 uppercase tracking-wide">
                  Acceder al análisis
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Ámbitos de Análisis */}
        <section className="section-spacing border-b border-divider section-muted">
          <div className="container-wide">
            <div className="fade-in-section text-center mb-16 md:mb-20">
              <p className="text-sm uppercase tracking-[0.2em] text-secondary font-semibold mb-4">
                Áreas de especialización
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
                Ámbitos de análisis
              </h2>
              <p className="text-body text-lg max-w-xl mx-auto">
                Áreas de convergencia entre el Derecho y la inteligencia artificial.
              </p>
            </div>
            
            {/* Asymmetric Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <Link 
                to="/analisis" 
                className="fade-in-section delay-100 card-elevated p-8 md:p-10 lg:p-12 group md:row-span-2"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-4 rounded bg-primary/10 transition-all duration-300 group-hover:bg-secondary/20">
                    <Scale className="h-7 w-7 text-primary group-hover:text-secondary transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-5 group-hover:text-primary transition-all duration-300">
                  Análisis jurídico
                </h3>
                <p className="text-body leading-relaxed text-lg">
                  Estudios en profundidad sobre las implicaciones legales de la IA: responsabilidad, 
                  propiedad intelectual, protección de datos y regulación sectorial.
                </p>
              </Link>
              
              <Link 
                to="/documentos" 
                className="fade-in-section delay-200 card-elevated p-8 md:p-10 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded bg-secondary/10 transition-all duration-300 group-hover:bg-secondary/20">
                    <FileText className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-all duration-300">
                  Documentos y marcos normativos
                </h3>
                <p className="text-body leading-relaxed">
                  Recopilación comentada de normativas, directrices y documentos de referencia 
                  sobre inteligencia artificial en el ámbito europeo e internacional.
                </p>
              </Link>
              
              <Link 
                to="/software-ia-legal" 
                className="fade-in-section delay-300 card-elevated p-8 md:p-10 group"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded bg-primary/10 transition-all duration-300 group-hover:bg-secondary/20">
                    <Cpu className="h-6 w-6 text-primary group-hover:text-secondary transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-all duration-300">
                  Software de IA legal
                </h3>
                <p className="text-body leading-relaxed">
                  Evaluación crítica de herramientas de inteligencia artificial para el sector 
                  jurídico desde una perspectiva de auditoría y cumplimiento normativo.
                </p>
              </Link>
              
              <Link 
                to="/noticias" 
                className="fade-in-section delay-400 card-elevated p-8 md:p-10 lg:p-12 group md:col-span-2"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-4 rounded bg-secondary/10 transition-all duration-300 group-hover:bg-secondary/20">
                    <Newspaper className="h-6 w-6 text-secondary" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-all duration-300">
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
            <div className="fade-in-section mb-12">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-[1.3] italic">
                "El rigor sobre la rapidez, la responsabilidad sobre la promoción, 
                la reflexión sobre el ruido."
              </p>
            </div>
            <div className="fade-in-section delay-200 card-elevated p-8 md:p-12 text-left">
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
            <div className="fade-in-section delay-300 mt-14">
              <Link 
                to="/manifiesto" 
                className="inline-flex items-center text-sm font-semibold tracking-wide text-secondary hover:text-secondary/80 transition-all duration-300 uppercase group"
              >
                Manifiesto editorial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
