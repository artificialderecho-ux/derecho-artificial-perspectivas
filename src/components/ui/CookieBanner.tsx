import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    console.log("El banner se está cargando");
    // Check localStorage for existing consent
    const checkConsent = () => {
      try {
        const consent = localStorage.getItem('da_cookie_consent');
        if (!consent) {
          setShouldRender(true);
          // Delay appearance by 2 seconds
          const timer = setTimeout(() => setIsVisible(true), 2000);
          return () => clearTimeout(timer);
        } else {
            // Optional: Check expiry if we stored it as JSON with date
            const parsed = JSON.parse(consent);
            const expiry = new Date(parsed.expiry);
            if (new Date() > expiry) {
                localStorage.removeItem('da_cookie_consent');
                setShouldRender(true);
                setTimeout(() => setIsVisible(true), 2000);
            }
        }
      } catch (e) {
        // Fallback if JSON parse fails or other error
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 2000);
      }
    };

    checkConsent();
  }, []);

  const saveConsent = (type: 'all' | 'essential') => {
    setIsVisible(false);
    
    // Save to localStorage with 365 days expiry logic
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 365);
    
    const consentData = {
      value: type,
      timestamp: new Date().toISOString(),
      expiry: expiry.toISOString()
    };
    
    localStorage.setItem('da_cookie_consent', JSON.stringify(consentData));

    // Remove from DOM after animation
    setTimeout(() => setShouldRender(false), 500);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={cn(
        "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 transition-all duration-700 ease-in-out transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      <div className="bg-[#0F172A] text-white p-6 rounded-lg shadow-2xl border border-slate-700 backdrop-blur-sm bg-opacity-95">
        <h3 className="font-serif text-lg mb-3 font-medium">Privacidad y Transparencia</h3>
        
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          En Derecho Artificial utilizamos cookies propias y de terceros para analizar nuestros servicios y mostrarle publicidad relacionada con sus preferencias mediante el análisis de sus hábitos de navegación.
          <br />
          <Link to="/cookies" className="text-white underline underline-offset-2 hover:text-blue-200 transition-colors mt-1 inline-block">
            Leer Política de Cookies
          </Link>
        </p>

        <div className="flex flex-col space-y-3">
          <div className="flex gap-3">
            <Button 
              onClick={() => saveConsent('all')}
              className="flex-1 bg-white text-[#0F172A] hover:bg-slate-200 font-medium"
            >
              Aceptar todas
            </Button>
            <Button 
              onClick={() => saveConsent('essential')}
              variant="outline"
              className="flex-1 border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white"
            >
              Rechazar opcionales
            </Button>
          </div>
          
          <div className="text-center">
            <Link 
              to="/cookies" 
              className="text-xs text-slate-400 hover:text-white transition-colors"
            >
              Configurar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
