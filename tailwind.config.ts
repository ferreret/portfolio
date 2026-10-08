import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  // Scoped: a bare './**/*' glob would sweep node_modules on every build.
  content: [
    './index.html',
    './*.{ts,tsx}',
    './{components,data,hooks}/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '"Inter Fallback"', 'system-ui', 'sans-serif'],
        // --serif-fallback: the stand-in faces in styles.css, by text size.
        serif: ['Newsreader', 'var(--serif-fallback)', 'Georgia', 'serif'],
      },
      colors: {
        // Amber, after the og-image. On light surfaces body-size text needs
        // 700 or darker (600 is 3.2:1 on white: large text and fills only).
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // The og-image's own palette: the dark theme of the home hero and the
        // project covers.
        night: {
          950: '#15110e',
          900: '#17120e',
          800: '#2a221c',
          700: '#3a3027',
          600: '#54463a',
          500: '#6b5a4a',
        },
        cream: {
          50: '#fdf3d7',
          100: '#f6ecd0',
          300: '#cfc3a8',
          400: '#b9ad94',
        },
        gold: {
          400: '#f0a63a',
          500: '#e0a85a',
        },
        warm: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
    },
  },
  // Typography is registered once via @plugin in styles.css.
  plugins: [],
};

export default config;
