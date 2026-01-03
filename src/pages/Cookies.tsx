import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function Cookies() {
  return (
    <Layout>
      <SEOHead 
        title="Política de Cookies | Derecho Artificial"
        description="Política de cookies de Derecho Artificial. Información sobre el uso de cookies en el sitio web conforme a la normativa europea y española."
        canonical="https://derechoartificial.com/cookies"
      />

      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-6">
            Información técnica
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Política de Cookies
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
                1. ¿Qué son las cookies?
              </h2>
              <p>
                Las cookies son pequeños archivos de texto que los sitios web almacenan en el 
                dispositivo del usuario (ordenador, tableta o teléfono móvil) cuando los visita. 
                Permiten que el sitio recuerde información sobre la visita, como preferencias 
                de idioma u otros ajustes, facilitando la navegación.
              </p>
              <p>
                La presente política informa sobre el uso de cookies en el sitio web 
                derechoartificial.com, de conformidad con el artículo 22.2 de la Ley 34/2002, 
                de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio 
                Electrónico (LSSI-CE), y el Reglamento General de Protección de Datos (RGPD).
              </p>
            </div>

            {/* Uso de cookies */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                2. Uso de cookies en este sitio
              </h2>
              <p>
                Este sitio web adopta un enfoque minimalista en el uso de cookies, coherente 
                con su naturaleza editorial y no comercial. <strong>No se utilizan cookies de 
                seguimiento publicitario, cookies de terceros con fines analíticos, ni 
                sistemas de rastreo del comportamiento del usuario.</strong>
              </p>
              <p>
                Únicamente se emplean las cookies técnicas estrictamente necesarias para el 
                funcionamiento del sitio web.
              </p>
            </div>

            {/* Tipos de cookies */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                3. Tipos de cookies utilizadas
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-divider">
                  <thead>
                    <tr className="bg-surface">
                      <th className="text-left p-4 border-b border-divider font-medium">Tipo</th>
                      <th className="text-left p-4 border-b border-divider font-medium">Finalidad</th>
                      <th className="text-left p-4 border-b border-divider font-medium">Duración</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-4 border-b border-divider font-medium">Técnicas esenciales</td>
                      <td className="p-4 border-b border-divider">
                        Permiten la navegación por el sitio web y el uso de sus funciones básicas. 
                        Son necesarias para el funcionamiento del sitio.
                      </td>
                      <td className="p-4 border-b border-divider">Sesión</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-medium">Preferencias</td>
                      <td className="p-4">
                        Almacenan preferencias del usuario como el idioma seleccionado, si aplica.
                      </td>
                      <td className="p-4">Persistente (1 año)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 p-6 bg-surface">
                <p className="text-body text-sm">
                  <strong>Nota:</strong> Este sitio web no utiliza cookies de análisis (como 
                  Google Analytics), cookies publicitarias, cookies de redes sociales ni 
                  ningún otro tipo de cookie que permita el seguimiento del usuario con 
                  fines comerciales.
                </p>
              </div>
            </div>

            {/* Base jurídica */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                4. Base jurídica
              </h2>
              <p>
                Las cookies técnicas estrictamente necesarias para el funcionamiento del sitio 
                web se amparan en el interés legítimo del responsable (artículo 6.1.f del RGPD) 
                y están exceptuadas de la obligación de consentimiento conforme al artículo 22.2 
                de la LSSI-CE, al ser indispensables para la prestación del servicio.
              </p>
              <p>
                En caso de que en el futuro se incorporasen cookies no esenciales, se solicitaría 
                el consentimiento previo e informado del usuario antes de su instalación.
              </p>
            </div>

            {/* Control de cookies */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                5. Cómo gestionar las cookies
              </h2>
              <p>
                El usuario puede configurar su navegador para aceptar, rechazar o eliminar 
                cookies. A continuación se indican los enlaces a las instrucciones de los 
                navegadores más utilizados:
              </p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>
                  <a 
                    href="https://support.google.com/chrome/answer/95647" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:text-caption transition-colors"
                  >
                    Google Chrome
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:text-caption transition-colors"
                  >
                    Mozilla Firefox
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:text-caption transition-colors"
                  >
                    Safari
                  </a>
                </li>
                <li>
                  <a 
                    href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-foreground underline hover:text-caption transition-colors"
                  >
                    Microsoft Edge
                  </a>
                </li>
              </ul>
              <p className="mt-4">
                Tenga en cuenta que la desactivación de cookies técnicas puede afectar al 
                correcto funcionamiento del sitio web.
              </p>
            </div>

            {/* Cookies de terceros */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                6. Cookies de terceros
              </h2>
              <p>
                Este sitio web no instala cookies de terceros. Los enlaces externos a otros 
                sitios web pueden estar sujetos a las políticas de cookies de dichos sitios, 
                sobre las cuales el responsable de este sitio no tiene control.
              </p>
            </div>

            {/* Actualizaciones */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                7. Actualizaciones de esta política
              </h2>
              <p>
                Esta Política de Cookies puede ser actualizada para adaptarla a cambios 
                normativos o técnicos. Se recomienda revisar esta página periódicamente. 
                La fecha de última actualización figura al inicio del documento.
              </p>
            </div>

            {/* Contacto */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                8. Contacto
              </h2>
              <p>
                Para cualquier consulta relacionada con el uso de cookies en este sitio web, 
                puede utilizar el formulario de contacto disponible en la sección correspondiente.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
