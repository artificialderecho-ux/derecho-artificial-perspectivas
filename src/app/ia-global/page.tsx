import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "IA Global",
  description: "Sección en desarrollo",
  alternates: { canonical: "/ia-global" },
  openGraph: {
    type: "website",
    title: "IA Global",
    description: "Sección en desarrollo",
    url: "/ia-global",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default function IAGlobalPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "IA Global", url: "https://derechoartificial.com/ia-global" },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }, { label: "IA Global", href: "/ia-global" }]} />
      <LegalLayout title="IA Global" category="Secciones" date={new Date().toISOString().slice(0, 10)}>
        <p className="text-body">Sección en desarrollo</p>
      </LegalLayout>
    </>
  );
}
