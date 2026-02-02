import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { NewsCard } from "@/components/ui/NewsCard";
import latestNews from "@/data/latest-news.json";

// Interfaces
interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
  tags: string[];
  image?: string;
}

interface EditorialNews extends NewsItem {
  context: string;
  keyContent: string;
  legalRelevance: string;
  editorialNote: string;
}

// Static Editorial Content (English)
const EDITORIAL_NEWS: EditorialNews[] = [
  {
    id: 'ed-1',
    title: "AI Act Enters into Force: First Obligations for Operators",
    source: 'EUR-Lex',
    date: "January 2025",
    url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
    summary: "Entry into force of the AI Regulation.",
    tags: ["AI Act", "Compliance", "EU"],
    context: "Following its final approval and publication in the Official Journal, the Artificial Intelligence Act (AI Act) marks the beginning of the staggered compliance schedule for all Member States.",
    keyContent: "Immediate prohibition of unacceptable risk practices is activated (6-month deadline) and foundations for general-purpose AI model governance are established (12 months).",
    legalRelevance: "Companies and public entities must initiate AI system inventory audits to determine their risk classification under the new regulatory framework.",
    editorialNote: "It is crucial not to wait for final deadlines; adapting complex systems requires months of technical and legal preparation. Regulatory surveillance will be strict from day one."
  },
  {
    id: 'ed-2',
    title: "Publication of Collective Work 'Artificial Intelligence and Philosophy of Law'",
    source: 'Other',
    date: "January 23, 2025",
    url: "/en/scarpa-firm/philosophy-law-ai",
    summary: "Academic publication on the impact of AI.",
    tags: ["Philosophy of Law", "Research", "AI"],
    context: "Launch of a collaborative work bringing together legal experts and philosophers to debate the ontological and ethical challenges of AI.",
    keyContent: "Analysis on the moral agency of algorithms, civil liability in autonomous systems, and algorithmic interpretation of the law.",
    legalRelevance: "Provides the necessary theoretical framework to interpret legal gaps that current regulations do not yet cover.",
    editorialNote: "Recommended reading for jurists seeking to understand the 'why' behind new regulations."
  }
];

const AiNews = () => {
  const apiNews: NewsItem[] = latestNews as NewsItem[];

  const getSourceColor = (source: string) => {
    switch(source) {
      case 'AESIA': return 'bg-blue-600';
      case 'EUR-Lex': return 'bg-indigo-600';
      case 'Comisión Europea': return 'bg-[#003399]';
      case 'CEPEJ': return 'bg-purple-600';
      case 'Abogacía Española': return 'bg-red-700';
      default: return 'bg-slate-500';
    }
  };

  const groupedNews: Record<string, NewsItem[]> = apiNews.reduce(
    (acc, item) => {
      if (!acc[item.source]) {
        acc[item.source] = [];
      }
      acc[item.source].push(item);
      return acc;
    },
    {} as Record<string, NewsItem[]>,
  );

  const orderedSources = [
    'Comisión Europea',
    'AESIA',
    'EUR-Lex',
    'CEPEJ',
    'Abogacía Española',
  ];

  const sources = [
    ...orderedSources.filter((source) => groupedNews[source]?.length),
    ...Object.keys(groupedNews).filter((source) => !orderedSources.includes(source)),
  ];

  return (
    <Layout>
      <SEOHead 
        title="AI News: Regulatory Analysis & Updates | Derecho Artificial"
        description="Real-time tracking of the AI Act, AESIA, and legislative news on artificial intelligence in Spain and Europe."
        canonical="https://derechoartificial.com/en/ai-news"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/actualidad-ia" },
          { lang: "en", href: "https://derechoartificial.com/en/ai-news" }
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">
              News & Updates
            </p>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Regulatory Monitor & AI News
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Tracking legislative activity, relevant rulings, and movements from AESIA and the European Commission.
          </p>
        </div>
      </section>

      {/* Editorial Analysis */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            Editorial Analysis
          </h2>
          <div className="space-y-12">
            {EDITORIAL_NEWS.map((item) => (
              <article key={item.id} className="bg-card p-6 md:p-8 border border-border rounded-sm shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-1 text-[10px] uppercase tracking-wider text-white font-medium ${getSourceColor(item.source)}`}>
                        {item.source}
                      </span>
                      <time className="text-xs text-muted-foreground">{item.date}</time>
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif text-foreground mb-3">
                      <a href={item.url} target={item.url.startsWith('/') ? "_self" : "_blank"} rel="noreferrer" className="hover:text-primary transition-colors">
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-body mb-4">{item.context}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6 p-4 bg-surface/50 border-l-2 border-primary/20">
                      <div>
                        <h4 className="text-xs font-bold uppercase text-caption mb-2">Key Points</h4>
                        <p className="text-sm text-body">{item.keyContent}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-caption mb-2">Legal Impact</h4>
                        <p className="text-sm text-body">{item.legalRelevance}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-sm italic text-muted-foreground">
                        <span className="font-semibold not-italic text-primary">Editorial Note: </span>
                        {item.editorialNote}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Updates Feed */}
      <section className="py-12 border-t border-divider bg-surface/30">
        <div className="container-narrow">
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            Latest Official Updates
          </h2>
          <div className="space-y-10">
            {sources.map((source) => (
              <div key={source} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-1 text-[10px] uppercase tracking-wider text-white font-medium ${getSourceColor(
                      source,
                    )}`}
                  >
                    {source}
                  </span>
                </div>
                <div className="grid gap-6">
                  {groupedNews[source]?.slice(0, 2).map((item) => (
                    <NewsCard
                      key={item.id}
                      title={item.title}
                      source={item.source}
                      date={item.date}
                      url={item.url}
                      summary={item.summary}
                      tags={item.tags}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AiNews;