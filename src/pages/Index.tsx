import { useEffect, useRef } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const copyLink = (id: string) => {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  alert("Enlace de sección copiado");
};

const Index = () => {
  const containerRef = useFadeInOnScroll();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#mision') navigate('/sobre#mision');
    if (location.hash === '#perspectivas') navigate('/analisis#perspectivas');
    if (location.hash === '#documentos') navigate('/documentos#documentos');
    if (location.hash === '#contacto') navigate('/contacto#contacto');
  }, [location.hash, navigate]);

  return (
    <Layout>
      <SEOHead 
        title="Derecho Artificial: Actualidad Legal, Reglamento IA y Legaltech en Europa"
        description="Descubre todo sobre la regulación de la Inteligencia Artificial en España y Europa. Análisis del Reglamento IA, guías para abogados y las últimas tendencias en Legaltech y ciberseguridad."
        canonical="https://derechoartificial.com"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com" },
          { lang: "en", href: "https://derechoartificial.com/en" }
        ]}
      />

      <main ref={containerRef}>
        <header id="inicio" className="relative section-spacing overflow-hidden bg-background">
          <div className="absolute inset-0">
            <img src={heroBackground} alt="" className="h-full w-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background" />
          </div>
          <div className="container-wide relative z-10">
            <div className="fade-in-section max-w-[700px] mx-auto text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-caption mb-6">
                Proyecto editorial independiente
              </p>
              <div className="flex items-center justify-center gap-2 mb-10">
                <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-black to-gray-800 leading-[1.05]">
                  Inteligencia Artificial y Derecho: El Nuevo Paradigma Legal
                </h1>
                <button
                  type="button"
                  onClick={() => copyLink("inicio")}
                  className="text-muted-foreground hover:text-foreground transition-colors text-base"
                  aria-label="Copiar enlace de sección"
                >
                  🔗
                </button>
              </div>
              <p className="text-xl md:text-2xl text-body leading-relaxed mb-10 mx-auto text-gray-700">
                Análisis independiente sobre el Reglamento Europeo de IA, ética digital y los retos de la abogacía en la era de los algoritmos.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/analisis"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Explorar análisis
                </Link>
                <Link
                  to="/manifiesto"
                  className="inline-flex items-center justify-center rounded-md border border-border bg-card px-7 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-highlight"
                >
                  Nuestro manifiesto
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="section-spacing border-b border-divider bg-card">
          <div className="container-wide">
            <div className="fade-in-section grid gap-8 lg:grid-cols-2">
              <div className="lg:pr-10">
                <p className="text-xs uppercase tracking-[0.3em] text-caption mb-5">
                  Normativa
                </p>
                <h2 className="font-bold text-3xl md:text-4xl text-foreground leading-[1.2] mb-8">
                  Reglamento Europeo de IA: Impacto y Cumplimiento
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-body mb-8">
                  Análisis exhaustivo del <a href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">EU AI Act (Reglamento 2024/1689)</a>. Claves sobre seguridad jurídica, gobernanza de datos y obligaciones en el mercado único digital.
                </p>
                <div className="bg-white p-6 border border-divider rounded-sm">
                  <h3 className="font-bold text-xl mb-4 text-foreground">Preguntas Frecuentes sobre el AI Act</h3>
                  <div className="space-y-4">
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                        <span>¿Cuándo entra en vigor el Reglamento de IA?</span>
                        <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                      </summary>
                      <p className="group-open:animate-fadeIn mt-3 text-body text-sm leading-relaxed">
                        El Reglamento entró en vigor en agosto de 2024, con una aplicación escalonada: prohibiciones a los 6 meses, gobernanza a los 12 meses y plena aplicación a los 24 meses (2026).
                      </p>
                    </details>
                    <details className="group">
                      <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                        <span>¿A quién afecta la normativa europea de IA?</span>
                        <span className="transition group-open:rotate-180">
                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                        </span>
                      </summary>
                      <p className="group-open:animate-fadeIn mt-3 text-body text-sm leading-relaxed">
                        Aplica a proveedores, desplegadores, importadores y distribuidores de sistemas de IA que operen en el mercado de la UE, independientemente de su ubicación geográfica.
                      </p>
                    </details>
                  </div>
                  {/* JSON-LD for FAQ */}
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": [
                        {
                          "@type": "Question",
                          "name": "¿Cuándo entra en vigor el Reglamento de IA?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "El Reglamento entró en vigor en agosto de 2024, con una aplicación escalonada: prohibiciones a los 6 meses, gobernanza a los 12 meses y plena aplicación a los 24 meses (2026)."
                          }
                        },
                        {
                          "@type": "Question",
                          "name": "¿A quién afecta la normativa europea de IA?",
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": "Aplica a proveedores, desplegadores, importadores y distribuidores de sistemas de IA que operen en el mercado de la UE, independientemente de su ubicación geográfica."
                          }
                        }
                      ]
                    })}
                  </script>
                </div>
              </div>
              <div className="grid gap-6">
                <article className="card-elevated p-6">
                  <h3 className="font-serif text-xl text-foreground mb-3">
                    Impacto de la normativa en España y plazos de cumplimiento
                  </h3>
                  <p className="text-body leading-relaxed">
                    Fechas clave, obligaciones por nivel de riesgo y ajustes regulatorios que afectan al ecosistema legal español.
                  </p>
                </article>
                <article className="card-elevated p-6">
                  <h3 className="font-bold text-xl text-foreground mb-3">
                    Guía de cumplimiento para empresas y desarrolladores
                  </h3>
                  <p className="text-body leading-relaxed">
                    Checklist práctico sobre documentación técnica, evaluación de riesgos y requisitos de transparencia.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-background">
          <div className="container-wide">
            <div className="fade-in-section grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-caption mb-5">
                  Tecnología
                </p>
                <h2 className="font-bold text-3xl md:text-4xl text-foreground leading-[1.2] mb-10">
                  Legaltech e Innovación Jurídica
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-body max-w-[700px]">
                  Evaluación de herramientas de IA generativa y predictiva. Transformación digital de despachos, automatización de procesos y nuevos modelos de negocio.
                </p>
              </div>
              <div className="grid gap-6">
                <article className="card-elevated p-6">
                  <h3 className="font-bold text-xl text-foreground mb-3">
                    Automatización documental y contratos inteligentes
                  </h3>
                  <p className="text-body leading-relaxed">
                    Flujos de trabajo para revisión, generación y control de contratos con IA supervisada.
                  </p>
                  <Link to="#" className="group inline-flex items-center text-sm font-medium text-primary mt-4">
                    Leer más <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
                <article className="card-elevated p-6">
                  <h3 className="font-bold text-xl text-foreground mb-3">
                    Chatbots jurídicos y análisis predictivo de sentencias
                  </h3>
                  <p className="text-body leading-relaxed">
                    Casos de uso en atención jurídica, litigación estratégica y modelos de predicción de resultados.
                  </p>
                  <Link to="#" className="group inline-flex items-center text-sm font-medium text-primary mt-4">
                    Leer más <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section-spacing bg-highlight">
          <div className="container-wide">
            <div className="fade-in-section grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-caption mb-5">
                  Análisis
                </p>
                <h2 className="font-bold text-3xl md:text-4xl text-foreground leading-[1.2] mb-8">
                  Ética Digital y Responsabilidad Civil
                </h2>
                <p className="text-lg md:text-xl leading-relaxed text-body">
                  Investigación crítica sobre los dilemas éticos de los sistemas autónomos, sesgos algorítmicos y los retos de la responsabilidad civil en la era de la IA.
                </p>
              </div>
              <div className="grid gap-6">
                <article className="card-elevated p-6">
                  <h3 className="font-bold text-xl text-foreground mb-3">
                    Protección de datos (RGPD) y sesgos algorítmicos
                  </h3>
                  <p className="text-body leading-relaxed">
                    Gobernanza de datos, evaluación de impacto y estrategias para mitigar riesgos discriminatorios.
                  </p>
                  <Link to="#" className="group inline-flex items-center text-sm font-medium text-primary mt-4">
                    Leer más <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
                <article className="card-elevated p-6">
                  <h3 className="font-bold text-xl text-foreground mb-3">
                    Propiedad intelectual en la era de la IA Generativa
                  </h3>
                  <p className="text-body leading-relaxed">
                    Derechos de autor, licencias y protección de activos creativos frente a modelos generativos.
                  </p>
                  <Link to="#" className="group inline-flex items-center text-sm font-medium text-primary mt-4">
                    Leer más <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </div>
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
