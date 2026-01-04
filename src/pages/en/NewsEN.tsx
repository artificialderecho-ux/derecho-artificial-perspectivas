import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

export default function NewsEN() {
  return (
    <Layout>
      <SEOHead 
        title="News & Developments in AI Law | Derecho Artificial"
        description="Editorial coverage of regulatory, institutional and technological developments relevant to artificial intelligence law. Curated updates from institutional sources."
        canonical="https://derechoartificial.com/en/news"
      />

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">
              Regulatory updates
            </p>
            <Link 
              to="/noticias" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              Versión en español →
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            News & Developments in AI Law
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Editorial coverage of regulatory, institutional and technical developments 
            with legal relevance in the field of artificial intelligence.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
            <p>
              This section offers curated editorial coverage of significant developments 
              in AI law and regulation. We do not aggregate news automatically or republish 
              press releases. Each item is selected and analysed for its legal significance.
            </p>
            
            <p>
              Our focus is on regulatory developments, institutional positions, case law 
              and research that inform legal practice and policy understanding—not on 
              commercial product announcements or technology industry narratives.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial criteria */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Editorial criteria
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Included content
              </h3>
              <ul className="text-body text-sm space-y-2">
                <li>• European and international AI regulation</li>
                <li>• Institutional positions (EU, national authorities)</li>
                <li>• Relevant case law and judicial decisions</li>
                <li>• Official guidelines and soft law instruments</li>
                <li>• Academic research with practical implications</li>
              </ul>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Excluded content
              </h3>
              <ul className="text-body text-sm space-y-2">
                <li>• Vendor marketing and product announcements</li>
                <li>• Commercial use case presentations</li>
                <li>• Opinion pieces without legal foundation</li>
                <li>• Speculative or hype-driven content</li>
                <li>• Automated or AI-generated summaries</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* News structure */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            News structure
          </h2>
          
          <p className="text-body leading-relaxed mb-8">
            Each news item follows a consistent editorial structure designed to 
            provide legal professionals with actionable context:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Context</h3>
              <p className="text-body text-sm leading-relaxed">
                Background explaining why this development matters and how it 
                relates to the broader regulatory landscape.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Key content</h3>
              <p className="text-body text-sm leading-relaxed">
                Summary of what specifically is being published, decided or changed.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Legal relevance</h3>
              <p className="text-body text-sm leading-relaxed">
                Analysis of practical implications for law firms, in-house counsel, 
                public administration and fundamental rights.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Primary source</h3>
              <p className="text-body text-sm leading-relaxed">
                Direct link to the institutional or official source for verification 
                and further reading.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Editorial note</h3>
              <p className="text-body text-sm leading-relaxed">
                Brief critical observation providing analytical perspective without 
                promotional or speculative content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Link to Spanish version */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl text-foreground mb-4">
              Full news coverage
            </h2>
            <p className="text-body leading-relaxed mb-6">
              Complete news items with full editorial analysis are published in Spanish. 
              English summaries are provided for key developments.
            </p>
            <Link 
              to="/noticias" 
              className="inline-flex items-center gap-2 text-foreground hover:text-caption transition-colors underline underline-offset-4"
            >
              View full coverage in Spanish →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}