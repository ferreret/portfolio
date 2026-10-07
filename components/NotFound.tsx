import React from 'react';
import { LocaleLink as Link } from './ui/LocaleLink';
import { AppContent } from '@/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { buttonClass } from './ui/button';

interface NotFoundProps {
  data: AppContent;
}

export const NotFound: React.FC<NotFoundProps> = ({ data }) => {
  usePageMeta(data.ui.notFoundTitle, data.ui.notFoundDescription, { noindex: true });
  return (
    <div className="pt-28 pb-20 min-h-screen bg-white dark:bg-warm-900 transition-colors duration-300 flex items-center">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="font-serif text-7xl md:text-9xl font-semibold text-accent-600 dark:text-accent-400 mb-6 tabular-nums">
          404
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-warm-900 dark:text-warm-50 mb-4 leading-tight">
          {data.ui.notFoundTitle}
        </h1>
        <p className="text-lg text-warm-500 dark:text-warm-400 leading-relaxed mb-10">
          {data.ui.notFoundDescription}
        </p>
        <Link
          to="/"
          className={buttonClass('primary')}
        >
          {data.ui.notFoundCta}
        </Link>
      </div>
    </div>
  );
};
