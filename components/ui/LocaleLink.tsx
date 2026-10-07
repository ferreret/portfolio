import React from 'react';
import { Link, LinkProps, NavLink, NavLinkProps } from 'react-router-dom';
import { useLocalePath } from '@/hooks/useLanguage';

// Internal links take language-neutral paths ('/projects'); these wrappers add
// the /es prefix when the current page is in Spanish. Use them for every
// in-site link instead of react-router's Link / NavLink.

export const LocaleLink: React.FC<Omit<LinkProps, 'to'> & { to: string }> = ({ to, ...props }) => (
  <Link to={useLocalePath()(to)} {...props} />
);

export const LocaleNavLink: React.FC<Omit<NavLinkProps, 'to'> & { to: string }> = ({ to, ...props }) => (
  <NavLink to={useLocalePath()(to)} {...props} />
);
