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
      <SEOHead 
        title="Quiénes Somos | Manifiesto y Misión - Derecho Artificial"
        description="Conoce el proyecto editorial independiente Derecho Artificial. Principios de independencia, rigor jurídico y nuestro Manifiesto Editorial."
        canonical="https://derechoartificial.com/quienes-somos"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/quienes-somos" },
          { lang: "en", href: "https://derechoartificial.com/en/about-us" }
        ]}
      />

      <article className="section-spacing">
        <div className="container-editorial">
          {/* Header */}
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-caption mb-4">
              Sobre el proyecto
            </p>
            <div className="flex items-center gap-2 mb-6">
              <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Sobre Derecho Artificial
              </h1>
            </div>
            <p className="text-lg text-body">
              Un espacio para la reflexión jurídica rigurosa en la era de la inteligencia artificial.
            </p>
          </header>

          {/* Content from Sobre.tsx */}
          <div className="prose-editorial mb-24">
            <section className="mb-16">
              <h2>Qué es Derecho Artificial</h2>
              <p>
                Derecho Artificial es una publicación editorial independiente dedicada 
                al análisis de las implicaciones jurídicas, éticas y sociales de la 
                inteligencia artificial. Nuestro objetivo es contribuir al debate 
                informado sobre cómo el Derecho debe responder a los desafíos que 
                plantean estas tecnologías.
              </p>
              <p>
                Fundado en 2024, el proyecto nace de la convicción de que el mundo 
                hispanohablante necesita un espacio de referencia donde profesionales 
                del Derecho, académicos, reguladores y ciudadanos puedan encontrar 
                análisis riguroso y accesible sobre estos temas.
              </p>
            </section>

            <section className="mb-16">
              <h2>Por qué existimos</h2>
              <p>
                La inteligencia artificial está transformando la práctica jurídica 
                y plantea cuestiones fundamentales sobre justicia, responsabilidad 
                y derechos humanos. Sin embargo, gran parte del debate público está 
                dominado por:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li>
                  Discursos promocionales de empresas tecnológicas que minimizan riesgos.
                </li>
                <li>
                  Narrativas sensacionalistas que exageran amenazas sin rigor.
                </li>
                <li>
                  Análisis técnicos inaccesibles para no especialistas.
                </li>
                <li>
                  Contenido en inglés que no considera las particularidades de 
                  los sistemas jurídicos hispanohablantes.
                </li>
              </ul>
              <p>
                Derecho Artificial busca ocupar el espacio intermedio: análisis 
                serio pero accesible, crítico pero constructivo, global pero 
                atento a las realidades locales.
              </p>
            </section>
          </div>

          {/* Manifiesto Section (Highlighted) */}
          <div id="manifiesto" className="bg-surface/50 p-8 md:p-12 rounded-lg border border-border my-20">
             <header className="mb-12 text-center">
              <p className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">
                Nuestros Principios
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                Manifiesto Editorial
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Compromiso con la independencia, la ética y el pensamiento crítico.
              </p>
            </header>

            <div className="grid gap-12 md:grid-cols-1">
              <section>
                <h3 className="font-serif text-xl text-foreground mb-3 font-semibold">1. Independencia editorial</h3>
                <p className="text-body">
                  Derecho Artificial es un proyecto editorial independiente, sin financiación comercial ni vínculos que comprometan el análisis crítico. No aceptamos patrocinios, acuerdos comerciales ni relaciones de afiliación con proveedores tecnológicos o instituciones.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl text-foreground mb-3 font-semibold">2. Centralidad del derecho</h3>
                <p className="text-body">
                  El análisis jurídico, normativo y regulatorio prevalece sobre discursos tecnológicos, comerciales o especulativos. Priorizamos fuentes institucionales, textos normativos y análisis doctrinal fundamentado.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl text-foreground mb-3 font-semibold">3. Primacía de fuentes institucionales</h3>
                <p className="text-body">
                  Las instituciones públicas, organismos reguladores, jurisprudencia y documentación oficial constituyen la base de nuestro análisis. Las fuentes corporativas o comerciales se citan con contexto crítico y nunca como autoridad primaria.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl text-foreground mb-3 font-semibold">4. Supervisión humana</h3>
                <p className="text-body">
                  La inteligencia artificial no puede sustituir el juicio profesional en decisiones que afectan derechos fundamentales. Defendemos la supervisión humana efectiva, no meramente formal, como requisito ineludible en contextos jurídicos sensibles.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl text-foreground mb-3 font-semibold">5. Enfoque europeo</h3>
                <p className="text-body">
                  El marco normativo europeo—AI Act, RGPD, Carta de Derechos Fundamentales—constituye el eje de nuestro análisis. Priorizamos la perspectiva regulatoria europea sobre modelos más permisivos de otras jurisdicciones.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl text-foreground mb-3 font-semibold">6. Prudencia frente a automatización</h3>
                <p className="text-body">
                  Rechazamos el determinismo tecnológico y la aceleración sin reflexión. La adopción de sistemas de IA en el ámbito jurídico requiere evaluación crítica de riesgos, cumplimiento normativo y preservación de garantías procesales.
                </p>
              </section>

              <section>
                <h3 className="font-serif text-xl text-foreground mb-3 font-semibold">7. Rigor sobre velocidad</h3>
                <p className="text-body">
                  Priorizamos la precisión, la profundidad y el análisis fundamentado sobre la inmediatez o la publicación por calendario. El rigor jurídico exige tiempo y reflexión, no reacciones precipitadas.
                </p>
              </section>
            </div>
          </div>
          
          <div className="prose-editorial">
             <section>
              <h2>A quién nos dirigimos</h2>
              <p>
                Nuestros contenidos están diseñados para abogados, jueces, académicos, 
                estudiantes de Derecho, responsables de políticas públicas y cualquier 
                persona interesada en entender cómo la tecnología está redefiniendo 
                las reglas de nuestra sociedad.
              </p>
            </section>
          </div>

        </div>
      </article>
    </Layout>
  );
};

export default QuienesSomos;