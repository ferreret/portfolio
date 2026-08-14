import { ProjectItem } from '../../types';

const problemEn = `Internal document-capture workflows relied on a legacy system that was rigid, hard to extend and impossible to adapt to new formats without custom development. Teams needed to batch-scan documents, run OCR and barcode reading, and extract fields from heterogeneous layouts — but every new template required code changes and redeploys.`;

const problemEs = `Los flujos internos de captura de documentos dependían de un sistema legacy rígido, difícil de ampliar e imposible de adaptar a nuevos formatos sin desarrollo a medida. Los equipos necesitaban escanear por lotes, aplicar OCR y lectura de códigos de barras, y extraer campos de layouts heterogéneos — pero cada plantilla nueva requería tocar código y redesplegar.`;

const solutionEn = `DocScan Studio is a cross-platform desktop replacement built around a configurable no-code pipeline: composable steps (image ops, barcode, OCR, scripts) that can be chained without writing code. Two AI layers sit on top: an AI MODE conversational assistant that creates or modifies whole applications from natural language via tool calling, and a per-pipeline Pipeline Assistant that generates steps and event-handler code. Scanner support is abstracted across Linux (SANE) and Windows (TWAIN + WIA), barcode/OCR engines are pluggable, and applications are portable as .docscan JSON bundles.`;

const solutionEs = `DocScan Studio es un reemplazo de escritorio multiplataforma construido sobre un pipeline configurable sin código: pasos componibles (operaciones de imagen, códigos de barras, OCR, scripts) que se encadenan sin programar. Encima hay dos capas de IA: un AI MODE conversacional que crea o modifica aplicaciones completas desde lenguaje natural vía tool calling, y un Pipeline Assistant por pipeline que genera pasos y código de eventos. El soporte de escáner está abstraído sobre Linux (SANE) y Windows (TWAIN + WIA), los motores de códigos de barras/OCR son intercambiables y las aplicaciones son portables como paquetes JSON .docscan.`;

const lessonsEn = [
  'A no-code composable pipeline absorbs 90% of new capture requirements without code changes — the remaining 10% are handled by embedded Python scripts.',
  'Dual barcode engines (pyzbar+OpenCV vs. zxing-cpp) let each profile trade precision for speed; no single engine wins on both axes.',
  'AI tool calling is most useful as a generator of pipeline steps and application scaffolding, not as a runtime component — determinism matters more in the hot path.',
  'pytest-qt from day one paid off: 849 tests made the Python 3.14 upgrade and the AI MODE refactor safe.',
];

const lessonsEs = [
  'Un pipeline componible sin código absorbe el 90% de los requisitos nuevos de captura sin tocar código — el 10% restante se cubre con scripts Python embebidos.',
  'Los motores duales de códigos de barras (pyzbar+OpenCV vs zxing-cpp) permiten elegir precisión o velocidad por perfil; ningún motor gana en ambos ejes.',
  'El tool calling de IA es más útil como generador de pasos y scaffolding de aplicaciones que como componente en runtime — en el camino caliente pesa más el determinismo.',
  'Apostar por pytest-qt desde el día uno compensó: 849 tests hicieron seguros la subida a Python 3.14 y el refactor de AI MODE.',
];

const techStack = [
  { category: 'UI', items: ['PySide6 (Qt)', 'QSS themes'] },
  { category: 'Language', items: ['Python 3.14'] },
  { category: 'Persistence', items: ['SQLAlchemy 2.x', 'SQLite (WAL)'] },
  { category: 'Barcode', items: ['pyzbar + OpenCV', 'zxing-cpp'] },
  { category: 'OCR', items: ['RapidOCR', 'EasyOCR', 'Tesseract'] },
  { category: 'AI', items: ['Anthropic SDK', 'OpenAI SDK', 'Tool calling'] },
  { category: 'PDF', items: ['PyMuPDF'] },
  { category: 'Scanner', items: ['SANE (Linux)', 'TWAIN + WIA (Windows)'] },
  { category: 'Testing', items: ['pytest', 'pytest-qt'] },
];

const techStackEs = [
  { category: 'UI', items: ['PySide6 (Qt)', 'Temas QSS'] },
  { category: 'Lenguaje', items: ['Python 3.14'] },
  { category: 'Persistencia', items: ['SQLAlchemy 2.x', 'SQLite (WAL)'] },
  { category: 'Códigos de barras', items: ['pyzbar + OpenCV', 'zxing-cpp'] },
  { category: 'OCR', items: ['RapidOCR', 'EasyOCR', 'Tesseract'] },
  { category: 'IA', items: ['Anthropic SDK', 'OpenAI SDK', 'Tool calling'] },
  { category: 'PDF', items: ['PyMuPDF'] },
  { category: 'Escáner', items: ['SANE (Linux)', 'TWAIN + WIA (Windows)'] },
  { category: 'Tests', items: ['pytest', 'pytest-qt'] },
];

export const docscanStudio: { en: ProjectItem; es: ProjectItem } = {
  en: {
    id: "4",
    title: "DocScan Studio",
    description: "Cross-platform desktop application for batch document capture, OCR, barcode reading, and AI-powered field extraction with a no-code configurable pipeline.",
    tags: ["Python", "PySide6", "OCR", "Generative AI"],
    imageUrl: "/docscan-studio.webp",
    link: "https://github.com/ferreret/docscan",
    status: 'production',
    role: 'Sole developer',
    timeline: 'Released v0.1.0 — 2026-03-26',
    problem: problemEn,
    solution: solutionEn,
    businessMetrics: [
      { label: 'Automated tests', value: '849' },
      { label: 'Lines of source', value: '19,776' },
      { label: 'Lines of tests', value: '11,618' },
      { label: 'Source files', value: '94' },
      { label: 'Test failures', value: '0' },
      { label: 'Stable release', value: 'v0.1.0' },
    ],
    techStack,
    lessonsLearned: lessonsEn,
  },
  es: {
    id: "4",
    title: "DocScan Studio",
    description: "Aplicación de escritorio multiplataforma para captura masiva de documentos, OCR, lectura de códigos de barras y extracción de campos con IA, mediante pipeline configurable sin código.",
    tags: ["Python", "PySide6", "OCR", "IA Generativa"],
    imageUrl: "/docscan-studio.webp",
    link: "https://github.com/ferreret/docscan",
    status: 'production',
    role: 'Desarrollador único',
    timeline: 'Release v0.1.0 — 2026-03-26',
    problem: problemEs,
    solution: solutionEs,
    businessMetrics: [
      { label: 'Tests automáticos', value: '849' },
      { label: 'Líneas de código', value: '19.776' },
      { label: 'Líneas de tests', value: '11.618' },
      { label: 'Ficheros fuente', value: '94' },
      { label: 'Tests en fallo', value: '0' },
      { label: 'Release estable', value: 'v0.1.0' },
    ],
    techStack: techStackEs,
    lessonsLearned: lessonsEs,
  }
};
