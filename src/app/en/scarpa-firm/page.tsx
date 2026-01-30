import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scarpa Firm",
  description: "In-depth legal analysis, critical opinion, and regulatory foresight.",
  keywords: [
    "Ricardo Scarpa",
    "legal analysis",
    "AI regulation",
    "EU AI Act",
    "AI compliance",
    "editorial opinion",
  ],
  alternates: {
    canonical: "/en/scarpa-firm",
    languages: {
      "es-ES": "/firma-scarpa",
      "en-US": "/en/scarpa-firm",
    },
  },
  openGraph: {
    type: "website",
    title: "Scarpa Firm",
    description: "In-depth legal analysis, critical opinion, and regulatory foresight.",
    url: "/en/scarpa-firm",
    locale: "en_US",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default function ScarpaFirmPage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Section</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Scarpa Firm</h1>
          <p className="text-lg text-body mt-6">In-depth legal analysis, critical opinion, and regulatory foresight.</p>
        </header>
      </div>
    </main>
  );
}
