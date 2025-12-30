import { Layout } from "@/components/layout/Layout";
import { NewsCard } from "@/components/ui/NewsCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const news = [
  {
    title: "El Reglamento de IA de la UE entra en vigor con aplicación progresiva hasta 2027",
    excerpt: "La normativa europea sobre inteligencia artificial comienza su período de implementación. Los sistemas de alto riesgo tendrán hasta 2026 para cumplir con los requisitos establecidos.",
    date: "20 de diciembre, 2024",
    source: "Comisión Europea",
    href: "/noticias/reglamento-ia-vigor",
  },
  {
    title: "España crea la Agencia Estatal de Supervisión de la Inteligencia Artificial",
    excerpt: "La AESIA se convierte en la primera autoridad nacional de supervisión de IA en la Unión Europea, anticipándose a las exigencias del Reglamento de IA.",
    date: "18 de diciembre, 2024",
    source: "BOE",
    href: "/noticias/aesia-creacion",
  },
  {
    title: "Tribunal de Justicia de la UE clarifica el alcance del derecho de explicación algorítmica",
    excerpt: "Nueva sentencia establece criterios sobre la información que deben proporcionar los responsables de tratamiento en decisiones automatizadas.",
    date: "15 de diciembre, 2024",
    source: "TJUE",
    href: "/noticias/tjue-explicacion-algoritmica",
  },
  {
    title: "México presenta proyecto de ley para regular la inteligencia artificial",
    excerpt: "El Congreso mexicano debate una iniciativa que busca establecer principios éticos y requisitos de transparencia para sistemas de IA en el país.",
    date: "12 de diciembre, 2024",
    source: "Congreso de México",
    href: "/noticias/mexico-ley-ia",
  },
  {
    title: "Investigación revela sesgos de género en sistemas de IA usados en selección de personal",
    excerpt: "Un estudio académico documenta discriminación sistemática en herramientas de reclutamiento automatizado utilizadas por empresas en España y Latinoamérica.",
    date: "10 de diciembre, 2024",
    source: "Universidad Complutense",
    href: "/noticias/sesgos-genero-reclutamiento-ia",
  },
  {
    title: "Argentina avanza hacia un marco regulatorio para la IA en el sector público",
    excerpt: "El gobierno argentino publica un borrador de directrices para el uso de inteligencia artificial en la administración pública, abierto a consulta ciudadana.",
    date: "8 de diciembre, 2024",
    source: "Gobierno de Argentina",
    href: "/noticias/argentina-ia-sector-publico",
  },
  {
    title: "Consejo de Europa adopta tratado internacional sobre IA y derechos humanos",
    excerpt: "Primer tratado internacional jurídicamente vinculante que establece obligaciones para los Estados en materia de IA y protección de derechos fundamentales.",
    date: "5 de diciembre, 2024",
    source: "Consejo de Europa",
    href: "/noticias/tratado-coe-ia-derechos",
  },
  {
    title: "Colombia sanciona primera multa por uso discriminatorio de algoritmos",
    excerpt: "La Superintendencia de Industria y Comercio impone sanción a empresa por utilizar sistema de scoring crediticio con sesgos raciales documentados.",
    date: "2 de diciembre, 2024",
    source: "SIC Colombia",
    href: "/noticias/colombia-multa-algoritmo-discriminatorio",
  },
  {
    title: "Abogados británicos pierden caso tras presentar citas jurídicas inventadas por ChatGPT",
    excerpt: "Tribunal del Reino Unido sanciona a despacho de abogados que utilizó IA generativa sin verificar la existencia de precedentes citados en sus escritos.",
    date: "28 de noviembre, 2024",
    source: "Courts and Tribunals Judiciary UK",
    href: "/noticias/uk-abogados-chatgpt-citas-falsas",
  },
  {
    title: "Chile presenta estrategia nacional de inteligencia artificial actualizada",
    excerpt: "El gobierno chileno actualiza su estrategia de IA con énfasis en gobernanza ética, formación de talento y desarrollo de capacidades regulatorias.",
    date: "25 de noviembre, 2024",
    source: "Ministerio de Ciencia Chile",
    href: "/noticias/chile-estrategia-ia-2024",
  },
];

const Noticias = () => {
  return (
    <Layout>
      <section className="section-spacing">
        <div className="container-editorial">
          <header className="mb-16">
            <SectionHeading 
              title="Noticias"
              subtitle="Seguimiento contextualizado de la actualidad jurídica y regulatoria en materia de inteligencia artificial. Sin sensacionalismo, con análisis crítico."
            />
          </header>

          <div className="mb-8 p-4 bg-highlight border-l-2 border-foreground">
            <p className="text-sm text-body">
              Las noticias incluyen contexto editorial para comprender su relevancia 
              jurídica. No reproducimos comunicados de prensa sin análisis crítico.
            </p>
          </div>

          <div>
            {news.map((item) => (
              <NewsCard key={item.title} {...item} />
            ))}
          </div>

          {/* Pagination placeholder */}
          <div className="mt-12 pt-8 border-t border-divider">
            <p className="text-sm text-caption text-center">
              Mostrando las 10 noticias más recientes
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Noticias;
