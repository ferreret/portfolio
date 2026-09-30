import { ProjectItem } from '@/types';

// `link` predates demoUrl/repoUrl: a GitHub URL counts as the repo, anything else as the demo.
export function getProjectLinks(project: ProjectItem): { demoUrl?: string; repoUrl?: string } {
  const linkIsRepo = project.link?.includes('github.com') ?? false;
  return {
    demoUrl: project.demoUrl ?? (project.link && !linkIsRepo ? project.link : undefined),
    repoUrl: project.repoUrl ?? (linkIsRepo ? project.link : undefined),
  };
}
