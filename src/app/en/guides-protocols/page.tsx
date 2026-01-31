import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides & Protocols",
  description: "Operational guides and protocols for legal practice involving AI.",
  keywords: [
    "AI guides",
    "AI governance",
    "AI compliance",
    "risk assessment",
    "internal policies",
    "checklists",
  ],
  alternates: {
    canonical: "/en/guides-protocols",
    languages: {
      "es-ES": "/recursos/guias",
      "en-US": "/en/guides-protocols",
    },
  },
  openGraph: {
    type: "website",
    title: "Guides & Protocols",
    description: "Operational guides and protocols for legal practice involving AI.",
    url: "/en/guides-protocols",
    locale: "en_US",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default function GuidesProtocolsPage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Section</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">Guides &amp; Protocols</h1>
          <p className="text-lg text-body mt-6">Checklists, internal policies, and practical workflows.</p>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Governance</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Assessment protocols</h2>
            <p className="text-body">
              Operational frameworks to classify risks, document systems, and define internal ownership before
              deployment.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Compliance</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Legal checklists</h2>
            <p className="text-body">
              Verification lists for legal and compliance teams focused on GDPR, transparency, traceability, and
              internal audits.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Operations</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Monitoring protocols</h2>
            <p className="text-body">
              Routines to monitor performance, bias, and drift, plus incident response and escalation guidelines.
            </p>
          </div>

          <div className="card-elevated p-6">
            <p className="text-xs uppercase tracking-widest text-caption mb-3">Documentation</p>
            <h2 className="font-serif text-2xl text-foreground mb-4">Evidence templates</h2>
            <p className="text-body">
              Templates to document governance and compliance evidence for clients, regulators, and auditors.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-divider bg-surface p-8">
          <p className="text-xs uppercase tracking-widest text-caption mb-3">2026 repository</p>
          <p className="text-body max-w-3xl">
            This repository prioritizes protocols that can be deployed immediately. Each guide includes objectives,
            operational steps, ownership roles, and minimum metrics for adoption.
          </p>
        </section>
      </div>
    </main>
  );
}
