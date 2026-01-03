import { Link } from "react-router-dom";

interface NewsCardProps {
  title: string;
  summary: string;
  date: string;
  source: string;
  sourceUrl: string;
  tags: string[];
}

export function NewsCard({ title, summary, date, source, sourceUrl, tags }: NewsCardProps) {
  return (
    <article className="border-b border-divider pb-10 mb-10 last:border-b-0 last:mb-0 last:pb-0">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <time className="text-xs text-caption uppercase tracking-wider">{date}</time>
        <span className="text-caption">·</span>
        <a 
          href={sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-caption hover:text-foreground transition-colors uppercase tracking-wider"
        >
          {source}
        </a>
      </div>
      
      <h2 className="font-serif text-xl md:text-2xl text-foreground leading-tight mb-4">
        {title}
      </h2>
      
      <p className="text-body leading-relaxed mb-6">
        {summary}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span 
            key={tag} 
            className="text-xs px-3 py-1 bg-surface text-caption border border-divider"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}
