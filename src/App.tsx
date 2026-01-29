import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { HelmetProvider } from "react-helmet-async";

// Lazy load pages - Main Structure
const Index = lazy(() => import("./pages/Index"));
const FirmaScarpaPage = lazy(() => import("./pages/FirmaScarpa"));
const Jurisprudencia = lazy(() => import("./pages/Jurisprudencia"));
const ActualidadIA = lazy(() => import("./pages/ActualidadIA"));
const Legislacion = lazy(() => import("./pages/Legislacion"));
const GuiasProtocolos = lazy(() => import("./pages/GuiasProtocolos"));
const QuienesSomos = lazy(() => import("./pages/QuienesSomos"));
const Contacto = lazy(() => import("./pages/Contacto"));

// Lazy load pages - English Structure
const IndexEN = lazy(() => import("./pages/en/Index"));
const ScarpaFirm = lazy(() => import("./pages/en/ScarpaFirm"));
const Jurisprudence = lazy(() => import("./pages/en/Jurisprudence"));
const AiNews = lazy(() => import("./pages/en/AiNews"));
const Legislation = lazy(() => import("./pages/en/Legislation"));
const GuidesProtocolsEN = lazy(() => import("./pages/en/GuidesProtocols"));
const AboutUs = lazy(() => import("./pages/en/AboutUs"));

// Articles & Specific Pages (Keep for compatibility/content)
const AIActReglamentoEuropeo = lazy(() => import("./pages/analisis/AIActReglamentoEuropeo"));
const AIActPracticaJuridica = lazy(() => import("./pages/analisis/AIActPracticaJuridica"));
const FilosofiaDerechoIA = lazy(() => import("./pages/analisis/FilosofiaDerechoIA"));
const Neuroderechos = lazy(() => import("./pages/analisis/Neuroderechos"));
const IaSectorLegal = lazy(() => import("./pages/analisis/IaSectorLegal"));
const IAAlucinaTribunales = lazy(() => import("./pages/analisis/IAAlucinaTribunales"));
const AnalisisRiaEstrategico = lazy(() => import("./pages/analisis/analisis-ria-estrategico"));
const ClawdbotIlusionPrivacidad = lazy(() => import("./pages/analisis/ClawdbotIlusionPrivacidad"));

const GuiaReglamentoIA2026 = lazy(() => import("./pages/blog/GuiaReglamentoIA2026"));
const GlosarioIALegal = lazy(() => import("./pages/GlosarioIALegal"));

// Legal Pages
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

// English Articles (Legacy/Specific)
const EUAIActGuide2026 = lazy(() => import("./pages/en/blog/EUAIActGuide2026"));
const StrategicReportAIAct = lazy(() => import("./pages/en/analysis/StrategicReportAIAct"));
const LegalAIGlossary = lazy(() => import("./pages/en/LegalAIGlossary"));

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
            {/* Main Spanish Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/firma-scarpa" element={<FirmaScarpaPage />} />
            <Route path="/jurisprudencia" element={<Jurisprudencia />} />
            <Route path="/actualidad-ia" element={<ActualidadIA />} />
            <Route path="/legislacion" element={<Legislacion />} />
            <Route path="/guias-protocolos" element={<GuiasProtocolos />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Main English Routes */}
            <Route path="/en" element={<IndexEN />} />
            <Route path="/en/scarpa-firm" element={<ScarpaFirm />} />
            <Route path="/en/jurisprudence" element={<Jurisprudence />} />
            <Route path="/en/ai-news" element={<AiNews />} />
            <Route path="/en/legislation" element={<Legislation />} />
            <Route path="/en/guides-protocols" element={<GuidesProtocolsEN />} />
            <Route path="/en/about-us" element={<AboutUs />} />
            
            {/* Redirections for Old Spanish Routes */}
            <Route path="/manifiesto" element={<Navigate to="/quienes-somos#manifiesto" replace />} />
            <Route path="/sobre" element={<Navigate to="/quienes-somos" replace />} />
            <Route path="/noticias" element={<Navigate to="/actualidad-ia" replace />} />
            <Route path="/documentos" element={<Navigate to="/guias-protocolos" replace />} />
            <Route path="/analisis" element={<Navigate to="/firma-scarpa" replace />} />

            {/* Redirections for Old English Routes */}
            <Route path="/en/manifesto" element={<Navigate to="/en/about-us#manifesto" replace />} />
            <Route path="/en/about" element={<Navigate to="/en/about-us" replace />} />
            <Route path="/en/news" element={<Navigate to="/en/ai-news" replace />} />
            <Route path="/en/documents" element={<Navigate to="/en/guides-protocols" replace />} />
            <Route path="/en/analysis" element={<Navigate to="/en/scarpa-firm" replace />} />

            {/* Content Routes (Articles) - Preserved */}
            <Route path="/analisis/ai-act-reglamento-europeo" element={<AIActReglamentoEuropeo />} />
            <Route path="/analisis/ai-act-practica-juridica" element={<AIActPracticaJuridica />} />
            <Route path="/analisis/filosofia-derecho-inteligencia-artificial" element={<FilosofiaDerechoIA />} />
            <Route path="/analisis/neuroderechos" element={<Neuroderechos />} />
            <Route path="/analisis/ia-sector-legal" element={<IaSectorLegal />} />
            <Route path="/analisis/ia-alucina-tribunales-quien-paga-el-precio" element={<IAAlucinaTribunales />} />
            <Route path="/analisis/analisis-ria-estrategico" element={<AnalisisRiaEstrategico />} />
            <Route path="/analisis/clawdbot-ilusion-privacidad" element={<ClawdbotIlusionPrivacidad />} />
            
            {/* Compatibility Routes for Articles that might have been linked under /firma-scarpa in recent versions? 
                User instruction: "Firma Scarpa: (/firma-scarpa) - Destino de los antiguos 'Informes de Derecho Artificial'"
                So if I had /firma-scarpa/article-slug, I should keep it?
                In the `FirmaScarpa.tsx` I read earlier, the hrefs were:
                /firma-scarpa/clawdbot-ilusion-privacidad
                /firma-scarpa/neuroderechos
                /analisis/analisis-ria-estrategico
                /analisis/ia-alucina-tribunales...
                
                So some are under /firma-scarpa/ and some under /analisis/.
                I should map /firma-scarpa/ article routes too.
            */}
            <Route path="/firma-scarpa/neuroderechos" element={<Neuroderechos />} />
            <Route path="/firma-scarpa/clawdbot-ilusion-privacidad" element={<ClawdbotIlusionPrivacidad />} />


            {/* Other Pages */}
            <Route path="/guia-reglamento-ia-2026" element={<GuiaReglamentoIA2026 />} />
            <Route path="/glosario-ia-legal" element={<GlosarioIALegal />} />
            <Route path="/aviso-legal" element={<AvisoLegal />} />
            <Route path="/politica-de-privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/cookies" element={<Cookies />} />

            {/* English Content Pages */}
            <Route path="/en/blog/eu-ai-act-guide-2026" element={<EUAIActGuide2026 />} />
            <Route path="/en/analysis/strategic-report-ai-act" element={<StrategicReportAIAct />} />
            <Route path="/en/legal-ai-glossary" element={<LegalAIGlossary />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;