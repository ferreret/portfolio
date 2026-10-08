import React from 'react';
import { LocaleLink as Link } from './ui/LocaleLink';
import { AppContent } from '@/types';
import { useFadeInOnScroll } from '@/hooks/useFadeInOnScroll';
import { usePageMeta } from '@/hooks/usePageMeta';
import { ArrowRightIcon, DownloadIcon } from './Icons';
import { AnimatedNumber } from './AnimatedNumber';
import { HeroPortrait } from './HeroPortrait';
import { ProjectCard } from './ProjectCard';
import { PostCard } from './PostCard';
import { OpenSourceSection } from './OpenSourceSection';
import { ClosingCta } from './ClosingCta';
import { CardGrid } from './ui/CardGrid';
import { SectionHeading } from './ui/SectionHeading';
import { buttonClass } from './ui/button';

interface HomeViewProps {
  data: AppContent;
  language: 'en' | 'es';
}

// Section backgrounds alternate page → white → page … so no two neighbours match.
const PAGE_BG = 'py-20 transition-colors duration-300';
const WHITE_BG = 'py-20 bg-white dark:bg-warm-900 transition-colors duration-300';

export const HomeView: React.FC<HomeViewProps> = ({ data, language }) => {
  usePageMeta(undefined, data.ui.metaDescription);
  const revealProjects = useFadeInOnScroll();
  const revealAbout = useFadeInOnScroll();
  const revealPosts = useFadeInOnScroll();
  const revealExperience = useFadeInOnScroll();
  const revealSkills = useFadeInOnScroll();
  const revealEducation = useFadeInOnScroll();
  const revealClosing = useFadeInOnScroll();

  const cvHref = `/cv-${language}.pdf`;
  const featuredProjects = data.projects.slice(0, 3);
  const latestPosts = data.blog.slice(0, 3);

  return (
    <div>
      {/* Hero: the og-image made page. Follows the theme — its night palette in dark,
          the page surface in light. mt-16 keeps it clear of the fixed header. */}
      <section className="mt-16 py-16 md:py-28 dark:bg-night-950 overflow-hidden transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-12 xl:gap-16">
            <div className="lg:flex-1 space-y-6">
              <p className="text-sm font-semibold tracking-wide uppercase text-warm-500 dark:text-cream-400">
                {data.profile.name} <span aria-hidden="true">·</span> {data.profile.location}
              </p>

              <h1 className="font-serif serif-hero text-[clamp(2.6rem,5.4vw,4.8rem)] font-semibold leading-[1.06] text-warm-900 dark:text-cream-100">
                {data.ui.heroTitlePrefix}
                <span className="text-accent-600 dark:text-gold-400">{data.ui.heroTitleHighlight}</span>
                {data.ui.heroTitleSuffix}
              </h1>

              <p className="text-lg md:text-xl text-warm-500 dark:text-cream-400 leading-relaxed max-w-xl">
                {data.profile.title}
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/projects" viewTransition className={`group ${buttonClass('primary', 'md', 'hero')}`}>
                  {data.ui.viewProjects}
                  <ArrowRightIcon />
                </Link>
                <a href={cvHref} download className={buttonClass('secondary', 'md', 'hero')}>
                  <DownloadIcon /> {data.ui.downloadCv}
                </a>
                <Link to="/contact" viewTransition className={buttonClass('secondary', 'md', 'hero')}>
                  {data.ui.contact}
                </Link>
              </div>

              <div className="inline-flex items-center gap-2 text-sm text-accent-700 dark:text-gold-400 font-medium">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="animate-soft-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 dark:bg-gold-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-600 dark:bg-gold-400"></span>
                </span>
                {data.ui.available}
              </div>
            </div>

            <div className="w-full lg:w-[26rem] xl:w-[30rem] lg:shrink-0 flex justify-center">
              <HeroPortrait name={data.profile.name} />
            </div>
          </div>
        </div>
      </section>

      {/* Selected projects */}
      <section {...revealProjects(WHITE_BG)}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading title={data.ui.featuredProjectsTitle} subtitle={data.ui.featuredProjectsSubtitle} />
          <CardGrid count={featuredProjects.length}>
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} ui={data.ui} />
            ))}
          </CardGrid>
          <div className="text-center mt-12">
            <Link to="/projects" viewTransition className={buttonClass('secondary')}>
              {data.ui.viewProjects} <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* About and key figures */}
      <section {...revealAbout(PAGE_BG)}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-warm-900 dark:text-warm-50 mb-6 text-center">{data.ui.experienceTitle}</h2>
            <p className="drop-cap text-warm-600 dark:text-warm-400 text-lg leading-relaxed">
              {data.profile.summary}
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {data.heroStats.map((stat, index) => (
              <div key={index} className="text-center p-5 rounded-xl bg-white dark:bg-warm-900 border border-warm-200 dark:border-warm-800">
                <div className="text-4xl font-serif font-semibold text-accent-600 dark:text-accent-400 mb-1">
                  <AnimatedNumber value={stat.value} />
                </div>
                <div className="text-sm text-warm-500 dark:text-warm-400 uppercase tracking-wider font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest articles */}
      {latestPosts.length > 0 && (
        <section {...revealPosts(WHITE_BG)}>
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <SectionHeading title={data.ui.latestPostsTitle} subtitle={data.ui.blogSubtitle} />
            <CardGrid count={latestPosts.length}>
              {latestPosts.map(post => (
                <PostCard key={post.id} post={post} ui={data.ui} />
              ))}
            </CardGrid>
            <div className="text-center mt-12">
              <Link to="/blog" viewTransition className={buttonClass('secondary')}>
                {data.ui.viewAllPosts} <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Experience */}
      <section {...revealExperience(PAGE_BG)}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading title={data.ui.journeyTitle} />

          <div>
            {data.experience.map((job, idx) => (
              <div key={idx} className="relative pl-8 pb-10 last:pb-0 group">
                {idx < data.experience.length - 1 && (
                  <div className="absolute left-[7px] top-3 bottom-0 w-px bg-warm-200 dark:bg-warm-700" aria-hidden="true" />
                )}
                <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-[3px] border-accent-500 bg-warm-50 dark:bg-warm-950 group-hover:bg-accent-500 transition-colors" aria-hidden="true" />

                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <span className="text-sm font-semibold text-accent-700 dark:text-accent-400 tabular-nums">{job.period}</span>
                  <span className="text-sm text-warm-500 dark:text-warm-400">{job.location}</span>
                </div>
                <h3 className="text-xl font-bold text-warm-900 dark:text-warm-50">
                  {job.role} <span className="font-medium text-warm-500 dark:text-warm-400">· {job.company}</span>
                </h3>
                <ul className="mt-3 space-y-1.5">
                  {job.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-warm-600 dark:text-warm-400 text-sm leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-warm-400 dark:bg-warm-600 mt-2 flex-shrink-0" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a href={cvHref} download className={buttonClass('secondary')}>
              <DownloadIcon /> {data.ui.downloadCv}
            </a>
          </div>
        </div>
      </section>

      {/* Core technologies: one row per category instead of half-empty equal-height cards */}
      <section {...revealSkills(WHITE_BG)}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading title={data.ui.coreTechTitle} subtitle={data.ui.skillsSubtitle} />
          <dl className="divide-y divide-warm-200 dark:divide-warm-800 border-y border-warm-200 dark:border-warm-800">
            {data.skillCategories.map(cat => (
              <div key={cat.category} className="grid md:grid-cols-[13rem_1fr] gap-3 md:gap-6 py-5">
                <dt className="text-sm font-semibold text-warm-900 dark:text-warm-50 uppercase tracking-wider md:pt-1">{cat.category}</dt>
                <dd className="flex flex-wrap content-start items-start gap-1.5">
                  {cat.skills.map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-warm-50 dark:bg-warm-800 text-warm-700 dark:text-warm-200 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Open source: activity + GitHub */}
      <OpenSourceSection data={data} language={language} className={PAGE_BG} />

      {/* Education & Certifications */}
      <section {...revealEducation(WHITE_BG)}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-warm-900 dark:text-warm-50 mb-8">{data.ui.educationTitle}</h2>
              <div className="space-y-5">
                {data.profile.education.map((edu, i) => (
                  <div key={i} className="p-5 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-colors">
                    <div className="font-semibold text-warm-900 dark:text-warm-50">{edu.degree}</div>
                    <div className="text-warm-600 dark:text-warm-400 text-sm mt-1">{edu.institution}</div>
                    <div className="text-warm-500 dark:text-warm-400 text-xs mt-1 tabular-nums">{edu.period}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold text-warm-900 dark:text-warm-50 mb-8">{data.ui.certificationsTitle}</h2>
              <div className="space-y-3">
                {data.profile.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-warm-50 dark:bg-warm-800 border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-colors">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-accent-100 dark:bg-accent-600/20 flex items-center justify-center" aria-hidden="true">
                      <svg className="w-3.5 h-3.5 text-accent-700 dark:text-accent-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-warm-700 dark:text-warm-300 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing call to action */}
      <section {...revealClosing(PAGE_BG)}>
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ClosingCta ui={data.ui} />
        </div>
      </section>
    </div>
  );
};
