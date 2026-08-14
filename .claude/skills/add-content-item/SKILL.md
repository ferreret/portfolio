---
name: add-content-item
description: Scaffold a new bilingual project or blog article for this portfolio. Creates the data file in data/projects/ or data/articles/ with the EN/ES structure required by the type system, and wires the import + array entries into contentData.ts. Use when the user wants to add a new project, case study, or blog post.
---

# add-content-item

Crea el scaffolding bilingüe ES/EN para un nuevo **proyecto** o **artículo** del portfolio, incluyendo el fichero de datos y la integración en `contentData.ts`. **No genera contenido inventado**: deja placeholders claros para que el usuario (o una invocación posterior de `sync-bilingual`) los rellene con material real.

## Cuándo usar esta skill

- Cuando el usuario diga "añade un proyecto", "nuevo case study", "crea un post de blog", "scaffolds un artículo".
- Cuando se necesite preparar el esqueleto de un nuevo `ProjectItem` o `BlogPost` antes de aportar el contenido real.

**Regla absoluta** (ver `feedback_no_fake_content.md`): **nunca rellenes los campos con texto inventado** (descripciones plausibles, métricas hipotéticas, citas falsas, párrafos genéricos de relleno). Sólo placeholders explícitos del tipo `[TODO: ...]`.

## Argumentos esperados

Pide al usuario (si no los ha dado ya):

1. **Tipo**: `project` o `article`
2. **Título** (en inglés y/o español, lo que tenga el usuario; si solo da uno, usa el mismo en ambos idiomas y márcalo como `[TODO: traducir]`)
3. **(Opcional)** Tags iniciales

## Proceso paso a paso

### 1. Generar el slug

A partir del título en inglés (o el que haya):

- minúsculas
- espacios → `-`
- quitar acentos y caracteres no alfanuméricos
- ejemplos: `"Healthcare Scheduling Agent"` → `healthcare-scheduling-agent`; `"RAG en producción"` → `rag-en-produccion`

### 2. Verificar que el slug no existe

- Para `project`: comprueba que no existe `data/projects/<slug>.ts`.
- Para `article`: comprueba que no existe `data/articles/<slug>.ts`.

Si existe, **detente** y pregunta al usuario si quiere otro slug o sobrescribir.

### 3. Calcular el próximo `id`

- Lee `data/projects/` o `data/articles/` con `Glob`.
- Para cada fichero existente, lee el campo `id` (valor numérico como string, ej. `"3"`, `"4"`).
- El nuevo `id` es `max(existingIds) + 1`, como string.
- Si no hay ficheros, empieza en `"1"`.

### 4. Crear el fichero de datos

Usa la plantilla correspondiente (ver sección **Plantillas** abajo). Sustituye:

- `__SLUG__` por el slug
- `__ID__` por el id calculado
- `__TITLE_EN__` por el título en inglés
- `__TITLE_ES__` por el título en español
- `__VAR_NAME__` por el camelCase del slug (ej. `healthcareSchedulingAgent`)
- `__TAGS__` por las tags si las dio el usuario, o un placeholder

Escribe el fichero en la ruta correcta:

- Proyecto: `data/projects/<slug>.ts`
- Artículo: `data/articles/<slug>.ts`

### 5. Actualizar `contentData.ts`

Hay que hacer **tres ediciones precisas**:

#### 5a. Añadir el import

En la zona de imports al inicio del fichero:

- Para `project`: añade `import { __VAR_NAME__ } from './data/projects/__SLUG__';` debajo del último import en la sección `// Projects`.
- Para `article`: análogo en la sección `// Articles`.

#### 5b. Añadir al array `enContent`

Localiza:

```ts
const enContent: AppContent = {
  ...
  projects: [
    docscanStudio.en
  ],
  blog: [
    aboutMe.en
  ]
};
```

Añade `__VAR_NAME__.en` al array correspondiente (`projects` o `blog`), respetando comas. Por ejemplo:

```ts
  projects: [
    docscanStudio.en,
    healthcareSchedulingAgent.en
  ],
```

#### 5c. Análogo para `esContent`

Localiza el bloque `const esContent: AppContent` (alrededor de la línea 138 actualmente) y haz lo mismo con `__VAR_NAME__.es`.

### 6. Actualizar `public/sitemap.xml`

Añade una entrada `<url>` para la nueva ruta (`/projects/<id>` o `/blog/<id>`) con `<lastmod>` a la fecha de hoy. El sitemap es estático; si no se actualiza, la nueva página no será descubierta por los buscadores.

### 7. Verificación

Después de las ediciones, el hook `tsc-on-edit` se disparará automáticamente. Si tsc reporta errores (campos faltantes, imports rotos, etc.), corrígelos antes de dar la tarea por terminada.

Reporta al usuario:

- Slug usado
- ID asignado
- Ruta del fichero creado
- Próximos pasos sugeridos: rellenar el contenido real (en uno o ambos idiomas), después usar `sync-bilingual` para generar el otro idioma o `bilingual-content-reviewer` para validar.

## Plantillas

### Plantilla `ProjectItem` (data/projects/__SLUG__.ts)

Schema extendido (fase 3). Los campos estructurados (`status`, `problem`, `solution`, `businessMetrics`, `techStack`, `lessonsLearned`, `role`, `timeline`, `architectureDiagram`) son **opcionales**. Déjalos como placeholders `[TODO: ...]` en string o como array vacío con TODO. Si quedan `undefined` no rompen el render. El campo `content` (HTML libre) sigue disponible como fallback pero **no lo uses para proyectos nuevos**: los campos estructurados dan mejor render.

```ts
import { ProjectItem } from '../../types';

export const __VAR_NAME__: { en: ProjectItem; es: ProjectItem } = {
  en: {
    id: "__ID__",
    title: "__TITLE_EN__",
    description: "[TODO: descripción corta en inglés, ~1-2 frases]",
    tags: __TAGS__,
    imageUrl: "/__SLUG__.png",
    link: undefined,
    status: undefined,              // 'production' | 'prototype' | 'archived' | 'in-development'
    role: undefined,                // ej. "Lead architect", "Sole developer"
    timeline: undefined,            // ej. "Q2 2024 - Q4 2024"
    problem: undefined,             // [TODO: 1-2 párrafos sobre el reto a resolver]
    solution: undefined,            // [TODO: 1-2 párrafos sobre la solución adoptada]
    businessMetrics: undefined,     // [{ label: "Tests", value: "849" }, ...] — SOLO números reales
    architectureDiagram: undefined, // path a imagen en /public, ej. "/__SLUG__-arch.png"
    techStack: undefined,           // [{ category: "UI", items: ["React", "Tailwind"] }, ...]
    lessonsLearned: undefined,      // ["Lección 1...", "Lección 2..."]
  },
  es: {
    id: "__ID__",
    title: "__TITLE_ES__",
    description: "[TODO: descripción corta en español, ~1-2 frases]",
    tags: __TAGS__,
    imageUrl: "/__SLUG__.png",
    link: undefined,
    status: undefined,
    role: undefined,
    timeline: undefined,
    problem: undefined,
    solution: undefined,
    businessMetrics: undefined,
    architectureDiagram: undefined,
    techStack: undefined,
    lessonsLearned: undefined,
  }
};
```

### Plantilla `BlogPost` (data/articles/__SLUG__.ts)

```ts
import { BlogPost } from '../../types';

const contentEn = `
  <!-- TODO: contenido del post en inglés, formato HTML con tags <p>, <h3>, <ul>, etc. -->
`;

const contentEs = `
  <!-- TODO: contenido del post en español, paridad de estructura HTML con la versión EN -->
`;

export const __VAR_NAME__: { en: BlogPost; es: BlogPost } = {
  en: {
    id: "__ID__",
    title: "__TITLE_EN__",
    date: "[TODO: YYYY-MM-DD]",
    readTime: "[TODO: X min read]",
    tags: __TAGS__,
    excerpt: "[TODO: excerpt en inglés, 1-2 frases]",
    content: contentEn
  },
  es: {
    id: "__ID__",
    title: "__TITLE_ES__",
    date: "[TODO: DD-MM-YYYY]",
    readTime: "[TODO: X min de lectura]",
    tags: __TAGS__,
    excerpt: "[TODO: excerpt en español]",
    content: contentEs
  }
};
```

## Notas

- Lee `types.ts` antes de generar el scaffolding para confirmar que el schema `ProjectItem` no ha cambiado respecto a esta plantilla. Si hay campos nuevos, inclúyelos como `undefined` o placeholders.
- **Hard rule**: nunca rellenar `businessMetrics`, `problem`, `solution` o `lessonsLearned` con valores inventados. Quedan como `undefined` hasta que el usuario aporte datos reales. Ver `feedback_no_fake_content.md`.
- Convertir `__TAGS__` correctamente:
  - Si el usuario dio `["Python", "OCR"]`: emite `["Python", "OCR"]`
  - Si no dio nada: emite `["[TODO: tag1]", "[TODO: tag2]"]` para que sea visible que falta rellenarlo
- El `imageUrl` apunta a `/__SLUG__.png` que aún no existe; eso lo pone el usuario después en `public/`.
