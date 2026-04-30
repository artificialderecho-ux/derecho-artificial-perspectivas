"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";

const navigationES = [
  { name: "Firma Scarpa", href: "/firma-scarpa" },
  { name: "Normativa IA", href: "/normativa" },
  { name: "Jurisprudencia IA", href: "/jurisprudencia" },
  { name: "Guías IA", href: "/guias-ia" },
  { name: "Propiedad Intelectual IA", href: "/propiedad-intelectual-ia" },
  { name: "Ética IA", href: "/etica-ia" },
  { name: "IA Global", href: "/global-ia" },
];

const ENGLISH_SITE_URL = "https://decisionandlaw.com/";

export function Header() {
  const pathname = usePathname() ?? "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isEnglish = pathname.startsWith("/en");
  const navigation = navigationES;
  
  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        pathname === "/" || pathname === "/en"
          ? 'bg-card/95 backdrop-blur-md shadow-nav border-b border-border' 
          : 'bg-transparent border-b border-divider'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between py-3 md:py-4 min-h-[120px]">
          <div className="flex flex-1 items-center justify-between gap-4 md:gap-6">
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
                src="/logo-icono.png"
                alt="Derecho Artificial"
                width={300}
                height={100}
                className="h-[160px] w-auto object-contain"
                style={{ mixBlendMode: "multiply" }}
                priority
              />
            </Link>

            <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4 md:gap-5">
              <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32">
                <SearchBar />
              </div>

              <nav className="hidden md:flex flex-nowrap items-center gap-x-3 text-sm whitespace-nowrap" role="navigation" aria-label="Navegación principal">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`tracking-wide transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${
                      pathname === item.href
                        ? "text-primary font-medium"
                        : "text-caption hover:text-foreground"
                    }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>
              
              <div className="hidden md:flex items-center gap-3 pl-4 md:pl-6 border-l border-divider flex-shrink-0">
                <Globe className="h-3.5 w-3.5 text-caption" strokeWidth={1.5} />
                <Link
                  href="/"
                  className={`text-xs uppercase tracking-wider transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${
                    !isEnglish ? "text-primary font-medium" : "text-caption hover:text-foreground"
                  }`}
                >
                  ES
                </Link>
                <span className="text-caption">|</span>
                <a
                  href={ENGLISH_SITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs uppercase tracking-wider transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${
                    isEnglish ? "text-primary font-medium" : "text-caption hover:text-foreground"
                  }`}
                >
                  EN
                </a>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={isEnglish ? "Open menu" : "Abrir menú"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-divider py-8 animate-fade-in" role="navigation" aria-label="Navegación móvil">
            <div className="flex flex-col gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${
                    pathname === item.href
                      ? "text-primary font-medium"
                      : "text-caption hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-2 border-t border-divider">
                <div className="flex items-center gap-3">
                  <Globe className="h-3.5 w-3.5 text-caption" strokeWidth={1.5} />
                  <Link
                    href={ENGLISH_SITE_URL}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {isEnglish ? "Versión en español" : "English version (Decision & Law)"}
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
