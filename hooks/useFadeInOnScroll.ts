import { useEffect, useRef, useState } from 'react';

// Reveal-on-scroll driven by React state (no direct DOM mutation). Spread
// `reveal(className)` onto the section: it stays hidden via [data-reveal] until
// it enters the viewport, then plays the fade-in-up animation once.
export const useFadeInOnScroll = <T extends HTMLElement = HTMLElement>() => {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (className: string) => ({
    ref,
    'data-reveal': revealed ? undefined : '',
    className: revealed ? `${className} animate-fade-in-up` : className,
  });
};
