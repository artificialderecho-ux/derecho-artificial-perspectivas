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
