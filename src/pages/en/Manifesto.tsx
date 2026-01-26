import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

export default function Manifesto() {
  return (
    <Layout>
      <SEOHead 
        title="Editorial Manifesto | Derecho Artificial"
        description="Editorial principles and positioning of Derecho Artificial. An independent project committed to rigorous, ethical analysis of AI law and governance."
        canonical="https://derechoartificial.com/en/manifesto"
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">
              Editorial principles
            </p>
            <Link 
              to="/manifiesto" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              Versión en español →
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Editorial Manifesto
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            The principles that guide our approach to analysing artificial intelligence 
            within the legal and regulatory sphere.
          </p>
        </div>
      </section>

      {/* Core principles */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Core principles
          </h2>
          
          <div className="prose-editorial space-y-12">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">1. Editorial independence</h3>
              <p>
                Derecho Artificial is an independent editorial project, without commercial funding or relationships that compromise critical analysis. We do not accept sponsorships, commercial agreements or affiliate relationships with technology providers or institutions.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">2. Centrality of law</h3>
              <p>
                Legal, regulatory and normative analysis prevails over technological, commercial or speculative discourse. We prioritise institutional sources, regulatory texts and well-founded doctrinal analysis.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">3. Primacy of institutional sources</h3>
              <p>
                Public institutions, regulatory bodies, case law and official documentation constitute the basis of our analysis. Corporate or commercial sources are cited with critical context and never as primary authority.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">4. Human oversight</h3>
              <p>
                Artificial intelligence cannot substitute professional judgment in decisions affecting fundamental rights. We defend effective human supervision, not merely formal, as an inescapable requirement in sensitive legal contexts.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">5. European approach</h3>
              <p>
                The European regulatory framework—AI Act, GDPR, Charter of Fundamental Rights—constitutes the axis of our analysis. We prioritise the European regulatory perspective over more permissive models from other jurisdictions.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">6. Prudence regarding automation</h3>
              <p>
                We reject technological determinism and acceleration without reflection. The adoption of AI systems in the legal sphere requires critical risk assessment, regulatory compliance and preservation of procedural guarantees.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">7. Rigour over speed</h3>
              <p>
                We prioritise accuracy, depth and well-founded analysis over immediacy or publication by schedule. Legal rigour demands time and reflection, not hasty reactions.
              </p>
            </div>
            
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">8. Institutional neutrality</h3>
              <p>
                We maintain neutrality regarding institutions, companies and providers. Analysis is based on objective legal criteria, not institutional preferences or commercial relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What we are not */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            What Derecho Artificial is not
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Not a legal service
              </h3>
              <p className="text-body text-sm leading-relaxed">
                We do not provide legal advice, represent clients or offer professional 
                legal services. Our content is editorial and informational.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Not a technology vendor
              </h3>
              <p className="text-body text-sm leading-relaxed">
                We do not sell, license or recommend software products. Our analyses 
                of legal AI tools are critical assessments, not endorsements.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Not a news aggregator
              </h3>
              <p className="text-body text-sm leading-relaxed">
                We do not republish or aggregate external content automatically. 
                Every publication involves human editorial judgment and original analysis.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Not a consultancy
              </h3>
              <p className="text-body text-sm leading-relaxed">
                We do not offer paid consulting services, implementation support 
                or compliance certification. Our work is purely editorial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-12">
            <blockquote className="font-serif text-2xl md:text-3xl text-foreground leading-relaxed mb-6">
              "Rigour over speed, responsibility over promotion, reflection over noise."
            </blockquote>
            <p className="text-body leading-relaxed">
              This is our commitment to readers who seek informed, independent analysis 
              of artificial intelligence within the legal sphere. In a landscape dominated 
              by commercial interests and promotional narratives, we offer a space for 
              careful, critical engagement with the legal and ethical dimensions of AI.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}