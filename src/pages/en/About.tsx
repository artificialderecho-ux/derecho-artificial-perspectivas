import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/SEOHead";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      <SEOHead 
        title="About Us | Legal & Ethical Reflection on AI - Derecho Artificial"
        description="Derecho Artificial is an independent editorial project dedicated to analyzing the legal and ethical implications of AI from a European perspective."
        canonical="https://derechoartificial.com/en/about"
        lang="en"
        hreflangs={[
          { lang: "es", href: "https://derechoartificial.com/sobre" },
          { lang: "en", href: "https://derechoartificial.com/en/about" }
        ]}
      />
      <article className="section-spacing">
        <div className="container-editorial">
          {/* Header */}
          <header className="mb-16">
            <div className="flex justify-between items-start mb-6">
              <p className="text-sm uppercase tracking-widest text-caption">
                About the project
              </p>
              <Link 
                to="/sobre" 
                className="text-xs uppercase tracking-[0.15em] text-caption hover:text-foreground transition-colors duration-300"
              >
                ← Versión en español
              </Link>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground leading-tight mb-6">
              About Derecho Artificial
            </h1>
            <p className="text-lg text-body">
              A space for rigorous legal reflection in the age of artificial intelligence.
            </p>
          </header>

          {/* Content */}
          <div className="prose-editorial">
            <section className="mb-16">
              <h2>What is Derecho Artificial</h2>
              <p>
                Derecho Artificial is an independent editorial publication dedicated 
                to the analysis of the legal, ethical and social implications of 
                artificial intelligence. Our objective is to contribute to informed 
                debate about how the law should respond to the challenges posed by 
                these technologies.
              </p>
              <p>
                Founded in 2024, the project stems from the conviction that the 
                Spanish-speaking world needs a reference space where legal professionals, 
                academics, regulators and citizens can find rigorous and accessible 
                analysis on these matters.
              </p>
            </section>

            <section className="mb-16">
              <h2>Why We Exist</h2>
              <p>
                Artificial intelligence is transforming legal practice and raising 
                fundamental questions about justice, responsibility and human rights. 
                However, much of the public debate is dominated by:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li>
                  Promotional discourse from technology companies that minimises risks.
                </li>
                <li>
                  Sensationalist narratives that exaggerate threats without rigour.
                </li>
                <li>
                  Technical analysis inaccessible to non-specialists.
                </li>
                <li>
                  Content in English that does not consider the particularities of 
                  Spanish-speaking legal systems.
                </li>
              </ul>
              <p>
                Derecho Artificial seeks to occupy the middle ground: serious but 
                accessible analysis, critical but constructive, global but attentive 
                to local realities.
              </p>
            </section>

            <section className="mb-16">
              <h2>Our Audience</h2>
              <p>
                Our content is designed for:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li>
                  <strong>Legal professionals</strong>: Lawyers, judges, prosecutors 
                  and notaries who need to understand AI tools affecting their practice.
                </li>
                <li>
                  <strong>Academics and researchers</strong>: Professors and students 
                  of law studying the intersection with technology.
                </li>
                <li>
                  <strong>Regulators and policymakers</strong>: Officials who design 
                  and implement regulatory frameworks for AI.
                </li>
                <li>
                  <strong>Informed citizens</strong>: Individuals interested in 
                  understanding how AI affects their rights.
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2>Our Approach</h2>
              <p>
                We are guided by the following methodological principles:
              </p>
              <ul className="list-disc pl-6 space-y-3 my-6">
                <li>
                  <strong>Academic rigour</strong>: We base our analyses on primary 
                  sources, case law and current doctrine.
                </li>
                <li>
                  <strong>Editorial independence</strong>: We do not accept sponsored 
                  content or advertising that would compromise our editorial line.
                </li>
                <li>
                  <strong>Accessibility</strong>: We avoid unnecessary jargon without 
                  sacrificing technical precision.
                </li>
                <li>
                  <strong>Critical perspective</strong>: We question both techno-optimism 
                  and unjustified catastrophism.
                </li>
                <li>
                  <strong>Practical focus</strong>: We connect theoretical analysis 
                  with concrete implications for legal practice.
                </li>
              </ul>
            </section>

            <section className="mb-16">
              <h2>How We Work</h2>
              <p>
                All our content goes through an editorial review process that includes 
                source verification and peer review where appropriate. We publish 
                corrections when we identify errors and maintain transparency about 
                our sources of funding.
              </p>
              <p>
                Currently, Derecho Artificial is a non-profit project sustained by 
                voluntary contributions. We do not use intrusive advertising or sell 
                user data. Our only sources of income are reader donations and 
                occasional academic consultancy projects.
              </p>
            </section>

            <section>
              <h2>Get Involved</h2>
              <p>
                Derecho Artificial is a project open to collaboration. If you share 
                our values and wish to contribute—as an author, reviewer, translator 
                or in any other capacity—we invite you to get in touch.
              </p>
              <p>
                We also welcome topic suggestions, error corrections and constructive 
                comments on our content. The quality of this project depends on 
                dialogue with our reader community.
              </p>
            </section>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default About;
