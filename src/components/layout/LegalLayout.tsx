import { ReactNode } from "react";
import Link from "next/link";

interface LegalLayoutProps {
  children: ReactNode;
  title: string;
  category: string;
  date?: string;
  hero?: ReactNode;
  author?: {
    name: string;
    href?: string;
  };
}

export function LegalLayout({ 
  children, 
  title, 
  category, 
  date, 
  hero,
  author = { name: "Ricardo Scarpa", href: "/quienes-somos" } 
}: LegalLayoutProps) {
  return (
    <main>
      {hero ? (
        hero
      ) : (
        <section className="pt-20 pb-12 bg-muted/30 border-b border-border/50">
          <div className="container-narrow text-center">
            <span className="inline-block py-1 px-3 mb-6 text-xs font-semibold tracking-wider text-foreground uppercase bg-background border border-border rounded-full shadow-sm">
              {category}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-8 text-balance">
              {title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground font-sans">
              {date && (
                <>
                  <time dateTime={date}>
                    {new Date(date).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <span className="text-border">•</span>
                </>
              )}
              <div className="flex items-center gap-2">
                <span>Por</span>
                {author.href ? (
                  <Link
                    href={author.href}
                    className="font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
                  >
                    {author.name}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">{author.name}</span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16">
        <div className="container-narrow">
          <div className="prose-editorial">
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
