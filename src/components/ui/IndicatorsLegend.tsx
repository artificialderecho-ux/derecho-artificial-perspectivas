import React from "react";

type Props = {
  locale?: "es-ES" | "en-US";
  className?: string;
};

export function IndicatorsLegend({ locale = "es-ES", className }: Props) {
  const text =
    locale === "en-US"
      ? "Indicators: New: 7 days · Updated: 30 days · Weekly activity: count of new entries in the last 7 days."
      : "Indicadores: Nuevo: 7 días · Actualizado: 30 días · Actividad semanal: recuento de entradas nuevas en los últimos 7 días.";
  return <div className={`mt-3 text-xs text-caption ${className ?? ""}`}>{text}</div>;
}
