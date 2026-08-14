import React from 'react';
import { AppContent } from '@/types';
import { MailIcon, LinkedinIcon, GitHubIcon, ArrowRightIcon } from './Icons';
import { usePageMeta } from '@/hooks/usePageMeta';

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
  primary?: boolean;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ data }) => {
  usePageMeta(data.ui.contactTitle, data.ui.contactSubtitle);
  const { profile, ui } = data;
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(ui.contactEmailSubject)}`;

  const channels: Channel[] = [
    {
      title: ui.contactEmailTitle,
      description: ui.contactEmailDesc,
      cta: ui.contactEmailCta,
      href: mailto,
      icon: <MailIcon />,
      external: false,
      primary: true,
    },
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

        <div className="grid md:grid-cols-3 gap-5">
          {channels.map((channel, i) => (
            <a
              key={channel.title}
              href={channel.href}
              target={channel.external ? '_blank' : undefined}
              rel={channel.external ? 'noreferrer' : undefined}
              className={`group flex flex-col p-6 rounded-xl border transition-colors animate-fade-in-up ${
                channel.primary
                  ? 'bg-warm-900 dark:bg-warm-100 border-warm-900 dark:border-warm-100 hover:bg-warm-800 dark:hover:bg-warm-200'
                  : 'bg-white dark:bg-warm-900/50 border-warm-200 dark:border-warm-800 hover:border-accent-400 dark:hover:border-accent-600'
              }`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
                  channel.primary
                    ? 'bg-white/10 text-white dark:bg-warm-900/10 dark:text-warm-900'
                    : 'bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-200'
                }`}
              >
                {channel.icon}
              </div>
              <h2
                className={`font-serif text-xl font-bold mb-2 ${
                  channel.primary ? 'text-white dark:text-warm-900' : 'text-warm-900 dark:text-warm-50'
                }`}
              >
                {channel.title}
              </h2>
              <p
                className={`text-sm leading-relaxed mb-5 flex-1 ${
                  channel.primary ? 'text-warm-200 dark:text-warm-700' : 'text-warm-600 dark:text-warm-400'
                }`}
              >
                {channel.description}
              </p>
              <span
                className={`inline-flex items-center gap-2 text-sm font-medium ${
                  channel.primary ? 'text-white dark:text-warm-900' : 'text-accent-700 dark:text-accent-400'
                }`}
              >
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
