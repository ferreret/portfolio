import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '@/types';
import { cvContent } from '@/data/cv';
import { ArrowLeftIcon, DownloadIcon, MailIcon, LinkedinIcon, GitHubIcon } from './Icons';
import { usePageMeta } from '@/hooks/usePageMeta';

interface CVViewProps {
  language: 'en' | 'es';
  data: AppContent;
}

const PORTFOLIO_URL = 'portfolio.nicolasbarcelo.dev';

export const CVView: React.FC<CVViewProps> = ({ language, data }) => {
  usePageMeta('CV');
  const cv = cvContent[language];
  const { profile } = data;

  const handlePrint = () => window.print();

  return (
    <div className="cv-screen bg-warm-100 dark:bg-warm-950 min-h-screen py-8 px-4 print:bg-white print:p-0 print:min-h-0">
      {/* Toolbar — hidden on print */}
      <div className="cv-toolbar max-w-[210mm] mx-auto mb-6 flex items-center justify-between print:hidden">
        <Link
          to="/"
          viewTransition
          className="inline-flex items-center gap-2 text-sm text-warm-600 dark:text-warm-300 hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
        >
          <ArrowLeftIcon />
          {language === 'es' ? 'Volver al portfolio' : 'Back to portfolio'}
        </Link>
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 text-sm font-medium rounded-lg hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors"
        >
          <DownloadIcon />
          {language === 'es' ? 'Imprimir / Guardar como PDF' : 'Print / Save as PDF'}
        </button>
      </div>

      <article
        className="cv-document bg-white text-warm-900 max-w-[210mm] mx-auto px-[15mm] py-[14mm] shadow-xl shadow-warm-900/10 print:shadow-none print:mx-0 print:max-w-none print:px-[14mm] print:py-[12mm]"
        lang={language}
      >
        {/* Header */}
        <header className="pb-4 mb-5 border-b border-warm-300">
          <h1 className="font-serif text-[28pt] font-bold leading-none tracking-tight text-warm-900">
            {profile.name}
          </h1>
          <p className="font-serif italic text-accent-700 text-[12pt] mt-1">
            {profile.title}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[9.5pt] text-warm-600 tabular-nums">
            <span>{profile.location}</span>
            <span aria-hidden="true" className="text-warm-300">·</span>
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-1 hover:text-accent-700">
              <MailIcon />{profile.email}
            </a>
            <span aria-hidden="true" className="text-warm-300">·</span>
            <a href={profile.linkedin} className="inline-flex items-center gap-1 hover:text-accent-700">
              <LinkedinIcon />linkedin.com/in/ferreret
            </a>
            <span aria-hidden="true" className="text-warm-300">·</span>
            <a href={profile.github} className="inline-flex items-center gap-1 hover:text-accent-700">
              <GitHubIcon className="w-4 h-4" />github.com/ferreret
            </a>
            <span aria-hidden="true" className="text-warm-300">·</span>
            <a href={`https://${PORTFOLIO_URL}`} className="hover:text-accent-700">
              {PORTFOLIO_URL}
            </a>
          </div>
        </header>

        {/* Summary */}
        <section className="cv-section">
          <div className="cv-summary text-[10.5pt] leading-[1.5] text-warm-700 space-y-1.5">
            {cv.summary.map((p, i) => (
              <p key={i} className="italic">
                {p}
              </p>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="cv-section mt-5">
          <h2 className="cv-heading">{cv.labels.experience}</h2>
          <div className="space-y-4">
            {cv.experience.map((exp, idx) => (
              <div key={idx} className="cv-job break-inside-avoid">
                <div className="flex items-start justify-between gap-3 mb-0.5">
                  <div>
                    <h3 className="font-semibold text-[11pt] text-warm-900">{exp.company}</h3>
                    <div className="text-[10pt] text-warm-600 italic">{exp.role}</div>
                  </div>
                  <div className="text-right text-[9.5pt] text-warm-500 tabular-nums whitespace-nowrap pt-0.5">
                    <div className="font-medium text-warm-700">{exp.location}</div>
                    <div>{exp.period}</div>
                  </div>
                </div>
                <div className="mt-1.5 space-y-1.5">
                  {exp.sections.map((section, sIdx) => (
                    <div key={sIdx}>
                      {section.title && (
                        <div className="text-[10pt] font-semibold text-accent-700 mt-1.5 mb-0.5">
                          {section.title}
                        </div>
                      )}
                      <ul className="cv-bullets space-y-0.5 text-[10pt] text-warm-700 leading-snug">
                        {section.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex gap-2">
                            <span className="text-accent-600 mt-[0.35em] shrink-0" aria-hidden="true">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education + Certifications side by side */}
        <div className="mt-5 grid grid-cols-2 gap-6">
          <section className="cv-section break-inside-avoid">
            <h2 className="cv-heading">{cv.labels.education}</h2>
            <div className="space-y-2">
              {profile.education.map((edu, i) => (
                <div key={i}>
                  <div className="font-semibold text-[10.5pt] text-warm-900">{edu.institution}</div>
                  <div className="text-[10pt] text-warm-600 italic">{edu.degree}</div>
                  <div className="text-[9pt] text-warm-500 tabular-nums">{edu.period}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="cv-section break-inside-avoid">
            <h2 className="cv-heading">{cv.labels.certifications}</h2>
            <ul className="space-y-0.5 text-[10pt] text-warm-700 leading-snug">
              {profile.certifications.map((cert, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-accent-600 mt-[0.35em] shrink-0" aria-hidden="true">•</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Skills */}
        <section className="cv-section mt-5 break-inside-avoid">
          <h2 className="cv-heading">{cv.labels.skills}</h2>
          <div className="space-y-1 text-[10pt] text-warm-700 leading-snug">
            {cv.skills.map((group, i) => (
              <div key={i}>
                <span className="font-semibold text-warm-900">{group.category}: </span>
                <span>{group.items}</span>
              </div>
            ))}
            <div>
              <span className="font-semibold text-warm-900">{cv.labels.languages}: </span>
              <span>{cv.languages}</span>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
};
