import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { CookieBanner } from "./components/ui/CookieBanner";

// Lazy load pages
const Index = lazy(() => import("./pages/Index"));
const Manifiesto = lazy(() => import("./pages/Manifiesto"));
const Analisis = lazy(() => import("./pages/Analisis"));
const AIActReglamentoEuropeo = lazy(() => import("./pages/analisis/AIActReglamentoEuropeo"));
const AIActPracticaJuridica = lazy(() => import("./pages/analisis/AIActPracticaJuridica"));
const Documentos = lazy(() => import("./pages/Documentos"));
const SoftwareIALegal = lazy(() => import("./pages/SoftwareIALegal"));
const LegalAISoftware = lazy(() => import("./pages/en/LegalAISoftware"));
const NewsEN = lazy(() => import("./pages/en/NewsEN"));
const Software = lazy(() => import("./pages/en/Software"));
const Manifesto = lazy(() => import("./pages/en/Manifesto"));
const IndexEN = lazy(() => import("./pages/en/Index"));
const About = lazy(() => import("./pages/en/About"));
const Analysis = lazy(() => import("./pages/en/Analysis"));
const LegalAIGlossary = lazy(() => import("./pages/en/LegalAIGlossary"));
const DocumentsEN = lazy(() => import("./pages/en/Documents"));
const EUAIActGuide2026 = lazy(() => import("./pages/en/blog/EUAIActGuide2026"));
const StrategicReportAIAct = lazy(() => import("./pages/en/analysis/StrategicReportAIAct"));
const Noticias = lazy(() => import("./pages/Noticias"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Contacto = lazy(() => import("./pages/Contacto"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FilosofiaDerechoIA = lazy(() => import("./pages/analisis/FilosofiaDerechoIA"));
const Neuroderechos = lazy(() => import("./pages/analisis/Neuroderechos"));
const IaSectorLegal = lazy(() => import("./pages/analisis/IaSectorLegal"));
const IAAlucinaTribunales = lazy(() => import("./pages/analisis/IAAlucinaTribunales"));
const GlosarioIALegal = lazy(() => import("./pages/GlosarioIALegal"));
const GuiaReglamentoIA2026 = lazy(() => import("./pages/blog/GuiaReglamentoIA2026"));
const AnalisisRiaEstrategico = lazy(() => import("./pages/analisis/analisis-ria-estrategico"));
const ClawdbotIlusionPrivacidad = lazy(() => import("./pages/analisis/ClawdbotIlusionPrivacidad"));

import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<LoadingSpinner />}>
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
        </Suspense>
        <CookieBanner />
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
