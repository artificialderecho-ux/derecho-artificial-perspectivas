import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

export default function GuiaReglamentoIA2026() {
  return (
    <Layout>
      <SEOHead 
        title="Guía del Reglamento de IA en 2026: Cumplimiento para Empresas | Derecho Artificial"
        description="Análisis experto sobre el EU AI Act en 2026. Niveles de riesgo, sanciones y el papel de la AESIA en España para empresas y abogados."
        canonical="https://derechoartificial.com/guia-reglamento-ia-2026"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/guia-reglamento-ia-2026" },
          { lang: "en", href: "https://derechoartificial.com/en/blog/eu-ai-act-guide-2026" }
        ]}
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-6">
            Guía Práctica · Actualizado 2026
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F172A] leading-[1.1] mb-8">
            Guía del Reglamento de IA en 2026: Cumplimiento para Empresas
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl font-sans">
            Un análisis exhaustivo sobre las obligaciones, plazos y estrategias de adaptación ante la plena aplicabilidad del EU AI Act en España y Europa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 border-t border-divider">
        <div className="container-editorial">
          <div className="prose-editorial">
            <p>
              La entrada en vigor plena del <a href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">Reglamento de Inteligencia Artificial (AI Act)</a> marca un hito en la regulación digital global. 
              Para las empresas, el <strong>cumplimiento legal</strong> ya no es una opción, sino un requisito de mercado fundamental 
              para operar en la Unión Europea.
            </p>

            <h2 className="font-serif text-3xl text-[#0F172A] mt-16 mb-8">
              Niveles de Riesgo en el EU AI Act
            </h2>
            <p>
              La normativa adopta un enfoque basado en riesgos, clasificando los sistemas de IA en cuatro categorías distintas 
              que determinan la carga regulatoria aplicable, asegurando un equilibrio entre innovación y derechos fundamentales.
            </p>

            <h3 className="font-serif text-2xl text-[#0F172A] mt-10 mb-5">
              Sistemas de Alto Riesgo
            </h3>
            <p>
              Aquellos utilizados en infraestructuras críticas, educación, empleo o servicios públicos esenciales. 
              Estos sistemas requieren una evaluación de conformidad rigurosa, gestión de calidad y supervisión humana para 
              mitigar posibles <strong>sesgos algorítmicos</strong> que puedan afectar a los ciudadanos.
            </p>

            <h3 className="font-serif text-2xl text-[#0F172A] mt-10 mb-5">
              Sistemas de Riesgo Inaceptable
            </h3>
            <p>
              Quedan terminantemente prohibidos aquellos sistemas que amenacen los <strong>derechos fundamentales</strong>, 
              como el scoring social por parte de gobiernos o la manipulación subliminal del comportamiento humano.
            </p>

            <h2 className="font-serif text-3xl text-[#0F172A] mt-16 mb-8">
              Sanciones y Gobernanza: El papel de la AESIA
            </h2>
            <p>
              En España, la <a href="https://www.aesia.gob.es/" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">Agencia Española de Supervisión de la Inteligencia Artificial (AESIA)</a> asume el rol de autoridad 
              de vigilancia de mercado. Las sanciones por incumplimiento pueden alcanzar hasta el 7% del volumen de negocio 
              global anual o 35 millones de euros, lo que subraya la importancia crítica de una adaptación temprana.
            </p>

            <div className="mt-12 mb-16">
              <h3 className="font-serif text-2xl text-[#0F172A] mb-6">Preguntas Frecuentes sobre Cumplimiento</h3>
              <div className="space-y-4">
                <details className="group border border-[#E2E8F0] rounded-sm p-4 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-[#0F172A]">
                    <span>¿Qué empresas deben cumplir con el AI Act?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-body text-sm leading-relaxed">
                    Todas aquellas que pongan en el mercado o utilicen sistemas de IA en la UE, incluyendo proveedores de fuera de la Unión si el output del sistema se usa en territorio europeo.
                  </p>
                </details>
                <details className="group border border-[#E2E8F0] rounded-sm p-4 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-[#0F172A]">
                    <span>¿Cuáles son las multas máximas?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-body text-sm leading-relaxed">
                    Hasta 35 millones de euros o el 7% de la facturación global anual para infracciones relacionadas con sistemas de IA prohibidos.
                  </p>
                </details>
              </div>
              {/* FAQ Schema */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "¿Qué empresas deben cumplir con el AI Act?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Todas aquellas que pongan en el mercado o utilicen sistemas de IA en la UE, incluyendo proveedores de fuera de la Unión si el output del sistema se usa en territorio europeo."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "¿Cuáles son las multas máximas?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Hasta 35 millones de euros o el 7% de la facturación global anual para infracciones relacionadas con sistemas de IA prohibidos."
                      }
                    }
                  ]
                })}
              </script>
            </div>

            
          </div>
        </div>
      </section>
    </Layout>
  );
}
