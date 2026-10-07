export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
}

export type ProjectStatus = 'production' | 'prototype' | 'archived' | 'in-development';

export interface BusinessMetric {
  label: string;
  value: string;
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface ProjectItem {
  id: string;
  /** URL segment: /projects/<slug>. Same in both languages; matches the data file's name. */
  slug: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  link?: string;
  /** Live demo URL; falls back to `link` when it is not a GitHub URL. */
  demoUrl?: string;
  /** Source repository URL; falls back to `link` when it is a GitHub URL. */
  repoUrl?: string;
  content?: string;
  status?: ProjectStatus;
  problem?: string;
  solution?: string;
  businessMetrics?: BusinessMetric[];
  architectureDiagram?: string;
  techStack?: TechStackGroup[];
  lessonsLearned?: string[];
  role?: string;
  timeline?: string;
  /** id of the blog post written about this project, cross-linked from both pages. */
  relatedPostId?: string;
}

export interface BlogPost {
  id: string;
  /** URL segment: /blog/<slug>. Same in both languages; matches the data file's name. */
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  tags: string[];
  readTime: string;
  /** id of the project this post is about (see ProjectItem.relatedPostId). */
  relatedProjectId?: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
  x: string;
  summary: string;
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  certifications: string[];
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface ActivityItem {
  repo: string;
  repoShort: string;
  repoUrl: string;
  latestMessage: string;
  latestCommitUrl: string;
  pushCount: number;
  latestAt: string;
}

export interface LanguageStat {
  name: string;
  count: number;
  pct: number;
}

// One string per week, Sunday first: a digit 0-4 per day (GitHub's quartile
// level) or '-' for a day outside the range. `from` is the first week's Sunday.
export interface ContributionCalendar {
  from: string;
  weeks: string[];
}

export interface ActivityFeed {
  generatedAt: string;
  user: string;
  items: ActivityItem[];
  // Precomputed by scripts/fetch-activity.mjs; absent in feeds generated
  // before each field existed, so consumers must treat them as optional.
  languages?: LanguageStat[];
  contributions?: ContributionCalendar;
}

// CV content structure — richer than portfolio experience (categorized bullets).
// Shares profile/education/certifications/skills from AppContent; only CV-specific
// fields live here.
export interface CVExperienceSection {
  title?: string;
  bullets: string[];
}

export interface CVExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  sections: CVExperienceSection[];
}

export interface CVSkillGroup {
  category: string;
  items: string;
}

export interface CVContent {
  labels: {
    summary: string;
    experience: string;
    education: string;
    certifications: string;
    skills: string;
    languages: string;
    portfolio: string;
  };
  summary: string[];
  experience: CVExperienceItem[];
  skills: CVSkillGroup[];
  languages: string;
}

// Wrapper for all content to enable easy switching
export interface AppContent {
  profile: ProfileData;
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  blog: BlogPost[];
  heroStats: HeroStat[];
  ui: {
    /** BCP 47 locale for Intl date formatting. */
    locale: string;
    home: string;
    projects: string;
    blog: string;
    contact: string;
    downloadCv: string;
    viewProjects: string;
    heroTitlePrefix: string;
    heroTitleHighlight: string;
    heroTitleSuffix: string;
    experienceTitle: string;
    coreTechTitle: string;
    journeyTitle: string;
    educationTitle: string;
    certificationsTitle: string;
    featuredProjectsTitle: string;
    featuredProjectsSubtitle: string;
    projectsPageTitle: string;
    latestPostsTitle: string;
    viewAllPosts: string;
    openSourceTitle: string;
    codeBadge: string;
    nextProject: string;
    nextPost: string;
    relatedPost: string;
    relatedProject: string;
    ariaGithubProfile: string;
    ariaFooterNav: string;
    blogTitle: string;
    blogSubtitle: string;
    backToBlog: string;
    backToProjects: string;
    readArticle: string;
    available: string;
    copyright: string;
    footerTagline: string;
    skillsSubtitle: string;
    activityTitle: string;
    activitySubtitle: string;
    activityCommitSingular: string;
    activityCommitPlural: string;
    activityViewCommit: string;
    allTags: string;
    noProjectsFound: string;
    noPostsFound: string;
    clearFilter: string;
    contactTitle: string;
    contactSubtitle: string;
    contactEmailTitle: string;
    contactEmailDesc: string;
    contactEmailCta: string;
    contactEmailSubject: string;
    contactLinkedinTitle: string;
    contactLinkedinDesc: string;
    contactLinkedinCta: string;
    contactGithubTitle: string;
    contactGithubDesc: string;
    contactGithubCta: string;
    contactXTitle: string;
    contactXDesc: string;
    contactXCta: string;
    notFoundTitle: string;
    notFoundDescription: string;
    notFoundCta: string;
    skipToContent: string;
    emailCopiedLabel: string;
    ariaLangToggle: string;
    ariaThemeToDark: string;
    ariaThemeToLight: string;
    ariaOpenMenu: string;
    ariaCloseMenu: string;
    ariaMainNav: string;
    ariaMobileNav: string;
    ariaCopyEmail: string;
    ariaLinkedinProfile: string;
    ariaXProfile: string;
    contactEmailCopy: string;
    metaDescription: string;
    githubLanguagesTitle: string;
    githubGraphAlt: string;
    githubLess: string;
    githubMore: string;
    errorTitle: string;
    errorDescription: string;
    errorReload: string;
    caseStudy: {
      statusLabel: string;
      statusProduction: string;
      statusPrototype: string;
      statusArchived: string;
      statusInDevelopment: string;
      roleLabel: string;
      timelineLabel: string;
      problemTitle: string;
      solutionTitle: string;
      metricsTitle: string;
      architectureTitle: string;
      techStackTitle: string;
      lessonsLearnedTitle: string;
      liveDemo: string;
      viewCode: string;
    };
  };
}
