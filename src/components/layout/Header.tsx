"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Globe } from "lucide-react";

const navigationES = [
  { name: "Firma Scarpa", href: "/firma-scarpa" },
  { name: "Jurisprudencia", href: "/jurisprudencia" },
  { name: "Actualidad IA", href: "/actualidad-ia" },
  { name: "Normativa", href: "/normativa/reglamento-ia" },
  { name: "Guías y Protocolos", href: "/recursos/guias" },
  { name: "Quiénes somos", href: "/quienes-somos" },
  { name: "Contacto", href: "/contacto" },
];

const navigationEN = [
  { name: "Scarpa Firm", href: "/en/scarpa-firm" },
  { name: "Jurisprudence", href: "/en/jurisprudence" },
  { name: "AI News", href: "/en/ai-news" },
  { name: "Legislation", href: "/en/legislation" },
  { name: "Guides & Protocols", href: "/en/guides-protocols" },
  { name: "About Us", href: "/en/about-us" },
  { name: "Contact", href: "/en/contact" },
];

// Map Spanish routes to English equivalents
const esEnRouteMap: Record<string, string> = {
  "/": "/en",
  "/firma-scarpa": "/en/scarpa-firm",
  "/jurisprudencia": "/en/jurisprudence",
  "/actualidad-ia": "/en/ai-news",
  "/normativa/reglamento-ia": "/en/legislation",
  "/recursos/guias": "/en/guides-protocols",
  "/quienes-somos": "/en/about-us",
  "/contacto": "/en/contact",
};

// Map English routes to Spanish equivalents  
const enEsRouteMap: Record<string, string> = {
  "/en": "/",
  "/en/scarpa-firm": "/firma-scarpa",
  "/en/jurisprudence": "/jurisprudencia",
  "/en/ai-news": "/actualidad-ia",
  "/en/legislation": "/normativa/reglamento-ia",
  "/en/guides-protocols": "/recursos/guias",
  "/en/about-us": "/quienes-somos",
  "/en/contact": "/contacto",
};

export function Header() {
  const pathname = usePathname() ?? "/";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isEnglish = pathname.startsWith("/en");
  const navigation = isEnglish ? navigationEN : navigationES;
  
  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Get the equivalent route in the other language
  const getAlternateRoute = () => {
    if (isEnglish) {
      return enEsRouteMap[pathname] || "/";
    }
    return esEnRouteMap[pathname] || "/en";
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-card/95 backdrop-blur-md shadow-nav border-b border-border' 
          : 'bg-transparent border-b border-divider'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between py-3 md:py-4 min-h-[120px]">
          <Link href={isEnglish ? "/en" : "/"} className="flex items-center group">
            <Image
              src="/logo-principal.png"
              alt="Derecho Artificial"
              width={300}
              height={100}
              className="h-[100px] w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
              priority
            />
          </Link>

          <div className="hidden xl:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm tracking-wide transition-all duration-300 relative ${
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
            
            <div className="flex items-center gap-3 pl-6 border-l border-divider">
              <Globe className="h-3.5 w-3.5 text-caption" strokeWidth={1.5} />
              <Link
                href={isEnglish ? getAlternateRoute() : pathname}
                className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                  !isEnglish ? "text-primary font-medium" : "text-caption hover:text-foreground"
                }`}
              >
                ES
              </Link>
              <span className="text-caption">|</span>
              <Link
                href={isEnglish ? pathname : getAlternateRoute()}
                className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                  isEnglish ? "text-primary font-medium" : "text-caption hover:text-foreground"
                }`}
              >
                EN
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="xl:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
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
          <nav className="xl:hidden border-t border-divider py-8 animate-fade-in">
            <div className="flex flex-col gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base transition-colors duration-300 ${
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
                    href={getAlternateRoute()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
                  >
                    {isEnglish ? "Versión en español" : "English version"}
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
