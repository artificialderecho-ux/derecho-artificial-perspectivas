import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

export default function AvisoLegal() {
  return (
    <Layout>
      <SEOHead 
        title="Aviso Legal | Derecho Artificial"
        description="Aviso legal y condiciones de uso del sitio web Derecho Artificial. Información sobre titularidad, condiciones de uso y propiedad intelectual."
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
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-narrow">
          <div className="prose-editorial space-y-12">
            
            {/* Información general */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                1. Información general
              </h2>
              <p>
                Este sitio web, denominado "Derecho Artificial", es un proyecto editorial 
                independiente dedicado al análisis jurídico, ético y regulatorio de la 
                inteligencia artificial, con especial atención al marco normativo de la 
                Unión Europea y España.
              </p>
            </div>

            {/* Titularidad del sitio */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                2. Titularidad del sitio
              </h2>
              <p>
                De conformidad con lo dispuesto en la Ley 34/2002 (LSSI-CE), se informa que 
                el responsable del sitio web es:
              </p>
              <ul className="list-none space-y-2 mt-4 pl-0">
                <li><strong>Responsable:</strong> [Nombre o denominación del titular]</li>
                <li><strong>Correo electrónico de contacto:</strong> [email de contacto]</li>
                <li><strong>Actividad:</strong> Proyecto editorial sin fines comerciales</li>
              </ul>
            </div>

            {/* Condiciones de uso */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                3. Condiciones de uso
              </h2>
              <p>
                El acceso y uso de este sitio web atribuye la condición de usuario, quien 
                acepta utilizar los contenidos de forma lícita y conforme al ordenamiento 
                jurídico vigente.
              </p>
              <p>
                Los contenidos tienen carácter informativo y editorial, y <strong>no constituyen 
                asesoramiento jurídico profesional</strong>.
              </p>
            </div>

            {/* Propiedad intelectual */}
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                4. Propiedad intelectual
              </h2>
              <p>
                Todos los contenidos del sitio web, salvo indicación expresa en contrario, 
                son propiedad del titular del sitio o se utilizan conforme a licencias 
                legítimas. Queda prohibida su reproducción sin autorización.
              </p>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
