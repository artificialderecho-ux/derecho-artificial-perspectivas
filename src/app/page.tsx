import Link from "next/link";

export default function HomePage() {
  const sections = [
    { name: "Firma Scarpa", href: "/firma-scarpa" },
    { name: "Jurisprudencia", href: "/jurisprudencia" },
    { name: "Actualidad IA", href: "/actualidad-ia" },
    { name: "Legislación", href: "/legislacion" },
    { name: "Guías y Protocolos", href: "/guias-protocolos" },
    { name: "Quiénes somos", href: "/quienes-somos" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <main>
      <section className="py-16 md:py-24 bg-surface border-b border-divider">
        <div className="container-narrow">
          <p className="text-xs uppercase tracking-[0.2em] text-caption mb-4">
            Derecho, ética y regulación
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-6 leading-tight">
            Derecho Artificial
          </h1>
          <p className="text-xl text-body leading-relaxed max-w-2xl">
            Análisis jurídico y editorial independiente sobre el impacto de la inteligencia artificial.
          </p>
        </div>
      </section>

      <section className="section-spacing-sm">
        <div className="container-wide">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Secciones
          </h2>
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

