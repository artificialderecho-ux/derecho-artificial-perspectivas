import React from "react";

export const isRecent = (ms: number, days = 30) => {
  if (!ms) return false;
  const diffDays = (Date.now() - ms) / (1000 * 60 * 60 * 24);
  return diffDays <= days;
};

export const isNew = (ms: number, days = 7) => {
  if (!ms) return false;
  const diffDays = (Date.now() - ms) / (1000 * 60 * 60 * 24);
  return diffDays <= days;
};

export const formatDateFromMs = (
  value: number | null | undefined,
  locale: string,
) => {
  if (value == null) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
};

export const getItemDateMs = (obj: unknown): number => {
  if (obj && typeof obj === "object" && "dateMs" in obj) {
    const v = (obj as { dateMs?: number }).dateMs;
    return typeof v === "number" && !Number.isNaN(v) ? v : 0;
  }
  return 0;
};

export function Badges(props: {
  ms?: number;
  locale: "es-ES" | "en-US";
  newLabel: string;
  updatedLabel: string;
  className?: string;
}) {
  const ms = props.ms ?? 0;
  if (!(ms > 0)) return null;
  return (
    <div className={props.className ?? "inline-flex items-center gap-2 text-xs text-caption"}>
      {isNew(ms) && (
        <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">
          {props.newLabel}
        </span>
      )}
      {isRecent(ms) && (
        <span className="px-2 py-1 bg-accent text-accent-foreground rounded-sm">
          {props.updatedLabel}
        </span>
      )}
      <span>{formatDateFromMs(ms, props.locale)}</span>
    </div>
  );
}
