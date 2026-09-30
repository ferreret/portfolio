import React from 'react';
import { Link } from 'react-router-dom';
import { AppContent, BlogPost } from '@/types';
import { formatPostDate } from '@/lib/formatDate';
import { ArrowRightIcon } from './Icons';
import { CardTags } from './ui/TagFilter';

interface PostCardProps {
  post: BlogPost;
  ui: AppContent['ui'];
  headingLevel?: 'h2' | 'h3';
  /** Set by listings so the detail page's Back link can return in history. */
  fromList?: boolean;
  selectedTag?: string | null;
  onTagClick?: (tag: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, ui, headingLevel: Heading = 'h3', fromList, selectedTag, onTagClick }) => {
  const date = formatPostDate(post.date, ui.locale);
  return (
    <article className="group relative bg-warm-50 dark:bg-warm-800 rounded-xl overflow-hidden border border-warm-200 dark:border-warm-700 hover:border-accent-300 dark:hover:border-accent-700 transition-all duration-300 hover:shadow-lg flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-3 text-xs text-warm-500 dark:text-warm-400 mb-3 tabular-nums">
          <time dateTime={date.iso}>{date.label}</time>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readTime}</span>
        </div>
        <Heading className="font-serif text-xl font-semibold text-warm-900 dark:text-warm-50 mb-3 leading-snug group-hover:text-accent-700 dark:group-hover:text-accent-400 transition-colors">
          <Link
            to={`/blog/${post.id}`}
            viewTransition
            state={fromList ? { fromList: true } : undefined}
            className="focus:outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-accent-500"
          >
            {post.title}
          </Link>
        </Heading>
        <p className="text-warm-600 dark:text-warm-400 mb-5 flex-1 line-clamp-3 text-sm leading-relaxed">{post.excerpt}</p>
        <CardTags tags={post.tags} selectedTag={selectedTag} onTagClick={onTagClick} className="mb-5" />
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 dark:text-accent-400 mt-auto">
          {ui.readArticle} <ArrowRightIcon />
        </span>
      </div>
    </article>
  );
};
