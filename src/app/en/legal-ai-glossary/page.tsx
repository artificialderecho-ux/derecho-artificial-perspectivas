import type { Metadata } from "next";
import fs from "fs";
import path from "path";

export const metadata: Metadata = {
  title: "Legal AI Glossary | Derecho Artificial",
  description:
    "Comprehensive glossary of legal and technical terms related to Artificial Intelligence, regulation and compliance in the EU.",
  alternates: {
    canonical: "https://derechoartificial.com/en/legal-ai-glossary",
    languages: {
      "es-ES": "https://derechoartificial.com/glosario-ia-legal",
      "en-US": "https://derechoartificial.com/en/legal-ai-glossary",
    },
  },
};

export default function LegalAIGlossaryPage() {
  const candidates = ["Recursos", "recursos"];
  let html = "";
  for (const dir of candidates) {
    const p = path.join(process.cwd(), "public", dir, "glosario.html");
    if (fs.existsSync(p)) {
      html = fs.readFileSync(p, "utf-8");
      break;
    }
  }
  if (!html) {
    html = "<p>The glossary is not available at the moment.</p>";
  }

  return (
    <main className="min-h-screen pb-20 bg-slate-50">
      <section className="pt-24 pb-16 md:pt-32 md:pb-12 px-6 bg-background border-b border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            Resources · Legal Dictionary
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 leading-tight">
            Legal AI Glossary
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-sans mb-10">
            Definitions of legal and technical concepts used across AI regulation, compliance and doctrine in Europe.
          </p>
        </div>
      </section>
      <section className="py-8 not-prose bento-surface">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid gap-6 md:grid-cols-3">
            <a href="#A" className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Index</p>
              <h3 className="font-serif text-xl text-foreground mb-2">Go to alphabetical index</h3>
              <p className="text-sm text-body">Access terms from A to X.</p>
            </a>
            <a href="#M" className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Shortcut</p>
              <h3 className="font-serif text-xl text-foreground mb-2">Section M</h3>
              <p className="text-sm text-body">Quick access to frequent terms.</p>
            </a>
            <a href="/en/legislation" className="bg-card border border-border rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Context</p>
              <h3 className="font-serif text-xl text-foreground mb-2">AI Act Guide</h3>
              <p className="text-sm text-body">Regulatory framework and obligations.</p>
            </a>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div
            className="prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </section>
    </main>
  );
}
