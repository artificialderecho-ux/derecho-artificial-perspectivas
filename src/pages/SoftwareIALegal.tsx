import { Layout } from "@/components/layout/Layout";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function SoftwareIALegal() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6">
            Software IA legal
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Análisis independiente de herramientas de inteligencia artificial aplicadas al ámbito jurídico.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <SectionHeading 
            title="Sobre esta sección" 
            subtitle="Un enfoque crítico y transparente"
          />
          
          <div className="prose-editorial mt-8">
            <p>
              Esta sección está dedicada al análisis riguroso y objetivo de las herramientas de 
              inteligencia artificial diseñadas para el sector legal. Nuestro objetivo no es 
              promocionar productos ni elaborar rankings comerciales, sino ofrecer una evaluación 
              crítica desde una perspectiva ética, regulatoria y profesional.
            </p>
            
            <p>
              En un mercado saturado de promesas tecnológicas y afirmaciones exageradas, 
              consideramos necesario un espacio donde los profesionales del derecho puedan 
              encontrar información contrastada, análisis fundamentados y reflexiones sobre 
              las implicaciones reales de estas herramientas en la práctica jurídica.
            </p>

            <p>
              Cada análisis que publiquemos seguirá criterios transparentes y reproducibles, 
              atendiendo a aspectos como:
            </p>

            <ul>
              <li>Precisión y fiabilidad de los resultados</li>
              <li>Transparencia algorítmica y explicabilidad</li>
              <li>Cumplimiento normativo y protección de datos</li>
              <li>Implicaciones éticas y deontológicas</li>
              <li>Limitaciones reconocidas y riesgos potenciales</li>
              <li>Idoneidad para distintos contextos profesionales</li>
            </ul>

            <p>
              Esta sección se encuentra actualmente en desarrollo. Próximamente publicaremos 
              los primeros análisis detallados de herramientas de IA legal, siempre desde 
              la independencia editorial y el compromiso con la información veraz.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <p className="text-caption text-center">
            Los análisis publicados en esta sección son independientes y no responden a 
            acuerdos comerciales ni patrocinios. Derecho Artificial no recibe compensación 
            de los desarrolladores de las herramientas analizadas.
          </p>
        </div>
      </section>
    </Layout>
  );
}
