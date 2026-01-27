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
import LegalAIGlossary from "./pages/en/LegalAIGlossary";
import DocumentsEN from "./pages/en/Documents";
import EUAIActGuide2026 from "./pages/en/blog/EUAIActGuide2026";
import StrategicReportAIAct from "./pages/en/analysis/StrategicReportAIAct";
import Noticias from "./pages/Noticias";
import Sobre from "./pages/Sobre";
import Contacto from "./pages/Contacto";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import Cookies from "./pages/Cookies";
import NotFound from "./pages/NotFound";
import FilosofiaDerechoIA from "./pages/analisis/FilosofiaDerechoIA";
import Neuroderechos from "./pages/analisis/Neuroderechos";
import IaSectorLegal from "./pages/analisis/IaSectorLegal";
import IAAlucinaTribunales from "./pages/analisis/IAAlucinaTribunales";
import GlosarioIALegal from "./pages/GlosarioIALegal";
import GuiaReglamentoIA2026 from "./pages/blog/GuiaReglamentoIA2026";
import AnalisisRiaEstrategico from "./pages/analisis/analisis-ria-estrategico";
import ClawdbotIlusionPrivacidad from "./pages/analisis/ClawdbotIlusionPrivacidad";
import { CookieBanner } from "./components/ui/CookieBanner";

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
          <Route path="/analisis/filosofia-derecho-inteligencia-artificial" element={<FilosofiaDerechoIA />} />
          <Route path="/analisis/neuroderechos" element={<Neuroderechos />} />
          <Route path="/analisis/ia-sector-legal" element={<IaSectorLegal />} />
          <Route path="/analisis/ia-alucina-tribunales-quien-paga-el-precio" element={<IAAlucinaTribunales />} />
          <Route path="/analisis/analisis-ria-estrategico" element={<AnalisisRiaEstrategico />} />
          <Route path="/analisis/clawdbot-ilusion-privacidad" element={<ClawdbotIlusionPrivacidad />} />
          <Route path="/guia-reglamento-ia-2026" element={<GuiaReglamentoIA2026 />} />
          <Route path="/glosario-ia-legal" element={<GlosarioIALegal />} />
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
          <Route path="/en/legal-ai-glossary" element={<LegalAIGlossary />} />
          <Route path="/en/documents" element={<DocumentsEN />} />
          <Route path="/en/analysis/strategic-report-ai-act" element={<StrategicReportAIAct />} />
          <Route path="/en/blog/eu-ai-act-guide-2026" element={<EUAIActGuide2026 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
