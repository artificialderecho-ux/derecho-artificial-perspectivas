# Diagnóstico técnico: diferencia de imagen entre Global IA y Guías IA

## Síntoma observado
- En **Global IA** sí aparece un hero visual (fondo morado + imagen).
- En **Guías IA** no aparece hero visual equivalente.

## Causa principal (arquitectura de páginas distinta)

### 1) Global IA define hero propio en la página
La página `src/app/global-ia/page.tsx` renderiza un bloque hero explícito con:
- gradiente morado (`from-blue-900 via-indigo-900 to-purple-900`),
- imagen de fondo `/images/heroes/ia-global-hero.webp`,
- overlay y cabecera visual.

### 2) Guías IA no define hero visual
La página `src/app/recursos/guias/page.tsx` usa `LegalLayout` sin pasar prop `hero` y solo pinta breadcrumbs + grid de contenido.
Además, en metadata OG se usa `"/logo-principal.png"` y no una imagen hero de sección.

## Hallazgo adicional relevante
En `src/app/page.tsx` (home), la sección "Guías IA" tiene una comprobación de existencia con extensión `guias-ia-hero.wep` (typo) y fallback a `.webp`.
No explica por sí sola la ausencia de hero en `/recursos/guias`, pero sí muestra inconsistencia de naming en imágenes.

## Conclusión
No parece un bug de carga de assets del servidor/CDN.
La diferencia visual se debe a que **Global IA tiene hero implementado de forma explícita** y **Guías IA no tiene hero implementado en su plantilla de página**.
