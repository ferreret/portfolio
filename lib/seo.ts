import { LANGUAGES, Language, SITE_URL, languageOf, localePath, stripLanguage } from './routes';

// One description of a page's <head>, shared by the build-time prerender
// (scripts/prerender.mjs) and the client (usePageMeta) so both always agree.

export const BASE_TITLE = 'Nicolás Barceló | AI & Software Engineer';
export const BASE_DESCRIPTION =
  'AI & Software Engineer with 26+ years of experience. Specialized in AI Agents, LLM orchestration, and intelligent automation.';

/** What a view declares about itself. */
export interface PageMeta {
  title?: string;
  description?: string;
  /** Keep the page out of search indexes (e.g. the 404 view). */
  noindex?: boolean;
}

export interface ResolvedMeta {
  language: Language;
  title: string;
  description: string;
  canonical: string;
  /** hreflang pairs; empty for pages kept out of the index. */
  alternates: { hreflang: string; href: string }[];
  noindex: boolean;
}

export function resolveMeta(pathname: string, meta: PageMeta): ResolvedMeta {
  const language = languageOf(pathname);
  // Language-neutral path without a trailing slash ('/' stays '/').
  const neutral = stripLanguage(pathname).replace(/(.)\/+$/, '$1');
  const url = (lang: Language) => `${SITE_URL}${localePath(neutral, lang)}`;
  const noindex = meta.noindex ?? false;

  return {
    language,
    title: meta.title ? `${meta.title} — Nicolás Barceló` : BASE_TITLE,
    description: meta.description ?? BASE_DESCRIPTION,
    canonical: url(language),
    alternates: noindex
      ? []
      : [...LANGUAGES.map(lang => ({ hreflang: lang, href: url(lang) })), { hreflang: 'x-default', href: url('en') }],
    noindex,
  };
}
