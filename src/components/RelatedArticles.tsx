import React from "react";

interface Article {
  title: string;
  url: string;
  date: string;
}

export function RelatedArticles({ currentSlug }: { currentSlug: string }) {
  // Hardcoded inicial - después filtra por tags/categoría 
  const related = [
    { title: "Guía completa del AI Act", url: "/normativa/ai-act-guia-completa", date: "2026-02-08" },
    { title: "Caso iTutorGroup: Discriminación algorítmica", url: "/firma-scarpa/caso-itutorgroup", date: "2026-01-15" },
    { title: "Sentencia TSJ Canarias: IA y veracidad profesional", url: "/firma-scarpa/tsj-canarias-ia", date: "2025-12-20" },
    { title: "RGPD y Gobernanza de Datos IA", url: "/normativa/rgpd-gobernanza-datos-ia", date: "2026-02-09" }
  ].filter(r => r.url !== currentSlug).slice(0, 3);

  return (
    <section className="mt-16 border-t border-slate-200 pt-10">
      <h2 className="font-serif text-2xl font-bold mb-6 text-foreground">Artículos relacionados</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map(item => (
          <a
            key={item.url}
            href={item.url}
            className="group block border border-slate-200 rounded-lg p-5 hover:shadow-md hover:border-slate-400 transition"
          >
            <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
              {item.title}
            </h3>
            <time className="text-sm text-slate-500">{item.date}</time>
          </a>
        ))}
      </div>
    </section>
  );
}
