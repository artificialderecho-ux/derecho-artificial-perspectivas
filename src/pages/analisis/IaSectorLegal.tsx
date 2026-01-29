import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const IaSectorLegal = () => {
  return (
    <Layout>
      <SEOHead 
        title="Normativa IA Sector Legal: Organismos, Tendencias y Análisis Crítico 2026"
        description="Análisis independiente de normativa AI Act, organismos AESIA/UE y tendencias éticas en derecho legal España/Europa, con enfoque crítico derechos vs. mercado."
        canonical="https://derechoartificial.com/analisis/ia-sector-legal"
        type="article"
        publishedTime="2026-01-18"
      />

      <main className="min-h-screen bg-background text-foreground font-sans">
        <article className="section-spacing">
        {/* Hero Section */}
        <section className="py-20 md:py-32 border-b border-divider">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 text-foreground">
              Normativa, Organismos y Tendencias en IA para el Sector Legal: Análisis Crítico 2026
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto text-body mb-12">
              En el panorama de la "normativa IA sector legal España", la inteligencia artificial representa una transformación profunda en el ámbito jurídico, donde la innovación tecnológica se entrelaza con desafíos éticos y regulatorios. Este análisis independiente, basado en fuentes autorizadas como el Reglamento Europeo de Inteligencia Artificial (AI Act) y obras clave de Giusella Finocchiaro en "El nuevo derecho de la Inteligencia Artificial", Kevin D. Ashley en "Inteligencia Artificial y Analítica Jurídica", Horacio R. Granero en "Inteligencia Artificial y Derecho, un reto social", Fernando H. Llano Alonso en "Inteligencia Artificial y Filosofía del Derecho", el artículo de Miguel Ángel Presno Linera sobre el AI Act, y las guías prácticas de AESIA, examina los "organismos regulación IA jurídica UE" y las "tendencias IA derecho 2026 ética". El enfoque se centra en el "análisis crítico AI Act derechos fundamentales", cuestionando si las regulaciones actuales, como el AI Act, priorizan el mercado interior sobre la defensa de libertades fundamentales, la democracia y el Estado de derecho. Desde la justicia predictiva y los sesgos algorítmicos hasta la geopolítica de la IA y proyecciones para 2026, como la integración del metaverso y armas autónomas, este artículo ofrece una reflexión rigurosa, alejada de discursos promocionales, sobre las implicaciones éticas y prácticas en la era digital. Con un énfasis en el equilibrio entre innovación y protección de derechos, se destaca la necesidad de un escrutinio continuo para garantizar un desarrollo responsable de la IA en el sector legal, incorporando herramientas prácticas como las checklists de AESIA para la gestión de riesgos y transparencia.
            </p>
          </div>
        </section>

        {/* Sección 1: Normativa Clave */}
        <section className="py-20 border-b border-divider">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-foreground">
              Normativa Clave
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-body">
              La normativa clave en IA para el sector legal se ha consolidado alrededor de marcos europeos y nacionales que buscan equilibrar la innovación tecnológica con la protección de derechos fundamentales. El Reglamento Europeo de Inteligencia Artificial (AI Act, UE 2024/1689), detallado por Giusella Finocchiaro en su obra, establece un enfoque basado en riesgos, clasificando sistemas como prohibidos (e.g., manipulación subconsciente), de alto riesgo (e.g., biométricos, que requieren evaluación de conformidad) y de riesgo limitado (e.g., chatbots, con obligaciones de transparencia). Sin embargo, Miguel Ángel Presno Linera critica su orientación mercantil, donde las dilaciones en la entrada en vigor (hasta 2027 para algunos sistemas) podrían comprometer la defensa de derechos fundamentales consagrados en la Carta de Derechos Fundamentales de la UE, priorizando la armonización del mercado interior sobre la precaución ética. Horacio R. Granero, en su análisis de retos sociales, destaca riesgos éticos como sesgos en justicia predictiva, mientras Finocchiaro contextualiza la normativa en un panorama geopolítico donde la UE busca recuperar soberanía regulatoria. En comparación, el RGPD (UE 2016/679) se centra en protección de datos, integrándose con el AI Act para abordar decisiones automatizadas, y la DSA (UE 2022/2065) regula plataformas digitales para combatir desinformación. A nivel nacional, España Digital 2025, mencionada en Llano Alonso, alinea con el AI Act para gobernanza ética, mientras leyes argentinas exploradas por Granero abordan aplicaciones locales en consumo y privacidad. Este análisis crítico revela vulnerabilidades como sesgos algorítmicos y dilaciones regulatorias, que podrían exacerbar desigualdades si no se abordan con rigor.
            </p>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse text-body">
                <thead>
                  <tr className="bg-highlight text-foreground">
                    <th className="p-4 border border-divider">Normativa</th>
                    <th className="p-4 border border-divider">Enfoque Principal</th>
                    <th className="p-4 border border-divider">Análisis Crítico (Basado en Fuentes)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-divider">AI Act (UE 2024/1689)</td>
                    <td className="p-4 border border-divider">Clasificación por riesgos, prohibiciones y obligaciones para alto riesgo</td>
                    <td className="p-4 border border-divider">Orientación mercantil sobre derechos; dilaciones éticas (Presno Linera); contextualización jurídica (Finocchiaro)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-divider">RGPD (UE 2016/679)</td>
                    <td className="p-4 border border-divider">Protección de datos personales y decisiones automatizadas</td>
                    <td className="p-4 border border-divider">Integración con AI Act para mitigar sesgos (guías AESIA); retos en calidad de datos (Ashley/Granero)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-divider">DSA (UE 2022/2065)</td>
                    <td className="p-4 border border-divider">Transparencia en plataformas digitales y combate a desinformación</td>
                    <td className="p-4 border border-divider">Complemento a AI Act en riesgos sociales (Presno Linera); implicaciones éticas (Llano Alonso)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-divider">Convenio Consejo Europa IA</td>
                    <td className="p-4 border border-divider">Principios éticos obligatorios y gobernanza internacional</td>
                    <td className="p-4 border border-divider">Mejor equilibrio derechos vs. mercado (Presno Linera); geopolítica global (Finocchiaro)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-divider">España Digital 2025</td>
                    <td className="p-4 border border-divider">Estrategia nacional para IA ética y responsable</td>
                    <td className="p-4 border border-divider">Alineación con AI Act y guías AESIA; análisis filosófico (Llano Alonso)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-divider">Leyes argentinas (e.g., predictiva en consumo)</td>
                    <td className="p-4 border border-divider">Retos sociales en justicia predictiva y privacidad</td>
                    <td className="p-4 border border-divider">Discriminación algorítmica y sesgos (Granero); comparación con modelos analíticos (Ashley)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-lg leading-relaxed text-body">
              Esta tabla ilustra las tensiones entre armonización mercantil y protección ética, donde riesgos como sesgos y dilaciones regulatorias destacan en críticas de Presno Linera y Granero, mientras Finocchiaro enfatiza la necesidad de escrutinio jurídico continuo.
            </p>
          </div>
        </section>

        {/* Sección 2: Organismos Supervisores */}
        <section className="py-20 border-b border-divider">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-foreground">
              Organismos Supervisores
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-body">
              Los organismos supervisores son esenciales para la gobernanza de la IA en el sector legal, asegurando cumplimiento normativo y equilibrio ético. A continuación, una lista enumerada de entidades clave, con roles basados en fuentes analizadas.
            </p>
            <ol className="list-decimal pl-8 text-lg leading-relaxed text-body">
              <li className="mb-4">
                <strong>AESIA (Agencia Española de Supervisión de la IA)</strong>: Enfoque nacional en implementación AI Act, con guías prácticas para riesgos y transparencia. Roles: Supervisión compliance, checklists autoevaluación, sandbox regulatorio. Enlace: <a href="https://aesia.digital.gob.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-foreground transition-colors">AESIA</a>. Crítica: Facilita gobernanza local, pero limitada por dilaciones UE (Presno Linera).
              </li>
              <li className="mb-4">
                <strong>Comisión Europea</strong>: Desarrollo normas armonizadas, revisiones periódicas y directrices soft law. Roles: Armonización mercado interior, protección derechos (Carta UE). Integración con RGPD/DSA (Finocchiaro).
              </li>
              <li className="mb-4">
                <strong>UNESCO</strong>: Recomendaciones éticas globales para IA, enfocadas en sesgos y educación jurídica. Roles: Promoción principios universales, como en "Ética de la IA" (Llano Alonso). Enlace: <a href="https://unesco.org/es/artificial-intelligence" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-foreground transition-colors">UNESCO</a>.
              </li>
              <li className="mb-4">
                <strong>UNIDROIT</strong>: Armonización derecho privado IA, con talleres sobre responsabilidad (Finocchiaro/Granero). Roles: Adaptación leyes existentes a riesgos internacionales.
              </li>
              <li className="mb-4">
                <strong>OCDE</strong>: Principios IA para geopolítica equilibrada, citados en Finocchiaro. Roles: Evaluación impactos económicos/éticos. Enlace: <a href="https://oecd.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-foreground transition-colors">OCDE</a>.
              </li>
            </ol>
            <p className="text-lg leading-relaxed text-body">
              Estos organismos fomentan una gobernanza colaborativa, pero su efectividad depende de superar tensiones mercantiles (internal link a <Link to="/documentos" className="text-primary hover:text-foreground transition-colors">Documentos y Marcos Normativos</Link>).
            </p>
          </div>
        </section>

        {/* Sección 3: Tendencias Emergentes */}
        <section className="py-20 border-b border-divider">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-foreground">
              Tendencias Emergentes
            </h2>
            <p className="text-lg leading-relaxed mb-8 text-body">
              Las tendencias emergentes en IA para el sector legal, proyectadas a 2026, integran avances técnicos con desafíos éticos y filosóficos, basadas en las fuentes analizadas.
            </p>
            <h3 className="font-serif text-3xl mb-4 text-foreground">
              Justicia Predictiva
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-body">
              Kevin D. Ashley en "Inteligencia Artificial y Analítica Jurídica" describe modelos predictivos como CATO e IBP para anticipar resultados judiciales mediante aprendizaje automático y analítica textual, permitiendo evaluación de casos basados en factores históricos. Horacio R. Granero, en "Inteligencia Artificial y Derecho, un reto social", critica su aplicación en justicia predictiva, destacando riesgos de discriminación algorítmica en tools como Sherlock-Legal, donde sesgos en datos podrían perpetuar desigualdades sociales. Las guías AESIA (introductoria y riesgos) proponen mitigación mediante checklists para transparencia y evaluación de conformidad en sistemas de alto riesgo. Tendencia 2026: Mayor integración en tribunales, pero con escrutinio ético para evitar reemplazo del juicio humano, alineado con la precaución destacada por Presno Linera.
            </p>
            <h3 className="font-serif text-3xl mb-4 text-foreground">
              Sesgos Algorítmicos y Neuroderechos
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-body">
              Fernando H. Llano Alonso y Nuria Belloso Martín en "Inteligencia Artificial y Filosofía del Derecho" analizan sesgos algorítmicos, especialmente de género, proponiendo un derecho a protección contra ellos. Mª Isabel González Tapia aborda neuroderechos penales, cuestionando manipulaciones cerebrales vía neurotecnologías. Las guías AESIA riesgos (Anexo C) listan sesgos como riesgos comunes, con controles (Anexo D) para validación datos. Crítica ética: Podrían erosionar libertad (Llano), eco en retos sociales de Granero. Proyecciones 2026: Regulación específica neuroderechos en UE, integrando con AI Act.
            </p>
            <h3 className="font-serif text-3xl mb-4 text-foreground">
              Singularidad y Metaverso
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-body">
              Llano Alonso discute la singularidad tecnológica y metaverso, transformando identidad del homo faber a novo homo ludens, con impactos en privacidad y derechos. Finocchiaro contextualiza geopolíticamente, mientras guías AESIA transparencia exigen explicabilidad en entornos virtuales. Tendencia 2026: Integración metaverso en contratos jurídicos, con riesgos ciberseguridad (guía AESIA 11).
            </p>
            <h3 className="font-serif text-3xl mb-4 text-foreground">
              Compliance Práctico
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-body">
              Guías AESIA riesgos/transparencia/checklists proporcionan matrices para mitigación (Anexo D controles, E indicadores), integrando con analítica de Ashley para evaluación conformidad. Análisis: Facilita gobernanza práctica, pero subjetividad cualitativa diluye rigor ético (Presno Linera). Internal link a <Link to="/software-ia-legal" className="text-primary hover:text-foreground transition-colors">Software de IA Legal</Link>.
            </p>
            <h3 className="font-serif text-3xl mb-4 text-foreground">
              Geopolítica
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-body">
              Finocchiaro en "El nuevo derecho de la Inteligencia Artificial" examina contexto UE vs. global (EE.UU./China), con UNIDROIT/OCDE en armonización. Presno Linera critica dilaciones UE, mientras Granero destaca impactos sociales en Latinoamérica. Tendencia 2026: Efecto Bruselas en regulaciones globales.
            </p>
            <h3 className="font-serif text-3xl mb-4 text-foreground">
              Retos Filosóficos y Sociales
            </h3>
            <p className="text-lg leading-relaxed mb-8 text-body">
              Granero y Llano abordan retos sociales (discriminación) y filosóficos (automatismo vs. humanidad). Guías AESIA checklists promueven reflexión ética en compliance. Crítica: Necesidad precaución humana (Presno).
            </p>
            <h3 className="font-serif text-3xl mb-4 text-foreground">
              Proyecciones 2026
            </h3>
            <p className="text-lg leading-relaxed text-body">
              Integración metaverso en derecho (Llano), armas autónomas (Campione en Llano), con guías AESIA para poscomercialización. Proyecciones: Mayor escrutinio geopolítico (Finocchiaro), con riesgos neuroderechos y predictivos (Ashley/Granero).
            </p>
          </div>
        </section>

        {/* Multimedia Grid */}
        <section className="py-20 border-b border-divider">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl md:text-5xl mb-8 text-foreground text-center">
              Recursos Visuales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="group bg-background p-10 md:p-14 hover:bg-highlight transition-colors duration-300">
                <img src="/assets/finocchiaro-cover.jpg" alt="Portada del libro El nuevo derecho de la Inteligencia Artificial de Giusella Finocchiaro" className="w-full h-auto mb-4" />
                <p className="text-center text-body group-hover:text-primary transition-colors">Finocchiaro</p>
              </div>
              <div className="group bg-background p-10 md:p-14 hover:bg-highlight transition-colors duration-300">
                <img src="/assets/ashley-cover.jpg" alt="Portada del libro Inteligencia Artificial y Analítica Jurídica de Kevin D. Ashley" className="w-full h-auto mb-4" />
                <p className="text-center text-body group-hover:text-primary transition-colors">Ashley</p>
              </div>
              <div className="group bg-background p-10 md:p-14 hover:bg-highlight transition-colors duration-300">
                <img src="/assets/granero-cover.jpg" alt="Portada del libro Inteligencia Artificial y Derecho, un reto social de Horacio R. Granero" className="w-full h-auto mb-4" />
                <p className="text-center text-body group-hover:text-primary transition-colors">Granero</p>
              </div>
              <div className="group bg-background p-10 md:p-14 hover:bg-highlight transition-colors duration-300">
                <img src="/assets/llano-cover.jpg" alt="Portada del libro Inteligencia Artificial y Filosofía del Derecho de Fernando H. Llano Alonso" className="w-full h-auto mb-4" />
                <p className="text-center text-body group-hover:text-primary transition-colors">Llano Alonso</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-serif text-3xl mb-4 text-foreground text-center">
                Infografía Riesgos AESIA (Anexo C Guía Riesgos)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-body">
                  <thead>
                    <tr className="bg-highlight text-foreground">
                      <th className="p-4 border border-divider">Tipo de Riesgo</th>
                      <th className="p-4 border border-divider">Descripción</th>
                      <th className="p-4 border border-divider">Mitigación Sugerida</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border border-divider">Sesgos y Discriminación</td>
                      <td className="p-4 border border-divider">Sesgos en datos de entrenamiento que perpetúan desigualdades</td>
                      <td className="p-4 border border-divider">Validación de datos y algoritmos inclusivos (guías AESIA)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-divider">Privacidad y Datos</td>
                      <td className="p-4 border border-divider">Uso indebido de datos personales en sistemas biométricos</td>
                      <td className="p-4 border border-divider">Integración con RGPD y anónimización (Finocchiaro)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-divider">Ciberseguridad</td>
                      <td className="p-4 border border-divider">Vulnerabilidades a ataques adversarios</td>
                      <td className="p-4 border border-divider">Pruebas de resiliencia y encriptación (guías AESIA)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border border-divider">Impactos Sociales</td>
                      <td className="p-4 border border-divider">Desigualdades exacerbadas en justicia predictiva</td>
                      <td className="p-4 border border-divider">Precaución humana y auditorías éticas (Granero/Presno)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Conclusión */}
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <p className="text-lg leading-relaxed mb-8 text-body">
              En conclusión, el equilibrio entre mercado y derechos en la IA legal, como critica Presno Linera, exige un escrutinio continuo para evitar que la innovación mercantil eclipse la protección ética. Esta reflexión independiente subraya la necesidad de regulaciones que prioricen el rigor sobre la rapidez, alineadas con nuestro compromiso editorial. Para profundizar en nuestros principios, consulte el <Link to="/manifiesto" className="inline-flex items-center text-sm text-caption hover:text-foreground transition-colors duration-300 uppercase">
                Manifiesto Editorial
                <span className="ml-2">→</span>
              </Link>.
            </p>
          </div>
        </section>
        </article>
      </main>
    </Layout>
  );
};

export default IaSectorLegal;
