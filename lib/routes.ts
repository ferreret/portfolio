// URL scheme: English lives at the root, Spanish under /es. Paths passed around
// the app are language-neutral ('/projects'); localePath() adds the prefix.
export type Language = 'en' | 'es';

export const LANGUAGES: Language[] = ['en', 'es'];
export const SITE_URL = 'https://portfolio.nicolasbarcelo.dev';

const ES_PREFIX = /^\/es(?=\/|$)/;

export const languageOf = (pathname: string): Language => (ES_PREFIX.test(pathname) ? 'es' : 'en');

/** '/es/blog' → '/blog', '/es' → '/'. */
export const stripLanguage = (pathname: string): string => pathname.replace(ES_PREFIX, '') || '/';

/** '/blog' → '/es/blog' in Spanish; unchanged in English. */
export const localePath = (path: string, language: Language): string =>
  language === 'en' ? path : path === '/' ? '/es' : `/es${path}`;

export const projectPath = (project: { slug: string }) => `/projects/${project.slug}`;
export const postPath = (post: { slug: string }) => `/blog/${post.slug}`;
