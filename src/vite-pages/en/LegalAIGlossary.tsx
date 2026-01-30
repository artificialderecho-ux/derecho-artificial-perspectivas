import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Search } from "lucide-react";

interface Term {
  id: string;
  term: string;
  definition: string;
}

const terms: Term[] = [
  {
    id: "high-risk-systems",
    term: "High-Risk AI Systems",
    definition: "AI systems that pose a significant threat to health, safety, or fundamental rights, subject to conformity assessment under the EU AI Act."
  },
  {
    id: "algorithmic-bias",
    term: "Algorithmic Bias",
    definition: "Systematic errors in data processing that create discriminatory outcomes, prohibited under the European digital ethics framework."
  },
  {
    id: "regulatory-sandbox",
    term: "Regulatory Sandbox",
    definition: "Controlled environment facilitated by authorities (like AESIA) to test innovative AI systems before their market launch."
  },
  {
    id: "explainability",
    term: "Explainability (XAI)",
    definition: "The ability of an AI system to present its decision-making processes in a way that is understandable to humans and legal authorities."
  },
  {
    id: "generative-ai",
    term: "Generative AI System",
    definition: "AI models capable of generating content (text, images, code) in response to a prompt, subject to specific transparency obligations under the AI Act."
  },
  {
    id: "deepfake",
    term: "Deepfake",
    definition: "Synthetic multimedia content generated or manipulated by AI that appears authentic, subject to labeling and transparency obligations."
  },
  {
    id: "fria",
    term: "Fundamental Rights Impact Assessment (FRIA)",
    definition: "Mandatory analysis for deployers of high-risk systems on how AI will affect individuals' rights before deployment."
  },
  {
    id: "ai-office",
    term: "AI Office",
    definition: "New European Commission body tasked with supervising general-purpose AI models and coordinating AI policy among Member States."
  },
  {
    id: "gpai",
    term: "General Purpose AI Model (GPAI)",
    definition: "AI model trained on a large amount of data that can perform a wide range of distinct tasks and serves as a base for other systems."
  },
  {
    id: "legal-prompt-engineering",
    term: "Legal Prompt Engineering",
    definition: "Technique of designing precise and structured instructions to obtain reliable, secure, and verifiable legal results from Large Language Models (LLMs)."
  },
  {
    id: "data-governance",
    term: "Data Governance",
    definition: "Set of processes and standards ensuring the quality, integrity, and legality of data used to train and operate AI systems."
  },
  {
    id: "automated-decisions",
    term: "Right not to be subject to automated decisions",
    definition: "Right enshrined in the GDPR (Art. 22) protecting individuals from decisions based solely on automated processing that produce legal effects."
  }
];

export default function LegalAIGlossary() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = useMemo(() => {
    return terms.filter(t => 
      t.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const schema = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "Legal AI Glossary",
    "description": "Technical definitions on AI regulation, digital ethics, and compliance in Europe.",
    "hasDefinedTerm": terms.map(t => ({
      "@type": "DefinedTerm",
      "termCode": t.id,
      "name": t.term,
      "description": t.definition,
      "url": `https://derechoartificial.com/en/legal-ai-glossary#${t.id}`
    }))
  };

  return (
    <Layout>
      <SEOHead 
        title="Legal AI Glossary & European Regulation | Derecho Artificial"
        description="Specialized dictionary on Artificial Intelligence terms, EU AI Act, Legaltech, and digital ethics. Key definitions for lawyers and companies."
        canonical="https://derechoartificial.com/en/legal-ai-glossary"
        lang="en"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/glosario-ia-legal" },
          { lang: "en", href: "https://derechoartificial.com/en/legal-ai-glossary" }
        ]}
      />
      
      {/* Schema specific for Glossary */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>

      <div className="bg-[#F8FAFC] min-h-screen pb-20">
        {/* Header Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-6 border-b border-[#E2E8F0] bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#64748B] mb-6">
              Resources · Legal Dictionary
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F172A] mb-8 leading-tight">
              Legal AI Glossary
            </h1>
            <p className="text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto font-sans mb-10">
              Technical and legal definitions to understand the new artificial intelligence regulatory framework in Europe.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[#94A3B8]" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-4 bg-white border border-[#E2E8F0] rounded-[4px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20 focus:border-[#1E40AF] transition-all"
                placeholder="Search term (e.g., Bias, Risk...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>

        {/* Glossary List */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto">
            {filteredTerms.length > 0 ? (
              <dl className="space-y-12">
                {filteredTerms.map((item) => (
                  <div 
                    key={item.id} 
                    id={item.id}
                    className="relative pl-8 md:pl-0 group scroll-mt-32"
                  >
                    {/* Decorative line for mobile */}
                    <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-[#E2E8F0] md:hidden"></div>
                    
                    <dt className="font-serif text-2xl md:text-3xl text-[#0F172A] mb-4 group-hover:text-[#1E40AF] transition-colors">
                      {item.term}
                    </dt>
                    <dd className="text-lg text-[#334155] leading-relaxed border-l-0 md:border-l-2 md:border-[#E2E8F0] md:pl-6 md:group-hover:border-[#1E40AF] transition-all">
                      {item.definition}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="text-center py-20">
                <p className="text-[#64748B] text-lg">No results found for "{searchTerm}"</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-[#1E40AF] hover:underline font-medium"
                >
                  View all terms
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
