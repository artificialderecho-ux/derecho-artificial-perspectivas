import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// ─── Rutas base ───────────────────────────────────────────────────────────────

const ROOT       = process.cwd();

// Secciones con nueva arquitectura: content/<section>/<slug>/index.mdx
const NEW_SECTIONS = [
  'jurisprudencia',
  'normativa',
  'firma-scarpa',
  'etica-ia',
  'propiedad-intelectual-ia',
  'ia-global',
  'global-ia',
  'guias',
  'glosario',
] as const;

// Mapa de section → ruta en el sitio
const SECTION_ROUTES: Record<string, string> = {
  'jurisprudencia':           'jurisprudencia',
  'normativa':                'normativa',
  'firma-scarpa':             'firma-scarpa',
  'etica-ia':                 'etica-ia',
  'propiedad-intelectual-ia': 'propiedad-intelectual-ia',
  'ia-global':                'ia-global',
  'global-ia':                'global-ia',
  'guias':                    'recursos/guias',
  'glosario':                 'glosario-ia-legal',
  // Compatibilidad: category/section históricos → ruta del sitio
  'jurisprudencia ia':        'jurisprudencia',
  'legislación digital':      'normativa',
  'legislacion digital':      'normativa',
  'legislación internacional':'normativa',
  'legislacion internacional':'normativa',
  'legislación':              'normativa',
  'legislacion':              'normativa',
  'legislación ia':           'normativa',
  'legislacion ia':           'normativa',
  'regulación ue':            'normativa',
  'regulacion ue':            'normativa',
  'firma scarpa':             'firma-scarpa',
  'global ia':                'global-ia',
  'recursos':                 'recursos/guias',
};

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface PostFrontmatter {
  title: string;
  date: string;
  category?: string;
  section?: string;
  tags?: string[];
  pdf?: string;
  author?: string;
  description?: string;
  slug?: string;
  readingTime?: string;
  [key: string]: any;
}

export interface PostData {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  url: string;
  excerpt: string;
  pdfUrl?: string;      // URL al PDF si existe (detectado automáticamente o desde frontmatter)
  sourceDir?: string;   // 'new' | 'legacy' — para debug
}

// ─── Utilidades ───────────────────────────────────────────────────────────────

function decodeSlug(value: string) {
  try { return decodeURIComponent(value); } catch { return value; }
}

function normalizeSlugForMatch(value: string) {
  return decodeSlug(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Determina la ruta del sitio a partir del campo `section` (nueva arquitectura)
 * o del campo `category` (legado). Devuelve null si no se reconoce.
 */
function resolveRoute(frontmatter: PostFrontmatter): string | null {
  // Nueva arquitectura: usar `section`
  if (frontmatter.section) {
    return SECTION_ROUTES[frontmatter.section.toLowerCase().trim()] ?? null;
  }
  // Legado: usar `category`
  if (frontmatter.category) {
    return SECTION_ROUTES[frontmatter.category.toLowerCase().trim()] ?? null;
  }
  return null;
}

/**
 * Detecta automáticamente si hay un PDF en la carpeta del post.
 * Solo aplica a la nueva arquitectura (content/<section>/<slug>/).
 */
function detectPdf(postDir: string, slug: string, frontmatter: PostFrontmatter): string | undefined {
  // 1. Campo pdf en frontmatter tiene prioridad
  if (frontmatter.pdf) {
    return frontmatter.pdf.startsWith('/') ? frontmatter.pdf : `/${frontmatter.pdf}`;
  }

  // 2. Detectar automáticamente cualquier .pdf en la carpeta del post
  if (postDir && fs.existsSync(postDir)) {
    const pdfFiles = fs.readdirSync(postDir).filter(f => f.endsWith('.pdf'));
    if (pdfFiles.length > 0) {
      // El PDF se sirve desde la ruta pública equivalente
      // Convención: el PDF se copia a public/fuentes/ durante el build o está en content/
      // Por compatibilidad, retornar la ruta relativa al post
      return `/fuentes/${pdfFiles[0]}`;
    }
  }

  return undefined;
}

// ─── Lector de nueva arquitectura ────────────────────────────────────────────

/**
 * Lee todos los posts de content/<section>/<slug>/index.mdx
 */
function readNewSectionPosts(): PostData[] {
  const posts: PostData[] = [];

  for (const section of NEW_SECTIONS) {
    const sectionDir = path.join(ROOT, 'content', section);
    if (!fs.existsSync(sectionDir)) continue;

    const slugDirs = fs.readdirSync(sectionDir).filter(entry => {
      const full = path.join(sectionDir, entry);
      return fs.statSync(full).isDirectory();
    });

    for (const slugDir of slugDirs) {
      const postDir = path.join(sectionDir, section === 'glosario' ? '' : '', slugDir);
      const mdxPath = path.join(sectionDir, slugDir, 'index.mdx');

      if (!fs.existsSync(mdxPath)) continue;

      try {
        const fileContents = fs.readFileSync(mdxPath, 'utf8');
        const { data, content } = matter(fileContents);
        const frontmatter = data as PostFrontmatter;

        const slug = frontmatter.slug || slugDir;
        const route = resolveRoute(frontmatter) ?? section;

        const excerpt =
          frontmatter.description ||
          content.replace(/[#*`]/g, '').replace(/\n/g, ' ').trim().slice(0, 160) + '...';

        const pdfUrl = detectPdf(path.join(sectionDir, slugDir), slug, frontmatter);

        // Las noticias con URL externa no se incluyen
        if (frontmatter.category?.toLowerCase() === 'noticia' && frontmatter.url) {
          continue;
        }

        posts.push({
          slug,
          frontmatter,
          content,
          url: `/${route}/${slug}`,
          excerpt,
          pdfUrl,
          sourceDir: 'new',
        });
      } catch (e) {
        console.warn(`[mdx-utils] Error leyendo ${mdxPath}:`, e);
      }
    }
  }

  return posts;
}

// ─── API pública ──────────────────────────────────────────────────────────────

let _postsCache: PostData[] | null = null;

/**
 * Devuelve todos los posts del sitio (arquitectura por secciones), ordenados por fecha.
 * El resultado se cachea en memoria durante el proceso de build.
 */
export function getAllPosts(): PostData[] {
  if (_postsCache) return _postsCache;

  const all = readNewSectionPosts().sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });

  _postsCache = all;
  return all;
}

/**
 * Devuelve solo posts de una sección específica.
 */
export function getPostsBySection(section: string): PostData[] {
  const route = SECTION_ROUTES[section.toLowerCase().trim()];
  if (!route) return [];
  return getAllPosts().filter(p => p.url.startsWith(`/${route}/`));
}

/**
 * Devuelve todas las noticias (category: "noticia").
 */
export function getAllNoticias(): PostData[] {
  return getAllPosts()
    .filter((post) => post.frontmatter.category?.toLowerCase() === 'noticia')
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

/**
 * Busca un post por slug con fallback a normalización.
 */
export function getPostBySlug(slug: string): PostData | undefined {
  const posts = getAllPosts();

  const directMatch = posts.find(p => p.slug === slug);
  if (directMatch) return directMatch;

  const decodedSlug  = decodeSlug(slug);
  const decodedMatch = posts.find(p => p.slug === decodedSlug);
  if (decodedMatch) return decodedMatch;

  const normalizedSlug = normalizeSlugForMatch(slug);
  return posts.find(p => normalizeSlugForMatch(p.slug) === normalizedSlug);
}
