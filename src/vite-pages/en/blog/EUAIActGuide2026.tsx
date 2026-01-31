import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

export default function EUAIActGuide2026() {
  return (
    <Layout>
      <SEOHead 
        title="AI Act Guide 2026: Compliance for Companies | Derecho Artificial"
        description="Expert analysis on the EU AI Act in 2026. Risk levels, penalties, and the role of AESIA in Spain for companies and lawyers."
        canonical="https://derechoartificial.com/en/blog/eu-ai-act-guide-2026"
        lang="en"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/guia-reglamento-ia-2026" },
          { lang: "en", href: "https://derechoartificial.com/en/blog/eu-ai-act-guide-2026" }
        ]}
      />

      {/* Hero Section */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-6">
            Practical Guide · Updated 2026
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F172A] leading-[1.1] mb-8">
            EU AI Act Guide 2026: Compliance for Companies
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl font-sans">
            A comprehensive analysis of obligations, deadlines, and adaptation strategies regarding the full applicability of the EU AI Act in Spain and Europe.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 border-t border-divider">
        <div className="container-editorial">
          <div className="prose-editorial">
            <p>
              The full entry into force of the <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">Artificial Intelligence Act (AI Act)</a> marks a milestone in global digital regulation. 
              For companies, <strong>legal compliance</strong> is no longer an option, but a fundamental market requirement 
              to operate in the European Union.
            </p>

            <h2 className="font-serif text-3xl text-[#0F172A] mt-16 mb-8">
              Risk Levels in the EU AI Act
            </h2>
            <p>
              The regulation adopts a risk-based approach, classifying AI systems into four distinct categories 
              that determine the applicable regulatory burden, ensuring a balance between innovation and fundamental rights.
            </p>

            <h3 className="font-serif text-2xl text-[#0F172A] mt-10 mb-5">
              High-Risk AI Systems
            </h3>
            <p>
              Those used in critical infrastructure, education, employment, or essential public services. 
              These systems require rigorous conformity assessment, quality management, and human oversight to 
              mitigate potential <strong>algorithmic bias</strong> that may affect citizens.
            </p>

            <h3 className="font-serif text-2xl text-[#0F172A] mt-10 mb-5">
              Unacceptable Risk Systems
            </h3>
            <p>
              Systems that threaten <strong>fundamental rights</strong> are strictly prohibited, 
              such as social scoring by governments or subliminal manipulation of human behavior.
            </p>

            <h2 className="font-serif text-3xl text-[#0F172A] mt-16 mb-8">
              Penalties and Governance: The Role of AESIA
            </h2>
            <p>
              In Spain, the <a href="https://www.aesia.gob.es/" target="_blank" rel="noopener noreferrer" className="text-[#1E40AF] hover:underline">Spanish Agency for the Supervision of Artificial Intelligence (AESIA)</a> assumes the role of market surveillance authority. 
              Penalties for non-compliance can reach up to 7% of total worldwide annual turnover or 35 million euros, highlighting the critical importance of early adaptation.
            </p>

            <div className="mt-12 mb-16">
              <h3 className="font-serif text-2xl text-[#0F172A] mb-6">Compliance FAQ</h3>
              <div className="space-y-4">
                <details className="group border border-[#E2E8F0] rounded-sm p-4 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-[#0F172A]">
                    <span>Which companies must comply with the AI Act?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-body text-sm leading-relaxed">
                    All those that place on the market or put into service AI systems in the EU, including providers from outside the Union if the output produced by the system is used in the EU.
                  </p>
                </details>
                <details className="group border border-[#E2E8F0] rounded-sm p-4 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between font-medium text-[#0F172A]">
                    <span>What are the maximum fines?</span>
                    <span className="transition group-open:rotate-180">
                      <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-body text-sm leading-relaxed">
                    Up to 35 million euros or 7% of total worldwide annual turnover for infringements on prohibited AI practices.
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
                      "name": "Which companies must comply with the AI Act?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "All those that place on the market or put into service AI systems in the EU, including providers from outside the Union if the output produced by the system is used in the EU."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What are the maximum fines?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Up to 35 million euros or 7% of total worldwide annual turnover for infringements on prohibited AI practices."
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
