import Image from "next/image";
import Link from "next/link";

type SectionLandingItem = {
  id: string;
  href: string;
  title: string;
  description?: string;
  meta?: string;
  badge?: string;
};

type SectionLandingProps = {
  title: string;
  heroSrc: string;
  heroAlt: string;
  description: string;
  items: SectionLandingItem[];
};

export function SectionLanding({ title, heroSrc, heroAlt, description, items }: SectionLandingProps) {
  const [featuredItem, ...remainingItems] = items;

  return (
    <main className="section-spacing">
      <div className="relative w-full h-64 md:h-96">
        <Image src={heroSrc} alt={heroAlt} fill sizes="100vw" className="object-cover" priority={false} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="sr-only">{title}</h1>
        <p className="lead text-right ml-auto max-w-3xl">{description}</p>
      </div>

      <div className="container-editorial">
        {featuredItem ? (
          <section className="mb-12">
            <Link
              href={featuredItem.href}
              className="block card-elevated p-8 hover:border-primary/30 transition-all duration-300 bg-slate-50/50"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                <div className="lg:flex-1 flex flex-col gap-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-primary font-bold">
                    {featuredItem.badge || "Análisis"}
                  </p>
                  <h2 className="font-serif text-3xl md:text-4xl text-foreground leading-tight">
                    {featuredItem.title}
                  </h2>
                  {featuredItem.description && (
                    <p className="text-lg text-body leading-relaxed">{featuredItem.description}</p>
                  )}
                </div>
                <div className="lg:w-64 lg:text-right flex-shrink-0">
                  {featuredItem.meta && <div className="text-sm text-caption">{featuredItem.meta}</div>}
                  <div className="mt-4">
                    <span className="text-primary font-medium inline-flex items-center gap-2">
                      Leer análisis completo <span className="text-xl">→</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        ) : (
          <p className="text-body">Próximamente contenido.</p>
        )}

        {remainingItems.length > 0 && (
          <section className="grid gap-6 md:grid-cols-2">
            {remainingItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300"
              >
                <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">{item.badge || "Análisis"}</p>
                <h2 className="font-serif text-2xl text-foreground mb-4">{item.title}</h2>
                {item.description && <p className="text-body mb-6">{item.description}</p>}
                {item.meta && <div className="text-sm text-caption">{item.meta}</div>}
              </Link>
            ))}
          </section>
        )}
      </div>
    </main>
  );
}
