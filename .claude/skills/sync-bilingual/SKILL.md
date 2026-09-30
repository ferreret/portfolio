---
name: sync-bilingual
description: Synchronize a project or blog article between English and Spanish in this portfolio. Given content in one language, produce a faithful translation in the other while preserving HTML structure, technical terms, tone, and length parity. Use after the user has written or updated content in only one language.
---

# sync-bilingual

Sincroniza contenido bilingüe ES↔EN en `data/projects/*.ts` y `data/articles/*.ts`. Toma el bloque que ya está completo en un idioma y genera la versión faltante (o la actualiza si está desactualizada) preservando estructura HTML, tono, longitud y términos técnicos según el glosario.

## Cuándo usar esta skill

- El usuario ha redactado contenido en un idioma (típicamente EN o ES) y la otra versión está vacía, marcada con `[TODO]`, o claramente desactualizada respecto a la primera.
- El usuario pide explícitamente: "traduce esto", "sincroniza el bilingüe", "genera la versión española de este post", etc.
- Tras invocar `add-content-item`, el usuario ha rellenado uno de los dos idiomas y quiere obtener el otro.

**No uses esta skill** para *crear* contenido inventado: si **ambos** idiomas están vacíos, no inventes texto. Pide al usuario que aporte el contenido en al menos un idioma primero.

## Reglas de oro

1. **Paridad estructural HTML obligatoria**: misma cantidad y orden de `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<img>`, etc. Si la versión EN tiene 5 párrafos y 2 secciones, la versión ES debe tener exactamente 5 párrafos y 2 secciones.
2. **Paridad de longitud razonable**: ningún bloque puede ser más del 30% más largo que su contraparte. Si lo es, revisa la traducción.
3. **Atributos HTML idénticos**: `class`, `src`, `alt`, `href`, `target`, `rel` se copian literalmente. **No traducir clases CSS** (`class="mb-4"` se queda igual).
4. **Imágenes**: el `src` no cambia. El `alt` **sí** se traduce (es texto accesible).
5. **Tono natural en cada idioma**: no traducción literal palabra por palabra. El español debe leerse como escrito por un nativo, lo mismo el inglés.
6. **Bajo ningún concepto reformular el sentido** del texto original. Sólo reexpresarlo en el otro idioma.

## Glosario fijo

### Términos que **NO** se traducen (mantener en inglés en ambas versiones)

- **AI / IA**: usar `AI` en inglés, `IA` en español (excepción: traducir el acrónimo)
- **AI Agents** ↔ `Agentes de IA` en prosa española (es lo que busca quien escribe en español; mejor SEO). Se mantiene `AI Agents` en tags, chips de skills y nombres propios
- **Agentic coding** ↔ `agentic coding`
- **LLM**, **LLMs** ↔ `LLM`, `LLMs`
- **RAG**, **RAG Pipelines** ↔ `RAG`, `pipelines RAG`
- **Embedding(s)** ↔ `embedding(s)`
- **Tool calling** ↔ `tool calling`
- **Prompt engineering** ↔ `prompt engineering`
- **Pipeline** ↔ `pipeline` (mantener)
- **Workflow** ↔ `flujo de trabajo` (sí se traduce)
- Nombres de productos: `LangChain`, `LangGraph`, `CrewAI`, `Claude Code`, `Claude`, `Gemini CLI`, `Antigravity`, `OpenAI`, `Anthropic`, `pyzbar`, `OpenCV`, `RapidOCR`, `EasyOCR`, `Tesseract`, `PySide6`, `Qt`, `SQLAlchemy`, `PostgreSQL`, `Docker`, `Vite`, `React`, `TypeScript`, `Tailwind`, `pgvector`, `Qdrant`, `Weaviate`, `Pinecone`, `Ragas`, `LangSmith`, `LangFuse`, `HuggingFace`, `YOLO`, `n8n`, `TensorFlow`, `Power BI` — **siempre se mantienen literales**
- Stack técnico abreviado: `OCR`, `NLP`, `API`, `REST`, `JSON`, `SQL`, `NoSQL` se mantienen
- Nombres propios y empresas: `Tecnomedia`, `NexTReT`, `Datasix`, `IEBS`, `BBVA`, `Microsoft`, `Mallorca`, `Barcelona` se mantienen
- Versiones y fechas técnicas: `v0.1.0`, `Q2 2024` se mantienen

### Términos que **sí** se traducen

- `software engineer` ↔ `ingeniero de software`
- `data scientist` ↔ `científico de datos`
- `senior` ↔ `senior` (mantener — anglicismo aceptado)
- `case study` ↔ `caso de estudio`
- `lessons learned` ↔ `lecciones aprendidas`
- `cross-platform` ↔ `multiplataforma`
- `stack técnico` ↔ `tech stack`
- `barcode reading` ↔ `lectura de códigos de barras`
- `field extraction` ↔ `extracción de campos`
- `desktop application` ↔ `aplicación de escritorio`
- `release` ↔ `release` (mantener)
- `tests` ↔ `tests` (mantener) o `pruebas` (depende del contexto)
- `production` ↔ `producción`

### Convenciones de números y fechas

- **Números grandes**: el inglés usa coma como separador de miles (`19,776`), el español usa punto (`19.776`).
- **Decimales**: inglés punto (`3.14`), español coma (`3,14`).
- **Fechas**: en EN típicamente `YYYY-MM-DD` o `Month DD, YYYY`. En ES `DD-MM-YYYY` o `DD de Mes de YYYY`. **Comprueba qué formato usa el resto del fichero** y mantenlo consistente.

## Proceso paso a paso

### 1. Identificar el fichero y el bloque a sincronizar

- El usuario te dirá el slug o título. Localiza `data/projects/<slug>.ts` o `data/articles/<slug>.ts`.
- Lee el fichero completo.
- Identifica si la versión `en` o la `es` es la **fuente** (la que tiene contenido real) y cuál es el **destino** (la que está incompleta o desactualizada).

### 2. Validar que la fuente está realmente completa

Si la fuente tiene placeholders `[TODO: ...]` o `<!-- TODO -->`, **detente** y pregunta al usuario si quiere primero rellenar la fuente antes de traducir. No traduzcas placeholders.

### 3. Traducir respetando las reglas de oro

- Itera bloque a bloque del HTML (`<h2>`, `<p>`, `<ul>`, etc.)
- Para cada bloque genera el equivalente en el idioma destino aplicando el glosario
- Mantén las clases CSS, los `src` de imágenes, los `href`, etc.
- Traduce los `alt` de imágenes
- Ajusta convenciones numéricas y de fecha
- Preserva listas, énfasis (`<strong>`, `<em>`), código inline (`<code>`)

### 4. Generar también las versiones traducidas de los campos de metadata

No sólo el `content`. También:

- `title` → traducir
- `description` (proyectos) / `excerpt` (artículos) → traducir
- `tags` → si son términos del glosario "no traducir", quedan iguales (`["Python", "OCR"]`); si son términos comunes, traducir (`["IA Generativa"]` ↔ `["Generative AI"]`)
- `readTime` (artículos) → traducir formato (`"3 min read"` ↔ `"3 min de lectura"`)
- `date` → ajustar formato según convención del fichero (ver más arriba)

### 5. Validación de paridad antes de escribir

Antes de hacer la edición, verifica mentalmente:

- ¿Mismo número de tags `<h2>`, `<h3>`, `<p>`, `<ul>`, `<li>`, `<img>` en ambas versiones?
- ¿Mismas clases CSS?
- ¿Longitud parecida (±30%)?
- ¿Glosario respetado?

Si algo no cuadra, **revisa antes de escribir**, no pidas al usuario que lo haga.

### 6. Escribir el fichero

Usa la herramienta `Edit` para sustituir sólo el bloque del idioma destino, **preservando intacto** el bloque fuente. No reescribas el fichero entero si puedes evitarlo.

### 7. Verificar con tsc

El hook `tsc-on-edit` se disparará automáticamente. Si hay errores de tipo, corrígelos.

### 8. Sugerir el siguiente paso

Reporta al usuario:

- Qué se sincronizó (de `en` a `es` o viceversa)
- Si hay campos del schema (`businessMetrics`, `lessonsLearned`, etc.) cuyos valores deberían validarse manualmente porque tienen números o términos delicados
- Sugerir invocar el subagente `bilingual-content-reviewer` para validación final

## Casos especiales

### Citas literales (testimonials, quotes de personas)

**Las citas de personas reales NO se traducen.** Se mantienen en su idioma original (el que la persona usó). El campo `quote` queda idéntico en ambas versiones; sólo `role` puede traducirse.

### Código embebido

`<code>` y bloques `<pre><code>` **no se traducen**. Los comentarios dentro del código sí pueden traducirse si son explicativos para el lector.

### Métricas y números reales

Las métricas reales (ej. "849 tests", "62% reduction") **no se inventan ni se modifican**. Sólo se ajusta el formato de número (coma↔punto) y se traduce la unidad si es genérica ("hours saved" ↔ "horas ahorradas").
