import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const shareToX = () => {
  if (typeof window === "undefined") return;
  const text = encodeURIComponent("¿Es la IA autoalojada realmente privada? Análisis crítico sobre Clawdbot y el RGPD en @DerechoArtificial. ⚖️🤖");
  const url = encodeURIComponent(`${window.location.origin}${window.location.pathname}`);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
};

export default function ClawdbotIlusionPrivacidad() {
  return (
    <Layout>
      <SEOHead
        title="Clawdbot y la Ilusión de la Privacidad: Riesgos Críticos del RGPD"
        description="Análisis crítico de la arquitectura de Clawdbot y sus implicaciones legales: responsabilidad del tratamiento, incumplimientos específicos del RGPD y conclusiones operativas."
        canonical="https://derechoartificial.com/analisis/clawdbot-ilusion-privacidad"
        type="article"
        publishedTime={new Date().toISOString().split("T")[0]}
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <div className="flex items-start justify-between gap-6 mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-caption">Privacidad y Cumplimiento</p>
            <button
              onClick={shareToX}
              className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
            >
              Compartir en X →
            </button>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-6 leading-tight">
            Clawdbot y la Ilusión de la Privacidad: Riesgos Críticos del RGPD
          </h1>
          <p className="text-body-large text-muted-foreground">Última actualización: {new Date().toLocaleDateString("es-ES")}</p>
        </div>
      </section>

      <section className="py-6 border-t border-divider">
        <div className="container-narrow">
          <div className="rounded-md p-6 md:p-8 bg-amber-100 text-amber-900 border border-amber-200">
            <p className="text-sm md:text-base leading-relaxed">
              Aviso Crítico: La arquitectura de Clawdbot puede imponerle legalmente el rol de Responsable del Tratamiento, trasladándole toda la carga sancionatoria.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-editorial">
          <div className="prose-editorial space-y-12">
            <blockquote className="border-l-4 border-primary pl-4 text-foreground text-lg md:text-xl">
              “Si conectas Clawdbot a OpenAI o Anthropic... tus datos siguen yendo a la nube, punto”
            </blockquote>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Introducción</h2>
              <p>
                Este análisis examina la promesa de privacidad asociada a arquitecturas de IA autoalojadas como Clawdbot. Aunque se publicitan como soluciones que
                evitan la exposición de datos, la integración con modelos externos y servicios de inferencia en la nube introduce flujos de datos que pueden
                desvirtuar dicha promesa. La cuestión central no es la localización del ejecutable, sino el control efectivo sobre el tratamiento y las transferencias.
              </p>
              <p>
                La arquitectura técnica condiciona el reparto de responsabilidades. Cuando el sistema decide qué datos se envían a terceros, cuándo se consultan
                APIs externas y cómo se agregan resultados, se configura una posición jurídica concreta frente al RGPD que no puede ignorarse.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">El Usuario como Responsable</h2>
              <p>
                Si el usuario configura, decide finalidades y determina los medios esenciales del tratamiento, asume el rol de Responsable del Tratamiento. En
                arquitecturas como Clawdbot, la elección de proveedores de inferencia (OpenAI, Anthropic u otros), la activación de herramientas con acceso a
                información sensible y la parametrización de prompts que arrastran datos personales sitúan al usuario en el centro de la decisión.
              </p>
              <p>
                Quien integra el sistema para realizar tareas sobre datos de clientes, empleados o expedientes, determina finalidades y medios. La responsabilidad
                no se desplaza al proveedor externo por el mero hecho de usar su API. En términos prácticos, esto obliga a realizar análisis de riesgos, firmar
                acuerdos de encargo cuando proceda y documentar decisiones técnicas con impacto en los derechos.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Incumplimientos Específicos</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  Base jurídica insuficiente para envíos a terceros países cuando se usan proveedores con transferencia internacional sin garantías adecuadas.
                </li>
                <li>
                  Falta de información clara al interesado sobre el uso de sistemas de IA con llamadas externas y generación de perfiles.
                </li>
                <li>
                  Ausencia de medidas de minimización al enviar prompts con datos excesivos o documentos completos para tareas no estrictamente necesarias.
                </li>
                <li>
                  Evaluaciones de impacto ausentes en casos de alto riesgo, especialmente cuando se automatizan decisiones o se tratan categorías especiales.
                </li>
                <li>
                  Trazabilidad deficiente de las operaciones y ausencia de registros que acrediten cumplimiento y supervisión humana efectiva.
                </li>
              </ul>
              <p className="mt-4">
                La falsa sensación de privacidad se produce cuando se confunde “autoalojado” con “autocontenido”. La conexión a modelos externos implica
                tratamiento por terceros, potencial transferencia internacional y obligaciones de diligencia reforzada.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">Conclusión</h2>
              <p>
                La arquitectura de Clawdbot puede convertir al usuario en Responsable del Tratamiento, con la consiguiente asunción de obligaciones y exposición
                sancionadora. La clave es gobernar el flujo de datos, limitar integraciones externas y documentar el cumplimiento. La privacidad no se garantiza
                por el simple hecho de instalar un software local, sino por decisiones técnicas y organizativas verificables.
              </p>
            </div>

            <div className="pt-6">
              <a
                href="/informe-clawdbot-rgpd.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                📥 Descargar Informe Técnico Completo (PDF - 7 págs)
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <Link
            to="/analisis"
            className="inline-flex items-center text-sm text-caption hover:text-foreground transition-colors duration-300"
          >
            ← Volver a Análisis
          </Link>
        </div>
      </section>
      </article>
    </Layout>
  );
}
