import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

export default function Analysis() {
  return (
    <Layout>
      <SEOHead 
        title="Legal Analysis | Derecho Artificial"
        description="Independent legal analysis of artificial intelligence regulation, European AI Act, algorithmic governance and digital compliance from a European perspective."
        canonical="https://derechoartificial.com/en/analysis"
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">
              Legal analysis
            </p>
            <Link 
              to="/analisis" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              Versión en español →
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Legal Analysis of AI Regulation
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Rigorous examination of the regulatory framework governing artificial intelligence 
            in the European Union, with particular focus on the AI Act, GDPR and related 
            institutional guidance.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
            <p>
              The European Union has established itself as the global leader in comprehensive 
              AI regulation. The AI Act, together with existing frameworks such as the GDPR 
              and sector-specific legislation, creates an intricate legal ecosystem that 
              demands careful analysis and interpretation.
            </p>
            
            <p>
              This section provides structured legal analysis of these regulatory developments, 
              prioritising institutional sources, academic rigour and practical relevance for 
              legal professionals operating within the European legal space.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial approach */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h2 className="font-serif text-xl text-foreground mb-4">
              Editorial approach
            </h2>
            <p className="text-body leading-relaxed">
              Our analyses are grounded in primary sources: regulatory texts, official 
              guidance documents, institutional reports and academic literature. We do not 
              reproduce industry marketing or unverified claims. Where interpretation is 
              required, we distinguish clearly between established legal positions and 
              analytical commentary.
            </p>
          </div>
        </div>
      </section>

      {/* Key areas */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Areas of analysis
          </h2>
          
          <div className="space-y-8">
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                EU AI Act
              </h3>
              <p className="text-body leading-relaxed">
                Comprehensive examination of the European Union's Artificial Intelligence Act: 
                risk-based classification, prohibited practices, obligations for providers and 
                deployers, conformity assessment and governance structures.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                GDPR and AI
              </h3>
              <p className="text-body leading-relaxed">
                Intersection of data protection law with artificial intelligence: automated 
                decision-making under Article 22, lawful bases for training data, data subject 
                rights in algorithmic contexts.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Algorithmic governance
              </h3>
              <p className="text-body leading-relaxed">
                Analysis of governance frameworks for algorithmic systems: transparency 
                requirements, audit mechanisms, institutional oversight and accountability 
                structures.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Sector-specific regulation
              </h3>
              <p className="text-body leading-relaxed">
                Examination of AI regulation in specific sectors: financial services, 
                healthcare, public administration and justice. Particular attention to 
                high-risk classifications and professional obligations.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Fundamental rights
              </h3>
              <p className="text-body leading-relaxed">
                Analysis of fundamental rights implications of AI systems: non-discrimination, 
                due process, privacy, and the evolving jurisprudence of European courts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured analysis */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Featured analysis
          </h2>
          
          <div className="bg-surface p-8 md:p-10 border border-divider">
            <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">
              European regulation
            </p>
            <h3 className="font-serif text-xl md:text-2xl text-foreground mb-4">
              The EU AI Act: Legal Framework and Implications
            </h3>
            <p className="text-body leading-relaxed mb-6">
              Detailed analysis of the AI Act's risk-based architecture, from prohibited 
              practices to high-risk classifications. Examination of obligations for 
              providers, deployers and users, with particular attention to implications 
              for the legal sector.
            </p>
            <Link 
              to="/analisis/ai-act-reglamento-europeo" 
              className="inline-flex items-center gap-2 text-foreground hover:text-caption transition-colors underline underline-offset-4"
            >
              Read full analysis in Spanish →
            </Link>
          </div>
        </div>
      </section>

      {/* Link to Spanish content */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              Complete analyses
            </h2>
            <p className="text-body leading-relaxed mb-6">
              Detailed legal analyses are published progressively in Spanish. 
              This English section provides summaries and key findings for 
              an international audience.
            </p>
            <Link 
              to="/analisis" 
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
