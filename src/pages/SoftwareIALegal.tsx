import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

export default function SoftwareIALegal() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">
              Análisis sectorial
            </p>
            <Link 
              to="/en/legal-ai-software" 
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              English version →
            </Link>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Software de inteligencia artificial en el ámbito jurídico
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-3xl">
            Análisis crítico e independiente sobre el uso de herramientas de inteligencia 
            artificial en la práctica legal, sus implicaciones éticas y su marco regulatorio.
          </p>
        </div>
      </section>

      {/* Introducción */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial">
            <p>
              La incorporación progresiva de sistemas de inteligencia artificial en el ejercicio 
              del Derecho constituye una de las transformaciones más relevantes del sector 
              jurídico contemporáneo. Desde asistentes de investigación jurisprudencial hasta 
              herramientas de análisis contractual, pasando por sistemas de automatización 
              documental y plataformas de gestión del conocimiento, el ecosistema de software 
              legal basado en IA se expande con rapidez y ambición comercial creciente.
            </p>
            
            <p>
              Sin embargo, esta proliferación de herramientas no siempre va acompañada de un 
              análisis riguroso sobre sus implicaciones jurídicas, éticas y profesionales. 
              En un mercado dominado por promesas tecnológicas y afirmaciones exageradas, 
              resulta imprescindible contar con espacios de reflexión crítica que evalúen 
              estas soluciones desde criterios de responsabilidad profesional, cumplimiento 
              normativo y protección de los derechos fundamentales.
            </p>
          </div>
        </div>
      </section>

      {/* Aviso editorial */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h2 className="font-serif text-xl text-foreground mb-4">
              Nota editorial
            </h2>
            <p className="text-body leading-relaxed">
              Esta sección <strong>no recomienda productos</strong> ni mantiene acuerdos comerciales 
              con desarrolladores de software. <strong>No incluye enlaces de afiliación</strong>. 
              Los contenidos se publican de forma progresiva, priorizando siempre la calidad 
              del análisis sobre la inmediatez informativa.
            </p>
          </div>
        </div>
      </section>

      {/* Categorías de herramientas */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Categorías de software jurídico con IA
          </h2>
          
          <div className="prose-editorial">
            <p>
              El mercado de software de inteligencia artificial aplicado al Derecho abarca 
              diversas categorías funcionales. A continuación se presentan las más relevantes, 
              junto con ejemplos de herramientas que operan en cada ámbito. La mención de 
              estas herramientas no constituye recomendación alguna.
            </p>
          </div>
          
          <div className="mt-10 space-y-8">
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Investigación jurídica asistida por IA
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Sistemas que emplean procesamiento del lenguaje natural para facilitar 
                la búsqueda y análisis de jurisprudencia, legislación y doctrina.
              </p>
              <p className="text-caption text-sm">
                Ejemplos: Vincent AI (vLex), Doctrine, Lexroom
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Análisis de contratos y documentos
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Herramientas de revisión automatizada que identifican cláusulas, riesgos 
                contractuales y desviaciones respecto a plantillas estándar.
              </p>
              <p className="text-caption text-sm">
                Ejemplos: Robin AI
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Automatización documental
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Sistemas de generación y gestión de documentos jurídicos mediante plantillas 
                inteligentes, ensamblaje automático y flujos de trabajo estandarizados.
              </p>
              <p className="text-caption text-sm">
                Categoría en desarrollo editorial
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Justicia predictiva
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Herramientas que analizan resoluciones judiciales históricas para estimar 
                probabilidades de éxito procesal o anticipar criterios jurisprudenciales. 
                Categoría de alto riesgo según el AI Act.
              </p>
              <p className="text-caption text-sm">
                Categoría en desarrollo editorial
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                E-discovery y revisión documental
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Plataformas de análisis masivo de documentos para litigios y procedimientos 
                de investigación, con capacidades de clasificación, etiquetado y priorización 
                mediante aprendizaje automático.
              </p>
              <p className="text-caption text-sm">
                Categoría en desarrollo editorial
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                IA generativa para profesionales del Derecho
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Modelos de lenguaje y asistentes conversacionales diseñados o adaptados para 
                tareas jurídicas: redacción de escritos, síntesis de expedientes, generación 
                de borradores contractuales. Plantean cuestiones específicas de responsabilidad 
                y supervisión humana.
              </p>
              <p className="text-caption text-sm">
                Categoría en desarrollo editorial
              </p>
            </div>
            
            <div className="border-l-2 border-divider pl-6">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Investigación legal global y datos jurídicos
              </h3>
              <p className="text-body leading-relaxed mb-3">
                Plataformas que integran bases de datos jurídicas internacionales con 
                capacidades de análisis y seguimiento normativo.
              </p>
              <p className="text-caption text-sm">
                Ejemplos: Bloomberg Law
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Criterios editoriales */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Criterios editoriales de análisis
          </h2>
          
          <div className="prose-editorial mb-10">
            <p>
              Los análisis publicados en esta sección se fundamentan en criterios objetivos 
              orientados a evaluar la idoneidad, seguridad y conformidad normativa de las 
              herramientas de IA en contextos jurídicos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Riesgo jurídico</h3>
              <p className="text-body text-sm leading-relaxed">
                Evaluación de los riesgos legales derivados del uso de la herramienta, 
                incluyendo posibles vulneraciones de confidencialidad, errores en el 
                asesoramiento y responsabilidad profesional.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Supervisión humana</h3>
              <p className="text-body text-sm leading-relaxed">
                Análisis del grado de control humano que permite la herramienta y de los 
                mecanismos de revisión disponibles para el profesional.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Transparencia</h3>
              <p className="text-body text-sm leading-relaxed">
                Valoración de la explicabilidad de los resultados, la documentación técnica 
                disponible y la claridad sobre el funcionamiento del sistema.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Datos jurídicos especializados</h3>
              <p className="text-body text-sm leading-relaxed">
                Examen de las fuentes de datos empleadas, su actualización, cobertura 
                jurisdiccional y calidad técnico-jurídica.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Conformidad con el AI Act</h3>
              <p className="text-body text-sm leading-relaxed">
                Análisis del cumplimiento con el Reglamento Europeo de Inteligencia Artificial 
                y las obligaciones aplicables según la clasificación de riesgo.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Responsabilidad profesional</h3>
              <p className="text-body text-sm leading-relaxed">
                Consideración del impacto en la responsabilidad deontológica del abogado 
                y en la relación con el cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marco regulatorio */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            El Reglamento Europeo de Inteligencia Artificial y el software jurídico
          </h2>
          
          <div className="prose-editorial">
            <p>
              El Reglamento Europeo de Inteligencia Artificial establece un marco normativo 
              que afecta directamente a numerosas herramientas de IA aplicadas al Derecho. 
              Los sistemas destinados a la administración de justicia, la asistencia en la 
              interpretación jurídica o la evaluación de pruebas pueden quedar clasificados 
              como sistemas de alto riesgo, con las consiguientes obligaciones de conformidad, 
              documentación técnica, gestión de riesgos y supervisión humana.
            </p>
            
            <p>
              Tanto los proveedores de software como los usuarios profesionales —despachos, 
              administraciones públicas, departamentos jurídicos de empresa— deberán adaptarse 
              a estas exigencias. La ignorancia del marco regulatorio no exime de su 
              cumplimiento, y las sanciones previstas por el Reglamento pueden alcanzar 
              cuantías significativas.
            </p>
          </div>
        </div>
      </section>

      {/* Posicionamiento editorial */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
            Posicionamiento editorial
          </h2>
          
          <div className="prose-editorial">
            <p>
              Esta sección adopta una posición deliberadamente crítica y no promocional. 
              Su objetivo no es elaborar rankings de productos ni facilitar decisiones de 
              compra, sino ofrecer un espacio de análisis riguroso donde los profesionales 
              del Derecho puedan encontrar información contrastada, reflexiones fundamentadas 
              y advertencias sobre los riesgos que la industria tecnológica tiende a minimizar.
            </p>
            
            <p>
              Derecho Artificial no recomienda productos, no mantiene acuerdos comerciales 
              con desarrolladores de software y no incluye enlaces de afiliación. Los 
              contenidos de esta sección se publicarán de forma progresiva, priorizando 
              siempre la calidad del análisis sobre la inmediatez informativa.
            </p>
          </div>
        </div>
      </section>

      {/* Aviso final */}
      <section className="py-16 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h3 className="font-serif text-xl text-foreground mb-4">
              Aviso editorial
            </h3>
            <p className="text-body leading-relaxed">
              Esta sección se encuentra actualmente en desarrollo. Los análisis y reflexiones 
              se irán incorporando de forma progresiva, conforme a los criterios de rigor e 
              independencia que definen la línea editorial de Derecho Artificial.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}