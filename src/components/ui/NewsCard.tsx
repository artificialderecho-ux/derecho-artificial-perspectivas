import { Link } from "react-router-dom";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  source: string;
  href: string;
}

export function NewsCard({ title, excerpt, date, source, href }: NewsCardProps) {
  return (
    <article className="group py-6 border-b border-divider last:border-b-0">
      <Link to={href} className="block">
        <div className="flex items-center gap-3 mb-2">
          <time className="text-xs text-caption">{date}</time>
          <span className="text-caption">·</span>
          <span className="text-xs text-caption">{source}</span>
        </div>
        
        <h3 className="font-serif text-lg md:text-xl text-foreground group-hover:text-muted-foreground transition-colors mb-2">
          {title}
        </h3>
        
        <p className="text-sm text-body">
          {excerpt}
        </p>
      </Link>
    </article>
  );
}
