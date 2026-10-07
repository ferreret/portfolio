import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Language, languageOf, localePath } from '@/lib/routes';

/** The language of the current URL: Spanish under /es, English elsewhere. */
export const useLanguage = (): Language => languageOf(useLocation().pathname);

/** Turns a language-neutral path ('/projects') into one for the current language. */
export function useLocalePath() {
  const language = useLanguage();
  return useCallback((path: string) => localePath(path, language), [language]);
}
