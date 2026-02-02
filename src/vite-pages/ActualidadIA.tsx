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

// Extended interface for Editorial News (compatible with NewsCard)
interface EditorialNews extends NewsItem {
  context: string;
  keyContent: string;
  legalRelevance: string;
  editorialNote: string;
}

// Static Editorial Content (High value content with full analysis)
const EDITORIAL_NEWS: EditorialNews[] = [
  {
    id: 'ed-1',
    title: "El AI Act entra en vigor: primeras obligaciones para operadores",
    source: 'EUR-Lex',
    date: "Enero 2025",
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32024R1689",
    summary: "Entrada en vigor del Reglamento de IA.",
    tags: ["AI Act", "Compliance", "UE"],
    context: "Tras su aprobación final y publicación en el Diario Oficial, el Reglamento de Inteligencia Artificial (AI Act) marca el inicio del cronograma de cumplimiento escalonado para todos los Estados miembros.",
    keyContent: "Se activa la prohibición inmediata de prácticas de riesgo inaceptable (plazo de 6 meses) y se establecen las bases para la gobernanza de modelos de IA de propósito general (12 meses).",
    legalRelevance: "Las empresas y entidades públicas deben iniciar auditorías de inventario de sistemas de IA para determinar su clasificación de riesgo bajo el nuevo marco regulatorio.",
    editorialNote: "Es crucial no esperar a los plazos finales; la adaptación de sistemas complejos requiere meses de preparación técnica y legal. La vigilancia regulatoria será estricta desde el primer día."
  },
  {
    id: 'ed-2',
    title: "Publicación de la obra colectiva 'Inteligencia Artificial y Filosofía del Derecho'",
    source: 'Other',
    date: "23 de enero, 2025",
    url: "/firma-scarpa/filosofia-derecho-inteligencia-artificial", // Updated internal link if applicable, or keep as is if it redirects
    summary: "Publicación académica sobre el impacto de la IA.",
    tags: ["Filosofía del Derecho", "Investigación", "IA"],
    context: "Lanzamiento de una obra colaborativa que reúne a expertos juristas y filósofos para debatir sobre los retos ontológicos y éticos de la IA.",
    keyContent: "Análisis sobre la agencia moral de los algoritmos, la responsabilidad civil en sistemas autónomos y la interpretación algorítmica de la ley.",
    legalRelevance: "Provee el marco teórico necesario para interpretar las lagunas legales que la normativa actual aún no cubre.",
    editorialNote: "Lectura recomendada para juristas que buscan comprender el 'por qué' detrás de las nuevas regulaciones."
  }
];

const ActualidadIA = () => {
  // Static data import for better performance (SSG-like behavior)
  const apiNews: NewsItem[] = latestNews as NewsItem[];

  // Helper for source colors
  const getSourceColor = (source: string) => {
    switch(source) {
      case 'AESIA': return 'bg-blue-600';
      case 'EUR-Lex': return 'bg-indigo-600';
      case 'Comisión Europea': return 'bg-[#003399]'; // Azul Europa
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
        title="Actualidad IA: Noticias y Análisis Regulatorio | Derecho Artificial"
        description="Seguimiento en tiempo real del Reglamento de IA, AESIA y novedades legislativas sobre inteligencia artificial en España y Europa."
        canonical="https://derechoartificial.com/actualidad-ia"
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
              Actualidad y Noticias
            </p>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Monitor Regulatorio y Novedades IA
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Seguimiento de la actividad legislativa, sentencias relevantes y movimientos de la AESIA y la Comisión Europea.
          </p>
        </div>
      </section>

      {/* Editorial Analysis */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="text-2xl font-serif text-foreground mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            Análisis Editorial
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
                        <h4 className="text-xs font-bold uppercase text-caption mb-2">Claves</h4>
                        <p className="text-sm text-body">{item.keyContent}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase text-caption mb-2">Impacto Legal</h4>
                        <p className="text-sm text-body">{item.legalRelevance}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border/50">
                      <p className="text-sm italic text-muted-foreground">
                        <span className="font-semibold not-italic text-primary">Nota editorial: </span>
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
            Últimas Actualizaciones Oficiales
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

export default ActualidadIA;