import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";

const navigationES = [
  { name: "Inicio", href: "/#inicio" },
  { name: "Análisis", href: "/analisis#perspectivas" },
  { name: "Documentos", href: "/documentos#documentos" },
  { name: "Software IA legal", href: "/software-ia-legal" },
  { name: "Noticias", href: "/noticias" },
  { name: "Manifiesto", href: "/manifiesto#mision" },
  { name: "Contacto", href: "/contacto#contacto" },
];

const navigationEN = [
  { name: "Home", href: "/en" },
  { name: "Analysis", href: "/en/analysis" },
  { name: "Documents", href: "/en/documents" },
  { name: "Software", href: "/en/software" },
  { name: "News", href: "/en/news" },
  { name: "Manifesto", href: "/en/manifesto" },
  { name: "About", href: "/en/about" },
];

// Map Spanish routes to English equivalents
const esEnRouteMap: Record<string, string> = {
  "/": "/en",
  "/software-ia-legal": "/en/software",
  "/noticias": "/en/news",
  "/sobre": "/en/about",
  "/analisis": "/en/analysis",
  "/manifiesto": "/en/manifesto",
  "/contacto": "/en/about",
  "/documentos": "/en/documents",
  "/glosario-ia-legal": "/en/legal-ai-glossary",
  "/guia-reglamento-ia-2026": "/en/blog/eu-ai-act-guide-2026",
};

// Map English routes to Spanish equivalents  
const enEsRouteMap: Record<string, string> = {
  "/en": "/",
  "/en/analysis": "/analisis",
  "/en/software": "/software-ia-legal",
  "/en/news": "/noticias",
  "/en/about": "/sobre",
  "/en/manifesto": "/manifiesto",
  "/en/documents": "/documentos",
  "/en/legal-ai-glossary": "/glosario-ia-legal",
  "/en/blog/eu-ai-act-guide-2026": "/guia-reglamento-ia-2026",
};

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const isEnglish = location.pathname.startsWith("/en");
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
      return enEsRouteMap[location.pathname] || "/";
    }
    return esEnRouteMap[location.pathname] || "/en";
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
        <div className="flex items-center justify-between py-4">
          <Link to={isEnglish ? "/en" : "/"} className="flex flex-col group">
            <img
              src="/logo-principal.png"
              alt="Derecho Artificial"
              className="h-[45px] w-auto object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </Link>

          <div className="hidden xl:flex items-center gap-10">
            <nav className="flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm tracking-wide transition-all duration-300 relative ${
                    location.pathname === item.href
                      ? "text-primary font-medium"
                      : "text-caption hover:text-foreground"
                  }`}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-3 pl-6 border-l border-divider">
              <Globe className="h-3.5 w-3.5 text-caption" strokeWidth={1.5} />
              <Link 
                to={isEnglish ? getAlternateRoute() : location.pathname}
                className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                  !isEnglish ? "text-primary font-medium" : "text-caption hover:text-foreground"
                }`}
              >
                ES
              </Link>
              <span className="text-caption">|</span>
              <Link 
                to={isEnglish ? location.pathname : getAlternateRoute()}
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
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base transition-colors duration-300 ${
                    location.pathname === item.href
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
                    to={getAlternateRoute()}
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
