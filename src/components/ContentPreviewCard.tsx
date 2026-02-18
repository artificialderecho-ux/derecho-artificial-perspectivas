import Image from "next/image";
import Link from "next/link";

export type PreviewItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  badge: string;
  meta: string;
  dateMs: number;
  displayDateMs?: number;
  imageUrl?: string;
};

interface ContentPreviewCardProps {
  item: PreviewItem;
  size?: "small" | "medium" | "large";
}

export function ContentPreviewCard({ item, size = "medium" }: ContentPreviewCardProps) {
  const cardClasses = {
    small: "card-elevated p-4 hover:border-primary/20 transition-all duration-300",
    medium: "card-elevated p-6 hover:border-primary/20 transition-all duration-300",
    large: "bg-card border border-border rounded-sm p-6 hover:border-primary/30 hover:shadow-md transition-all duration-300",
  };

  const titleClasses = {
    small: "font-serif text-lg text-foreground mb-2",
    medium: "font-serif text-2xl text-foreground mb-4",
    large: "font-serif text-xl md:text-2xl text-foreground mb-2",
  };

  const descriptionClasses = {
    small: "text-sm text-body mb-3",
    medium: "text-body mb-6",
    large: "text-sm text-body mb-4",
  };

  const metaClasses = {
    small: "text-xs text-caption",
    medium: "text-sm text-caption",
    large: "text-xs text-caption",
  };
  const isExternalImage = item.imageUrl?.startsWith("http");

  return (
    <Link href={item.href} className={cardClasses[size]}>
      {item.imageUrl && (
        <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-sm bg-slate-100">
          {isExternalImage ? (
            <img src={item.imageUrl} alt={item.title} loading="lazy" className="block h-full w-full object-cover object-center" />
          ) : (
            <Image src={item.imageUrl} alt={item.title} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover object-center" />
          )}
        </div>
      )}
      <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">{item.badge}</p>
      <h2 className={titleClasses[size]}>{item.title}</h2>
      {item.description && <p className={descriptionClasses[size]}>{item.description}</p>}
      {item.meta && <div className={metaClasses[size]}>{item.meta}</div>}
    </Link>
  );
}

interface ContentPreviewGridProps {
  items: PreviewItem[];
  columns?: 1 | 2 | 3;
  size?: "small" | "medium" | "large";
  maxItems?: number;
}

export function ContentPreviewGrid({ 
  items, 
  columns = 2, 
  size = "medium", 
  maxItems 
}: ContentPreviewGridProps) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;
  
  const gridClasses = {
    1: "grid gap-6",
    2: "grid gap-6 md:grid-cols-2",
    3: "grid gap-6 md:grid-cols-3",
  };

  return (
    <section className={gridClasses[columns]}>
      {displayItems.map((item) => (
        <ContentPreviewCard key={item.id} item={item} size={size} />
      ))}
    </section>
  );
}
