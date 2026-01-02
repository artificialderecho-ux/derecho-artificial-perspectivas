import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const IndexEN = () => {
  return (
    <Layout>
      <SEOHead 
        title="Derecho Artificial | Legal and Ethical Analysis of Artificial Intelligence"
        description="Independent editorial project dedicated to critical analysis of Law, ethics and legal practice in the age of artificial intelligence."
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
            Independent legal and ethical analysis of artificial intelligence in the legal sector.
          </p>
        </div>
      </section>

      {/* Editorial Introduction */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <div className="prose-editorial">
            <p className="text-lg md:text-xl leading-[1.9] first-letter:text-5xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-foreground">
              Derecho Artificial is an independent editorial project dedicated to critical 
              analysis of artificial intelligence in the legal domain. Its purpose is to 
              offer a space for rigorous reflection, removed from technological enthusiasm 
              and promotional discourse, where legal professionals and informed citizens 
              can find well-founded analysis of the transformations that AI introduces 
              in regulation, ethics and legal practice.
            </p>
            <p className="text-lg md:text-xl leading-[1.9]">
              This project does not seek to celebrate or demonise technology. It seeks 
              to understand it, contextualise it legally and subject it to the critical 
              scrutiny demanded by its growing influence on decisions affecting fundamental 
              rights and freedoms. Editorial independence is the foundation of all 
              analytical activity.
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
          <Link to="/analisis/ai-act-reglamento-europeo" className="block group">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-tight group-hover:text-muted-foreground transition-colors duration-300 mb-6">
              European Artificial Intelligence Regulation (AI Act): Legal Analysis
            </h2>
            <p className="text-body text-lg leading-relaxed mb-6 max-w-3xl">
              The AI Act establishes the first comprehensive regulatory framework for 
              artificial intelligence in the European Union. This analysis examines its 
              risk-based normative architecture, obligations for high-risk systems and 
              implications for legal practice and public administrations.
            </p>
            <span className="inline-flex items-center text-sm text-caption group-hover:text-foreground transition-colors duration-300">
              Access the analysis
              <span className="ml-2">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* Areas of Analysis */}
      <section className="section-spacing border-b border-divider">
        <div className="container-wide">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4">
              Areas of Analysis
            </h2>
            <p className="text-body text-lg max-w-xl mx-auto">
              Areas of convergence between Law and artificial intelligence.
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
                from an audit and regulatory compliance perspective.
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
                Editorial coverage of regulatory, institutional and technological 
                developments with legal relevance in the field of AI.
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
                Editorial principles, methodology and positioning of Derecho Artificial 
                as an independent legal analysis publication.
              </p>
            </Link>
            
            <div className="bg-background p-10 md:p-14">
              <h3 className="font-serif text-xl md:text-2xl text-caption mb-4">
                More Sections
              </h3>
              <p className="text-body leading-relaxed">
                Additional content is available in the Spanish version, with translations 
                being progressively incorporated according to editorial priorities.
              </p>
            </div>
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
              a serene and well-founded approach to the transformations of the legal sector.
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
