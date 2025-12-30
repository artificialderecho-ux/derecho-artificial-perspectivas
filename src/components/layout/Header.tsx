import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Inicio", href: "/" },
  { name: "Análisis", href: "/analisis" },
  { name: "Documentos", href: "/documentos" },
  { name: "Software IA legal", href: "/software-ia-legal" },
  { name: "Noticias", href: "/noticias" },
  { name: "Manifiesto editorial", href: "/manifiesto" },
  { name: "Sobre Derecho Artificial", href: "/sobre" },
  { name: "Contacto", href: "/contacto" },
];

export function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-divider bg-background">
      <nav className="container-wide">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <span className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              Derecho Artificial
            </span>
            <span className="text-xs tracking-widest uppercase text-caption mt-0.5">
              Ley · Ética · Inteligencia Artificial
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm tracking-wide transition-colors ${
                  location.pathname === item.href
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-divider py-4">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base py-2 transition-colors ${
                    location.pathname === item.href
                      ? "text-foreground font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
