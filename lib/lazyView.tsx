import React from 'react';

export type LazyView<P> = React.FC<P> & {
  /** Loads the view's code ahead of rendering it. */
  preload: () => Promise<void>;
};

// React.lazy with a way to load the chunk up front. Once preloaded, the view
// renders synchronously instead of suspending: a prerendered page can then be
// hydrated in a single pass, with no Suspense boundary left waiting for its
// chunk (one that an early re-render above it would throw away and re-render).
export function lazyView<P extends object>(load: () => Promise<React.ComponentType<P>>): LazyView<P> {
  let Loaded: React.ComponentType<P> | null = null;
  const Lazy = React.lazy(() => load().then(component => ({ default: component })));

  const View: LazyView<P> = props => (Loaded ? <Loaded {...props} /> : <Lazy {...props} />);
  View.preload = () => load().then(component => { Loaded = component; });
  return View;
}
