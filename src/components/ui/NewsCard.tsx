interface NewsCardProps {
  title: string;
  date: string;
  source: string;
  sourceUrl: string;
  tags: string[];
  // Editorial structure
  context: string;
  keyContent: string;
  legalRelevance: string;
  editorialNote: string;
}

export function NewsCard({ 
  title, 
  date, 
  source, 
  sourceUrl, 
  tags, 
  context, 
  keyContent, 
  legalRelevance, 
  editorialNote 
}: NewsCardProps) {
  return (
    <article className="border border-divider mb-10 last:mb-0">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-divider bg-surface">
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
        
        <h2 className="font-serif text-xl md:text-2xl text-foreground leading-tight">
          {title}
        </h2>
      </div>
      
      {/* Context */}
      <div className="p-6 md:p-8 border-b border-divider">
        <h3 className="text-xs uppercase tracking-wider text-caption mb-3">
          Contexto
        </h3>
        <p className="text-body leading-relaxed">
          {context}
        </p>
      </div>
      
      {/* Key content */}
      <div className="p-6 md:p-8 border-b border-divider">
        <h3 className="text-xs uppercase tracking-wider text-caption mb-3">
          Contenido clave
        </h3>
        <p className="text-body leading-relaxed">
          {keyContent}
        </p>
      </div>
      
      {/* Legal relevance */}
      <div className="p-6 md:p-8 border-b border-divider">
        <h3 className="text-xs uppercase tracking-wider text-caption mb-3">
          Relevancia jurídica
        </h3>
        <p className="text-body leading-relaxed">
          {legalRelevance}
        </p>
      </div>
      
      {/* Source link */}
      <div className="p-6 md:p-8 border-b border-divider">
        <h3 className="text-xs uppercase tracking-wider text-caption mb-3">
          Fuente original
        </h3>
        <a 
          href={sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-body hover:text-foreground transition-colors underline underline-offset-4"
        >
          {source} →
        </a>
      </div>
      
      {/* Editorial note */}
      <div className="p-6 md:p-8 bg-surface">
        <h3 className="text-xs uppercase tracking-wider text-caption mb-3">
          Nota editorial
        </h3>
        <p className="text-body text-sm leading-relaxed italic">
          {editorialNote}
        </p>
      </div>
      
      {/* Tags */}
      <div className="p-6 md:p-8 border-t border-divider">
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
      </div>
    </article>
  );
}