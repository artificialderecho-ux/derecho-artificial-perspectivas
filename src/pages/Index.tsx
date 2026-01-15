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
      <SEOHead 
        title="Derecho Artificial | Análisis jurídico y ético de la inteligencia artificial"
        description="Proyecto editorial independiente dedicado al análisis crítico del Derecho, la ética y la práctica jurídica en la era de la inteligencia artificial."
        canonical="https://derechoartificial.com"
      />

      <div ref={containerRef}>

        {/* Hero Section - Adapted from Apple: Large title, subtitle, CTAs, minimal background */}
        <section 
          className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white text-black"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.95
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/0" />
          <div className="container-wide text-center relative z-10 py-20">
            <div className="fade-in-section visible max-w-4xl mx-auto">
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-light text-black leading-[0.9] mb-6 tracking-wide">
                Derecho Artificial
              </h1>
              <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed max-w-2xl mx-auto font-sans mb-12">
                La reflexión jurídica sobre IA del futuro, hoy
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  to="/analisis" 
                  className="bg-black text-white px-8 py-3 rounded-full font-sans text-lg hover:bg-gray-800 transition-colors"
                >
                  Explorar análisis
                </Link>
                <Link 
                  to="/manifiesto" 
                  className="border border-black text-black px-8 py-3 rounded-full font-sans text-lg hover:bg-black hover:text-white transition-colors"
                >
                  Nuestro manifiesto
                </Link>
              </div>
            </div>
          </div>
          {/* Gradient fade to content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
        </section>


        {/* Vision Section - Apple-style: Clean text block with large heading */}
        <section className="py-24 md:py-32 lg:py-40 border-b border-gray-200 bg-white">
          <div className="container-wide">
            <div className="fade-in-section grid md:grid-cols-12 gap-16 md:gap-20 items-start">
              <div className="md:col-span-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 font-sans mb-5">
                  Nuestra visión
                </p>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-black leading-[1.1] tracking-tight font-light">
                  Rigor jurídico en la era de la inteligencia artificial
                </h2>
              </div>
              <div className="md:col-span-7 md:pt-4">
                <p className="text-lg md:text-xl leading-[1.95] text-gray-600 font-sans">
                  Derecho Artificial es un espacio de reflexión independiente donde el análisis 
                  normativo prevalece sobre el ruido mediático. Sin afiliaciones comerciales, 
                  sin rankings patrocinados, sin promociones encubiertas.
                </p>
                <Link 
                  to="/manifiesto" 
                  className="inline-flex items-center text-gray-800 font-sans mt-10 group tracking-wide text-sm uppercase hover:text-black"
                >
                  Leer el manifiesto completo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* Editorial Introduction - Apple-style: Sequential text with bold emphasis */}
        <section className="py-24 md:py-32 border-b border-gray-200 bg-white">
          <div className="container-editorial">
            <div className="fade-in-section max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-sans mb-8">
                Derecho Artificial es un proyecto editorial jurídico independiente, centrado 
                en el análisis normativo y regulatorio de la inteligencia artificial en Europa.
              </p>
              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-sans">
                No es un medio de noticias tecnológicas, un blog de opinión ni un escaparate 
                comercial de herramientas. Es un espacio de reflexión rigurosa donde profesionales 
                del Derecho y ciudadanos informados pueden encontrar análisis fundamentados 
                sobre las implicaciones jurídicas, éticas y regulatorias de la IA.
              </p>
            </div>
          </div>
        </section>


        {/* Análisis Destacado - Apple-style: Highlighted section with clean layout */}
        <section className="py-24 md:py-32 border-b border-gray-200 bg-white">
          <div className="container-editorial">
            <div className="fade-in-section">
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-2 font-sans">
                <Scale className="h-4 w-4 text-black" strokeWidth={1.5} />
                Análisis destacado
              </p>
              <Link 
                to="/analisis/ai-act-reglamento-europeo" 
                className="block group transition-all duration-300"
              >
                <h2 className="font-serif text-3xl md:text-4xl text-black leading-tight group-hover:text-gray-800 transition-colors duration-300 mb-6 font-light">
                  Reglamento Europeo de Inteligencia Artificial (AI Act): análisis jurídico
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6 max-w-3xl font-sans">
                  El AI Act establece el primer marco regulatorio integral para la inteligencia 
                  artificial en la Unión Europea. Este análisis examina su arquitectura normativa 
                  basada en el riesgo, las obligaciones para sistemas de alto riesgo y sus 
                  implicaciones para la práctica jurídica y las administraciones públicas.
                </p>
                <span className="inline-flex items-center text-sm text-black font-sans group-hover:text-gray-800 transition-colors duration-300 uppercase tracking-wide">
                  Acceder al análisis
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </section>


        {/* Ámbitos de Análisis - Apple-style: Grid with clean cards, minimal borders */}
        <section className="py-24 md:py-32 border-b border-gray-200 bg-white">
          <div className="container-wide">
            <div className="text-center mb-16 md:mb-20 fade-in-section">
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-4 font-light">
                Ámbitos de análisis
              </h2>
              <p className="text-lg text-gray-600 max-w-xl mx-auto font-sans">
                Áreas de convergencia entre el Derecho y la inteligencia artificial.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link 
                to="/analisis" 
                className="group p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-300 rounded-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Scale className="h-6 w-6 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-black mb-4 group-hover:text-gray-800 transition-colors">
                  Análisis jurídico
                </h3>
                <p className="text-gray-600 leading-relaxed font-sans">
                  Estudios en profundidad sobre las implicaciones legales de la IA: responsabilidad, 
                  propiedad intelectual, protección de datos y regulación sectorial.
                </p>
              </Link>
              
              <Link 
                to="/documentos" 
                className="group p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-300 rounded-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-black mb-4 group-hover:text-gray-800 transition-colors">
                  Documentos y marcos normativos
                </h3>
                <p className="text-gray-600 leading-relaxed font-sans">
                  Recopilación comentada de normativas, directrices y documentos de referencia 
                  sobre inteligencia artificial en el ámbito europeo e internacional.
                </p>
              </Link>
              
              <Link 
                to="/software-ia-legal" 
                className="group p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-300 rounded-sm"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Cpu className="h-6 w-6 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-black mb-4 group-hover:text-gray-800 transition-colors">
                  Software de IA legal
                </h3>
                <p className="text-gray-600 leading-relaxed font-sans">
                  Evaluación crítica de herramientas de inteligencia artificial para el sector 
                  jurídico desde una perspectiva de auditoría y cumplimiento normativo.
                </p>
              </Link>
              
              <Link 
                to="/noticias" 
                className="group p-8 border border-gray-200 hover:border-gray-300 transition-colors duration-300 rounded-sm md:col-span-2"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Newspaper className="h-6 w-6 text-black" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl text-black mb-4 group-hover:text-gray-800 transition-colors">
                  Noticias y novedades
                </h3>
                <p className="text-gray-600 leading-relaxed max-w-2xl font-sans">
                  Seguimiento editorial de desarrollos regulatorios, institucionales y 
                  tecnológicos con relevancia jurídica en el ámbito de la IA.
                </p>
              </Link>
            </div>
          </div>
        </section>


        {/* Editorial Closing - Apple-style: Clean, centered quote and text */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container-narrow text-center">
            <div className="fade-in-section mb-12">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-black leading-[1.3] italic font-light">
                "El rigor sobre la rapidez, la responsabilidad sobre la promoción, 
                la reflexión sobre el ruido."
              </p>
            </div>
            <div className="fade-in-section delay-200 text-left max-w-2xl mx-auto">
              <p className="text-gray-600 leading-relaxed font-sans mb-6">
                En un entorno donde la inmediatez prevalece sobre la precisión y el entusiasmo 
                tecnológico sustituye al análisis crítico, Derecho Artificial apuesta por un 
                enfoque sereno y fundamentado ante las transformaciones del sector jurídico.
              </p>
              <p className="text-gray-600 leading-relaxed font-sans text-sm">
                Este proyecto no acepta patrocinios ni acuerdos comerciales que comprometan 
                su independencia editorial.
              </p>
            </div>
            <div className="fade-in-section delay-300 mt-14">
              <Link 
                to="/manifiesto" 
                className="inline-flex items-center text-sm font-sans tracking-wide text-black hover:text-gray-800 transition-colors uppercase group"
              >
                Manifiesto editorial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
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
