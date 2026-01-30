import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

const Jurisprudence = () => {
  return (
    <Layout>
      <SEOHead 
        title="Jurisprudence | Derecho Artificial"
        description="Relevant court rulings and judicial decisions on AI and Law."
        canonical="https://derechoartificial.com/en/jurisprudence"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/jurisprudencia" },
          { lang: "en", href: "https://derechoartificial.com/en/jurisprudence" }
        ]}
      />
      <section className="py-24 bg-surface">
        <div className="container-narrow text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Jurisprudence</h1>
          <p className="text-xl text-body">Section under construction. Coming soon.</p>
        </div>
      </section>
    </Layout>
  );
};

export default Jurisprudence;