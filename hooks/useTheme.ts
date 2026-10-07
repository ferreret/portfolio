import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

// An explicit choice is persisted; without one the site follows the OS setting
// live. The inline script in index.html puts the theme on <html> before first
// paint, so nothing here touches the DOM until the theme actually changes.

const QUERY = '(prefers-color-scheme: dark)';
const listeners = new Set<() => void>();

// undefined = storage not read yet; null = no explicit choice.
let chosen: Theme | null | undefined;

const readChoice = (): Theme | null => {
  if (chosen === undefined) {
    try {
      const stored = window.localStorage?.getItem('theme');
      chosen = stored === 'light' || stored === 'dark' ? stored : null;
    } catch {
      chosen = null;
    }
  }
  return chosen;
};

const systemTheme = (): Theme => (window.matchMedia?.(QUERY).matches ? 'dark' : 'light');
const currentTheme = (): Theme => readChoice() ?? systemTheme();

const apply = () => {
  document.documentElement.classList.toggle('dark', currentTheme() === 'dark');
  listeners.forEach(listener => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  const media = window.matchMedia?.(QUERY);
  media?.addEventListener('change', apply);
  return () => {
    listeners.delete(listener);
    media?.removeEventListener('change', apply);
  };
};

export function useTheme() {
  // Prerendered HTML is built as 'light'; React switches to the real theme right
  // after hydrating. Anything that must look right before that (the toggle's
  // icon) is driven by the `dark` class in CSS, not by this value.
  const theme = useSyncExternalStore<Theme>(subscribe, currentTheme, () => 'light');

  const toggleTheme = useCallback(() => {
    chosen = currentTheme() === 'light' ? 'dark' : 'light';
    try { window.localStorage?.setItem('theme', chosen); } catch { /* storage blocked */ }
    apply();
  }, []);

  return { theme, toggleTheme };
}
