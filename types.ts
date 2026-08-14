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
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  link?: string;
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
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string; // HTML or Markdown string
  tags: string[];
  readTime: string;
}

export interface ProfileData {
  name: string;
  title: string;
  location: string;
  email: string;
  linkedin: string;
  github: string;
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

export interface ActivityFeed {
  generatedAt: string;
  user: string;
  items: ActivityItem[];
  // Precomputed by scripts/fetch-activity.mjs; absent in feeds generated
  // before the field existed, so consumers must treat it as optional.
  languages?: LanguageStat[];
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
    builtWith: string;
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
    };
  };
}
