import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

export default function StrategicReportAIAct() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AnalysisNewsArticle",
    headline: "Strategic Report: The New AI Operational Order in the European Union",
    description: "Deep dive into Regulation (EU) 2024/1689. Risk architecture, GPAI obligations, and the role of AESIA in the European digital strategy.",
    datePublished: "2026-01-24",
    author: {
      "@type": "Person",
      name: "R.S.C."
    },
    publisher: {
      "@type": "Organization",
      name: "Derecho Artificial",
      url: "https://derechoartificial.com"
    },
    mainEntityOfPage: "https://derechoartificial.com/en/analysis/strategic-report-ai-act",
    about: [
      { "@type": "Thing", name: "Regulation (EU) 2024/1689" },
      { "@type": "Organization", name: "AESIA" },
      { "@type": "Thing", name: "Compliance" }
    ],
    keywords: [
      "AI Act",
      "Regulation (EU) 2024/1689",
      "Compliance",
      "AESIA",
      "GPAI"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Strategic Report: EU AI Act Compliance & Governance | Derecho Artificial"
        description="Deep dive into Regulation (EU) 2024/1689. Risk architecture, GPAI obligations, and the role of AESIA in the European digital strategy."
        canonical="https://derechoartificial.com/en/analysis/strategic-report-ai-act"
        lang="en"
        type="article"
        publishedTime="2026-01-24"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/analisis/analisis-ria-estrategico" },
          { lang: "en", href: "https://derechoartificial.com/en/analysis/strategic-report-ai-act" }
        ]}
      />

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <article className="section-spacing">
        <div className="container-narrow">
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm uppercase tracking-widest text-caption">Strategic report</span>
              <span className="text-caption">·</span>
              <time className="text-sm text-caption">January 24, 2026</time>
              <span className="text-caption">·</span>
              <span className="text-sm text-caption">R.S.C.</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
              Strategic Report: The New AI Operational Order in the European Union
            </h1>
            <p className="text-lg text-body leading-relaxed">
              This report translates the EU AI Act into operational requirements for providers, deployers, and public institutions, framing compliance as a core governance function rather than a purely legal checklist.
            </p>
          </header>

          <section className="mb-16">
            <div className="bg-surface p-6 md:p-8 italic text-body">
              Executive summary: Regulation (EU) 2024/1689 redefines the AI lifecycle through a risk-based model, introduces binding obligations for GPAI systems, and places traceability, human oversight, and governance at the center of compliance.
            </div>
          </section>

          <div className="prose-editorial">
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                1. Operational scope and compliance objectives
              </h2>
              <p>
                The EU AI Act is an operational framework with extraterritorial reach. It requires providers and deployers to embed compliance into data governance, procurement, and technical design decisions. The regulation does not merely govern outputs; it governs the entire lifecycle of AI systems.
              </p>
              <p>
                This strategic shift positions compliance as a continuous function of organizational governance, not a one-time assessment at market entry.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                2. Risk architecture and regulatory categories
              </h2>
              <p>
                The risk-based model defines the intensity of obligations and shapes how AI systems must be documented, audited, and monitored. The following classification provides a practical reading of each risk tier.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-surface border border-divider">
                  <h3 className="font-serif text-lg text-foreground mb-2">Unacceptable risk</h3>
                  <p className="text-body text-sm leading-relaxed">
                    Prohibited practices, including social scoring or exploitation of vulnerabilities. Exceptions are strictly limited and security-driven.
                  </p>
                </div>
                <div className="p-4 bg-surface border border-divider">
                  <h3 className="font-serif text-lg text-foreground mb-2">High risk</h3>
                  <p className="text-body text-sm leading-relaxed">
                    Systems in critical domains such as justice, employment, and education. Requires risk management, data quality, human oversight, and logging.
                  </p>
                </div>
                <div className="p-4 bg-surface border border-divider">
                  <h3 className="font-serif text-lg text-foreground mb-2">Limited risk</h3>
                  <p className="text-body text-sm leading-relaxed">
                    Transparency obligations, including user notices for AI-generated content and conversational systems.
                  </p>
                </div>
                <div className="p-4 bg-surface border border-divider">
                  <h3 className="font-serif text-lg text-foreground mb-2">Minimal risk</h3>
                  <p className="text-body text-sm leading-relaxed">
                    No additional obligations beyond sectoral rules and voluntary codes of conduct.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                3. GPAI models and technical thresholds
              </h2>
              <p>
                The regulation defines obligations for general-purpose AI, especially systems classified as <Link to="/en/legal-ai-glossary" className="underline underline-offset-4">GPAI</Link>. Providers must document capabilities, limitations, and systemic risk mitigation before deployment.
              </p>
              <p>
                A critical trigger is the training threshold of <code>10^25 FLOPs</code>, used as a proxy for systemic impact. Once this threshold is crossed, enhanced transparency and risk mitigation requirements apply.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                4. Oversight, AESIA, and enforcement scenarios
              </h2>
              <p>
                AESIA is expected to serve as Spain’s supervisory authority within the EU governance framework. Its mandate will extend from market surveillance to the coordination of audits, compliance benchmarks, and regulatory experimentation via <Link to="/en/legal-ai-glossary" className="underline underline-offset-4">Sandbox</Link> environments.
              </p>
              <p>
                Effective enforcement depends on interoperability across national authorities, robust technical auditing, and aligned methodologies for risk assessment.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                5. Implementation timeline
              </h2>
              <p>
                The staged rollout requires strategic sequencing of compliance activities. The following timeline highlights key milestones for operational readiness.
              </p>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-sm border border-divider">
                  <thead className="bg-surface">
                    <tr>
                      <th className="text-left p-3 border-b border-divider font-medium">Date</th>
                      <th className="text-left p-3 border-b border-divider font-medium">Regulatory milestone</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b border-divider">February 2025</td>
                      <td className="p-3 border-b border-divider">Unacceptable risk prohibitions and initial transparency duties.</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-divider">August 2025</td>
                      <td className="p-3 border-b border-divider">GPAI documentation and systemic risk requirements apply.</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-divider">February 2026</td>
                      <td className="p-3 border-b border-divider">High-risk obligations apply to new systems.</td>
                    </tr>
                    <tr>
                      <td className="p-3">August 2026</td>
                      <td className="p-3">Full supervisory regime and enforcement mechanisms in operation.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                6. Algorithmic bias and emerging legal risk
              </h2>
              <p>
                Compliance cannot remain formalistic. <Link to="/en/legal-ai-glossary" className="underline underline-offset-4">Algorithmic bias</Link> is becoming the main driver of litigation and regulatory scrutiny.
              </p>
              <p>
                The AI Act pushes organizations to integrate traceability, data audits, and explainability as operational pillars, aligning technical practices with legal accountability.
              </p>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
}
