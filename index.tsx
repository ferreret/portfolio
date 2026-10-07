import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App, { preloadView } from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Pages prerendered at build time arrive with their markup in #root and are
// hydrated; the bare shell (dev server, /cv, unknown URLs) is rendered from scratch.
if (rootElement.hasChildNodes()) {
  const hydrate = () =>
    hydrateRoot(rootElement, app, {
      // A mismatch between the prerendered HTML and the first client render makes
      // React re-render that part from scratch. Say so in the console.
      onRecoverableError: (error, info) => console.error('Hydration mismatch:', error, info.componentStack),
    });
  // Load this page's view first, so the whole page hydrates in one pass. If the
  // chunk fails to load, hydrate anyway and let the app's error boundary handle it.
  preloadView(window.location.pathname).then(hydrate, hydrate);
} else {
  createRoot(rootElement).render(app);
}
