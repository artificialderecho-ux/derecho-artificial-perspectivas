import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import libraryDocs from "../../data/library-docs.json";

// Helper for source colors
const getSourceColor = (source: string) => {
  switch(source) {
    case 'AESIA': return 'bg-blue-600';
    case 'Comisión Europea': return 'bg-[#003399]';
    default: return 'bg-slate-500';
  }
};

type DocCard = {
  title: string;
  description: string;
  source: string;
  url: string;
  date?: string;
  year?: string;
};

const GuidesProtocols = () => {
  const docs = libraryDocs as DocCard[];

  // Filter documents
  const aesiaDocs = docs.filter(d => d.source === 'AESIA');
  const ecDocs = docs.filter(d => d.source === 'Comisión Europea');
  
  // Static content for Soft Law (English)
  const softLawDocs: DocCard[] = [
    {
      title: "European Ethical Charter on the Use of AI in Judicial Systems",
      description: "Five fundamental CEPEJ principles for AI use in justice administration: respect for fundamental rights, non-discrimination, quality and security, transparency, and user control.",
      source: "CEPEJ - Council of Europe",
      year: "2018",
      url: "https://www.coe.int/en/web/cepej/cepej-european-ethical-charter-on-the-use-of-artificial-intelligence-ai-in-judicial-systems-and-their-environment",
    },
    {
      title: "Ethics Guidelines for Trustworthy AI",
      description: "Ethical framework from the EU High-Level Expert Group. Establishes seven key requirements: human agency, technical robustness, privacy, transparency, diversity, social well-being, and accountability.",
      source: "European Commission",
      year: "2019",
      url: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai",
    },
    {
      title: "Recommendation on the Ethics of Artificial Intelligence",
      description: "First global standard on AI ethics adopted by 193 UNESCO Member States. Establishes common values and principles to guide the construction of legal frameworks.",
      source: "UNESCO",
      year: "2021",
      url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
    }
  ];

  const renderDocCard = (doc: DocCard) => (
    <a 
      key={doc.url} 
      href={doc.url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group block bg-card p-6 border border-border rounded-sm hover:border-primary transition-all duration-300 hover:shadow-md"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2 py-1 text-[10px] uppercase tracking-wider text-white font-medium rounded-sm ${getSourceColor(doc.source)}`}>
          {doc.source}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {doc.year || doc.date?.split('-')[0]}
        </span>
      </div>
      <h3 className="font-serif text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
        {doc.title}
      </h3>
      <p className="text-sm text-body leading-relaxed mb-4">
        {doc.description}
      </p>
      <div className="flex items-center text-xs font-medium text-primary uppercase tracking-wider">
        Access Document <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </a>
  );

  return (
    <Layout>
      <SEOHead 
        title="Guides & Protocols | AESIA Library & European Commission"
        description="Central hub for official documentation: AESIA Guides, European Commission documents, Soft Law, and action protocols."
        canonical="https://derechoartificial.com/en/guides-protocols"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/guias-protocolos" },
          { lang: "en", href: "https://derechoartificial.com/en/guides-protocols" }
        ]}
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">
            Digital Library
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Guides, Protocols & Soft Law
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Centralized repository of technical and ethical documentation from AESIA, the European Commission, and international bodies.
          </p>
        </div>
      </section>

      <div className="container-wide py-12 space-y-20">
        
        {/* AESIA Section */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            Spanish AI Supervision Agency (AESIA)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aesiaDocs.length > 0 ? aesiaDocs.map(renderDocCard) : (
              <p className="text-muted-foreground italic col-span-full">No documents available at the moment.</p>
            )}
          </div>
        </section>

        {/* European Commission Section */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            European Commission
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {ecDocs.length > 0 ? ecDocs.map(renderDocCard) : (
              <p className="text-muted-foreground italic col-span-full">No documents available at the moment.</p>
            )}
          </div>
        </section>

        {/* Soft Law Section */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            Soft Law & International Standards
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softLawDocs.map(renderDocCard)}
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default GuidesProtocols;
