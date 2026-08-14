import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContent, ProjectStatus } from '@/types';
import { ArrowLeftIcon } from './Icons';
import { usePageMeta } from '@/hooks/usePageMeta';
import { NotFound } from './NotFound';

interface ProjectDetailProps {
  data: AppContent;
}

const statusStyles: Record<ProjectStatus, string> = {
  production: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  prototype: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  archived: 'bg-warm-200 text-warm-700 dark:bg-warm-800 dark:text-warm-300',
  'in-development': 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const project = data.projects.find(p => p.id === id);
  usePageMeta(project?.title, project?.description, { skip: !project });

  if (!project) {
    return <NotFound data={data} />;
  }

  const cs = data.ui.caseStudy;
  const statusLabel = project.status
    ? ({
        production: cs.statusProduction,
        prototype: cs.statusPrototype,
        archived: cs.statusArchived,
        'in-development': cs.statusInDevelopment,
      } as Record<ProjectStatus, string>)[project.status]
    : null;

  const hasMeta = Boolean(project.status || project.role || project.timeline);

  return (
    <div className="pt-24 pb-20 animate-fade-in min-h-screen bg-white dark:bg-warm-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <button onClick={() => navigate('/projects', { viewTransition: true })} className="mt-8 mb-8 flex items-center gap-2 text-warm-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors text-sm">
          <ArrowLeftIcon />
          {data.ui.backToProjects}
        </button>

        {project.imageUrl && (
          <div className="rounded-xl overflow-hidden border border-warm-200 dark:border-warm-800 mb-10">
            <img src={project.imageUrl} alt={project.title} className="w-full h-auto object-cover" />
          </div>
        )}

        <header className="mb-10">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold tracking-wider uppercase text-accent-600 dark:text-accent-400">{tag}</span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-6 leading-tight">{project.title}</h1>
          <p className="text-lg text-warm-500 dark:text-warm-400 leading-relaxed pb-8">{project.description}</p>

          {hasMeta && (
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-warm-100 dark:border-warm-800 pt-6">
              {project.status && statusLabel && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-warm-400 mb-1">{cs.statusLabel}</dt>
                  <dd>
                    <span className={`inline-block text-xs font-semibold px-2 py-1 rounded ${statusStyles[project.status]}`}>
                      {statusLabel}
                    </span>
                  </dd>
                </div>
              )}
              {project.role && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-warm-400 mb-1">{cs.roleLabel}</dt>
                  <dd className="text-sm text-warm-700 dark:text-warm-200">{project.role}</dd>
                </div>
              )}
              {project.timeline && (
                <div>
                  <dt className="text-xs uppercase tracking-wider text-warm-400 mb-1">{cs.timelineLabel}</dt>
                  <dd className="text-sm text-warm-700 dark:text-warm-200">{project.timeline}</dd>
                </div>
              )}
            </dl>
          )}
        </header>

        {project.businessMetrics && project.businessMetrics.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-bold text-warm-900 dark:text-warm-50 mb-4">{cs.metricsTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.businessMetrics.map(m => (
                <div key={m.label} className="rounded-xl border border-warm-200 dark:border-warm-800 bg-warm-50/50 dark:bg-warm-800/40 p-5">
                  <div className="font-serif text-3xl font-bold text-accent-600 dark:text-accent-400 mb-1">{m.value}</div>
                  <div className="text-xs uppercase tracking-wider text-warm-500 dark:text-warm-400">{m.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.problem && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-warm-900 dark:text-warm-50 mb-3">{cs.problemTitle}</h2>
            <p className="text-warm-600 dark:text-warm-300 leading-relaxed whitespace-pre-line">{project.problem}</p>
          </section>
        )}

        {project.solution && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-warm-900 dark:text-warm-50 mb-3">{cs.solutionTitle}</h2>
            <p className="text-warm-600 dark:text-warm-300 leading-relaxed whitespace-pre-line">{project.solution}</p>
          </section>
        )}

        {project.architectureDiagram && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-warm-900 dark:text-warm-50 mb-3">{cs.architectureTitle}</h2>
            <div className="rounded-xl overflow-hidden border border-warm-200 dark:border-warm-800">
              <img src={project.architectureDiagram} alt={`${project.title} architecture`} className="w-full h-auto" />
            </div>
          </section>
        )}

        {project.techStack && project.techStack.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-warm-900 dark:text-warm-50 mb-4">{cs.techStackTitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.techStack.map(group => (
                <div key={group.category} className="rounded-lg border border-warm-200 dark:border-warm-800 p-4">
                  <div className="text-xs uppercase tracking-wider text-warm-400 mb-2">{group.category}</div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map(it => (
                      <span key={it} className="text-xs font-medium px-2 py-1 rounded bg-warm-100 dark:bg-warm-800 text-warm-700 dark:text-warm-200">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {project.lessonsLearned && project.lessonsLearned.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-bold text-warm-900 dark:text-warm-50 mb-3">{cs.lessonsLearnedTitle}</h2>
            <ul className="list-disc pl-6 space-y-2 text-warm-600 dark:text-warm-300 leading-relaxed">
              {project.lessonsLearned.map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </section>
        )}

        {project.content && (
          <div
            className="prose prose-stone dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-custom"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        )}
      </div>
    </div>
  );
};
