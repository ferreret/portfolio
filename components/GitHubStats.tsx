import React from 'react';
import { useActivityFeed } from '@/hooks/useActivityFeed';
import { AppContent, ContributionCalendar } from '@/types';

// Both cards are drawn from activity.json, precomputed by the activity workflow:
// the visitor's browser never hits api.github.com (rate limit: 60 req/h/IP) nor
// a third-party chart service, and the colours follow the site's theme.

interface GitHubStatsProps {
  ui: AppContent['ui'];
}

// Heatmap geometry, in SVG units.
const CELL = 11;
const STEP = 14;
const LEFT = 34;
const TOP = 24;

// Contribution level 0-4 → accent scale; reversed in dark so "more" is always the brightest.
const LEVEL_FILL = [
  'fill-warm-200 dark:fill-warm-800',
  'fill-accent-200 dark:fill-accent-900',
  'fill-accent-400 dark:fill-accent-700',
  'fill-accent-600 dark:fill-accent-500',
  'fill-accent-800 dark:fill-accent-200',
];
const LEVEL_BG = [
  'bg-warm-200 dark:bg-warm-800',
  'bg-accent-200 dark:bg-accent-900',
  'bg-accent-400 dark:bg-accent-700',
  'bg-accent-600 dark:bg-accent-500',
  'bg-accent-800 dark:bg-accent-200',
];

const LABEL_CLASS = 'fill-warm-500 dark:fill-warm-400 text-[10px]';
const LABELLED_WEEKDAYS = [1, 3, 5]; // Mon, Wed, Fri

const weekStart = (calendar: ContributionCalendar, week: number) => {
  const date = new Date(`${calendar.from}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + week * 7);
  return date;
};

// A month is labelled on the first week that starts in it. The opening week is
// skipped when the next month begins right after it, so two labels never collide,
// and so is a month that begins in the last two weeks, where its label would not fit.
const monthLabels = (calendar: ContributionCalendar, locale: string) => {
  const format = new Intl.DateTimeFormat(locale, { month: 'short', timeZone: 'UTC' });
  const labels: { week: number; text: string }[] = [];
  let previousMonth = -1;
  calendar.weeks.forEach((_, week) => {
    const date = weekStart(calendar, week);
    const month = date.getUTCMonth();
    if (month !== previousMonth && week < calendar.weeks.length - 2) labels.push({ week, text: format.format(date) });
    previousMonth = month;
  });
  if (labels.length > 1 && labels[1].week - labels[0].week < 3) labels.shift();
  return labels;
};

const weekdayLabel = (weekday: number, locale: string) =>
  // 2023-01-01 was a Sunday.
  new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' }).format(new Date(Date.UTC(2023, 0, 1 + weekday)));

const PANEL = 'p-6 rounded-xl bg-white dark:bg-warm-900 border border-warm-200 dark:border-warm-800';

export const GitHubContributionChart: React.FC<GitHubStatsProps> = ({ ui }) => {
  const { feed, status } = useActivityFeed();
  const calendar = feed?.contributions?.weeks?.length ? feed.contributions : null;

  // Hold the space while the feed loads; drop the card if there is nothing to draw.
  if (status === 'loading') return <div className={`${PANEL} h-[10.5rem]`} aria-hidden="true" />;
  if (!calendar) return null;

  const width = LEFT + calendar.weeks.length * STEP;
  const height = TOP + 7 * STEP;

  return (
    <div className={PANEL}>
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={ui.githubGraphAlt} className="block w-full h-auto">
        {monthLabels(calendar, ui.locale).map(label => (
          <text key={label.week} x={LEFT + label.week * STEP} y={10} className={LABEL_CLASS}>{label.text}</text>
        ))}
        {LABELLED_WEEKDAYS.map(weekday => (
          <text key={weekday} x={0} y={TOP + weekday * STEP + 9} className={LABEL_CLASS}>{weekdayLabel(weekday, ui.locale)}</text>
        ))}
        {calendar.weeks.map((week, w) =>
          week.split('').map((level, d) =>
            level === '-' ? null : (
              <rect
                key={`${w}-${d}`}
                x={LEFT + w * STEP}
                y={TOP + d * STEP}
                width={CELL}
                height={CELL}
                rx={2}
                className={LEVEL_FILL[Number(level)] ?? LEVEL_FILL[0]}
              />
            ),
          ),
        )}
      </svg>
      <div className="flex items-center justify-end gap-1 mt-3 text-[11px] text-warm-500 dark:text-warm-400" aria-hidden="true">
        <span className="mr-1">{ui.githubLess}</span>
        {LEVEL_BG.map(bg => (
          <span key={bg} className={`w-[11px] h-[11px] rounded-sm ${bg}`} />
        ))}
        <span className="ml-1">{ui.githubMore}</span>
      </div>
    </div>
  );
};

// Languages are ranked, so they take a sequential ramp of the accent (darkest =
// most used; reversed in dark) and neutrals for the tail, not GitHub's own colours.
const RANK_BG = [
  'bg-accent-900 dark:bg-accent-200',
  'bg-accent-700 dark:bg-accent-500',
  'bg-accent-500 dark:bg-accent-700',
  'bg-accent-300 dark:bg-accent-900',
  'bg-warm-400 dark:bg-warm-500',
  'bg-warm-300 dark:bg-warm-600',
];
const rankBg = (rank: number) => RANK_BG[Math.min(rank, RANK_BG.length - 1)];

export const GitHubLanguages: React.FC<GitHubStatsProps> = ({ ui }) => {
  const { feed } = useActivityFeed();
  const languages = feed?.languages?.length ? feed.languages : null;
  if (!languages) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-warm-900 dark:text-warm-50 uppercase tracking-wider mb-5">{ui.githubLanguagesTitle}</h3>
      <div className={PANEL}>
        <div className="h-3 rounded-full overflow-hidden flex mb-4">
          {languages.map((l, rank) => (
            <div key={l.name} className={rankBg(rank)} style={{ width: `${l.pct}%` }} title={`${l.name} ${l.pct}%`} />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {languages.map((l, rank) => (
            <div key={l.name} className="flex items-center gap-1.5 text-xs text-warm-600 dark:text-warm-300">
              <span className={`w-2.5 h-2.5 rounded-full ${rankBg(rank)}`} />
              {l.name} <span className="text-warm-500 dark:text-warm-400">{l.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
