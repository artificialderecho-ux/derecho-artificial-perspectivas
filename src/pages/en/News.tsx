import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

export default function News() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">
              Legal News
            </p>
            <Link 
              to="/noticias" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              ← Versión en español
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            News and Developments in Artificial Intelligence and Law
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Editorial coverage of regulatory, institutional and technological developments 
            relevant to the legal sector.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
            <p>
              This section provides an editorial selection of news on artificial intelligence 
              and law. It is not an automated aggregator nor a real-time news service, but a 
              conscious curation of developments that merit attention from a critical legal 
              perspective.
            </p>
            
            <p>
              Each publication includes editorial context that enables understanding of the 
              legal relevance of the event, beyond mere reproduction of press releases or 
              institutional notes. The objective is to provide informed coverage that 
              facilitates professional reflection.
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
              This section <strong>is not a real-time news service</strong> and is not an 
              automated publication system. While AI tools may assist in detecting relevant 
              sources, final selection and publication are always human and editorial.
            </p>
          </div>
        </div>
      </section>

      {/* Content types */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Published Content
          </h2>
          
          <div className="prose-editorial mb-10">
            <p>
              The news and developments included in this section respond to defined editorial 
              criteria, oriented towards legal relevance and professional utility.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Regulatory and Institutional Developments
              </h3>
              <p className="text-body leading-relaxed">
                European and international regulations, judicial decisions, guidelines from 
                data protection authorities, positions of public bodies and reference 
                academic publications.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Technological Developments with Real Legal Impact
              </h3>
              <p className="text-body leading-relaxed">
                Technological advances that raise concrete legal questions, documented use 
                cases and analysis of tools whose deployment affects fundamental rights or 
                professional responsibilities.
              </p>
            </div>
            
            <div className="border-l-2 border-foreground pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Reports, Guidelines and Relevant Documentation
              </h3>
              <p className="text-body leading-relaxed">
                Publications from international organisations, universities, professional 
                associations and research centres that provide well-founded perspective on 
                the intersection of AI and law.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusions */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Excluded Content
          </h2>
          
          <div className="prose-editorial mb-10">
            <p>
              Certain types of content are explicitly outside the scope of this section, 
              regardless of their dissemination in other media.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Promotional Content
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Corporate press releases, product launches or communications with 
                commercial purposes.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Statements Without Legal Relevance
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Institutional or corporate information that does not provide substantive 
                content for legal analysis.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Speculative News
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Content based on rumours, unfounded predictions or trends driven by 
                technological hype cycles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future entries placeholder */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Latest Updates
          </h2>
          
          <div className="bg-surface p-8 md:p-10 text-center">
            <p className="text-body leading-relaxed">
              News and developments will be progressively incorporated into this section, 
              in accordance with the standards of rigour and independence that define the 
              editorial line of Derecho Artificial.
            </p>
          </div>
        </div>
      </section>

      {/* Editorial positioning */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Editorial Positioning
          </h2>
          
          <div className="prose-editorial">
            <p>
              This section adopts a deliberately critical and non-promotional stance. Its 
              objective is not to compete with news agencies or aggregate content without 
              filtering, but to offer a space for informed coverage where legal professionals 
              can find verified and contextualised information.
            </p>
            
            <p>
              Derecho Artificial maintains no commercial agreements with technology companies, 
              includes no affiliate links and does not participate in promotional content 
              dissemination cycles. News selection responds exclusively to criteria of legal 
              relevance and professional utility.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}