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
  { name: "Recursos IA", href: "/recursos" },
  { name: "Propiedad Intelectual IA", href: "/propiedad-intelectual-ia" },
  { name: "Ética IA", href: "/etica-ia" },
  { name: "IA Global", href: "/ia-global" },
];

const navigationEN = [
  { name: "Scarpa Firm", href: "/firma-scarpa" },
  { name: "AI Regulation", href: "/normativa" },
  { name: "AI Jurisprudence", href: "/jurisprudencia" },
  { name: "AI Resources", href: "/recursos" },
  { name: "AI Intellectual Property", href: "/propiedad-intelectual-ia" },
  { name: "AI Ethics", href: "/etica-ia" },
  { name: "Global AI", href: "/ia-global" },
];

// Map Spanish routes to English equivalents
const esEnRouteMap: Record<string, string> = {
  "/": "/en",
  "/firma-scarpa": "/en/scarpa-firm",
  "/jurisprudencia": "/en/jurisprudence",
  "/actualidad-ia": "/recursos/noticias",
  "/normativa": "/en/legislation",
  "/propiedad-intelectual-ia": "/en",
  "/etica-ia": "/en",
  "/ia-global": "/en",
  "/recursos": "/recursos",

};

// Map English routes to Spanish equivalents  
const enEsRouteMap: Record<string, string> = {
  "/en": "/",
  "/en/scarpa-firm": "/firma-scarpa",
  "/en/jurisprudence": "/jurisprudencia",
  "/en/ai-news": "/recursos/noticias",
  "/en/legislation": "/normativa",
  "/en/guides-protocols": "/recursos",
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
      if (enEsRouteMap[pathname]) return enEsRouteMap[pathname];
      if (pathname.startsWith("/en/scarpa-firm")) return "/firma-scarpa";
      if (pathname.startsWith("/en/legislation")) return "/normativa";
      if (pathname.startsWith("/en/jurisprudence")) return "/jurisprudencia";
      if (pathname.startsWith("/en/guides-protocols")) return "/recursos/guias";
      if (pathname.startsWith("/en/ai-news")) return "/actualidad-ia";
      return "/";
    }
    if (esEnRouteMap[pathname]) return esEnRouteMap[pathname];
    if (pathname.startsWith("/firma-scarpa")) return "/en/scarpa-firm";
    if (pathname.startsWith("/normativa")) return "/en/legislation";
    if (pathname.startsWith("/jurisprudencia")) return "/en/jurisprudence";
    if (pathname.startsWith("/recursos")) return "/recursos";
    if (pathname.startsWith("/actualidad-ia")) return "/recursos/noticias";
    // For sections without EN routes, send to EN home
    if (pathname.startsWith("/propiedad-intelectual-ia")) return "/en";
    if (pathname.startsWith("/etica-ia")) return "/en";
    if (pathname.startsWith("/ia-global")) return "/en";
    return "/en";
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
          <div className="flex flex-1 items-center justify-between gap-4 md:gap-6">
            <Link href={isEnglish ? "/en" : "/"} className="flex items-center group flex-shrink-0">
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

            <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4 md:gap-5">
              <div className="w-16 sm:w-20 md:w-24 lg:w-28 xl:w-32">
                <SearchBar />
              </div>

              <nav className="hidden md:flex flex-nowrap items-center gap-x-3 text-sm whitespace-nowrap">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`tracking-wide transition-all duration-300 relative ${
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
          </div>

          <button
            type="button"
            className="lg:hidden p-2 -mr-2 text-foreground hover:text-primary transition-colors"
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
          <nav className="lg:hidden border-t border-divider py-8 animate-fade-in">
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
