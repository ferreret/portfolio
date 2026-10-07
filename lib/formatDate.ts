// Month abbreviations are spelled out here rather than taken from Intl: pages
// are prerendered in Node and hydrated in the browser, and the two can ship
// different locale data ("Sep" vs "Sept"), which would break hydration.
const MONTHS: Record<string, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
  es: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'],
};

// Post dates are stored per language as written (YYYY-MM-DD in EN, DD-MM-YYYY in ES).
// Returns the ISO date for <time dateTime> and a localized label ("14 Aug 2026",
// "14 ago 2026"), or the raw string if it matches neither format.
export function formatPostDate(raw: string, locale: string): { iso?: string; label: string } {
  const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const dmy = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  const parts = ymd ? [ymd[1], ymd[2], ymd[3]] : dmy ? [dmy[3], dmy[2], dmy[1]] : null;
  if (!parts) return { label: raw };
  const [y, m, d] = parts;
  const months = MONTHS[locale.slice(0, 2)] ?? MONTHS.en;
  const month = months[Number(m) - 1];
  if (!month) return { label: raw };
  return { iso: `${y}-${m}-${d}`, label: `${Number(d)} ${month} ${y}` };
}
