import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from '@/lib/mdx-utils';
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Derecho, ética y regulación de la IA",
  description:
    "Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.",
  keywords: [
    "derecho artificial",
    "inteligencia artificial",
    "regulación IA",
    "AI Act",
    "RGPD",
    "jurisprudencia",
    "cumplimiento",
  ],
  openGraph: {
    type: "website",
    title: "Derecho, ética y regulación de la IA",
    description:
      "Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.",
    url: "https://www.derechoartificial.com",
    siteName: "Derecho Artificial",
    locale: "es_ES",
    images: [
      {
        url: "/logo-principal.png",
        width: 1200,
        height: 630,
        alt: "Derecho Artificial",
      },
    ],
  },
};

export default async function HomePage() {
  const mdxPosts = getAllPosts();

  const formatDate = (value: string | number) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  };

  const getLatestPostsByCategory = (category: string) =>
    mdxPosts
      .filter((post) => {
        const cat = (post.frontmatter.category || "").toLowerCase();
        const section = (post.frontmatter.section || "").toLowerCase();
        return cat === category.toLowerCase() || section === category.toLowerCase();
      })
      .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
      .slice(0, 2);

  const getLatestPostsByCategories = (categories: string[]) => {
    const normalized = categories.map((c) => c.toLowerCase());
    const unique = new Map<string, (typeof mdxPosts)[number]>();

    for (const post of mdxPosts) {
      const cat = (post.frontmatter.category || "").toLowerCase();
      const section = (post.frontmatter.section || "").toLowerCase();
      if (normalized.includes(cat) || normalized.includes(section)) {
        unique.set(post.slug, post);
      }
    }

    return [...unique.values()]
      .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
      .slice(0, 2);
  };

  const sectionConfigs = [
    {
      key: "firma-scarpa",
      title: "Firma Scarpa",
      image: "/images/heroes/firma-scarpa-hero.webp",
      href: "/firma-scarpa",
      getItems: () =>
        getLatestPostsByCategory("firma-scarpa").map((post) => ({
          title: post.frontmatter.title,
          href: post.url,
          description: post.excerpt,
          date: new Date(post.frontmatter.date).getTime(),
        })),
    },
    {
      key: "normativa",
      title: "Normativa IA",
      image: "/images/heroes/normativa-ia-hero.webp",
      href: "/normativa",
      getItems: () =>
        getLatestPostsByCategory("normativa").map((post) => ({
          title: post.frontmatter.title,
          href: post.url,
          description: post.excerpt,
          date: new Date(post.frontmatter.date).getTime(),
        })),
    },
    {
      key: "jurisprudencia",
      title: "Jurisprudencia IA",
      image: "/images/heroes/jurisprudencia-ia-hero.webp",
      href: "/jurisprudencia",
      getItems: () =>
        getLatestPostsByCategory("jurisprudencia").map((post) => ({
          title: post.frontmatter.title,
          href: post.url,
          description: post.excerpt,
          date: new Date(post.frontmatter.date).getTime(),
        })),
    },
    {
      key: "guias",
      title: "Guías IA",
      image: "/images/heroes/guias-ia-hero.webp",
      href: "/recursos/guias",
      getItems: () =>
        getLatestPostsByCategory("guias").map((post) => ({
          title: post.frontmatter.title,
          href: post.url,
          description: post.excerpt,
          date: new Date(post.frontmatter.date).getTime(),
        })),
    },
    {
      key: "propiedad-intelectual",
      title: "Propiedad Intelectual IA",
      image: "/images/heroes/propiedad-intelectual-ia-hero.webp",
      href: "/propiedad-intelectual-ia",
      getItems: () =>
        getLatestPostsByCategory("propiedad-intelectual-ia").map((post) => ({
          title: post.frontmatter.title,
          href: post.url,
          description: post.excerpt,
          date: new Date(post.frontmatter.date).getTime(),
        })),
    },
    {
      key: "etica",
      title: "Ética IA",
      image: "/images/heroes/etica-ia-hero.webp",
      href: "/etica-ia",
      getItems: () =>
        getLatestPostsByCategory("etica-ia").map((post) => ({
          title: post.frontmatter.title,
          href: post.url,
          description: post.excerpt,
          date: new Date(post.frontmatter.date).getTime(),
        })),
    },
    {
      key: "ia-global",
      title: "IA Global",
      image: "/images/heroes/ia-global-hero.webp",
      href: "/global-ia",
      getItems: () =>
        getLatestPostsByCategories(["global-ia", "ia-global"])
          .map((post) => ({
            title: post.frontmatter.title,
            href: post.url,
            description: post.excerpt,
            date: new Date(post.frontmatter.date).getTime(),
          })),
    },
  ];

  return (
    <>
      <Breadcrumbs items={[{ label: "Inicio", href: "/" }]} />
      <main>
        <section className="relative w-full h-80 md:h-96 lg:h-[500px]">
          <Image
            src="/images/heroes/home-hero.webp"
            alt="Derecho e IA"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/65 flex flex-col items-center justify-center text-center text-white px-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl">
              Derecho Artificial
            </h1>
            <p className="text-sm md:text-base lg:text-lg mt-2 max-w-2xl drop-shadow-lg font-medium">
              Derecho, ética y regulación de la IA
            </p>
            <p className="text-xs md:text-sm lg:text-base mt-2 max-w-3xl drop-shadow-lg text-white/80">
              Análisis jurídico del Reglamento IA y su impacto legal. Guías prácticas para abogados y profesionales del compliance.
            </p>
            <div className="mt-8 flex flex-col md:flex-row gap-4">
              <Link
                href="/firma-scarpa"
                className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/90 transition-colors"
              >
                Explorar contenido
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-3">
                Análisis y recursos
              </p>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                Últimas actualizaciones por sección
              </h2>
            </div>

            <div className="space-y-8">
              {sectionConfigs.map((sec) => {
                const items = sec.getItems();
                return (
                  <div key={sec.key} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <Link href={sec.href} className="relative block w-full aspect-video overflow-hidden">
                      <Image
                        src={sec.image}
                        alt={sec.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
                      <div className="absolute inset-0 flex items-end px-6 pb-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                          {sec.title}
                        </h3>
                      </div>
                    </Link>

                    <div className="p-6 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
                      {items.length > 0 ? (
                        items.map((item, idx) => (
                          <Link
                            key={`${sec.key}-${idx}`}
                            href={item.href}
                            className="p-5 border border-gray-200 rounded hover:border-primary hover:shadow-md transition-all flex flex-col justify-between group/card"
                          >
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">
                                {sec.title}
                              </p>
                              <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover/card:text-primary transition-colors">
                                {item.title}
                                <span className="opacity-0 group-hover/card:opacity-100 transition-opacity ml-2">→</span>
                              </h4>
                              <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">{formatDate(item.date)}</p>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-2 p-6 border border-dashed border-gray-300 rounded bg-gray-50 flex items-center justify-center">
                          <p className="text-gray-500">Próximamente contenido</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
