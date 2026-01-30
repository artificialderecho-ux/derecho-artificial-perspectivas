import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Independent observatory analyzing the impact of AI on Law. Mission, editorial direction, and Editorial Manifesto.",
};

export default function AboutUsPage() {
  return (
    <main>
      <section className="py-24 bg-surface">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">About Us</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
            Independent Observatory on Law & Artificial Intelligence
          </h1>
          <div className="prose prose-lg text-body">
            <p>
              Derecho Artificial is an independent initiative born from the intersection between legal technique and
              technological reality. We do not just inform; we analyze, deconstruct, and project the future of
              regulation in the era of algorithms.
            </p>
            <p>
              Our mission is clear: to provide rigour in a noise-filled environment. We connect the EU AI Act with the
              daily reality of firms, translate technical papers into legal risks, and oversee the actions of new
              regulatory bodies like AESIA.
            </p>
          </div>
        </div>
      </section>

      <div id="manifesto" className="bg-surface/50 p-8 md:p-12 rounded-lg border border-border my-20 container-narrow">
        <header className="mb-12 text-center">
          <p className="text-sm uppercase tracking-widest text-primary mb-4 font-bold">Our Principles</p>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">Editorial Manifesto</h2>
          <p className="text-lg text-body max-w-2xl mx-auto">
            Seven pillars defining our approach to information, analysis, and technology.
          </p>
        </header>

        <div className="grid gap-12">
          <article className="flex gap-6">
            <span className="text-4xl font-serif text-primary/20 font-bold">01</span>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">Technical Rigour</h3>
              <p className="text-body">
                We do not confuse &apos;automation&apos; with &apos;intelligence&apos;. We distinguish between Machine
                Learning and Symbolic Logic. Legal analysis requires technical precision.
              </p>
            </div>
          </article>

          <article className="flex gap-6">
            <span className="text-4xl font-serif text-primary/20 font-bold">02</span>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">Critical Independence</h3>
              <p className="text-body">
                We are not spokespersons for any Big Tech or lobby. We analyze regulation from the perspective of
                rights and legal security, not commercial hype.
              </p>
            </div>
          </article>

          <article className="flex gap-6">
            <span className="text-4xl font-serif text-primary/20 font-bold">03</span>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">Humanism by Design</h3>
              <p className="text-body">
                Technology must serve the human being, not the other way around. We defend the supremacy of
                fundamental rights in the face of algorithmic efficiency.
              </p>
            </div>
          </article>

          <article className="flex gap-6">
            <span className="text-4xl font-serif text-primary/20 font-bold">04</span>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">Regulatory Anticipation</h3>
              <p className="text-body">
                We don&apos;t wait for the law to be published. We analyze drafts, proposals, and trends to anticipate
                the regulatory future.
              </p>
            </div>
          </article>

          <article className="flex gap-6">
            <span className="text-4xl font-serif text-primary/20 font-bold">05</span>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">Transdisciplinary</h3>
              <p className="text-body">
                Law cannot be understood in isolation. We integrate Philosophy, Ethics, and Computer Science into our
                legal analysis.
              </p>
            </div>
          </article>

          <article className="flex gap-6">
            <span className="text-4xl font-serif text-primary/20 font-bold">06</span>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">Clarity without Simplification</h3>
              <p className="text-body">We explain complex concepts without losing nuance. We reject clickbait and alarmism.</p>
            </div>
          </article>

          <article className="flex gap-6">
            <span className="text-4xl font-serif text-primary/20 font-bold">07</span>
            <div>
              <h3 className="font-serif text-xl text-foreground mb-2">Commitment to Truth</h3>
              <p className="text-body">
                In the age of post-truth and generative AI, we verify sources, cross-check data, and rectify errors
                transparently.
              </p>
            </div>
          </article>
        </div>
      </div>

      <section className="py-24 border-t border-divider">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl text-foreground mb-6">Contact Us</h2>
          <p className="text-body mb-8">Do you have any questions, suggestions, or proposals? Write to us directly.</p>
          <a
            href="mailto:contacto@derechoartificial.com"
            className="inline-block bg-foreground text-background px-8 py-3 rounded-sm font-medium hover:bg-primary transition-colors"
          >
            contacto@derechoartificial.com
          </a>
        </div>
      </section>
    </main>
  );
}

