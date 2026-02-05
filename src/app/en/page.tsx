import type { Metadata } from "next";
import Link from "next/link";
import { listContentSlugs, getContentEntry } from "@/lib/content";
import { listSectionResourceSlugs, getSectionResourceEntry } from "@/lib/resources";
import { Badges, isNew, isRecent, formatDateFromMs, getItemDateMs } from "@/lib/badges";
import { IndicatorsLegend } from "@/components/ui/IndicatorsLegend";

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

  
  const toMs = (value: string | number | Date | null | undefined) => {
    if (value == null) return 0;
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return 0;
    return d.getTime();
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
        meta: `${formatDateFromMs(e.dateMs, "en-US")} · Regulatory analysis with official sources`,
        dateMs: e.dateMs ?? 0,
      })) ?? [];

  const jurisprudenciaItems =
    jurisprudenciaTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/jurisprudencia/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs, "en-US")} · Key decisions on algorithms and rights`,
        dateMs: e.dateMs ?? 0,
      })) ?? [];

  const guiasItems =
    guiasTopEntries
      .filter((e): e is NonNullable<typeof e> => Boolean(e))
      .map((e) => ({
        title: e.title,
        href: `/recursos/guias/${e.slug}`,
        description: e.summaryHtml ? e.summaryHtml.replace(/<[^>]+>/g, "").slice(0, 200) : "",
        meta: `${formatDateFromMs(e.dateMs, "en-US")} · Repository of technical and ethical documentation`,
        dateMs: e.dateMs ?? 0,
      })) ?? [];
  const latestNewsMs = toMs(unifiedActualidad[0]?.date);
  const latestJurisprudenceMs = jurisprudenciaTopEntries[0]?.dateMs ?? 0;
  const latestLegislationMs = normativaTopEntries[0]?.dateMs ?? 0;
  const latestGuidesMs = guiasTopEntries[0]?.dateMs ?? 0;
  const latestFirmMs = toMs(unifiedFirma[0]?.date);
  const newsWeeklyCount = unifiedActualidad.filter((e) => isNew(e.date)).length;
  const firmWeeklyCount = unifiedFirma.filter((e) => isNew(e.date)).length;

  const [legislationEntriesAll, jurisprudenceEntriesAll, guidesEntriesAll] = await Promise.all([
    Promise.all(normativaSlugs.map((slug) => getSectionResourceEntry("normativa", slug))),
    Promise.all(jurisprudenciaSlugs.map((slug) => getSectionResourceEntry("jurisprudencia", slug))),
    Promise.all(guiasSlugs.map((slug) => getSectionResourceEntry("guias", slug))),
  ]);
  const legislationWeeklyCount = legislationEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.dateMs ?? 0)).length;
  const jurisprudenceWeeklyCount = jurisprudenceEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.dateMs ?? 0)).length;
  const guidesWeeklyCount = guidesEntriesAll
    .filter((e): e is NonNullable<typeof e> => Boolean(e))
    .filter((e) => isNew(e.dateMs ?? 0)).length;

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
            dateMs: e.date,
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
            dateMs: e.date,
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

  const getCtaLabel = (key: string) => {
    switch (key) {
      case "legislation":
        return "View legislation";
      case "jurisprudence":
        return "View jurisprudence";
      case "guides":
        return "Browse guides";
      case "ai-news":
        return "Read AI news";
      case "scarpa-firm":
        return "Explore the firm";
      case "legal-ai-glossary":
        return "View glossary";
      case "about-us":
        return "Learn about the project";
      case "contact":
        return "Get in touch";
      default:
        return "View section";
    }
  };

  return (
    <main>
      <section className="py-20 md:py-28 bg-surface border-b border-divider">
        <div className="container-narrow text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-caption mb-4">
            Law, ethics and AI regulation
          </p>
          <h1 className="font-sans text-4xl md:text-6xl text-foreground mb-6 leading-[1.05]">
            Law, Ethics and AI Regulation
          </h1>
          <h2 className="text-xl md:text-2xl text-body leading-relaxed max-w-3xl mx-auto">
            Beyond the news: independent legal analysis and expert judgment on the AI Act and its legal impact. The practical reference for lawyers and compliance professionals.
          </h2>
        </div>
      </section>
      <section className="section-spacing bento-surface">
        <div className="container-wide">
          <div className="grid grid-cols-2 gap-6">
            <Link href="/en/scarpa-firm" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Scarpa Firm</h3>
              <h2 className="text-sm md:text-base text-body">The Firm: Expert opinion and critical analysis of Digital Law</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestFirmMs} locale="en-US" newLabel="New" updatedLabel="Updated" />
                <span className="text-[10px]">Entries: {unifiedFirma.length}</span>
              </div>
            </Link>
            <Link href="/en/jurisprudence" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Jurisprudence</h3>
              <h2 className="text-sm md:text-base text-body">Jurisprudence Observatory: Case law and rulings on Artificial Intelligence</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestJurisprudenceMs} locale="en-US" newLabel="New" updatedLabel="Updated" />
                <span className="text-[10px]">Entries: {jurisprudenciaSlugs.length}</span>
              </div>
            </Link>
            <Link href="/en/ai-news" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">AI News</h3>
              <h2 className="text-sm md:text-base text-body">Legal Tech Updates: News and legal impact of technology</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestNewsMs} locale="en-US" newLabel="New" updatedLabel="Updated" />
                <span className="text-[10px]">Recent entries: {unifiedActualidad.length}</span>
              </div>
            </Link>
            <Link href="/en/legislation" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Legislation</h3>
              <h2 className="text-sm md:text-base text-body">Regulatory Framework: Laws, regulations and AI Compliance</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestLegislationMs} locale="en-US" newLabel="New" updatedLabel="Updated" />
                <span className="text-[10px]">Entries: {normativaSlugs.length}</span>
              </div>
            </Link>
            <Link href="/en/guides-protocols" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">Guides & Protocols</h3>
              <h2 className="text-sm md:text-base text-body">Practical Guides and Professional Protocols</h2>
              <div className="mt-2 inline-flex items-center gap-2 text-xs text-caption">
                <Badges ms={latestGuidesMs} locale="en-US" newLabel="New" updatedLabel="Updated" />
                <span className="text-[10px]">Documents: {guiasSlugs.length}</span>
              </div>
            </Link>
            <Link href="/en/legal-ai-glossary" className="bg-gray-50 border border-border rounded-sm p-5 md:p-6 min-h-36 hover:border-primary/30 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
              <h3 className="font-serif text-xl text-foreground">AI Glossary</h3>
              <h2 className="text-sm md:text-base text-body">Dictionary of legal terms and concepts</h2>
            </Link>
          </div>
          
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
                    {getCtaLabel(section.key)} <span>→</span>
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
                        <Badges ms={getItemDateMs(item)} locale="en-US" newLabel="New" updatedLabel="Updated" className="mb-2 inline-flex items-center gap-2 text-xs text-caption" />
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
