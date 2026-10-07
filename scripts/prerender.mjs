#!/usr/bin/env node
// Last step of `npm run build`: turns the SPA shell in dist/ into one static
// HTML file per page and language, each with its content already rendered and
// its own <head>, and writes the sitemap. The browser then hydrates that HTML.
//
//   dist/index.html                      /            (English)
//   dist/es/index.html                   /es          (Spanish)
//   dist/projects/<slug>/index.html      /projects/<slug>  … and so on
//   dist/spa.html                        bare shell, for /cv (see nginx.conf)
//   dist/404.html                        bare shell, served with a 404 status
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');
const ROOT_SLOT = '<div id="root"></div>';

const { pages, render, SITE_URL, LANGUAGES, localePath } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

const escapeAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Rewrites one tag of the shell's <head>; a tag that is missing means index.html
// drifted from what this script expects, so fail the build rather than ship stale meta.
function replaceOnce(html, pattern, replacement, what) {
  if (!pattern.test(html)) throw new Error(`prerender: ${what} not found in index.html`);
  return html.replace(pattern, () => replacement);
}

const metaTag = (attr, key, content) => `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;

function withHead(shell, meta, extraHead = '') {
  let html = shell;
  html = replaceOnce(html, /<html lang="[^"]*">/, `<html lang="${meta.language}">`, '<html lang>');
  html = replaceOnce(html, /<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`, '<title>');
  html = replaceOnce(html, /<meta name="description" content="[^"]*" \/>/, metaTag('name', 'description', meta.description), 'meta description');
  html = replaceOnce(html, /<meta property="og:title" content="[^"]*" \/>/, metaTag('property', 'og:title', meta.title), 'og:title');
  html = replaceOnce(html, /<meta property="og:description" content="[^"]*" \/>/, metaTag('property', 'og:description', meta.description), 'og:description');
  html = replaceOnce(html, /<meta property="og:url" content="[^"]*" \/>/, metaTag('property', 'og:url', meta.canonical), 'og:url');
  html = replaceOnce(html, /<meta name="twitter:title" content="[^"]*" \/>/, metaTag('name', 'twitter:title', meta.title), 'twitter:title');
  html = replaceOnce(html, /<meta name="twitter:description" content="[^"]*" \/>/, metaTag('name', 'twitter:description', meta.description), 'twitter:description');
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${escapeAttr(meta.canonical)}" />`, 'canonical');

  const added = [
    ...meta.alternates.map(a => `<link rel="alternate" hreflang="${a.hreflang}" href="${escapeAttr(a.href)}" />`),
    ...(meta.noindex ? ['<meta name="robots" content="noindex" />'] : []),
    extraHead,
  ].filter(Boolean);
  return replaceOnce(html, /<\/head>/, `${added.map(tag => `  ${tag}\n`).join('')}</head>`, '</head>');
}

async function write(file, contents) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, contents);
}

const shell = await readFile(resolve(dist, 'index.html'), 'utf8');
if (!shell.includes(ROOT_SLOT)) throw new Error(`prerender: ${ROOT_SLOT} not found in dist/index.html`);

const sitePages = pages();
let count = 0;
for (const page of sitePages) {
  for (const language of LANGUAGES) {
    const { html, meta } = await render(page.path, language);
    if (meta.noindex) throw new Error(`prerender: ${localePath(page.path, language)} rendered as a noindex page (not found?)`);

    // React emits the resource hints it derives from the tree (the hero image
    // preload) ahead of the markup; they belong in <head>.
    const hints = html.match(/^(?:<link [^>]*>)+/)?.[0] ?? '';
    const markup = html.slice(hints.length);
    if (!markup.trim()) throw new Error(`prerender: ${localePath(page.path, language)} rendered empty`);

    const out = withHead(shell, meta, hints).replace(ROOT_SLOT, () => `<div id="root">${markup}</div>`);
    const url = localePath(page.path, language);
    await write(resolve(dist, url === '/' ? 'index.html' : `${url.slice(1)}/index.html`), out);
    count += 1;
  }
}

// The bare shell, kept out of the index wherever it is served from.
const bare = replaceOnce(shell, /<\/head>/, '  <meta name="robots" content="noindex" />\n</head>', '</head>');
await write(resolve(dist, 'spa.html'), bare);
await write(resolve(dist, '404.html'), bare);

// Sitemap: one <url> per page and language, each listing its hreflang pair.
const urlOf = (page, language) => `${SITE_URL}${localePath(page.path, language)}`;
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitePages.flatMap(page => LANGUAGES.map(language => [
    '  <url>',
    `    <loc>${urlOf(page, language)}</loc>`,
    ...(page.lastmod ? [`    <lastmod>${page.lastmod}</lastmod>`] : []),
    ...LANGUAGES.map(alt => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${urlOf(page, alt)}" />`),
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${urlOf(page, 'en')}" />`,
    '  </url>',
  ].join('\n'))),
  '</urlset>',
  '',
].join('\n');
await write(resolve(dist, 'sitemap.xml'), sitemap);

await rm(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${count} pages (${sitePages.length} × ${LANGUAGES.length} languages) and sitemap.xml`);
