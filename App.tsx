import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { content } from './contentData';
import { AppContent } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ProjectsView } from './components/ProjectsView';
import { ProjectDetail } from './components/ProjectDetail';
import { BlogView } from './components/BlogView';
import { BlogPostDetail } from './components/BlogPostDetail';
import { ContactSection } from './components/ContactSection';
import { ScrollProgress } from './components/ScrollProgress';
import { CVView } from './components/CVView';
import { NotFound } from './components/NotFound';

type Language = 'en' | 'es';
type Theme = 'light' | 'dark';

const getSystemTheme = (): Theme =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage?.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return getSystemTheme();
};

const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage?.getItem('lang');
  if (stored === 'en' || stored === 'es') return stored;
  const browser = window.navigator?.language?.slice(0, 2);
  return browser === 'es' ? 'es' : 'en';
};

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
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
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' });
      // Land keyboard/screen-reader users on the new page's content.
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }
  }, [pathname, navigationType]);
  return null;
};

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>(getStoredLanguage);
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [emailCopied, setEmailCopied] = useState(false);

  const data: AppContent = content[language];

  // Sync theme to DOM + persist (the inline script in index.html applies it pre-paint)
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    window.localStorage?.setItem('theme', theme);
  }, [theme]);

  // Sync language to html lang attribute + persist
  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage?.setItem('lang', language);
  }, [language]);

  // Close mobile menu on route change
  const location = useLocation();
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleTheme = useCallback(() => setTheme(prev => prev === 'light' ? 'dark' : 'light'), []);
  const toggleLanguage = useCallback(() => setLanguage(prev => prev === 'en' ? 'es' : 'en'), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(prev => !prev), []);

  const copyEmailTimeout = useRef<number | undefined>(undefined);
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(data.profile.email)
      .then(() => {
        setEmailCopied(true);
        window.clearTimeout(copyEmailTimeout.current);
        copyEmailTimeout.current = window.setTimeout(() => setEmailCopied(false), 2000);
      })
      .catch(() => { /* clipboard unavailable (permissions, insecure context) */ });
  }, [data.profile.email]);

  const isCV = location.pathname.startsWith('/cv');

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
          theme={theme}
          mobileMenuOpen={mobileMenuOpen}
          onToggleLanguage={toggleLanguage}
          onToggleTheme={toggleTheme}
          onToggleMobileMenu={toggleMobileMenu}
        />
      )}
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <Routes>
          <Route path="/" element={<HomeView data={data} language={language} />} />
          <Route path="/projects" element={<ProjectsView data={data} />} />
          <Route path="/projects/:id" element={<ProjectDetail data={data} />} />
          <Route path="/blog" element={<BlogView data={data} />} />
          <Route path="/blog/:id" element={<BlogPostDetail data={data} />} />
          <Route path="/contact" element={<ContactSection data={data} />} />
          <Route path="/cv" element={<CVView data={data} language={language} />} />
          <Route path="*" element={<NotFound data={data} />} />
        </Routes>
      </main>
      {!isCV && <Footer data={data} emailCopied={emailCopied} onCopyEmail={copyEmail} />}
    </div>
  );
};

export default App;
