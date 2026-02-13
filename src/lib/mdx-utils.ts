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
    
    // Generar excerpt: descripción o los primeros 160 caracteres del contenido
    const excerpt = data.description || 
                   content.replace(/[#*`]/g, '') // Quitar markdown básico
                          .replace(/\n/g, ' ')
                          .trim()
                          .slice(0, 160) + '...';
    
    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      url: `/${data.category || 'blog'}/${slug}`,
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
  return posts.find(p => p.slug === slug);
}
