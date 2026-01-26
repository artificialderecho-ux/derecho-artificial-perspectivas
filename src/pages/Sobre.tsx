import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
const copyLink = (id: string) => {
  if (typeof window === "undefined") return;
  const url = `${window.location.origin}${window.location.pathname}#${id}`;
  navigator.clipboard.writeText(url);
  alert("Enlace de sección copiado");
};

const Sobre = () => {
  return (
    <Layout>
      <SEOHead 
        title="Sobre Nosotros | Quiénes Somos - Derecho Artificial"
        description="Conoce el proyecto editorial independiente Derecho Artificial. Principios de independencia, rigor jurídico y metodología en el análisis de la inteligencia artificial."
        canonical="https://derechoartificial.com/sobre"
      />

      <article id="mision" className="section-spacing">
        <div className="container-editorial">
          {/* Header */}
          <header className="mb-16">
            <p className="text-sm uppercase tracking-widest text-caption mb-4">
              Sobre el proyecto
            </p>
            <div className="flex items-center gap-2 mb-6">
              <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">
                Sobre Derecho Artificial
              </h1>
              <button
                type="button"
                onClick={() => copyLink("mision")}
                className="text-muted-foreground hover:text-foreground transition-colors text-base"
                aria-label="Copiar enlace de sección"
              >
                🔗
              </button>
            </div>
            <p className="text-lg text-body">
              Un espacio para la reflexión jurídica rigurosa en la era de la inteligencia artificial.
            </p>
          </header>

          {/* Content */}
          <div className="prose-editorial">
            <section className="mb-16">
              <h2>Qué es Derecho Artificial</h2>
              <p>
                Derecho Artificial es una publicación editorial independiente dedicada 
                al análisis de las implicaciones jurídicas, éticas y sociales de la 
                inteligencia artificial. Nuestro objetivo es contribuir al debate 
                informado sobre cómo el Derecho debe responder a los desafíos que 
                plantean estas tecnologías.
              </p>
              <p>
                Fundado en 2024, el proyecto nace de la convicción de que el mundo 
                hispanohablante necesita un espacio de referencia donde profesionales 
                del Derecho, académicos, reguladores y ciudadanos puedan encontrar 
                análisis riguroso y accesible sobre estos temas.
              </p>
            </section>

            <section className="mb-16">
              <h2>Por qué existimos</h2>
              <p>
                La inteligencia artificial está transformando la práctica jurídica 
                y plantea cuestiones fundamentales sobre justicia, responsabilidad 
                y derechos humanos. Sin embargo, gran parte del debate público está 
                dominado por:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li>
                  Discursos promocionales de empresas tecnológicas que minimizan riesgos.
                </li>
                <li>
                  Narrativas sensacionalistas que exageran amenazas sin rigor.
                </li>
                <li>
                  Análisis técnicos inaccesibles para no especialistas.
                </li>
                <li>
                  Contenido en inglés que no considera las particularidades de 
                  los sistemas jurídicos hispanohablantes.
                </li>
              </ul>
              <p>
                Derecho Artificial busca ocupar el espacio intermedio: análisis 
                serio pero accesible, crítico pero constructivo, global pero 
                atento a las realidades locales.
              </p>
            </section>

            <section className="mb-16">
              <h2>A quién nos dirigimos</h2>
              <p>
                Nuestros contenidos están diseñados para:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li>
                  <strong>Profesionales del Derecho</strong>: Abogados, jueces, 
                  fiscales y notarios que necesitan comprender las herramientas 
                  de IA que afectan su práctica.
                </li>
                <li>
                  <strong>Académicos e investigadores</strong>: Profesores y 
                  estudiantes de Derecho que estudian la intersección con la tecnología.
                </li>
                <li>
                  <strong>Reguladores y decisores políticos</strong>: Funcionarios 
                  que diseñan e implementan marcos normativos para la IA.
                </li>
                <li>
                  <strong>Ciudadanos informados</strong>: Personas interesadas en 
                  comprender cómo la IA afecta sus derechos.
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2>Nuestro enfoque</h2>
              <p>
                Nos guiamos por los siguientes principios metodológicos:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li>
                  <strong>Rigor académico</strong>: Basamos nuestros análisis en 
                  fuentes primarias, jurisprudencia y doctrina actualizada.
                </li>
                <li>
                  <strong>Independencia editorial</strong>: No aceptamos contenido 
                  patrocinado ni publicidad que comprometa nuestra línea editorial.
                </li>
                <li>
                  <strong>Accesibilidad</strong>: Evitamos la jerga innecesaria sin 
                  sacrificar precisión técnica.
                </li>
                <li>
                  <strong>Perspectiva crítica</strong>: Cuestionamos tanto el 
                  tecno-optimismo como el catastrofismo injustificado.
                </li>
                <li>
                  <strong>Enfoque práctico</strong>: Conectamos el análisis teórico 
                  con implicaciones concretas para la práctica jurídica.
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2>Cómo trabajamos</h2>
              <p>
                Todos nuestros contenidos pasan por un proceso de revisión editorial 
                que incluye verificación de fuentes y revisión por pares cuando es 
                apropiado. Publicamos correcciones cuando identificamos errores y 
                mantenemos transparencia sobre nuestras fuentes de financiación.
              </p>
              <p>
                Actualmente, Derecho Artificial es un proyecto sin ánimo de lucro 
                sostenido por contribuciones voluntarias. No utilizamos publicidad 
                intrusiva ni vendemos datos de usuarios. Nuestra única fuente de 
                ingresos son donaciones de lectores y ocasionales proyectos de 
                consultoría académica.
              </p>
            </section>

            {/* SECCIÓN BIOGRAFÍA ACTUALIZADA */}
            <section className="mb-16 p-8 bg-surface border border-divider">
              <h2>Sobre el responsable editorial</h2>
              <p className="text-lg mb-6">
                Este proyecto editorial está dirigido y coordinado por 
                <strong> Ricardo S. C.</strong>
              </p>
              
              <div className="space-y-4 text-body leading-relaxed">
                <p>
                  <strong>Formación Académica</strong>
                </p>
                <ul className="list-disc pl-6 space-y-1 my-2 text-body">
                  <li>Licenciado en Derecho por la Universidad Europea de Madrid.</li>
                  <li>Máster en Informática Jurídica por la Universidad Nacional de Educación a Distancia (UNED).</li>
                  <li>Máster en Dirección de Empresas Audiovisuales por el Instituto de Empresa (IE) de Madrid.</li>
                </ul>
                
                <p className="mt-6">
                  <strong>Equipo Editorial Multidisciplinar</strong>
                </p>
                <p>
                  Para abordar la complejidad de la Inteligencia Artificial, este proyecto 
                  cuenta con la colaboración activa de expertos de primer nivel en cada especialidad. 
                  Las aportaciones externas se nutren de ingenieros en Inteligencia Artificial, 
                  programadores especialistas y filósofos del Derecho, garantizando una visión 
                  integral, técnica y humanista de los desafíos jurídicos actuales.
                </p>
              </div>
            </section>

            <section>
              <h2>Participe</h2>
              <p>
                Derecho Artificial es un proyecto abierto a la colaboración. Si 
                comparte nuestros valores y desea contribuir—como autor, revisor, 
                traductor o de cualquier otra forma—le invitamos a ponerse en 
                contacto con nosotros.
              </p>
              <p>
                También agradecemos sugerencias de temas, correcciones de errores 
                y comentarios constructivos sobre nuestros contenidos. La calidad 
                de este proyecto depende del diálogo con nuestra comunidad de lectores.
              </p>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default Sobre;
