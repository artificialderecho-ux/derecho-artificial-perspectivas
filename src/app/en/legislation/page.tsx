import type { Metadata } from "next";

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
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Section</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Legislation</h1>
          <p className="text-lg text-body mt-6">Regulatory framework, official guidance, and practical implications.</p>
        </header>

        <section className="rounded-lg border border-divider bg-surface p-8">
          <p className="text-sm uppercase tracking-widest text-caption mb-3">Repository</p>
          <h2 className="font-serif text-2xl text-foreground">Under update</h2>
          <p className="text-body mt-4 max-w-2xl">
            Repository under update under the 2026 action plan. We are reorganizing primary sources, official
            guidance, and practical notes.
          </p>
        </section>
      </div>
    </main>
  );
}
