import { Layout } from "@/components/layout/Layout";
import { DocumentCard } from "@/components/ui/DocumentCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const documents = [
  {
    title: "Reglamento (UE) 2024/1689 - Reglamento de Inteligencia Artificial",
    description: "Reglamento por el que se establecen normas armonizadas en materia de inteligencia artificial. Marco regulatorio integral de la UE para sistemas de IA.",
    type: "Reglamento UE",
    source: "Diario Oficial de la Unión Europea",
    year: "2024",
  },
  {
    title: "Carta Ética Europea sobre el uso de la IA en los sistemas judiciales",
    description: "Principios fundamentales para el uso de inteligencia artificial en sistemas judiciales, incluyendo respeto a derechos fundamentales y no discriminación.",
    type: "Directrices",
    source: "CEPEJ - Consejo de Europa",
    year: "2018",
  },
  {
    title: "Directrices éticas para una IA fiable",
    description: "Marco ético desarrollado por el Grupo de Expertos de Alto Nivel sobre IA de la Comisión Europea. Establece requisitos clave para sistemas de IA confiables.",
    type: "Directrices",
    source: "Comisión Europea",
    year: "2019",
  },
  {
    title: "Recomendación sobre la Ética de la Inteligencia Artificial",
    description: "Primera normativa mundial sobre ética de la IA, adoptada por 193 Estados miembros. Establece valores y principios comunes.",
    type: "Recomendación",
    source: "UNESCO",
    year: "2021",
  },
  {
    title: "Principios de la OCDE sobre Inteligencia Artificial",
    description: "Estándares internacionales para el desarrollo y uso responsable de IA, promoviendo innovación y confianza en sistemas de IA.",
    type: "Principios",
    source: "OCDE",
    year: "2019",
  },
  {
    title: "Libro Blanco sobre la Inteligencia Artificial",
    description: "Estrategia europea para una IA excelente y fiable. Documento base que precedió al Reglamento de IA.",
    type: "Libro Blanco",
    source: "Comisión Europea",
    year: "2020",
  },
  {
    title: "Propuesta de Directiva sobre responsabilidad en materia de IA",
    description: "Propuesta para adaptar las normas de responsabilidad civil a la era digital y la inteligencia artificial.",
    type: "Propuesta Legislativa",
    source: "Comisión Europea",
    year: "2022",
  },
  {
    title: "Estrategia Nacional de Inteligencia Artificial (España)",
    description: "Marco estratégico español para el desarrollo de la IA, incluyendo aspectos éticos, legales y de gobernanza.",
    type: "Estrategia Nacional",
    source: "Gobierno de España",
    year: "2020",
  },
  {
    title: "Guía de buenas prácticas para el uso de IA en la Administración",
    description: "Orientaciones para la implementación responsable de sistemas de IA en el sector público español.",
    type: "Guía",
    source: "AESIA - España",
    year: "2023",
  },
  {
    title: "Resolución sobre IA y Derechos Humanos",
    description: "Resolución que aborda los desafíos que plantea la IA para los derechos humanos y establece recomendaciones para los Estados.",
    type: "Resolución",
    source: "Consejo de Derechos Humanos ONU",
    year: "2023",
  },
];

const Documentos = () => {
  return (
    <Layout>
      <section className="section-spacing">
        <div className="container-wide">
          <header className="mb-16">
            <SectionHeading 
              title="Documentos y recursos"
              subtitle="Recopilación curada de normativa, directrices, informes y documentos de referencia esenciales para comprender el marco jurídico de la inteligencia artificial. Cada documento incluye contexto sobre su relevancia y aplicación."
            />
          </header>

          {/* Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 text-sm bg-primary text-primary-foreground">
                Todos
              </button>
              <button className="px-4 py-2 text-sm border border-divider text-body hover:bg-muted transition-colors">
                Reglamentos UE
              </button>
              <button className="px-4 py-2 text-sm border border-divider text-body hover:bg-muted transition-colors">
                Directrices
              </button>
              <button className="px-4 py-2 text-sm border border-divider text-body hover:bg-muted transition-colors">
                Organismos Internacionales
              </button>
              <button className="px-4 py-2 text-sm border border-divider text-body hover:bg-muted transition-colors">
                Legislación Nacional
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc) => (
              <DocumentCard key={doc.title} {...doc} />
            ))}
          </div>

          {/* Note */}
          <div className="mt-16 p-6 bg-highlight border border-divider">
            <p className="text-sm text-body">
              <strong className="text-foreground">Nota:</strong> Esta sección se actualiza 
              periódicamente con nuevos documentos relevantes. Si conoce algún documento 
              que debería incluirse, puede sugerirlo a través de nuestro formulario de contacto.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Documentos;
