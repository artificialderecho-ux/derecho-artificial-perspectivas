import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ScrollytellingProps = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  deck?: string;
  visual?: ReactNode;
  align?: "left" | "right";
  className?: string;
};

type ScrollyStepProps = {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
  stat?: string;
  className?: string;
};

type ScrollyFigureProps = {
  children?: ReactNode;
  src?: string;
  alt?: string;
  caption?: string;
  className?: string;
};

type ScrollyCalloutProps = {
  children: ReactNode;
  title?: string;
  tone?: "default" | "warning" | "success";
  className?: string;
};

type ScrollyMetricProps = {
  label: string;
  value: string;
  detail?: string;
  className?: string;
};

export function Scrollytelling({
  children,
  title,
  eyebrow,
  deck,
  visual,
  align = "right",
  className,
}: ScrollytellingProps) {
  return (
    <section
      className={cn(
        "not-prose my-16 rounded-[2rem] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 shadow-sm md:my-24 md:p-8",
        className,
      )}
    >
      {(eyebrow || title || deck) && (
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          {eyebrow && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">
              {eyebrow}
            </p>
          )}
          {title && <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-5xl">{title}</h2>}
          {deck && <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">{deck}</p>}
        </header>
      )}

      <div
        className={cn(
          "grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(320px,0.75fr)] lg:items-start",
          align === "left" && "lg:grid-cols-[minmax(320px,0.75fr)_minmax(0,0.95fr)]",
        )}
      >
        {align === "left" && visual ? <div className="lg:sticky lg:top-28">{visual}</div> : null}
        <div className="space-y-8 md:space-y-12">{children}</div>
        {align === "right" && visual ? <div className="lg:sticky lg:top-28">{visual}</div> : null}
      </div>
    </section>
  );
}

export function ScrollyStep({ children, title, eyebrow, stat, className }: ScrollyStepProps) {
  return (
    <article
      className={cn(
        "flex min-h-[58vh] flex-col justify-center rounded-3xl border border-slate-200 bg-white/92 p-6 shadow-sm backdrop-blur md:p-9",
        className,
      )}
    >
      {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{eyebrow}</p>}
      {stat && <p className="mb-4 text-5xl font-semibold tracking-tight text-slate-950 md:text-6xl">{stat}</p>}
      {title && <h3 className="mb-4 text-2xl font-semibold tracking-tight text-slate-950 md:text-3xl">{title}</h3>}
      <div className="space-y-4 text-lg leading-8 text-slate-700">{children}</div>
    </article>
  );
}

export function ScrollyFigure({ children, src, alt = "", caption, className }: ScrollyFigureProps) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-[1.75rem] border border-slate-200 bg-slate-950 text-white shadow-xl",
        className,
      )}
    >
      {src ? <img src={src} alt={alt} className="h-auto w-full object-cover" loading="lazy" decoding="async" /> : null}
      {children ? <div className="p-6 md:p-8">{children}</div> : null}
      {caption && <figcaption className="border-t border-white/10 px-6 py-4 text-sm leading-6 text-slate-300">{caption}</figcaption>}
    </figure>
  );
}

export function ScrollyCallout({ children, title, tone = "default", className }: ScrollyCalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-2xl border p-5 text-base leading-7",
        tone === "default" && "border-slate-200 bg-slate-50 text-slate-700",
        tone === "warning" && "border-amber-200 bg-amber-50 text-amber-950",
        tone === "success" && "border-emerald-200 bg-emerald-50 text-emerald-950",
        className,
      )}
    >
      {title && <p className="mb-2 font-semibold text-current">{title}</p>}
      {children}
    </aside>
  );
}

export function ScrollyMetric({ label, value, detail, className }: ScrollyMetricProps) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-white/10 p-5", className)}>
      <p className="text-sm uppercase tracking-[0.2em] text-slate-300">{label}</p>
      <p className="mt-2 text-4xl font-semibold tracking-tight text-white">{value}</p>
      {detail && <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>}
    </div>
  );
}
