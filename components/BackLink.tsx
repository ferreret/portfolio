import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LocaleLink as Link } from './ui/LocaleLink';
import { ArrowLeftIcon } from './Icons';

interface BackLinkProps {
  to: string;
  label: string;
}

// A real link to the listing (Ctrl+click, open in new tab). When the visitor came
// from that listing, a plain click goes Back in history instead of pushing a new
// entry, so the browser restores the list's scroll position and tag filter.
export const BackLink: React.FC<BackLinkProps> = ({ to, label }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromList = (location.state as { fromList?: boolean } | null)?.fromList === true;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!fromList || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(-1);
  };

  return (
    <Link
      to={to}
      viewTransition
      onClick={handleClick}
      className="mb-6 -ml-2 inline-flex items-center gap-2 min-h-11 px-2 rounded-md text-warm-500 dark:text-warm-400 hover:text-accent-700 dark:hover:text-accent-400 transition-colors text-sm"
    >
      <ArrowLeftIcon />
      {label}
    </Link>
  );
};
