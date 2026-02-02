import type { Metadata } from "next";
import Link from "next/link";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";

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
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      {
        name: "Derecho Artificial",
        url: "https://derechoartificial.com/en",
      },
      {
        name: "Jurisprudence",
        url: "https://derechoartificial.com/en/jurisprudence",
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
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Jurisprudence</h1>
            <p className="text-lg text-body mt-6">Decisions and criteria with impact on AI, data and safeguards.</p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            <Link
              href="/jurisprudencia/sentencia-bosco-transparencia-algoritmica"
              className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Landmark ruling</p>
              <h2 className="font-serif text-2xl text-foreground mb-4">
                BOSCO Judgment: Algorithmic Transparency and Source Code
              </h2>
              <p className="text-body mb-6">
                Legal analysis of STS 1119/2025 establishing access to source code when automated decisions affect
                social benefits.
              </p>
              <div className="text-sm text-caption">STS 1119/2025 · 11 September 2025</div>
            </Link>

            <div className="card-elevated p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Reading criteria</p>
              <h3 className="font-serif text-2xl text-foreground mb-4">Evaluation focus</h3>
              <ul className="list-disc pl-6 text-body space-y-3">
                <li>Direct impact on rights and procedural safeguards.</li>
                <li>Judicial reasoning on transparency and accountability.</li>
                <li>Practical consequences for compliance and system design.</li>
              </ul>
            </div>
          </section>

          <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
            <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">Monitoring</p>
            <p className="text-body max-w-3xl">
              We track case law on automated public decisions, data protection, and accountability for algorithmic
              systems. New rulings will be added with comparative analysis and practical notes.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
