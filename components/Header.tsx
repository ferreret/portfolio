import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LocaleNavLink as NavLink } from './ui/LocaleLink';
import { buttonClass } from './ui/button';
import { AppContent } from '@/types';
import { MenuIcon, CloseIcon, SunIcon, MoonIcon } from './Icons';

import { Language } from '@/lib/routes';
import { useTheme } from '@/hooks/useTheme';
import type { KeepScrollState } from '@/App';

interface HeaderProps {
  data: AppContent;
  language: Language;
  mobileMenuOpen: boolean;
  /** This same page in the other language. */
  otherLanguagePath: string;
  /** Called when the visitor picks the other language, to remember the choice. */
  onSwitchLanguage: () => void;
  onToggleMobileMenu: () => void;
  onCloseMobileMenu: () => void;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
    isActive
      ? 'text-accent-700 dark:text-accent-400 underline decoration-2 underline-offset-[10px]'
      : 'text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100'
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-left p-3 rounded-lg text-sm font-medium ${
    isActive
      ? 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400'
      : 'text-warm-700 dark:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800'
  }`;

export const Header: React.FC<HeaderProps> = ({
  data, language, mobileMenuOpen,
  otherLanguagePath, onSwitchLanguage, onToggleMobileMenu, onCloseMobileMenu,
}) => {
  // Read here, not in App: the theme settles right after hydration, and that
  // re-render should stay inside the header.
  const { theme, toggleTheme } = useTheme();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  // The link shows the language it switches TO; the accessible name starts with
  // that same visible text (WCAG 2.5.3 Label in Name). It is a real link to this
  // page's counterpart, so crawlers can follow it too.
  const targetLanguage = language === 'en' ? 'ES' : 'EN';
  const langLabel = `${targetLanguage} – ${data.ui.ariaLangToggle}`;
  const keepScroll: KeepScrollState = { keepScroll: true };
  // The icon follows the `dark` class in CSS rather than `theme`, so it is
  // already right in prerendered HTML, before React has hydrated.
  const themeIcon = (
    <>
      <span className="dark:hidden"><MoonIcon /></span>
      <span className="hidden dark:block"><SunIcon /></span>
    </>
  );

  // Mobile menu: focus the first link on open; close on Escape (returning focus to
  // the toggle) or on a tap outside the header.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    mobileNavRef.current?.querySelector('a')?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseMobileMenu();
        menuButtonRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) onCloseMobileMenu();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [mobileMenuOpen, onCloseMobileMenu]);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      <div className="absolute inset-0 bg-warm-50/90 dark:bg-warm-950/90 backdrop-blur-lg border-b border-warm-200/60 dark:border-warm-800/60" />

      <div className="max-w-6xl relative mx-auto px-6 lg:px-8 h-16 flex justify-between items-center">
        <NavLink
          to="/"
          viewTransition
          className="text-xl font-serif font-semibold text-warm-900 dark:text-warm-50 tracking-tight"
        >
          Nicol&aacute;s Barcel&oacute;
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label={data.ui.ariaMainNav}>
          <NavLink to="/" end viewTransition className={navLinkClass}>{data.ui.home}</NavLink>
          <NavLink to="/projects" viewTransition className={navLinkClass}>{data.ui.projects}</NavLink>
          <NavLink to="/blog" viewTransition className={navLinkClass}>{data.ui.blog}</NavLink>

          <div className="h-4 w-px bg-warm-300 dark:bg-warm-700 mx-2" aria-hidden="true" />

          <Link
            to={otherLanguagePath}
            state={keepScroll}
            hrefLang={targetLanguage.toLowerCase()}
            onClick={onSwitchLanguage}
            aria-label={langLabel}
            className="text-xs font-semibold text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100 w-8 h-8 flex items-center justify-center rounded-md hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
          >
            {targetLanguage}
          </Link>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? data.ui.ariaThemeToDark : data.ui.ariaThemeToLight}
            className="text-warm-500 dark:text-warm-400 hover:text-warm-900 dark:hover:text-warm-100 w-8 h-8 flex items-center justify-center rounded-md hover:bg-warm-100 dark:hover:bg-warm-800 transition-colors"
          >
            {themeIcon}
          </button>

          <NavLink to="/contact" viewTransition className={`ml-3 ${buttonClass('primary', 'sm')}`}>
            {data.ui.contact}
          </NavLink>
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-1 -mr-2 md:hidden">
          <Link
            to={otherLanguagePath}
            state={keepScroll}
            hrefLang={targetLanguage.toLowerCase()}
            onClick={onSwitchLanguage}
            aria-label={langLabel}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-warm-600 dark:text-warm-300"
          >
            <span className="text-xs font-semibold px-2 py-1 rounded border border-warm-300 dark:border-warm-700">{targetLanguage}</span>
          </Link>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? data.ui.ariaThemeToDark : data.ui.ariaThemeToLight}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-warm-600 dark:text-warm-300"
          >
            {themeIcon}
          </button>
          <button
            ref={menuButtonRef}
            className="w-11 h-11 flex items-center justify-center rounded-lg text-warm-600 dark:text-warm-300"
            onClick={onToggleMobileMenu}
            aria-label={mobileMenuOpen ? data.ui.ariaCloseMenu : data.ui.ariaOpenMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav id="mobile-menu" ref={mobileNavRef} onClick={e => { if ((e.target as HTMLElement).closest('a')) onCloseMobileMenu(); }} className="md:hidden absolute top-full left-0 right-0 bg-warm-50/95 dark:bg-warm-950/95 backdrop-blur-xl border-b border-warm-200 dark:border-warm-800 p-4 flex flex-col gap-1 animate-fade-in" aria-label={data.ui.ariaMobileNav}>
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
