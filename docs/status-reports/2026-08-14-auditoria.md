---
report_date: 2026-08-14
project: nicolas-barcelo-portfolio
repository: ferreret/portfolio
production_url: https://portfolio.nicolasbarcelo.dev
owner: Nicolás Barceló Lozano
status: active-development
audience: second-brain
session: auditoria-completa-p1-p4
---

# Informe de Estado — Auditoría completa + ejecución P1-P4

**Fecha:** 2026-08-14 (segunda sesión del día; ver `2026-08-14.md` para la primera)
**Estado general:** Auditoría integral del portfolio (código, SEO, accesibilidad, rendimiento, infra y estética) ejecutada y **las cuatro prioridades resueltas y desplegadas el mismo día**. Lighthouse móvil: Performance 62→79, Accesibilidad 93→**100**, LCP 9,0 s→3,9 s.

---

## 1. Resumen ejecutivo

Nicolás pidió una auditoría completa "en todos los aspectos, estética incluida". Se ejecutó con **3 subagentes en paralelo** (calidad de código React, SEO+accesibilidad, rendimiento+infra), una **revisión estética propia** con capturas de todas las rutas (desktop/móvil, claro/oscuro, vía Playwright) y **Lighthouse** contra producción como línea base.

La auditoría produjo ~40 hallazgos organizados en 4 prioridades + estética. Las conclusiones principales: el sitio era **visualmente sólido pero casi invisible para buscadores** (cero `<a href>` hacia las páginas de detalle, sin sitemap, sin títulos por ruta) y **pesado en móvil** (home ~1,3 MB, LCP 9 s, con un PNG de 881 kB como imagen hero y favicon a la vez). El código estaba limpio pero su único quality gate estaba ciego: **`@types/react` nunca estuvo instalado** y sin `strict`, todo React era `any` silencioso.

Las prioridades P1-P4 se ejecutaron en la misma tarde en 5 commits, cada uno verificado en local (navegador) y en producción tras el deploy.

---

## 2. Hallazgos y ejecución por bloque

### P1 — Visibilidad y primera impresión (`2decebb`)

- **Tarjetas como `<Link>` reales** (patrón stretched-link) en ProjectsView, BlogView y HomeView: hrefs rastreables, Ctrl+clic, teclado nativo, pills de tags por encima del overlay (z-10). Un solo cambio resolvió el hallazgo #1 de SEO y el #1 de a11y.
- **`sitemap.xml`** (10 rutas) + **`robots.txt`** con línea Sitemap. El skill `add-content-item` ahora incluye el paso de mantener el sitemap.
- **`usePageMeta`**: título y meta description por ruta en las 8 vistas.
- **Canonical, twitter:card y JSON-LD Person** en `index.html`.
- **`profile.png` 881 kB → `profile.webp` 47 kB** (era el LCP), favicon propio, preconnect a Google Fonts.
- **nginx**: fuera `no-transform` (desbloqueó el **brotli de Cloudflare**: bundle 136→~100 kB servidos), gzip nivel 6, `no-cache` en `index.html` (riesgo real de página en blanco post-deploy con los 404 de assets cacheados 4 h por CF), assets `immutable` con webp/woff2, security headers (nosniff, X-Frame-Options, Referrer-Policy).

### P2 — Bugs y calidad (`3178d18`, `895a866` + 2 fixes incluidos en P1)

Bugs de UX corregidos: filtro de tags roto al cambiar idioma, texto de estado vacío incorrecto en blog, **doble entrada en historial del menú móvil** (Back necesitaba dos toques), **modo oscuro sin persistir y con flash** (localStorage + script inline pre-paint), Back/Forward restaurando posición de scroll.

Calidad: **`strict: true`** en tsconfig — el fallout reveló que `@types/react` no estaba instalado (React entero era `any` para el hook `tsc`); con los tipos instalados, el código pasó strict con **cero errores**. `AnimatedNumber` entiende formatos ES (`19.776`), `GitHubStats` con `res.ok`/AbortController, `copyEmail` sin timeouts solapados, ids desconocidos renderizan 404 real conservando la URL, 6 strings de UI muertos eliminados, globs de Tailwind acotados (barrían `node_modules`), plugin typography desduplicado (hash CSS idéntico — cero cambio visual).

### P3 — Accesibilidad (`e89de8c`) → **Lighthouse 100**

- **Contraste WCAG AA** con ratios calculados contra la paleta: metadatos `warm-400→500` (con par `dark:warm-400`), texto pequeño `accent-600→700` (incl. enlaces `prose-a` de artículos), footer entero a `warm-400` (6,9:1), CTA del 404 a `accent-700` en ambos temas. El texto grande (hero, métricas, 404) se quedó en `accent-600` — pasa su umbral de 3:1.
- **Skip-link localizado** como primer elemento del DOM; `<main>` enfocable; **foco al contenido en cada navegación** (respetando carga inicial y POP).
- `prefers-reduced-motion` extendido a todas las animaciones (`fade-in-up`, `soft-ping`, `bar`, secciones `data-reveal` forzadas visibles).
- Jerarquía de headings sin saltos (h4→h3 en skills y Top Languages; títulos de tarjeta h3→h2).
- **aria-labels localizados** (usuarios de lector de pantalla en ES oían controles en inglés); región viva del "¡Copiado!" siempre montada.

### P4 — Rendimiento, segunda pasada (`5fc1c89`)

- **Dieta WebP**: ~1,9 MB → ~0,5 MB en imágenes de contenido (artículo Claudio 1.050→282 kB; about-me 449→29 kB; portadas y capturas). `width`/`height` explícitos y `loading="lazy"` en todas — **paridad EN/ES auditada por el subagente bilingüe** (aprobado). `og-image.png` cuantizado 487→286 kB (PNG para scrapers, bajo el umbral de WhatsApp).
- **Cerrado el diferido de la auditoría de abril**: `scripts/fetch-activity.mjs` precalcula los language stats en `activity.json` y `GitHubStats` lee de ahí — **cero llamadas a `api.github.com` desde el navegador del visitante** (límite sin auth: 60 req/h por IP). Fallo del paso de stats nunca bloquea el ticker.
- **Code splitting por ruta**: `React.lazy` en todas las vistas salvo la home — 6 chunks, bundle principal 377→350 kB (gzip 116,7→111,3).

---

## 3. Métricas — Lighthouse móvil contra producción

| Categoría | Baseline (14:00) | Final (16:00) |
|---|---|---|
| Performance | 62 | **79** |
| Accesibilidad | 93 | **100** |
| Best Practices | 100 | 100 |
| SEO | 92 | 92* |
| LCP | 9,0 s | **3,9 s** |
| TBT | 260 ms | **150 ms** |

*El score de SEO de Lighthouse solo audita lo técnico de la home; la ganancia real (páginas de detalle rastreables, sitemap, títulos) se materializará cuando Google recorra el sitio. El audit de robots.txt seguía viendo la copia vieja cacheada en el edge de Cloudflare (Age ~1h, caduca sola).

Transferencia de la home móvil: de ~1,3 MB a ~350 kB efectivos (imagen hero 881→47 kB, brotli en el bundle, fuentes con preconnect).

---

## 4. Incidencias y aprendizajes de la sesión

1. **Carrera con el ticker**: el cron de las 13:00 UTC empujó `1503b3e` mientras se preparaba el push de P1 → primer push rechazado (el `tail -1` se comió el error; lo delató el hint de fast-forwards). Rebase limpio y a partir de ahí `git pull --rebase` sistemático antes de cada push. Confirmó de paso que cron y autodeploy funcionan tras el rename de la mañana.
2. **Artefacto del Browser pane oculto**: los `loading="lazy"` parecían no cargar en la verificación — el panel oculto no compone frames y el lazy-load nunca dispara. Playwright (que sí compone) confirmó todo cargando. Anotado en memoria para futuras verificaciones.
3. **El hook `tsc-on-edit` reporta errores transitorios** en lotes de edits interdependientes; el criterio es el `npx tsc` final, no los avisos intermedios. También anotado.

---

## 5. Estado del repositorio

| Rama | HEAD | Estado |
|---|---|---|
| `main` / `production` | `5fc1c89` (+ este informe) | Idénticas, desplegadas y verificadas |

Commits de la sesión: `2decebb` (P1 SEO/perf), `3178d18` (P2 UX), `895a866` (P2 calidad/strict), `e89de8c` (P3 a11y), `5fc1c89` (P4 perf). Salud: `tsc --noEmit` **en modo strict** limpio; build 350 kB + 6 chunks; dos auditorías del subagente bilingüe aprobadas durante la sesión.

---

## 6. Trabajo pendiente

1. **Estética** (bloque propio, decisiones de diseño de Nicolás): portadas de proyecto art-directed (los screenshots crudos chocan entre sí y el banner rojo del reactor rompe la paleta), tematizar la sección GitHub (verdes de GitHub + colores de lenguajes ajenos a la paleta warm/teal; ilegible en móvil), unificar el acento del sitio (teal) con la identidad del og-image (dorado), tratamiento de la foto de perfil, hero desktop con menos aire.
2. **Perf profunda opcional**: prerender/SSG (LCP 3,9→~2 s + OG por ruta, resolvería el resto estructural de SPA), self-host de fuentes, sacar los cuerpos de artículos del bundle principal.
3. Los diferidos menores del informe de código: refactor de `useFadeInOnScroll` (muta DOM tras React), residuos varios.

---

## 7. KPIs — evolución de la sesión

- **Lighthouse a11y**: 93 → **100**
- **LCP móvil**: 9,0 s → **3,9 s** (−57%)
- **Peso de imágenes de contenido**: ~1,9 MB → **~0,5 MB** (−74%)
- **Llamadas a APIs de terceros desde el navegador del visitante**: 1 → **0**
- **Rutas indexables por Google**: 1 (home) → **10** (todas)
- **Quality gate**: tsc sin strict y con React `any` → **strict + tipos reales, cero errores**
- **Hallazgos de auditoría resueltos**: ~34 de ~40 (quedan estética + prerender)

---

*Fin del informe.*
