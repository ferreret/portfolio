import React from 'react';

interface PageShellProps {
  /** 'wide' for listings, 'narrow' for reading pages. */
  width?: 'wide' | 'narrow';
  /** Reading pages sit on a white sheet; listings on the page background. */
  surface?: 'page' | 'sheet';
  className?: string;
  children: React.ReactNode;
}

// Shared top offset (clears the fixed header), bottom spacing and container for
// every non-home page, so they all start at the same height.
export const PageShell: React.FC<PageShellProps> = ({ width = 'wide', surface = 'page', className = '', children }) => (
  <div
    className={`pt-28 pb-20 min-h-screen ${
      surface === 'sheet' ? 'bg-white dark:bg-warm-900 transition-colors duration-300' : ''
    } ${className}`}
  >
    <div className={`${width === 'wide' ? 'max-w-6xl' : 'max-w-3xl'} mx-auto px-6 lg:px-8`}>{children}</div>
  </div>
);
