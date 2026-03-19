# Diagnóstico técnico: errores 404 tras despliegues del 18/03/2026

## Síntoma principal observado
El post nuevo **"ai-act-america-latina-impacto-extraterritorial-cumplimiento"** no se está generando en la ruta dinámica `/global-ia/[slug]`, por lo que esa URL devuelve 404 tras el deploy.

## Evidencia técnica

1. El loader MDX solo carga posts nuevos desde `content/<sección>/<slug>/index.mdx`.
2. El archivo del post existe en `content/global-ia/.../index.mdx`, pero su frontmatter declara:
   - `section: "firma-scarpa"`
   - `category: "analisis-juridico"`
3. La ruta dinámica de Global IA (`src/app/global-ia/[slug]/page.tsx`) solo pre-renderiza slugs cuya categoría/sección sea `global-ia` o `ia-global`.
4. El build confirma que en `/global-ia/[slug]` solo se generan 3 rutas y **no** se incluye el slug del post nuevo.

## Causa raíz más probable
**Inconsistencia de frontmatter del post publicado**: el archivo está dentro de la sección `global-ia`, pero su metadata lo clasifica como `firma-scarpa`/`analisis-juridico`.

Esto desincroniza:
- la detección de slugs para `generateStaticParams` en Global IA,
- el filtro de listado de `/global-ia`,
- y la URL final construida por el loader (`/${route}/${slug}`).

## Conclusión
El 404 no apunta a un fallo de infraestructura del deployment, sino a un problema de enrutado lógico por metadatos incompatibles con la ruta destino.
