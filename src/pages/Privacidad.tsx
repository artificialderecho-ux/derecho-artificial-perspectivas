import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function Privacidad() {
  return (
    <Layout>
      <SEOHead 
        title="Política de Privacidad | Derecho Artificial"
        description="Política de privacidad de Derecho Artificial. Información sobre el tratamiento de datos personales conforme al RGPD y la LOPDGDD."
        canonical="https://derechoartificial.com/privacidad"
      />

      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-6">
            Protección de datos
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Política de Privacidad
          </h1>
          <p className="text-body leading-relaxed">
            Última actualización: enero de 2025
          </p>
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial space-y-12">
            
            {/* Introducción */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                1. Información general
              </h2>
              <p>
                La presente Política de Privacidad informa sobre el tratamiento de datos personales 
                que se realiza en el sitio web derechoartificial.com, de conformidad con el 
                Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 
                2016 (Reglamento General de Protección de Datos, RGPD), y la Ley Orgánica 3/2018, 
                de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos 
                digitales (LOPDGDD).
              </p>
              <p>
                Este sitio web tiene carácter exclusivamente editorial e informativo y 
                <strong> no recoge datos personales de forma activa</strong> salvo los supuestos 
                expresamente indicados en esta política.
              </p>
            </div>

            {/* Responsable */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                2. Responsable del tratamiento
              </h2>
              <p>
                El responsable del tratamiento de los datos personales que, en su caso, pudieran 
                recogerse a través de este sitio web es el titular del proyecto editorial Derecho 
                Artificial, persona física con residencia en España. Para el ejercicio de derechos 
                o cualquier consulta relacionada con la protección de datos, puede utilizarse el 
                formulario de contacto disponible en el sitio.
              </p>
            </div>

            {/* Datos tratados */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                3. Datos personales tratados
              </h2>
              <p>
                Este sitio web no recoge datos personales de los visitantes de forma proactiva. 
                No existen formularios de registro, suscripción a newsletters, ni sistemas de 
                captación de leads.
              </p>
              <p>
                <strong>Formulario de contacto:</strong> En caso de que el usuario utilice el 
                formulario de contacto habilitado, se tratarán los datos proporcionados 
                voluntariamente (nombre, correo electrónico y contenido del mensaje) con la 
                única finalidad de atender la consulta planteada.
              </p>
              <p>
                <strong>Datos de navegación:</strong> El servidor que aloja el sitio web puede 
                registrar automáticamente datos técnicos de acceso (dirección IP, tipo de 
                navegador, sistema operativo, fecha y hora de acceso) con fines de seguridad 
                y mantenimiento técnico. Estos datos no se utilizan para identificar usuarios 
                ni con fines de análisis de comportamiento.
              </p>
            </div>

            {/* Finalidad y base jurídica */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                4. Finalidad y base jurídica del tratamiento
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-divider">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left p-4 border-b border-divider font-medium">Finalidad</th>
                      <th className="text-left p-4 border-b border-divider font-medium">Base jurídica</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-divider">Atención de consultas vía formulario de contacto</td>
                      <td className="p-4 border-b border-divider">Consentimiento del interesado (art. 6.1.a RGPD)</td>
                    </tr>
                    <tr>
                      <td className="p-4 border-b border-divider">Seguridad y mantenimiento técnico del sitio</td>
                      <td className="p-4 border-b border-divider">Interés legítimo del responsable (art. 6.1.f RGPD)</td>
                    </tr>
                    <tr>
                      <td className="p-4">Gestión de cookies técnicas esenciales</td>
                      <td className="p-4">Interés legítimo del responsable (art. 6.1.f RGPD)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conservación */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                5. Conservación de los datos
              </h2>
              <p>
                Los datos proporcionados a través del formulario de contacto se conservarán 
                únicamente durante el tiempo necesario para atender la consulta y, en su caso, 
                el que resulte legalmente exigible para el cumplimiento de obligaciones legales.
              </p>
              <p>
                Los registros técnicos del servidor se conservan por períodos limitados conforme 
                a las políticas del proveedor de alojamiento.
              </p>
            </div>

            {/* Destinatarios */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                6. Destinatarios de los datos
              </h2>
              <p>
                Los datos personales no se ceden a terceros, salvo obligación legal o cuando 
                sea estrictamente necesario para la prestación del servicio de alojamiento web. 
                El proveedor de hosting actúa como encargado del tratamiento conforme a las 
                garantías exigidas por el RGPD.
              </p>
              <p>
                No se realizan transferencias internacionales de datos a países fuera del 
                Espacio Económico Europeo.
              </p>
            </div>

            {/* Derechos */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                7. Derechos de los interesados
              </h2>
              <p>
                De conformidad con el RGPD, los interesados pueden ejercer los siguientes derechos:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li><strong>Acceso:</strong> Conocer si se tratan sus datos y obtener copia de los mismos.</li>
                <li><strong>Rectificación:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
                <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando concurran las circunstancias previstas en el RGPD.</li>
                <li><strong>Limitación:</strong> Solicitar la limitación del tratamiento en los casos previstos legalmente.</li>
                <li><strong>Portabilidad:</strong> Recibir los datos en formato estructurado y de uso común.</li>
                <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos.</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, puede dirigirse al responsable a través del 
                formulario de contacto del sitio, acompañando copia de documento identificativo.
              </p>
              <p>
                Asimismo, tiene derecho a presentar reclamación ante la Agencia Española de 
                Protección de Datos (www.aepd.es) si considera que el tratamiento no se ajusta 
                a la normativa vigente.
              </p>
            </div>

            {/* Seguridad */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                8. Medidas de seguridad
              </h2>
              <p>
                El responsable ha adoptado las medidas técnicas y organizativas adecuadas para 
                garantizar la seguridad de los datos personales y evitar su alteración, pérdida, 
                tratamiento o acceso no autorizado, habida cuenta del estado de la técnica, la 
                naturaleza de los datos y los riesgos a los que están expuestos.
              </p>
            </div>

            {/* Modificaciones */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                9. Modificaciones de la política
              </h2>
              <p>
                Esta Política de Privacidad puede ser actualizada para adaptarla a cambios 
                normativos o a nuevas prácticas de tratamiento. Se recomienda revisarla 
                periódicamente. La fecha de última actualización figura al inicio del documento.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
