import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const AnalisisRiaEstrategico = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AnalysisNewsArticle",
    headline: "Informe Estratégico: El Nuevo Orden de la IA en la UE (Reglamento 2024/1689)",
    description: "Análisis profundo sobre el cumplimiento del EU AI Act, arquitectura de riesgos, modelos GPAI y el papel de la AESIA en España.",
    datePublished: "2026-01-24",
    author: {
      "@type": "Person",
      name: "R.S.C."
    },
    publisher: {
      "@type": "Organization",
      name: "Derecho Artificial",
      url: "https://derechoartificial.com"
    },
    mainEntityOfPage: "https://derechoartificial.com/analisis/analisis-ria-estrategico",
    about: [
      { "@type": "Thing", name: "Reglamento (UE) 2024/1689" },
      { "@type": "Organization", name: "AESIA" },
      { "@type": "Thing", name: "Compliance" }
    ],
    keywords: [
      "Reglamento (UE) 2024/1689",
      "AI Act",
      "Compliance",
      "AESIA",
      "GPAI"
    ]
  };

  return (
    <Layout>
      <SEOHead
        title="Informe Estratégico: El Nuevo Orden de la IA en la UE (Reglamento 2024/1689)"
        description="Análisis profundo sobre el cumplimiento del EU AI Act, arquitectura de riesgos, modelos GPAI y el papel de la AESIA en España."
        canonical="https://derechoartificial.com/analisis/analisis-ria-estrategico"
        type="article"
        publishedTime="2026-01-24"
      />

      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <article className="section-spacing">
        <div className="container-narrow">
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm uppercase tracking-widest text-caption">Informe estratégico</span>
              <span className="text-caption">·</span>
              <time className="text-sm text-caption">24 de enero, 2026</time>
              <span className="text-caption">·</span>
              <span className="text-sm text-caption">R.S.C.</span>
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-8">
              Informe Estratégico: El Nuevo Orden Operativo de la IA
            </h1>
            <p className="text-lg text-body leading-relaxed">
              Este informe sintetiza el nuevo mapa operativo que impone el Reglamento (UE) 2024/1689 y traduce sus obligaciones en criterios prácticos de cumplimiento para operadores, proveedores y autoridades públicas.
            </p>
          </header>

          <section className="mb-16">
            <div className="bg-surface p-6 md:p-8 italic text-body">
              Resumen ejecutivo: el EU AI Act redefine el ciclo de vida de los sistemas de IA con un enfoque de riesgo, introduce obligaciones específicas para modelos fundacionales y desplaza el centro de gravedad del cumplimiento hacia la trazabilidad, la gobernanza y la supervisión humana efectiva.
            </div>
          </section>

          <div className="prose-editorial">
            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                1. Alcance operativo y objetivos de cumplimiento
              </h2>
              <p>
                El Reglamento (UE) 2024/1689 no es solo un texto jurídico; es un marco operativo que obliga a rediseñar procesos internos, cadenas de suministro y gobernanza tecnológica. Su alcance extraterritorial exige que cualquier sistema de IA desplegado en la Unión se adecúe a criterios de seguridad, transparencia y respeto de derechos fundamentales.
              </p>
              <p>
                La lectura estratégica del Reglamento desplaza el foco desde la innovación hacia la responsabilidad. El cumplimiento ya no se limita a la documentación, sino que se integra en decisiones técnicas, de negocio y de contratación pública.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                2. Arquitectura de riesgos y categorías aplicables
              </h2>
              <p>
                La clasificación por niveles de riesgo define la intensidad regulatoria. Para facilitar su aplicación, se propone una lectura funcional que conecta cada categoría con obligaciones concretas de cumplimiento.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                <div className="p-4 bg-surface border border-divider">
                  <h3 className="font-serif text-lg text-foreground mb-2">Riesgo inaceptable</h3>
                  <p className="text-body text-sm leading-relaxed">
                    Prohibición inmediata de prácticas como puntuación social o manipulación de vulnerabilidades. No admite excepción salvo supuestos muy tasados.
                  </p>
                </div>
                <div className="p-4 bg-surface border border-divider">
                  <h3 className="font-serif text-lg text-foreground mb-2">Riesgo alto</h3>
                  <p className="text-body text-sm leading-relaxed">
                    Sistemas en sectores críticos (justicia, empleo, educación). Exigen gestión de riesgos, calidad de datos, supervisión humana y registro.
                  </p>
                </div>
                <div className="p-4 bg-surface border border-divider">
                  <h3 className="font-serif text-lg text-foreground mb-2">Riesgo limitado</h3>
                  <p className="text-body text-sm leading-relaxed">
                    Obligaciones de transparencia y avisos al usuario. Incluye sistemas conversacionales y ciertos usos de IA generativa.
                  </p>
                </div>
                <div className="p-4 bg-surface border border-divider">
                  <h3 className="font-serif text-lg text-foreground mb-2">Riesgo mínimo</h3>
                  <p className="text-body text-sm leading-relaxed">
                    Sin obligaciones específicas, pero sujetos a normas sectoriales y a códigos voluntarios de conducta.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                3. Modelos GPAI y umbrales técnicos
              </h2>
              <p>
                El Reglamento introduce obligaciones específicas para los modelos de propósito general, en especial los sistemas clasificados como <Link to="/glosario-ia-legal" className="underline underline-offset-4">GPAI</Link>. Estos modelos deberán documentar sus capacidades, límites, y evaluar riesgos sistémicos antes de su puesta en servicio.
              </p>
              <p>
                El umbral operativo relevante aparece cuando el entrenamiento supera <code>10^25 FLOP</code>, indicador que el legislador utiliza como proxy para identificar modelos con impacto sistémico. Esta métrica obliga a los proveedores a justificar medidas de mitigación y transparencia reforzada.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                4. Supervisión, AESIA y escenarios de cumplimiento
              </h2>
              <p>
                En España, la AESIA se perfila como un nodo de gobernanza central para la supervisión del Reglamento. Su papel no se limita a la vigilancia del mercado: también coordinará estándares de cumplimiento, procedimientos de auditoría y el despliegue de entornos de prueba regulatoria o <Link to="/glosario-ia-legal" className="underline underline-offset-4">Sandbox</Link>.
              </p>
              <p>
                El cumplimiento efectivo dependerá de la interoperabilidad entre autoridades nacionales, auditorías técnicas y la adopción de metodologías de evaluación de riesgos coherentes.
              </p>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                5. Calendario de aplicación
              </h2>
              <p>
                El despliegue es progresivo y exige planificación anticipada. Las fechas clave permiten escalonar auditorías y adaptación contractual.
              </p>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-sm border border-divider">
                  <thead className="bg-surface">
                    <tr>
                      <th className="text-left p-3 border-b border-divider font-medium">Fecha</th>
                      <th className="text-left p-3 border-b border-divider font-medium">Hito regulatorio</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 border-b border-divider">Febrero 2025</td>
                      <td className="p-3 border-b border-divider">Prohibiciones de riesgo inaceptable y obligaciones iniciales de transparencia.</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-divider">Agosto 2025</td>
                      <td className="p-3 border-b border-divider">Entrada en vigor de requisitos para modelos GPAI y documentación técnica.</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-divider">Febrero 2026</td>
                      <td className="p-3 border-b border-divider">Aplicación de obligaciones de alto riesgo para nuevos sistemas.</td>
                    </tr>
                    <tr>
                      <td className="p-3">Agosto 2026</td>
                      <td className="p-3">Supervisión plena y régimen sancionador operativo.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-16">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-6">
                6. Sesgo algorítmico y riesgos jurídicos emergentes
              </h2>
              <p>
                El cumplimiento no puede limitarse a una visión formal. Los riesgos de <Link to="/glosario-ia-legal" className="underline underline-offset-4">Sesgo Algorítmico</Link> son hoy el principal frente de litigiosidad y exigencia de transparencia en decisiones automatizadas.
              </p>
              <p>
                Este nuevo orden operativo exige que abogados, proveedores y autoridades integren mecanismos de trazabilidad, auditorías de datos y criterios de explicabilidad como parte central de sus políticas de compliance.
              </p>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default AnalisisRiaEstrategico;
