import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function Cookies() {
  return (
    <Layout>
      <SEOHead 
        title="Política de Cookies | Derecho Artificial"
        description="Política de cookies de Derecho Artificial. Información sobre el uso de cookies técnicas en el sitio web."
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
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial space-y-12">
            
            {/* Uso de cookies */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                1. Uso de cookies
              </h2>
              <p>
                Este sitio web utiliza únicamente cookies técnicas necesarias para su 
                correcto funcionamiento.
              </p>
              <p>
                No se utilizan cookies publicitarias, de seguimiento ni de análisis 
                comportamental.
              </p>
            </div>

            {/* Tipos de cookies */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                2. Tipos de cookies
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>Cookies técnicas:</strong> permiten la navegación y el uso de las 
                  funcionalidades básicas del sitio.
                </li>
              </ul>
            </div>

            {/* Gestión de cookies */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                3. Gestión de cookies
              </h2>
              <p>
                El usuario puede configurar su navegador para bloquear o eliminar cookies, 
                aunque ello podría afectar al correcto funcionamiento del sitio.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
