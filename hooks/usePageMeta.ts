import { useEffect } from 'react';

const BASE_TITLE = 'Nicolás Barceló | Senior Data Scientist & Engineer';
const BASE_DESCRIPTION =
  'Senior Data Scientist & Software Engineer with 25+ years of experience. Specialized in AI Agents, LLM orchestration, and intelligent automation.';

// Per-route document.title + meta description. SPA-only (crawlers that render JS,
// browser tabs, history); OG tags for scrapers would need prerendering.
export function usePageMeta(title?: string, description?: string, options?: { skip?: boolean }) {
  const skip = options?.skip ?? false;
  useEffect(() => {
    // skip lets a view yield to a child that sets its own meta (e.g. detail
    // views rendering NotFound): child effects run before parent effects.
    if (skip) return;
    document.title = title ? `${title} — Nicolás Barceló` : BASE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description ?? BASE_DESCRIPTION);
  }, [title, description, skip]);
}
