import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const AIActPracticaJuridica = () => {
  return (
    <Layout>
      <article className="section-spacing">
        <div className="container-narrow">
          {/* Article Header */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm uppercase tracking-widest text-caption">
                Regulación
              </span>
              <span className="text-caption">·</span>
              <time className="text-sm text-caption">14 de enero, 2025</time>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
              El AI Act y la práctica jurídica en Europa: obligaciones reales, zonas grises y riesgos operativos
            </h1>
            <p className="text-lg text-body leading-relaxed">
              Un análisis jurídico del Reglamento Europeo de Inteligencia Artificial desde la perspectiva de su aplicación práctica en despachos, departamentos legales e instituciones públicas. Más allá del texto normativo: obligaciones operativas, interacción con el RGPD y cuestiones pendientes de desarrollo.
            </p>
          </header>

          {/* Article Content */}
          <div className="prose-editorial">
            {/* 1. Introducción */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                1. Introducción
              </h2>
              <p>
                El Reglamento (UE) 2024/1689, conocido como AI Act o Reglamento Europeo de Inteligencia Artificial, ha entrado en vigor con la ambición de constituirse como el primer marco jurídico horizontal y vinculante para la regulación de sistemas de inteligencia artificial en una jurisdicción de relevancia global. Su aprobación, tras un prolongado proceso legislativo que se extendió desde la propuesta inicial de la Comisión en abril de 2021, representa un hito normativo cuyas implicaciones prácticas apenas comienzan a desplegarse.
              </p>
              <p>
                Sin embargo, sería un error conceptual significativo abordar el AI Act como una cuestión exclusivamente tecnológica. El Reglamento no regula la tecnología en abstracto, sino su inserción en contextos sociales, económicos e institucionales específicos. Para el sector jurídico, esto tiene una consecuencia directa: el cumplimiento del AI Act no es un problema que pueda delegarse íntegramente a departamentos técnicos o proveedores externos. Se trata de una cuestión organizativa, contractual y, en última instancia, de gobernanza profesional.
              </p>
              <p>
                Este análisis examina el Reglamento desde la perspectiva de su aplicación práctica en el ejercicio profesional del Derecho. El objetivo no es ofrecer una exposición sistemática de su contenido normativo —tarea ya abordada en otros análisis de este proyecto editorial—, sino identificar las obligaciones reales que recaen sobre despachos, departamentos legales e instituciones, señalar las zonas grises pendientes de clarificación y evaluar los riesgos operativos que el nuevo marco introduce.
              </p>
              <p>
                La perspectiva adoptada es deliberadamente prudente. El AI Act es un instrumento normativo complejo, cuya aplicación efectiva dependerá de un ecosistema regulatorio aún en construcción: guías de la Comisión, estándares técnicos armonizados, interpretaciones de las autoridades nacionales competentes y, eventualmente, jurisprudencia de los tribunales europeos y nacionales. Cualquier afirmación categórica sobre el alcance de determinadas obligaciones debe, por tanto, formularse con la cautela que impone un marco normativo en fase de despliegue inicial.
              </p>
            </section>

            {/* 2. El enfoque basado en riesgo */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                2. El enfoque basado en riesgo del Reglamento Europeo de IA
              </h2>
              <p>
                La arquitectura normativa del AI Act se sustenta sobre un principio de proporcionalidad regulatoria: las obligaciones impuestas a los operadores económicos se gradúan en función del nivel de riesgo que el sistema de IA representa para la seguridad, la salud y los derechos fundamentales de las personas. Esta técnica regulatoria, inspirada en modelos consolidados en otros ámbitos del Derecho de la Unión, permite evitar una aproximación homogénea que resultaría desproporcionada para sistemas de bajo impacto e insuficiente para aplicaciones de alta sensibilidad.
              </p>
              <p>
                El Reglamento establece cuatro categorías de riesgo con consecuencias jurídicas diferenciadas. En primer lugar, los sistemas de riesgo inaceptable, enumerados de forma taxativa en el artículo 5, quedan directamente prohibidos. Se incluyen en esta categoría prácticas como la manipulación subliminal, la explotación de vulnerabilidades de grupos específicos, la puntuación social por parte de autoridades públicas y determinados usos de identificación biométrica en tiempo real en espacios públicos. La prohibición es absoluta, sin perjuicio de excepciones muy tasadas vinculadas a fines de seguridad pública.
              </p>
              <p>
                En segundo lugar, los sistemas de alto riesgo constituyen el núcleo sustantivo del régimen regulatorio. Su identificación se realiza mediante una técnica de doble lista: por un lado, sistemas integrados en productos sujetos a legislación de armonización de la Unión (Anexo I); por otro, sistemas utilizados en ámbitos especialmente sensibles enumerados en el Anexo III. Este segundo anexo resulta de especial relevancia para el sector jurídico, al incluir expresamente aplicaciones en el ámbito de la administración de justicia y los procesos democráticos.
              </p>
              <p>
                El Anexo III, en su apartado 8, se refiere específicamente a sistemas de IA destinados a ser utilizados por una autoridad judicial o en su nombre para asistir a una autoridad judicial en la investigación y la interpretación de los hechos y del Derecho y en la aplicación de la ley a un conjunto concreto de hechos. Esta formulación, deliberadamente amplia, plantea cuestiones interpretativas significativas que abordaremos en la siguiente sección.
              </p>
              <p>
                En tercer lugar, los sistemas de riesgo limitado quedan sujetos principalmente a obligaciones de transparencia. El ejemplo paradigmático son los sistemas de IA generativa, respecto de los cuales el Reglamento exige que el usuario sea informado de que está interactuando con contenido generado artificialmente o con un sistema automatizado. Finalmente, los sistemas de riesgo mínimo no están sujetos a obligaciones específicas derivadas del Reglamento, aunque pueden quedar afectados por otras normas sectoriales o por códigos de conducta voluntarios.
              </p>
              <p>
                Esta arquitectura basada en el riesgo, aparentemente clara en su diseño abstracto, plantea dificultades operativas en su aplicación concreta. La clasificación de un sistema específico no siempre resulta evidente, especialmente cuando se trata de herramientas de propósito general que pueden utilizarse en contextos diversos. La responsabilidad de la clasificación inicial recae sobre el proveedor del sistema, pero el usuario —en nuestro caso, el despacho, la administración o la institución— debe verificar la coherencia de dicha clasificación con el uso efectivo que pretende dar al sistema.
              </p>
            </section>

            {/* 3. La abogacía y la administración de justicia */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                3. La abogacía y la administración de justicia en el AI Act
              </h2>
              <p>
                El tratamiento de la administración de justicia en el Reglamento merece un análisis específico, dada su directa relevancia para el ejercicio profesional del Derecho. El Anexo III, apartado 8, somete al régimen de alto riesgo los sistemas de IA destinados a asistir a autoridades judiciales en la investigación e interpretación de hechos y Derecho. Esta previsión conecta con preocupaciones legítimas sobre el uso de sistemas automatizados en ámbitos donde están en juego derechos fundamentales como la tutela judicial efectiva, la presunción de inocencia o el derecho de defensa.
              </p>
              <p>
                Sin embargo, la delimitación precisa del ámbito de aplicación de esta disposición no está exenta de dificultades. El texto se refiere a sistemas destinados a ser utilizados por una autoridad judicial o en su nombre. Esta formulación suscita interrogantes sobre el tratamiento de sistemas utilizados por abogados, procuradores u otros operadores jurídicos que, si bien no actúan en nombre de la autoridad judicial, participan en procesos que concluyen con decisiones judiciales.
              </p>
              <p>
                Una interpretación estricta del tenor literal conduciría a excluir del régimen de alto riesgo las herramientas de IA utilizadas por despachos de abogados en su labor de asistencia letrada, dado que el abogado no actúa por ni en nombre de la autoridad judicial. Sin embargo, esta interpretación podría resultar insatisfactoria desde una perspectiva teleológica: si la ratio de la norma es proteger a los ciudadanos frente a decisiones asistidas por IA en el ámbito judicial, parece coherente que dicha protección se extienda a todas las fases del proceso, incluyendo la asistencia letrada.
              </p>
              <p>
                La cuestión admite matices adicionales. No es lo mismo un sistema de IA que asiste en la gestión documental de un expediente que uno que genera recomendaciones sobre la estrategia procesal a seguir o que evalúa la probabilidad de éxito de una pretensión. La intensidad del riesgo varía en función del grado de influencia que el sistema ejerce sobre decisiones con consecuencias jurídicas.
              </p>
              <p>
                Ante esta indefinición, la posición prudente para despachos e instituciones consiste en realizar una evaluación individualizada del uso previsto de cada sistema de IA, considerando no solo la clasificación proporcionada por el proveedor, sino el contexto específico de aplicación. En supuestos de duda razonable sobre la clasificación, la opción más conservadora es aplicar las obligaciones correspondientes a sistemas de alto riesgo, evitando así el riesgo de incumplimiento.
              </p>
              <p>
                Esta incertidumbre clasificatoria es una de las zonas grises más relevantes del Reglamento en su aplicación al sector jurídico. Es previsible que las guías interpretativas de la Comisión Europea y las posiciones de las autoridades nacionales competentes aporten clarificaciones en los próximos años, pero hasta entonces los operadores jurídicos deberán gestionar esta ambigüedad con criterio profesional.
              </p>
            </section>

            {/* 4. Obligaciones reales */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                4. Obligaciones reales para despachos y organizaciones
              </h2>
              <p>
                Más allá de las cuestiones clasificatorias, el Reglamento impone obligaciones concretas cuyo cumplimiento requiere acciones específicas por parte de los usuarios de sistemas de IA. Aunque el grueso del régimen obligacional recae sobre los proveedores, los usuarios —denominados deployers en la terminología del Reglamento— asumen responsabilidades propias que no pueden desconocerse.
              </p>
              
              <h3 className="font-serif text-xl text-foreground mt-8 mb-4">
                4.1. Supervisión humana
              </h3>
              <p>
                El artículo 14 del Reglamento exige que los sistemas de alto riesgo se diseñen y desarrollen de modo que permitan una supervisión humana efectiva durante su funcionamiento. Esta obligación, dirigida primariamente a los proveedores, tiene un correlato para los usuarios: garantizar que dicha supervisión se ejerce efectivamente.
              </p>
              <p>
                En el contexto jurídico, esto implica que las decisiones asistidas por IA deben ser revisadas por un profesional cualificado antes de su formalización. La supervisión no puede ser meramente nominal o protocolaria; debe permitir la detección de errores, sesgos o resultados inadecuados. Esto exige, a su vez, que el profesional comprenda suficientemente el funcionamiento del sistema para identificar cuándo sus resultados son cuestionables.
              </p>
              <p>
                La obligación de supervisión humana conecta con el principio de responsabilidad profesional. El uso de herramientas de IA no exime al abogado de su deber de diligencia ni transfiere al sistema la responsabilidad por el asesoramiento prestado. El profesional sigue siendo el garante último de la calidad y adecuación de su trabajo.
              </p>

              <h3 className="font-serif text-xl text-foreground mt-8 mb-4">
                4.2. Gobernanza de datos
              </h3>
              <p>
                Los sistemas de alto riesgo están sujetos a requisitos específicos de calidad de los datos de entrenamiento, validación y prueba (artículo 10). Aunque esta obligación recae sobre el proveedor, el usuario debe ser consciente de los datos que introduce en el sistema durante su uso operativo, especialmente cuando se trata de datos personales o información sujeta a secreto profesional.
              </p>
              <p>
                En despachos de abogados, la introducción de documentos de clientes en sistemas de IA generativa plantea cuestiones delicadas de confidencialidad y protección de datos. El usuario debe verificar las condiciones de tratamiento de datos del proveedor, las garantías de seguridad aplicables y, en su caso, la existencia de acuerdos de procesamiento de datos conformes con el RGPD.
              </p>

              <h3 className="font-serif text-xl text-foreground mt-8 mb-4">
                4.3. Trazabilidad y documentación
              </h3>
              <p>
                El Reglamento exige que los sistemas de alto riesgo dispongan de capacidades de registro automático de eventos (logging) que permitan trazar su funcionamiento (artículo 12). Para el usuario, esto implica la conveniencia de mantener registros propios sobre el uso del sistema: qué consultas se realizaron, qué resultados se obtuvieron, qué decisiones se adoptaron sobre la base de dichos resultados.
              </p>
              <p>
                Esta trazabilidad resulta especialmente relevante en caso de reclamaciones o procedimientos de responsabilidad. La capacidad de demostrar cómo se utilizó el sistema y qué controles se aplicaron puede ser determinante para la defensa frente a imputaciones de negligencia profesional.
              </p>

              <h3 className="font-serif text-xl text-foreground mt-8 mb-4">
                4.4. Transparencia frente al cliente
              </h3>
              <p>
                El Reglamento establece obligaciones de transparencia respecto de las personas afectadas por sistemas de IA. En el ámbito jurídico, esto plantea la cuestión de si el abogado debe informar a su cliente cuando utiliza herramientas de IA en la prestación del servicio.
              </p>
              <p>
                Aunque el Reglamento no impone una obligación expresa de comunicación al cliente en todos los supuestos, los deberes deontológicos de lealtad y transparencia que rigen la relación abogado-cliente pueden exigir dicha comunicación, especialmente cuando el uso de IA tiene incidencia material en el asesoramiento o cuando el cliente ha manifestado preferencias al respecto. Las orientaciones de los colegios profesionales y las autoridades deontológicas serán relevantes para concretar el alcance de este deber.
              </p>

              <h3 className="font-serif text-xl text-foreground mt-8 mb-4">
                4.5. Relación con proveedores tecnológicos
              </h3>
              <p>
                Los usuarios de sistemas de IA de alto riesgo deben verificar que los proveedores cumplen con las obligaciones que les impone el Reglamento. Esto tiene implicaciones contractuales directas: los contratos de suministro o licencia de software deben incluir cláusulas que garanticen el cumplimiento normativo del proveedor, establezcan mecanismos de verificación y regulen las consecuencias del incumplimiento.
              </p>
              <p>
                La debida diligencia en la selección de proveedores forma parte de las obligaciones del usuario. No basta con adquirir una herramienta de IA y utilizarla sin más; es preciso verificar que el proveedor ha realizado las evaluaciones de conformidad exigidas, que dispone de la documentación técnica preceptiva y que ofrece las garantías necesarias para un uso conforme a Derecho.
              </p>
            </section>

            {/* 5. Relación AI Act y RGPD */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                5. Relación entre AI Act y RGPD
              </h2>
              <p>
                El Reglamento de Inteligencia Artificial no opera de forma aislada, sino que se inserta en un ecosistema normativo más amplio del que forma parte destacada el Reglamento General de Protección de Datos (RGPD). La interacción entre ambos instrumentos plantea cuestiones de considerable complejidad que los operadores jurídicos deben tener presentes.
              </p>
              <p>
                En primer lugar, el uso de sistemas de IA implica, en la mayoría de los casos, tratamiento de datos personales. La introducción de documentos, la generación de perfiles de riesgo, el análisis predictivo o la clasificación de expedientes son operaciones que típicamente involucran datos de personas físicas identificadas o identificables. Por tanto, el uso de IA en el contexto jurídico está sujeto simultáneamente al AI Act y al RGPD.
              </p>
              <p>
                La exigencia de una base jurídica legítima para el tratamiento de datos personales se mantiene íntegramente. El usuario del sistema de IA debe verificar que dispone de base jurídica adecuada para los tratamientos que realiza, ya sea el consentimiento del interesado, la ejecución de un contrato, el cumplimiento de una obligación legal o el interés legítimo, según corresponda.
              </p>
              <p>
                El principio de minimización de datos cobra especial relevancia en el contexto de la IA. Los sistemas de IA generativa, en particular, pueden procesar cantidades significativas de información que excedan lo estrictamente necesario para la finalidad perseguida. El usuario debe evaluar si la información introducida en el sistema es proporcionada y limitada a lo necesario.
              </p>
              <p>
                Las evaluaciones de impacto relativas a la protección de datos (DPIA), previstas en el artículo 35 del RGPD, pueden resultar preceptivas cuando el uso de IA implique un alto riesgo para los derechos y libertades de las personas físicas. El considerando 91 del RGPD menciona expresamente el uso de tecnologías innovadoras como factor que puede activar la obligación de realizar una DPIA. En el contexto de sistemas de IA de alto riesgo según el AI Act, la realización de una DPIA resulta altamente recomendable, cuando no obligatoria.
              </p>
              <p>
                El artículo 22 del RGPD, que establece el derecho a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado que produzcan efectos jurídicos o afecten significativamente al interesado, tiene conexiones directas con las obligaciones de supervisión humana del AI Act. Ambas normas convergen en la exigencia de que las decisiones automatizadas con impacto significativo sobre las personas estén sujetas a intervención humana.
              </p>
              <p>
                Las responsabilidades derivadas de ambos marcos normativos son acumulativas, no alternativas. Un incumplimiento del RGPD en el uso de un sistema de IA no queda subsanado por el cumplimiento del AI Act, y viceversa. Los operadores jurídicos deben garantizar la conformidad simultánea con ambos instrumentos.
              </p>
            </section>

            {/* 6. Zonas grises */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                6. Zonas grises y cuestiones abiertas
              </h2>
              <p>
                El AI Act, como todo instrumento normativo de nueva creación, presenta áreas de indefinición que solo se resolverán mediante el desarrollo reglamentario, la práctica administrativa y, eventualmente, la interpretación judicial. Identificar estas zonas grises es esencial para una gestión prudente del riesgo regulatorio.
              </p>
              <p>
                En primer lugar, los estándares técnicos armonizados previstos en el Reglamento aún no han sido adoptados en su totalidad. Estos estándares, que desarrollan los requisitos generales del Reglamento en especificaciones técnicas concretas, son esenciales para determinar el cumplimiento. Hasta que estén disponibles, los proveedores y usuarios deben aplicar criterios razonables de diligencia, documentando las decisiones adoptadas.
              </p>
              <p>
                En segundo lugar, las guías interpretativas de la Comisión Europea sobre aspectos clave del Reglamento están aún en elaboración. Cuestiones como el alcance exacto de las categorías de alto riesgo, los criterios de clasificación de sistemas de propósito general o las condiciones para la exención de determinadas obligaciones requieren clarificación.
              </p>
              <p>
                En tercer lugar, la articulación entre las autoridades nacionales competentes y la Oficina Europea de Inteligencia Artificial es un proceso en curso. La coherencia en la aplicación del Reglamento en los distintos Estados miembros dependerá de mecanismos de coordinación que aún deben consolidarse.
              </p>
              <p>
                En cuarto lugar, la aplicación del Reglamento a sistemas de IA de propósito general —incluidos los modelos de lenguaje de gran escala— presenta complejidades específicas. Estos sistemas pueden utilizarse para finalidades muy diversas, algunas de las cuales podrían encuadrarse en categorías de alto riesgo mientras que otras quedarían fuera. La responsabilidad de la clasificación en función del uso efectivo recae, en última instancia, sobre el usuario.
              </p>
              <p>
                Esta indefinición genera dos riesgos contrapuestos. Por un lado, el riesgo de sobrerreacción regulatoria: ante la incertidumbre, algunos operadores pueden adoptar posiciones excesivamente conservadoras que limiten innecesariamente el aprovechamiento de herramientas útiles. Por otro lado, el riesgo de infracumplimiento: la ambigüedad puede ser utilizada como coartada para eludir obligaciones que, correctamente interpretadas, resultarían aplicables.
              </p>
              <p>
                La posición recomendable es intermedia: documentar cuidadosamente las decisiones de clasificación y cumplimiento, aplicar criterios razonables de prudencia, mantenerse atento a las clarificaciones regulatorias y estar preparado para adaptar las prácticas cuando se produzcan.
              </p>
            </section>

            {/* 7. Impacto práctico */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                7. Impacto práctico a corto y medio plazo
              </h2>
              <p>
                El AI Act tendrá consecuencias operativas concretas para despachos de abogados, departamentos jurídicos de empresas e instituciones públicas. Estas consecuencias se manifestarán en tres dimensiones principales: organizativa, contractual y cultural.
              </p>
              
              <h3 className="font-serif text-xl text-foreground mt-8 mb-4">
                7.1. Dimensión organizativa
              </h3>
              <p>
                Las organizaciones que utilicen sistemas de IA en su actividad jurídica deberán establecer procedimientos internos para la evaluación, selección y supervisión de dichos sistemas. Esto puede incluir la designación de responsables específicos, la elaboración de políticas de uso de IA, la implementación de mecanismos de control de calidad y la formación del personal.
              </p>
              <p>
                La auditoría de los sistemas de IA actualmente en uso será un paso necesario. Muchas organizaciones han adoptado herramientas de IA de forma gradual, sin una evaluación sistemática de su conformidad normativa. El AI Act obliga a reconsiderar estas prácticas y a verificar que cada sistema utilizado se ajusta a las exigencias aplicables.
              </p>

              <h3 className="font-serif text-xl text-foreground mt-8 mb-4">
                7.2. Dimensión contractual
              </h3>
              <p>
                Los contratos con proveedores de tecnología deberán revisarse para incorporar cláusulas específicas sobre cumplimiento del AI Act. Esto incluye garantías sobre la clasificación del sistema, obligaciones de información y documentación, compromisos de actualización ante cambios normativos y regulación de responsabilidades.
              </p>
              <p>
                Los contratos de prestación de servicios jurídicos también pueden verse afectados. La transparencia frente al cliente sobre el uso de IA, las limitaciones de responsabilidad y las condiciones de tratamiento de la información proporcionada son aspectos que conviene regular expresamente.
              </p>

              <h3 className="font-serif text-xl text-foreground mt-8 mb-4">
                7.3. Dimensión cultural
              </h3>
              <p>
                Más allá de los aspectos formales, el AI Act impulsa un cambio de mentalidad en la relación de los profesionales jurídicos con la tecnología. La adopción acrítica de herramientas por su novedad o supuesta eficiencia debe dar paso a una evaluación reflexiva que considere riesgos, obligaciones y responsabilidades.
              </p>
              <p>
                Esto no significa renunciar a los beneficios que la IA puede aportar al ejercicio profesional, sino integrarlos en un marco de uso responsable. La supervisión humana efectiva, lejos de ser un obstáculo burocrático, constituye una garantía de calidad profesional.
              </p>
              <p>
                La formación continua en materia de IA y regulación tecnológica se convierte en una necesidad profesional. Los juristas que pretendan utilizar estas herramientas —o asesorar a clientes sobre su uso— deben desarrollar competencias mínimas que les permitan comprender su funcionamiento, identificar sus limitaciones y evaluar su conformidad normativa.
              </p>
            </section>

            {/* 8. Conclusión editorial */}
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                8. Conclusión editorial
              </h2>
              <p>
                El Reglamento Europeo de Inteligencia Artificial representa un esfuerzo regulatorio ambicioso que sitúa a la Unión Europea a la vanguardia de la gobernanza de la IA a escala global. Su aplicación al sector jurídico plantea desafíos significativos, pero también oportunidades para un ejercicio profesional más reflexivo y responsable.
              </p>
              <p>
                La prudencia debe guiar la respuesta del sector a este nuevo marco normativo. Ni el entusiasmo acrítico que ve en la IA una solución a todos los problemas, ni el rechazo apriorístico que la considera incompatible con la función jurídica, constituyen aproximaciones adecuadas. La IA es una herramienta que, utilizada con criterio, puede mejorar la eficiencia y la calidad del trabajo jurídico. Pero es una herramienta que requiere supervisión, comprensión y responsabilidad.
              </p>
              <p>
                El criterio jurídico humano sigue siendo insustituible. Las decisiones que afectan a derechos, que interpretan normas, que valoran pruebas o que construyen argumentos no pueden delegarse a sistemas automatizados sin una revisión profesional rigurosa. El AI Act reconoce esta realidad al exigir supervisión humana efectiva, pero la verdadera garantía reside en la cultura profesional de quienes ejercen el Derecho.
              </p>
              <p>
                Las zonas grises del Reglamento irán clarificándose con el tiempo. Mientras tanto, la diligencia, la documentación y la disposición a adaptar las prácticas ante nuevas orientaciones constituyen la mejor estrategia de cumplimiento. El rigor institucional —que caracteriza la mejor tradición jurídica europea— debe aplicarse también a la integración de nuevas tecnologías en el ejercicio profesional.
              </p>
              <p>
                Este análisis forma parte del compromiso de Derecho Artificial con un enfoque sereno y fundamentado de las cuestiones que plantea la intersección entre Derecho e inteligencia artificial. La complejidad del tema exige análisis continuados, y este proyecto editorial mantendrá su seguimiento de los desarrollos normativos, interpretativos y prácticos que se produzcan en los próximos años.
              </p>
            </section>

            {/* Nota editorial */}
            <aside className="border-l-2 border-accent/30 pl-6 my-12">
              <p className="text-sm text-caption italic">
                <strong>Nota editorial:</strong> Este análisis tiene finalidad informativa y no constituye asesoramiento jurídico. La aplicación del AI Act a supuestos concretos requiere un examen individualizado de las circunstancias específicas. Las referencias normativas corresponden al texto del Reglamento (UE) 2024/1689 publicado en el Diario Oficial de la Unión Europea.
              </p>
            </aside>
          </div>

          {/* Back link */}
          <footer className="mt-16 pt-8 border-t border-divider">
            <Link 
              to="/analisis"
              className="text-caption hover:text-foreground transition-colors text-sm"
            >
              ← Volver a Análisis
            </Link>
          </footer>
        </div>
      </article>
    </Layout>
  );
};

export default AIActPracticaJuridica;
