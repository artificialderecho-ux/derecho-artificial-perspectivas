import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import libraryDocs from "../data/library-docs.json";

// Helper for source colors
const getSourceColor = (source: string) => {
  switch(source) {
    case 'AESIA': return 'bg-blue-600';
    case 'Comisión Europea': return 'bg-[#003399]'; // Azul Europa
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

const GuiasProtocolos = () => {
  const docs = libraryDocs as DocCard[];

  // Filter documents
  const aesiaDocs = docs.filter(d => d.source === 'AESIA');
  const ecDocs = docs.filter(d => d.source === 'Comisión Europea');
  
  // Static content for Soft Law / Guias (from Documentos.tsx)
  const softLawDocs: DocCard[] = [
    {
      title: "Carta Ética Europea sobre el uso de la IA en sistemas judiciales",
      description: "Cinco principios fundamentales del CEPEJ para el uso de IA en la administración de justicia: respeto a derechos fundamentales, no discriminación, calidad y seguridad, transparencia y control por el usuario.",
      source: "CEPEJ - Consejo de Europa",
      year: "2018",
      url: "https://www.coe.int/en/web/cepej/cepej-european-ethical-charter-on-the-use-of-artificial-intelligence-ai-in-judicial-systems-and-their-environment",
    },
    {
      title: "Directrices éticas para una IA fiable",
      description: "Marco ético del Grupo de Expertos de Alto Nivel de la Comisión Europea. Establece siete requisitos clave: agencia humana, robustez técnica, privacidad, transparencia, diversidad, bienestar social y rendición de cuentas.",
      source: "Comisión Europea",
      year: "2019",
      url: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai",
    },
    {
      title: "Recomendación sobre la Ética de la Inteligencia Artificial",
      description: "Primera normativa mundial sobre ética de la IA adoptada por los 193 Estados miembros de la UNESCO. Establece valores y principios comunes para guiar la construcción de marcos jurídicos.",
      source: "UNESCO",
      year: "2021",
      url: "https://www.unesco.org/es/artificial-intelligence/recommendation-ethics",
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
        Acceder al documento <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </a>
  );

  return (
    <Layout>
      <SEOHead 
        title="Guías y Protocolos | Biblioteca AESIA y Comisión Europea"
        description="Hub central de documentación oficial: Guías de la AESIA, documentos de la Comisión Europea, Soft Law y protocolos de actuación."
        canonical="https://derechoartificial.com/guias-protocolos"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/guias-protocolos" },
          { lang: "en", href: "https://derechoartificial.com/en/guides-protocols" }
        ]}
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">
            Biblioteca Digital
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Guías, Protocolos y Soft Law
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Repositorio centralizado de documentación técnica y ética de la AESIA, la Comisión Europea y organismos internacionales.
          </p>
        </div>
      </section>

      <div className="container-wide py-12 space-y-20">
        
        {/* AESIA Section */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            Agencia Española de Supervisión de la IA (AESIA)
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aesiaDocs.length > 0 ? aesiaDocs.map(renderDocCard) : (
              <p className="text-muted-foreground italic col-span-full">No hay documentos disponibles por el momento.</p>
            )}
          </div>
        </section>

        {/* European Commission Section */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            Comisión Europea
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
             {ecDocs.length > 0 ? ecDocs.map(renderDocCard) : (
              <p className="text-muted-foreground italic col-span-full">No hay documentos disponibles por el momento.</p>
            )}
          </div>
        </section>

        {/* Soft Law Section */}
        <section>
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            Soft Law y Estándares Internacionales
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {softLawDocs.map(renderDocCard)}
          </div>
        </section>

      </div>
    </Layout>
  );
};

export default GuiasProtocolos;
