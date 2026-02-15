import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { StructuredData, createBreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { getAllPosts } from "@/lib/mdx-utils";

export const metadata: Metadata = {
  title: "Propiedad Intelectual IA",
  description:
    "Análisis y recursos sobre propiedad intelectual, derecho de autor e inteligencia artificial.",
  alternates: { canonical: "/propiedad-intelectual-ia" },
  openGraph: {
    type: "website",
    title: "Propiedad Intelectual IA",
    description:
      "Análisis y recursos sobre propiedad intelectual, derecho de autor e inteligencia artificial.",
    url: "/propiedad-intelectual-ia",
    locale: "es_ES",
    images: [{ url: "/logo-principal.png" }],
  },
};

export default async function PropiedadIntelectualIAPage() {
  const breadcrumbJsonLd = createBreadcrumbJsonLd({
    items: [
      { name: "Derecho Artificial", url: "https://derechoartificial.com" },
      { name: "Propiedad Intelectual IA", url: "https://derechoartificial.com/propiedad-intelectual-ia" },
    ],
  });

  const mdxPosts = getAllPosts().filter(
    (post) => (post.frontmatter.category || "").toLowerCase() === "propiedad-intelectual-ia",
  );

  const items = mdxPosts
    .map((post) => {
      const date = new Date(post.frontmatter.date);
      const safeDate = Number.isNaN(date.getTime())
        ? post.frontmatter.date
        : date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
      return {
        slug: post.slug,
        title: post.frontmatter.title,
        href: post.url,
        excerpt: post.excerpt,
        dateLabel: safeDate,
        author: post.frontmatter.author || "Ricardo Scarpa",
        dateMs: new Date(post.frontmatter.date).getTime(),
      };
    })
    .sort((a, b) => b.dateMs - a.dateMs);

  return (
    <>
      <StructuredData data={breadcrumbJsonLd} />
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Propiedad Intelectual IA", href: "/propiedad-intelectual-ia" },
        ]}
      />
      <LegalLayout
        title="Propiedad Intelectual IA"
        category="Secciones"
        date={new Date().toISOString().slice(0, 10)}
      >
        <div className="space-y-8">
          <p className="text-body">
            Selección de análisis y recursos sobre el conflicto entre IA generativa y derechos de
            autor, licencias de uso, text and data mining y blindaje de catálogos creativos.
          </p>
          {items.length === 0 ? (
            <p className="text-body">Próximamente contenido.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((item) => (
                <Link
                  key={item.slug}
                  href={item.href}
                  className="card-elevated p-6 hover:border-primary/30 transition-all duration-300 flex flex-col gap-3"
                >
                  <p className="text-[10px] uppercase tracking-[0.25em] text-caption">
                    Análisis
                  </p>
                  <h2 className="font-serif text-xl md:text-2xl text-foreground">
                    {item.title}
                  </h2>
                  <p className="text-sm text-body line-clamp-3">{item.excerpt}</p>
                  <p className="text-xs text-caption mt-2">
                    {item.dateLabel} · {item.author}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </LegalLayout>
    </>
  );
}
