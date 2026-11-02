import { ProjectItem } from '../../types';

const problemEn = `Clinical lab requests arrive on paper and are scanned: several pages, some fields handwritten, forms in different layouts, every insurer with its own way of writing the tests, some of them in Catalan. A technician has to type every field and code every test into the lab's system. Reading the form with a vision model is the easy part: extraction is a commodity. The hard part is a model that is wrong with confidence. A value read wrong and accepted, or a request linked to another patient, is an error nobody notices, and with health data it cannot happen. By health and European regulation, nothing is accepted until the technician who processes the request has checked and approved it.`;

const problemEs = `Las peticiones de laboratorio clínico llegan en papel y se escanean: varias páginas, algunos campos escritos a mano, volantes de formatos distintos, cada mutua con su propia forma de escribir las pruebas, algunas en catalán. Un técnico tiene que teclear cada campo y codificar cada prueba en el sistema del laboratorio. Leer el volante con un modelo de visión es lo fácil: la extracción es commodity. Lo difícil es un modelo que se equivoca con seguridad. Un valor mal leído y aceptado, o una petición asignada a otro paciente, es un error que nadie ve, y con datos de salud no puede pasar. Por normativa sanitaria y europea, nada se da por bueno hasta que el técnico que procesa la petición lo ha revisado y aprobado.`;

const solutionEn = `The model is not the source of truth: it is one more source, and not the highest-priority one. A vision model (Gemini Flash in the cloud, or Qwen run locally, so the document never leaves the machine) reads every field with its box on the page. A fusion engine sets each value against the lab's own records, a mock LIS of patients, physicians and insurers, and gives it a traffic light: green when the document and the records agree or only the records hold it, orange when only the document says so, red when they disagree or a required field is missing. A colour is a signal, never an acceptance: nothing counts until the technician approves the request, an explicit act that records who, when, and the exact values and codes. Each requested test is mapped to the lab's codes from what technicians approved before for that insurer, then from a trigram search of the catalog; only the lines still red go to a model, which may choose only among the search's candidates. Underneath is what makes it engineering: a generator of synthetic requests that knows what it drew, so every document comes with its ground truth, and a harness that scores every change against it. CI regenerates the 200 requests, scores both models' recorded readings and fails if any measure falls below its floor.`;

const solutionEs = `El modelo no es la fuente de verdad: es una fuente más, y no la de mayor prioridad. Un modelo de visión (Gemini Flash en la nube, o Qwen en local, para que el documento no salga de la máquina) lee cada campo con su recuadro en la página. Un motor de fusión contrasta cada valor con los registros del propio laboratorio, un LIS simulado de pacientes, médicos y mutuas, y le pone un semáforo: verde si el documento y los registros coinciden o solo lo tienen los registros, naranja si solo lo dice el documento, rojo si discrepan o falta un campo obligatorio. Un color es una señal, nunca una aceptación: nada cuenta hasta que el técnico aprueba la petición, un acto explícito que registra quién, cuándo, y los valores y códigos exactos. Cada prueba pedida se asigna a los códigos del laboratorio a partir de lo que los técnicos aprobaron antes para esa mutua, y si no, de una búsqueda por trigramas en el catálogo; solo las líneas que siguen en rojo pasan a un modelo, que solo puede elegir entre los candidatos de la búsqueda. Por debajo está lo que lo convierte en ingeniería: un generador de peticiones sintéticas que sabe lo que ha dibujado, así que cada documento trae su verdad de referencia, y un harness que mide cada cambio contra ella. La CI regenera las 200 peticiones, puntúa las lecturas grabadas de los dos modelos y falla si alguna medida cae por debajo de su suelo.`;

const lessonsEn = [
  'The harness came before the screen: without per-field metrics there is no way to know whether a prompt change helped or hurt, so the evaluation was built before the verification UI, and every change since has been measured by the same harness against the synthetic ground truth.',
  "A small gain can be the thresholds fitting the data: mixing local embeddings into the test search seemed to gain a point of coverage, but with thresholds chosen on one half and measured on the other the gain was gone, and end to end embeddings alone doubled the technician's work (4.8% of lines against 2.2%). They stay as measuring tooling, not in the product.",
  "A local model's weak point was its boxes, not its reading: Qwen read the fields almost as well as Gemini, but only 26% of its boxes landed on the value. Placing them with the page's own OCR raised that to 92.5% when it was measured (84.4% on today's set, with the rest drawn as approximate), and the screen says which box came from where: an OCR box was right 97.2% of the time, one left to the model 15.6%.",
  'Garbled text is read again, never patched: now and then an accented letter came back as a tab or another control character ("Est\\tevez"). The boundary detects it, flags it and asks for the reading again instead of guessing the letter.',
  'An audit that only reads the code misses what only shows under load: a visitor reading six documents at once hit "database is locked", which the review had missed and no test caught, since none read more than one document at once. CI now runs the app as its container does, under that load; four visitors reading 50 documents each went from 89 s to 29.',
  'Synthetic data flatters any system: its wording is cleaner than real forms. The numbers show that the method works and is measured, not what it would score on real requests.',
];

const lessonsEs = [
  'El harness llegó antes que la pantalla: sin métricas por campo no hay forma de saber si un cambio de prompt mejora o empeora, así que la evaluación se construyó antes que la interfaz de verificación, y desde entonces cada cambio se mide con el mismo harness contra la verdad de referencia sintética.',
  'Una mejora pequeña puede no ser más que los umbrales ajustándose a los datos: mezclar embeddings locales en la búsqueda de pruebas parecía ganar un punto de cobertura, pero con los umbrales elegidos en una mitad y medidos en la otra la mejora desaparecía, y de punta a punta los embeddings solos doblaban el trabajo del técnico (4,8% de las líneas frente a 2,2%). Se quedan como herramienta de medición, no en el producto.',
  'El punto débil del modelo local eran sus recuadros, no su lectura: Qwen leía los campos casi tan bien como Gemini, pero solo el 26% de sus recuadros caía sobre el valor. Colocarlos con el OCR de la propia página lo subió al 92,5% cuando se midió (84,4% en el conjunto actual, con el resto dibujado como aproximado), y la pantalla indica de dónde viene cada recuadro: uno del OCR acertaba el 97,2% de las veces, uno dejado al modelo el 15,6%.',
  'El texto corrupto se vuelve a leer, nunca se parchea: de vez en cuando una letra acentuada volvía como un tabulador u otro carácter de control («Est\\tevez»). La frontera lo detecta, lo marca y pide la lectura de nuevo en vez de adivinar la letra.',
  'Una auditoría que solo lee el código no ve lo que solo aparece con carga: un visitante que leía seis documentos a la vez se encontró con «database is locked», que la revisión no había visto y ningún test detectaba, porque ninguno leía más de un documento a la vez. Ahora la CI arranca la app como lo hace su contenedor, con esa carga; cuatro visitantes leyendo 50 documentos cada uno pasaron de 89 s a 29.',
  'Los datos sintéticos favorecen a cualquier sistema: están mejor redactados que los volantes reales. Las cifras demuestran que el método funciona y se mide, no lo que sacaría con peticiones reales.',
];

const techStack = [
  { category: 'App', items: ['Next.js (App Router)', 'TypeScript', 'React', 'Tailwind CSS'] },
  { category: 'Extraction', items: ['Gemini Flash', 'Qwen3.6-35B-A3B (local, LM Studio)', 'tesseract.js for the boxes', 'pdf.js'] },
  { category: 'Records and mapping', items: ['SQLite', 'Drizzle', 'Mock LIS', 'Trigram search'] },
  { category: 'Synthetic data and evaluation', items: ['Python 3.12', 'uv', 'reportlab', 'pytest', 'Vitest'] },
  { category: 'Deployment', items: ['Docker', 'Dokploy (self-hosted)', 'GitHub Actions'] },
];

const techStackEs = [
  { category: 'App', items: ['Next.js (App Router)', 'TypeScript', 'React', 'Tailwind CSS'] },
  { category: 'Extracción', items: ['Gemini Flash', 'Qwen3.6-35B-A3B (local, LM Studio)', 'tesseract.js para los recuadros', 'pdf.js'] },
  { category: 'Registros y mapeo', items: ['SQLite', 'Drizzle', 'LIS simulado', 'Búsqueda por trigramas'] },
  { category: 'Datos sintéticos y evaluación', items: ['Python 3.12', 'uv', 'reportlab', 'pytest', 'Vitest'] },
  { category: 'Despliegue', items: ['Docker', 'Dokploy (self-hosted)', 'GitHub Actions'] },
];

const contentEn = `
      <h3>Demo & code</h3>
      <p>The public demo is at <a href="https://demos.nicolasbarcelo.dev/verificador-peticiones" target="_blank" rel="noopener noreferrer">demos.nicolasbarcelo.dev/verificador-peticiones</a>: pick one of the (invented) technicians, put a few of the 200 synthetic requests in a batch, choose whether the cloud model or the local one reads them, verify them field by field and approve them.</p>
      <p><strong>The demo replays readings recorded beforehand</strong>, faster than they took: no API key, no cost per visit, and a sandbox for each visitor. All the data are synthetic, generated by the project itself: no real documents, patients or organisations. The project was rebuilt from scratch from a real clinical digitisation problem.</p>
      <p>The code, the evaluation and the results of every measured run are on <a href="https://github.com/ferreret/clinical-intake-verifier" target="_blank" rel="noopener noreferrer">GitHub</a>. Built with AI assistance (Claude Code); design, review and decisions are mine.</p>
`;

const contentEs = `
      <h3>Demo y código</h3>
      <p>La demo pública está en <a href="https://demos.nicolasbarcelo.dev/verificador-peticiones" target="_blank" rel="noopener noreferrer">demos.nicolasbarcelo.dev/verificador-peticiones</a>: eliges a uno de los técnicos (inventados), pones unas cuantas de las 200 peticiones sintéticas en un lote, decides si las lee el modelo en la nube o el local, las verificas campo a campo y las apruebas.</p>
      <p><strong>La demo reproduce lecturas grabadas de antemano</strong>, más rápido de lo que tardaron: sin clave de API, sin coste por visita y con un espacio aislado para cada visitante. Todos los datos son sintéticos, generados por el propio proyecto: ni documentos, ni pacientes, ni organizaciones reales. El proyecto se reconstruyó desde cero a partir de un problema real de digitalización clínica.</p>
      <p>El código, la evaluación y los resultados de cada ejecución medida están en <a href="https://github.com/ferreret/clinical-intake-verifier" target="_blank" rel="noopener noreferrer">GitHub</a>. Hecho con ayuda de IA (Claude Code); el diseño, la revisión y las decisiones son míos.</p>
`;

export const clinicalIntakeVerifier: { en: ProjectItem; es: ProjectItem } = {
  en: {
    id: "7",
    slug: "clinical-intake-verifier",
    title: "Clinical Intake Verifier",
    description: "AI-assisted intake of clinical lab requests, with a human in the loop: a vision model reads the scanned form, the lab's records check every field, and a technician verifies and approves instead of typing it in. When the model and the records disagree, the model does not win: the field turns red and a person decides.",
    tags: ["TypeScript", "Python", "Document AI", "Human-in-the-loop", "LLM Evaluation"],
    imageUrl: "/clinical-intake-verifier.webp",
    link: "https://demos.nicolasbarcelo.dev/verificador-peticiones",
    demoUrl: "https://demos.nicolasbarcelo.dev/verificador-peticiones",
    repoUrl: "https://github.com/ferreret/clinical-intake-verifier",
    status: 'prototype',
    role: 'Design, development and evaluation',
    timeline: 'September to November 2026',
    problem: problemEn,
    solution: solutionEn,
    businessMetrics: [
      { label: 'Documents linked to the wrong patient', value: '0' },
      { label: 'Reading errors shown green', value: '0' },
      { label: 'Field precision, synthetic set (Gemini Flash)', value: '99.8%' },
      { label: 'Field precision, synthetic set (local Qwen)', value: '99.5%' },
      { label: 'Synthetic requests measured end to end', value: '200' },
      { label: 'Time per document (Gemini Flash)', value: '~9 s' },
    ],
    techStack,
    lessonsLearned: lessonsEn,
    content: contentEn,
  },
  es: {
    id: "7",
    slug: "clinical-intake-verifier",
    title: "Clinical Intake Verifier",
    description: "Entrada de peticiones de laboratorio clínico asistida por IA, con una persona en el bucle: un modelo de visión lee el volante escaneado, los registros del laboratorio comprueban cada campo, y un técnico verifica y aprueba en vez de teclearlo. Cuando el modelo y los registros discrepan, no gana el modelo: el campo se pone en rojo y decide una persona.",
    tags: ["TypeScript", "Python", "IA documental", "Human-in-the-loop", "Evaluación de LLM"],
    imageUrl: "/clinical-intake-verifier.webp",
    link: "https://demos.nicolasbarcelo.dev/verificador-peticiones",
    demoUrl: "https://demos.nicolasbarcelo.dev/verificador-peticiones",
    repoUrl: "https://github.com/ferreret/clinical-intake-verifier",
    status: 'prototype',
    role: 'Diseño, desarrollo y evaluación',
    timeline: 'De septiembre a noviembre de 2026',
    problem: problemEs,
    solution: solutionEs,
    businessMetrics: [
      { label: 'Documentos asignados al paciente equivocado', value: '0' },
      { label: 'Errores de lectura mostrados en verde', value: '0' },
      { label: 'Precisión por campo, set sintético (Gemini Flash)', value: '99,8%' },
      { label: 'Precisión por campo, set sintético (Qwen local)', value: '99,5%' },
      { label: 'Peticiones sintéticas medidas de punta a punta', value: '200' },
      { label: 'Tiempo por documento (Gemini Flash)', value: '~9 s' },
    ],
    techStack: techStackEs,
    lessonsLearned: lessonsEs,
    content: contentEs,
  }
};
