---
report_date: 2026-09-28
project: nicolas-barcelo-portfolio
repository: ferreret/portfolio
production_url: https://portfolio.nicolasbarcelo.dev
owner: Nicolás Barceló Lozano
status: audit
audience: second-brain
---

# Auditoría UI/UX completa — 2026-09-28

**Alcance:** revisión visual de todas las rutas en producción (escritorio 1440 px y móvil 390 px, tema claro y oscuro, EN y ES), pruebas de comportamiento con Playwright (idioma, tema, teclado, desbordamientos), Lighthouse móvil y una lectura completa del código de UI hecha por un subagente. Parte de la auditoría del 2026-08-14 y no repite lo que ya se resolvió allí.

**Estado de partida:** `main` = `production` = `8e5a5a2` (incluye la cuenta de X y el `npm audit fix` de hoy).

---

## 1. Resumen ejecutivo

El portfolio está **técnicamente sano**. Lighthouse móvil da Performance 91, Accesibilidad 100, Best Practices 100 y SEO 100, con LCP de 3,2 s y CLS 0. Visualmente es sólido: buena tipografía de titulares, paleta cálida coherente y un modo claro muy bien resuelto.

El problema es de **arquitectura de la información y conversión**, no de calidad. La web se lee como un CV extendido, no como un escaparate:

- **Las pruebas llegan tarde.** Los proyectos son la última sección de la home, tras siete bloques. En móvil aparecen a unos 6.500 px de la cabecera.
- **Las fichas no enlazan lo que prueban.** El repositorio de DocScan no se ve en ningún sitio y la demo del reactor solo aparece al final del texto.
- **Contactar cuesta más de lo necesario.** En móvil el contacto está escondido en el menú, en `/contact` no se ve el email y la home no termina con una llamada a la acción.
- **Hay callejones sin salida.** Proyectos y posts terminan sin "siguiente", sin enlace cruzado (el proyecto del reactor y su artículo no se enlazan) y sin CTA.

A esto se suman unos **10 defectos reales**. El más visible es que el post de Claudio desborda en horizontal en móvil. El más dañino para SEO es que el canonical apunta a la home en todas las rutas.

**Recorrido del recruiter (objetivo: menos de 30 s)**

| Pregunta | Estado |
|---|---|
| ¿Qué hace? | ✅ El hero lo dice claro. |
| ¿Quién es? | 🟡 El nombre solo sale en el logo pequeño de la cabecera. |
| ¿Tiene pruebas? | ❌ Proyectos al final, sin enlace a demo ni código. |
| ¿Cómo le contacto? | 🟡 Bien en escritorio; mal en móvil y en `/contact`. |

---

## 2. Métricas de partida

| Lighthouse móvil (home) | 14/08 final | 28/09 |
|---|---|---|
| Performance | 79 | **91** |
| Accesibilidad | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 92 | **100** |
| LCP | 3,9 s | **3,2 s** |
| TBT | 150 ms | 90 ms |
| CLS | — | 0 |

---

## 3. Defectos (bugs): no requieren decisiones de diseño

### Alta

| # | Defecto | Dónde | Efecto |
|---|---|---|---|
| D1 | **`project.link` nunca se muestra** | `ProjectDetail.tsx` (no lo usa); `data/projects/*.ts` sí lo tienen | El repositorio de DocScan es inaccesible desde su ficha; la demo del reactor solo aparece al final del cuerpo |
| D2 | **Canonical estático a la home** en todas las rutas; `og:url` tampoco cambia | `index.html:22`, `hooks/usePageMeta.ts` | Google puede consolidar proyectos y posts en la home |
| D3 | **Scroll horizontal en móvil en `/blog/4`**: tags sin `flex-wrap` | `BlogPostDetail.tsx:31` | Página de 492 px en una ventana de 368 px (verificado en producción) |
| D4 | **El email no se ve en `/contact`**: solo hay `mailto:`, y la copia del footer falla en silencio | `ContactSection.tsx`, `App.tsx` | Sin cliente de correo (webmail, equipos corporativos) no hay forma de conseguir el email |

### Media

| # | Defecto | Dónde |
|---|---|---|
| D5 | En ES quedan cadenas en inglés: `aria-label` ("Main navigation", "Copy email", "LinkedIn profile", "X profile"), "Top Languages", el alt del gráfico, título y meta descripción de la home | `Header`, `Footer`, `GitHubStats`, `usePageMeta`, `CVView` |
| D6 | El botón de idioma muestra el idioma **actual** y su nombre accesible describe el **destino** (incumple WCAG 2.5.3, Label in Name) | `Header.tsx:58-86` |
| D7 | El tema se guarda en la primera visita sin que el usuario lo elija, y desde entonces ignora `prefers-color-scheme` | `App.tsx:72-79` |
| D8 | Las tarjetas de `/contact` aparecen, desaparecen y vuelven a aparecer (`forwards` con `animationDelay`) | `styles.css:22` |
| D9 | "Ver proyectos" y "Volver" son `<button onClick={navigate}>`: sin Ctrl+clic, y "Volver" mete una entrada nueva en el historial | `HomeView`, `ProjectDetail`, `BlogPostDetail` |
| D10 | Los filtros de tags se pierden al volver del detalle, no van en la URL y no tienen `aria-pressed` | `ProjectsView`, `BlogView` |
| D11 | No hay ErrorBoundary: si falla la carga de un chunk (por ejemplo, una pestaña abierta durante un deploy), la página queda en blanco. Además, `fallback={null}` hace que el footer suba pegado al header mientras carga | `App.tsx` |
| D12 | Contrastes AA que fallan (calculados): tags de las tarjetas (4,40 en claro, 4,07 en oscuro), fecha de Formación (3,36-3,75), `.cv-heading` (3,74, también en el PDF) y el punto de color de Lua (1,06) | varios |
| D13 | El menú móvil no se cierra con Escape ni al tocar fuera, no mueve el foco y no se cierra al tocar la ruta actual | `Header.tsx` |
| D14 | Áreas táctiles de menos de 44 px: idioma (28×26), tema y menú, "Volver" (~20 px de alto), chips de tag pegados al enlace de la tarjeta | `Header`, fichas, listados |
| D15 | El ticker de actividad inserta unos 300 px al cargar (salto de maquetación y scroll mal restaurado), y `activity.json` se pide dos veces | `ActivityTicker`, `GitHubStats` |

### Baja

- Cursivas sintéticas en el CV (no se carga el eje `ital`) y pesos de fuente que se cargan sin usarse.
- Artículos: saltan de `h1` a `h3`, con clases inline que pisan `prose` y un `<pre>` en gris fuera de la paleta.
- Fechas del blog en texto crudo (ISO en EN, DD-MM-YYYY en ES), sin `<time dateTime>`.
- Imágenes sin `width`/`height`; el gráfico de ghchart sin fallback si el servicio cae.
- El hero queda 24 px desalineado respecto al resto de contenedores a partir de unos 1.200 px.
- `/cv` está en el sitemap, pero no tiene selector de idioma y no se adapta al móvil.
- Avatar del post: `favicon.png` de 64 px, borroso en pantallas 2x.
- CSS muerto o duplicado: `.animate-fade-in` definido dos veces, `.text-gradient` y `.animate-bar` sin uso.
- `useFadeInOnScroll` muta el DOM por fuera de React y deja secciones a `opacity: 0` al imprimir o al buscar con Ctrl+F.
- `ScrollProgress` hace un `setState` por evento de scroll y anima `width`.
- Doble fundido en cada cambio de ruta; el zoom de las imágenes no respeta `reduced-motion`.
- Sin `color-scheme: dark` ni `theme-color`; las barras de scroll usan tonos slate, fuera de la paleta.

---

## 4. Diseño y experiencia: propuestas (opinables)

### 4.1 Arquitectura de la home (el cambio de más impacto)

Orden actual: Hero → Sobre mí y cifras → Tecnologías → Actividad → GitHub → Trayectoria → Formación y certificaciones → **Proyectos** → Footer.

Orden propuesto, contando una historia de "quién soy → qué he hecho → cómo trabajo → hablemos":

1. **Hero:** nombre y ubicación como antetítulo, el lema, una línea de propuesta de valor y tres CTAs (Proyectos · CV · Contacto, este último visible también en móvil).
2. **Proyectos seleccionados**, justo después del hero, con distintivos de "Demo en vivo" y "Código".
3. **Sobre mí y cifras**, más breve.
4. **Últimos artículos:** 2-3 posts. Hoy el blog no aparece en la home.
5. **Trayectoria** compacta, con enlace al CV completo.
6. **Tecnologías** condensadas, sin tarjetas de altura igual y medio vacías.
7. **Código abierto:** actividad y GitHub en una sola sección con los colores del sitio. El ticker con un único elemento parece abandonado.
8. **Formación y certificaciones.**
9. **CTA de cierre "Hablemos"** antes del footer.

### 4.2 Fichas de proyecto y de post

- **Barra de CTAs bajo el título:** "Demo en vivo" y "Ver código" (arregla D1).
- **Bloque final:** siguiente proyecto o post, enlace cruzado entre el proyecto y su artículo, y CTA de contacto.
- **Problema y Solución** en párrafos o viñetas: hoy son bloques de 8-11 líneas sin respiro. Solo es darles formato al contenido real, sin reescribirlo.
- **Tipografía del cuerpo unificada:** el bloque "Demo & code" (HTML de `content`) usa un cuerpo mayor que los campos estructurados.
- **"Impact" pasa a "En cifras / Key figures":** en DocScan las cifras son de código, no de impacto.

### 4.3 Listados

- **Rejillas según el número de elementos:** 2 proyectos en 3 columnas dejan un hueco a la derecha.
- **Ocultar los filtros de tags hasta tener unos 6 elementos:** hoy hay 7 tags para 2 proyectos y 11 para 3 posts, y en móvil ocupan 4-5 filas.
- **`/projects` titulado "Proyectos":** ahora se llama "Featured Projects" y lista todos.

### 4.4 Sistema visual

- **Un solo sistema de botones:** el primario está copiado 6 veces con variaciones, y el 404 usa un primario turquesa que no aparece en ningún otro sitio.
- **Componentes compartidos:** `ProjectCard`, `PostCard` y `TagFilter` (hoy hay 3 copias casi iguales, con títulos `text-lg` en unas y `text-xl` en otras), y un `PageShell` para los márgenes superiores (`pt-24`/`pt-28`/`pt-32` sin criterio).
- **Ritmo de fondos:** hay secciones contiguas con el mismo fondo.
- **Indicador de página activa en la navegación** además del color (subrayado).
- **Footer:** añadir GitHub y los enlaces de navegación; quitar "Built with React & Tailwind".

### 4.5 Dirección estética (necesita tu decisión)

Pendiente desde agosto:
- **Portadas de proyecto** art-directed: marco común, fondo de la paleta y captura recortada o en perspectiva.
- **GitHub con los colores del sitio:** el mapa de actividad en escala de turquesa y los lenguajes con colores de la paleta. En oscuro, las casillas casi blancas chocan mucho.
- **Acento turquesa frente a dorado de la `og-image`.**
- **Tratamiento de la foto** (hoy es un selfie en un jardín, sin tratar).
- **Aire del hero en escritorio.**

### 4.6 Microcopy

- **EN:** unificar mayúsculas: frase normal en todo ("View projects", "Read article", "Contact me").
- **ES:** el Title Case no es normativo. "Ver proyectos", "Tecnologías principales", "Trayectoria profesional", "Leer artículo"…
- **ES:** "Insights Técnicos" pasa a "Notas técnicas" o "Blog técnico"; "Educación" a "Formación"; "3 min lectura" a "3 min de lectura".
- **"Experience that counts"** titula un "Sobre mí".

### 4.7 Estructurales (más grandes; conviene hacerlos juntos)

- Prerender o SSG, idioma en la URL (`/es/...`) con `hreflang`, y slugs en lugar de ids numéricos (`/projects/batch-reactor…`).

---

## 5. Preguntas para Nicolás (contenido: no se toca sin su OK)

1. **"ToMakeUp"**: aparece en rojo en todas las capturas de la app del reactor (portada, detalle y artículo). ¿Es el nombre en clave original del TFM que se decidió no publicar el 22/04/2026? Si lo es, hay que regenerar o recortar las capturas.
2. **Cifras:**
   - "24+ años en Tecnomedia": noviembre de 2002 son 23 años y 10 meses a hoy.
   - "25+ años en tech": desde octubre de 1999 son casi 27.
3. **Certificaciones:**
   - "PCEP-31-03 – Certified Associate in Python": ¿es PCAP-31-03?
   - "Tensorflow" debería escribirse "TensorFlow".
4. **Capturas de las apps en español en la versión EN** del reactor. ¿Se aceptan o hacemos versiones en inglés?
5. **`/cv`**: ¿página pública (adaptarla al móvil y añadir selector de idioma) o solo herramienta de impresión (`noindex` y fuera del sitemap)?

---

## 6. Plan propuesto

| Fase | Contenido | Decisiones necesarias |
|---|---|---|
| **1. Defectos** | D1-D15 y los de prioridad baja más baratos | Ninguna (salvo el texto de los CTAs de demo y código) |
| **2. Arquitectura y conversión** | Nuevo orden de la home, CTA de contacto en móvil y de cierre, blog en la home, final de las fichas, rejillas y filtros, sistema de botones y componentes compartidos, microcopy | Visto bueno al orden y a los textos |
| **3. Dirección estética** | Portadas, GitHub, acento, foto, hero | Elegir dirección (se prepararán 2-3 maquetas) |
| **4. Estructural** | Prerender, `/es/`, slugs, `hreflang` | Decidir si merece la pena ahora |

Todo en una rama propia, con diff y vista previa antes de subir a `production`.
