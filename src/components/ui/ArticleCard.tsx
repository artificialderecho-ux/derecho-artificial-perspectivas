import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  href: string;
  featured?: boolean;
}

export function ArticleCard({ title, excerpt, date, category, href, featured = false }: ArticleCardProps) {
  return (
    <article className={`group ${featured ? 'pb-8 mb-8 border-b border-divider' : ''}`}>
      <Link to={href} className="block">
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs uppercase tracking-wider text-caption font-medium">
            {category}
          </span>
          <span className="text-caption">·</span>
          <time className="text-xs text-caption">{date}</time>
        </div>
        
        <h3 className={`font-serif text-foreground group-hover:text-muted-foreground transition-colors ${
          featured ? 'text-2xl md:text-3xl mb-4' : 'text-xl md:text-2xl mb-3'
        }`}>
          {title}
        </h3>
        
        <p className={`text-body leading-relaxed ${featured ? 'text-base md:text-lg' : 'text-base'}`}>
          {excerpt}
        </p>
        
        <span className="inline-block mt-4 text-sm text-caption group-hover:text-foreground transition-colors">
          Leer más →
        </span>
      </Link>
    </article>
  );
}
