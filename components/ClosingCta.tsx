import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '@/types';
import { ArrowRightIcon } from './Icons';
import { buttonClass } from './ui/button';

interface ClosingCtaProps {
  ui: AppContent['ui'];
}

// "Let's talk" call to action that closes the home page and every detail page.
export const ClosingCta: React.FC<ClosingCtaProps> = ({ ui }) => (
  <div className="rounded-2xl border border-warm-200 dark:border-warm-800 bg-warm-50 dark:bg-warm-950/60 px-6 py-12 md:px-12 text-center">
    <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-4">{ui.contactTitle}</h2>
    <p className="text-warm-600 dark:text-warm-400 leading-relaxed max-w-2xl mx-auto mb-8">{ui.contactSubtitle}</p>
    <Link to="/contact" viewTransition className={buttonClass('primary')}>
      {ui.contact} <ArrowRightIcon />
    </Link>
  </div>
);
