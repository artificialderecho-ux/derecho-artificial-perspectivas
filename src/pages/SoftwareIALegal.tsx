import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

interface SoftwareProfile {
  name: string;
  category: string;
  description: string;
  targetUsers: string[];
  useCases: string[];
  legalRisks: string[];
  ethicalRisks: string[];
  aiActRisk: "bajo" | "medio" | "alto";
  transparency: string;
  humanOversight: string;
}

const softwareProfiles: SoftwareProfile[] = [
  {
    name: "Sistemas de investigación jurídica asistida por IA",
    category: "Investigación jurisprudencial",
    description: "Herramientas que emplean procesamiento del lenguaje natural y técnicas de aprendizaje automático para facilitar la búsqueda, análisis y síntesis de jurisprudencia, legislación y doctrina jurídica. Estos sistemas prometen acelerar la investigación legal y mejorar la exhaustividad de los resultados, aunque su fiabilidad depende de la calidad de las fuentes indexadas y de los algoritmos de relevancia empleados.",
    targetUsers: [
      "Abogados en ejercicio",
      "Asesores jurídicos de empresa",
      "Jueces y magistrados",
      "Académicos e investigadores jurídicos",
      "Departamentos de cumplimiento normativo",
    ],
    useCases: [
      "Búsqueda de jurisprudencia aplicable a un caso concreto",
      "Identificación de tendencias jurisprudenciales",
      "Análisis de la evolución de criterios interpretativos",
      "Localización de doctrina relevante para fundamentar escritos",
      "Verificación de la vigencia normativa",
    ],
    legalRisks: [
      "Omisión de resoluciones relevantes no indexadas o mal clasificadas",
      "Sesgo en la priorización de resultados que puede orientar incorrectamente el análisis",
      "Dependencia excesiva que erosiona las competencias de investigación del profesional",
      "Posible responsabilidad profesional por errores derivados de resultados incompletos",
      "Problemas de confidencialidad si las consultas se procesan en servidores externos",
    ],
    ethicalRisks: [
      "Opacidad en los criterios de ordenación y priorización de resultados",
      "Posible reproducción de sesgos presentes en el corpus jurisprudencial",
      "Riesgo de homogeneización del razonamiento jurídico",
      "Falta de transparencia sobre las limitaciones del sistema",
    ],
    aiActRisk: "bajo",
    transparency: "Variable. La mayoría de los proveedores no publican información detallada sobre sus modelos de lenguaje, fuentes de entrenamiento ni criterios de relevancia. El nivel de explicabilidad de los resultados es generalmente bajo.",
    humanOversight: "Imprescindible. Estos sistemas deben considerarse herramientas de apoyo que requieren validación experta de todos los resultados. El profesional mantiene la responsabilidad íntegra sobre el análisis jurídico y las conclusiones.",
  },
];

export default function SoftwareIALegal() {
  return (
    <Layout>
      <SEOHead 
        title="Software de IA Legal | Derecho Artificial"
        description="Análisis crítico e independiente de herramientas de inteligencia artificial para el sector jurídico. Evaluación de riesgos legales, éticos y de cumplimiento normativo."
        canonical="https://derechoartificial.com/software-ia-legal"
      />

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
              Aviso editorial
            </h2>
            <p className="text-body leading-relaxed">
              Los análisis publicados en esta sección tienen carácter exclusivamente informativo 
              y divulgativo. <strong>No constituyen recomendación, asesoramiento ni evaluación 
              certificada de ningún producto o servicio</strong>. No existe relación comercial, 
              de afiliación ni de patrocinio con ningún proveedor de software. La inclusión de 
              una herramienta en esta sección no implica valoración positiva ni negativa sobre 
              su idoneidad para casos concretos.
            </p>
          </div>
        </div>
      </section>

      {/* Software Profiles */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
            Fichas de análisis
          </h2>

          {softwareProfiles.map((profile) => (
            <article key={profile.name} className="mb-16 last:mb-0">
              <div className="border border-divider">
                {/* Header */}
                <div className="p-8 border-b border-divider bg-surface">
                  <p className="text-xs uppercase tracking-[0.2em] text-caption mb-2">
                    {profile.category}
                  </p>
                  <h3 className="font-serif text-2xl text-foreground">
                    {profile.name}
                  </h3>
                </div>

                {/* Description */}
                <div className="p-8 border-b border-divider">
                  <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                    Descripción funcional
                  </h4>
                  <p className="text-body leading-relaxed">
                    {profile.description}
                  </p>
                </div>

                {/* Target users and use cases */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-divider">
                  <div className="p-8 border-b md:border-b-0 md:border-r border-divider">
                    <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                      Profesionales destinatarios
                    </h4>
                    <ul className="space-y-2">
                      {profile.targetUsers.map((user) => (
                        <li key={user} className="text-body text-sm">• {user}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8">
                    <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                      Casos de uso habituales
                    </h4>
                    <ul className="space-y-2">
                      {profile.useCases.map((useCase) => (
                        <li key={useCase} className="text-body text-sm">• {useCase}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Risks */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-b border-divider">
                  <div className="p-8 border-b md:border-b-0 md:border-r border-divider">
                    <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                      Riesgos legales
                    </h4>
                    <ul className="space-y-2">
                      {profile.legalRisks.map((risk) => (
                        <li key={risk} className="text-body text-sm">• {risk}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-8">
                    <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                      Riesgos éticos
                    </h4>
                    <ul className="space-y-2">
                      {profile.ethicalRisks.map((risk) => (
                        <li key={risk} className="text-body text-sm">• {risk}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* AI Act classification */}
                <div className="p-8 border-b border-divider">
                  <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                    Clasificación aproximada según AI Act
                  </h4>
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 text-sm font-medium ${
                      profile.aiActRisk === "alto" 
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                        : profile.aiActRisk === "medio"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                        : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    }`}>
                      Riesgo {profile.aiActRisk}
                    </span>
                    <p className="text-body text-sm">
                      {profile.aiActRisk === "bajo" && "Sistemas de uso general sin impacto directo en derechos fundamentales"}
                      {profile.aiActRisk === "medio" && "Sistemas con obligaciones de transparencia"}
                      {profile.aiActRisk === "alto" && "Sistemas sujetos a requisitos reforzados de conformidad"}
                    </p>
                  </div>
                  <p className="text-caption text-xs mt-4">
                    Nota: La clasificación puede variar según el uso específico del sistema. Los sistemas 
                    de IA destinados a la administración de justicia o la interpretación de la ley pueden 
                    clasificarse como de alto riesgo conforme al Anexo III del Reglamento.
                  </p>
                </div>

                {/* Transparency */}
                <div className="p-8 border-b border-divider">
                  <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                    Nivel de transparencia
                  </h4>
                  <p className="text-body leading-relaxed">
                    {profile.transparency}
                  </p>
                </div>

                {/* Human oversight */}
                <div className="p-8">
                  <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                    Supervisión humana requerida
                  </h4>
                  <p className="text-body leading-relaxed">
                    {profile.humanOversight}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Categorías de software jurídico con IA
          </h2>
          
          <div className="prose-editorial mb-10">
            <p>
              El mercado de software de inteligencia artificial aplicado al Derecho abarca 
              diversas categorías funcionales. Las fichas de análisis se irán incorporando 
              progresivamente según criterios de relevancia y rigor editorial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Automatización documental
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Sistemas de generación y gestión de documentos jurídicos mediante plantillas 
                inteligentes, ensamblaje automático y flujos de trabajo estandarizados.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Justicia predictiva
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Herramientas que analizan resoluciones judiciales históricas para estimar 
                probabilidades de éxito procesal. Categoría de alto riesgo según el AI Act.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                Análisis de contratos
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Herramientas de revisión automatizada que identifican cláusulas, riesgos 
                contractuales y desviaciones respecto a plantillas estándar.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider">
              <h3 className="font-serif text-lg text-foreground mb-2">
                E-discovery
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Plataformas de análisis masivo de documentos para litigios y procedimientos 
                de investigación, con clasificación y priorización mediante aprendizaje automático.
              </p>
            </div>
            
            <div className="p-6 bg-surface border border-divider md:col-span-2">
              <h3 className="font-serif text-lg text-foreground mb-2">
                IA generativa para profesionales del Derecho
              </h3>
              <p className="text-body text-sm leading-relaxed">
                Modelos de lenguaje y asistentes conversacionales diseñados o adaptados para 
                tareas jurídicas: redacción de escritos, síntesis de expedientes, generación 
                de borradores contractuales. Plantean cuestiones específicas de responsabilidad 
                y supervisión humana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial criteria */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Criterios editoriales de análisis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Riesgo jurídico</h3>
              <p className="text-body text-sm leading-relaxed">
                Evaluación de los riesgos legales derivados del uso de la herramienta, 
                incluyendo responsabilidad profesional y confidencialidad.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Supervisión humana</h3>
              <p className="text-body text-sm leading-relaxed">
                Análisis del grado de control humano que permite la herramienta y de los 
                mecanismos de revisión disponibles.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Transparencia</h3>
              <p className="text-body text-sm leading-relaxed">
                Valoración de la explicabilidad de los resultados y la documentación 
                técnica disponible.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Conformidad AI Act</h3>
              <p className="text-body text-sm leading-relaxed">
                Análisis del cumplimiento con el Reglamento Europeo de Inteligencia Artificial 
                según clasificación de riesgo.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Datos jurídicos</h3>
              <p className="text-body text-sm leading-relaxed">
                Examen de las fuentes de datos, actualización y cobertura jurisdiccional.
              </p>
            </div>
            
            <div className="p-6 bg-surface">
              <h3 className="font-serif text-lg text-foreground mb-2">Deontología</h3>
              <p className="text-body text-sm leading-relaxed">
                Impacto en la responsabilidad deontológica del abogado y en la relación 
                con el cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Posicionamiento editorial */}
      <section className="py-16 border-t border-divider">
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
              con desarrolladores de software y no incluye enlaces de afiliación.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
