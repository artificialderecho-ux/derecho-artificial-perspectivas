# Diagnóstico de despliegue (Vercel)

Fecha: 2026-05-23

## Resumen ejecutivo

No se reproduce un fallo de compilación en local: `npm run build` completa correctamente.

Sí se detectan problemas de contenido y enrutado con `node scripts/diagnostico.cjs`:

- 21 errores críticos (frontmatter ausente/incompleto, `section` inconsistente, routers dinámicos faltantes para `guias`).
- 95 avisos adicionales (autores no normalizados, fechas vacías o malformadas, slugs inconsistentes, rutas huérfanas).

Estos problemas pueden no romper el build, pero sí causar 404s, páginas fuera de su sección o comportamiento inconsistente tras despliegue.

## Evidencias

1. Build local exitoso
   - Comando: `npm run build`
   - Resultado: compilación y generación estática completadas.

2. Diagnóstico de estructura/contento
   - Comando: `node scripts/diagnostico.cjs`
   - Resultado: script termina con código 1 por errores críticos.

## Hipótesis más probable

El "problema de deployment" percibido no es una caída del build de Vercel, sino degradación funcional por inconsistencias de contenido/rutas publicadas.

## Próximos pasos recomendados

1. Corregir primero los errores críticos del diagnóstico (prioridad alta).
2. Ejecutar en CI/CD antes de desplegar:
   - `npm run build`
   - `node scripts/diagnostico.cjs`
3. Bloquear despliegues si el diagnóstico devuelve código distinto de 0.
