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
          
          <div className="space-y-10">
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-xl text-foreground mb-3">
                Rigour over speed
              </h3>
              <p className="text-body leading-relaxed">
                We prioritise accuracy, depth and careful analysis over the urgency of breaking news. 
                Legal and regulatory matters demand thoughtful consideration, not reactive commentary. 
                We publish when we have something substantive to contribute, not to meet arbitrary 
                publishing schedules.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-xl text-foreground mb-3">
                Independence over influence
              </h3>
              <p className="text-body leading-relaxed">
                Derecho Artificial operates without commercial partnerships, sponsorships, 
                affiliate arrangements or vendor relationships. This independence is not merely 
                a preference but a fundamental condition for credible analysis of a sector 
                dominated by commercial interests and promotional narratives.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-xl text-foreground mb-3">
                Institutional sources over corporate claims
              </h3>
              <p className="text-body leading-relaxed">
                We favour official regulatory documents, academic research, court decisions 
                and institutional publications over press releases, white papers or marketing 
                materials. When we reference industry sources, we do so critically and with 
                appropriate context.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-xl text-foreground mb-3">
                European legal framework
              </h3>
              <p className="text-body leading-relaxed">
                Our analysis centres on the European Union's regulatory approach to artificial 
                intelligence, with particular attention to the AI Act, GDPR, and related 
                frameworks. We approach these matters from a legal tradition that prioritises 
                fundamental rights, democratic accountability and human oversight.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-xl text-foreground mb-3">
                Critical engagement, not promotion
              </h3>
              <p className="text-body leading-relaxed">
                We analyse AI systems and their legal implications with a critical lens. 
                We do not promote products, recommend vendors or participate in the 
                technology industry's promotional cycles. Our role is to inform and 
                analyse, not to advocate for adoption.
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