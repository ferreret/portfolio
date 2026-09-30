import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** h1 on listing pages, h2 for home sections. */
  as?: 'h1' | 'h2';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, as: Tag = 'h2', className = 'mb-12' }) => (
  <div className={`text-center ${className}`}>
    <Tag
      className={`font-serif font-bold text-warm-900 dark:text-warm-50 ${
        Tag === 'h1' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'
      } ${subtitle ? 'mb-3' : ''}`}
    >
      {title}
    </Tag>
    {subtitle && <p className="text-warm-500 dark:text-warm-400 max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);
