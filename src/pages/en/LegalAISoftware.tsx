import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

export default function LegalAISoftware() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">
              Sector Analysis
            </p>
            <Link 
              to="/software-ia-legal" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              ← Versión en español
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Artificial Intelligence Software in the Legal Sector
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Independent critical analysis of artificial intelligence tools in legal practice, 
            their ethical implications and regulatory framework.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
            <p>
              The progressive incorporation of artificial intelligence systems in the practice 
              of law constitutes one of the most significant transformations in the contemporary 
              legal sector. From case law research assistants to contract analysis tools, 
              document automation systems and knowledge management platforms, the AI-based legal 
              software ecosystem is expanding rapidly with growing commercial ambition.
            </p>
            
            <p>
              However, this proliferation of tools is not always accompanied by rigorous analysis 
              of their legal, ethical and professional implications. In a market dominated by 
              technological promises and exaggerated claims, it is essential to have spaces for 
              critical reflection that evaluate these solutions against criteria of professional 
              responsibility, regulatory compliance and fundamental rights protection.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial notice */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h2 className="font-serif text-xl text-foreground mb-4">
              Editorial Notice
            </h2>
            <p className="text-body leading-relaxed">
              This section <strong>does not recommend products</strong> and maintains no commercial 
              agreements with software developers. <strong>It does not include affiliate links</strong>. 
              Content is published progressively, always prioritising the quality of analysis 
              over immediacy.
            </p>
          </div>
        </div>
      </section>

      {/* Tool categories */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Categories of AI Legal Software
          </h2>
          
          <div className="prose-editorial">
            <p>
              The market for artificial intelligence software applied to law encompasses 
              various functional categories. Below are the most relevant, along with 
              examples of tools operating in each area. The mention of these tools does not 
              constitute any recommendation.
            </p>
          </div>
          
          <div className="mt-10 space-y-8">
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                AI-Assisted Legal Research
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Systems employing natural language processing to facilitate the search 
                and analysis of case law, legislation and legal doctrine.
              </p>
              <p className="text-caption text-sm">
                Examples: Vincent AI (vLex), Doctrine, Lexroom
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Contract and Document Analysis
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Automated review tools that identify clauses, contractual risks and 
                deviations from standard templates.
              </p>
              <p className="text-caption text-sm">
                Examples: Robin AI
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Document Automation
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Systems for generating and managing legal documents through intelligent 
                templates, automatic assembly and standardised workflows.
              </p>
              <p className="text-caption text-sm">
                Category under editorial development
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Predictive Justice
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Tools that analyse historical judicial decisions to estimate probabilities 
                of procedural success or anticipate jurisprudential criteria. High-risk 
                category under the AI Act.
              </p>
              <p className="text-caption text-sm">
                Category under editorial development
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                E-discovery and Document Review
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Platforms for mass document analysis in litigation and investigation 
                proceedings, with classification, tagging and prioritisation capabilities 
                through machine learning.
              </p>
              <p className="text-caption text-sm">
                Category under editorial development
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Generative AI for Legal Professionals
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Language models and conversational assistants designed or adapted for 
                legal tasks: drafting briefs, summarising case files, generating contract 
                drafts. These raise specific questions of liability and human oversight.
              </p>
              <p className="text-caption text-sm">
                Category under editorial development
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Global Legal Research and Legal Data
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Platforms integrating international legal databases with analysis 
                and regulatory monitoring capabilities.
              </p>
              <p className="text-caption text-sm">
                Examples: Bloomberg Law
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial criteria */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Editorial Analysis Criteria
          </h2>
          
          <div className="prose-editorial mb-10">
            <p>
              The analyses published in this section are based on objective criteria 
              aimed at evaluating the suitability, safety and regulatory compliance of 
              AI tools in legal contexts.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Legal Risk</h3>
              <p className="text-body text-sm leading-relaxed">
                Assessment of legal risks arising from the use of the tool, including 
                potential breaches of confidentiality, advisory errors and professional 
                liability.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Human Oversight</h3>
              <p className="text-body text-sm leading-relaxed">
                Analysis of the degree of human control the tool permits and the review 
                mechanisms available to the practitioner.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Transparency</h3>
              <p className="text-body text-sm leading-relaxed">
                Assessment of the explainability of results, available technical documentation 
                and clarity regarding system operation.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Specialised Legal Data</h3>
              <p className="text-body text-sm leading-relaxed">
                Examination of the data sources employed, their currency, jurisdictional 
                coverage and technical-legal quality.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">AI Act Compliance</h3>
              <p className="text-body text-sm leading-relaxed">
                Analysis of compliance with the European Artificial Intelligence Regulation 
                and applicable obligations according to risk classification.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Professional Responsibility</h3>
              <p className="text-body text-sm leading-relaxed">
                Consideration of the impact on the lawyer's deontological responsibility 
                and on the client relationship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory framework */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            The European AI Regulation and Legal Software
          </h2>
          
          <div className="prose-editorial">
            <p>
              The European Artificial Intelligence Regulation establishes a regulatory framework 
              that directly affects numerous AI tools applied to law. Systems intended for the 
              administration of justice, assistance in legal interpretation or evidence assessment 
              may be classified as high-risk systems, with corresponding obligations regarding 
              conformity, technical documentation, risk management and human oversight.
            </p>
            
            <p>
              Both software providers and professional users—law firms, public administrations, 
              corporate legal departments—must adapt to these requirements. Ignorance of the 
              regulatory framework does not exempt compliance, and the penalties provided for 
              in the Regulation can reach significant amounts.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial positioning */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Editorial Positioning
          </h2>
          
          <div className="prose-editorial">
            <p>
              This section adopts a deliberately critical and non-promotional stance. Its 
              objective is not to compile product rankings or facilitate purchasing decisions, 
              but to offer a space for rigorous analysis where legal professionals can find 
              verified information, well-founded reflections and warnings about risks that 
              the technology industry tends to minimise.
            </p>
            
            <p>
              Derecho Artificial does not recommend products, maintains no commercial agreements 
              with software developers and does not include affiliate links. The contents of 
              this section will be published progressively, always prioritising analytical 
              quality over informational immediacy.
            </p>
          </div>
        </div>
      </section>

      {/* Final notice */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h3 className="font-serif text-xl text-foreground mb-4">
              Editorial Notice
            </h3>
            <p className="text-body leading-relaxed">
              This section is currently under development. Analyses and reflections will be 
              incorporated progressively, in accordance with the standards of rigour and 
              independence that define the editorial line of Derecho Artificial.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}