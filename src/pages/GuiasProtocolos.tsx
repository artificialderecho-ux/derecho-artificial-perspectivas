import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";

const GuiasProtocolos = () => {
  return (
    <Layout>
      <SEOHead 
        title="Guías y Protocolos | Derecho Artificial"
        description="Recursos prácticos, guías de implementación y protocolos para el uso de IA en el sector legal."
        canonical="https://derechoartificial.com/guias-protocolos"
      />
      <section className="py-24 bg-surface">
        <div className="container-narrow text-center">
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6">Guías y Protocolos</h1>
          <p className="text-xl text-body">Sección en construcción. Próximamente disponible.</p>
        </div>
      </section>
    </Layout>
  );
};

export default GuiasProtocolos;
