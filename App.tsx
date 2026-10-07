import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { Language, languageOf, localePath, stripLanguage } from './lib/routes';
import { lazyView } from './lib/lazyView';
import { content } from './contentData';
import { AppContent } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ScrollProgress } from './components/ScrollProgress';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';

// Route-level code splitting: only the landing view ships in the main chunk.
const ProjectsView = lazyView(() => import('./components/ProjectsView').then(m => m.ProjectsView));
const ProjectDetail = lazyView(() => import('./components/ProjectDetail').then(m => m.ProjectDetail));
const BlogView = lazyView(() => import('./components/BlogView').then(m => m.BlogView));
const BlogPostDetail = lazyView(() => import('./components/BlogPostDetail').then(m => m.BlogPostDetail));
const ContactSection = lazyView(() => import('./components/ContactSection').then(m => m.ContactSection));
const CVView = lazyView(() => import('./components/CVView').then(m => m.CVView));

/** Loads the code of the view that `pathname` routes to (see index.tsx). */
export function preloadView(pathname: string): Promise<void> {
  const [section, item] = stripLanguage(pathname).split('/').filter(Boolean);
  switch (section) {
    case 'projects': return (item ? ProjectDetail : ProjectsView).preload();
    case 'blog': return (item ? BlogPostDetail : BlogView).preload();
    case 'contact': return ContactSection.preload();
    case 'cv': return CVView.preload();
    default: return Promise.resolve();
  }
}

/** Router state of the language switch: the visitor stays where they were on the page. */
export interface KeepScrollState {
  keepScroll?: boolean;
}

const ScrollToTop: React.FC = () => {
  const { pathname, state } = useLocation();
  const keepScroll = (state as KeepScrollState | null)?.keepScroll === true;
  const navigationType = useNavigationType();
  const firstRender = useRef(true);
  useEffect(() => {
    // Skip the initial load: focus must stay at the document start so the
    // first Tab reaches the skip link.
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    // On POP (Back/Forward) let the browser restore the previous scroll position.
    if (navigationType !== 'POP' && !keepScroll) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Land keyboard/screen-reader users on the new page's content.
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [pathname, navigationType, keepScroll]);
  return null;
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // The URL is the single source of truth for the language: /es/… is Spanish.
  const location = useLocation();
  const language: Language = languageOf(location.pathname);
  const data: AppContent = content[language];

  // This same page in the other language, for the header's language switch.
  const otherLanguage: Language = language === 'en' ? 'es' : 'en';
  const otherLanguagePath = `${localePath(stripLanguage(location.pathname), otherLanguage)}${location.search}${location.hash}`;

  // Prerendered pages already carry the right lang; this follows SPA navigation.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Only an explicit switch is remembered: the inline script in index.html uses
  // it to decide whether a Spanish-speaking visitor is sent to /es on arrival.
  const rememberLanguage = useCallback(() => {
    try { window.localStorage?.setItem('lang', otherLanguage); } catch { /* storage blocked */ }
  }, [otherLanguage]);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const { state: emailCopyState, copy } = useCopyToClipboard();
  const copyEmail = useCallback(() => copy(data.profile.email), [copy, data.profile.email]);

  const isCV = stripLanguage(location.pathname).startsWith('/cv');

  return (
    <div className={`${isCV ? 'cv-route min-h-screen' : 'min-h-screen bg-warm-50 dark:bg-warm-950 transition-colors duration-300'} font-sans selection:bg-accent-100 selection:text-accent-900 dark:selection:bg-accent-900/50 dark:selection:text-accent-100`}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-warm-900 focus:text-white dark:focus:bg-warm-50 dark:focus:text-warm-900 text-sm font-medium"
      >
        {data.ui.skipToContent}
      </a>
      <ScrollToTop />
      {!isCV && <ScrollProgress />}
      {!isCV && (
        <Header
          data={data}
          language={language}
          mobileMenuOpen={mobileMenuOpen}
          otherLanguagePath={otherLanguagePath}
          onSwitchLanguage={rememberLanguage}
          onToggleMobileMenu={toggleMobileMenu}
          onCloseMobileMenu={closeMobileMenu}
        />
      )}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <ErrorBoundary ui={data.ui} resetKey={location.pathname}>
        {/* min-h-screen keeps the footer from jumping up while a lazy route loads */}
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            {/* The same pages under both prefixes; `data` already follows the URL. */}
            {['/', '/es'].map(prefix => (
              <Route key={prefix} path={prefix}>
                <Route index element={<HomeView data={data} language={language} />} />
                <Route path="projects" element={<ProjectsView data={data} />} />
                <Route path="projects/:slug" element={<ProjectDetail data={data} />} />
                <Route path="blog" element={<BlogView data={data} />} />
                <Route path="blog/:slug" element={<BlogPostDetail data={data} />} />
                <Route path="contact" element={<ContactSection data={data} />} />
                <Route path="cv" element={<CVView data={data} language={language} />} />
                <Route path="*" element={<NotFound data={data} />} />
              </Route>
            ))}
          </Routes>
        </Suspense>
        </ErrorBoundary>
      </main>
      {!isCV && <Footer data={data} emailCopyState={emailCopyState} onCopyEmail={copyEmail} />}
    </div>
  );
};

export default App;
