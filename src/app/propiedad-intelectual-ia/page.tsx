import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Propiedad Intelectual IA",
  description: "Sección en desarrollo",
  alternates: { canonical: "/propiedad-intelectual-ia" },
  openGraph: {
    type: "website",
    title: "Propiedad Intelectual IA",
    description: "Sección en desarrollo",
    url: "/propiedad-intelectual-ia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default function PropiedadIntelectualIAPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Propiedad Intelectual IA", url: "https://derechoartificial.com/propiedad-intelectual-ia" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Propiedad Intelectual IA", href: "/propiedad-intelectual-ia" }]} />
      <LegalLayout title="Propiedad Intelectual IA" category="Secciones" date={new Date().toISOString().slice(0, 10)}>
        <p className="text-body">Sección en desarrollo</p>
      </LegalLayout>
    </>
  );
}
