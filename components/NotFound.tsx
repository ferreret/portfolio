import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '@/types';
import { usePageMeta } from '@/hooks/usePageMeta';

interface NotFoundProps {
  data: AppContent;
}

export const NotFound: React.FC<NotFoundProps> = ({ data }) => {
  usePageMeta(data.ui.notFoundTitle, data.ui.notFoundDescription);
  return (
    <div className="pt-24 pb-20 animate-fade-in min-h-screen bg-white dark:bg-warm-900 transition-colors duration-300 flex items-center">
      <div className="max-w-2xl mx-auto px-6 lg:px-8 text-center">
        <div className="font-serif text-7xl md:text-9xl font-bold text-accent-600 dark:text-accent-400 mb-6 tabular-nums">
          404
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-4 leading-tight">
          {data.ui.notFoundTitle}
        </h1>
        <p className="text-lg text-warm-500 dark:text-warm-400 leading-relaxed mb-10">
          {data.ui.notFoundDescription}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-600 hover:bg-accent-700 dark:bg-accent-500 dark:hover:bg-accent-400 text-white font-medium transition-colors"
        >
          {data.ui.notFoundCta}
        </Link>
      </div>
    </div>
  );
};
