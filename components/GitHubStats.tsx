import React, { useState, useEffect } from 'react';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { ActivityFeed, LanguageStat } from '@/types';
import { GitHubIcon } from './Icons';

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5', 'C#': '#178600', 'Jupyter Notebook': '#DA5B0B',
  TypeScript: '#3178C6', JavaScript: '#F1E05A', Dart: '#00B4AB',
  HTML: '#E34C26', Lua: '#000080', Shell: '#89E051', CSS: '#563D7C',
};

interface GitHubStatsProps {
  githubUrl: string;
}

export const GitHubStats: React.FC<GitHubStatsProps> = ({ githubUrl }) => {
  const githubRef = useFadeInOnScroll();
  const [languages, setLanguages] = useState<LanguageStat[] | null>(null);
  const username = githubUrl.split('/').filter(Boolean).pop() ?? '';

  // Language stats are precomputed by the activity workflow into activity.json —
  // the visitor's browser never hits api.github.com (rate limit: 60 req/h/IP).
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await fetch('/activity.json', { signal: controller.signal });
        if (!res.ok) throw new Error(`activity.json ${res.status}`);
        const feed: ActivityFeed = await res.json();
        if (feed.languages && feed.languages.length > 0) {
          setLanguages(feed.languages);
        }
      } catch { /* section renders without languages */ }
    };
    fetchData();
    return () => controller.abort();
  }, []);

  return (
    <section ref={githubRef} data-reveal className="py-20 bg-white dark:bg-warm-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-warm-900 dark:text-warm-50"><GitHubIcon /></span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50">GitHub</h2>
          </div>
          <a href={githubUrl} target="_blank" rel="noreferrer" className="text-sm text-accent-700 dark:text-accent-400 hover:underline">@{username}</a>
        </div>
        {/* Contribution graph */}
        <div className="mb-6 p-6 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-200 dark:border-warm-700">
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt={`GitHub contribution graph for ${username}`}
            loading="lazy"
            className="w-full h-auto"
          />
        </div>
        {/* Languages */}
        {languages && (
          <div className="p-6 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-200 dark:border-warm-700">
            <h3 className="text-sm font-semibold text-warm-900 dark:text-warm-50 uppercase tracking-wider mb-5">Top Languages</h3>
            <div className="h-3 rounded-full overflow-hidden flex mb-4">
              {languages.map(l => (
                <div key={l.name} style={{ width: `${l.pct}%`, backgroundColor: LANG_COLORS[l.name] || '#8b8680' }} title={`${l.name} ${l.pct}%`} />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {languages.map(l => (
                <div key={l.name} className="flex items-center gap-1.5 text-xs text-warm-600 dark:text-warm-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: LANG_COLORS[l.name] || '#8b8680' }} />
                  {l.name} <span className="text-warm-500 dark:text-warm-400">{l.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
