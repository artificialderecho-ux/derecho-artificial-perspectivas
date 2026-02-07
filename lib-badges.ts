/**
 * Sistema de badges y formateo de fechas
 * Este archivo maneja el display de fechas de forma consistente
 */

/**
 * Determina si una entrada es "nueva" (menos de 7 días)
 */
export function isNew(ms: number): boolean {
  if (!ms || Number.isNaN(ms)) return false;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  return now - ms < 7 * dayMs;
}

/**
 * Determina si una entrada es "reciente" (menos de 30 días)
 */
export function isRecent(ms: number): boolean {
  if (!ms || Number.isNaN(ms)) return false;
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  return now - ms < 30 * dayMs;
}

/**
 * Formatea una fecha de timestamp a formato legible
 */
export function formatDateFromMs(ms: number, locale: string = "es-ES"): string {
  if (!ms || Number.isNaN(ms)) return "";
  const date = new Date(ms);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Componente de badges que muestra "Nuevo" o "Actualizado"
 */
interface BadgesProps {
  ms: number;
  locale?: string;
  newLabel?: string;
  updatedLabel?: string;
  className?: string;
}

export function Badges({
  ms,
  locale = "es-ES",
  newLabel = "Nuevo",
  updatedLabel = "Actualizado",
  className = "",
}: BadgesProps) {
  if (!ms || Number.isNaN(ms)) return null;

  const dateString = formatDateFromMs(ms, locale);
  const showNew = isNew(ms);
  const showUpdated = !showNew && isRecent(ms);

  if (!showNew && !showUpdated) return null;

  return (
    <span className={className}>
      {showNew && (
        <span className="inline-flex items-center px-2 py-1 text-[10px] font-medium bg-green-100 text-green-800 rounded">
          {newLabel}
        </span>
      )}
      {showUpdated && (
        <span className="inline-flex items-center px-2 py-1 text-[10px] font-medium bg-blue-100 text-blue-800 rounded">
          {updatedLabel}
        </span>
      )}
    </span>
  );
}
