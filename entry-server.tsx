// Build-time entry: scripts/prerender.mjs imports the SSR bundle of this file
// to turn every public route into a static HTML page. Never shipped to the browser.
import React from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App';
import { content } from './contentData';
import { MetaSinkContext } from './hooks/usePageMeta';
import { formatPostDate } from './lib/formatDate';
import { LANGUAGES, Language, SITE_URL, localePath, postPath, projectPath } from './lib/routes';
import { PageMeta, ResolvedMeta, resolveMeta } from './lib/seo';

export { SITE_URL, LANGUAGES, localePath };

export interface Page {
  /** Language-neutral path; it exists once per language (see localePath). */
  path: string;
  /** ISO date for the sitemap, when the page has a real one. */
  lastmod?: string;
}

/** Every indexable page. /cv and the 404 view are served from the bare shell instead. */
export function pages(): Page[] {
  const { en, es } = content;
  const slugs = (c: typeof en) => [...c.projects.map(projectPath), ...c.blog.map(postPath)].join(' ');
  // One URL per item, shared by both languages: a slug present in only one of
  // them would prerender a "not found" page under the other.
  if (slugs(en) !== slugs(es)) throw new Error(`Slugs differ between languages:\n  en: ${slugs(en)}\n  es: ${slugs(es)}`);

  return [
    { path: '/' },
    { path: '/projects' },
    ...en.projects.map(project => ({ path: projectPath(project) })),
    { path: '/blog' },
    ...en.blog.map(post => ({ path: postPath(post), lastmod: formatPostDate(post.date, 'en').iso })),
    { path: '/contact' },
  ];
}

export async function render(path: string, language: Language): Promise<{ html: string; meta: ResolvedMeta }> {
  const url = localePath(path, language);
  const sink: PageMeta = {};
  // prerender() resolves once every Suspense boundary (the lazy routes) has settled.
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <MetaSinkContext.Provider value={sink}>
        <App />
      </MetaSinkContext.Provider>
    </StaticRouter>,
    // Keep every Suspense boundary inline. By default React moves large ones
    // (the page body) to the end of the document and swaps them in with a
    // script, which hides the content from readers that don't run JS.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER },
  );
  const html = await new Response(prelude).text();
  return { html, meta: resolveMeta(url, sink) };
}
