import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent, ProjectItem } from '@/types';
import { getProjectLinks } from '@/lib/projectLinks';
import { CardTags } from './ui/TagFilter';

interface ProjectCardProps {
  project: ProjectItem;
  ui: AppContent['ui'];
  headingLevel?: 'h2' | 'h3';
  /** Set by listings so the detail page's Back link can return in history. */
  fromList?: boolean;
  selectedTag?: string | null;
  onTagClick?: (tag: string) => void;
}

const badgeClass =
  'text-[11px] font-semibold uppercase tracking-wider px-2 py-1 rounded bg-accent-50 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300';

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, ui, headingLevel: Heading = 'h3', fromList, selectedTag, onTagClick }) => {
  const { demoUrl, repoUrl } = getProjectLinks(project);
  return (
    <article className="group relative bg-warm-50 dark:bg-warm-800 rounded-xl overflow-hidden border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-300 hover:shadow-lg flex flex-col">
      <div className="aspect-[16/9] overflow-hidden bg-warm-100 dark:bg-warm-700">
        <img src={project.imageUrl} alt="" loading="lazy" className="w-full h-full object-cover motion-safe:group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        {(demoUrl || repoUrl) && (
          <div className="flex gap-2 mb-3">
            {demoUrl && <span className={badgeClass}>{ui.caseStudy.liveDemo}</span>}
            {repoUrl && <span className={badgeClass}>{ui.codeBadge}</span>}
          </div>
        )}
        <Heading className="font-serif text-xl font-semibold text-warm-900 dark:text-warm-50 mb-2 leading-snug group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">
          <Link
            to={`/projects/${project.id}`}
            viewTransition
            state={fromList ? { fromList: true } : undefined}
            className="focus:outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-accent-500"
          >
            {project.title}
          </Link>
        </Heading>
        <p className="text-warm-600 dark:text-warm-400 mb-5 flex-1 line-clamp-3 text-sm leading-relaxed">{project.description}</p>
        <CardTags tags={project.tags} selectedTag={selectedTag} onTagClick={onTagClick} className="mt-auto" />
      </div>
    </article>
  );
};
