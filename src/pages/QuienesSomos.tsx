import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

const copyLink = (id: string) => {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  alert("Enlace de sección copiado");
};

const QuienesSomos = () => {
  return (
    <Layout>
      {/* SEO Optimizado para Autoridad y "Naturalidad" */}
      <SEOHead 
        title="Quiénes Somos | Derecho Artificial: Independencia y Ética"
        description="Principios rectores de Derecho Artificial: independencia editorial, centralidad del Derecho, enfoque europeo y rigor en el análisis de la Inteligencia Artificial."
        canonical="https://derechoartificial.com/quienes-somos"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/quienes-somos" },
          { lang: "en", href: "https://derechoartificial.com/en/about" }
        ]}
      />

      <article id="mision" className="section-spacing">
        <div className="container-editorial">
          {/* Header */}
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-caption mb-4">
              Manifiesto Editorial
            </p>
            <div className="flex items-center gap-2 mb-6">
              <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Principios para un análisis riguroso del Derecho y la Inteligencia Artificial
              </h1>
              <button
                type="button"
                onClick={() => copyLink("mision")}
                className="text-muted-foreground hover:text-foreground transition-colors text-base"
                aria-label="Copiar enlace de sección"
              >
                🔗
              </button>
            </div>
            <p className="text-lg text-body">
              Nuestro compromiso con la independencia, la ética y el pensamiento crítico.
            </p>
          </header>

          {/* Content */}
          <div className="prose-editorial space-y-12">
            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">1. Independencia editorial</h2>
              <p>
                Derecho Artificial es un proyecto editorial independiente, sin financiación comercial ni vínculos que comprometan el análisis crítico. No aceptamos patrocinios, acuerdos comerciales ni relaciones de afiliación con proveedores tecnológicos o instituciones.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">2. Centralidad del derecho</h2>
              <p>
                El análisis jurídico, normativo y regulatorio prevalece sobre discursos tecnológicos, comerciales o especulativos. Priorizamos fuentes institucionales, textos normativos y análisis doctrinal fundamentado.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">3. Primacía de fuentes institucionales</h2>
              <p>
                Las instituciones públicas, organismos reguladores, jurisprudencia y documentación oficial constituyen la base de nuestro análisis. Las fuentes corporativas o comerciales se citan con contexto crítico y nunca como autoridad primaria.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">4. Supervisión humana</h2>
              <p>
                La inteligencia artificial no puede sustituir el juicio profesional en decisiones que afectan derechos fundamentales. Defendemos la supervisión humana efectiva, no meramente formal, como requisito ineludible en contextos jurídicos sensibles.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">5. Enfoque europeo</h2>
              <p>
                El marco normativo europeo—AI Act, RGPD, Carta de Derechos Fundamentales—constituye el eje de nuestro análisis. Priorizamos la perspectiva regulatoria europea sobre modelos más permisivos de otras jurisdicciones.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">6. Prudencia frente a automatización</h2>
              <p>
                Rechazamos el determinismo tecnológico y la aceleración sin reflexión. La adopción de sistemas de IA en el ámbito jurídico requiere evaluación crítica de riesgos, cumplimiento normativo y preservación de garantías procesales.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">7. Rigor sobre velocidad</h2>
              <p>
                Priorizamos la precisión, la profundidad y el análisis fundamentado sobre la inmediatez o la publicación por calendario. El rigor jurídico exige tiempo y reflexión, no reacciones precipitadas.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-foreground mb-4">8. Neutralidad institucional</h2>
              <p>
                Mantenemos neutralidad respecto a instituciones, empresas y proveedores. El análisis se fundamenta en criterios jurídicos objetivos, no en preferencias institucionales o relaciones comerciales.
              </p>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default QuienesSomos;
