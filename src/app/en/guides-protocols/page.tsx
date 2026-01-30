import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides & Protocols",
  description: "Operational guides and protocols for legal practice involving AI.",
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
      </div>
    </main>
  );
}

