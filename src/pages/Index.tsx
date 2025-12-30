import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { AmbitoCard } from "@/components/ui/AmbitoCard";
import { Link } from "react-router-dom";
import { Scale, Brain, Shield, Users, Gavel, BookOpen } from "lucide-react";

const ambitos = [
  {
    title: "Justicia Predictiva",
    description: "Análisis de sistemas de IA aplicados a la predicción de resoluciones judiciales y sus implicaciones para el debido proceso.",
    icon: Scale,
    href: "/analisis",
  },
  {
    title: "Protección de Datos",
    description: "Intersección entre privacidad, protección de datos personales y el desarrollo de sistemas de inteligencia artificial.",
    icon: Shield,
    href: "/analisis",
  },
  {
    title: "IA Generativa y Autoría",
    description: "Cuestiones de propiedad intelectual, derechos de autor y responsabilidad en contenidos generados por IA.",
    icon: Brain,
    href: "/analisis",
  },
  {
    title: "Sesgos Algorítmicos",
    description: "Discriminación, equidad y transparencia en sistemas automatizados de toma de decisiones.",
    icon: Users,
    href: "/analisis",
  },
  {
    title: "Regulación Europea",
    description: "Reglamento de IA de la UE, directivas y normativas aplicables al ecosistema hispanohablante.",
    icon: Gavel,
    href: "/documentos",
  },
  {
    title: "Ética Profesional",
    description: "Responsabilidad del abogado ante herramientas de IA y límites deontológicos de su uso.",
    icon: BookOpen,
    href: "/analisis",
  },
];

const recentArticles = [
  {
    title: "La opacidad algorítmica como obstáculo al derecho de defensa",
    excerpt: "Cuando un sistema de IA influye en decisiones que afectan derechos fundamentales, la imposibilidad de conocer su funcionamiento interno plantea serios problemas constitucionales. Analizamos las tensiones entre secreto empresarial y garantías procesales.",
    date: "15 de diciembre, 2024",
    category: "Justicia Predictiva",
    href: "/analisis",
  },
  {
    title: "Límites éticos del uso de IA generativa en la práctica jurídica",
    excerpt: "La utilización de modelos de lenguaje para redactar escritos judiciales exige una reflexión profunda sobre responsabilidad profesional, veracidad y el deber de diligencia del abogado.",
    date: "8 de diciembre, 2024",
    category: "Ética Profesional",
    href: "/analisis",
  },
  {
    title: "El Reglamento Europeo de IA: implicaciones para Latinoamérica",
    excerpt: "La normativa europea establece estándares que trascienden fronteras. Exploramos cómo el AI Act puede influir en las legislaciones de habla hispana y qué lecciones ofrece para reguladores americanos.",
    date: "1 de diciembre, 2024",
    category: "Regulación",
    href: "/analisis",
  },
];

const recentDocuments = [
  {
    title: "Reglamento (UE) 2024/1689 del Parlamento Europeo",
    description: "Reglamento por el que se establecen normas armonizadas en materia de inteligencia artificial (Reglamento de Inteligencia Artificial).",
    type: "Reglamento UE",
    source: "Diario Oficial de la Unión Europea",
    year: "2024",
  },
  {
    title: "Principios para la Gobernanza de la IA",
    description: "Directrices sobre inteligencia artificial centrada en el ser humano para sistemas judiciales.",
    type: "Directrices",
    source: "CEPEJ - Consejo de Europa",
    year: "2023",
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
            Derecho e inteligencia artificial: análisis crítico para el mundo hispanohablante
          </h1>
          <p className="text-lg md:text-xl text-body leading-relaxed max-w-3xl">
            Un espacio editorial independiente dedicado al estudio riguroso de las implicaciones 
            jurídicas, éticas y sociales de la inteligencia artificial. Sin concesiones al 
            sensacionalismo, con compromiso hacia la reflexión profunda y el pensamiento crítico.
          </p>
          <div className="mt-10">
            <Link 
              to="/manifiesto" 
              className="inline-flex items-center text-sm text-caption hover:text-foreground transition-colors"
            >
              Leer nuestro manifiesto editorial →
            </Link>
          </div>
        </div>
      </section>

      {/* Ámbitos de Análisis */}
      <section className="section-spacing border-b border-divider">
        <div className="container-wide">
          <SectionHeading 
            title="Ámbitos de análisis"
            subtitle="Las áreas fundamentales donde el Derecho y la inteligencia artificial convergen, exigiendo nuevas respuestas jurídicas y éticas."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ambitos.map((ambito) => (
              <AmbitoCard key={ambito.title} {...ambito} />
            ))}
          </div>
        </div>
      </section>

      {/* Análisis Recientes */}
      <section className="section-spacing border-b border-divider">
        <div className="container-editorial">
          <SectionHeading 
            title="Análisis recientes"
            subtitle="Artículos en profundidad sobre las cuestiones más relevantes en la intersección del Derecho y la IA."
          />
          
          <div className="space-y-12">
            {recentArticles.map((article, index) => (
              <ArticleCard key={article.title} {...article} featured={index === 0} />
            ))}
          </div>
          
          <div className="mt-12">
            <Link 
              to="/analisis" 
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Ver todos los análisis →
            </Link>
          </div>
        </div>
      </section>

      {/* Documentos y Recursos */}
      <section className="section-spacing border-b border-divider">
        <div className="container-wide">
          <SectionHeading 
            title="Documentos y recursos"
            subtitle="Normativa, directrices y documentos de referencia para comprender el marco legal de la IA."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentDocuments.map((doc) => (
              <DocumentCard key={doc.title} {...doc} />
            ))}
          </div>
          
          <div className="mt-12">
            <Link 
              to="/documentos" 
              className="inline-flex items-center text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Explorar todos los documentos →
            </Link>
          </div>
        </div>
      </section>

      {/* Editorial Closing */}
      <section className="section-spacing">
        <div className="container-editorial text-center">
          <blockquote className="font-serif text-2xl md:text-3xl text-foreground italic leading-relaxed">
            "La tecnología avanza, pero las preguntas fundamentales permanecen: 
            ¿qué es justo? ¿qué es debido? ¿qué es humano?"
          </blockquote>
          <p className="mt-8 text-body">
            En Derecho Artificial creemos que la respuesta a estas preguntas 
            no puede delegarse a algoritmos. Nuestra labor es contribuir a una 
            conversación informada, rigurosa y accesible sobre el futuro que estamos construyendo.
          </p>
          <div className="mt-10">
            <Link 
              to="/sobre" 
              className="inline-flex items-center text-sm text-caption hover:text-foreground transition-colors"
            >
              Conocer más sobre este proyecto →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
