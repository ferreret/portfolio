import React, { useState, useEffect, useCallback } from 'react';
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
  useEffect(() => {
    // On POP (Back/Forward) let the browser restore the previous scroll position.
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' });
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

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(data.profile.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  }, [data.profile.email]);

  const isCV = location.pathname.startsWith('/cv');

  return (
    <div className={`${isCV ? 'cv-route min-h-screen' : 'min-h-screen bg-warm-50 dark:bg-warm-950 transition-colors duration-300'} font-sans selection:bg-accent-100 selection:text-accent-900 dark:selection:bg-accent-900/50 dark:selection:text-accent-100`}>
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
      <main>
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
