
 export function RelatedArticles({ currentSlug }: { currentSlug: string }) { 
   // Por ahora 3 ejemplos hardcoded – después filtra por tags o categoría 
   const related = [ 
     { title: "Guía completa del AI Act", url: "/normativa/ai-act-guia-completa", date: "2025-12-10" }, 
     { title: "RGPD en la era de la IA", url: "/normativa/rgpd-gobernanza-datos-ia", date: "2026-01-05" }, 
     { title: "Caso TSJ Canarias: citas falsas por IA", url: "/firma-scarpa/analisis-sentencia-tsj-canarias", date: "2025-11-20" }, 
   ].filter(item => item.url !== `/firma-scarpa/${currentSlug}`); 
 
   return ( 
     <section className="mt-16 border-t pt-10"> 
       <h2 className="text-2xl font-bold mb-6">Artículos relacionados</h2> 
       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> 
         {related.map((item) => ( 
           <a key={item.url} href={item.url} className="block border rounded-lg p-5 hover:shadow-md transition"> 
             <h3 className="font-semibold text-lg mb-2">{item.title}</h3> 
             <time className="text-sm text-gray-500">{item.date}</time> 
           </a> 
         ))} 
       </div> 
     </section> 
   ); 
 } 
