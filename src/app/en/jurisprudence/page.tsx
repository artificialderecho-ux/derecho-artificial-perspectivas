import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jurisprudence",
  description: "Selection and analysis of relevant decisions on technology, data and AI.",
  keywords: [
    "AI jurisprudence",
    "case law",
    "data protection",
    "digital rights",
    "AI liability",
    "law and technology",
  ],
  alternates: {
    canonical: "/en/jurisprudence",
    languages: {
      "es-ES": "/jurisprudencia",
      "en-US": "/en/jurisprudence",
    },
  },
  openGraph: {
    type: "website",
    title: "Jurisprudence",
    description: "Selection and analysis of relevant decisions on technology, data and AI.",
    url: "/en/jurisprudence",
    locale: "en_US",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default function JurisprudencePage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Section</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Jurisprudence</h1>
          <p className="text-lg text-body mt-6">Decisions and criteria with impact on AI, data and safeguards.</p>
        </header>
      </div>
    </main>
  );
}
