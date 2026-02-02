import type { Metadata } from "next";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

export const metadata: Metadata = {
  title: "Legislation",
  description: "Key laws, regulations and guidance related to artificial intelligence.",
  keywords: [
    "AI legislation",
    "EU AI Act",
    "GDPR",
    "regulatory framework",
    "AI governance",
    "compliance",
  ],
  alternates: {
    canonical: "/en/legislation",
    languages: {
      "es-ES": "/legislacion",
      "en-US": "/en/legislation",
    },
  },
  openGraph: {
    type: "website",
    title: "Legislation",
    description: "Key laws, regulations and guidance related to artificial intelligence.",
    url: "/en/legislation",
    locale: "en_US",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default function LegislationPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com/en",
      },
      {
        name: "Legislation",
        url: "https://derechoartificial.com/en/legislation",
      },
    ],
  });

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <main className="section-spacing">
        <div className="container-editorial">
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">Section</p>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Legislation</h1>
            <p className="text-lg text-body mt-6">Regulatory framework, official guidance, and practical implications.</p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="card-elevated p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">European framework</p>
              <h2 className="font-serif text-2xl text-foreground mb-4">EU AI Act</h2>
              <p className="text-body">
                Core reference for AI risk governance. We monitor its rollout in Spain, technical standards, and sector
                compliance timelines.
              </p>
            </div>

            <div className="card-elevated p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Data protection</p>
              <h2 className="font-serif text-2xl text-foreground mb-4">GDPR and LOPDGDD</h2>
              <p className="text-body">
                Legal base for automated processing and safeguards. Includes guidance from the Spanish DPA and relevant
                enforcement criteria.
              </p>
            </div>

            <div className="card-elevated p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Transparency</p>
              <h2 className="font-serif text-2xl text-foreground mb-4">Access to information</h2>
              <p className="text-body">
                Key legal basis for algorithmic transparency in the public sector and access to source code when social
                rights are affected.
              </p>
            </div>

            <div className="card-elevated p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Liability</p>
              <h2 className="font-serif text-2xl text-foreground mb-4">Risk and sanctions</h2>
              <p className="text-body">
                Combined view of sector regulations, enforcement models, and due diligence obligations for providers and
                deployers.
              </p>
            </div>
          </section>

          <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">2026 structure</p>
            <p className="text-body max-w-3xl">
              The legislation repository is organized by EU framework, national law, and institutional guidance. Each
              entry will include an executive summary, practical implications, and official sources.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
