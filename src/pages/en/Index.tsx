import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const IndexEN = () => {
  return (
    <Layout>
      <SEOHead 
        title="Derecho Artificial | Legal and Ethical Analysis of Artificial Intelligence"
        description="Independent European editorial project on AI regulation, ethics, and legal practice. Critical analysis of the EU AI Act and its implications for the legal sector."
        canonical="https://derechoartificial.com/en"
      />

      {/* Hero Section */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial text-center">
          <div className="flex justify-center mb-8">
            <Link 
              to="/" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              ← Versión en español
            </Link>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.05] mb-8">
            Derecho Artificial
          </h1>
          <p className="text-xl md:text-2xl text-body leading-relaxed max-w-2xl mx-auto font-serif italic">
            Independent legal and ethical analysis of artificial intelligence regulation in Europe.
          </p>
        </div>
      </section>

      {/* Editorial Introduction */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <div className="prose-editorial">
            <p className="text-lg md:text-xl leading-[1.9] first-letter:text-5xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-foreground">
              Derecho Artificial is an independent editorial project dedicated to critical 
              analysis of artificial intelligence within the European legal framework. Its 
              purpose is to provide rigorous, well-founded analysis of how AI regulation, 
              ethics, and legal practice intersect—free from technological enthusiasm, 
              commercial promotion, or hype-driven discourse.
            </p>
            <p className="text-lg md:text-xl leading-[1.9]">
              The project focuses on the EU regulatory model, particularly the AI Act 
              (Regulation 2024/1689), and its implications for legal professionals, 
              public administrations, and organisations deploying AI systems in high-risk 
              contexts. Editorial independence is the foundation of all analytical work.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Analysis */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <p className="text-sm uppercase tracking-widest text-caption mb-8">
            Featured Analysis
          </p>
          <div className="block">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight mb-6">
              The EU AI Act: Legal Framework and Implications
            </h2>
            <p className="text-body text-lg leading-relaxed mb-6 max-w-3xl">
              The AI Act (Regulation 2024/1689) establishes the world's first comprehensive 
              regulatory framework for artificial intelligence. Its risk-based architecture 
              categorises AI systems according to their potential impact on fundamental rights 
              and safety, imposing graduated obligations from transparency requirements to 
              strict conformity assessments for high-risk applications.
            </p>
            <p className="text-body text-lg leading-relaxed max-w-3xl">
              For the legal sector, the Regulation has particular relevance: AI systems 
              used in the administration of justice or legal interpretation may be classified 
              as high-risk, triggering significant compliance obligations. The full Spanish 
              analysis is available at 
              <Link 
                to="/analisis/ai-act-reglamento-europeo" 
                className="text-foreground underline hover:text-caption transition-colors ml-1"
              >
                Análisis del AI Act
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Key Topics */}
      <section className="section-spacing border-b border-divider">
        <div className="container-wide">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Key Areas
            </h2>
            <p className="text-body text-lg max-w-xl mx-auto">
              Critical perspectives on AI regulation and legal practice.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-divider">
            <Link 
              to="/en/legal-ai-software" 
              className="bg-background p-10 md:p-14 group hover:bg-highlight transition-colors duration-300"
            >
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                Legal AI Software
              </h3>
              <p className="text-body leading-relaxed">
                Critical evaluation of artificial intelligence tools for the legal sector 
                from an audit, ethics, and regulatory compliance perspective. No rankings, 
                no commercial recommendations.
              </p>
            </Link>
            
            <Link 
              to="/en/news" 
              className="bg-background p-10 md:p-14 group hover:bg-highlight transition-colors duration-300"
            >
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                News and Developments
              </h3>
              <p className="text-body leading-relaxed">
                Editorial coverage of regulatory, institutional, and technological 
                developments with legal relevance. Curated, not automated.
              </p>
            </Link>
            
            <Link 
              to="/en/about" 
              className="bg-background p-10 md:p-14 group hover:bg-highlight transition-colors duration-300"
            >
              <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4 group-hover:text-primary transition-colors">
                About the Project
              </h3>
              <p className="text-body leading-relaxed">
                Editorial principles, methodology, and positioning of Derecho Artificial 
                as an independent legal analysis publication.
              </p>
            </Link>
            
            <div className="bg-background p-10 md:p-14">
              <h3 className="font-serif text-xl md:text-2xl text-caption mb-4">
                Additional Content
              </h3>
              <p className="text-body leading-relaxed">
                Extended content is available in the Spanish version, including detailed 
                regulatory analysis, document repository, and editorial manifesto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* European regulatory context */}
      <section className="section-spacing border-b border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            The European Regulatory Model
          </h2>
          <div className="prose-editorial">
            <p>
              The European Union has adopted a distinctive approach to AI governance, 
              characterised by a risk-based regulatory framework, emphasis on fundamental 
              rights protection, and the principle of human oversight. This model contrasts 
              with more permissive approaches in other jurisdictions and reflects European 
              values regarding technology governance.
            </p>
            <p>
              The AI Act, together with the GDPR, the proposed AI Liability Directive, and 
              sector-specific regulations, creates a comprehensive legal ecosystem that 
              legal professionals must understand to advise clients and ensure compliance.
            </p>
            <p>
              Derecho Artificial aims to make this regulatory framework accessible to an 
              international audience, providing analysis that bridges the gap between 
              technical AI terminology and legal requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial Closing */}
      <section className="section-spacing">
        <div className="container-narrow text-center">
          <div className="mb-12">
            <p className="font-serif text-2xl md:text-3xl text-foreground leading-[1.4] italic">
              "Rigour over speed, responsibility over promotion, 
              reflection over noise."
            </p>
          </div>
          <div className="prose-editorial text-center mx-auto">
            <p>
              In an environment where immediacy prevails over precision and technological 
              enthusiasm replaces critical analysis, Derecho Artificial is committed to 
              a measured, well-founded approach to understanding AI's impact on law and rights.
            </p>
            <p className="text-caption text-sm mt-8">
              This project does not accept sponsorships or commercial agreements that 
              would compromise its editorial independence.
            </p>
          </div>
          <div className="mt-14">
            <Link 
              to="/en/about" 
              className="inline-flex items-center text-sm font-medium tracking-wide text-caption hover:text-foreground transition-colors duration-300 uppercase"
            >
              About the project
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexEN;
