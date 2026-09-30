import React from 'react';
import { AppContent } from '@/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useTagFilter } from '@/hooks/useTagFilter';
import { ProjectCard } from './ProjectCard';
import { CardGrid } from './ui/CardGrid';
import { PageShell } from './ui/PageShell';
import { SectionHeading } from './ui/SectionHeading';
import { TagFilter, TAG_FILTER_MIN_ITEMS } from './ui/TagFilter';

interface ProjectsViewProps {
  data: AppContent;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ data }) => {
  usePageMeta(data.ui.projectsPageTitle, data.ui.featuredProjectsSubtitle);
  // Tags are localized; switching language clears the filter.
  const { selectedTag, setSelectedTag, toggleTag } = useTagFilter(data);

  // A ?tag= link keeps working even while the filter bar is hidden.
  const showFilter = data.projects.length >= TAG_FILTER_MIN_ITEMS || selectedTag !== null;
  const allTags = Array.from(new Set(data.projects.flatMap(p => p.tags))).sort();
  const filteredProjects = selectedTag
    ? data.projects.filter(p => p.tags.includes(selectedTag))
    : data.projects;

  return (
    <PageShell>
      <SectionHeading as="h1" title={data.ui.projectsPageTitle} subtitle={data.ui.featuredProjectsSubtitle} />

      {showFilter && (
        <TagFilter tags={allTags} selectedTag={selectedTag} allLabel={data.ui.allTags} onSelect={setSelectedTag} />
      )}

      {filteredProjects.length > 0 ? (
        <CardGrid count={filteredProjects.length}>
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              ui={data.ui}
              headingLevel="h2"
              fromList
              selectedTag={selectedTag}
              onTagClick={showFilter ? toggleTag : undefined}
            />
          ))}
        </CardGrid>
      ) : (
        <div className="text-center py-16">
          <p className="text-warm-500 dark:text-warm-400 mb-4">
            {data.ui.noProjectsFound} <strong className="text-accent-700 dark:text-accent-400">{selectedTag}</strong>
          </p>
          <button
            onClick={() => setSelectedTag(null)}
            className="text-accent-700 dark:text-accent-400 font-medium hover:underline"
          >
            {data.ui.clearFilter}
          </button>
        </div>
      )}
    </PageShell>
  );
};
