import { useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Scale, FileText, Cpu, Newspaper, ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-abstract-bg.jpg";

// Hook for fade-in on scroll - OPTIMIZADO
const useFadeInOnScroll = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Deja de observar una vez visible
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
      <SEOHead title="Derecho Artificial - Análisis Jurídico de la Inteligencia Artificial" />

      {/* Skip to main content para accesibilidad */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
        Saltar al contenido principal
      </a>

      <div ref={containerRef} id="main-content">

        {/* Hero Section - ECIJA style: dark, corporate-tech */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden hero-dark" aria-label="Sección principal">

          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroBackground})` }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 hero-dark-overlay" aria-hidden="true" />

          <div className="relative z-10 container-editorial text-center py-32 md:py-40">

            <div className="max-w-5xl mx-auto">

              <span className="inline-block text-secondary font-medium tracking-widest uppercase text-sm mb-8 fade-in-section">
                Proyecto editorial independiente
              </span>

              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-[0.95] tracking-[-0.03em] fade-in-section">
                Derecho
                <br />
                Artificial
              </h1>

              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed fade-in-section">
                La reflexión jurídica sobre IA del futuro, hoy
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center fade-in-section">
                <Link to="/analisis" className="btn-cta-primary inline-flex items-center justify-center gap-3 text-lg px-10 py-5 rounded-lg">
                  Explorar análisis
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/manifiesto" className="btn-cta-secondary inline-flex items-center justify-center gap-3 text-lg px-10 py-5 rounded-lg">
                  Nuestro manifiesto
                </Link>
              </div>

            </div>

          </div>

          {/* Gradient fade to content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />

        </section>


        {/* Manifesto/Vision Section - Post-hero highlight with max whitespace */}
        <section className="py-28 md:py-36 bg-muted/30 fade-in-section" aria-labelledby="vision-heading">

          <div className="container-editorial">

            <div className="grid md:grid-cols-12 gap-16 md:gap-20 items-start">

              <div className="md:col-span-5 lg:col-span-4">

                <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-4 block">
                  Nuestra visión
                </span>

                <h2 id="vision-heading" className="text-3xl md:text-4xl font-serif font-semibold text-foreground leading-tight">
                  Rigor jurídico en la era de la inteligencia artificial
                </h2>

              </div>

              <div className="md:col-span-7 lg:col-span-8 space-y-6">

                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Derecho Artificial es un espacio de reflexión independiente donde el análisis 
                  normativo prevalece sobre el ruido mediático. Sin afiliaciones comerciales, 
                  sin rankings patrocinados, sin promociones encubiertas.
                </p>
                <Link to="/manifiesto" className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors group">
                  Leer el manifiesto completo
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>

          </div>

        </section>


        {/* Editorial Introduction */}
        <section className="py-24 md:py-32 border-b border-border/40 fade-in-section">

          <div className="container-editorial">

            <div className="max-w-4xl mx-auto">

              <div className="prose-editorial space-y-8">

                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light">
                  Derecho Artificial es un proyecto editorial jurídico independiente, centrado 
                  en el análisis normativo y regulatorio de la inteligencia artificial en Europa. 
                  No es un medio de noticias tecnológicas, un blog de opinión ni un escaparate 
                  comercial de herramientas. Es un espacio de reflexión rigurosa donde profesionales 
                  del Derecho y ciudadanos informados pueden encontrar análisis fundamentados 
                  sobre las implicaciones jurídicas, éticas y regulatorias de la IA.
                </p>

                <p className="text-muted-foreground leading-relaxed">
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
        <section className="py-24 md:py-32 bg-muted/20 fade-in-section" aria-labelledby="featured-analysis-heading">

          <div className="container-editorial">

            <div className="max-w-4xl mx-auto">

              <div className="card-elevated p-10 md:p-14 rounded-2xl">
                <span className="text-secondary font-medium tracking-widest uppercase text-sm mb-6 block">
                <FileText className="inline w-4 h-4 mr-2 -mt-0.5" />
                Análisis destacado
              </span>

              <article>
                <h3 id="featured-analysis-heading" className="text-2xl md:text-3xl font-serif font-semibold text-foreground mb-6 leading-tight">
                  Reglamento Europeo de Inteligencia Artificial (AI Act): análisis jurídico
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  El AI Act establece el primer marco regulatorio integral para la inteligencia 
                  artificial en la Unión Europea. Este análisis examina su arquitectura normativa 
                  basada en el riesgo, las obligaciones para sistemas de alto riesgo y sus 
                  implicaciones para la práctica jurídica y las administraciones públicas.
                </p>

                <Link to="/analisis/ai-act-reglamento-europeo" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors group">
                  Acceder al análisis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </article>
            </div>

            </div>

          </div>

        </section>


        {/* Ámbitos de Análisis */}
        <section className="py-24 md:py-32 fade-in-section" aria-labelledby="areas-heading">

          <div className="container-editorial">

            <header className="max-w-3xl mb-16 md:mb-20">

              <h2 id="areas-heading" className="text-3xl md:text-4xl font-serif font-semibold text-foreground mb-6">
                Ámbitos de análisis
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Áreas de convergencia entre el Derecho y la inteligencia artificial.
              </p>

            </header>
            
            {/* Asymmetric Grid Layout */}
            <div className="grid md:grid-cols-2 gap-8">

              <Link to="/analisis" className="card-elevated group block p-8 md:p-10 rounded-xl md:row-span-2">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Scale className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground mb-4 group-hover:text-primary transition-colors">
                  Análisis jurídico
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Estudios en profundidad sobre las implicaciones legales de la IA: responsabilidad, 
                  propiedad intelectual, protección de datos y regulación sectorial.
                </p>
              </Link>
              
              <Link to="/documentos" className="card-elevated group block p-8 md:p-10 rounded-xl">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors">
                  Documentos y marcos normativos
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Recopilación comentada de normativas, directrices y documentos de referencia 
                  sobre inteligencia artificial en el ámbito europeo e internacional.
                </p>
              </Link>
              
              <Link to="/software-ia-legal" className="card-elevated group block p-8 md:p-10 rounded-xl">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Cpu className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Software de IA legal
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Evaluación crítica de herramientas de inteligencia artificial para el sector 
                  jurídico desde una perspectiva de auditoría y cumplimiento normativo.
                </p>
              </Link>
              
              <Link to="/noticias" className="card-elevated group block p-8 md:p-10 rounded-xl md:col-span-2">
                <div className="mb-6">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Newspaper className="w-7 h-7 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors">
                  Noticias y novedades
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Seguimiento editorial de desarrollos regulatorios, institucionales y 
                  tecnológicos con relevancia jurídica en el ámbito de la IA.
                </p>
              </Link>
            </div>

          </div>

        </section>


        {/* Editorial Closing */}
        <section className="py-24 md:py-32 bg-muted/30 border-t border-border/40 fade-in-section">

          <div className="container-editorial">

            <div className="max-w-4xl mx-auto text-center">

              <blockquote className="mb-12">
                <p className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed italic">
                  "El rigor sobre la rapidez, la responsabilidad sobre la promoción, 
                  la reflexión sobre el ruido."
                </p>
              </blockquote>

            </div>

            <div className="max-w-3xl mx-auto">

              <div className="prose-editorial text-center space-y-6">

                <p className="text-muted-foreground leading-relaxed">
                  En un entorno donde la inmediatez prevalece sobre la precisión y el entusiasmo 
                  tecnológico sustituye al análisis crítico, Derecho Artificial apuesta por un 
                  enfoque sereno y fundamentado ante las transformaciones del sector jurídico.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Este proyecto no acepta patrocinios ni acuerdos comerciales que comprometan 
                  su independencia editorial.
                </p>

              </div>

            </div>

            <div className="text-center mt-12">
              <Link to="/manifiesto" className="btn-cta-secondary inline-flex items-center gap-2 px-8 py-4 rounded-lg">
                Manifiesto editorial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </section>

      </div>

      
      {/* Estilos globales para reduced-motion y fallback */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .transition-all, .transition-transform, .transition-colors {
            transition: none !important;
          }
          .fade-in-section {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </Layout>
  );
};

export default Index;
