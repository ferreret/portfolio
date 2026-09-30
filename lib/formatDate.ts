// Post dates are stored per language as written (YYYY-MM-DD in EN, DD-MM-YYYY in ES).
// Returns the ISO date for <time dateTime> and a localized label, or the raw string
// if it matches neither format.
export function formatPostDate(raw: string, locale: string): { iso?: string; label: string } {
  const ymd = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const dmy = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  const parts = ymd ? [ymd[1], ymd[2], ymd[3]] : dmy ? [dmy[3], dmy[2], dmy[1]] : null;
  if (!parts) return { label: raw };
  const [y, m, d] = parts;
  const iso = `${y}-${m}-${d}`;
  const label = new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${iso}T00:00:00Z`));
  return { iso, label };
}
