import React from 'react';
import { useParams } from 'react-router-dom';
import { AppContent } from '@/types';
import { BackLink } from './BackLink';
import { usePageMeta } from '@/hooks/usePageMeta';
import { NotFound } from './NotFound';

interface BlogPostDetailProps {
  data: AppContent;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const post = data.blog.find(p => p.id === id);
  usePageMeta(post?.title, post?.excerpt, { skip: !post });

  if (!post) {
    return <NotFound data={data} />;
  }

  return (
    <div className="pt-24 pb-20 animate-fade-in min-h-screen bg-white dark:bg-warm-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <BackLink to="/blog" label={data.ui.backToBlog} />

        <header className="mb-10">
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold tracking-wider uppercase text-accent-700 dark:text-accent-400">{tag}</span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-warm-500 dark:text-warm-400 border-b border-warm-100 dark:border-warm-800 pb-8">
            <img src="/profile.webp" alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-medium text-warm-900 dark:text-warm-50 text-sm">{data.profile.name}</div>
              <div className="text-xs tabular-nums">{post.date} &middot; {post.readTime}</div>
            </div>
          </div>
        </header>

        <div
          className="prose prose-stone dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-accent-700 dark:prose-a:text-accent-400 prose-code:[overflow-wrap:anywhere] prose-custom"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};
