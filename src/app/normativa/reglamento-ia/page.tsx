import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Guía del Reglamento de IA en 2026: Cumplimiento para Empresas | Derecho Artificial",
  description: "Análisis experto sobre el EU AI Act en 2026. Niveles de riesgo, sanciones y el papel de la AESIA en España para empresas y abogados.",
  alternates: {
    canonical: "https://derechoartificial.com/normativa/reglamento-ia",
    languages: {
      es: "https://derechoartificial.com/normativa/reglamento-ia",
      en: "https://derechoartificial.com/en/blog/eu-ai-act-guide-2026",
    },
  },
};

export default function GuiaReglamentoIAPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Guía Práctica · Actualizado 2026
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-8">
            Guía del Reglamento de IA en 2026: Cumplimiento para Empresas
          </h1>
          <p className="lead text-muted-foreground max-w-3xl font-sans">
            Un análisis exhaustivo sobre las obligaciones, plazos y estrategias de adaptación ante la plena aplicabilidad del EU AI Act en España y Europa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-lg prose-slate max-w-none">
            <p>
              La entrada en vigor plena del <a href="https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Reglamento de Inteligencia Artificial (AI Act)</a> marca un hito en la regulación digital global. 
              Para las empresas, el <strong>cumplimiento legal</strong> ya no es una opción, sino un requisito de mercado fundamental 
              para operar en la Unión Europea.
            </p>

            <h2 className="font-serif text-3xl text-foreground mt-16 mb-8">
              Niveles de Riesgo en el EU AI Act
            </h2>
            <p>
              La normativa adopta un enfoque basado en riesgos, clasificando los sistemas de IA en cuatro categorías distintas 
              que determinan la carga regulatoria aplicable, asegurando un equilibrio entre innovación y derechos fundamentales.
            </p>

            <h3 className="font-serif text-2xl text-foreground mt-10 mb-5">
              Sistemas de Alto Riesgo
            </h3>
            <p>
              Aquellos utilizados en infraestructuras críticas, educación, empleo o servicios públicos esenciales. 
              Estos sistemas requieren una evaluación de conformidad rigurosa, gestión de calidad y supervisión humana para 
              mitigar posibles <strong>sesgos algorítmicos</strong> que puedan afectar a los ciudadanos.
            </p>

            <h3 className="font-serif text-2xl text-foreground mt-10 mb-5">
              Sistemas de Riesgo Inaceptable
            </h3>
            <p>
              Quedan terminantemente prohibidos aquellos sistemas que amenacen los <strong>derechos fundamentales</strong>, 
              como el scoring social por parte de gobiernos o la manipulación subliminal del comportamiento humano.
            </p>

            <h2 className="font-serif text-3xl text-foreground mt-16 mb-8">
              Sanciones y Gobernanza: El papel de la AESIA
            </h2>
            <p>
              En España, la <a href="https://www.aesia.gob.es/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Agencia Española de Supervisión de la Inteligencia Artificial (AESIA)</a> asume el rol de autoridad 
              de vigilancia de mercado. Las sanciones por incumplimiento pueden alcanzar hasta el 7% del volumen de negocio 
              global anual o 35 millones de euros, lo que subraya la importancia crítica de una adaptación temprana.
            </p>

            <div className="my-10 p-6 bg-blue-50/50 border border-blue-100 rounded-lg">
              <h4 className="font-serif text-lg text-blue-900 mb-2">Relacionado: Transparencia Algorítmica en España</h4>
              <p className="text-sm text-blue-800 mb-3">
                Para entender cómo los tribunales aplican la transparencia en sistemas automatizados antes de la plena vigencia del Reglamento, consulte nuestro análisis sobre el caso BOSCO y el acceso al código fuente.
              </p>
              <Link href="/jurisprudencia/sentencia-bosco-transparencia-algoritmica" className="text-blue-700 font-medium hover:underline flex items-center gap-2">
                Leer análisis de la Sentencia BOSCO 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <div className="mt-12 mb-16 not-prose">
              <h3 className="font-serif text-2xl text-foreground mb-6">Preguntas Frecuentes sobre Cumplimiento</h3>
              <div className="space-y-4">
                <details className="group border border-border rounded-sm p-4 bg-card">
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                    <span>¿Qué empresas deben cumplir con el AI Act?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-muted-foreground text-sm leading-relaxed">
                    Todas aquellas que pongan en el mercado o utilicen sistemas de IA en la UE, incluyendo proveedores de fuera de la Unión si el output del sistema se usa en territorio europeo.
                  </p>
                </details>
                <details className="group border border-border rounded-sm p-4 bg-card">
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                    <span>¿Cuáles son las multas máximas?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-muted-foreground text-sm leading-relaxed">
                    Hasta 35 millones de euros o el 7% de la facturación global anual para infracciones relacionadas con sistemas de IA prohibidos.
                  </p>
                </details>
              </div>
              {/* FAQ Schema */}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
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
                  }),
                }}
              />
            </div>

            <div className="mt-16 p-8 bg-muted/50 rounded-lg border border-border">
              <h4 className="font-serif text-xl mb-4 text-foreground">¿Necesita asesoramiento especializado?</h4>
              <p className="mb-6 text-muted-foreground">
                Nuestro equipo de expertos en Legaltech y regulación digital puede ayudarle a auditar sus sistemas de IA.
              </p>
              <Link 
                href="/contacto" 
                className="text-primary hover:opacity-80 font-medium underline underline-offset-4 transition-opacity"
              >
                Contactar con un especialista →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
