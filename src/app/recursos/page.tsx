import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Recursos IA",
  description: "Sección Recursos IA en desarrollo: incluye guías y noticias.",
  alternates: { canonical: "/recursos" },
  openGraph: {
    type: "website",
    title: "Recursos IA",
    description: "Sección Recursos IA en desarrollo: incluye guías y noticias.",
    url: "/recursos",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default function RecursosPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Recursos IA", url: "https://derechoartificial.com/recursos" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "Recursos IA", href: "/recursos" }]} />
      <LegalLayout title="Recursos IA" category="Secciones" date={new Date().toISOString().slice(0, 10)}>
        <p className="text-body">
          Sección Recursos IA en desarrollo. Incluirá Guías y Protocolos (AESIA, CEPEJ, Comisión Europea) y Noticias IA.
        </p>
      </LegalLayout>
    </>
  );
}
