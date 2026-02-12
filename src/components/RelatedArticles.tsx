import React from "react";

interface Article {
  title: string;
  url: string;
  date: string;
}

export function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  // Versión simple inicial con artículos destacados/recientes
  const articles: Article[] = [
    {
      title: "Sentencia BOSCO: Transparencia Algorítmica y Código Fuente",
      url: "/jurisprudencia/sentencia-bosco-transparencia-algoritmica",
      date: "30 de enero de 2026",
    },
    {
      title: "Guía del Reglamento de IA (AI Act) para empresas",
      url: "/recursos/guias/guia-reglamento-ia-empresas",
      date: "15 de enero de 2026",
    },
    {
      title: "La responsabilidad civil en la era de la IA",
      url: "/firma-scarpa/responsabilidad-civil-ia",
      date: "10 de enero de 2026",
    },
    {
      title: "Impacto del Reglamento de IA en el RGPD",
      url: "/actualidad-ia/impacto-reglamento-ia-rgpd",
      date: "5 de enero de 2026",
    },
  ];

  const related = articles.filter((r) => !r.url.includes(currentSlug)).slice(0, 2);

  return (
    <section className="mt-12 border-t border-slate-200 pt-8">
      <h2 className="font-serif text-2xl font-bold mb-6 text-foreground">Artículos relacionados</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {related.map((item) => (
          <a
            key={item.url}
            href={item.url}
            className="group block p-6 bg-slate-50 border border-slate-200 rounded-sm hover:border-slate-400 transition-colors"
          >
            <h3 className="font-serif text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <time className="text-sm text-slate-500">{item.date}</time>
          </a>
        ))}
      </div>
    </section>
  );
}
