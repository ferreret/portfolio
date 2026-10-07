import React from 'react';
import { LocaleLink as Link } from './ui/LocaleLink';
import { AppContent } from '@/types';
import { ArrowRightIcon } from './Icons';
import { ClosingCta } from './ClosingCta';

export interface DetailLink {
  to: string;
  /** Small label above the title, e.g. "Next project". */
  eyebrow: string;
  title: string;
}

interface DetailFooterProps {
  ui: AppContent['ui'];
  links: DetailLink[];
}

// End of a project or post page: where to go next, then the contact CTA.
export const DetailFooter: React.FC<DetailFooterProps> = ({ ui, links }) => (
  <footer className="mt-16 pt-10 border-t border-warm-200 dark:border-warm-800 space-y-10">
    {links.length > 0 && (
      <div className={`grid gap-4 ${links.length > 1 ? 'sm:grid-cols-2' : ''}`}>
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            viewTransition
            className="group flex flex-col p-5 rounded-xl border border-warm-200 dark:border-warm-800 hover:border-accent-400 dark:hover:border-accent-600 transition-colors"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-accent-700 dark:text-accent-400 mb-2">{link.eyebrow}</span>
            <span className="flex items-start justify-between gap-3 font-serif text-lg font-semibold text-warm-900 dark:text-warm-50 leading-snug">
              {link.title}
              <span className="mt-1.5 flex-shrink-0 transition-transform group-hover:translate-x-1"><ArrowRightIcon /></span>
            </span>
          </Link>
        ))}
      </div>
    )}
    <ClosingCta ui={ui} />
  </footer>
);

/** The item after `id` in `items`, wrapping around; undefined when there is only one. */
export function nextItem<T extends { id: string }>(items: T[], id: string): T | undefined {
  if (items.length < 2) return undefined;
  const i = items.findIndex(item => item.id === id);
  return items[(i + 1) % items.length];
}
