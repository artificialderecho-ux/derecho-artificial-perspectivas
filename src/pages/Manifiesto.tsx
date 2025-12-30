import { Layout } from "@/components/layout/Layout";

const Manifiesto = () => {
  return (
    <Layout>
      <article className="section-spacing">
        <div className="container-editorial">
          {/* Header */}
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-caption mb-4">
              Manifiesto Editorial
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Principios para un análisis riguroso del Derecho y la Inteligencia Artificial
            </h1>
            <p className="text-lg text-body">
              Nuestro compromiso con la independencia, la ética y el pensamiento crítico.
            </p>
          </header>

          {/* Content */}
          <div className="prose-editorial">
            <section className="mb-16">
              <h2>Independencia editorial</h2>
              <p>
                Derecho Artificial es un proyecto editorial independiente. No aceptamos 
                financiación de empresas tecnológicas, despachos de abogados ni instituciones 
                que puedan comprometer nuestra capacidad de análisis crítico. Nuestra única 
                lealtad es hacia la verdad jurídica y el interés público.
              </p>
              <p>
                Esta independencia nos permite abordar temas controvertidos sin 
                autocensura: desde la crítica a regulaciones insuficientes hasta el 
                cuestionamiento de prácticas empresariales que afectan derechos fundamentales.
              </p>
            </section>

            <section className="mb-16">
              <h2>Ética y responsabilidad</h2>
              <p>
                Creemos que el desarrollo de la inteligencia artificial debe estar guiado 
                por principios éticos sólidos y por el respeto a los derechos humanos. 
                Rechazamos la visión tecno-optimista que minimiza riesgos y consecuencias.
              </p>
              <p>
                Nuestro análisis parte de una premisa fundamental: la tecnología no es 
                neutral. Los sistemas de IA incorporan valores, sesgos y decisiones de 
                diseño que tienen consecuencias jurídicas y sociales reales. Es 
                responsabilidad de juristas y reguladores comprender estas implicaciones.
              </p>
            </section>

            <section className="mb-16">
              <h2>Límites de la IA en el Derecho</h2>
              <p>
                Reconocemos el potencial de la inteligencia artificial para mejorar 
                ciertos aspectos de la práctica jurídica. Sin embargo, mantenemos una 
                posición crítica sobre sus límites:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li>
                  La IA no puede sustituir el juicio humano en decisiones que afectan 
                  derechos fundamentales.
                </li>
                <li>
                  Los sistemas automatizados de decisión judicial plantean problemas 
                  constitucionales graves relacionados con el debido proceso.
                </li>
                <li>
                  La opacidad algorítmica es incompatible con los principios de 
                  transparencia y motivación de las resoluciones judiciales.
                </li>
                <li>
                  El uso de IA en la administración de justicia debe estar sujeto a 
                  supervisión humana efectiva, no meramente formal.
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2>Integridad profesional</h2>
              <p>
                Dirigimos nuestra atención especialmente a la comunidad jurídica profesional. 
                Los abogados, jueces, fiscales y académicos del Derecho tienen una 
                responsabilidad particular en este momento histórico: comprender las 
                herramientas que están transformando su profesión y mantener los 
                estándares éticos que la definen.
              </p>
              <p>
                Esto implica resistir la tentación de adoptar tecnologías sin reflexión 
                crítica, cuestionar las promesas comerciales de proveedores de legaltech, 
                y priorizar siempre el deber hacia el cliente y hacia la justicia por 
                encima de la eficiencia.
              </p>
            </section>

            <section className="mb-16">
              <h2>Enfoque crítico y humano</h2>
              <p>
                Nuestra metodología combina el rigor académico con la accesibilidad. 
                Evitamos tanto el tecnicismo impenetrable como la simplificación excesiva. 
                Buscamos un equilibrio que permita a profesionales del Derecho y a 
                ciudadanos informados participar en el debate.
              </p>
              <p>
                Rechazamos el discurso del "progreso inevitable" que presenta la 
                adopción de IA como una fuerza irresistible. Las sociedades pueden y 
                deben elegir cómo, cuándo y si implementar estas tecnologías. El Derecho 
                es precisamente el instrumento para canalizar estas decisiones colectivas.
              </p>
            </section>

            <section className="mb-16">
              <h2>Compromiso con el mundo hispanohablante</h2>
              <p>
                Derecho Artificial nace para servir a la comunidad jurídica de habla 
                hispana en su conjunto. Reconocemos la diversidad de sistemas jurídicos, 
                desde la tradición civilista europea hasta las particularidades de los 
                ordenamientos latinoamericanos.
              </p>
              <p>
                Esta perspectiva amplia nos permite analizar cómo las regulaciones 
                desarrolladas en otros contextos—principalmente anglosajones y europeos—pueden 
                o no ser apropiadas para nuestra realidad. Promovemos un diálogo jurídico 
                transnacional que respete las especificidades locales.
              </p>
            </section>

            <section>
              <h2>Una invitación al diálogo</h2>
              <p>
                Este manifiesto no pretende ser la última palabra, sino el inicio de 
                una conversación. Invitamos a académicos, profesionales y ciudadanos a 
                participar en la construcción de un marco jurídico y ético para la 
                inteligencia artificial que sea verdaderamente humano.
              </p>
              <p>
                Las páginas de Derecho Artificial están abiertas a voces diversas, 
                siempre que compartan nuestro compromiso con el rigor, la honestidad 
                intelectual y el respeto por los derechos fundamentales.
              </p>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Manifiesto;
