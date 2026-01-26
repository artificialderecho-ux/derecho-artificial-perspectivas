import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const IAAlucinaTribunales = () => {
  return (
    <Layout>
      <SEOHead 
        title="Cuando la IA alucina en los tribunales: responsabilidad y deber de verificación"
        description="Análisis del artículo de Concepción Campos Acuña sobre alucinaciones de IA en tribunales, responsabilidad profesional y deber de verificación."
        canonical="https://derechoartificial.com/analisis/ia-alucina-tribunales-quien-paga-el-precio"
        type="article"
        publishedTime="2026-01-20"
      />

      <section className="py-16 md:py-24 bg-surface">
        <div className="container-narrow">
          <Link to="/analisis" className="inline-flex items-center text-sm text-caption hover:text-foreground transition-colors duration-300 mb-8">
            ← Volver a Análisis
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Cuando la IA “alucina” en los tribunales, ¿quién paga el precio?
          </h1>
          <p className="text-xl text-body leading-relaxed mb-8">
            Síntesis crítica del artículo de Concepción Campos Acuña sobre la responsabilidad profesional en el uso de IA generativa en procedimientos judiciales.
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-caption">
            <span>Fecha: 20 de enero, 2026</span>
            <span>·</span>
            <span>Categoría: Responsabilidad Profesional & IA</span>
            <span>·</span>
            <span>Tiempo de lectura: 7 min</span>
          </div>
        </div>
      </section>

      <section className="py-12 border-t border-divider">
        <div className="container-editorial">
          <div className="prose-editorial max-w-4xl mx-auto">
            <div className="p-8 bg-surface border-l-4 border-foreground mb-12">
              <h3 className="font-serif text-lg text-foreground mb-4">Fuente analizada</h3>
              <p className="text-body mb-2">
                <strong>Cuando la IA “alucina” en los tribunales, ¿quién paga el precio?</strong>
              </p>
              <p className="text-body text-sm">
                Medio: Cinco Días (El País).<br/>
                Autora: Concepción Campos Acuña.<br/>
                Fecha: 20 de enero de 2026.
              </p>
            </div>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-foreground mb-6">Resumen del artículo</h2>
              <p>
                El texto analiza un riesgo emergente en la práctica judicial: las “alucinaciones” de la IA generativa, cuando inventa jurisprudencia, datos o citas legales. 
                Aunque el error técnico proviene de la herramienta, la responsabilidad ética y jurídica recae en los profesionales que la usan, porque la IA no firma escritos ni dicta sentencias.
              </p>
              <p>
                La tesis central es que la eficiencia no puede sustituir el deber de verificación. El deber deontológico exige revisar fuentes, y el Reglamento Europeo de IA 
                convierte la alfabetización digital en una obligación profesional.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-foreground mb-6">1. La “alucinación legal” como riesgo sistémico</h2>
              <p>
                Los modelos de lenguaje pueden producir textos jurídicos verosímiles en forma y estilo, pero falsos en contenido. En el ámbito judicial esto no es un fallo
                menor: compromete la integridad del sistema de justicia y erosiona la confianza en la argumentación jurídica.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-foreground mb-6">2. Cadena de responsabilidad</h2>
              <p>
                La IA actúa como herramienta auxiliar, no como sujeto de responsabilidad. Por eso el peso jurídico y ético recae en quien presenta la información.
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4 text-body">
                <li>
                  <strong>Abogados:</strong> presentar citas falsas vulnera el deber de veracidad ante el tribunal y puede derivar en sanciones económicas y reputacionales.
                </li>
                <li>
                  <strong>Jueces:</strong> el uso de IA sin control en resoluciones judiciales puede convertir un error técnico en una injusticia vinculante.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-foreground mb-6">3. Implicaciones éticas y AI Act</h2>
              <p>
                El Reglamento Europeo de IA introduce obligaciones de alfabetización en IA. Esto eleva la comprensión de sus límites a un deber profesional, y elimina la 
                excusa del desconocimiento. La diligencia técnica se convierte en requisito jurídico.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-serif text-2xl text-foreground mb-6">4. Soluciones propuestas</h2>
              <ul className="list-disc pl-6 space-y-2 my-4 text-body">
                <li>Protocolos de verificación obligatoria en documentos judiciales.</li>
                <li>Sanciones ejemplares para disuadir usos negligentes.</li>
                <li>Formación continua en IA para operadores jurídicos.</li>
              </ul>
              <p>
                La IA puede apoyar tareas como síntesis o detección de patrones, pero no sustituye el criterio jurídico. Para más contexto normativo, ver 
                <Link to="/documentos" className="text-primary hover:text-foreground transition-colors">Documentos</Link>.
              </p>
            </section>

            <section className="p-8 bg-surface border border-divider mt-16">
              <h3 className="font-serif text-2xl text-foreground mb-4">Conclusión</h3>
              <p>
                La IA no paga el precio porque no tiene patrimonio ni responsabilidad profesional. El coste lo asumen los abogados y jueces con su credibilidad, y los 
                ciudadanos con la inseguridad jurídica. La alucinación de la máquina se convierte en negligencia humana cuando se presenta sin revisión.
              </p>
            </section>

            <section className="mt-12">
              <h3 className="font-serif text-xl text-foreground mb-4">Fuente y enlace</h3>
              <p>
                Consulta la noticia original en Cinco Días:{" "}
                <a
                  href="https://cincodias.elpais.com/legal/2026-01-20/cuando-la-ia-alucina-en-los-tribunales-quien-paga-el-precio.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-foreground transition-colors"
                >
                  Ir a la noticia original
                </a>
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IAAlucinaTribunales;
