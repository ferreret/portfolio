import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '@/types';
import { CopyState } from '@/hooks/useCopyToClipboard';
import { MailIcon, LinkedinIcon, XIcon, GitHubIcon } from './Icons';

interface FooterProps {
  data: AppContent;
  emailCopyState: CopyState;
  onCopyEmail: () => void;
}

export const Footer: React.FC<FooterProps> = ({ data, emailCopyState, onCopyEmail }) => (
  <footer className="bg-warm-900 dark:bg-black text-warm-400 py-16">
    <div className="max-w-6xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        <div>
          <p className="font-serif text-2xl font-bold text-warm-50 mb-2">{data.profile.name}</p>
          <p className="max-w-md text-warm-400 text-sm leading-relaxed">{data.ui.footerTagline}</p>
          <nav aria-label={data.ui.ariaFooterNav} className="mt-5 flex flex-wrap gap-x-5 gap-y-1 -ml-1">
            {[
              { to: '/', label: data.ui.home },
              { to: '/projects', label: data.ui.projects },
              { to: '/blog', label: data.ui.blog },
              { to: '/contact', label: data.ui.contact },
            ].map(link => (
              <Link key={link.to} to={link.to} viewTransition className="inline-flex items-center min-h-11 px-1 text-sm text-warm-300 hover:text-accent-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={onCopyEmail}
              className="w-11 h-11 flex items-center justify-center rounded-lg bg-warm-800 hover:bg-warm-700 border border-warm-700 hover:border-warm-600 transition-colors"
              aria-label={`${data.ui.ariaCopyEmail}: ${data.profile.email}`}
            >
              <MailIcon />
            </button>
            {/* Always mounted so screen readers reliably announce the text swap. If the
                clipboard is unavailable, show the address so it can be copied by hand. */}
            <span
              role="status"
              aria-live="polite"
              className={`absolute -top-9 left-0 md:left-1/2 md:-translate-x-1/2 px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap select-all ${
                emailCopyState === 'failed' ? 'bg-warm-50 text-warm-900' : 'bg-accent-700 text-white'
              } ${emailCopyState === 'idle' ? 'invisible' : ''}`}
            >
              {emailCopyState === 'copied' ? data.ui.emailCopiedLabel : emailCopyState === 'failed' ? data.profile.email : ''}
            </span>
          </div>
          <a
            href={data.profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={data.ui.ariaLinkedinProfile}
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-warm-800 hover:bg-warm-700 border border-warm-700 hover:border-warm-600 transition-colors"
          >
            <LinkedinIcon />
          </a>
          <a
            href={data.profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label={data.ui.ariaGithubProfile}
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-warm-800 hover:bg-warm-700 border border-warm-700 hover:border-warm-600 transition-colors"
          >
            <GitHubIcon className="w-4 h-4" />
          </a>
          <a
            href={data.profile.x}
            target="_blank"
            rel="noreferrer"
            aria-label={data.ui.ariaXProfile}
            className="w-11 h-11 flex items-center justify-center rounded-lg bg-warm-800 hover:bg-warm-700 border border-warm-700 hover:border-warm-600 transition-colors"
          >
            <XIcon />
          </a>
        </div>
      </div>
      <div className="border-t border-warm-800 mt-10 pt-8">
        <p className="text-xs text-warm-400">
          &copy; {new Date().getFullYear()} {data.profile.name}. {data.ui.copyright}
        </p>
      </div>
    </div>
  </footer>
);
