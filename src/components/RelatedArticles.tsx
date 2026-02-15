import { getAllPosts } from "@/lib/mdx-utils";

interface RelatedArticlesProps {
  currentTags?: string[];
  currentSlug: string;
  currentCategory?: string;
}

export async function RelatedArticles({
  currentTags = [],
  currentSlug,
  currentCategory,
}: RelatedArticlesProps) {
  const allPosts = getAllPosts();

  const normalizedCurrentTags = currentTags.map((t) => t.toLowerCase().replace("#", ""));

  const related = allPosts
    .filter((post) => {
      if (post.slug === currentSlug) return false;

      const postTags = (post.frontmatter.tags || []).map((t: string) =>
        t.toLowerCase().replace("#", ""),
      );
      const sharedTags =
        normalizedCurrentTags.length > 0 &&
        postTags.some((tag) => normalizedCurrentTags.includes(tag));

      const sameCategory =
        currentCategory && (post.frontmatter.category || "").toLowerCase() === currentCategory;

      return sharedTags || sameCategory;
    })
    .slice(0, 4);

  if (related.length === 0) {
    return (
      <section className="mt-16 border-t border-slate-200 pt-10">
        <h2 className="font-serif text-2xl font-bold mb-6 text-foreground">
          Artículos relacionados
        </h2>
        <p className="text-sm text-slate-500">Próximamente más análisis relacionados.</p>
      </section>
    );
  }

  return (
    <RelatedArticlesList articles={related} title="Artículos relacionados" />
  );
}

function RelatedArticlesList({ articles, title }: { articles: any[]; title: string }) {
  return (
    <section className="mt-16 border-t border-slate-200 pt-10">
      <h2 className="font-serif text-2xl font-bold mb-6 text-foreground">{title}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((item) => (
          <a
            key={item.url}
            href={item.url}
            className="group block border border-slate-200 rounded-lg p-5 hover:shadow-md hover:border-slate-400 transition"
          >
            <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
              {item.frontmatter.title}
            </h3>
            <div className="flex items-center justify-between mt-4">
              <time className="text-sm text-slate-500">{item.frontmatter.date}</time>
              {item.frontmatter.category && (
                <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full capitalize">
                  {item.frontmatter.category.replace("-", " ")}
                </span>
              )}
            </div>
            {item.excerpt && (
              <p className="text-sm text-slate-600 mt-3 line-clamp-2 italic">
                {item.excerpt}
              </p>
            )}
          </a>
        ))}
      </div>
    </section>
  );
}
