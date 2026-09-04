# Automatizaciones del proyecto Derecho Artificial

> Documento técnico-editorial de referencia. Describe el sistema tal como aparece en el repositorio `artificialderecho-ux/derecho-artificial-perspectivas` en la rama `main` al 4 de septiembre de 2026, con especial atención al estado real de los scripts y workflows existentes.

## 1. Propósito

Derecho Artificial no utiliza GitHub únicamente como almacén de código. El repositorio funciona como infraestructura editorial: el contenido se conserva en archivos Markdown/MDX, los cambios se validan mediante automatizaciones y un `push` a `main` activa el despliegue conectado con Vercel.

La arquitectura automatizada persigue cinco objetivos:

1. **Publicar contenido de forma reproducible**, evitando operaciones manuales innecesarias.
2. **Proteger la integridad editorial del MDX**, especialmente el frontmatter, las rutas y la estructura del contenido.
3. **Controlar la calidad técnica**, el SEO y la accesibilidad antes de considerar un cambio apto para producción.
4. **Mantener el sitio actualizado**, mediante revalidación de caché y regeneración de recursos cuando corresponde.
5. **Construir una arquitectura editorial acumulativa**, donde los artículos puedan relacionarse mediante interlinking y donde las secciones, metadatos y recursos formen un sistema coherente.

## 2. Arquitectura general de automatización

```text
CONTENIDO MDX / RECURSOS
        │
        ├── Validación de contenido
        ├── SEO / metadatos
        ├── Interlinking
        ├── Recursos auxiliares
        │
        ▼
     GIT PUSH
        │
        ├───────────────┬────────────────┬─────────────────┐
        ▼               ▼                ▼                 ▼
  Calidad técnica     SEO CI        Accesibilidad   Compresión imágenes
        │               │                │                 │
        └───────────────┴────────────────┴─────────────────┘
                                │
                                ▼
                         BUILD / DEPLOY
                                │
                                ▼
                              VERCEL
                                │
                                ▼
                      REVALIDACIÓN / CACHE
```

El repositorio declara cinco workflows de GitHub Actions: `accessibility.yml`, `calidad-tecnica.yml`, `compress-images.yml`, `pre-push.yml` y `seo-check.yml`. La conexión con Vercel realiza el despliegue automáticamente después del `push` a `main`.

## 3. Automatización de publicación de artículos

### 3.1. `scripts/publish-post.mjs`

Es el publicador específico de un artículo. Se invoca como:

```bash
npm run publish-post -- firma-scarpa/mi-slug
```

El script está diseñado para recibir exactamente `seccion/slug`.

### 3.2. Qué valida

Antes de modificar Git, comprueba:

- que la sección esté reconocida;
- que exista `content/<seccion>/<slug>/`;
- que exista `index.mdx`;
- que el MDX tenga frontmatter;
- que existan `title`, `date`, `section` y `slug`;
- que `section` coincida con la carpeta;
- que el slug sea coherente con la carpeta;
- que la autoría sea `Ricardo Scarpa` o, si aparece otra, genere advertencia;
- que el PDF exista o no según la sección;
- que exista el router dinámico correspondiente;
- que no exista accidentalmente un `page.tsx` estático que pueda tener precedencia sobre el router dinámico.

El propio script define las secciones reconocidas y sus rutas: jurisprudencia, normativa, firma-scarpa, ética, propiedad intelectual, IA Global y guías.

### 3.3. Gestión documental

Para `jurisprudencia` y `normativa`, el PDF se considera normalmente esperado. En `firma-scarpa` el PDF se considera prohibido por la propia lógica del publicador, al tratarse de análisis propios.

### 3.4. Publicación Git

Una vez superadas las comprobaciones, el script:

1. hace `git add` únicamente sobre la carpeta del artículo;
2. crea un commit con información de sección, slug, fecha y PDF cuando procede;
3. ejecuta `git push`;
4. informa de que Vercel desplegará el cambio.

Esto es importante: el publicador **no hace `git add -A`** y **no modifica el MDX**. Su función es validar y transportar a Git el artículo ya preparado.

## 4. Automatización de despliegue de contenido

### `scripts/deploy-content.mjs`

Es un flujo de despliegue más amplio que el publicador individual.

Ejecuta, en este orden:

1. `npm run generate-md` — genera Markdown desde HTML mediante `generate-md-from-html.mjs`.
2. `npm run lint`.
3. `npm run typecheck`.
4. `npm run build`.
5. consulta `git status --porcelain`;
6. si hay cambios, determina las secciones afectadas;
7. genera un mensaje de commit;
8. en modo normal hace `git add -A`, `git commit` y `git push`.

También existe `npm run deploy-content:dry`, que ejecuta el proceso hasta detectar los cambios pero no realiza commit ni push.

### Diferencia con `publish-post`

- `publish-post` es **selectivo y orientado a un único artículo**.
- `deploy-content` es **global y orientado a un ciclo de despliegue de contenido**.
- El primero limita el área de `git add` a la carpeta del post; el segundo utiliza `git add -A`.

## 5. Control de calidad técnica — GitHub Actions

### `.github/workflows/calidad-tecnica.yml`

Se ejecuta en `push` a `main` y en pull requests hacia `main`.

Tiene cinco etapas lógicas.

### 5.1. Compilación

- checkout;
- Node.js 20;
- `npm ci`;
- `npx tsc --noEmit`;
- `npm run lint`;
- `npm run build` con `NODE_ENV=production`.

El TypeScript y el build son bloqueantes. El lint, en este workflow concreto, está configurado con `continue-on-error: true`, por lo que una infracción de lint no bloquea esta etapa.

### 5.2. Validación de contenido MDX

El workflow recorre `/content` y comprueba:

- existencia de frontmatter;
- `title`;
- `description`;
- `date`;
- descripción no vacía;
- longitud razonable del título.

Los campos obligatorios ausentes generan error crítico y bloquean el proceso. Los problemas de longitud generan advertencias.

### 5.3. SEO técnico

Comprueba, entre otras cosas:

- configuración de sitemap;
- existencia/configuración de `robots.txt`;
- imágenes sin `alt`;
- uso de `<img>` nativo frente a `next/image`.

### 5.4. Bundle

Construye el proyecto y localiza chunks JavaScript superiores a 200 KB, además de informar del tamaño total de `.next`.

### 5.5. Resumen

Existe un job `resumen` que reúne los jobs anteriores y muestra la diferencia entre errores críticos y advertencias.

## 6. Control SEO específico

### `.github/workflows/seo-check.yml`

Se activa cuando cambian:

- `content/**`;
- `src/app/**`;
- `public/**`;

y también en pull requests hacia `main`.

El workflow contiene seis controles principales.

### 6.1. Frontmatter SEO

Analiza todos los MD/MDX de `/content` y comprueba:

- `title`, `description` y `date` obligatorios;
- título entre 30 y 70 caracteres;
- descripción entre 80 y 160 caracteres;
- fecha `YYYY-MM-DD`;
- ausencia de mayúsculas o espacios problemáticos en `slug`.

Los errores críticos bloquean; las advertencias no bloquean el deploy.

### 6.2. Sitemap

Busca sitemap dinámico en `src/app` o sitemap estático en `public`. Si encuentra un sitemap estático, cuenta sus URLs y advierte si contiene menos de cinco.

### 6.3. Robots

Comprueba especialmente que no exista `Disallow: /`, que no haya un `noindex` accidental y que exista referencia al sitemap.

### 6.4. Imágenes

Detecta imágenes sin `alt` y el uso de etiquetas `<img>` nativas.

### 6.5. Open Graph y metadatos sociales

Busca:

- `metadataBase`;
- `openGraph`;
- Twitter/X Cards;
- JSON-LD mediante `application/ld+json`.

### 6.6. Hreflang ES/EN

Comprueba la configuración de idiomas y la existencia de `src/app/en`.

El workflow termina con un resumen que clasifica los resultados en verde, amarillo y rojo.

## 7. Accesibilidad automatizada

### `.github/workflows/accessibility.yml`

Se ejecuta en cada `push` y pull request sobre `main` y `develop`.

Utiliza:

- ESLint con `jsx-a11y`;
- Jest + `jest-axe`;
- cobertura de tests;
- auditoría de dependencias mediante `npm audit`.

La cadena principal de accesibilidad es bloqueante: si ESLint o los tests fallan, el job falla.

El workflow genera `coverage/` y lo sube como artifact durante 30 días cuando el job tiene éxito. En pull requests también publica un comentario con el resultado y la cobertura.

Existe además un job `security-scan` que ejecuta `npm audit --audit-level=moderate`. El propio script está concebido como advertencia y no bloquea el build por vulnerabilidades de dependencias.

La documentación de accesibilidad del repositorio añade soporte para `pa11y-ci`, axe CLI, Lighthouse, lectores de pantalla y navegación por teclado.

## 8. Automatización de imágenes

### `.github/workflows/compress-images.yml`

Se ejecuta en `push` a `main` y manualmente mediante `workflow_dispatch`.

Busca recursivamente imágenes JPG, JPEG y PNG dentro de `public/images` y genera:

- AVIF con calidad 75;
- WebP con calidad 80.

Después comprueba si existen cambios. Si los hay:

1. configura `github-actions[bot]`;
2. añade `public/images`;
3. crea el commit `chore: optimize images (AVIF/WebP)`;
4. hace push.

Por tanto, es una automatización **autónoma de mutación del repositorio**, a diferencia de los workflows de auditoría, que normalmente solo verifican.

## 9. Comprobación básica de cada push

### `.github/workflows/pre-push.yml`

A pesar de su nombre, es un workflow de GitHub Actions y se activa con `on: [push]`.

Ejecuta:

```text
npm ci
npm run lint
npm run typecheck
npm run build
```

Su finalidad es proporcionar un filtro mínimo de integridad después del push.

## 10. Revalidación de caché

### 10.1. Endpoint

`src/app/api/revalidate/route.ts` implementa un endpoint POST `/api/revalidate`.

Requiere el header `x-revalidate-secret` y lo compara con `REVALIDATE_SECRET`.

Acepta opcionalmente arrays `paths` y `tags`. La implementación combina esos valores con un conjunto de rutas y tags por defecto y ejecuta `revalidatePath` y `revalidateTag`.

Entre las rutas por defecto figuran `/`, `/firma-scarpa`, `/guias-ia`, `/jurisprudencia`, `/normativa`, `/recursos`, `/etica-ia`, `/propiedad-intelectual-ia`, `/guia` y `/global-ia`.

### 10.2. Script Node

`scripts/revalidate-api.mjs` es el cliente CLI del endpoint. Permite:

- `--paths`;
- `--tags`;
- `--all`;
- `--verbose`.

Valida la presencia de `REVALIDATE_SECRET`, ejecuta POST HTTPS y trata explícitamente los códigos 200, 401 y 500.

### 10.3. Interfaces Windows/Unix

El repositorio conserva también:

- `scripts/revalidate-home.bat`;
- `scripts/revalidate-home.sh`.

Son interfaces alternativas para llamar al sistema de revalidación.

### 10.4. ISR

La aplicación utiliza `export const revalidate` en páginas relevantes. En el estado analizado, la documentación de despliegue describe una cadencia horaria, mientras que la home muestra `revalidate = 60` y otras páginas, como Firma Scarpa y Guías IA, muestran `3600`.

**Conclusión operativa:** existe tanto revalidación automática mediante ISR como revalidación on-demand mediante API. La cifra efectiva debe considerarse por página, no asumirse como un único intervalo global.

### 10.5. Importante sobre CI/CD

`DEPLOYMENT_GUIDE.md` documenta workflows llamados `revalidate.yml` y `publish-and-revalidate.yml`, pero en la carpeta `.github/workflows` actualmente aparecen cinco workflows distintos y no esos dos nombres. Por ello, esos fragmentos de la guía deben entenderse como documentación/propuesta histórica, no como evidencia de que dichos workflows estén actualmente instalados.

## 11. Interlinking automático

El repositorio contiene varias generaciones del sistema de interlinking, además de una skill dedicada:

- `scripts/auto-interlinking.mjs`;
- `scripts/auto-interlinking-simple.mjs`;
- `scripts/interlinking-complete.mjs`;
- `scripts/interlinking-complete-fixed.mjs`;
- `scripts/interlinking-final.mjs`;
- `scripts/interlinking-minimal.mjs`;
- `scripts/interlinking-debug.mjs`;
- `scripts/test-interlinking.mjs`;
- `scripts/Create-Interlinking-v2.ps1`;
- `scripts/mdx-link-utils.py`;
- `scripts/interlinking-skill/SKILL.md`;
- `INTERLINKING_GUIDE.md`.

### 11.1. Concepto

La skill define el interlinking como una operación conservadora: descubrir artículos, detectar clusters, identificar relaciones, generar enlaces, validar y permitir rollback.

Los clusters documentados incluyen jurisprudencia, AI Act, protección de datos, Firma Scarpa, guías, ética, IA agéntica, Legal Tech y recursos.

La metodología declarada aspira a combinar:

- enlace al hub;
- artículos relacionados;
- términos de glosario;
- fuentes institucionales.

La skill documenta un objetivo de 4–7 enlaces por artículo.

### 11.2. Implementación actualmente invocada por npm

`package.json` define:

```text
interlinking      → interlinking-complete-fixed.mjs
interlinking:dry  → interlinking-complete-fixed.mjs
interlinking:apply → ejecución de processFiles() del mismo módulo
```

El archivo `interlinking-complete-fixed.mjs` que se encuentra en la rama analizada:

- trabaja sobre `content/posts`;
- detecta clusters por patrones de nombres de archivo;
- detecta algunas instituciones/casos conocidos;
- obtiene keywords del nombre del archivo;
- intenta leer el `slug` del frontmatter;
- calcula coincidencias de keywords entre artículos;
- limita a cinco candidatos relacionados;
- añade como máximo tres enlaces por archivo;
- inserta los enlaces después de encabezados `##` o `###`;
- genera `interlinking-report.json`.

Hay una diferencia importante entre la skill/documentación y esta implementación: el script fijo establece `const dryRun = false`, por lo que la ejecución asociada a `interlinking:dry` **no es realmente un dry run** en el estado actual del archivo. Asimismo, la implementación actual no reproduce toda la especificación de 4–7 enlaces de la skill: su límite directo es de tres enlaces por archivo y no implementa en ese código los cuatro tipos documentados (hub, relacionados, glosario y fuentes).

Esto debe considerarse una cuestión de gobierno de automatizaciones: la documentación de una skill y el ejecutor real no son todavía una única especificación sincronizada.

## 12. Generación y aplicación automática de SEO

### `scripts/generate-mdx-seo.mjs`

Genera dos artefactos de trabajo:

- `seo-mdx-table.md`;
- `seo-mdx-table.csv`.

Analiza MDX de:

- `content/posts`;
- `content/firma-scarpa`.

Extrae título, descripción, tags/keywords y categoría. Después calcula:

- keyword principal;
- tres keywords;
- `seoTitle`;
- `seoDescription`.

La lógica intenta adaptar los títulos al formato `... 2026 | Derecho Artificial`, con un máximo de 60 caracteres, y las descripciones al rango de 150–160 caracteres.

### `scripts/aplicar-seo-automatico.mjs`

Consume `seo-mdx-mejorado.csv` y modifica el frontmatter de los MDX para escribir:

- `seoTitle`;
- `seoDescription`;
- `keywords`;
- `seoKeyword`.

Elimina previamente campos SEO de esas mismas categorías para evitar duplicados.

Después hace commit y push de `content/` con el usuario `SEO Bot` y un mensaje del tipo:

```text
SEO: Optimize N meta tags (seoTitle, seoDescription, keywords)
```

### Scripts de control

- `check-seo-table.mjs` valida el CSV contra las reglas de longitud, presencia de `2026` y sufijo de marca.
- `list-seo-violations.mjs` genera `seo-mdx-violations.json` con los registros que no cumplen.

Estos scripts no aparecen como comandos npm dedicados en el `package.json` actual, por lo que forman parte del arsenal de mantenimiento pero no de un único comando público del proyecto.

## 13. Validación y reparación del contenido

### `scripts/validate-content.mjs`

Es el validador de contenido más estructurado del repositorio.

Recorre tanto `content` como `content-en`, utiliza `gray-matter` y controla:

- lectura/parsing de MDX;
- títulos;
- fechas válidas;
- sección/categoría;
- secciones permitidas;
- correspondencia entre carpeta y sección;
- generación de ruta pública;
- duplicidad de rutas.

Los errores de rutas duplicadas son críticos. Con `--strict`, las advertencias también producen código de salida de error.

### `scripts/repair-frontmatter.mjs`

Herramienta de reparación. Recorre las secciones principales y normaliza:

- saltos de línea;
- delimitadores de frontmatter;
- `section`;
- `category`;
- `slug`;
- comillas de los valores.

No es un validador puro: **modifica archivos**. Debe ejecutarse como herramienta de mantenimiento controlado.

### `scripts/audit-empty-guides.mjs`

Audita `content/guias`, localiza `index.mdx` y calcula líneas y caracteres del cuerpo para detectar guías potencialmente vacías.

## 14. Automatizaciones auxiliares de estructura y contenido

### `scripts/generate-md-from-html.mjs`

Convierte/genera Markdown a partir de HTML y es utilizado por `deploy-content` como primer paso del pipeline.

### `scripts/update-home.mjs`

Aplica sustituciones sobre `src/app/page.tsx` para mantener rutas y categorías de secciones, especialmente las migraciones hacia `global-ia` y `guias-ia`.

### `scripts/update_json.js`

Modifica un JSON específico de Firma Scarpa para insertar imágenes de portadas de libros en su cuerpo.

### `scripts/migrate-vite-firma-scarpa-to-content.mjs`

Herramienta de migración de contenidos de una estructura Vite anterior hacia la estructura actual de `content`.

### `scripts/convert-sfpro.mjs`

Se ejecuta automáticamente como `prebuild` y convierte/prepara los recursos tipográficos SF Pro antes del build.

## 15. Automatización editorial versus automatización técnica

El sistema presenta dos capas distintas.

### Capa editorial

- creación y organización del MDX;
- frontmatter;
- autoría;
- fecha;
- sección;
- SEO;
- interlinking;
- recursos PDF;
- relación entre artículos y hubs.

### Capa de infraestructura

- lint;
- TypeScript;
- build Next.js;
- sitemap;
- robots;
- Open Graph;
- hreflang;
- accesibilidad;
- seguridad de dependencias;
- compresión de imágenes;
- revalidación de caché;
- despliegue Vercel.

La filosofía resultante es que **la publicación editorial debe terminar convertida en una operación técnica reproducible y verificable**, pero la automatización técnica no debe decidir por sí sola el criterio intelectual del artículo.

## 16. Reglas operativas que se desprenden del repositorio

1. El contenido es la unidad editorial principal.
2. El frontmatter es parte de la infraestructura editorial, no un adorno.
3. Las rutas deben ser deterministas y coherentes con sección y slug.
4. Un artículo no necesita una `page.tsx` individual cuando existe router dinámico.
5. El `push` a `main` es el evento central que conecta repositorio y producción.
6. Las comprobaciones de calidad diferencian errores bloqueantes de advertencias.
7. Las imágenes deben optimizarse y ser accesibles.
8. El SEO se trata como una propiedad estructural del contenido.
9. El interlinking debe ser reversible y semánticamente justificado.
10. Las automatizaciones que modifican archivos deben diferenciarse claramente de las que solo auditan.
11. Los secretos, especialmente `REVALIDATE_SECRET`, deben permanecer fuera del código versionado.
12. La documentación debe reflejar el ejecutor real: cuando workflow, script y guía divergen, debe prevalecer el estado efectivo del repositorio y corregirse la documentación.

## 17. Inventario resumido

| Componente | Función | Ejecuta cambios | Bloquea | Estado/observación |
|---|---|---:|---:|---|
| `publish-post.mjs` | Publicación individual | Sí, Git | Sí | Publicador selectivo |
| `deploy-content.mjs` | Pipeline de contenido | Sí, Git | Sí | Incluye dry-run |
| `calidad-tecnica.yml` | Build/TS/MDX/SEO técnico/bundle | No | Parcial | Lint no bloqueante en este workflow |
| `seo-check.yml` | SEO estructural | No | Parcial | Errores críticos bloquean |
| `accessibility.yml` | A11y + tests + audit | No | Sí/Parcial | `npm audit` advierte |
| `compress-images.yml` | AVIF/WebP | Sí | Sí | Hace commit automático |
| `pre-push.yml` | Lint/TS/build | No | Sí | Se activa en push |
| `api/revalidate` | Revalidación ISR | Sí, caché | Sí ante auth/error | POST protegido |
| `revalidate-api.mjs` | Cliente de revalidación | Sí, caché | Sí | CLI |
| `interlinking-complete-fixed.mjs` | Enlaces internos | Sí | No | `dryRun=false` en estado actual |
| `generate-mdx-seo.mjs` | Generación de propuesta SEO | Sí, artefactos | No | Genera MD/CSV |
| `aplicar-seo-automatico.mjs` | Aplicación SEO | Sí, MDX + Git | Sí ante errores | Commit/push automático |
| `validate-content.mjs` | Validación MDX/rutas | No | Sí con errores/strict | ES + EN |
| `repair-frontmatter.mjs` | Reparación frontmatter | Sí | No | Mantenimiento |
| `audit-empty-guides.mjs` | Auditoría de guías | No | No | Diagnóstico |
| `update-home.mjs` | Actualización home | Sí | No | Sustituciones de estructura |
| `update_json.js` | Actualización JSON | Sí | No | Recurso específico |
| `convert-sfpro.mjs` | Preparación tipográfica | Sí | Si falla prebuild | Hook `prebuild` |

## 18. Principio rector

El repositorio no automatiza la inteligencia editorial. Automatiza el **sistema que permite que una decisión editorial humana se convierta en una publicación estable, comprobable, indexable, accesible y reversible**.

La automatización, por tanto, funciona como infraestructura de confianza: reduce errores mecánicos y libera al editor para concentrarse en la investigación, la interpretación jurídica y el juicio crítico.
