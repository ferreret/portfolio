import React from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  allLabel: string;
  onSelect: (tag: string | null) => void;
}

// Below this many items, a filter bar is more noise than help.
export const TAG_FILTER_MIN_ITEMS = 6;

export const TagFilter: React.FC<TagFilterProps> = ({ tags, selectedTag, allLabel, onSelect }) => {
  const buttonClass = (active: boolean) =>
    `min-h-10 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
      active
        ? 'bg-warm-900 dark:bg-warm-50 text-white dark:text-warm-900'
        : 'bg-warm-100 dark:bg-warm-800 text-warm-600 dark:text-warm-300 hover:bg-warm-200 dark:hover:bg-warm-700'
    }`;

  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2">
      <button onClick={() => onSelect(null)} aria-pressed={selectedTag === null} className={buttonClass(selectedTag === null)}>
        {allLabel}
      </button>
      {tags.map(tag => (
        <button
          key={tag}
          onClick={() => onSelect(tag === selectedTag ? null : tag)}
          aria-pressed={selectedTag === tag}
          className={buttonClass(selectedTag === tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

interface CardTagsProps {
  tags: string[];
  selectedTag?: string | null;
  /** When set, chips toggle the listing's filter; otherwise they are plain labels. */
  onTagClick?: (tag: string) => void;
  className?: string;
}

export const CardTags: React.FC<CardTagsProps> = ({ tags, selectedTag, onTagClick, className = '' }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {tags.map(tag =>
      onTagClick ? (
        <button
          key={tag}
          onClick={() => onTagClick(tag)}
          aria-pressed={selectedTag === tag}
          className={`relative z-10 text-xs px-3 py-1.5 rounded-full transition-colors ${
            selectedTag === tag
              ? 'bg-accent-700 text-white'
              : 'bg-warm-100 dark:bg-warm-700 text-warm-700 dark:text-warm-200 hover:bg-accent-100 dark:hover:bg-accent-900/30 hover:text-accent-700 dark:hover:text-accent-400'
          }`}
        >
          {tag}
        </button>
      ) : (
        <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-warm-100 dark:bg-warm-700 text-warm-700 dark:text-warm-200">
          {tag}
        </span>
      ),
    )}
  </div>
);
