import React from 'react';
import { AppContent } from '@/types';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { ActivityTicker } from './ActivityTicker';
import { GitHubContributionChart, GitHubLanguages } from './GitHubStats';
import { GitHubIcon } from './Icons';

interface OpenSourceSectionProps {
  data: AppContent;
  language: 'en' | 'es';
  className: string;
}

// Recent commits, contribution graph and languages as one "Open source" section.
export const OpenSourceSection: React.FC<OpenSourceSectionProps> = ({ data, language, className }) => {
  const reveal = useFadeInOnScroll();
  const githubUrl = data.profile.github;
  const username = githubUrl.split('/').filter(Boolean).pop() ?? '';

  return (
    <section {...reveal(className)}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-3">{data.ui.openSourceTitle}</h2>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 min-h-11 text-sm font-medium text-accent-700 dark:text-accent-400 hover:underline"
          >
            <GitHubIcon className="w-4 h-4" />@{username}
          </a>
        </div>
        <div className="mb-10">
          <GitHubContributionChart username={username} ui={data.ui} />
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          <ActivityTicker ui={data.ui} language={language} />
          <GitHubLanguages ui={data.ui} />
        </div>
      </div>
    </section>
  );
};
