import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

const Legislacion = () => {
  return (
    <Layout>
      <SEOHead 
        title="Legislación | Derecho Artificial"
        description="Normativa y legislación vigente sobre Inteligencia Artificial y tecnología."
        canonical="https://derechoartificial.com/legislacion"
      />
      <section className="py-24 bg-surface">
        <div className="container-narrow text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Legislación</h1>
          <p className="text-xl text-body">Sección en construcción. Próximamente disponible.</p>
        </div>
      </section>
    </Layout>
  );
};

export default Legislacion;
