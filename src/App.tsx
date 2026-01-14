import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Manifiesto from "./pages/Manifiesto";
import Analisis from "./pages/Analisis";
import AIActReglamentoEuropeo from "./pages/analisis/AIActReglamentoEuropeo";
import AIActPracticaJuridica from "./pages/analisis/AIActPracticaJuridica";
import Documentos from "./pages/Documentos";
import SoftwareIALegal from "./pages/SoftwareIALegal";
import LegalAISoftware from "./pages/en/LegalAISoftware";
import NewsEN from "./pages/en/NewsEN";
import Software from "./pages/en/Software";
import Manifesto from "./pages/en/Manifesto";
import IndexEN from "./pages/en/Index";
import About from "./pages/en/About";
import Analysis from "./pages/en/Analysis";
import Noticias from "./pages/Noticias";
import Sobre from "./pages/Sobre";
import Contacto from "./pages/Contacto";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/manifiesto" element={<Manifiesto />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/analisis/ai-act-reglamento-europeo" element={<AIActReglamentoEuropeo />} />
          <Route path="/analisis/ai-act-practica-juridica" element={<AIActPracticaJuridica />} />
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/software-ia-legal" element={<SoftwareIALegal />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/aviso-legal" element={<AvisoLegal />} />
          <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/cookies" element={<Cookies />} />
          {/* English routes */}
          <Route path="/en" element={<IndexEN />} />
          <Route path="/en/analysis" element={<Analysis />} />
          <Route path="/en/software" element={<Software />} />
          <Route path="/en/legal-ai-software" element={<LegalAISoftware />} />
          <Route path="/en/news" element={<NewsEN />} />
          <Route path="/en/manifesto" element={<Manifesto />} />
          <Route path="/en/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
