import { Layout } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const articles = [
  {
    title: "El AI Act y la práctica jurídica en Europa: obligaciones reales, zonas grises y riesgos operativos",
    excerpt: "Un análisis jurídico del Reglamento Europeo de Inteligencia Artificial desde la perspectiva de su aplicación práctica en despachos, departamentos legales e instituciones públicas. Más allá del texto normativo: obligaciones operativas, interacción con el RGPD y cuestiones pendientes de desarrollo.",
    date: "14 de enero, 2025",
    category: "Regulación",
    href: "/analisis/ai-act-practica-juridica",
  },
  {
    title: "Reglamento Europeo de Inteligencia Artificial (AI Act): análisis jurídico y claves para el sector legal",
    excerpt: "El AI Act establece el primer marco regulatorio integral para la inteligencia artificial en la Unión Europea. Analizamos su arquitectura normativa basada en el riesgo, las obligaciones para sistemas de alto riesgo y sus implicaciones directas para abogados, despachos y administraciones públicas.",
    date: "31 de diciembre, 2024",
    category: "Regulación",
    href: "/analisis/ai-act-reglamento-europeo",
  },
  {
    title: "La opacidad algorítmica como obstáculo al derecho de defensa",
    excerpt: "Cuando un sistema de IA influye en decisiones que afectan derechos fundamentales, la imposibilidad de conocer su funcionamiento interno plantea serios problemas constitucionales. Analizamos las tensiones entre secreto empresarial y garantías procesales.",
    date: "15 de diciembre, 2024",
    category: "Justicia Predictiva",
    href: "/analisis/opacidad-algoritmica-derecho-defensa",
  },
  {
    title: "Límites éticos del uso de IA generativa en la práctica jurídica",
    excerpt: "La utilización de modelos de lenguaje para redactar escritos judiciales exige una reflexión profunda sobre responsabilidad profesional, veracidad y el deber de diligencia del abogado.",
    date: "8 de diciembre, 2024",
    category: "Ética Profesional",
    href: "/analisis/ia-generativa-practica-juridica",
  },
  {
    title: "El Reglamento Europeo de IA: implicaciones para Latinoamérica",
    excerpt: "La normativa europea establece estándares que trascienden fronteras. Exploramos cómo el AI Act puede influir en las legislaciones de habla hispana y qué lecciones ofrece para reguladores americanos.",
    date: "1 de diciembre, 2024",
    category: "Regulación",
    href: "/analisis/reglamento-europeo-ia-latinoamerica",
  },
  {
    title: "Sesgo algorítmico en sistemas de evaluación de riesgo penal",
    excerpt: "Los sistemas como COMPAS han sido objeto de intenso debate en Estados Unidos. Examinamos las lecciones para jurisdicciones hispanohablantes que consideran implementar herramientas similares.",
    date: "22 de noviembre, 2024",
    category: "Sesgos Algorítmicos",
    href: "/analisis/sesgo-algoritmico-riesgo-penal",
  },
  {
    title: "Propiedad intelectual y obras generadas por IA: estado de la cuestión",
    excerpt: "¿Pueden las obras creadas por sistemas de inteligencia artificial ser objeto de protección por derecho de autor? Revisamos la jurisprudencia emergente y las respuestas doctrinales.",
    date: "15 de noviembre, 2024",
    category: "Propiedad Intelectual",
    href: "/analisis/propiedad-intelectual-obras-ia",
  },
  {
    title: "El deber de explicación en decisiones automatizadas: análisis del RGPD",
    excerpt: "El artículo 22 del Reglamento General de Protección de Datos establece límites a las decisiones automatizadas. Analizamos su alcance, sus lagunas y las interpretaciones judiciales recientes.",
    date: "8 de noviembre, 2024",
    category: "Protección de Datos",
    href: "/analisis/deber-explicacion-rgpd",
  },
  {
    title: "Responsabilidad civil por daños causados por sistemas de IA",
    excerpt: "Cuando un sistema autónomo causa un daño, ¿quién responde? Examinamos las propuestas de reforma legislativa y los desafíos para los regímenes tradicionales de responsabilidad.",
    date: "1 de noviembre, 2024",
    category: "Responsabilidad Civil",
    href: "/analisis/responsabilidad-civil-danos-ia",
  },
  {
    title: "Transparencia algorítmica: entre el ideal y la implementación",
    excerpt: "La exigencia de transparencia en sistemas de IA es un principio ampliamente aceptado. Sin embargo, su traducción práctica plantea desafíos técnicos, jurídicos y económicos significativos.",
    date: "25 de octubre, 2024",
    category: "Gobernanza",
    href: "/analisis/transparencia-algoritmica-implementacion",
  },
];

const Analisis = () => {
  return (
    <Layout>
      <section className="section-spacing">
        <div className="container-editorial">
          <header className="mb-16">
            <SectionHeading 
              title="Análisis"
              subtitle="Artículos en profundidad sobre las cuestiones más relevantes en la intersección del Derecho, la Ética y la Inteligencia Artificial. Análisis riguroso, independiente y accesible."
            />
          </header>

          <div className="space-y-12">
            {articles.map((article, index) => (
              <ArticleCard 
                key={article.title} 
                {...article} 
                featured={index === 0}
              />
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-16 pt-8 border-t border-divider">
            <p className="text-sm text-caption text-center">
              Mostrando los 8 análisis más recientes
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Analisis;
