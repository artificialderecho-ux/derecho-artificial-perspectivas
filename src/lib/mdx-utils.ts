import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');
const rootContentDir = path.join(process.cwd(), 'content');

export interface PostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags?: string[];
  pdf?: string;
  author?: string;
  description?: string;
  [key: string]: any;
}

export interface PostData {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  url: string;
  excerpt: string;
}

function decodeSlug(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function normalizeSlugForMatch(value: string) {
  return decodeSlug(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-");
}

export function getAllPosts(): PostData[] {
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const dirFiles = fs.readdirSync(postsDirectory);
  const fileMap = new Map<string, string>();

  // Recursively collect all MDX files
  const collectFiles = (dir: string, baseDir: string = "") => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        collectFiles(filePath, path.join(baseDir, file));
      } else if (file.endsWith(".mdx")) {
        const relativePath = baseDir ? path.join(baseDir, file) : file;
        const slug = relativePath.replace(/\.mdx?$/, '');
        if (!fileMap.has(slug)) {
          fileMap.set(slug, filePath);
        }
      }
    }
  };

  collectFiles(postsDirectory);

  const posts = Array.from(fileMap.entries()).map(([slug, fullPath]) => {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const excerpt =
      data.description ||
      content
        .replace(/[#*`]/g, '')
        .replace(/\n/g, ' ')
        .trim()
        .slice(0, 160) +
        '...';

    const category = (data.category || 'blog') as string;
    const frontmatterUrl = (data as any).url as string | undefined;
    const frontmatterSlug = (data as any).slug as string | undefined;
    
    // Usar slug del frontmatter si existe, sino usar el nombre del archivo
    const finalSlug = frontmatterSlug || slug;
    
    // Para posts de legislación, usar siempre la ruta /normativa/
    const isLegislationCategory = 
      category.toLowerCase() === 'legislación digital' ||
      category.toLowerCase() === 'legislación internacional' ||
      category.toLowerCase() === 'legislación' ||
      category.toLowerCase() === 'legislación ia' ||
      category.toLowerCase() === 'regulación ue' ||
      category.toLowerCase() === 'normativa';
    
    // Para posts de jurisprudencia, usar siempre la ruta /jurisprudencia/
    const isJurisprudenceCategory = 
      category.toLowerCase() === 'jurisprudencia' ||
      category.toLowerCase() === 'jurisprudencia ia';
    
    // Para posts de IA Global, usar siempre la ruta /global-ia/
    const isGlobalIACategory = 
      category.toLowerCase() === 'ia-global' ||
      category.toLowerCase() === 'global ia';
    
    const url =
      category.toLowerCase() === 'noticia' && frontmatterUrl
        ? frontmatterUrl // Para noticias con URL externa, usar la URL externa directamente
        : isLegislationCategory
        ? `/normativa/${finalSlug}`
        : isJurisprudenceCategory
        ? `/jurisprudencia/${finalSlug}`
        : isGlobalIACategory
        ? `/global-ia/${finalSlug}`
        : `/${category}/${encodeURIComponent(finalSlug)}`;

    // Si es una noticia con URL externa, no incluirla en la lista de posts internos
    if (category.toLowerCase() === 'noticia' && frontmatterUrl) {
      return null; // No incluir posts de noticias con URL externa en la lista principal
    }

    return {
      slug: finalSlug,
      frontmatter: data as PostFrontmatter,
      content,
      url,
      excerpt
    };
  }).filter(post => post !== null); // Filtrar valores nulos

  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

export function getAllNoticias(): PostData[] {
  const postsDirectory = path.join(process.cwd(), "content", "posts");
  const dirFiles = fs.readdirSync(postsDirectory);
  const fileMap = new Map<string, string>();

  // Recursively collect all MDX files
  const collectFiles = (dir: string, baseDir: string = "") => {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        collectFiles(filePath, path.join(baseDir, file));
      } else if (file.endsWith(".mdx")) {
        const relativePath = baseDir ? path.join(baseDir, file) : file;
        const slug = relativePath.replace(/\.mdx?$/, '');
        if (!fileMap.has(slug)) {
          fileMap.set(slug, filePath);
        }
      }
    }
  };

  collectFiles(postsDirectory);

  const posts = Array.from(fileMap.entries()).map(([slug, fullPath]) => {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const excerpt =
      data.description ||
      content
        .replace(/[#*`]/g, '')
        .replace(/\n/g, ' ')
        .trim()
        .slice(0, 160) +
        '...';

    const category = (data.category || 'blog') as string;
    const frontmatterUrl = (data as any).url as string | undefined;
    
    // Solo incluir posts de categoría "noticia"
    if (category.toLowerCase() !== 'noticia') {
      return null;
    }
    
    const url = frontmatterUrl || `/noticia/${encodeURIComponent(slug)}`;

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      url,
      excerpt
    };
  }).filter(post => post !== null); // Filtrar valores nulos

  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date).getTime();
    const dateB = new Date(b.frontmatter.date).getTime();
    return dateB - dateA;
  });
}

export function getPostBySlug(slug: string): PostData | undefined {
  const posts = getAllPosts();
  const directMatch = posts.find(p => p.slug === slug);
  if (directMatch) return directMatch;

  const decodedSlug = decodeSlug(slug);
  const decodedMatch = posts.find(p => p.slug === decodedSlug);
  if (decodedMatch) return decodedMatch;

  const normalizedSlug = normalizeSlugForMatch(slug);
  return posts.find(p => normalizeSlugForMatch(p.slug) === normalizedSlug);
}
