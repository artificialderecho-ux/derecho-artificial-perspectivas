import type { Metadata } from "next";
import Link from "next/link";
import { listContentSlugs, getContentEntry } from "@/lib/content";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Law, ethics and AI regulation",
  description:
    "Independent legal and editorial analysis on artificial intelligence: compliance, jurisprudence, and the EU regulatory framework.",
  keywords: [
    "artificial intelligence law",
    "AI regulation",
    "EU AI Act",
    "GDPR",
    "AI compliance",
    "AI jurisprudence",
    "law and technology",
  ],
  alternates: {
    canonical: "/en",
    languages: {
      "es-ES": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    title: "Law, ethics and AI regulation",
    description:
      "Independent legal and editorial analysis on artificial intelligence: compliance, jurisprudence, and the EU regulatory framework.",
    url: "/en",
    locale: "en_US",
    images: [
      {
        url: "/logo-principal.png",
      },
    ],
  },
};

export default async function EnglishHomePage() {
  const [
    actualidadJsonSlugs,
    actualidadResourceSlugs,
    firmaJsonSlugs,
    firmaResourceSlugs,
    normativaSlugs,
    jurisprudenciaSlugs,
    guiasSlugs,
  ] = await Promise.all([
    listContentSlugs("actualidad-ia"),
    listSectionResourceSlugs("actualidad-ia"),
    listContentSlugs("firma-scarpa"),
    listSectionResourceSlugs("firma-scarpa"),
    listSectionResourceSlugs("normativa"),
    listSectionResourceSlugs("jurisprudencia"),
    listSectionResourceSlugs("guias"),
  ]);

  const [actualidadJsonEntries, actualidadResourceEntries, firmaJsonEntries, firmaResourceEntries] =
    await Promise.all([
      Promise.all(actualidadJsonSlugs.map((slug) => getContentEntry("actualidad-ia", slug))),
      Promise.all(actualidadResourceSlugs.map((slug) => getSectionResourceEntry("actualidad-ia", slug))),
      Promise.all(firmaJsonSlugs.map((slug) => getContentEntry("firma-scarpa", slug))),
      Promise.all(firmaResourceSlugs.map((slug) => getSectionResourceEntry("firma-scarpa", slug))),
    ]);

  const resolvedActualidadJson = actualidadJsonEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );
  const resolvedActualidadResources = actualidadResourceEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );
  const resolvedFirmaJson = firmaJsonEntries.filter((e): e is NonNullable<typeof e> => Boolean(e));
  const resolvedFirmaResources = firmaResourceEntries.filter(
    (e): e is NonNullable<typeof e> => Boolean(e),
  );

  const unifiedActualidad = [
    ...resolvedActualidadJson.map((e) => ({
      title: e.title,
      description: e.description,
      date: new Date(e.datePublished).getTime(),
      urlPath: e.urlPath,
      author: e.author,
    })),
    ...resolvedActualidadResources.map((e) => ({
      title: e.title,
      description: e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
      date: e.dateMs ?? 0,
      urlPath: `/actualidad-ia/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ];

  const unifiedFirma = [
    ...resolvedFirmaJson.map((e) => ({
      title: e.title,
      description: e.description,
      date: new Date(e.datePublished).getTime(),
      urlPath: e.urlPath,
      author: e.author,
    })),
    ...resolvedFirmaResources.map((e) => ({
      title: e.title,
      description: e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200),
      date: e.dateMs ?? 0,
      urlPath: `/firma-scarpa/${e.slug}`,
      author: "Derecho Artificial",
    })),
  ];

  unifiedActualidad.sort((a, b) => b.date - a.date);
  unifiedFirma.sort((a, b) => b.date - a.date);

  const latestActualidad = unifiedActualidad[0] ?? null;
  const latestFirma = unifiedFirma[0] ?? null;

  const [latestNormativa, latestJurisprudencia, latestGuias] = await Promise.all([
    normativaSlugs[0]
      ? getSectionResourceEntry("normativa", normativaSlugs[0])
      : Promise.resolve(null),
    jurisprudenciaSlugs[0]
      ? getSectionResourceEntry("jurisprudencia", jurisprudenciaSlugs[0])
      : Promise.resolve(null),
    guiasSlugs[0] ? getSectionResourceEntry("guias", guiasSlugs[0]) : Promise.resolve(null),
  ]);

  const formatDate = (value: string | number) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const formatDateFromMs = (value: number | null | undefined) => {
    if (value == null) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const [normativaTopEntries, jurisprudenciaTopEntries, guiasTopEntries] = await Promise.all([
    Promise.all(
      normativaSlugs.slice(0, 2).map((slug) => getSectionResourceEntry("normativa", slug)),
    ),
    Promise.all(
      jurisprudenciaSlugs.slice(0, 2).map((slug) => getSectionResourceEntry("jurisprudencia", slug)),
    ),
    Promise.all(guiasSlugs.slice(0, 2).map((slug) => getSectionResourceEntry("guias", slug))),
  ]);

  const normativaItems =
    normativaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/normativa/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs)} · Regulatory analysis with official sources`,
      })) ?? [];

  const jurisprudenciaItems =
    jurisprudenciaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/jurisprudencia/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs)} · Key decisions on algorithms and rights`,
      })) ?? [];

  const guiasItems =
    guiasTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/recursos/guias/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs)} · Repository of technical and ethical documentation`,
      })) ?? [];

  const uniqueByHref = <T extends { href: string }>(arr: T[]) => {
    const seen = new Set<string>();
    const res: T[] = [];
    for (const it of arr) {
      if (seen.has(it.href)) continue;
      seen.add(it.href);
      res.push(it);
    }
    return res;
  };

  const sectionCards = [
    {
      key: "scarpa-firm",
      label: "Scarpa Firm",
      href: "/en/scarpa-firm",
      items: uniqueByHref(
        [unifiedFirma[0], unifiedFirma[1]]
          .filter((e): e is NonNullable<typeof e> => Boolean(e))
          .map((e) => ({
            title: e.title,
            href: e.urlPath,
            description: e.description ?? "",
            meta: `${formatDate(e.date)} · ${e.author}`,
          })),
      ),
    },
    {
      key: "jurisprudence",
      label: "Jurisprudence",
      href: "/en/jurisprudence",
      items: uniqueByHref(jurisprudenciaItems).slice(0, 2),
    },
    {
      key: "ai-news",
      label: "AI News",
      href: "/en/ai-news",
      items: uniqueByHref(
        [unifiedActualidad[0], unifiedActualidad[1]]
          .filter((e): e is NonNullable<typeof e> => Boolean(e))
          .map((e) => ({
            title: e.title,
            href: e.urlPath,
            description: e.description ?? "",
            meta: `${formatDate(e.date)} · ${e.author}`,
          })),
      ),
    },
    {
      key: "legislation",
      label: "Legislation",
      href: "/en/legislation",
      items: uniqueByHref(normativaItems).slice(0, 2),
    },
    {
      key: "guides",
      label: "Guides & Protocols",
      href: "/en/guides-protocols",
      items: uniqueByHref(guiasItems).slice(0, 2),
    },
    {
      key: "legal-ai-glossary",
      label: "Legal AI Glossary",
      href: "/en/legal-ai-glossary",
    },
    {
      key: "about-us",
      label: "About Us",
      href: "/en/about-us",
    },
    {
      key: "contact",
      label: "Contact",
      href: "/en/contact",
    },
  ];

  return (
    <main>
      <section className="section-spacing">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">
                Reference map
              </p>
              <h2 className="font-display text-2xl md:text-3xl text-foreground">
                Law & AI at a glance
              </h2>
            </div>
            <p className="text-sm text-caption max-w-xl">
              Direct access to the project’s key areas with context and recent activity.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6 auto-rows-[minmax(160px,_auto)]">
            <Link href="/en/legal-ai-glossary" className="bg-card border border-border rounded-sm p-6 lg:col-span-3 lg:row-span-2 hover:border-primary/30 transition-all">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Glossary</p>
              <h3 className="font-display text-2xl md:text-3xl text-foreground mb-2">Legal AI Glossary</h3>
              <p className="text-sm text-body">Technical and legal dictionary for the EU ecosystem.</p>
              <div className="mt-4 inline-flex items-center gap-2 text-xs text-caption">
                <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">New</span>
                <span>Updated</span>
              </div>
            </Link>
            <Link href="/en/ai-news" className="bg-card border border-border rounded-sm p-6 lg:col-span-3 hover:border-primary/30 transition-all">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">AI News</p>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Briefings & analysis</h3>
              <p className="text-sm text-body">Latest entries and resources.</p>
              <p className="mt-4 text-xs text-caption">Recent entries: {unifiedActualidad.length}</p>
            </Link>
            <Link href="/en/jurisprudence" className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 transition-all">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Jurisprudence</p>
              <h3 className="font-display text-xl text-foreground mb-2">Key decisions</h3>
              <p className="text-sm text-body">Selection on algorithms and rights.</p>
              <p className="mt-4 text-xs text-caption">Entries: {jurisprudenciaSlugs.length}</p>
            </Link>
            <Link href="/en/legislation" className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 transition-all">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Legislation</p>
              <h3 className="font-display text-xl text-foreground mb-2">Regulatory framework</h3>
              <p className="text-sm text-body">EU AI Act and applicable regulation.</p>
              <p className="mt-4 text-xs text-caption">Entries: {normativaSlugs.length}</p>
            </Link>
            <Link href="/en/guides-protocols" className="bg-card border border-border rounded-sm p-6 lg:col-span-2 hover:border-primary/30 transition-all">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Guides & Protocols</p>
              <h3 className="font-display text-xl text-foreground mb-2">Technical library</h3>
              <p className="text-sm text-body">Official documentation and soft law.</p>
              <p className="mt-4 text-xs text-caption">Documents: {guiasSlugs.length}</p>
            </Link>
            <Link href="/en/scarpa-firm" className="bg-card border border-border rounded-sm p-6 lg:col-span-4 hover:border-primary/30 transition-all">
              <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">Scarpa Firm</p>
              <h3 className="font-display text-xl md:text-2xl text-foreground mb-2">Essays and working notes</h3>
              <p className="text-sm text-body">Original analysis and downloadable materials.</p>
              <p className="mt-4 text-xs text-caption">Entries: {unifiedFirma.length}</p>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-surface border-b border-divider">
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">
            Law, ethics and AI regulation
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-foreground mb-6 leading-[1.05]">
            Derecho Artificial
          </h1>
          <p className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mx-auto">
            Independent legal and editorial analysis on artificial intelligence, focused on regulation,
            jurisprudence and professional practice.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-caption mb-3">
                Highlights
              </p>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Latest in Law & AI
              </h2>
            </div>
            <p className="text-sm text-caption max-w-xl">
              A selection of the latest briefings, essays and critical documents on artificial intelligence,
              sorted from newest to oldest.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {latestActualidad && (
              <Link
                href={latestActualidad.urlPath}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  AI News
                </p>
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {latestActualidad.title}
                </h3>
                <p className="text-sm text-body mb-4 line-clamp-3">
                  {latestActualidad.description}
                </p>
                <p className="mt-auto text-xs text-caption">
                  {formatDate(latestActualidad.date)} · {latestActualidad.author}
                </p>
              </Link>
            )}

            {latestFirma && (
              <Link
                href={latestFirma.urlPath}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Scarpa Firm
                </p>
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {latestFirma.title}
                </h3>
                <p className="text-sm text-body mb-4 line-clamp-3">
                  {latestFirma.description}
                </p>
                <p className="mt-auto text-xs text-caption">
                  {formatDate(latestFirma.date)} · {latestFirma.author}
                </p>
              </Link>
            )}

            {latestNormativa && (
              <Link
                href={`/normativa/${latestNormativa.slug}`}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Legislation
                </p>
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {latestNormativa.title}
                </h3>
                {latestNormativa.summaryHtml && (
                  <p className="text-sm text-body mb-4 line-clamp-3">
                    {latestNormativa.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)}
                  </p>
                )}
                <p className="mt-auto text-xs text-caption">
                  Regulatory analysis with official sources
                </p>
              </Link>
            )}

            {latestJurisprudencia && (
              <Link
                href={`/jurisprudencia/${latestJurisprudencia.slug}`}
                className="card-elevated p-6 hover:border-primary/20 transition-all duration-300 flex flex-col"
              >
                <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-3">
                  Jurisprudence
                </p>
                <h3 className="font-serif text-lg text-foreground mb-3">
                  {latestJurisprudencia.title}
                </h3>
                {latestJurisprudencia.summaryHtml && (
                  <p className="text-sm text-body mb-4 line-clamp-3">
                    {latestJurisprudencia.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200)}
                  </p>
                )}
                <p className="mt-auto text-xs text-caption">
                  Key decisions on algorithms and rights
                </p>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-wide">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-8">
            Sections
          </h2>
          <div className="space-y-6">
            {sectionCards.map((section) => (
              <div
                key={section.key}
                className="card-elevated p-6 md:p-8 hover:border-primary/20 transition-all duration-300 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    {section.items && section.items.length > 0 && (
                      <p className="text-[10px] uppercase tracking-[0.25em] text-caption mb-2">
                        Section
                      </p>
                    )}
                    <h3 className="font-serif text-xl md:text-2xl text-foreground">{section.label}</h3>
                  </div>
                  <Link
                    href={section.href}
                    className="text-sm font-medium text-primary inline-flex items-center gap-1"
                  >
                    View section <span>→</span>
                  </Link>
                </div>
                {section.items && section.items.length > 0 && (
                  <div className="mt-2 flex flex-col gap-3">
                    {section.items.slice(0, 2).map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="border border-dashed border-divider rounded-sm p-4 hover:border-primary/40 transition-colors"
                      >
                        <p className="font-medium text-sm text-foreground mb-1">{item.title}</p>
                        {item.description &&
                          item.title &&
                          item.description.trim().toLowerCase() !== item.title.trim().toLowerCase() && (
                            <p className="text-sm text-body line-clamp-2">{item.description}</p>
                          )}
                        {item.meta && <p className="mt-2 text-xs text-caption">{item.meta}</p>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
