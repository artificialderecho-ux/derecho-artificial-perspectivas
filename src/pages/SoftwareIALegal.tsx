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

interface GenerativeAIProfile {
  title: string;
  description: string;
  systemType: string[];
  useCases: string[];
  legalRisks: string[];
  regulatoryConsiderations: string[];
  rgpdConsiderations: string[];
  editorialNote: string;
}

const generativeAIProfile: GenerativeAIProfile = {
  title: "Herramientas de IA generativa para análisis documental jurídico",
  description: "Sistemas basados en modelos de lenguaje de gran escala (LLM) que permiten el análisis, resumen y procesamiento de documentos jurídicos. Su uso típico en despachos incluye análisis de contratos, elaboración de resúmenes de expedientes, apoyo a la investigación normativa y jurisprudencial, y asistencia en la redacción de escritos. Estas herramientas prometen acelerar tareas documentales, aunque su fiabilidad depende críticamente de la calidad de los prompts, la actualización del modelo y la supervisión humana aplicada.",
  systemType: [
    "IA generativa basada en modelos de lenguaje (LLM)",
    "Procesamiento de lenguaje natural (NLP)",
    "Uso profesional jurídico",
  ],
  useCases: [
    "Revisión y análisis de contratos",
    "Preparación de escritos y borradores jurídicos",
    "Investigación normativa y jurisprudencial",
    "Síntesis de expedientes y documentación procesal",
    "Extracción de cláusulas y obligaciones contractuales",
  ],
  legalRisks: [
    "Alucinaciones jurídicas: generación de citas falsas, jurisprudencia inexistente o interpretaciones erróneas",
    "Tratamiento de datos confidenciales en servidores externos sin garantías de seguridad",
    "Falta de trazabilidad sobre el origen de las respuestas generadas",
    "Sesgos algorítmicos que pueden orientar incorrectamente el análisis",
    "Responsabilidad profesional por errores derivados de outputs no verificados",
  ],
  regulatoryConsiderations: [
    "Posible clasificación como sistema de alto riesgo según AI Act si se utiliza en contextos de administración de justicia o interpretación jurídica (Anexo III del Reglamento)",
    "Obligación de supervisión humana significativa en aplicaciones de alto riesgo",
    "Requisitos de gobernanza de datos y documentación técnica para proveedores",
    "Obligaciones de transparencia frente al cliente sobre el uso de herramientas de IA",
  ],
  rgpdConsiderations: [
    "Riesgo de tratamiento de datos personales sin base jurídica clara",
    "Posible transferencia internacional de datos a proveedores ubicados fuera del EEE",
    "Necesidad de evaluar la realización de Evaluación de Impacto (DPIA) en determinados contextos",
    "Obligación de información al interesado cuando se procesan sus datos mediante IA",
  ],
  editorialNote: "Estas herramientas deben entenderse como apoyo técnico, nunca como sustitución del criterio jurídico profesional. La responsabilidad sobre el contenido final permanece íntegramente en el profesional que firma el trabajo. Se recomienda verificar todas las citas, referencias y conclusiones generadas antes de su incorporación a documentos definitivos.",
};

interface CaseManagementProfile {
  title: string;
  description: string;
  systemType: string[];
  useCases: string[];
  legalRisks: string[];
  regulatoryConsiderations: string[];
  rgpdConsiderations: string[];
  editorialNote: string;
}

const caseManagementProfile: CaseManagementProfile = {
  title: "Sistemas de IA para clasificación y priorización de expedientes legales",
  description: "Sistemas de inteligencia artificial analítica y predictiva diseñados para la gestión, clasificación y priorización de casos jurídicos. Estas herramientas aplican algoritmos de aprendizaje automático para analizar expedientes entrantes, asignar niveles de urgencia o complejidad, distribuir cargas de trabajo y predecir plazos o resultados probables. Su uso típico se encuentra en despachos con alto volumen de casos, departamentos jurídicos corporativos y administraciones públicas.",
  systemType: [
    "IA analítica y predictiva",
    "Sistemas de clasificación automática",
    "Aprendizaje automático supervisado",
    "Uso profesional jurídico",
  ],
  useCases: [
    "Clasificación automática de expedientes según materia jurídica",
    "Priorización de casos por urgencia, complejidad o valor económico",
    "Distribución de cargas de trabajo entre profesionales",
    "Predicción de plazos de resolución",
    "Identificación temprana de casos con riesgo elevado",
  ],
  legalRisks: [
    "Errores de clasificación que pueden retrasar casos urgentes",
    "Sesgos algorítmicos en la priorización que afecten a determinados tipos de clientes o materias",
    "Falta de transparencia en los criterios de asignación automática",
    "Responsabilidad profesional por decisiones derivadas de clasificaciones erróneas",
    "Riesgo de discriminación indirecta en el acceso a la justicia",
  ],
  regulatoryConsiderations: [
    "Posible clasificación como sistema de alto riesgo según AI Act si se utiliza en contextos de administración de justicia o acceso a servicios esenciales (Anexo III)",
    "Obligación de supervisión humana significativa en decisiones que afecten a derechos individuales",
    "Requisitos de documentación técnica sobre los criterios de clasificación",
    "Necesidad de evaluación de impacto sobre derechos fundamentales antes del despliegue",
  ],
  rgpdConsiderations: [
    "Tratamiento de datos personales para perfilado y toma de decisiones automatizadas",
    "Obligación de información bajo el artículo 22 RGPD sobre decisiones automatizadas con efectos significativos",
    "Necesidad de Evaluación de Impacto (DPIA) cuando el tratamiento implique evaluación sistemática",
    "Derecho del interesado a obtener intervención humana y a impugnar la decisión",
  ],
  editorialNote: "Estos sistemas deben entenderse como apoyo técnico para la organización del trabajo, nunca como sustitución del criterio profesional en la gestión de casos. La responsabilidad sobre la priorización y asignación de recursos permanece íntegramente en los profesionales responsables. Se recomienda auditoría periódica de los resultados de clasificación para detectar sesgos o errores sistemáticos.",
};

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
        title="Software IA Legal | Herramientas para Abogados - Derecho Artificial"
        description="Análisis de software jurídico basado en inteligencia artificial. Clasificación de riesgos según AI Act, casos de uso y evaluación ética para despachos."
        canonical="https://derechoartificial.com/software-ia-legal"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/software-ia-legal" },
          { lang: "en", href: "https://derechoartificial.com/en/legal-ai-software" }
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-surface">
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
            <p className="text-lg leading-relaxed">
              Esta sección analiza herramientas de inteligencia artificial aplicadas al sector jurídico desde una perspectiva de cumplimiento normativo, ética y riesgo legal. No se realizan recomendaciones comerciales.
            </p>
          </div>
        </div>
      </section>

      {/* Aviso editorial */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="bg-surface p-8 md:p-10">
            <h2 className="font-serif text-xl text-foreground mb-4">
              Enfoque editorial
            </h2>
            <p className="text-body leading-relaxed mb-4">
              Las herramientas analizadas en esta sección se examinan exclusivamente desde la 
              perspectiva del <strong>cumplimiento normativo europeo, los riesgos jurídicos y 
              las implicaciones éticas</strong>, no desde su rendimiento comercial ni su 
              funcionalidad técnica.
            </p>
            <p className="text-body leading-relaxed mb-4">
              Este análisis <strong>no constituye una review comercial, una recomendación de uso 
              ni una evaluación certificada</strong>. No existe relación comercial, de afiliación 
              ni de patrocinio con ningún proveedor de software.
            </p>
            <p className="text-body leading-relaxed font-medium">
              Derecho Artificial no mantiene relación comercial con los proveedores analizados.
            </p>
          </div>
        </div>
      </section>

      {/* Generative AI Profile - Main Feature */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
            Análisis destacado
          </h2>

          <article className="mb-16">
            <div className="border border-divider">
              {/* Header */}
              <div className="p-8 border-b border-divider bg-surface">
                <p className="text-xs uppercase tracking-[0.2em] text-caption mb-2">
                  IA generativa · Análisis documental
                </p>
                <h3 className="font-serif text-2xl text-foreground">
                  {generativeAIProfile.title}
                </h3>
              </div>

              {/* Description */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  1. Descripción funcional
                </h4>
                <p className="text-body leading-relaxed">
                  {generativeAIProfile.description}
                </p>
              </div>

              {/* System type */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  2. Tipo de sistema
                </h4>
                <ul className="space-y-2">
                  {generativeAIProfile.systemType.map((type) => (
                    <li key={type} className="text-body text-sm">• {type}</li>
                  ))}
                </ul>
              </div>

              {/* Use cases */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  3. Contextos de uso habituales
                </h4>
                <ul className="space-y-2">
                  {generativeAIProfile.useCases.map((useCase) => (
                    <li key={useCase} className="text-body text-sm">• {useCase}</li>
                  ))}
                </ul>
              </div>

              {/* Legal risks */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  4. Riesgos jurídicos potenciales
                </h4>
                <ul className="space-y-2">
                  {generativeAIProfile.legalRisks.map((risk) => (
                    <li key={risk} className="text-body text-sm">• {risk}</li>
                  ))}
                </ul>
              </div>

              {/* Regulatory considerations */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  5. Consideraciones regulatorias (UE)
                </h4>
                <ul className="space-y-2">
                  {generativeAIProfile.regulatoryConsiderations.map((consideration) => (
                    <li key={consideration} className="text-body text-sm">• {consideration}</li>
                  ))}
                </ul>
              </div>

              {/* RGPD considerations */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  6. Relación con RGPD
                </h4>
                <ul className="space-y-2">
                  {generativeAIProfile.rgpdConsiderations.map((consideration) => (
                    <li key={consideration} className="text-body text-sm">• {consideration}</li>
                  ))}
                </ul>
              </div>

              {/* Editorial note */}
              <div className="p-8 bg-surface">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  7. Observación editorial
                </h4>
                <p className="text-body leading-relaxed">
                  {generativeAIProfile.editorialNote}
                </p>
              </div>
            </div>
          </article>

          {/* FICHA 2 - Sistemas de IA para apoyo a decisiones jurídicas */}
          <article className="mb-16">
            <div className="border border-divider">
              {/* Header */}
              <div className="p-8 border-b border-divider bg-surface">
                <p className="text-xs uppercase tracking-[0.2em] text-caption mb-2">
                  IA analítica · Apoyo a decisiones
                </p>
                <h3 className="font-serif text-2xl text-foreground">
                  Sistemas de IA para apoyo a decisiones jurídicas
                </h3>
              </div>

              {/* Description */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  1. Descripción funcional
                </h4>
                <p className="text-body leading-relaxed">
                  Sistemas de inteligencia artificial diseñados para asistir a profesionales del Derecho en la toma de decisiones mediante análisis de datos, evaluación de casos similares, estimación de probabilidades de éxito y recomendaciones basadas en patrones identificados en jurisprudencia o documentación jurídica. Estos sistemas pueden aplicarse en contextos como evaluación de riesgos procesales, estimación de indemnizaciones, análisis de precedentes y apoyo a decisiones estratégicas en litigios o negociaciones.
                </p>
              </div>

              {/* System type */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  2. Tipo de sistema
                </h4>
                <ul className="space-y-2">
                  <li className="text-body text-sm">• IA analítica y predictiva</li>
                  <li className="text-body text-sm">• Sistemas de aprendizaje automático supervisado</li>
                  <li className="text-body text-sm">• Análisis de datos estructurados y no estructurados</li>
                  <li className="text-body text-sm">• Uso profesional jurídico</li>
                </ul>
              </div>

              {/* Use cases */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  3. Contextos de uso
                </h4>
                <ul className="space-y-2">
                  <li className="text-body text-sm">• Evaluación de probabilidades de éxito en litigios</li>
                  <li className="text-body text-sm">• Estimación de cuantías indemnizatorias</li>
                  <li className="text-body text-sm">• Análisis de riesgos contractuales</li>
                  <li className="text-body text-sm">• Apoyo a decisiones estratégicas en negociaciones</li>
                  <li className="text-body text-sm">• Evaluación de la fuerza de argumentos jurídicos</li>
                </ul>
              </div>

              {/* Legal risks */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  4. Riesgos jurídicos potenciales
                </h4>
                <ul className="space-y-2">
                  <li className="text-body text-sm">• Errores en la evaluación que pueden llevar a decisiones estratégicas incorrectas</li>
                  <li className="text-body text-sm">• Sesgos algorítmicos que pueden discriminar indirectamente a determinados tipos de clientes o casos</li>
                  <li className="text-body text-sm">• Falta de transparencia en los criterios de evaluación y ponderación</li>
                  <li className="text-body text-sm">• Responsabilidad profesional por decisiones basadas en recomendaciones no verificadas</li>
                  <li className="text-body text-sm">• Riesgo de delegación indebida del criterio profesional en sistemas automatizados</li>
                  <li className="text-body text-sm">• Posible vulneración del deber de diligencia profesional si se confía ciegamente en los outputs del sistema</li>
                </ul>
              </div>

              {/* Regulatory considerations */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  5. Consideraciones regulatorias (AI Act)
                </h4>
                <ul className="space-y-2">
                  <li className="text-body text-sm">• Clasificación como sistema de alto riesgo si se utiliza en administración de justicia o interpretación jurídica (Anexo III del Reglamento)</li>
                  <li className="text-body text-sm">• Obligación de supervisión humana significativa en aplicaciones de alto riesgo</li>
                  <li className="text-body text-sm">• Requisitos de evaluación de conformidad y documentación técnica para sistemas de alto riesgo</li>
                  <li className="text-body text-sm">• Obligaciones de transparencia y explicabilidad según el nivel de riesgo</li>
                  <li className="text-body text-sm">• Necesidad de evaluación de impacto sobre derechos fundamentales antes del despliegue</li>
                </ul>
              </div>

              {/* RGPD considerations */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  6. Relación con RGPD
                </h4>
                <ul className="space-y-2">
                  <li className="text-body text-sm">• Tratamiento de datos personales para perfilado y toma de decisiones automatizadas</li>
                  <li className="text-body text-sm">• Obligación de información bajo el artículo 22 RGPD sobre decisiones automatizadas con efectos significativos</li>
                  <li className="text-body text-sm">• Necesidad de Evaluación de Impacto (DPIA) cuando el tratamiento implique evaluación sistemática</li>
                  <li className="text-body text-sm">• Derecho del interesado a obtener intervención humana y a impugnar la decisión</li>
                  <li className="text-body text-sm">• Garantía de base jurídica adecuada para el tratamiento de datos personales</li>
                </ul>
              </div>

              {/* Editorial note */}
              <div className="p-8 bg-surface">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  7. Observación editorial
                </h4>
                <p className="text-body leading-relaxed">
                  Estos sistemas deben entenderse exclusivamente como herramientas de apoyo técnico que requieren supervisión humana constante. La responsabilidad sobre las decisiones finales permanece íntegramente en el profesional que las adopta. Se recomienda verificar sistemáticamente las recomendaciones del sistema, comprender sus limitaciones y mantener siempre el control efectivo sobre el proceso de toma de decisiones.
                </p>
              </div>
            </div>
          </article>

          {/* Case Management Profile */}
          <article className="mb-16">
            <div className="border border-divider">
              {/* Header */}
              <div className="p-8 border-b border-divider bg-surface">
                <p className="text-xs uppercase tracking-[0.2em] text-caption mb-2">
                  IA analítica · Gestión de expedientes
                </p>
                <h3 className="font-serif text-2xl text-foreground">
                  {caseManagementProfile.title}
                </h3>
              </div>

              {/* Description */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  1. Descripción funcional
                </h4>
                <p className="text-body leading-relaxed">
                  {caseManagementProfile.description}
                </p>
              </div>

              {/* System type */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  2. Tipo de sistema
                </h4>
                <ul className="space-y-2">
                  {caseManagementProfile.systemType.map((type) => (
                    <li key={type} className="text-body text-sm">• {type}</li>
                  ))}
                </ul>
              </div>

              {/* Use cases */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  3. Contextos de uso habituales
                </h4>
                <ul className="space-y-2">
                  {caseManagementProfile.useCases.map((useCase) => (
                    <li key={useCase} className="text-body text-sm">• {useCase}</li>
                  ))}
                </ul>
              </div>

              {/* Legal risks */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  4. Riesgos jurídicos potenciales
                </h4>
                <ul className="space-y-2">
                  {caseManagementProfile.legalRisks.map((risk) => (
                    <li key={risk} className="text-body text-sm">• {risk}</li>
                  ))}
                </ul>
              </div>

              {/* Regulatory considerations */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  5. Consideraciones regulatorias (UE)
                </h4>
                <ul className="space-y-2">
                  {caseManagementProfile.regulatoryConsiderations.map((consideration) => (
                    <li key={consideration} className="text-body text-sm">• {consideration}</li>
                  ))}
                </ul>
              </div>

              {/* RGPD considerations */}
              <div className="p-8 border-b border-divider">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  6. Relación con RGPD
                </h4>
                <ul className="space-y-2">
                  {caseManagementProfile.rgpdConsiderations.map((consideration) => (
                    <li key={consideration} className="text-body text-sm">• {consideration}</li>
                  ))}
                </ul>
              </div>

              {/* Editorial note */}
              <div className="p-8 bg-surface">
                <h4 className="text-sm uppercase tracking-wider text-caption mb-4">
                  7. Observación editorial
                </h4>
                <p className="text-body leading-relaxed">
                  {caseManagementProfile.editorialNote}
                </p>
              </div>
            </div>
          </article>

          <div className="bg-surface border border-divider p-6 md:p-8">
            <p className="text-body text-sm leading-relaxed">
              <strong>Derecho Artificial no mantiene relación comercial con los proveedores analizados.</strong> Esta ficha tiene carácter exclusivamente informativo y no constituye recomendación, asesoramiento ni evaluación certificada de ningún producto o servicio.
            </p>
          </div>
        </div>
      </section>

      {/* Additional Software Profiles */}
      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-10">
            Otras fichas de análisis
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
