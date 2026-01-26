import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const Contacto = () => {

  return (
    <Layout>
      <SEOHead 
        title="Contacto | Consultas y Colaboraciones - Derecho Artificial"
        description="Formulario de contacto para consultas jurídicas sobre IA, correcciones y colaboraciones editoriales. Tiempos de respuesta y normativa de privacidad."
        canonical="https://derechoartificial.com/contacto"
      />

      <section className="section-spacing">
        <div className="container-editorial">
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-caption mb-4">
              Contacto
            </p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
              Póngase en contacto
            </h1>
            <p className="text-lg text-body max-w-2xl">
              Agradecemos sugerencias, correcciones, propuestas de colaboración 
              y cualquier comentario constructivo sobre nuestro trabajo.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <form
                action="https://formspree.io/f/artificialderecho@gmail.com"
                method="POST"
                className="space-y-6"
              >
                <input type="hidden" name="_next" value="https://www.derechoartificial.com/contacto" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-foreground">
                      Nombre
                    </Label>
                    <Input
                      id="name"
                      name="nombre"
                      type="text"
                      required
                      className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none"
                      placeholder="Su nombre"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-foreground">
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium text-foreground">
                    Asunto
                  </Label>
                  <Input
                    id="subject"
                    name="asunto"
                    type="text"
                    required
                    className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none"
                    placeholder="Motivo de su mensaje"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium text-foreground">
                    Mensaje
                  </Label>
                  <Textarea
                    id="message"
                    name="mensaje"
                    required
                    rows={8}
                    className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none resize-none"
                    placeholder="Escriba su mensaje aquí..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Enviar mensaje
                </Button>
                <p className="text-xs text-caption mt-4">
                  Al enviar este formulario, aceptas que Derecho Artificial trate tus datos para responder a tu consulta.
                </p>
              </form>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    Tiempos de respuesta
                  </h3>
                  <p className="text-sm text-body">
                    Respondemos a todos los mensajes en un plazo de 3-5 días 
                    hábiles. Para consultas urgentes, por favor indíquelo en 
                    el asunto.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    Propuestas de colaboración
                  </h3>
                  <p className="text-sm text-body">
                    Si desea proponer un artículo o colaboración, incluya 
                    una breve descripción del tema propuesto y su experiencia 
                    en el área.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg text-foreground mb-3">
                    Correcciones
                  </h3>
                  <p className="text-sm text-body">
                    Si ha identificado un error en alguno de nuestros contenidos, 
                    agradecemos la corrección. Incluya la URL del artículo y 
                    describa el error detectado.
                  </p>
                </div>

                <div className="pt-8 border-t border-divider">
                  <p className="text-xs text-caption">
                    Los datos proporcionados se utilizarán exclusivamente para 
                    responder a su consulta. No compartimos información con 
                    terceros ni enviamos comunicaciones no solicitadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contacto;
