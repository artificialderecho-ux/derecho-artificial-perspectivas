import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

const ActualidadIA = () => {
  return (
    <Layout>
      <SEOHead 
        title="Actualidad IA | Derecho Artificial"
        description="Noticias y actualizaciones sobre el mundo de la Inteligencia Artificial y el Derecho."
        canonical="https://derechoartificial.com/actualidad-ia"
      />
      <section className="py-24 bg-surface">
        <div className="container-narrow text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Actualidad IA</h1>
          <p className="text-xl text-body">Sección en construcción. Próximamente disponible.</p>
        </div>
      </section>
    </Layout>
  );
};

export default ActualidadIA;
