import React from 'react';
import { AppContent } from '@/types';
import { usePageMeta } from '@/hooks/usePageMeta';
import { useTagFilter } from '@/hooks/useTagFilter';
import { PostCard } from './PostCard';
import { CardGrid } from './ui/CardGrid';
import { PageShell } from './ui/PageShell';
import { SectionHeading } from './ui/SectionHeading';
import { TagFilter, TAG_FILTER_MIN_ITEMS } from './ui/TagFilter';

interface BlogViewProps {
  data: AppContent;
}

export const BlogView: React.FC<BlogViewProps> = ({ data }) => {
  usePageMeta(data.ui.blogTitle, data.ui.blogSubtitle);
  // Tags are localized; switching language clears the filter.
  const { selectedTag, setSelectedTag, toggleTag } = useTagFilter(data);

  // A ?tag= link keeps working even while the filter bar is hidden.
  const showFilter = data.blog.length >= TAG_FILTER_MIN_ITEMS || selectedTag !== null;
  const allTags = Array.from(new Set(data.blog.flatMap(p => p.tags))).sort();
  const filteredPosts = selectedTag
    ? data.blog.filter(p => p.tags.includes(selectedTag))
    : data.blog;

  return (
    <PageShell>
      <SectionHeading as="h1" title={data.ui.blogTitle} subtitle={data.ui.blogSubtitle} />

      {showFilter && (
        <TagFilter tags={allTags} selectedTag={selectedTag} allLabel={data.ui.allTags} onSelect={setSelectedTag} />
      )}

      {filteredPosts.length > 0 ? (
        <CardGrid count={filteredPosts.length}>
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              ui={data.ui}
              headingLevel="h2"
              fromList
              selectedTag={selectedTag}
              onTagClick={showFilter ? toggleTag : undefined}
            />
          ))}
        </CardGrid>
      ) : (
        <div className="text-center py-16">
          <p className="text-warm-500 dark:text-warm-400 mb-4">
            {data.ui.noPostsFound} <strong className="text-accent-700 dark:text-accent-400">{selectedTag}</strong>
          </p>
          <button
            onClick={() => setSelectedTag(null)}
            className="text-accent-700 dark:text-accent-400 font-medium hover:underline"
          >
            {data.ui.clearFilter}
          </button>
        </div>
      )}
    </PageShell>
  );
};
