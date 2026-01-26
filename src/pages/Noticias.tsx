import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { NewsCard } from "@/components/ui/NewsCard";
import { Link } from "react-router-dom";
import latestNews from "@/data/latest-news.json";

// Assets moved to public/images for better reliability
// import heroBg from "@/assets/hero-abstract-bg.jpg";
// import sectionLegalAi from "@/assets/section-legal-ai.jpg";

import { Helmet } from "react-helmet-async";

// Interfaces
interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  url: string;
  summary: string;
  tags: string[];
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
    url: "/analisis/filosofia-derecho-inteligencia-artificial",
    summary: "Publicación académica sobre el impacto de la IA.",
    tags: ["Filosofía del Derecho", "Investigación", "IA"],
    context: "Lanzamiento de una obra colaborativa que reúne a expertos juristas y filósofos para debatir sobre los retos ontológicos y éticos de la IA.",
    keyContent: "Análisis sobre la agencia moral de los algoritmos, la responsabilidad civil en sistemas autónomos y la interpretación algorítmica de la ley.",
    legalRelevance: "Provee el marco teórico necesario para interpretar las lagunas legales que la normativa actual aún no cubre.",
    editorialNote: "Lectura recomendada para juristas que buscan comprender el 'por qué' detrás de las nuevas regulaciones."
  }
];

const Noticias = () => {
  // v1.2 - Image support restored
  // Static data import for better performance (SSG-like behavior)
  const apiNews: NewsItem[] = latestNews as NewsItem[];

  // Agrupación por categorías para renderizado
  const noticiasPorCategoria = {
    "Análisis Editorial y Jurídico": EDITORIAL_NEWS,
    "Últimas Actualizaciones Oficiales": apiNews
  };

  // Helper for source colors
  const getSourceColor = (source: string) => {
    switch(source) {
      case 'AESIA': return 'bg-blue-600';
      case 'EUR-Lex': return 'bg-indigo-600';
      case 'Comisión Europea': return 'bg-[#003399]'; // Azul Europa
      default: return 'bg-slate-500';
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Noticias y Actualidad Jurídica IA | Derecho Artificial"
        description="Seguimiento de desarrollos regulatorios (AESIA, UE) y análisis editorial sobre inteligencia artificial y Derecho."
        canonical="https://derechoartificial.com/noticias"
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">
              Actualidad jurídica
            </p>
            <Link 
              to="/en/news" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              English version →
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            Noticias y desarrollos en Derecho e Inteligencia Artificial
          </h1>
          <p className="text-xl text-body leading-relaxed">
            Seguimiento editorial de desarrollos regulatorios, institucionales y técnicos con relevancia jurídica.
          </p>
        </div>
      </section>

      {/* Sección 1: Feed Automatizado (Oficiales) - MovidO AL PRINCIPIO por jerarquía visual */}
      <section className="py-16 border-t border-divider bg-[#F8FAFC]">
        <div className="container-narrow">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="font-serif text-2xl text-[#0F172A]">Últimas actualizaciones oficiales</h2>
            <span className="text-xs text-gray-500 uppercase tracking-wider">(Tiempo Real)</span>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-3 space-y-10">
            {noticiasPorCategoria["Últimas Actualizaciones Oficiales"].length > 0 ? (
              noticiasPorCategoria["Últimas Actualizaciones Oficiales"].map((item) => (
                <div key={item.id} className="relative pl-8">
                  {/* Timeline dot */}
                  <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white ${getSourceColor(item.source)}`}></div>
                  
                  <div className="mb-2 flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500">{item.date}</span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white rounded-sm ${getSourceColor(item.source)}`}>
                      {item.source}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-serif font-medium text-slate-900 mb-2">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 hover:underline transition-colors">
                      {item.title}
                    </a>
                  </h3>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-3 max-w-2xl">
                    {item.summary}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {item.tags.map(tag => (
                      <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    Ver fuente oficial
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              ))
            ) : (
               <div className="pl-8">
                 <p className="text-gray-500">No hay actualizaciones recientes disponibles en este momento.</p>
               </div>
            )}
          </div>
        </div>
      </section>

      {/* Sección 2: Análisis Editorial (Anteriormente primera) */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl text-foreground mb-10 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-foreground"></span>
            Análisis Editorial Destacado
          </h2>
          
          <div className="space-y-12">
            {noticiasPorCategoria["Análisis Editorial y Jurídico"].map((item) => (
              <NewsCard 
                key={item.id}
                title={item.title}
                date={item.date}
                source={item.source}
                sourceUrl={item.url}
                image={item.image}
                tags={item.tags}
                context={item.context}
                keyContent={item.keyContent}
                legalRelevance={item.legalRelevance}
                editorialNote={item.editorialNote}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Editorial criteria (Footer/Secondary) */}
      <section className="py-12 border-t border-divider bg-surface">
        <div className="container-narrow">
          <div className="bg-white p-8 md:p-10 border border-divider">
            <h2 className="font-serif text-xl text-foreground mb-4">
              Fuentes y Metodología
            </h2>
            <p className="text-body text-sm mb-4">
              Esta sección combina análisis editorial profundo (curado manualmente) con un agregador automatizado que monitoriza diariamente fuentes oficiales como AESIA, EUR-Lex y la Comisión Europea.
            </p>
            <h3 className="font-medium text-sm text-foreground mt-6 mb-2">Exclusiones</h3>
            <p className="text-caption text-xs">
              No indexamos notas de prensa corporativas, anuncios comerciales ni contenido generado sin revisión humana. Priorizamos fuentes primarias legislativas y papers académicos.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Noticias;
