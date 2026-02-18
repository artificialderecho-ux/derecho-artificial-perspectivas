import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'content/posts');

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
  if (!fs.existsSync(postsDir)) {
    return [];
  }

  const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  
  const posts = files.map(file => {
    const fullPath = path.join(postsDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = file.replace(/\.mdx?$/, '');

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
    const url =
      category.toLowerCase() === 'noticia' && frontmatterUrl
        ? frontmatterUrl
        : `/${category}/${encodeURIComponent(slug)}`;

    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      url,
      excerpt
    };
  });

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
