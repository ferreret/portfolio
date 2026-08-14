import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContent } from '@/types';
import { usePageMeta } from '@/hooks/usePageMeta';

interface ProjectsViewProps {
  data: AppContent;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ data }) => {
  usePageMeta(data.ui.featuredProjectsTitle, data.ui.featuredProjectsSubtitle);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Tags are localized; a selected tag from the other language would match nothing.
  useEffect(() => {
    setSelectedTag(null);
  }, [data]);

  const allTags = Array.from(new Set(data.projects.flatMap(p => p.tags))).sort();
  const filteredProjects = selectedTag
    ? data.projects.filter(p => p.tags.includes(selectedTag))
    : data.projects;

  const tagButtonClass = (active: boolean) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active
        ? 'bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900'
        : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-700'
    }`;

  return (
    <div className="pt-28 pb-20 animate-fade-in min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-3">
            {data.ui.featuredProjectsTitle}
          </h1>
          <p className="text-warm-500 dark:text-warm-400 max-w-2xl mx-auto">
            {data.ui.featuredProjectsSubtitle}
          </p>
        </div>

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={tagButtonClass(selectedTag === null)}
          >
            {data.ui.allTags}
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={tagButtonClass(selectedTag === tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <article
                key={project.id}
                className="group relative bg-warm-50 dark:bg-warm-800 rounded-xl overflow-hidden border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-300 hover:shadow-lg flex flex-col"
              >
                <div className="h-48 overflow-hidden bg-warm-100 dark:bg-warm-700">
                  <img src={project.imageUrl} alt="" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h2 className="font-serif text-lg font-semibold text-warm-900 dark:text-warm-50 mb-2 group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">
                    <Link
                      to={`/projects/${project.id}`}
                      viewTransition
                      className="focus:outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-accent-500"
                    >
                      {project.title}
                    </Link>
                  </h2>
                  <p className="text-warm-500 dark:text-warm-400 mb-4 flex-1 line-clamp-3 text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.tags.map(tag => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                        className={`relative z-10 text-xs px-2.5 py-1 rounded-full transition-colors ${
                          selectedTag === tag
                            ? 'bg-accent-700 text-white'
                            : 'bg-warm-100 dark:bg-warm-700 text-warm-500 dark:text-warm-400 hover:bg-accent-100 dark:hover:bg-accent-900/30 hover:text-accent-700 dark:hover:text-accent-400'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
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
      </div>
    </div>
  );
};
