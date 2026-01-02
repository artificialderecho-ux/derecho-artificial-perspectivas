import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Manifiesto from "./pages/Manifiesto";
import Analisis from "./pages/Analisis";
import AIActReglamentoEuropeo from "./pages/analisis/AIActReglamentoEuropeo";
import Documentos from "./pages/Documentos";
import SoftwareIALegal from "./pages/SoftwareIALegal";
import LegalAISoftware from "./pages/en/LegalAISoftware";
import News from "./pages/en/News";
import IndexEN from "./pages/en/Index";
import About from "./pages/en/About";
import Noticias from "./pages/Noticias";
import Sobre from "./pages/Sobre";
import Contacto from "./pages/Contacto";
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
          <Route path="/documentos" element={<Documentos />} />
          <Route path="/software-ia-legal" element={<SoftwareIALegal />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* English routes */}
          <Route path="/en" element={<IndexEN />} />
          <Route path="/en/legal-ai-software" element={<LegalAISoftware />} />
          <Route path="/en/news" element={<News />} />
          <Route path="/en/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
