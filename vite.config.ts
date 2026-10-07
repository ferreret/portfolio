import fs from 'fs';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// `vite preview` serves dist/, where every page is its own prerendered
// index.html. Left alone it would answer /blog with the home page's file, so
// map URLs to files the way nginx.conf does in production. Not reproduced here:
// the 301s for the old numeric URLs and the 404 status of unknown ones.
const prerenderedPages = (): Plugin => ({
  name: 'prerendered-pages',
  configurePreviewServer(server) {
    const dist = path.resolve(__dirname, 'dist');
    server.middlewares.use((req, _res, next) => {
      const url = new URL(req.url ?? '/', 'http://localhost');
      const page = url.pathname.replace(/(.)\/+$/, '$1');
      if (!path.extname(page)) {
        const file = /^\/(es\/)?cv$/.test(page)
          ? '/spa.html'
          : fs.existsSync(path.join(dist, page, 'index.html'))
            ? `${page === '/' ? '' : page}/index.html`
            : '/404.html';
        req.url = `${file}${url.search}`;
      }
      next();
    });
  },
});

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react(), prerenderedPages()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
