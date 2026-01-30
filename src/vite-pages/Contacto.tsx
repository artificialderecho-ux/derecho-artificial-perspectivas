import { useState, type FormEvent } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocation, useNavigate } from "react-router-dom";

const copyLink = (id: string) => {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  alert("Enlace de sección copiado");
};

const Contacto = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const hasSuccess = searchParams.get("enviado") === "1";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const validate = () => {
    if (!values.nombre.trim()) return "El nombre es obligatorio.";
    if (!values.email.trim()) return "El correo electrónico es obligatorio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      return "El correo electrónico no es válido.";
    }
    if (!values.asunto.trim()) return "El asunto es obligatorio.";
    if (!values.mensaje.trim()) return "El mensaje es obligatorio.";
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validationError = validate();
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mbdoyvje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        setSubmitError("No se ha podido enviar el mensaje. Inténtalo de nuevo.");
        return;
      }

      navigate("/contacto?enviado=1", { replace: true });
    } catch {
      setSubmitError("No se ha podido enviar el mensaje. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <SEOHead 
        title="Contacto | Consultas y Colaboraciones - Derecho Artificial"
        description="Formulario de contacto para consultas jurídicas sobre IA, correcciones y colaboraciones editoriales. Tiempos de respuesta y normativa de privacidad."
        canonical="https://derechoartificial.com/contacto"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/contacto" },
          { lang: "en", href: "https://derechoartificial.com/en/contact" }
        ]}
      />

      <section className="section-spacing" id="contacto">
        <div className="container-editorial">
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-caption mb-4">
              Contacto
            </p>
            <div className="flex items-center gap-2 mb-6">
              <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Póngase en contacto
              </h1>
              <button
                type="button"
                onClick={() => copyLink("contacto")}
                className="text-muted-foreground hover:text-foreground transition-colors text-base"
                aria-label="Copiar enlace de sección"
              >
                🔗
              </button>
            </div>
            <p className="text-lg text-body max-w-2xl">
              Agradecemos sugerencias, correcciones, propuestas de colaboración 
              y cualquier comentario constructivo sobre nuestro trabajo.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              {hasSuccess && (
                <div className="mb-8 rounded-md bg-green-50 px-4 py-3 border border-green-200">
                  <p className="text-sm text-green-800">
                    Gracias por tu mensaje. Hemos recibido correctamente tu consulta y responderemos en los próximos días hábiles.
                  </p>
                </div>
              )}
              {submitError && (
                <div className="mb-8 rounded-md bg-red-50 px-4 py-3 border border-red-200">
                  <p className="text-sm text-red-800">{submitError}</p>
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
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
                      value={values.nombre}
                      onChange={(e) => setValues((v) => ({ ...v, nombre: e.target.value }))}
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
                      value={values.email}
                      onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
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
                    value={values.asunto}
                    onChange={(e) => setValues((v) => ({ ...v, asunto: e.target.value }))}
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
                    value={values.mensaje}
                    onChange={(e) => setValues((v) => ({ ...v, mensaje: e.target.value }))}
                    className="bg-background border border-[#e5e7eb] focus:border-[#1a1a1a] focus:ring-0 focus:outline-none resize-none"
                    placeholder="Escriba su mensaje aquí..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensaje"}
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
