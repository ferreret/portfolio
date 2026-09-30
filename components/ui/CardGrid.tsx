import React from 'react';

interface CardGridProps {
  count: number;
  children: React.ReactNode;
}

// Columns follow the number of cards, so 2 items don't leave a hole in a 3-column row.
export const CardGrid: React.FC<CardGridProps> = ({ count, children }) => {
  const layout =
    count >= 3 ? 'grid md:grid-cols-2 lg:grid-cols-3' :
    count === 2 ? 'grid md:grid-cols-2 max-w-4xl mx-auto' :
    'grid max-w-xl mx-auto';
  return <div className={`${layout} gap-6`}>{children}</div>;
};
