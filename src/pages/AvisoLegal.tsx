import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AvisoLegal() {
  return (
    <Layout>
      <SEOHead 
        title="Aviso Legal | Derecho Artificial"
        description="Aviso legal y condiciones de uso del sitio web Derecho Artificial. Información sobre el responsable editorial, propiedad intelectual y limitación de responsabilidad."
        canonical="https://derechoartificial.com/aviso-legal"
      />

      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-6">
            Información legal
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Aviso Legal
          </h1>
          <p className="text-body leading-relaxed">
            Última actualización: enero de 2025
          </p>
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial space-y-12">
            
            {/* Identificación */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                1. Identificación del responsable
              </h2>
              <p>
                El presente sitio web, accesible en el dominio derechoartificial.com, es un proyecto 
                editorial independiente de carácter informativo y divulgativo, dedicado al análisis 
                de la intersección entre el Derecho, la ética y la inteligencia artificial.
              </p>
              <p>
                El responsable del proyecto editorial se identifica como persona física con residencia 
                en España. Para cualquier comunicación relacionada con el contenido del sitio, puede 
                utilizarse la dirección de contacto habilitada en la sección correspondiente.
              </p>
            </div>

            {/* Naturaleza del contenido */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                2. Naturaleza del contenido
              </h2>
              <p>
                Los contenidos publicados en Derecho Artificial tienen carácter exclusivamente 
                informativo, analítico y divulgativo. <strong>No constituyen asesoramiento jurídico, 
                profesional ni de ningún otro tipo</strong>, ni establecen relación profesional alguna 
                entre el editor y los lectores.
              </p>
              <p>
                La información proporcionada no sustituye el consejo de profesionales cualificados 
                en materia legal, fiscal, técnica o de cualquier otra naturaleza. Se recomienda 
                encarecidamente consultar con profesionales especializados antes de adoptar 
                decisiones basadas en el contenido de este sitio.
              </p>
              <p>
                Este proyecto <strong>no presta servicios legales</strong> ni mantiene actividad 
                mercantil alguna relacionada con el ejercicio de la abogacía o cualquier otra 
                profesión regulada.
              </p>
            </div>

            {/* Propiedad intelectual */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                3. Propiedad intelectual
              </h2>
              <p>
                Los contenidos originales publicados en este sitio web —incluyendo textos, diseño, 
                estructura y elementos gráficos— están protegidos por la legislación vigente en 
                materia de propiedad intelectual. Queda prohibida su reproducción, distribución, 
                comunicación pública o transformación sin autorización expresa del titular, salvo 
                en los casos permitidos por la ley.
              </p>
              <p>
                Las citas de textos normativos, resoluciones judiciales y documentos oficiales 
                se realizan con fines informativos y de análisis, respetando en todo caso los 
                derechos de sus titulares y la normativa aplicable.
              </p>
              <p>
                Los enlaces a fuentes externas se proporcionan a efectos informativos y no implican 
                relación de afiliación, patrocinio ni responsabilidad sobre el contenido de los 
                sitios enlazados.
              </p>
            </div>

            {/* Limitación de responsabilidad */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                4. Limitación de responsabilidad
              </h2>
              <p>
                El editor no garantiza la ausencia de errores en los contenidos publicados, ni 
                asume responsabilidad por las decisiones adoptadas por terceros con base en la 
                información proporcionada. Pese a que se realiza un esfuerzo constante por mantener 
                la exactitud y actualización de la información, el carácter dinámico de la normativa 
                y la jurisprudencia impide garantizar su vigencia en todo momento.
              </p>
              <p>
                El editor no se responsabiliza de daños o perjuicios derivados del acceso, uso o 
                imposibilidad de uso del sitio web, ni de eventuales errores u omisiones en sus 
                contenidos.
              </p>
            </div>

            {/* Enlaces externos */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                5. Enlaces externos
              </h2>
              <p>
                Este sitio web puede contener enlaces a sitios externos con fines exclusivamente 
                informativos. El editor no se hace responsable del contenido, políticas de 
                privacidad ni prácticas de dichos sitios. Se recomienda revisar las condiciones 
                legales de cada sitio antes de proporcionar información personal.
              </p>
            </div>

            {/* Modificaciones */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                6. Modificaciones
              </h2>
              <p>
                El editor se reserva el derecho de modificar, actualizar o suprimir los contenidos 
                del sitio web y las presentes condiciones legales sin previo aviso. Se recomienda 
                revisar periódicamente esta página para conocer los términos vigentes.
              </p>
            </div>

            {/* Jurisdicción */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                7. Legislación aplicable y jurisdicción
              </h2>
              <p>
                Las presentes condiciones se rigen por la legislación española. Para cualquier 
                controversia que pudiera derivarse del acceso o uso de este sitio web, las partes 
                se someten a la jurisdicción de los tribunales competentes en España, con renuncia 
                expresa a cualquier otro fuero que pudiera corresponderles.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
