import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

const Jurisprudencia = () => {
  return (
    <Layout>
      <SEOHead 
        title="Jurisprudencia | Derecho Artificial"
        description="Sentencias y resoluciones judiciales relevantes sobre IA y Derecho."
        canonical="https://derechoartificial.com/jurisprudencia"
      />
      <section className="py-24 bg-surface">
        <div className="container-narrow text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Jurisprudencia</h1>
          <p className="text-xl text-body">Sección en construcción. Próximamente disponible.</p>
        </div>
      </section>
    </Layout>
  );
};

export default Jurisprudencia;
