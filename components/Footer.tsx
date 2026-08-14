import React from 'react';
import { AppContent } from '@/types';
import { MailIcon, LinkedinIcon } from './Icons';

interface FooterProps {
  data: AppContent;
  emailCopied: boolean;
  onCopyEmail: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, emailCopied, onCopyEmail }) => (
  <footer className="bg-warm-900 dark:bg-black text-warm-400 py-16">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h3 className="font-serif text-2xl font-bold text-warm-50 mb-2">{data.profile.name}</h3>
          <p className="max-w-md text-warm-400 text-sm leading-relaxed">{data.ui.footerTagline}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={onCopyEmail}
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-warm-800 hover:bg-warm-700 border border-warm-700 hover:border-warm-600 transition-colors"
              aria-label={`Copy email: ${data.profile.email}`}
            >
              <MailIcon />
            </button>
            {/* Always mounted so screen readers reliably announce the text swap */}
            <span
              role="status"
              aria-live="polite"
              className={`absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-accent-700 text-white text-xs font-medium rounded whitespace-nowrap ${emailCopied ? '' : 'invisible'}`}
            >
              {emailCopied ? data.ui.emailCopiedLabel : ''}
            </span>
          </div>
          <a
            href={data.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-warm-800 hover:bg-warm-700 border border-warm-700 hover:border-warm-600 transition-colors"
          >
            <LinkedinIcon />
          </a>
        </div>
      </div>
      <div className="border-t border-warm-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-xs text-warm-400">
          &copy; {new Date().getFullYear()} {data.profile.name}. {data.ui.copyright}
        </p>
        <p className="text-xs text-warm-400">
          {data.ui.builtWith}
        </p>
      </div>
    </div>
  </footer>
);
