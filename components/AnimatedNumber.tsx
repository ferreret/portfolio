import React, { useEffect, useRef, useState } from 'react';

interface AnimatedNumberProps {
  value: string;
  duration?: number;
  className?: string;
}

interface ParsedValue {
  prefix: string;
  number: number | null;
  suffix: string;
  separator: string | null;
}

const asStatic = (value: string): ParsedValue =>
  ({ prefix: value, number: null, suffix: '', separator: null });

// Parses "19,776" (EN) or "19.776" (ES) style values. A separator only counts
// as thousands grouping when every group after the first has exactly 3 digits;
// anything else (e.g. a decimal like "3.5") renders as-is without animating.
const parseValue = (value: string): ParsedValue => {
  const match = value.match(/^(\D*)([\d,.]+)(.*)$/);
  if (!match) return asStatic(value);
  const [, prefix, digits, suffix] = match;

  const isGroupedBy = (sep: string) => {
    const parts = digits.split(sep);
    return parts.length > 1 && parts.slice(1).every(p => p.length === 3);
  };

  let separator: string | null = null;
  if (digits.includes(',')) {
    if (!isGroupedBy(',')) return asStatic(value);
    separator = ',';
  } else if (digits.includes('.')) {
    if (!isGroupedBy('.')) return asStatic(value);
    separator = '.';
  }

  const number = parseInt(digits.replace(/[,.]/g, ''), 10);
  if (Number.isNaN(number)) return asStatic(value);
  return { prefix, number, suffix, separator };
};

const formatNumber = (n: number, separator: string | null) =>
  separator ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, separator) : String(n);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1400, className }) => {
  const { prefix, number, suffix, separator } = parseValue(value);
  const [display, setDisplay] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (number === null) return;
    // A new target (e.g. per-language stats) must re-animate to the new value.
    animated.current = false;
    if (prefersReducedMotion()) {
      setDisplay(number);
      return;
    }
    const el = ref.current;
    if (!el) return;

    let rafId = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();
          const target = number;
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.floor(eased * target));
            if (progress < 1) rafId = requestAnimationFrame(tick);
            else setDisplay(target);
          };
          setDisplay(0);
          rafId = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [number, duration]);

  if (number === null) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}{formatNumber(display, separator)}{suffix}
    </span>
  );
};
