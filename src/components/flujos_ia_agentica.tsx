"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function FlujosIA() {
  return (
    <section className="section-spacing border-t border-border/40">
      <div className="container-narrow">
        <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
          Flujos de datos y gobernanza en IA agéntica
        </h2>
        <p className="text-sm md:text-base text-body mb-6">
          Visualiza los flujos clave que deben mapearse en cualquier proyecto de IA agéntica para poder justificar el
          cumplimiento de RGPD, AI Act y LOPDGDD ante autoridades de control y auditorías internas.
        </p>

        <Tabs defaultValue="flujos-datos" className="w-full">
          <TabsList className="w-full flex flex-wrap justify-start gap-2 overflow-x-auto">
            <TabsTrigger value="flujos-datos">Flujos de datos</TabsTrigger>
            <TabsTrigger value="ciclo-eipd">Ciclo EIPD</TabsTrigger>
            <TabsTrigger value="arquitectura">Arquitectura agéntica</TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            <TabsContent value="flujos-datos" className="mt-0">
              <h3 className="font-serif text-xl md:text-2xl mb-3">
                Diagrama lógico de flujos de datos personales
              </h3>
              <p className="text-sm md:text-base text-body mb-4">
                En IA agéntica no basta con describir el sistema; es necesario descomponer cada interacción en flujos
                de entrada, procesamiento y salida, identificando qué memorias intervienen y qué servicios externos se
                invocan en cada paso.
              </p>
              <ol className="list-decimal list-inside text-sm md:text-base text-body space-y-2">
                <li>
                  Entrada de datos de origen: formularios, sistemas internos, integraciones API o repositorios
                  documentales.
                </li>
                <li>
                  Enriquecimiento y preprocesado: filtrado, seudonimización, clasificación de sensibilidad y etiquetado
                  de fuentes.
                </li>
                <li>
                  Consumo por el agente: qué datos llegan a la memoria de trabajo y a la memoria persistente.
                </li>
                <li>
                  Invocación de herramientas externas: servicios en la nube, APIs de terceros y conectores internos.
                </li>
                <li>
                  Salidas hacia usuarios o sistemas: decisiones, recomendaciones, informes, acciones automatizadas.
                </li>
              </ol>
            </TabsContent>

            <TabsContent value="ciclo-eipd" className="mt-0">
              <h3 className="font-serif text-xl md:text-2xl mb-3">
                Ciclo de vida de la EIPD en proyectos de IA agéntica
              </h3>
              <p className="text-sm md:text-base text-body mb-4">
                La Evaluación de Impacto relativa a la Protección de Datos pasa de ser un documento estático a un
                proceso continuo vinculado a la evolución del agente y de su arquitectura.
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Antes del despliegue
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Identificar tratamientos afectados y finalidades específicas del agente.</li>
                    <li>Describir memorias, herramientas y servicios externos accesibles.</li>
                    <li>Analizar riesgos específicos: prompt injection, shadow-leak, errores no repetibles.</li>
                  </ul>
                </div>
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Durante la operación
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Monitorizar incidentes y near misses relacionados con el agente.</li>
                    <li>Revisar periódicamente la EIPD ante cambios arquitectónicos o de proveedores.</li>
                    <li>Vincular métricas de funcionamiento del agente con controles de cumplimiento.</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="arquitectura" className="mt-0">
              <h3 className="font-serif text-xl md:text-2xl mb-3">
                Arquitectura agéntica alineada con protección de datos
              </h3>
              <p className="text-sm md:text-base text-body mb-4">
                La arquitectura debe diseñarse desde el inicio para limitar el alcance del agente y compartimentar la
                exposición de datos personales, evitando que la IA agéntica se convierta en un punto único de fallo
                para toda la organización.
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Capa de acceso
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Control de identidades y roles que pueden invocar al agente.</li>
                    <li>Filtrado de entradas y saneamiento de prompts.</li>
                    <li>Políticas de acceso granular por tratamiento o unidad organizativa.</li>
                  </ul>
                </div>
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Capa de razonamiento
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Limitación de pasos en cadenas de razonamiento y cortacircuitos seguros.</li>
                    <li>Listas blancas de herramientas y servicios externos invocables.</li>
                    <li>Configuración explícita de niveles de autonomía por tipo de caso de uso.</li>
                  </ul>
                </div>
                <div className="rounded-md border border-border bg-card/60 p-4">
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-caption mb-2">
                    Capa de memoria y logging
                  </p>
                  <ul className="list-disc list-inside text-sm text-body space-y-1">
                    <li>Memorias compartimentadas por tratamiento y plazos de retención definidos.</li>
                    <li>Logs selectivos orientados a trazabilidad y auditoría, no a vigilancia masiva.</li>
                    <li>Procedimientos para higienización y borrado seguro de memorias agénticas.</li>
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

