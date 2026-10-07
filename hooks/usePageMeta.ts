import { createContext, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PageMeta, resolveMeta } from '@/lib/seo';

interface PageMetaOptions {
  skip?: boolean;
  /** Keep the page out of search indexes (e.g. the 404 view). */
  noindex?: boolean;
}

// During the build-time prerender there is no document to write to: the view's
// meta is collected here instead and baked into that page's <head>.
export const MetaSinkContext = createContext<PageMeta | null>(null);

const setContent = (selector: string, content: string) =>
  document.querySelector(selector)?.setAttribute('content', content);

// Per-route title, description, canonical, hreflang and Open Graph tags. The
// prerendered HTML already carries them for the page it was built for; this
// keeps them right as the visitor navigates within the SPA.
export function usePageMeta(title?: string, description?: string, options?: PageMetaOptions) {
  // skip lets a view yield to a child that sets its own meta (e.g. detail
  // views rendering NotFound): child effects run before parent effects.
  const skip = options?.skip ?? false;
  const noindex = options?.noindex ?? false;
  const { pathname } = useLocation();

  const sink = useContext(MetaSinkContext);
  if (sink && !skip) Object.assign(sink, { title, description, noindex });

  useEffect(() => {
    if (skip) return;
    const meta = resolveMeta(pathname, { title, description, noindex });

    document.title = meta.title;
    setContent('meta[name="description"]', meta.description);
    setContent('meta[property="og:title"]', meta.title);
    setContent('meta[property="og:description"]', meta.description);
    setContent('meta[property="og:url"]', meta.canonical);
    setContent('meta[name="twitter:title"]', meta.title);
    setContent('meta[name="twitter:description"]', meta.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', meta.canonical);

    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(link => link.remove());
    for (const alternate of meta.alternates) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = alternate.hreflang;
      link.href = alternate.href;
      document.head.appendChild(link);
    }

    document.querySelector('meta[name="robots"]')?.remove();
    if (meta.noindex) {
      const robots = document.createElement('meta');
      robots.name = 'robots';
      robots.content = 'noindex';
      document.head.appendChild(robots);
    }
  }, [title, description, skip, noindex, pathname]);
}
