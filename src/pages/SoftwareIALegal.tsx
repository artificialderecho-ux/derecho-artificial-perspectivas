import { Layout } from "@/components/layout/Layout";

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

      {/* Introducción */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Introducción
          </h2>
          
          <div className="prose-editorial">
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
          </div>
        </div>
      </section>

      {/* Categorías de software */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Categorías de software
          </h2>
          
          <div className="prose-editorial">
            <p>
              El ecosistema de software de IA legal abarca diversas categorías funcionales, 
              desde asistentes de investigación jurídica hasta sistemas de análisis contractual, 
              pasando por herramientas de automatización documental y plataformas de gestión 
              del conocimiento. Cada categoría presenta características, riesgos y consideraciones 
              éticas específicas que abordaremos en análisis individuales.
            </p>
          </div>
        </div>
      </section>

      {/* Criterios de análisis */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Criterios de análisis
          </h2>
          
          <div className="prose-editorial">
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
          </div>
        </div>
      </section>

      {/* Marco regulatorio y ético */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Marco regulatorio y ético
          </h2>
          
          <div className="prose-editorial">
            <p>
              El análisis de herramientas de IA legal no puede desvincularse del contexto 
              normativo en el que operan. El Reglamento Europeo de Inteligencia Artificial, 
              las normativas de protección de datos, los códigos deontológicos profesionales 
              y los principios éticos aplicables a la práctica jurídica constituyen el marco 
              de referencia ineludible para cualquier evaluación responsable.
            </p>
          </div>
        </div>
      </section>

      {/* Aviso editorial */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Aviso editorial
          </h2>
          
          <div className="prose-editorial">
            <p>
              Los análisis publicados en esta sección son independientes y no responden a 
              acuerdos comerciales ni patrocinios. Derecho Artificial no recibe compensación 
              de los desarrolladores de las herramientas analizadas.
            </p>
            <p>
              Esta sección se encuentra actualmente en desarrollo. Próximamente publicaremos 
              los primeros análisis detallados de herramientas de IA legal, siempre desde 
              la independencia editorial y el compromiso con la información veraz.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
