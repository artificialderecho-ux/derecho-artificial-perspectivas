"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function NormativaIA() {
  return (
    <section className="section-spacing border-t border-border/40 bg-muted/20">
      <div className="container-narrow">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
          Marco normativo: RGPD, AI Act y LOPDGDD
        </h2>
        <p className="text-sm md:text-base text-body mb-6">
          Esta matriz sintetiza cómo impacta la IA agéntica en los principales regímenes de protección de datos que
          debe considerar una organización europea al desplegar agentes de IA en producción.
        </p>

        <Tabs defaultValue="rgpd" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start gap-2 overflow-x-auto">
            <TabsTrigger value="rgpd">RGPD</TabsTrigger>
            <TabsTrigger value="ai-act">AI Act</TabsTrigger>
            <TabsTrigger value="lopdgdd">LOPDGDD</TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            <TabsContent value="rgpd" className="mt-0">
              <h3 className="font-serif text-xl md:text-2xl mb-3">
                IA agéntica como tratamiento de alto riesgo bajo RGPD
              </h3>
              <p className="text-sm md:text-base text-body mb-4">
                La incorporación de agentes de IA suele activar la obligación de Evaluación de Impacto relativa a la
                Protección de Datos (art. 35 RGPD) por la combinación de autonomía, memoria persistente, interacción con
                servicios externos y potencial para decisiones automatizadas.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Principios afectados
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Minimización de datos y limitación de finalidad.</li>
                    <li>Transparencia sobre memorias agénticas y destinatarios externos.</li>
                    <li>Responsabilidad proactiva y trazabilidad de operaciones.</li>
                  </ul>
                </div>
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Obligaciones clave
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Actualizar el Registro de Actividades para reflejar la IA agéntica.</li>
                    <li>
                      Realizar una EIPD específica incluyendo amenazas como prompt injection y shadow-leak.
                    </li>
                    <li>
                      Establecer políticas de memoria y acceso granular alineadas con privacy by design y by default.
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ai-act" className="mt-0">
              <h3 className="font-serif text-xl md:text-2xl mb-3">
                Conexión entre IA agéntica y AI Act
              </h3>
              <p className="text-sm md:text-base text-body mb-4">
                Los agentes de IA pueden quedar sujetos al Reglamento de IA de la UE (AI Act) como sistemas de alto
                riesgo o como parte de modelos de propósito general, sin sustituir en ningún caso al RGPD sino
                acumulando obligaciones.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Impacto típico
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Clasificación en función del caso de uso y de los anexos del AI Act.</li>
                    <li>Necesidad de sistema de gestión de riesgos y logging reforzado.</li>
                    <li>
                      Coordinación entre FRIAS del AI Act y EIPD del RGPD para evitar duplicidades incompletas.
                    </li>
                  </ul>
                </div>
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Preguntas de diseño
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>¿El agente interviene en decisiones de alto impacto sobre personas físicas?</li>
                    <li>¿Se apoya en modelos de propósito general con obligaciones reforzadas?</li>
                    <li>¿Existen funciones de evaluación, scoring o vigilancia biométrica asociadas?</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="lopdgdd" className="mt-0">
              <h3 className="font-serif text-xl md:text-2xl mb-3">
                IA agéntica y LOPDGDD en España
              </h3>
              <p className="text-sm md:text-base text-body mb-4">
                La LOPDGDD complementa el RGPD con especialidades españolas relevantes para proyectos de IA agéntica,
                en particular en materia de derechos digitales, relaciones laborales y tratamiento por Administraciones
                Públicas.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Ámbitos sensibles
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Control laboral, productividad y monitorización mediante agentes de IA.</li>
                    <li>Uso de sistemas agénticos en contextos de videovigilancia y biometría.</li>
                    <li>
                      Derechos digitales de empleados y ciudadanos frente a decisiones automatizadas asistidas por
                      agentes.
                    </li>
                  </ul>
                </div>
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Recomendaciones prácticas
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Integrar al Delegado de Protección de Datos en el diseño de agentes.</li>
                    <li>
                      Documentar políticas internas específicas para IA agéntica en protocolos y códigos de conducta.
                    </li>
                    <li>
                      Revisar convenios, cláusulas informativas y políticas internas a la luz de la LOPDGDD y la AEPD.
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

