import { useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

// Tag filter kept in the URL (?tag=…) so it survives Back from a detail page and
// can be shared. Tags are localized, so switching language clears it.
export function useTagFilter(resetKey: unknown) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get('tag');

  const setSelectedTag = useCallback((tag: string | null) => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      if (tag) next.set('tag', tag);
      else next.delete('tag');
      return next;
    }, { replace: true });
  }, [setSearchParams]);

  const previousKey = useRef(resetKey);
  useEffect(() => {
    if (previousKey.current !== resetKey) {
      previousKey.current = resetKey;
      setSelectedTag(null);
    }
  }, [resetKey, setSelectedTag]);

  const toggleTag = useCallback(
    (tag: string) => setSelectedTag(tag === selectedTag ? null : tag),
    [selectedTag, setSelectedTag],
  );

  return { selectedTag, setSelectedTag, toggleTag };
}
