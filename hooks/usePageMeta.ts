import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://portfolio.nicolasbarcelo.dev';
const BASE_TITLE = 'Nicolás Barceló | Senior Data Scientist & Engineer';
const BASE_DESCRIPTION =
  'Senior Data Scientist & Software Engineer with 26+ years of experience. Specialized in AI Agents, LLM orchestration, and intelligent automation.';

interface PageMetaOptions {
  skip?: boolean;
  /** Keep the page out of search indexes (e.g. the 404 view). */
  noindex?: boolean;
}

// Per-route document.title, meta description, canonical and og:url. SPA-only
// (crawlers that render JS, browser tabs, history); OG tags for scrapers that
// don't run JS would need prerendering.
export function usePageMeta(title?: string, description?: string, options?: PageMetaOptions) {
  const skip = options?.skip ?? false;
  const noindex = options?.noindex ?? false;
  const { pathname } = useLocation();

  useEffect(() => {
    // skip lets a view yield to a child that sets its own meta (e.g. detail
    // views rendering NotFound): child effects run before parent effects.
    if (skip) return;
    document.title = title ? `${title} — Nicolás Barceló` : BASE_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? BASE_DESCRIPTION);

    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);

    if (!noindex) return;
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = 'noindex';
    document.head.appendChild(robots);
    return () => robots.remove();
  }, [title, description, skip, noindex, pathname]);
}
