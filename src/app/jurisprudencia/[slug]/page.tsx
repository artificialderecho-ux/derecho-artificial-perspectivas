import Link from "next/link"

// Mock data - later will come from MDX/CMS
const FEATURED_ARTICLES = [
  {
    slug: "california-sb-1047-ai-liability-lawyers",
    title: "California's SB-1047 and What It Means for Law Firm Liability",
    description: "The landmark AI safety bill creates new exposure for firms deploying AI in client-facing workflows. Here's what you need to know.",
    category: "Legislation",
    state: "California",
    date: "Mar 1, 2025",
    readingTime: 8,
  },
  {
    slug: "harvey-ai-review-2025",
    title: "Harvey AI Review 2025: Is It Worth the Enterprise Price?",
    description: "We put Harvey through its paces across research, drafting, and deposition prep. The results are nuanced.",
    category: "Tool Review",
    date: "Feb 28, 2025",
    readingTime: 12,
  },
  {
    slug: "aba-formal-opinion-512-ai",
    title: "ABA Formal Opinion 512: Competence in the Age of AI",
    description: "The ABA has spoken. Every attorney using AI tools must now meet a new standard of technological competence.",
    category: "ABA Ethics",
    date: "Feb 25, 2025",
    readingTime: 6,
  },
]

const TRACKER_HIGHLIGHTS = [
  { state: "California", status: "enacted", slug: "california" },
  { state: "New York", status: "enacted", slug: "new-york" },
  { state: "Texas", status: "active-legislation", slug: "texas" },
  { state: "Florida", status: "active-legislation", slug: "florida" },
  { state: "Colorado", status: "enacted", slug: "colorado" },
  { state: "Illinois", status: "active-legislation", slug: "illinois" },
]

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  enacted: { bg: "rgba(34,197,94,0.1)", text: "#4ADE80", label: "Enacted" },
  "active-legislation": { bg: "rgba(212,175,55,0.1)", text: "#D4AF37", label: "Active Legislation" },
  monitoring: { bg: "rgba(100,100,100,0.1)", text: "#888", label: "Monitoring" },
  "no-activity": { bg: "rgba(60,60,60,0.1)", text: "#555", label: "No Activity" },
}

export default function HomePage() {
  return (
    <main style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", color: "#F5F0E8" }}>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        position: "relative",
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        paddingTop: "120px",
      }}>
        {/* Background texture */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            radial-gradient(ellipse 80% 60% at 50% -10%, rgba(212,175,55,0.07) 0%, transparent 60%),
            repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(212,175,55,0.02) 80px, rgba(212,175,55,0.02) 81px),
            repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(212,175,55,0.02) 80px, rgba(212,175,55,0.02) 81px)
          `,
        }} />

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 32px", position: "relative", width: "100%" }}>
          <div style={{ maxWidth: "760px" }}>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              marginBottom: "32px",
              padding: "6px 16px",
              border: "1px solid rgba(212,175,55,0.3)",
              backgroundColor: "rgba(212,175,55,0.05)",
            }}>
              <div style={{ width: "6px", height: "6px", backgroundColor: "#D4AF37", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37" }}>
                AI & Law — Latest Intelligence
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(42px, 6vw, 72px)",
              fontWeight: "700",
              lineHeight: "1.08",
              letterSpacing: "-0.02em",
              color: "#F5F0E8",
              marginBottom: "28px",
            }}>
              Where Law Meets<br />
              <span style={{
                background: "linear-gradient(135deg, #D4AF37 0%, #F5E27A 50%, #D4AF37 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Artificial Intelligence
              </span>
            </h1>

            <p style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#8A8070",
              marginBottom: "48px",
              maxWidth: "580px",
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
            }}>
              Legislation tracking, tool reviews, and case law analysis for US legal professionals navigating the AI transformation.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link href="/tracker" style={{
                padding: "14px 32px",
                backgroundColor: "#D4AF37",
                color: "#0A0A0A",
                textDecoration: "none",
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: "700",
                transition: "all 0.2s",
              }}>
                View 50-State Tracker →
              </Link>
              <Link href="/newsletter" style={{
                padding: "14px 32px",
                backgroundColor: "transparent",
                border: "1px solid rgba(212,175,55,0.3)",
                color: "#C8C0B0",
                textDecoration: "none",
                fontSize: "13px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                transition: "all 0.2s",
              }}>
                Get the Newsletter
              </Link>
            </div>
          </div>
        </div>

        {/* Vertical rule decoration */}
        <div style={{
          position: "absolute", right: "80px", top: "20%", bottom: "20%",
          width: "1px", backgroundColor: "rgba(212,175,55,0.1)",
          display: "none",
        }} />
      </section>

      {/* ── TICKER / STATS BAR ───────────────────────────────────────── */}
      <div style={{
        borderTop: "1px solid rgba(212,175,55,0.15)",
        borderBottom: "1px solid rgba(212,175,55,0.15)",
        backgroundColor: "rgba(212,175,55,0.03)",
        padding: "20px 32px",
        display: "flex",
        justifyContent: "center",
        gap: "64px",
        flexWrap: "wrap",
      }}>
        {[
          { num: "50", label: "States Tracked" },
          { num: "12", label: "Enacted AI Laws" },
          { num: "23", label: "Bills in Progress" },
          { num: "47", label: "Tools Reviewed" },
        ].map(({ num, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "28px", fontFamily: "Georgia, serif", fontWeight: "700", color: "#D4AF37" }}>{num}</div>
            <div style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#555", marginTop: "2px" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* ── FEATURED ARTICLES ────────────────────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
          <div>
            <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "8px" }}>
              Latest
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: "700", color: "#F5F0E8", margin: 0 }}>
              Recent Coverage
            </h2>
          </div>
          <Link href="/news" style={{ color: "#D4AF37", textDecoration: "none", fontSize: "13px", letterSpacing: "0.08em" }}>
            All News →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2px", backgroundColor: "rgba(212,175,55,0.08)" }}>
          {/* Hero article */}
          <div style={{ backgroundColor: "#0A0A0A", padding: "40px", borderRight: "1px solid rgba(212,175,55,0.08)" }}>
            <ArticleCard article={FEATURED_ARTICLES[0]} large />
          </div>
          {/* Secondary articles */}
          <div style={{ backgroundColor: "#0A0A0A", display: "flex", flexDirection: "column" }}>
            {FEATURED_ARTICLES.slice(1).map((article, i) => (
              <div key={article.slug} style={{
                padding: "32px",
                borderBottom: i === 0 ? "1px solid rgba(212,175,55,0.08)" : "none",
                flex: 1,
              }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACKER PREVIEW ──────────────────────────────────────────── */}
      <section style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(212,175,55,0.1)",
        borderBottom: "1px solid rgba(212,175,55,0.1)",
        padding: "80px 32px",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px" }}>
            <div>
              <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "8px" }}>
                Live
              </div>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "32px", fontWeight: "700", color: "#F5F0E8", margin: 0 }}>
                AI Regulation Tracker
              </h2>
              <p style={{ color: "#555", fontSize: "14px", marginTop: "8px", fontStyle: "italic" }}>
                Real-time status across all 50 US states
              </p>
            </div>
            <Link href="/tracker/state" style={{ color: "#D4AF37", textDecoration: "none", fontSize: "13px", letterSpacing: "0.08em" }}>
              Full 50-State Index →
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", backgroundColor: "rgba(212,175,55,0.08)" }}>
            {TRACKER_HIGHLIGHTS.map((item) => {
              const s = STATUS_COLORS[item.status]
              return (
                <Link
                  key={item.slug}
                  href={`/tracker/state/${item.slug}`}
                  style={{
                    display: "block",
                    backgroundColor: "#0A0A0A",
                    padding: "24px 28px",
                    textDecoration: "none",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0F0F0F")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0A0A0A")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "Georgia, serif", fontSize: "16px", color: "#C8C0B0" }}>{item.state}</span>
                    <span style={{
                      fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase",
                      padding: "3px 10px", backgroundColor: s.bg, color: s.text,
                    }}>
                      {s.label}
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────────────── */}
      <section style={{
        maxWidth: "1200px", margin: "0 auto", padding: "100px 32px",
        display: "flex", justifyContent: "center",
      }}>
        <div style={{
          maxWidth: "600px", textAlign: "center",
          padding: "60px",
          border: "1px solid rgba(212,175,55,0.15)",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
            width: "60px", height: "2px", backgroundColor: "#D4AF37",
          }} />
          <div style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF37", marginBottom: "20px" }}>
            Newsletter
          </div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "30px", color: "#F5F0E8", marginBottom: "16px", lineHeight: "1.3" }}>
            Stay Ahead of AI Law
          </h2>
          <p style={{ color: "#666", fontSize: "15px", lineHeight: "1.7", marginBottom: "32px", fontStyle: "italic" }}>
            Weekly briefings on legislation, case law, and tool reviews — written for legal professionals, not technologists.
          </p>
          <Link href="/newsletter" style={{
            display: "inline-block",
            padding: "14px 40px",
            backgroundColor: "#D4AF37",
            color: "#0A0A0A",
            textDecoration: "none",
            fontSize: "13px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: "700",
          }}>
            Subscribe Free →
          </Link>
          <p style={{ marginTop: "16px", fontSize: "11px", color: "#444" }}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </main>
  )
}

function ArticleCard({ article, large = false }: { article: typeof FEATURED_ARTICLES[0]; large?: boolean }) {
  return (
    <Link href={`/news/${article.slug}`} style={{ textDecoration: "none", display: "block" }}>
      <div style={{
        fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase",
        color: "#D4AF37", marginBottom: "12px",
      }}>
        {article.category}{article.state ? ` — ${article.state}` : ""}
      </div>
      <h3 style={{
        fontFamily: "Georgia, serif",
        fontSize: large ? "24px" : "17px",
        fontWeight: "700",
        color: "#F5F0E8",
        lineHeight: "1.3",
        marginBottom: "12px",
        transition: "color 0.2s",
      }}>
        {article.title}
      </h3>
      <p style={{
        color: "#6A6560",
        fontSize: large ? "15px" : "13px",
        lineHeight: "1.6",
        marginBottom: "16px",
        fontStyle: "italic",
      }}>
        {article.description}
      </p>
      <div style={{ fontSize: "11px", color: "#444", letterSpacing: "0.06em" }}>
        {article.date} · {article.readingTime} min read
      </div>
    </Link>
  )
}
