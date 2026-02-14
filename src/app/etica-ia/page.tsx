import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Ética IA",
  description: "Sección en desarrollo",
  alternates: { canonical: "/etica-ia" },
  openGraph: {
    type: "website",
    title: "Ética IA",
    description: "Sección en desarrollo",
    url: "/etica-ia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default function EticaIAPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Ética IA", url: "https://derechoartificial.com/etica-ia" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Ética IA", href: "/etica-ia" }]} />
      <LegalLayout title="Ética IA" category="Secciones" date={new Date().toISOString().slice(0, 10)}>
        <p className="text-body">Sección en desarrollo</p>
      </LegalLayout>
    </>
  );
}
