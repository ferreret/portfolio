import React, { useEffect, useState } from 'react';
import { ActivityFeed, AppContent } from '@/types';
import { GitHubIcon } from './Icons';

interface ActivityTickerProps {
  ui: AppContent['ui'];
  language: 'en' | 'es';
}

function relativeTime(iso: string, locale: string): string {
  const now = Date.now();
  const then = new Date(iso).getTime();
  const diffMin = Math.round((then - now) / 60000);
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
  const abs = Math.abs(diffMin);
  if (abs < 60) return rtf.format(diffMin, 'minute');
  const diffHour = Math.round(diffMin / 60);
  if (Math.abs(diffHour) < 24) return rtf.format(diffHour, 'hour');
  const diffDay = Math.round(diffHour / 24);
  if (Math.abs(diffDay) < 30) return rtf.format(diffDay, 'day');
  const diffMonth = Math.round(diffDay / 30);
  return rtf.format(diffMonth, 'month');
}

export const ActivityTicker: React.FC<ActivityTickerProps> = ({ ui, language }) => {
  const [feed, setFeed] = useState<ActivityFeed | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/activity.json', { cache: 'no-cache' })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data: ActivityFeed) => {
        if (!cancelled) setFeed(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (failed || !feed || feed.items.length === 0) return null;

  return (
    <section className="py-20 transition-colors duration-300 animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-3">
            {ui.activityTitle}
          </h2>
          <p className="text-warm-500 dark:text-warm-400 max-w-2xl mx-auto">{ui.activitySubtitle}</p>
        </div>

        <ul className="grid md:grid-cols-2 gap-4">
          {feed.items.map((item) => (
            <li
              key={`${item.repo}-${item.latestAt}`}
              className="group p-5 rounded-xl bg-white dark:bg-warm-900 border border-warm-200 dark:border-warm-800 hover:border-accent-300 dark:hover:border-accent-700 transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-warm-100 dark:bg-warm-800 flex items-center justify-center text-warm-600 dark:text-warm-300">
                  <GitHubIcon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 mb-1">
                    <a
                      href={item.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-warm-900 dark:text-warm-50 hover:text-accent-700 dark:hover:text-accent-400 transition-colors text-sm truncate"
                    >
                      {item.repoShort}
                    </a>
                    <span className="text-xs text-warm-500 dark:text-warm-400">
                      {item.pushCount}{' '}
                      {item.pushCount === 1 ? ui.activityCommitSingular : ui.activityCommitPlural}
                      {' · '}
                      {relativeTime(item.latestAt, language)}
                    </span>
                  </div>
                  <a
                    href={item.latestCommitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={ui.activityViewCommit}
                    className="block text-sm text-warm-600 dark:text-warm-400 hover:text-accent-700 dark:hover:text-accent-400 transition-colors line-clamp-2"
                  >
                    {item.latestMessage}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
