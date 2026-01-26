import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

// Category Structure
const documentsByCategory = {
  aesia: [
    {
      title: "Generative AI Guide",
      description: "Technical and legal guidelines for the responsible use of Large Language Models (LLM) and generative systems in corporate environments, addressing intellectual property and confidentiality.",
      type: "Official Guide",
      source: "AESIA",
      year: "2024",
      url: "https://aesia.digital.gob.es/es/guias",
      category: "aesia",
    },
    {
      title: "AI Attendance Control Guide",
      description: "Exhaustive analysis on legal limits and privacy risks regarding the use of biometric and AI systems for worker monitoring and time control.",
      type: "Official Guide",
      source: "AESIA",
      year: "2024",
      url: "https://aesia.digital.gob.es/es/guias",
      category: "aesia",
    },
    {
      title: "Regulatory Sandbox Guide",
      description: "Framework for participation in the controlled testing environment (sandbox), allowing companies to validate high-risk AI systems under regulatory supervision.",
      type: "Official Guide",
      source: "AESIA",
      year: "2024",
      url: "https://aesia.digital.gob.es/es/guias",
      category: "aesia",
    }
  ],
  normativa: [
    {
      title: "Regulation (EU) 2024/1689 - Artificial Intelligence Act (AI Act)",
      description: "The first comprehensive EU regulatory framework on artificial intelligence. It establishes a risk-based architecture, obligations for high-risk systems, and direct implications for lawyers, law firms, and public administrations.",
      type: "EU Regulation",
      source: "Official Journal of the European Union",
      year: "2024",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
      category: "normativa",
    },
    {
      title: "Regulation (EU) 2016/679 - General Data Protection Regulation (GDPR)",
      description: "European regulatory framework on personal data protection. Essential for understanding data processing obligations in AI systems and data subjects' rights.",
      type: "EU Regulation",
      source: "EUR-Lex",
      year: "2016",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679",
      category: "normativa",
    },
    {
      title: "Proposal for an AI Liability Directive",
      description: "Legislative proposal to adapt non-contractual civil liability rules to damages caused by artificial intelligence systems.",
      type: "Legislative Proposal",
      source: "European Commission",
      year: "2022",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52022PC0496",
      category: "normativa",
    },
    {
      title: "Directive (EU) 2019/770 on contracts for the supply of digital content and digital services",
      description: "Regulates contracts for the supply of digital content and services, with implications for AI software marketed as a service.",
      type: "EU Directive",
      source: "EUR-Lex",
      year: "2019",
      url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32019L0770",
      category: "normativa",
    }
  ],
  guias: [
    {
      title: "European Ethical Charter on the Use of Artificial Intelligence in Judicial Systems",
      description: "Five fundamental CEPEJ principles for the use of AI in justice administration: respect for fundamental rights, non-discrimination, quality and security, transparency, and user control. It specifically reinforces the requirement for human oversight in decisions affecting individual rights.",
      type: "Guidelines",
      source: "CEPEJ - Council of Europe",
      year: "2018",
      url: "https://www.coe.int/en/web/cepej/cepej-european-ethical-charter-on-the-use-of-artificial-intelligence-ai-in-judicial-systems-and-their-environment",
      category: "guias",
    },
    {
      title: "Ethics Guidelines for Trustworthy AI",
      description: "Ethical framework by the European Commission's High-Level Expert Group. Establishes seven key requirements: human agency, technical robustness, privacy, transparency, diversity, societal well-being, and accountability.",
      type: "Guidelines",
      source: "European Commission",
      year: "2019",
      url: "https://digital-strategy.ec.europa.eu/en/library/ethics-guidelines-trustworthy-ai",
      category: "guias",
    },
    {
      title: "Recommendation on the Ethics of Artificial Intelligence",
      description: "First global standard on AI ethics adopted by all 193 UNESCO Member States. Establishes common values and principles to guide the construction of legal frameworks.",
      type: "Recommendation",
      source: "UNESCO",
      year: "2021",
      url: "https://www.unesco.org/en/artificial-intelligence/recommendation-ethics",
      category: "guias",
    },
    {
      title: "White Paper on Artificial Intelligence",
      description: "Strategic document from the European Commission that preceded the AI Act. Analyzes AI risks and proposes a European approach based on excellence and trust.",
      type: "White Paper",
      source: "European Commission",
      year: "2020",
      url: "https://ec.europa.eu/info/sites/default/files/commission-white-paper-artificial-intelligence-feb2020_en.pdf",
      category: "guias",
    },
    {
      title: "Guide on Good Practices for AI Use in Administration",
      description: "AESIA guidelines for the responsible implementation of AI systems in the Spanish public sector.",
      type: "Guide",
      source: "AESIA - Spain",
      year: "2023",
      url: "https://aesia.digital.gob.es/",
      category: "guias",
    }
  ],
  investigacion: [
    {
      title: "Artificial Intelligence and Legal Philosophy: A Doctrinal Review",
      description: "Collective work coordinated by Fernando H. Llano Alonso. Multidisciplinary analysis of the legal system's transformation in the face of technological convergence. Addresses ethics, philosophy, military robotics, and digital administration.",
      type: "Collective Book / Monograph",
      source: "Ediciones Laborum, S.L.",
      year: "2022",
      url: "/en/analysis",
      category: "investigacion",
    },
    {
      title: "Neurorights and Penal Protection: Risks of Direct Neurotechnology Use",
      description: "Legal analysis of penal risks regarding direct neurotechnology use. Liability, mental indemnity, and autonomy protection.",
      type: "Monograph",
      source: "Ediciones Laborum, S.L.",
      year: "2022",
      url: "/en/analysis",
      category: "investigacion",
    },
    {
      title: "AI and Law Projects in Horizon Europe",
      description: "Access to EU-funded research projects addressing algorithmic governance, explainable AI, fundamental rights impact assessment, and compliance.",
      type: "CORDIS Project",
      source: "CORDIS",
      year: "2024",
      url: "https://cordis.europa.eu/search?q=artificial%20intelligence%20law",
      category: "investigacion",
    }
  ],
  datos: [
    {
      title: "EU Open Data Portal - Artificial Intelligence",
      description: "Access to datasets, reports, and statistics from European institutions on artificial intelligence, including adoption indicators and impact studies.",
      type: "Public Data",
      source: "data.europa.eu",
      year: "2024",
      category: "datos",
      url: "https://data.europa.eu/en",
    },
    {
      title: "Report on AI Applied to the Legal Sector",
      description: "Comprehensive analysis on the application of AI in the legal sector: law firm transformation, task automation, role changes, and labor risks.",
      type: "Report",
      source: "Derecho Artificial",
      year: "2025",
      url: "/en/analysis",
      category: "datos",
    },
    {
      title: "AI and Law Observatory - Carlos III University of Madrid",
      description: "Interdisciplinary center analyzing the legal implications of Artificial Intelligence, focusing on Criminal Law and Administrative Law.",
      type: "Observatory",
      source: "Carlos III University",
      year: "2025",
      category: "datos",
      url: "https://www.uc3m.es/investigacion/areas-conocimiento/inteligencia-artificial",
    }
  ]
};

const categoryLabels = {
  aesia: "AESIA Official Guides",
  normativa: "Primary Legislation",
  guias: "Official Guides and Soft Law",
  investigacion: "Research Projects",
  datos: "Data and Evidence",
};

const Documents = () => {
  const categories = ["aesia", "normativa", "guias", "investigacion", "datos"] as const;
  const documents = Object.values(documentsByCategory).flat();

  // Schema for AESIA Documents
  const aesiaSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AESIA Official Guides",
    "description": "Compilation of technical and legal guides from the Spanish Agency for the Supervision of Artificial Intelligence.",
    "publisher": {
      "@type": "GovernmentOrganization",
      "name": "AESIA",
      "url": "https://aesia.digital.gob.es/"
    },
    "hasPart": documentsByCategory.aesia.map(doc => ({
      "@type": "Article",
      "headline": doc.title,
      "description": doc.description,
      "url": doc.url,
      "author": {
        "@type": "GovernmentOrganization",
        "name": "AESIA"
      }
    }))
  };

  return (
    <Layout>
      <SEOHead 
        title="AI Law Documents and Resources | Derecho Artificial"
        description="Essential library on Artificial Intelligence Regulation. Official AESIA guides, EU AI Act, jurisprudence, and academic research."
        canonical="https://derechoartificial.com/en/documents"
        lang="en"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/documentos" },
          { lang: "en", href: "https://derechoartificial.com/en/documents" }
        ]}
      />
      
      {/* Schema Injection */}
      <script type="application/ld+json">
        {JSON.stringify(aesiaSchema)}
      </script>

      <div className="bg-[#F8FAFC] min-h-screen pb-20">
        {/* Header Section */}
        <section className="pt-24 pb-16 md:pt-32 md:pb-20 px-6 border-b border-[#E2E8F0] bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#64748B] mb-6">
              Resources · Library
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#0F172A] mb-8 leading-tight">
              Legal AI Documents
            </h1>
            <p className="text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto font-sans">
              Curated collection of regulations, official guides, and research on Artificial Intelligence Law.
            </p>
          </div>
        </section>

        {/* Documents Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            {categories.map((category) => (
              <div key={category} className="mb-20 last:mb-0">
                <h2 className="font-serif text-3xl text-[#0F172A] mb-10 border-l-4 border-[#1E40AF] pl-4">
                  {categoryLabels[category]}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {documentsByCategory[category].map((doc, index) => (
                    <article 
                      key={index}
                      className="group bg-white p-8 rounded-[4px] border border-[#E2E8F0] hover:border-[#94A3B8] transition-all hover:shadow-sm flex flex-col h-full"
                    >
                      <div className="mb-6">
                        <span className="inline-block px-3 py-1 bg-[#F1F5F9] text-[#475569] text-xs font-medium tracking-wide uppercase rounded-full mb-4">
                          {doc.type}
                        </span>
                        <h3 className="font-serif text-xl text-[#0F172A] leading-snug mb-3 group-hover:text-[#1E40AF] transition-colors">
                          <a 
                            href={doc.url} 
                            target={doc.url.startsWith("http") ? "_blank" : "_self"}
                            rel={doc.url.startsWith("http") ? "noopener noreferrer nofollow" : undefined}
                            className="outline-none"
                          >
                            <span className="absolute inset-0" aria-hidden="true" />
                            {doc.title}
                          </a>
                        </h3>
                        <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                          {doc.description}
                        </p>
                      </div>
                      
                      <div className="mt-auto pt-6 border-t border-[#F1F5F9] flex justify-between items-center text-xs text-[#94A3B8]">
                        <span className="font-medium text-[#64748B]">{doc.source}</span>
                        <span>{doc.year}</span>
                      </div>

                      {/* Botón específico para AESIA y Normativa para reforzar autoridad */}
                      {(category === 'aesia' || category === 'normativa') && (
                         <div className="mt-6 pt-4">
                            <span className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-[#1E40AF] bg-white border border-[#1E40AF] rounded-sm group-hover:bg-[#1E40AF] group-hover:text-white transition-colors">
                              {category === 'aesia' ? 'Consult Official Guide' : 'View Regulation'}
                            </span>
                         </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Documents;
