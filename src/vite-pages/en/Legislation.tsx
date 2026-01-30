import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

// Static Normativa content (English)
const normativaDocs = [
  {
    title: "Regulation (EU) 2024/1689 - Artificial Intelligence Act (AI Act)",
    description: "First comprehensive EU regulatory framework on artificial intelligence. Establishes a risk-based architecture, obligations for high-risk systems, and direct implications for lawyers, firms, and public administrations.",
    type: "EU Regulation",
    source: "Official Journal of the European Union",
    year: "2024",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
  },
  {
    title: "Regulation (EU) 2016/679 - General Data Protection Regulation (GDPR)",
    description: "European regulatory framework on personal data protection. Essential for understanding data processing obligations in AI systems and data subject rights.",
    type: "EU Regulation",
    source: "EUR-Lex",
    year: "2016",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679",
  },
  {
    title: "Proposal for a Directive on AI Liability",
    description: "Legislative proposal to adapt non-contractual civil liability rules to damages caused by artificial intelligence systems.",
    type: "Legislative Proposal",
    source: "European Commission",
    year: "2022",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022PC0496",
  },
  {
    title: "Directive (EU) 2019/770 on contracts for the supply of digital content and digital services",
    description: "Regulates contracts for the supply of digital content and services, with implications for AI software marketed as a service.",
    type: "EU Directive",
    source: "EUR-Lex",
    year: "2019",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0770",
  }
];

const Legislation = () => {
  return (
    <Layout>
      <SEOHead 
        title="AI Legislation & Digital Regulations | Derecho Artificial"
        description="Repository of primary European and national regulations: AI Act, GDPR, Liability Directives, and technology legislation."
        canonical="https://derechoartificial.com/en/legislation"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/legislacion" },
          { lang: "en", href: "https://derechoartificial.com/en/legislation" }
        ]}
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">
            Regulatory Framework
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Legislation & Primary Law
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Direct access to fundamental legal texts regulating artificial intelligence and the digital environment in Europe.
          </p>
        </div>
      </section>

      <div className="container-wide py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {normativaDocs.map((doc) => (
            <a 
              key={doc.url} 
              href={doc.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block bg-card p-8 border border-border rounded-sm hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 text-xs uppercase tracking-wider text-white font-medium rounded-sm bg-indigo-600">
                  {doc.type}
                </span>
                <span className="text-sm text-muted-foreground font-mono bg-surface px-2 py-1 rounded-sm">
                  {doc.year}
                </span>
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                {doc.title}
              </h3>
              <p className="text-body leading-relaxed mb-6">
                {doc.description}
              </p>
              <div className="flex items-center text-sm font-medium text-primary uppercase tracking-wider border-t border-border pt-4 mt-auto">
                Consult Official Text <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Legislation;