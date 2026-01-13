import { useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";
import { Scale, FileText, Cpu, Newspaper, ArrowRight } from "lucide-react";
import heroBackground from "@/assets/hero-abstract-bg.jpg";

// Hook for fade-in on scroll - OPTIMIZADO
const useFadeInOnScroll = () => {
  const ref = useRef<HTMLElement>(null);

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
      <SEOHead />

      {/* Skip to main content para accesibilidad */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded">
        Saltar al contenido principal
      </a>

      <main id="main-content" ref={containerRef} className="min-h-screen">

        {/* Hero Section - ECIJA style: dark, corporate-tech */}
        <section className="hero-section relative min-h-[90vh] flex items-center justify-center overflow-hidden" aria-label="Introducción a Derecho Artificial">

          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${heroBackground})` }} aria-hidden="true" />

          <div className="hero-dark-overlay absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-black/85" aria-hidden="true" /> {/* Baja a 80 para ver más fondo */}

          <div className="relative z-10 container mx-auto px-6 md:px-8 lg:px-12 text-center">

            <div className="max-w-5xl mx-auto space-y-8">

              <span className="inline-block text-white/70 text-sm tracking-[0.25em] uppercase font-medium">
                Proyecto editorial independiente
              </span>

              <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white leading-[0.9] tracking-[-0.03em]">
                Derecho
                <br />
                Artificial
              </h1>

              <p className="text-xl md:text-2xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed">
                La reflexión jurídica sobre IA del futuro, hoy
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link to="/analisis" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-sm hover:bg-white/90 transition-all duration-300 group">
                  Explorar análisis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/manifiesto" className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-medium px-8 py-4 rounded-sm hover:bg-white/10 hover:border-white transition-all duration-300">
                  Nuestro manifiesto
                </Link>
              </div>

            </div>

          </div>

          {/* Gradient fade to content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />

        </section>


        {/* Manifesto/Vision Section - Post-hero highlight with max whitespace */}
        <section className="fade-in-section py-28 md:py-36 lg:py-44 bg-muted/30" aria-labelledby="vision-heading">

          <div className="container mx-auto px-6 md:px-8 lg:px-12">

            <div className="grid md:grid-cols-12 gap-16 md:gap-20 items-start">

              <div className="md:col-span-5">

                <span className="text-secondary text-sm tracking-[0.2em] uppercase font-medium block mb-4">
                  Nuestra visión
                </span>

                <h2 id="vision-heading" className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight">
                  Rigor jurídico en la era de la inteligencia artificial
                </h2>

              </div>

              <div className="md:col-span-7 space-y-6">

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
        <section className="fade-in-section py-20 md:py-28 border-t border-border/50">

          <div className="container mx-auto px-6 md:px-8 lg:px-12">

            <div className="max-w-4xl mx-auto">

              <div className="prose prose-lg md:prose-xl prose-neutral max-w-none">

                <p className="text-muted-foreground leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                  Derecho Artificial es un proyecto editorial jurídico independiente, centrado 
                  en el análisis normativo y regulatorio de la inteligencia artificial en Europa. 
                  No es un medio de noticias tecnológicas, un blog de opinión ni un escaparate 
                  comercial de herramientas. Es un espacio de reflexión rigurosa donde profesionales 
                  del Derecho y ciudadanos informados pueden encontrar análisis fundamentados 
                  sobre las implicaciones jurídicas, éticas y regulatorias de la IA.
                </p>

                <p className="text-muted-foreground leading-relaxed mt-6">
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
        <section className="fade-in-section py-20 md:py-28 bg-primary/5" aria-labelledby="featured-analysis-heading">

          <div className="container mx-auto px-6 md:px-8 lg:px-12">

            <div className="text-center mb-12">
              <span className="text-secondary text-sm tracking-[0.2em] uppercase font-medium block mb-4">
                Análisis destacado
              </span>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Exploración profunda de temas clave en el derecho de la IA.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">

              <article className="card-elevated bg-card p-8 md:p-12 rounded-sm border border-border/50">

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-sm">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <h3 id="featured-analysis-heading" className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-4 leading-tight">
                  Reglamento Europeo de Inteligencia Artificial (AI Act): análisis jurídico
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  El AI Act establece el primer marco regulatorio integral para la inteligencia 
                  artificial en la Unión Europea. Este análisis examina su arquitectura normativa 
                  basada en el riesgo, las obligaciones para sistemas de alto riesgo y sus 
                  implicaciones para la práctica jurídica y las administraciones públicas.
                </p>

                <Link to="/analisis/ai-act-reglamento-europeo" className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-medium transition-colors group">
                  Acceder al análisis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

              </article>

            </div>

          </div>

        </section>


        {/* Ámbitos de Análisis */}
        <section className="fade-in-section py-20 md:py-28" aria-labelledby="domains-heading">

          <div className="container mx-auto px-6 md:px-8 lg:px-12">

            <div className="text-center mb-16">
              <h2 id="domains-heading" className="font-serif text-3xl md:text-4xl font-semibold text-foreground mb-4">
                Ámbitos de análisis
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Áreas de convergencia entre el Derecho y la inteligencia artificial.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">

              <Link to="/analisis" className="card-elevated group p-8 bg-card border border-border/50 rounded-sm block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-sm group-hover:bg-primary/20 transition-colors">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Análisis jurídico
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Estudios en profundidad sobre las implicaciones legales de la IA: responsabilidad, 
                  propiedad intelectual, protección de datos y regulación sectorial.
                </p>
              </Link>
              
              <Link to="/documentos" className="card-elevated group p-8 bg-card border border-border/50 rounded-sm block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-sm group-hover:bg-secondary/20 transition-colors">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors">
                  Documentos y marcos normativos
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Recopilación comentada de normativas, directrices y documentos de referencia 
                  sobre inteligencia artificial en el ámbito europeo e internacional.
                </p>
              </Link>
              
              <Link to="/software-ia-legal" className="card-elevated group p-8 bg-card border border-border/50 rounded-sm block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-sm group-hover:bg-primary/20 transition-colors">
                    <Cpu className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                  Software de IA legal
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Evaluación crítica de herramientas de inteligencia artificial para el sector 
                  jurídico desde una perspectiva de auditoría y cumplimiento normativo.
                </p>
              </Link>
              
              <Link to="/noticias" className="card-elevated group p-8 bg-card border border-border/50 rounded-sm block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-secondary/10 rounded-sm group-hover:bg-secondary/20 transition-colors">
                    <Newspaper className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3 group-hover:text-secondary transition-colors">
                  Noticias y novedades
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Seguimiento editorial de desarrollos regulatorios, institucionales y 
                  tecnológicos con relevancia jurídica en el ámbito de la IA.
                </p>
              </Link>
            </div>

          </div>

        </section>


        {/* Criterio Editorial - Bloque discreto */}
        <section className="fade-in-section py-16 md:py-20 border-t border-border/50">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-xl md:text-2xl text-foreground mb-6">
                Criterio editorial
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Derecho Artificial analiza la inteligencia artificial desde el derecho positivo 
                  europeo, la ética institucional y la regulación vigente.
                </p>
                <p>
                  El proyecto prioriza el análisis jurídico riguroso, las fuentes públicas y los 
                  textos normativos frente a discursos comerciales, especulativos o tecnológicos 
                  sin base jurídica.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Closing */}
        <section className="fade-in-section py-20 md:py-28 border-t border-border/50 bg-muted/20">

          <div className="container mx-auto px-6 md:px-8 lg:px-12">

            <div className="max-w-4xl mx-auto">

              <blockquote className="border-l-4 border-secondary pl-8 py-4 mb-12">
                <p className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed">
                  "El rigor sobre la rapidez, la responsabilidad sobre la promoción, 
                  la reflexión sobre el ruido."
                </p>
              </blockquote>

            </div>

            <div className="max-w-3xl mx-auto">

              <div className="space-y-6 text-center">

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
              <Link to="/manifiesto" className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-sm hover:bg-primary/90 transition-all duration-300 group">
                Manifiesto editorial
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>

        </section>

      </main>

      
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
