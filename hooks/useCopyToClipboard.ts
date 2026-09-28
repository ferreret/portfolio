import { useCallback, useEffect, useRef, useState } from 'react';

export type CopyState = 'idle' | 'copied' | 'failed';

// Clipboard writes fail without permissions or outside a secure context, so the
// caller gets a 'failed' state to fall back on (e.g. showing the text to copy by hand).
export function useCopyToClipboard(resetMs = { copied: 2000, failed: 6000 }) {
  const [state, setState] = useState<CopyState>('idle');
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const copy = useCallback((text: string) => {
    const settle = (next: CopyState) => {
      setState(next);
      window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setState('idle'), resetMs[next as 'copied' | 'failed']);
    };
    if (!navigator.clipboard) {
      settle('failed');
      return;
    }
    navigator.clipboard.writeText(text).then(() => settle('copied'), () => settle('failed'));
  }, [resetMs.copied, resetMs.failed]);

  return { state, copy };
}
