import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContent } from '@/types';
import { ArrowLeftIcon } from './Icons';
import { usePageMeta } from '@/hooks/usePageMeta';
import { NotFound } from './NotFound';

interface BlogPostDetailProps {
  data: AppContent;
}

export const BlogPostDetail: React.FC<BlogPostDetailProps> = ({ data }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = data.blog.find(p => p.id === id);
  usePageMeta(post?.title, post?.excerpt, { skip: !post });

  if (!post) {
    return <NotFound data={data} />;
  }

  return (
    <div className="pt-24 pb-20 animate-fade-in min-h-screen bg-white dark:bg-warm-900 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <button onClick={() => navigate('/blog', { viewTransition: true })} className="mt-8 mb-8 flex items-center gap-2 text-warm-400 hover:text-accent-600 dark:hover:text-accent-400 transition-colors text-sm">
          <ArrowLeftIcon />
          {data.ui.backToBlog}
        </button>

        <header className="mb-10">
          <div className="flex gap-2 mb-4">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold tracking-wider uppercase text-accent-600 dark:text-accent-400">{tag}</span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-warm-900 dark:text-warm-50 mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center gap-4 text-warm-400 border-b border-warm-100 dark:border-warm-800 pb-8">
            <img src="/favicon.png" alt={data.profile.name} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-medium text-warm-900 dark:text-warm-50 text-sm">{data.profile.name}</div>
              <div className="text-xs tabular-nums">{post.date} &middot; {post.readTime}</div>
            </div>
          </div>
        </header>

        <div
          className="prose prose-stone dark:prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-a:text-accent-600 dark:prose-a:text-accent-400 prose-custom"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
};
