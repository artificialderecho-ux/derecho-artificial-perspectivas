import { Link, useLocation } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isEnglish = location.pathname.startsWith("/en");

  return (
    <footer className="border-t border-border bg-card shadow-nav">
      <div className="container-wide section-spacing-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-5">
            <Link to={isEnglish ? "/en" : "/"} className="inline-block group">
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
            {!isEnglish && (
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs font-semibold uppercase tracking-wider text-caption mb-2">Dirección Editorial</p>
                <p className="text-sm font-medium text-foreground">R.S.C.</p>
                <p className="text-xs text-muted-foreground mt-1">UEM · UNED · IE Business School</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7">
            <h4 className="text-xs font-medium uppercase tracking-[0.2em] text-caption mb-6">
              {isEnglish ? "Navigation" : "Navegación"}
            </h4>
            <nav className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
              {isEnglish ? (
                <>
                  <Link to="/en" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Home
                  </Link>
                  <Link to="/en/analysis" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Analysis
                  </Link>
                  <Link to="/en/documents" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Documents
                  </Link>
                  <Link to="/en/software" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Software
                  </Link>
                  <Link to="/en/news" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    News
                  </Link>
                  <Link to="/en/manifesto" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Manifesto
                  </Link>
                  <Link to="/en/about" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    About
                  </Link>
                  <Link to="/" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Versión en español
                  </Link>
                </>
              ) : (
              <>
                  <Link to="/" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Inicio
                  </Link>
                  <Link to="/analisis" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Análisis
                  </Link>
                  <Link to="/documentos" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Documentos
                  </Link>
                  <Link to="/software-ia-legal" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Software IA legal
                  </Link>
                  <Link to="/noticias" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Noticias
                  </Link>
                  <Link to="/manifiesto" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Manifiesto
                  </Link>
                  <Link to="/sobre" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Sobre
                  </Link>
                  <Link to="/contacto" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    Contacto
                  </Link>
                  <Link to="/en" className="text-sm text-body hover:text-foreground transition-colors duration-300">
                    English version
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-divider">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-8">
            <Link to={isEnglish ? "/aviso-legal" : "/aviso-legal"} className="text-xs text-caption hover:text-primary transition-colors duration-300">
              {isEnglish ? "Legal Notice" : "Aviso Legal"}
            </Link>
            <Link to={isEnglish ? "/politica-de-privacidad" : "/politica-de-privacidad"} className="text-xs text-caption hover:text-primary transition-colors duration-300">
              {isEnglish ? "Privacy Policy" : "Política de Privacidad"}
            </Link>
            <Link to={isEnglish ? "/cookies" : "/cookies"} className="text-xs text-caption hover:text-primary transition-colors duration-300">
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
