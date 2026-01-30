"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname() ?? "/";
  const isEnglish = pathname.startsWith("/en");

  return (
    <footer className="border-t border-border bg-card shadow-nav">
      <div className="container-wide section-spacing-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href={isEnglish ? "/en" : "/"} className="inline-block group">
              <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                Derecho Artificial
              </span>
            </Link>
            <p className="mt-6 text-body leading-relaxed max-w-sm">
              {isEnglish 
                ? "Independent critical analysis of the intersection of Law, Ethics and Artificial Intelligence."
                : "Análisis crítico e independiente sobre la intersección del Derecho, la Ética y la Inteligencia Artificial para el mundo hispanohablante."
              }
            </p>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs font-semibold uppercase tracking-wider text-caption mb-2">
                {isEnglish ? "Editorial Direction" : "Dirección Editorial"}
              </p>
              <p className="text-sm font-medium text-foreground">R.S.C.</p>
              <p className="text-xs text-muted-foreground mt-1">UEM · UNED · IE Business School</p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-caption mb-6">
              {isEnglish ? "Navigation" : "Navegación"}
            </h4>
            <nav className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {isEnglish ? (
                <>
                  <Link href="/en/scarpa-firm" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Scarpa Firm
                  </Link>
                  <Link href="/en/jurisprudence" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Jurisprudence
                  </Link>
                  <Link href="/en/ai-news" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    AI News
                  </Link>
                  <Link href="/en/legislation" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Legislation
                  </Link>
                  <Link href="/en/guides-protocols" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Guides & Protocols
                  </Link>
                  <Link href="/en/about-us" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    About Us
                  </Link>
                  <Link href="/en/contact" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Contact
                  </Link>
                </>
              ) : (
              <>
                  <Link href="/firma-scarpa" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Firma Scarpa
                  </Link>
                  <Link href="/jurisprudencia" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Jurisprudencia
                  </Link>
                  <Link href="/actualidad-ia" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Actualidad IA
                  </Link>
                  <Link href="/legislacion" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Legislación
                  </Link>
                  <Link href="/guias-protocolos" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Guías y Protocolos
                  </Link>
                  <Link href="/quienes-somos" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Quiénes somos
                  </Link>
                  <Link href="/contacto" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Contacto
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-divider">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
            <Link href="/aviso-legal" className="text-xs text-caption hover:text-primary transition-colors duration-300">
              {isEnglish ? "Legal Notice" : "Aviso Legal"}
            </Link>
            <Link href="/politica-de-privacidad" className="text-xs text-caption hover:text-primary transition-colors duration-300">
              {isEnglish ? "Privacy Policy" : "Política de Privacidad"}
            </Link>
            <Link href="/cookies" className="text-xs text-caption hover:text-primary transition-colors duration-300">
              {isEnglish ? "Cookies" : "Cookies"}
            </Link>
          </nav>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-xs text-caption tracking-wide">
              © {currentYear} Derecho Artificial
            </p>
            <p className="text-xs text-caption tracking-wide">
              {isEnglish ? "An independent editorial project" : "Un proyecto editorial independiente"}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
