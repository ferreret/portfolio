import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppContent } from '@/types';
import { MenuIcon, XIcon, SunIcon, MoonIcon } from './Icons';

type Language = 'en' | 'es';
type Theme = 'light' | 'dark';

interface HeaderProps {
  data: AppContent;
  language: Language;
  theme: Theme;
  mobileMenuOpen: boolean;
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  onToggleMobileMenu: () => void;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
    isActive
      ? 'text-accent-700 dark:text-accent-400'
      : 'text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100'
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-left p-3 rounded-lg text-sm font-medium ${
    isActive
      ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400'
      : 'text-warm-700 dark:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800'
  }`;

export const Header: React.FC<HeaderProps> = ({
  data, language, theme, mobileMenuOpen,
  onToggleLanguage, onToggleTheme, onToggleMobileMenu,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-warm-50/90 dark:bg-warm-950/90 backdrop-blur-lg border-b border-warm-200/60 dark:border-warm-800/60" />

      <div className="max-w-6xl relative mx-auto px-6 lg:px-8 h-16 flex justify-between items-center">
        <NavLink
          to="/"
          viewTransition
          className="text-lg font-serif font-bold text-warm-900 dark:text-warm-50 tracking-tight"
        >
          Nicol&aacute;s Barcel&oacute;
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          <NavLink to="/" end viewTransition className={navLinkClass}>{data.ui.home}</NavLink>
          <NavLink to="/projects" viewTransition className={navLinkClass}>{data.ui.projects}</NavLink>
          <NavLink to="/blog" viewTransition className={navLinkClass}>{data.ui.blog}</NavLink>

          <div className="h-4 w-px bg-warm-300 dark:bg-warm-700 mx-2" aria-hidden="true" />

          <button
            onClick={onToggleLanguage}
            aria-label={data.ui.ariaLangToggle}
            className="text-xs font-semibold text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100 w-8 h-8 flex items-center justify-center rounded-md hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? data.ui.ariaThemeToDark : data.ui.ariaThemeToLight}
            className="text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100 w-8 h-8 flex items-center justify-center rounded-md hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>

          <NavLink to="/contact" viewTransition className="ml-3 px-4 py-2 text-sm font-medium text-white bg-warm-900 dark:bg-warm-100 dark:text-warm-900 rounded-lg hover:bg-warm-800 dark:hover:bg-warm-200 transition-colors">
            {data.ui.contact}
          </NavLink>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleLanguage}
            aria-label={data.ui.ariaLangToggle}
            className="text-xs font-semibold text-warm-600 dark:text-warm-300 px-2 py-1 rounded border border-warm-300 dark:border-warm-700"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'light' ? data.ui.ariaThemeToDark : data.ui.ariaThemeToLight}
            className="text-warm-600 dark:text-warm-300 p-1.5"
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button
            className="text-warm-600 dark:text-warm-300 p-1.5"
            onClick={onToggleMobileMenu}
            aria-label={mobileMenuOpen ? data.ui.ariaCloseMenu : data.ui.ariaOpenMenu}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 bg-warm-50/95 dark:bg-warm-950/95 backdrop-blur-xl border-b border-warm-200 dark:border-warm-800 p-4 flex flex-col gap-1 animate-fade-in" aria-label="Mobile navigation">
          <NavLink to="/" end viewTransition className={mobileNavLinkClass}>{data.ui.home}</NavLink>
          <NavLink to="/projects" viewTransition className={mobileNavLinkClass}>{data.ui.projects}</NavLink>
          <NavLink to="/blog" viewTransition className={mobileNavLinkClass}>{data.ui.blog}</NavLink>
          <NavLink to="/contact" viewTransition className="text-center p-3 rounded-lg bg-warm-900 dark:bg-warm-100 text-white dark:text-warm-900 text-sm font-medium mt-1">
            {data.ui.contact}
          </NavLink>
        </nav>
      )}
    </header>
  );
};
