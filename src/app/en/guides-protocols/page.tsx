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
      "es-ES": "/guias-protocolos",
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

        <section className="rounded-lg border border-divider bg-surface p-8">
          <p className="text-sm uppercase tracking-widest text-caption mb-3">Repository</p>
          <h2 className="font-serif text-2xl text-foreground">Under update</h2>
          <p className="text-body mt-4 max-w-2xl">
            Repository under update under the 2026 action plan. We will publish guides, checklists, and protocols as
            they are reviewed and validated.
          </p>
        </section>
      </div>
    </main>
  );
}
