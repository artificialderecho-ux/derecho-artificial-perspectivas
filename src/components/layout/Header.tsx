import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

const navigationES = [
  { name: "Inicio", href: "/" },
  { name: "Análisis", href: "/analisis" },
  { name: "Documentos", href: "/documentos" },
  { name: "Software IA legal", href: "/software-ia-legal" },
  { name: "Noticias", href: "/noticias" },
  { name: "Manifiesto", href: "/manifiesto" },
];

const navigationEN = [
  { name: "Home", href: "/en" },
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
  "/analisis": "/en",
  "/manifiesto": "/en/manifesto",
  "/contacto": "/en/about",
  "/documentos": "/en",
};

// Map English routes to Spanish equivalents  
const enEsRouteMap: Record<string, string> = {
  "/en": "/",
  "/en/software": "/software-ia-legal",
  "/en/news": "/noticias",
  "/en/about": "/sobre",
  "/en/manifesto": "/manifiesto",
};

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isEnglish = location.pathname.startsWith("/en");
  const navigation = isEnglish ? navigationEN : navigationES;
  
  // Get the equivalent route in the other language
  const getAlternateRoute = () => {
    if (isEnglish) {
      return enEsRouteMap[location.pathname] || "/";
    }
    return esEnRouteMap[location.pathname] || "/en";
  };

  return (
    <header className="border-b border-divider bg-background">
      <div className="container-wide">
        <div className="flex items-center justify-between py-8 md:py-10">
          {/* Logo */}
          <Link to={isEnglish ? "/en" : "/"} className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              Derecho Artificial
            </span>
            <span className="text-[10px] md:text-xs tracking-[0.25em] uppercase text-caption mt-1">
              {isEnglish ? "Law · Ethics · Artificial Intelligence" : "Ley · Ética · Inteligencia Artificial"}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-10">
            <nav className="flex items-center gap-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm tracking-wide transition-colors duration-300 ${
                    location.pathname === item.href
                      ? "text-foreground"
                      : "text-caption hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            
            {/* Language switcher */}
            <div className="flex items-center gap-3 pl-6 border-l border-divider">
              <Globe className="h-3.5 w-3.5 text-caption" strokeWidth={1.5} />
              <Link 
                to={isEnglish ? getAlternateRoute() : getAlternateRoute()}
                className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                  !isEnglish ? "text-foreground font-medium" : "text-caption hover:text-foreground"
                }`}
              >
                ES
              </Link>
              <span className="text-caption">|</span>
              <Link 
                to={isEnglish ? location.pathname : getAlternateRoute()}
                className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                  isEnglish ? "text-foreground font-medium" : "text-caption hover:text-foreground"
                }`}
              >
                EN
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="xl:hidden p-2 -mr-2 text-foreground"
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

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="xl:hidden border-t border-divider py-8">
            <div className="flex flex-col gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base transition-colors duration-300 ${
                    location.pathname === item.href
                      ? "text-foreground"
                      : "text-caption hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile language switcher */}
              <div className="pt-4 mt-2 border-t border-divider">
                <div className="flex items-center gap-3">
                  <Globe className="h-3.5 w-3.5 text-caption" strokeWidth={1.5} />
                  <Link 
                    to={getAlternateRoute()}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm text-caption hover:text-foreground transition-colors duration-300"
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