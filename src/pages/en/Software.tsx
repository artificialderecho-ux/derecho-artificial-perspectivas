import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

export default function Software() {
  return (
    <Layout>
      <SEOHead 
        title="Legal AI Software Analysis | Derecho Artificial"
        description="Independent, compliance-focused analysis of artificial intelligence tools for the legal sector. Critical assessment of risks, AI Act implications and GDPR considerations."
        canonical="https://derechoartificial.com/en/software"
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">
              Sector analysis
            </p>
            <Link 
              to="/software-ia-legal" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              Versión en español →
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Legal AI Software: Critical Analysis
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Independent examination of artificial intelligence tools applied to legal practice, 
            focusing on compliance, ethical considerations and regulatory risk.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
            <p>
              The legal technology market is expanding rapidly, with artificial intelligence 
              positioned as transformative for legal practice. Claims of increased efficiency, 
              accuracy and cost reduction are ubiquitous. Yet critical, independent analysis 
              of these tools—particularly regarding legal risk, regulatory compliance and 
              professional responsibility—remains scarce.
            </p>
            
            <p>
              This section addresses that gap. We examine AI legal tools not as products to 
              recommend, but as systems whose use carries specific legal, ethical and 
              professional implications that merit careful consideration.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial notice */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h2 className="font-serif text-xl text-foreground mb-4">
              Editorial notice
            </h2>
            <p className="text-body leading-relaxed">
              The analyses published in this section are exclusively informational and 
              educational. <strong>They do not constitute recommendations, advice or 
              certified assessments of any product or service</strong>. We maintain no 
              commercial relationships, affiliations or sponsorship arrangements with 
              any software provider. Inclusion of a tool in this section implies neither 
              positive nor negative evaluation of its suitability for specific use cases.
            </p>
          </div>
        </div>
      </section>

      {/* Analytical framework */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Analytical framework
          </h2>
          
          <p className="text-body leading-relaxed mb-8">
            Our analysis of legal AI tools follows a structured approach that prioritises 
            compliance and risk assessment over feature comparison or market positioning.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Functional description
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Neutral explanation of what the system does, without marketing language 
                or promotional framing.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Legal risk assessment
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Identification of potential legal risks including professional liability, 
                confidentiality concerns and accuracy issues.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                AI Act classification
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Assessment of how the system may be classified under the EU AI Act's 
                risk-based framework and associated obligations.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                GDPR considerations
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Analysis of data protection implications, including lawful basis, 
                international transfers and data subject rights.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Transparency assessment
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Evaluation of the provider's disclosure regarding model training, 
                data sources and system limitations.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Human oversight requirements
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Assessment of the degree of human supervision required for responsible 
                professional use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Categories of legal AI
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Document automation
              </h3>
              <p className="text-body leading-relaxed">
                Systems for generating legal documents through intelligent templates, 
                automated assembly and standardised workflows.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Predictive justice
              </h3>
              <p className="text-body leading-relaxed">
                Tools analysing historical judicial decisions to estimate litigation 
                outcomes. Potentially high-risk under the AI Act when applied to 
                judicial decision-making.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Contract analysis
              </h3>
              <p className="text-body leading-relaxed">
                Automated review systems identifying clauses, risks and deviations 
                from standard templates.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                E-discovery
              </h3>
              <p className="text-body leading-relaxed">
                Platforms for large-scale document analysis in litigation and 
                investigations, using machine learning for classification and prioritisation.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Generative AI for legal professionals
              </h3>
              <p className="text-body leading-relaxed">
                Large language models adapted for legal tasks: drafting, summarisation, 
                research assistance. Raises specific concerns regarding hallucinations, 
                confidentiality and professional responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Link to full analyses */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              Detailed analyses
            </h2>
            <p className="text-body leading-relaxed mb-6">
              Complete analytical profiles are published progressively in Spanish. 
              The full version includes detailed assessments of specific tool categories.
            </p>
            <Link 
              to="/software-ia-legal" 
              className="inline-flex items-center gap-2 text-foreground hover:text-caption transition-colors underline underline-offset-4"
            >
              View complete analyses in Spanish →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}