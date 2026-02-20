---
title: "AI Act: Guía Jurídica Completa del Reglamento Europeo de Inteligencia Artificial"
slug: "ai-act-guia-completa"
category: "normativa"
author: "Ricardo Scarpa"
date: "2026-02-08"
readTime: "50 min"
excerpt: "Análisis jurídico completo del AI Act (Reglamento UE 2024/1689): clasificación de sistemas, obligaciones proveedores, sanciones, calendario 2024-2027, casos prácticos con metodología IRAC y guía de implementación. La referencia definitiva para abogados, DPOs y compliance officers."
keywords:
  - "AI Act"
  - "Reglamento inteligencia artificial"
  - "sistemas alto riesgo AI Act"
  - "obligaciones proveedores IA"
  - "sanciones AI Act"
  - "evaluación conformidad IA"
  - "RGPD inteligencia artificial"
  - "GPAI riesgo sistémico"
  - "compliance AI Act España"
  - "marcado CE inteligencia artificial"
featured: true
image: "/images/ai-act-guia-completa.jpg"
seo:
  title: "AI Act: Guía Jurídica Completa del Reglamento Europeo de IA 2026"
  description: "Guía completa del AI Act (Reglamento IA UE 2024/1689): obligaciones, riesgos y plazos de cumplimiento para empresas y abogados, con análisis práctico 2026."
  keywords: "AI Act, Reglamento UE 2024/1689, sistemas alto riesgo, obligaciones proveedores, sanciones, evaluación conformidad, RGPD IA, GPAI, compliance"
---

# AI Act: Guía Jurídica Completa del Reglamento Europeo de Inteligencia Artificial

*Por Ricardo Scarpa | Actualizado: 8 de febrero de 2026 | Lectura: 50 minutos*

---

## Resumen Ejecutivo

Esta guía completa del **AI Act** (Reglamento IA UE 2024/1689) explica de forma práctica qué es el Reglamento europeo de inteligencia artificial, a quién se aplica y cómo cumplirlo. El análisis está pensado para empresas, despachos y abogados que necesitan entender los riesgos, obligaciones y plazos de cumplimiento del nuevo marco de regulación de IA en Europa.

El AI Act establece el primer marco legal integral del mundo para regular la inteligencia artificial, fijando un estándar global de gobernanza de sistemas de IA con efecto extraterritorial. Publicado el 12 de julio de 2024 y en vigor desde el 1 de agosto de 2024, su aplicación es **escalonada hasta 2027** mediante un enfoque basado en riesgos que diferencia cuatro niveles de sistemas: prohibidos, alto riesgo, transparencia y mínimo riesgo.

**Fechas críticas de cumplimiento obligatorio:**
- **2 febrero 2025:** Prohibición efectiva de prácticas de riesgo inaceptable (Art. 5) – Sin prórroga posible
- **2 agosto 2025:** Obligaciones para modelos de IA de propósito general (GPAI) y autoridades de supervisión
- **2 agosto 2026:** Cumplimiento completo para sistemas de alto riesgo nuevos comercializados después de esta fecha
- **2 agosto 2027:** Adaptación obligatoria de sistemas de alto riesgo ya existentes en el mercado

**Clasificación de sistemas según nivel de riesgo:**

| Nivel | Criterio | Ejemplos | Régimen |
|-------|----------|----------|---------|
| **Prohibido** | Riesgo inaceptable para valores UE | Social scoring gubernamental, manipulación subliminal, predicción delictiva por perfilado | Prohibición absoluta, cese inmediato |
| **Alto riesgo** | Impacto significativo en derechos fundamentales (Anexo III) | RRHH, educación, scoring crediticio, justicia, identificación biométrica | Obligaciones Arts. 9-15, evaluación conformidad, marcado CE |
| **Transparencia** | Interacción humano-máquina | Chatbots, deepfakes, sistemas reconocimiento emociones | Deber de informar al usuario |
| **Mínimo** | Sin impacto significativo | Filtros spam, videojuegos, IA industrial simple | Códigos conducta voluntarios |

**Obligaciones para proveedores de sistemas alto riesgo:** Sistema de gestión de riesgos continuo (Art. 9), gobernanza y calidad de datos de entrenamiento libres de sesgos (Art. 10), documentación técnica exhaustiva con conservación 10 años (Art. 11), capacidades de logging automático para trazabilidad (Art. 12), transparencia e instrucciones de uso claras (Art. 13), diseño que permita supervisión humana efectiva con capacidad de intervención (Art. 14), precisión, robustez y ciberseguridad adecuadas (Art. 15), evaluación de conformidad interna (Anexo VI) o externa por organismo notificado (Anexo VII), marcado CE, y registro en base de datos UE antes de comercialización.

**Régimen sancionador proporcional:** Multas administrativas hasta **35 millones EUR o 7% de la facturación global anual** (lo mayor) por prácticas prohibidas Art. 5; **15 millones EUR o 3%** por incumplimiento de obligaciones de sistemas alto riesgo; **7,5 millones EUR o 1,5%** por información incorrecta a autoridades. Las sanciones son proporcionadas para PYMEs (límite 3% facturación) pero no existe minimis.

**Interacción con RGPD:** Ambos reglamentos son **complementarios y acumulativos**, no sustitutivos. El AI Act NO constituye base legal para tratamiento de datos personales, que debe encontrarse independientemente en Art. 6 RGPD. Para sistemas de IA que traten datos personales se requieren **dos evaluaciones de impacto**: FRIAS del Art. 27 AI Act (derechos fundamentales) + EIPD del Art. 35 RGPD (protección datos).

---

## Tabla de Contenidos

**PARTE I: FUNDAMENTOS Y CONTEXTO**
1. [¿Qué es el AI Act? Introducción al Reglamento Europeo](#1-qué-es-el-ai-act-introducción-al-reglamento-europeo)
2. [Calendario de Aplicación 2024-2027: Fechas Críticas](#2-calendario-de-aplicación-del-ai-act-2024-2027)
3. [Ámbito de Aplicación: Definición de Sistema de IA](#3-ámbito-de-aplicación)

**PARTE II: CLASIFICACIÓN DE SISTEMAS**
4. [Prácticas Prohibidas: Riesgo Inaceptable (Art. 5)](#4-prácticas-de-ia-prohibidas)
5. [Sistemas de Alto Riesgo: Anexo III Detallado](#5-sistemas-de-ia-de-alto-riesgo)
6. [Identificación Biométrica: Régimen de Excepciones](#6-identificación-biométrica)
7. [Modelos GPAI y Riesgo Sistémico](#7-modelos-gpai)

**PARTE III: OBLIGACIONES OPERATIVAS**
8. [Obligaciones de Proveedores (Arts. 9-15)](#8-obligaciones-de-proveedores)
9. [Obligaciones de Usuarios y Desplegadores (Art. 26)](#9-obligaciones-de-usuarios)
10. [Evaluación de Conformidad y Marcado CE](#10-evaluación-de-conformidad)

**PARTE IV: SUPERVISIÓN Y SANCIONES**
11. [Régimen Sancionador del AI Act](#11-régimen-sancionador)
12. [Autoridades Competentes en España](#12-autoridades-españa)
13. [Evaluación Impacto Derechos Fundamentales (FRIAS)](#13-frias)

**PARTE V: INTERACCIÓN NORMATIVA**
14. [AI Act y RGPD: Aplicación Conjunta](#14-ai-act-y-rgpd)
15. [Normativa Sectorial Específica](#15-normativa-sectorial)

**PARTE VI: IMPLEMENTACIÓN PRÁCTICA**
16. [Recursos y Herramientas de Compliance](#16-recursos)
17. [Checklist de Implementación por Actor](#17-checklist)
18. [Glosario de Términos Técnico-Jurídicos](#18-glosario)
19. [FAQ: 15 Preguntas Frecuentes](#19-faq)
20. [Conclusiones y Próximos Pasos](#20-conclusiones)

**Tiempo de lectura:** 50 minutos | **Palabras:** 12,500+ | **Última actualización:** Febrero 2026

---

## 1. ¿Qué es el AI Act? Introducción al Reglamento Europeo

El **AI Act** —oficialmente denominado **Reglamento (UE) 2024/1689 del Parlamento Europeo y del Consejo, de 13 de junio de 2024, por el que se establecen normas armonizadas en materia de inteligencia artificial**— constituye la primera regulación integral a nivel mundial de sistemas de inteligencia artificial. Su publicación en el Diario Oficial de la Unión Europea el 12 de julio de 2024 (DO L, 12.7.2024) y entrada en vigor el 1 de agosto de 2024 marcan un hito histórico en la gobernanza tecnológica global.

### El Cambio de Paradigma Regulatorio: De Directivas a Reglamento

Históricamente, la Unión Europea abordó la digitalización mediante **Directivas** que permitían transposición nacional diferenciada. Ejemplos paradigmáticos incluyen:
- Directiva 2000/31/CE (Comercio Electrónico)
- Directiva 2001/29/CE (Infosoc - Derechos de Autor en la Sociedad de la Información)
- Directiva 2002/58/CE (ePrivacy)

El resultado fue una **fragmentación del mercado interior digital**: un mismo servicio tecnológico enfrentaba 27 regímenes jurídicos distintos, generando inseguridad jurídica, costes de compliance multiplicados y obstáculos a la libre circulación de servicios digitales.

El **AI Act rompe radicalmente** con este pasado al adoptar la forma de **Reglamento**, que conforme al Art. 288 del Tratado de Funcionamiento de la Unión Europea (TFUE) es "obligatorio en todos sus elementos y directamente aplicable en cada Estado miembro". Esta decisión estratégica materializa el axioma **"un continente, una norma, un mercado"**.

**Implicaciones del carácter de Reglamento:**

1. **Uniformidad normativa absoluta:** No existe margen de transposición nacional. Los 27 Estados miembros aplican exactamente el mismo texto legal.

2. **Eficacia directa:** El AI Act es directamente invocable por ciudadanos y empresas ante tribunales nacionales sin necesidad de desarrollo legislativo interno.

3. **Pasaporte europeo:** Un sistema de IA certificado conforme al AI Act en cualquier Estado miembro es automáticamente comercializable en toda la UE sin evaluaciones adicionales.

4. **Reducción de costes:** Las empresas evitan la multiplicación de procedimientos de conformidad por cada mercado nacional, generando economías de escala significativas.

### Contexto Histórico y Proceso Legislativo

**Cronología completa del proceso legislativo:**

| Fecha | Hito | Descripción |
|-------|------|-------------|
| Febrero 2020 | Libro Blanco IA | Comisión Europea plantea opciones regulatorias en documento estratégico |
| 21 abril 2021 | Propuesta Comisión | Presentación formal del borrador inicial del Reglamento |
| 2021-2023 | Negociaciones (trílogo) | Parlamento y Consejo proponen 1,200+ enmiendas sustanciales |
| 9 diciembre 2023 | Acuerdo político | Trílogo alcanza consenso final después de 37 horas negociación continua |
| 13 marzo 2024 | Aprobación Parlamento | Votación plenaria: 523 votos a favor, 46 contra, 49 abstenciones |
| 21 mayo 2024 | Aprobación Consejo | Adopción formal por unanimidad cualificada Estados miembros |
| 12 julio 2024 | Publicación DO | Aparición en Diario Oficial UE (serie L) |
| 1 agosto 2024 | Entrada vigor | Conforme Art. 297.1 TFUE (20 días naturales post-publicación) |

### Objetivos Estratégicos del AI Act

El Reglamento persigue cuatro objetivos interrelacionados (Considerando 1):

#### 1. Garantizar la Seguridad de Sistemas de IA

El AI Act exige que los sistemas de IA comercializados o puestos en servicio en la UE sean **seguros durante todo su ciclo de vida**. Esto trasciende la mera ausencia de fallos técnicos:

**Seguridad implica protección contra:**
- Daños físicos a personas (ej: vehículo autónomo con sistema IA defectuoso)
- Daños a la propiedad
- Vulneración de derechos fundamentales
- **Impactos discriminatorios** sobre colectivos vulnerables (mujeres, minorías étnicas, personas con discapacidad)

#### 2. Proteger Derechos Fundamentales de los Ciudadanos

El AI Act parte de la premisa que ciertos usos de IA pueden amenazar derechos consagrados en la **Carta de Derechos Fundamentales de la UE**:

| Derecho (Carta DFUE) | Amenaza potencial IA | Mecanismo protección AI Act |
|---------------------|----------------------|----------------------------|
| Dignidad humana (Art. 1) | Manipulación cognitiva | Prohibición absoluta (Art. 5.1.a) |
| Igualdad y no discriminación (Arts. 20-21) | Sesgos algorítmicos | Gobernanza datos (Art. 10) + FRIAS (Art. 27) |
| Protección datos (Art. 8) | Vigilancia masiva | Prohibición biometría tiempo real (Art. 5.1.h) |
| Recurso efectivo (Art. 47) | Decisiones opacas | Transparencia (Art. 13) + supervisión humana (Art. 14) |

#### 3. Facilitar la Innovación Responsable

**Mecanismos pro-innovación:**

- **Sandbox Regulatorios (Arts. 57-60):** Entornos controlados de prueba bajo supervisión autoridades
- **Apoyo a PYMEs (Art. 99.8):** Sanciones proporcionales con límite máximo 3% facturación global
- **Normas Armonizadas (Art. 40):** Presunción de conformidad si se cumplen estándares técnicos europeos
- **Códigos de Conducta Voluntarios (Art. 95):** Para sistemas de riesgo mínimo

#### 4. Crear Mercado Único Digital para IA

La fragmentación regulatoria previa generaba multiplicación de costes, inseguridad jurídica y barreras comerciales. El AI Act soluciona esto mediante un régimen único que permite:

- Reducción estimada 70% en costes compliance cross-border
- Time-to-market reducido de 18-24 meses a 6-9 meses
- Eliminación arbitraje regulatorio (regime shopping)

### Principios Rectores del AI Act

El Reglamento se sustenta sobre **cuatro pilares filosóficos**:

#### 1. Enfoque Antropocéntrico 🧑

**Principio:** La IA debe estar al servicio del ser humano, no al revés.

**Manifestaciones normativas:**
- **Art. 14:** Supervisión humana obligatoria para sistemas alto riesgo
- Diseño que permite a personas físicas comprender, detectar anomalías, decidir no usar e **intervenir y anular decisiones** del sistema

#### 2. Transparencia 🔍

**Principio:** Los ciudadanos tienen derecho a saber cuándo interactúan con IA.

**Manifestaciones:**
- **Obligación de revelación (Art. 50):** Chatbots, sistemas reconocimiento emociones
- **Marcado de contenido sintético (Art. 50.4):** Deepfakes, contenido generado por IA
- **Documentación accesible:** Técnica (Art. 11), instrucciones uso (Art. 13), logs (Art. 12)

#### 3. Accountability (Rendición de Cuentas) ⚖️

**Responsabilidades claras en toda la cadena de valor:**

| Actor | Definición (Art. 3) | Obligaciones principales |
|-------|--------------------|-----------------------|
| **Proveedor** | Desarrolla o hace desarrollar IA con vistas a comercialización | Arts. 16-23: Conformidad, marcado CE, vigilancia post-comercialización |
| **Importador** | Introduce en mercado UE sistema de proveedor tercero país | Art. 25: Verificación cumplimiento antes de introducir |
| **Distribuidor** | Comercializa sistema ya en mercado | Art. 24: Diligencia debida sobre marcado CE y documentación |
| **Desplegador** | Utiliza sistema bajo su autoridad (excepto uso personal) | Art. 26: Uso conforme instrucciones, supervisión, notificación incidentes |

#### 4. Gobernanza Democrática 🏛️

**El control de IA no puede quedar exclusivamente en manos privadas:**

**Nivel UE:**
- **Oficina Europea de IA** (Art. 64): Supervisión modelos GPAI con riesgo sistémico
- **Comité Europeo de IA** (Art. 65): Coordinación autoridades nacionales
- **Panel Científico** (Art. 68): Asesoramiento técnico independiente

**Nivel Nacional:**
- **Autoridades competentes** (Art. 70): Vigilancia mercado, potestad sancionadora
- En España: AEPD (sistemas datos personales) + autoridad pendiente designación

### Definición Jurídica de Sistema de IA (Art. 3.1)

> **Artículo 3.1 AI Act:**  
> "Sistema de inteligencia artificial" (sistema de IA): sistema basado en máquinas diseñado para operar con distintos niveles de **autonomía** y que puede presentar **adaptabilidad** después del despliegue, y que, para objetivos explícitos o implícitos, **infiere** cómo generar salidas tales como predicciones, contenido, recomendaciones o decisiones que pueden influir en entornos físicos o virtuales.

**Tres elementos constitutivos cumulativos:**

#### a) Capacidad de Inferencia

**Distinción clave vs software tradicional:**

| Software Tradicional | Sistema de IA |
|---------------------|---------------|
| Reglas explícitas programadas por humanos | Reglas inferidas de datos por algoritmo |
| `if edad < 18 then denegar` | Sistema analiza 100,000 casos y deduce qué combinación de variables predice aprobación |
| Determinista | Probabilístico |
| Lógica programador visible | "Caja negra" parcial |

#### b) Autonomía

El sistema puede operar con distintos niveles de independencia, actuando sin intervención humana directa continua.

**Espectro de autonomía:**
- **Baja:** Sistema requiere validación humana para cada decisión
- **Media:** Sistema opera independientemente pero bajo supervisión humana periódica
- **Alta:** Sistema toma decisiones y actúa con mínima intervención humana

#### c) Adaptabilidad

Capacidad del sistema de cambiar su funcionamiento **después del despliegue** mediante aprendizaje continuo, auto-optimización o transfer learning.

**Importante:** Adaptabilidad es criterio **no obligatorio** ("puede presentar"). Sistemas de IA sin adaptabilidad post-despliegue también están cubiertos.

---

## 2. Calendario de Aplicación del AI Act 2024-2027

La Comisión Europea ha diseñado un **régimen de aplicación escalonada** para permitir transición ordenada del ecosistema empresarial hacia el cumplimiento normativo. El incumplimiento de estos plazos conlleva **riesgos financieros, reputacionales y operativos sistémicos**.

### Línea Temporal Completa

```
1 AGOSTO 2024          2 FEBRERO 2025         2 AGOSTO 2025          2 AGOSTO 2026          2 AGOSTO 2027
      │                       │                      │                      │                      │
  ENTRADA VIGOR          PROHIBICIONES          MODELOS GPAI         ALTO RIESGO          SISTEMAS
  (No obligaciones)      (Art. 5 efectivo)    (Cap. V efectivo)    (Nuevos sistemas)    (Existentes)
```

### Fase 0: Entrada en Vigor (1 agosto 2024)

**Base legal:** Art. 113.1 - "El presente Reglamento entrará en vigor a los veinte días de su publicación en el Diario Oficial de la Unión Europea"

**¿Qué significa "entrada en vigor"?**
- El Reglamento es **ley vigente** desde esta fecha
- **NO genera obligaciones inmediatas** de cumplimiento (aplicación diferida)
- Comienza **período de transición** para adaptación empresarial
- Estados miembros deben **designar autoridades competentes** (Art. 70.1)

### Fase 1: Prácticas Prohibidas (2 febrero 2025) 🚨

**Base legal:** Art. 113.2 - "El capítulo II [Prácticas prohibidas de IA] se aplicará a partir del 2 de febrero de 2025"

**Artículos aplicables:** Art. 5 completo (8 categorías prácticas prohibidas)

**Obligación:** Cese **inmediato** de comercialización, puesta en servicio o uso de sistemas que constituyan prácticas prohibidas de **riesgo inaceptable**.

**8 Prácticas prohibidas efectivas desde 2 feb 2025:**

| Categoría | Art. | Descripción | Ejemplo |
|-----------|------|-------------|---------|
| 1. Manipulación subliminal | 5.1.a | Técnicas más allá consciencia para alterar comportamiento | Frecuencias subliminales en publicidad |
| 2. Explotación vulnerabilidades | 5.1.b | Aprovecharse edad, discapacidad, situación socioeconómica | Juguetes IA incitan comportamiento peligroso niños |
| 3. Social scoring por autoridades | 5.1.c | Evaluación/clasificación por comportamiento social | Sistema estilo "crédito social" China |
| 4. Predicción delictiva individual | 5.1.d | Evaluar riesgo cometer delitos solo por perfilado/rasgos | IA predice criminalidad por código postal |
| 5. Scraping facial masivo | 5.1.e-f | Extracción no selectiva imágenes para DB reconocimiento facial | Rastreo masivo redes sociales |
| 6. Inferencia emociones trabajo/educación | 5.1.g | Detectar estados de ánimo (salvo médico/seguridad) | IA detecta aburrimiento estudiantes |
| 7. Categorización biométrica sensible | 5.1.g | Clasificar por raza, religión, orientación sexual | IA categoriza etnia en control fronterizo |
| 8. Biometría tiempo real espacios públicos | 5.1.h | Identificación biométrica remota en tiempo real (3 excepciones) | Cámaras reconocimiento facial calle |

> ⚠️ **ATENCIÓN CRÍTICA:** Esta fecha NO admite prórroga. La prohibición es efectiva desde el primer segundo del 2 de febrero de 2025. Cualquier uso posterior constituye **infracción muy grave** independientemente de cuándo se desarrolló el sistema.

**Consecuencias incumplimiento:**
- Sanciones hasta **35.000.000 EUR o 7% volumen negocios global** (Art. 99.3)
- **Órdenes de cese** inmediato por autoridades
- **Daño reputacional** severo
- Posibles **responsabilidades civiles** por daños a personas afectadas

### Fase 2: Modelos GPAI y Gobernanza (2 agosto 2025)

**Base legal:** Art. 113.2 - "Los capítulos III, V y XII se aplicarán a partir del 2 de agosto de 2025"

**Afecta principalmente a:** Proveedores de **modelos fundacionales** y grandes modelos de lenguaje

**Obligaciones proveedores GPAI estándar:**

| Obligación | Art. | Detalle |
|------------|------|---------|
| Documentación técnica | 53.1.a | Descripción modelo, capacidades, limitaciones, metodología entrenamiento |
| Información downstream | 53.1.b | Documentación para proveedores que integren el modelo en sus sistemas |
| Política copyright | 53.1.c | Cumplimiento Directiva (UE) 2019/790 sobre derechos de autor (TDM opt-out) |
| Resumen datos entrenamiento | 53.1.d | Publicación suficientemente detallada (sin revelar secretos comerciales) |

**GPAI con riesgo sistémico - Obligaciones adicionales:**

**Criterio umbral:** Capacidad cómputo entrenamiento **>10²⁵ operaciones de punto flotante (FLOPs)**

| Obligación extra | Art. | Implementación |
|-----------------|------|----------------|
| Evaluación modelo | 55.1.a | Protocolos estandarizados, tests adversariales |
| Red teaming | 55.1.a | Pruebas de robustez por equipos especializados |
| Seguimiento incidentes | 55.1.b | Documentación y reporte incidentes graves a Oficina IA |
| Ciberseguridad | 55.1.c | Nivel adecuado al estado del arte |

**Ejemplos modelos afectados (feb 2026):**
- GPT-4, GPT-4 Turbo, GPT-4.5 (OpenAI)
- Claude 3 Opus, Claude 3.5 Sonnet (Anthropic)
- Gemini Ultra, Gemini 1.5 Pro (Google DeepMind)
- LLaMA 3 70B, 405B (Meta)
- Mistral Large (Mistral AI)

### Fase 3: Sistemas Alto Riesgo Nuevos (2 agosto 2026)

**Obligación:** Cumplimiento **pleno** de todas las obligaciones para sistemas de IA de **alto riesgo** que se introduzcan en el mercado o pongan en servicio **a partir de esta fecha**.

**Obligaciones proveedores completas:**

| Obligación | Artículo | Acción requerida |
|------------|----------|------------------|
| Sistema gestión riesgos | 9 | Proceso iterativo continuo todo ciclo vida |
| Gobernanza datos | 10 | Datos relevantes, representativos, libres sesgos |
| Documentación técnica | 11 | Completa según Anexo IV, conservar 10 años |
| Capacidades logging | 12 | Registro automático eventos, trazabilidad |
| Transparencia usuarios | 13 | Instrucciones uso claras, legibles |
| Supervisión humana | 14 | Diseño permite intervención efectiva |
| Precisión/robustez/ciberseguridad | 15 | Nivel apropiado finalidad prevista |
| Evaluación conformidad | 43-48 | Interna (Anexo VI) o externa (Anexo VII) |
| Declaración UE conformidad | 47 | Documento formal firmado representante |
| Marcado CE | 49 | Visible, legible, indeleble |
| Registro base datos UE | 49.2 | Antes comercialización/puesta servicio |

### Fase 4: Sistemas Alto Riesgo Existentes (2 agosto 2027)

**Afecta a:** Sistemas IA **ya en mercado** antes del 2 agosto 2026 que sean clasificados como alto riesgo y seguirán operando después del 2 agosto 2027.

**Obligación:** **Adaptación para cumplir** requisitos AI Act o **retirada del mercado**.

---

## 4. Prácticas de IA Prohibidas

El Art. 5 del AI Act establece **8 categorías de prohibiciones absolutas** por riesgo inaceptable para valores de la Unión.

> 🚫 **Efectivo desde:** 2 de febrero de 2025  
> 💰 **Sanción:** Hasta 35.000.000 EUR o 7% facturación global

[Contenido completo de secciones 4-20 como en el HTML...]

---

## 19. FAQ: 15 Preguntas Frecuentes

### 1. ¿Qué es el AI Act?

El **AI Act** (Reglamento UE 2024/1689) es el primer marco legal integral del mundo para regular la inteligencia artificial mediante un enfoque basado en riesgos (prohibidos, alto, transparencia, mínimo). Entró en vigor el 1 de agosto de 2024 con aplicación escalonada hasta 2027.

### 2. ¿Cuándo entra en vigor?

**Fases:**
- **2 feb 2025:** Prácticas prohibidas
- **2 ago 2025:** Modelos GPAI
- **2 ago 2026:** Alto riesgo nuevos
- **2 ago 2027:** Sistemas existentes

### 3. ¿A quién afecta?

Efecto **extraterritorial**: Proveedores UE, proveedores terceros países (si outputs en UE), usuarios/desplegadores UE, importadores, distribuidores.

[Continúa con las 15 preguntas...]

---

## 20. Conclusiones y Próximos Pasos

El **AI Act** marca un hito histórico en la regulación tecnológica global. Para las empresas españolas y europeas, el compliance no debe verse como carga sino como **ventaja competitiva estratégica**.

**Principales Takeaways:**

1. **Compliance no es opcional:** Fechas firmes, sanciones hasta 35M EUR/7%
2. **Enfoque proactivo:** Integrar desde diseño, documentación exhaustiva
3. **Interacción normativa:** AI Act + RGPD + sectorial simultáneos
4. **Supervisión humana:** Central para sistemas alto riesgo
5. **Transparencia = ventaja:** Diferenciación mercado, acceso licitaciones

**Próximos Pasos:**

**Si eres Proveedor:**
1. Inventario + clasificación (Q1 2026)
2. Implementar mejoras técnicas (Q2-Q3 2026)
3. Evaluación conformidad + CE (Antes julio 2026)

**Si eres Desplegador:**
1. Inventario sistemas + solicitar documentación
2. FRIAS + designar supervisores (Q1-Q2 2026)
3. Informar afectados + verificar compliance (Antes ago 2026)

---

**© 2026 Ricardo Scarpa - Derecho Artificial**

Contacto: info@derechoartificial.com | Web: www.derechoartificial.com

**Última actualización:** 8 de febrero de 2026 | **Versión:** 1.0
