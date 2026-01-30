import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legislation",
  description: "Key laws, regulations and guidance related to artificial intelligence.",
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
      </div>
    </main>
  );
}

