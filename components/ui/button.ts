// The site's one button system. Apply to <Link>, <a> or <button> alike:
//   className={buttonClass('primary')}
export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'md' | 'sm';
/** 'hero' matches the home hero, whose dark theme uses the og-image's night palette. */
export type ButtonSurface = 'page' | 'hero';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors';

const variants: Record<ButtonSurface, Record<ButtonVariant, string>> = {
  page: {
    primary:
      'bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900 hover:bg-warm-800 dark:hover:bg-warm-200',
    secondary:
      'border border-warm-300 dark:border-warm-700 text-warm-700 dark:text-warm-200 hover:bg-warm-100 dark:hover:bg-warm-800',
  },
  hero: {
    primary:
      'bg-warm-900 dark:bg-cream-100 text-white dark:text-night-950 hover:bg-warm-800 dark:hover:bg-cream-50',
    secondary:
      'border border-warm-300 dark:border-night-600 text-warm-700 dark:text-cream-100 hover:bg-warm-100 dark:hover:bg-night-800',
  },
};

const sizes: Record<ButtonSize, string> = {
  md: 'min-h-11 px-6 py-3',
  sm: 'min-h-10 px-4 py-2 text-sm',
};

export const buttonClass = (
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md',
  surface: ButtonSurface = 'page',
) => `${base} ${variants[surface][variant]} ${sizes[size]}`;
