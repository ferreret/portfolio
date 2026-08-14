import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContent } from '@/types';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ArrowRightIcon, DownloadIcon } from './Icons';
import { GitHubStats } from './GitHubStats';
import { ActivityTicker } from './ActivityTicker';
import { AnimatedNumber } from './AnimatedNumber';

interface HomeViewProps {
  data: AppContent;
  language: 'en' | 'es';
}

export const HomeView: React.FC<HomeViewProps> = ({ data, language }) => {
  usePageMeta();
  const navigate = useNavigate();
  const aboutRef = useFadeInOnScroll();
  const skillsRef = useFadeInOnScroll();
  const experienceRef = useFadeInOnScroll();
  const educationRef = useFadeInOnScroll();
  const featuredRef = useFadeInOnScroll();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-6">
        <div className="max-w-6xl mx-auto lg:px-2">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-3/5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 text-xs font-semibold tracking-wide border border-accent-200 dark:border-accent-800/50">
                <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                  <span className="animate-soft-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent-600"></span>
                </span>
                {data.ui.available}
              </div>

              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-warm-900 dark:text-warm-50">
                {data.ui.heroTitlePrefix}
                <span className="text-accent-600 dark:text-accent-400">{data.ui.heroTitleHighlight}</span>
                {data.ui.heroTitleSuffix}
              </h1>

              <p className="text-lg md:text-xl text-warm-500 dark:text-warm-400 leading-relaxed max-w-xl">
                {data.profile.title}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => navigate('/projects', { viewTransition: true })}
                  className="group px-6 py-3 bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900 font-medium rounded-lg hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors flex items-center gap-2"
                >
                  {data.ui.viewProjects}
                  <ArrowRightIcon />
                </button>
                <a
                  href={`/cv-${language}.pdf`}
                  download
                  className="px-6 py-3 text-warm-700 dark:text-warm-200 border border-warm-300 dark:border-warm-700 font-medium rounded-lg hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors flex items-center gap-2"
                >
                  <DownloadIcon /> {data.ui.downloadCv}
                </a>
              </div>
            </div>

            <div className="lg:w-2/5 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-2 border-warm-200 dark:border-warm-700 shadow-2xl shadow-warm-900/10 dark:shadow-black/30">
                  <img
                    src="/profile.webp"
                    alt={data.profile.name}
                    width={640}
                    height={688}
                    fetchPriority="high"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-accent-200 dark:border-accent-800 -z-10" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About / Summary */}
      <section ref={aboutRef} data-reveal className="py-20 bg-white dark:bg-warm-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-6 text-center">{data.ui.experienceTitle}</h2>
            <p className="drop-cap text-warm-500 dark:text-warm-400 text-lg leading-relaxed">
              {data.profile.summary}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.heroStats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-100 dark:border-warm-700">
                <div className="text-4xl font-serif font-bold text-accent-600 dark:text-accent-400 mb-1">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-sm text-warm-500 dark:text-warm-400 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Technologies */}
      <section ref={skillsRef} data-reveal className="py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-3">{data.ui.coreTechTitle}</h2>
            <p className="text-warm-500 dark:text-warm-400">{data.ui.skillsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.skillCategories.map((cat, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-white dark:bg-warm-900 border border-warm-200 dark:border-warm-800 hover:border-accent-300 dark:hover:border-accent-700 transition-colors">
                <h4 className="text-sm font-semibold text-warm-900 dark:text-warm-50 uppercase tracking-wider mb-4">{cat.category}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-warm-50 dark:bg-warm-800 text-warm-600 dark:text-warm-300 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Currently building — GitHub activity ticker */}
      <ActivityTicker ui={data.ui} language={language} />

      {/* GitHub Stats */}
      <GitHubStats githubUrl={data.profile.github} />

      {/* Experience */}
      <section ref={experienceRef} data-reveal className="py-20 bg-white dark:bg-warm-900 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-3">{data.ui.journeyTitle}</h2>
          </div>

          <div className="space-y-0">
            {data.experience.map((job, idx) => (
              <div key={idx} className="relative pl-8 pb-12 last:pb-0 group">
                {idx < data.experience.length - 1 && (
                  <div className="absolute left-[7px] top-3 bottom-0 w-px bg-warm-200 dark:bg-warm-700" aria-hidden="true" />
                )}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] border-accent-500 bg-warm-50 dark:bg-warm-950 group-hover:bg-accent-500 transition-colors" aria-hidden="true" />

                <div>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                    <span className="text-sm font-semibold text-accent-600 dark:text-accent-400 tabular-nums">{job.period}</span>
                    <span className="text-sm text-warm-400 dark:text-warm-500">{job.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-warm-900 dark:text-warm-50 mb-0.5">{job.role}</h3>
                  <div className="text-warm-500 dark:text-warm-400 font-medium mb-4">{job.company}</div>
                  <ul className="space-y-2">
                    {job.highlights.map((point, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-warm-600 dark:text-warm-400 text-sm leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-warm-400 dark:bg-warm-600 mt-2 flex-shrink-0" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section ref={educationRef} data-reveal className="py-20 bg-warm-900 dark:bg-black text-warm-300 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h3 className="font-serif text-2xl font-bold text-warm-50 mb-8">{data.ui.educationTitle}</h3>
              <div className="space-y-5">
                {data.profile.education.map((edu, i) => (
                  <div key={i} className="p-5 rounded-xl bg-warm-800/60 border border-warm-700/50 hover:border-accent-600/40 transition-colors">
                    <div className="font-semibold text-warm-50">{edu.degree}</div>
                    <div className="text-warm-400 text-sm mt-1">{edu.institution}</div>
                    <div className="text-warm-500 text-xs mt-1 tabular-nums">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-warm-50 mb-8">{data.ui.certificationsTitle}</h3>
              <div className="space-y-3">
                {data.profile.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-warm-800/60 border border-warm-700/50 hover:border-accent-600/40 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-accent-600/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-3.5 h-3.5 text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-warm-300 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section ref={featuredRef} data-reveal className="py-20 bg-white dark:bg-warm-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-900 dark:text-warm-50 mb-3">{data.ui.featuredProjectsTitle}</h2>
            <p className="text-warm-500 dark:text-warm-400 max-w-2xl mx-auto">{data.ui.featuredProjectsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {data.projects.slice(0, 3).map(project => (
              <article key={project.id} className="group relative bg-warm-50 dark:bg-warm-800 rounded-xl overflow-hidden border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-300 hover:shadow-lg flex flex-col">
                <div className="h-48 overflow-hidden bg-warm-100 dark:bg-warm-700">
                  <img src={project.imageUrl} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-lg font-semibold text-warm-900 dark:text-warm-50 mb-2 group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">
                    <Link
                      to={`/projects/${project.id}`}
                      viewTransition
                      className="focus:outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-accent-500"
                    >
                      {project.title}
                    </Link>
                  </h3>
                  <p className="text-warm-500 dark:text-warm-400 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-warm-100 dark:bg-warm-700 text-warm-500 dark:text-warm-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/projects', { viewTransition: true })}
              className="px-6 py-3 bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900 font-medium rounded-lg hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors inline-flex items-center gap-2"
            >
              {data.ui.viewProjects} <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
