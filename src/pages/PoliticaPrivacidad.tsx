import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function PoliticaPrivacidad() {
  return (
    <Layout>
      <SEOHead 
        title="Política de Privacidad | Derecho Artificial"
        description="Política de privacidad de Derecho Artificial. Información sobre el tratamiento de datos personales conforme al RGPD."
        canonical="https://derechoartificial.com/politica-de-privacidad"
      />

      <section className="py-16 md:py-24">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-6">
            Protección de datos
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-medium text-foreground mb-8 leading-tight">
            Política de Privacidad
          </h1>
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial space-y-12">
            
            {/* Responsable del tratamiento */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                1. Responsable del tratamiento
              </h2>
              <p>
                El responsable del tratamiento de los datos personales es el titular del 
                sitio Derecho Artificial.
              </p>
            </div>

            {/* Datos personales tratados */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                2. Datos personales tratados
              </h2>
              <p>
                Este sitio web no recoge datos personales de forma activa, salvo aquellos 
                que el usuario facilite voluntariamente mediante correo electrónico.
              </p>
              <p>
                No se realizan registros de usuarios ni perfiles automatizados.
              </p>
            </div>

            {/* Finalidad del tratamiento */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                3. Finalidad del tratamiento
              </h2>
              <p>
                Los datos facilitados se utilizarán únicamente para responder a consultas 
                editoriales o de contacto.
              </p>
            </div>

            {/* Base jurídica */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                4. Base jurídica
              </h2>
              <p>
                La base legal del tratamiento es el consentimiento del interesado, conforme 
                al artículo 6.1.a del Reglamento General de Protección de Datos (RGPD).
              </p>
            </div>

            {/* Conservación de los datos */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                5. Conservación de los datos
              </h2>
              <p>
                Los datos se conservarán únicamente durante el tiempo necesario para atender 
                la finalidad para la que fueron recabados.
              </p>
            </div>

            {/* Cesión de datos */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                6. Cesión de datos
              </h2>
              <p>
                No se cederán datos personales a terceros ni se realizarán transferencias 
                internacionales de datos.
              </p>
            </div>

            {/* Derechos del usuario */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                7. Derechos del usuario
              </h2>
              <p>
                El usuario puede ejercer los derechos de acceso, rectificación, supresión, 
                limitación y oposición mediante comunicación al correo de contacto del sitio.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
