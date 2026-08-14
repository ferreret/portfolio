import { ProjectItem } from '../../types';

const problemEn = `In an industrial batch-manufacturing plant, every production order run in a reactor can end with the final product in spec — or out of spec, forcing an expensive reprocess: lost reactor time, wasted energy, sometimes extra raw material. Across roughly two years of real production data (490 orders), 32.9% of batches ended up needing reprocessing. The formula (42 chemical components), the reactor (500 / 1,000 / 3,000 kg capacity) and the batch size were all known before each run — but nobody could tell in advance which combinations would fail.`;

const problemEs = `En una planta industrial de fabricación por lotes, cada orden de producción que se ejecuta en un reactor puede acabar con el producto final dentro de especificación — o fuera de ella, obligando a un reprocesado caro: horas de reactor perdidas, energía desperdiciada y, a veces, materia prima extra. En unos dos años de datos reales de producción (490 órdenes), el 32,9% de los lotes acabó necesitando reprocesado. La fórmula (42 componentes químicos), el reactor (500 / 1.000 / 3.000 kg de capacidad) y el tamaño del lote se conocían antes de cada ejecución — pero nadie podía anticipar qué combinaciones iban a fallar.`;

const solutionEn = `A supervised classification pipeline evaluated four parallel hypotheses against the same target (will this batch need reprocessing?): formula proportions plus reactor fill level, absolute component quantities with per-component significance tests, reactor sensor time series alone, and sensors combined with the formula. The winning model — an XGBoost classifier over component proportions and fill level, tuned with GridSearch and with the decision threshold lowered from 0.5 to 0.4 to favour recall — reaches 86% accuracy on test data. Beyond the model, significance tests at 95% confidence produced 13 actionable business recommendations: reactor choice by batch size, ingredient limits per reactor, agitator and emulsifier speed windows. In 2026 the project was rescued from the thesis archive: dependencies re-pinned, the public demo hardened, and the Streamlit app dockerized and deployed on self-hosted infrastructure as a live demo.`;

const solutionEs = `Un pipeline de clasificación supervisada evaluó cuatro hipótesis en paralelo contra el mismo objetivo (¿necesitará reprocesado este lote?): proporciones de la fórmula más grado de llenado del reactor, cantidades absolutas por componente con tests de significancia individuales, series temporales de los sensores del reactor por sí solas, y sensores combinados con la fórmula. El modelo ganador — un clasificador XGBoost sobre proporciones de componentes y grado de llenado, ajustado con GridSearch y con el umbral de decisión rebajado de 0,5 a 0,4 para favorecer el recall — alcanza un 86% de accuracy en test. Más allá del modelo, los tests de significancia al 95% de confianza produjeron 13 recomendaciones de negocio accionables: elección de reactor según el tamaño del lote, límites de ingredientes por reactor y ventanas de velocidad de agitador y emulsionador. En 2026 el proyecto se rescató del archivo del TFM: dependencias re-pinneadas, demo pública endurecida, y la app Streamlit dockerizada y desplegada en infraestructura self-hosted como demo viva.`;

const lessonsEn = [
  'Threshold tuning beats model swapping: lowering the decision threshold from 0.5 to 0.4 bought the recall that matters when a missed reprocess costs far more than a false alarm.',
  'The statistical analysis outlived the model — the 13 recommendations from the significance tests (which ingredients to avoid, which speed windows to respect) deliver value even with the app switched off.',
  'A model serialized in 2023 still loaded in 2026 on XGBoost 3.2, but with legacy-format warnings: serialized models are technical debt, so the re-training path is documented next to the artifact.',
  'Disabling login is not enough to make a demo public: pages with side effects (model retraining, admin file deletion) had to disappear from the menu, not just sit behind a removed password.',
  'The last mile is where projects die: the thesis sat in a folder for almost three years because "works in a notebook" felt finished. It was not — until there was a URL anyone can click.',
];

const lessonsEs = [
  'Ajustar el umbral rinde más que cambiar de modelo: bajar el umbral de decisión de 0,5 a 0,4 compró el recall que importa cuando un reprocesado no detectado cuesta mucho más que una falsa alarma.',
  'El análisis estadístico sobrevivió al modelo — las 13 recomendaciones de los tests de significancia (qué ingredientes evitar, qué ventanas de velocidad respetar) aportan valor incluso con la app apagada.',
  'Un modelo serializado en 2023 todavía cargó en 2026 con XGBoost 3.2, pero con warnings de formato legacy: los modelos serializados son deuda técnica, así que la ruta de re-entrenamiento está documentada junto al artefacto.',
  'Desactivar el login no basta para hacer pública una demo: las páginas con efectos secundarios (re-entrenamiento del modelo, borrado de ficheros de admin) tuvieron que desaparecer del menú, no solo quedarse sin contraseña.',
  'La última milla es donde mueren los proyectos: el TFM pasó casi tres años en una carpeta porque "funciona en un notebook" parecía terminado. No lo estaba — hasta que hubo una URL que cualquiera puede abrir.',
];

const techStack = [
  { category: 'ML', items: ['XGBoost', 'scikit-learn', 'GridSearchCV', 'joblib'] },
  { category: 'Data', items: ['pandas', 'NumPy'] },
  { category: 'App', items: ['Streamlit (multipage)', 'Plotly', 'seaborn', 'Matplotlib'] },
  { category: 'Deployment', items: ['Docker', 'Dokploy (self-hosted)', 'Cloudflare Tunnel', 'Traefik'] },
];

const techStackEs = [
  { category: 'ML', items: ['XGBoost', 'scikit-learn', 'GridSearchCV', 'joblib'] },
  { category: 'Datos', items: ['pandas', 'NumPy'] },
  { category: 'App', items: ['Streamlit (multipágina)', 'Plotly', 'seaborn', 'Matplotlib'] },
  { category: 'Despliegue', items: ['Docker', 'Dokploy (self-hosted)', 'Cloudflare Tunnel', 'Traefik'] },
];

const contentEn = `
      <h3>Demo & code</h3>
      <p>The public demo is live at <a href="https://reactor-classifier.nicolasbarcelo.dev" target="_blank" rel="noopener noreferrer">reactor-classifier.nicolasbarcelo.dev</a> — no login, real model, real (anonymized) data. Pick a product code, a reactor and a batch quantity, and it returns the reprocess probability for each compatible reactor. The source code, the training notebook and the anonymized dataset are public on <a href="https://github.com/ferreret/batch-reactor-reprocess-classifier" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
      <img src="/reactor-classifier/03-eda.png" alt="EDA page of the live demo: pie chart with the target distribution (67.1% correct vs 32.9% incorrect viscosity) next to the statistical summary of the 490 production orders" class="w-full rounded-lg my-6" />
`;

const contentEs = `
      <h3>Demo y código</h3>
      <p>La demo pública está viva en <a href="https://reactor-classifier.nicolasbarcelo.dev" target="_blank" rel="noopener noreferrer">reactor-classifier.nicolasbarcelo.dev</a> — sin login, con el modelo real y datos reales (anonimizados). Elige un código de producto, un reactor y una cantidad de lote, y devuelve la probabilidad de reprocesado para cada reactor compatible. El código fuente, el notebook de entrenamiento y el dataset anonimizado son públicos en <a href="https://github.com/ferreret/batch-reactor-reprocess-classifier" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
      <img src="/reactor-classifier/03-eda.png" alt="Página de EDA de la demo viva: gráfico de tarta con la distribución del objetivo (67,1% de viscosidad correcta frente a 32,9% incorrecta) junto al resumen estadístico de las 490 órdenes de producción" class="w-full rounded-lg my-6" />
`;

export const batchReactorReprocessClassifier: { en: ProjectItem; es: ProjectItem } = {
  en: {
    id: "5",
    title: "Batch Reactor Reprocess Classifier",
    description: "Machine-learning classifier that predicts, before a batch is run, the probability that an industrial reactor production order will end out of spec and need reprocessing. Born as my Master's Thesis (IEBS, 2023) and rescued in 2026 as a live, dockerized demo.",
    tags: ["Python", "XGBoost", "Machine Learning", "Streamlit"],
    imageUrl: "/batch-reactor-reprocess-classifier.png",
    link: "https://reactor-classifier.nicolasbarcelo.dev",
    status: 'production',
    role: 'Data scientist & developer',
    timeline: "Master's Thesis Sept 2023 · rescued & deployed Aug 2026",
    problem: problemEn,
    solution: solutionEn,
    businessMetrics: [
      { label: 'Production orders analyzed', value: '490' },
      { label: 'Baseline reprocess rate', value: '32.9%' },
      { label: 'Test accuracy', value: '86%' },
      { label: 'Chemical components', value: '42' },
      { label: 'Hypotheses evaluated', value: '4' },
      { label: 'Business recommendations', value: '13' },
    ],
    techStack,
    lessonsLearned: lessonsEn,
    content: contentEn,
  },
  es: {
    id: "5",
    title: "Batch Reactor Reprocess Classifier",
    description: "Clasificador de machine learning que predice, antes de lanzar un lote, la probabilidad de que una orden de producción de un reactor industrial acabe fuera de especificación y necesite reprocesado. Nació como mi Trabajo Final de Máster (IEBS, 2023) y fue rescatado en 2026 como demo viva y dockerizada.",
    tags: ["Python", "XGBoost", "Machine Learning", "Streamlit"],
    imageUrl: "/batch-reactor-reprocess-classifier.png",
    link: "https://reactor-classifier.nicolasbarcelo.dev",
    status: 'production',
    role: 'Científico de datos y desarrollador',
    timeline: 'TFM sept 2023 · rescatado y desplegado ago 2026',
    problem: problemEs,
    solution: solutionEs,
    businessMetrics: [
      { label: 'Órdenes de producción analizadas', value: '490' },
      { label: 'Tasa base de reprocesado', value: '32,9%' },
      { label: 'Accuracy en test', value: '86%' },
      { label: 'Componentes químicos', value: '42' },
      { label: 'Hipótesis evaluadas', value: '4' },
      { label: 'Recomendaciones de negocio', value: '13' },
    ],
    techStack: techStackEs,
    lessonsLearned: lessonsEs,
    content: contentEs,
  }
};
