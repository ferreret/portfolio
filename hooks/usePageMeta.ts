import { useEffect } from 'react';

const BASE_TITLE = 'Nicolás Barceló | Senior Data Scientist & Engineer';
const BASE_DESCRIPTION =
  'Senior Data Scientist & Software Engineer with 25+ years of experience. Specialized in AI Agents, LLM orchestration, and intelligent automation.';

// Per-route document.title + meta description. SPA-only (crawlers that render JS,
// browser tabs, history); OG tags for scrapers would need prerendering.
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} — Nicolás Barceló` : BASE_TITLE;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description ?? BASE_DESCRIPTION);
  }, [title, description]);
}
