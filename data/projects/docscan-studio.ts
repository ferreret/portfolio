import { ProjectItem } from '../../types';

const problemEn = `DocScan Studio starts from an existing document-capture product built on .NET 10 and WPF. It runs only on Windows, depends on a licensed commercial imaging SDK and is in production in hospitals.`;

const problemEs = `DocScan Studio parte de un producto de captura documental ya existente, hecho en .NET 10 y WPF. Solo funciona en Windows, depende de un SDK de imagen comercial con licencia y está en producción en hospitales.`;

const solutionEn = `DocScan Studio is its cross-platform reimplementation in Python, for Linux and Windows, with functional parity as a requirement: the same logic, the same configuration keys and the same tokens. Where the original product's code contradicts its manual, the manual is followed, and any deviation needs an explicit decision. Free libraries take the place of the licensed SDK (OpenCV, pyzbar, zxing-cpp, PyMuPDF), and scanners are driven through SANE on Linux and TWAIN or WIA on Windows.

Generative AI (Claude or OpenAI) is only used to configure applications, never to read the documents. The interface is available in Spanish, English and Catalan, and there are installers for Linux (AppImage) and Windows (setup.exe).`;

const solutionEs = `DocScan Studio es su reimplementación multiplataforma en Python, para Linux y Windows, con la paridad funcional como requisito: la misma lógica, las mismas claves de configuración y los mismos tokens. Cuando el código del producto original contradice su manual, se sigue el manual, y cualquier desviación necesita una decisión explícita. Bibliotecas libres ocupan el lugar del SDK con licencia (OpenCV, pyzbar, zxing-cpp, PyMuPDF), y los escáneres se manejan por SANE en Linux y por TWAIN o WIA en Windows.

La IA generativa (Claude u OpenAI) solo se usa para configurar las aplicaciones, nunca para leer los documentos. La interfaz está en castellano, inglés y catalán, y hay instaladores para Linux (AppImage) y Windows (setup.exe).`;

const contentEn = `
      <h3>How it works</h3>
      <p>Each kind of capture is set up as an <strong>application</strong>: a profile with its own pipeline, fields, scripts and transfer, chosen in the launcher. A batch of paper goes through four steps:</p>
      <ol>
        <li><strong>Capture.</strong> Pages are scanned through SANE (Linux) or TWAIN or WIA (Windows), also from an automatic feeder, or imported as TIFF, JPEG, PNG, BMP or PDF. Blank pages can be detected.</li>
        <li><strong>Process.</strong> Each page goes through the application's pipeline, in the configured order: image operations (24, such as deskew or crop), barcode reading (2 engines, up to 15 symbologies), OCR (3 engines) and Python scripts. The result for each page is deterministic.</li>
        <li><strong>Review and index.</strong> The Workbench shows the pages, their barcodes, their text and the batch fields. A barcode can mark a page as a separator, and each separator starts a new document; a page can also be marked by hand.</li>
        <li><strong>Transfer.</strong> Each document, or the whole batch, is written as PDF, PDF/A or multipage TIFF, named by a pattern or by a script, or goes to a folder or out as a CSV index. Names, paths and images are checked before anything is written, and multipage files are written atomically.</li>
      </ol>
      <p>An <strong>unattended worker</strong> processes batches with nobody at the screen: it watches an input folder and runs whatever arrives through the same flow as the interface.</p>
      <p>Applications are set up in the <strong>Configurator</strong> or by talking to <strong>AI Mode</strong>. For example, asked for "an application for supplier invoices: one PDF per invoice, split by the Code128 on the first page", it creates the steps (deskew, barcodes, OCR), the separator condition and the transfer. Every change is shown before it is applied, to be accepted or rejected.</p>
`;

const contentEs = `
      <h3>Cómo funciona</h3>
      <p>Cada tipo de captura se configura como una <strong>aplicación</strong>: un perfil con su propio pipeline, campos, scripts y transferencia, que se elige en el launcher. Un lote de papel pasa por cuatro pasos:</p>
      <ol>
        <li><strong>Capturar.</strong> Las páginas se escanean por SANE (Linux) o por TWAIN o WIA (Windows), también con alimentador automático, o se importan como TIFF, JPEG, PNG, BMP o PDF. Se pueden detectar las páginas en blanco.</li>
        <li><strong>Procesar.</strong> Cada página pasa por el pipeline de la aplicación, en el orden configurado: operaciones de imagen (24, como enderezar o recortar), lectura de códigos de barras (2 motores, hasta 15 simbologías), OCR (3 motores) y scripts Python. El resultado de cada página es determinista.</li>
        <li><strong>Revisar e indexar.</strong> El Workbench enseña las páginas, sus códigos de barras, su texto y los campos del lote. Un código de barras puede marcar una página como separadora, y cada separadora empieza un documento nuevo; una página también se puede marcar a mano.</li>
        <li><strong>Transferir.</strong> Cada documento, o el lote entero, se escribe como PDF, PDF/A o TIFF multipágina, con un nombre que sale de un patrón o de un script, o va a una carpeta o a un CSV de índices. Antes de escribir se comprueban nombres, rutas e imágenes, y los ficheros multipágina se escriben de forma atómica.</li>
      </ol>
      <p>Un <strong>worker desatendido</strong> procesa lotes sin nadie delante: vigila una carpeta de entrada y pasa lo que llega por el mismo flujo que la interfaz.</p>
      <p>Las aplicaciones se configuran en el <strong>Configurador</strong> o conversando con el <strong>AI Mode</strong>. Por ejemplo, si se le pide «una aplicación para facturas de proveedores: un PDF por factura, separado por el código Code128 de la primera página», crea los pasos (enderezar, códigos de barras, OCR), la condición de separador y la transferencia. Cada cambio se enseña antes de aplicarlo, para aceptarlo o rechazarlo.</p>
`;

const techStack = [
  { category: 'UI', items: ['PySide6 (Qt 6)', 'QSS themes'] },
  { category: 'Language', items: ['Python 3.14'] },
  { category: 'Persistence', items: ['SQLAlchemy 2.x', 'SQLite (WAL)', 'Alembic'] },
  { category: 'Barcode', items: ['pyzbar + OpenCV', 'zxing-cpp'] },
  { category: 'OCR', items: ['RapidOCR', 'EasyOCR', 'Tesseract'] },
  { category: 'AI', items: ['Anthropic SDK', 'OpenAI SDK', 'Tool calling (for configuration)'] },
  { category: 'PDF', items: ['PyMuPDF (PDF/A)'] },
  { category: 'Scanner', items: ['SANE (Linux)', 'TWAIN + WIA (Windows)'] },
  { category: 'Packaging', items: ['PyInstaller', 'AppImage', 'Inno Setup'] },
  { category: 'Testing', items: ['pytest', 'pytest-qt'] },
];

const techStackEs = [
  { category: 'UI', items: ['PySide6 (Qt 6)', 'Temas QSS'] },
  { category: 'Lenguaje', items: ['Python 3.14'] },
  { category: 'Persistencia', items: ['SQLAlchemy 2.x', 'SQLite (WAL)', 'Alembic'] },
  { category: 'Códigos de barras', items: ['pyzbar + OpenCV', 'zxing-cpp'] },
  { category: 'OCR', items: ['RapidOCR', 'EasyOCR', 'Tesseract'] },
  { category: 'IA', items: ['Anthropic SDK', 'OpenAI SDK', 'Tool calling (para configurar)'] },
  { category: 'PDF', items: ['PyMuPDF (PDF/A)'] },
  { category: 'Escáner', items: ['SANE (Linux)', 'TWAIN + WIA (Windows)'] },
  { category: 'Empaquetado', items: ['PyInstaller', 'AppImage', 'Inno Setup'] },
  { category: 'Tests', items: ['pytest', 'pytest-qt'] },
];

export const docscanStudio: { en: ProjectItem; es: ProjectItem } = {
  en: {
    id: "4",
    slug: "docscan-studio",
    title: "DocScan Studio",
    description: "Cross-platform desktop application in Python for batch document capture: scanning, image processing, barcode reading, OCR and export document by document, through a composable pipeline. It reimplements a product that runs only on Windows and is in production in hospitals. Generative AI is used to configure applications, not to read the documents.",
    tags: ["Python", "PySide6", "OCR", "Generative AI"],
    imageUrl: "/docscan-studio-v018.webp",
    link: "https://github.com/ferreret/docscan",
    repoUrl: "https://github.com/ferreret/docscan",
    status: 'in-development',
    role: 'Sole developer',
    timeline: 'Started 2026-03-07 · v0.1.0 on 2026-03-26 · v0.1.9 on 2026-10-27',
    problem: problemEn,
    solution: solutionEn,
    businessMetrics: [
      { label: 'Automated tests (0 failing)', value: '1,226' },
      { label: 'Line coverage', value: '75%' },
      { label: 'Latest release', value: 'v0.1.9' },
      { label: 'Real applications ported from the original product', value: '6' },
      { label: 'Versions of the original product analysed (second pass)', value: '19' },
      { label: 'Bugs found by end-to-end smoke runs that unit tests missed', value: '3' },
    ],
    techStack,
    content: contentEn,
  },
  es: {
    id: "4",
    slug: "docscan-studio",
    title: "DocScan Studio",
    description: "Aplicación de escritorio multiplataforma en Python para la captura masiva de documentos: escaneo, tratamiento de imagen, lectura de códigos de barras, OCR y exportación documento a documento, mediante un pipeline componible. Reimplementa un producto que solo funciona en Windows y está en producción en hospitales. La IA generativa se usa para configurar las aplicaciones, no para leer los documentos.",
    tags: ["Python", "PySide6", "OCR", "IA Generativa"],
    imageUrl: "/docscan-studio-v018.webp",
    link: "https://github.com/ferreret/docscan",
    repoUrl: "https://github.com/ferreret/docscan",
    status: 'in-development',
    role: 'Desarrollador único',
    timeline: 'Inicio 2026-03-07 · v0.1.0 el 2026-03-26 · v0.1.9 el 2026-10-27',
    problem: problemEs,
    solution: solutionEs,
    businessMetrics: [
      { label: 'Tests automáticos (0 en fallo)', value: '1.226' },
      { label: 'Cobertura de líneas', value: '75%' },
      { label: 'Última versión', value: 'v0.1.9' },
      { label: 'Aplicaciones reales portadas del producto original', value: '6' },
      { label: 'Versiones del producto original analizadas (2.ª pasada)', value: '19' },
      { label: 'Bugs hallados por smoke de extremo a extremo que los tests unitarios no veían', value: '3' },
    ],
    techStack: techStackEs,
    content: contentEs,
  }
};
