import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Law, ethics and AI regulation",
  description:
    "Independent legal and editorial analysis on artificial intelligence: compliance, jurisprudence, and the EU regulatory framework.",
  keywords: [
    "artificial intelligence law",
    "AI regulation",
    "EU AI Act",
    "GDPR",
    "AI compliance",
    "AI jurisprudence",
    "law and technology",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    title: "Law, ethics and AI regulation",
    description:
      "Independent legal and editorial analysis on artificial intelligence: compliance, jurisprudence, and the EU regulatory framework.",
    url: "/en",
    locale: "en_US",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default function EnglishHomePage() {
  const sections = [
    { name: "Scarpa Firm", href: "/en/scarpa-firm" },
    { name: "Jurisprudence", href: "/en/jurisprudence" },
    { name: "AI News", href: "/en/ai-news" },
    { name: "Legislation", href: "/en/legislation" },
    { name: "Guides & Protocols", href: "/en/guides-protocols" },
    { name: "About Us", href: "/en/about-us" },
    { name: "Contact", href: "/en/contact" },
  ];

  return (
    <main>
      <section className="py-16 md:py-24 bg-surface border-b border-divider">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">Law, ethics and regulation</p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">Derecho Artificial</h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Independent legal and editorial analysis on the impact of artificial intelligence.
          </p>
        </div>
      </section>

      <section className="section-spacing-sm">
        <div className="container-wide">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">Sections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-medium text-foreground">{s.name}</span>
                  <span className="text-primary">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
