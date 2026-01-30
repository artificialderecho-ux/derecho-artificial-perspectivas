import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI News",
  description: "Editorial monitoring of regulatory, institutional and jurisprudential AI updates.",
};

export default function AiNewsPage() {
  return (
    <main className="section-spacing">
      <div className="container-editorial">
        <header className="mb-12">
          <p className="text-sm uppercase tracking-widest text-caption mb-4">Section</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight">AI News</h1>
          <p className="text-lg text-body mt-6">Updates and analysis focused on compliance and legal practice.</p>
        </header>
      </div>
    </main>
  );
}

