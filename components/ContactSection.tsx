import React, { useEffect, useRef } from 'react';
import { AppContent } from '@/types';
import { MailIcon, LinkedinIcon, GitHubIcon, XIcon, ArrowRightIcon } from './Icons';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface ContactSectionProps {
  data: AppContent;
}

interface Channel {
  title: string;
  description: string;
  cta: string;
  href: string;
  icon: React.ReactNode;
  external: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  usePageMeta(data.ui.contactTitle, data.ui.contactSubtitle);
  const { profile, ui } = data;
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(ui.contactEmailSubject)}`;
  const { state: copyState, copy } = useCopyToClipboard();
  const emailRef = useRef<HTMLParagraphElement>(null);

  // Clipboard unavailable: select the address so it can be copied by hand.
  useEffect(() => {
    if (copyState !== 'failed' || !emailRef.current) return;
    const range = document.createRange();
    range.selectNodeContents(emailRef.current);
    window.getSelection()?.removeAllRanges();
    window.getSelection()?.addRange(range);
  }, [copyState]);

  const channels: Channel[] = [
    {
      title: ui.contactLinkedinTitle,
      description: ui.contactLinkedinDesc,
      cta: ui.contactLinkedinCta,
      href: profile.linkedin,
      icon: <LinkedinIcon />,
      external: true,
    },
    {
      title: ui.contactGithubTitle,
      description: ui.contactGithubDesc,
      cta: ui.contactGithubCta,
      href: profile.github,
      icon: <GitHubIcon className="w-4 h-4" />,
      external: true,
    },
    {
      title: ui.contactXTitle,
      description: ui.contactXDesc,
      cta: ui.contactXCta,
      href: profile.x,
      icon: <XIcon />,
      external: true,
    },
  ];

  return (
    <section className="pt-32 pb-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14 animate-fade-in-up">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-5 tracking-tight">
            {ui.contactTitle}
          </h1>
          <p className="text-lg text-warm-600 dark:text-warm-300 max-w-2xl mx-auto leading-relaxed">
            {ui.contactSubtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {/* Email: visible and copyable too, since mailto: does nothing without a mail client */}
          <div className="flex flex-col p-6 rounded-xl border bg-warm-900 dark:bg-warm-100 border-warm-900 dark:border-warm-100 animate-fade-in-up">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-white/10 text-white dark:bg-warm-900/10 dark:text-warm-900">
              <MailIcon />
            </div>
            <h2 className="font-serif text-xl font-bold mb-2 text-white dark:text-warm-900">{ui.contactEmailTitle}</h2>
            <p className="text-sm leading-relaxed mb-4 text-warm-200 dark:text-warm-700">{ui.contactEmailDesc}</p>
            <p ref={emailRef} className="text-sm font-medium mb-5 flex-1 text-white dark:text-warm-900 select-all break-all">{profile.email}</p>
            {/* -mb-3 offsets the 44px touch targets so the CTA lines up with the other cards */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 -mb-3">
              <a
                href={mailto}
                className="group inline-flex items-center gap-2 min-h-11 text-sm font-medium text-white dark:text-warm-900 hover:underline"
              >
                {ui.contactEmailCta}
                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </a>
              <button
                onClick={() => copy(profile.email)}
                className="inline-flex items-center min-h-11 px-3 -mx-3 rounded-md text-sm font-medium text-warm-200 dark:text-warm-700 hover:text-white dark:hover:text-warm-900 transition-colors"
              >
                {ui.contactEmailCopy}
              </button>
              <span role="status" aria-live="polite" className="text-sm text-accent-300 dark:text-accent-800">
                {copyState === 'copied' ? ui.emailCopiedLabel : ''}
              </span>
            </div>
          </div>

          {channels.map((channel, i) => (
            <a
              key={channel.title}
              href={channel.href}
              target={channel.external ? '_blank' : undefined}
              rel={channel.external ? 'noreferrer' : undefined}
              className="group flex flex-col p-6 rounded-xl border transition-colors animate-fade-in-up bg-white dark:bg-warm-900/50 border-warm-200 dark:border-warm-800 hover:border-accent-400 dark:hover:border-accent-600"
              style={{ animationDelay: `${(i + 1) * 80}ms` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-200">
                {channel.icon}
              </div>
              <h2 className="font-serif text-xl font-bold mb-2 text-warm-900 dark:text-warm-50">
                {channel.title}
              </h2>
              <p className="text-sm leading-relaxed mb-5 flex-1 text-warm-600 dark:text-warm-400">
                {channel.description}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-700 dark:text-accent-400">
                {channel.cta}
                <span className="transition-transform group-hover:translate-x-1">
                  <ArrowRightIcon />
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
