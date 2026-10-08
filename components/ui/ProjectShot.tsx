import React from 'react';

interface ProjectShotProps {
  src?: string;
  /** Empty on cards, where the title next to it already names the project. */
  alt?: string;
  /** 'card': tilted and cropped, as decoration. 'page': facing the reader, whole. */
  variant: 'card' | 'page';
  className?: string;
}

/** One frame for every capture, whatever the app looks like: an amber-lit panel
 *  with the screenshot in a window (see .project-cover / .project-shot in styles.css). */
export const ProjectShot: React.FC<ProjectShotProps> = ({ src, alt = '', variant, className = '' }) => {
  const card = variant === 'card';
  const dot = `rounded-full bg-warm-400 dark:bg-night-500 ${card ? 'w-1.5 h-1.5' : 'w-2 h-2 sm:w-2.5 sm:h-2.5'}`;
  return (
    <div className={`project-cover overflow-hidden ${card ? 'relative aspect-[16/10]' : 'rounded-xl px-4 pt-5 pb-6 sm:px-9 sm:pt-9 sm:pb-11'} ${className}`}>
      <div className={`rounded-lg overflow-hidden bg-white ${card ? 'project-shot absolute left-[13%] top-[15%] w-[88%]' : 'project-shot-flat'}`}>
        <div className={`flex items-center bg-warm-200 dark:bg-night-800 ${card ? 'gap-[5px] h-5 px-[9px]' : 'gap-1.5 h-6 px-3 sm:h-8 sm:px-4 sm:gap-2'}`} aria-hidden="true">
          <span className={dot} />
          <span className={dot} />
          <span className={dot} />
        </div>
        <img src={src} alt={alt} loading={card ? 'lazy' : undefined} className="block w-full h-auto" />
      </div>
    </div>
  );
};
