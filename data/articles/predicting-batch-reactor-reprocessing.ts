import { BlogPost } from '../../types';

const contentEn = `
      <p class="mb-4">Some of the most valuable machine-learning problems are not glamorous: binary classification, tabular data, a clear cost function. This is one of them. Given a production order for an industrial batch reactor — a formula of 42 chemical components, a reactor of 500, 1,000 or 3,000 kg of capacity, a batch quantity — estimate the probability that the batch will end out of spec and need reprocessing, <em>before</em> running it.</p>
      <p class="mb-4">The project was born as my Master's Thesis at IEBS (2023) and today it is a <a href="https://reactor-classifier.nicolasbarcelo.dev" target="_blank" rel="noopener noreferrer">live demo</a> with a <a href="https://github.com/ferreret/batch-reactor-reprocess-classifier" target="_blank" rel="noopener noreferrer">public repository</a> that includes the training notebook and the anonymized dataset. This article covers the part that matters: the data, the four hypotheses, the model that won, and what came out of the analysis beyond the model.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">The problem: expensive failed batches</h3>
      <p class="mb-4">When a batch ends, the product either ships — or its viscosity is out of spec and the whole batch must be reprocessed: reactor hours lost, energy wasted, sometimes extra raw material added. The dataset covered roughly two years of real production, 490 orders, with a sobering base rate: <strong>32.9% of batches needed reprocessing</strong>.</p>
      <p class="mb-4">Everything that defines an order (formula, reactor, quantity) is known before pressing the button. If the failure probability can be estimated upfront, production can act on it: switch to a different reactor, tweak component quantities, or defer the batch.</p>
      <img src="/reactor-classifier/04-eda-graficos.png" alt="Bar chart from the demo's EDA page: production orders per reactor (medium, large, small), split by correct vs incorrect viscosity outcome" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">Four hypotheses in parallel</h3>
      <p class="mb-4">Rather than betting on a single feature family, the thesis ran four experiments against the same binary target. Each one answers a different business question: is the failure in the formula, in how the reactor behaves, or in both?</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>H1 — Formula proportions + fill level.</strong> The proportion of each of the 42 components, plus how full the reactor runs. XGBoost won after GridSearch over five random seeds.</li>
        <li><strong>H2 — Absolute quantities + significance tests.</strong> Total mass per component, and a 95%-confidence significance test for each component individually. GradientBoosting won, and ten components were flagged as materially shifting the reprocess rate.</li>
        <li><strong>H3 — Reactor sensors only.</strong> Temperature, pressure, agitator and emulsifier speed, weight and reaction time, aggregated as mean / std / last reading. No formula at all — and it still carried signal.</li>
        <li><strong>H4 — Sensors + formula combined.</strong> The cross-check on whether both families together beat each one alone. RandomForest won here.</li>
      </ul>
      <p class="mb-4">The H3 result is worth pausing on: the reactor's behavior alone predicts outcomes without knowing the recipe. That is a useful pointer for any plant where formulas are confidential but telemetry is available.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">The model behind the demo</h3>
      <p class="mb-4">The model serving predictions is H1: an XGBoost classifier over component proportions and fill level, reaching <strong>86% accuracy on test data</strong> with 0.88 precision on the reprocess class.</p>
      <p class="mb-4">One tuning decision mattered more than any hyperparameter: the decision threshold was lowered from 0.5 to 0.4. That is not a technical choice, it is a business one — it encodes the cost asymmetry of the domain. A missed reprocess (a batch you let run and then have to redo) costs far more than a false alarm (an unnecessary warning you double-check and dismiss), so the model deliberately trades some precision for recall.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">Thirteen recommendations the model didn't make</h3>
      <p class="mb-4">The output I'm still most satisfied with isn't the classifier — it's the 13 business recommendations that came out of the exploratory analysis and the per-component significance tests. Things like: which reactor to choose for each batch-size range, which specific ingredients to avoid or cap in the large reactor, one component that succeeded in 100% of its 14 runs and deserved <em>more</em> use, and operating windows of 20–32 Hz for agitator speed in the small and medium reactors.</p>
      <p class="mb-4">None of that needs a model in production to be useful. A plant could ignore the app entirely, apply the recommendations, and still reduce reprocessing. Sometimes the statistical analysis around the model is worth more than the model itself.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">The live demo</h3>
      <p class="mb-4">The demo exposes the H1 model end to end: pick a product code, a reactor and a batch quantity, and the app rebuilds the 42-proportion feature vector from the product catalog and returns the reprocess probability for each compatible reactor. An EDA page shows the dataset behind it — target distribution, production per reactor, correlations.</p>
      <p class="mb-4">A real example: product code 629915 at 800 kg returns an 18.05% reprocess probability in the large reactor and 24.77% in the medium one, with a capacity warning for the small reactor — the model itself argues for running that batch in the large tank. The app is a multipage Streamlit application, dockerized and self-hosted on my own infrastructure.</p>
      <img src="/reactor-classifier/02-prediccion.png" alt="Prediction page of the live demo: product code 629915 at 800 kg returns 18.05% reprocess probability in the large reactor and 24.77% in the medium reactor, with a capacity warning for the small one" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">Takeaways</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Threshold tuning is a business decision.</strong> Moving from 0.5 to 0.4 encodes what a false negative actually costs on the plant floor — no hyperparameter search can make that call for you.</li>
        <li><strong>Significance tests turn EDA into actions.</strong> The 13 recommendations work with the app switched off, and they came from classic statistics, not from the classifier.</li>
        <li><strong>Competing feature families beat a single bet.</strong> Running formula, sensors and their combination as parallel hypotheses produced findings a single model would have hidden.</li>
      </ul>
      <p class="mb-4">Try it at <a href="https://reactor-classifier.nicolasbarcelo.dev" target="_blank" rel="noopener noreferrer">reactor-classifier.nicolasbarcelo.dev</a> — the full project (notebook, anonymized dataset and app) is on <a href="https://github.com/ferreret/batch-reactor-reprocess-classifier" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
`;

const contentEs = `
      <p class="mb-4">Algunos de los problemas de machine learning más valiosos no son glamurosos: clasificación binaria, datos tabulares, una función de coste clara. Este es uno de ellos. Dada una orden de producción de un reactor industrial por lotes — una fórmula de 42 componentes químicos, un reactor de 500, 1.000 o 3.000 kg de capacidad, una cantidad de lote — estimar la probabilidad de que el lote acabe fuera de especificación y necesite reprocesado, <em>antes</em> de ejecutarlo.</p>
      <p class="mb-4">El proyecto nació como mi Trabajo Final de Máster en IEBS (2023) y hoy es una <a href="https://reactor-classifier.nicolasbarcelo.dev" target="_blank" rel="noopener noreferrer">demo viva</a> con un <a href="https://github.com/ferreret/batch-reactor-reprocess-classifier" target="_blank" rel="noopener noreferrer">repositorio público</a> que incluye el notebook de entrenamiento y el dataset anonimizado. Este artículo cubre la parte que importa: los datos, las cuatro hipótesis, el modelo que ganó y lo que salió del análisis más allá del modelo.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">El problema: lotes fallidos que salen caros</h3>
      <p class="mb-4">Cuando un lote termina, el producto se expide — o su viscosidad está fuera de especificación y todo el lote debe reprocesarse: horas de reactor perdidas, energía desperdiciada y, a veces, materia prima extra. El dataset cubría unos dos años de producción real, 490 órdenes, con una tasa base que da que pensar: <strong>el 32,9% de los lotes necesitó reprocesado</strong>.</p>
      <p class="mb-4">Todo lo que define una orden (fórmula, reactor, cantidad) se conoce antes de pulsar el botón. Si la probabilidad de fallo puede estimarse de antemano, producción puede actuar: cambiar a otro reactor, retocar las cantidades de componentes o aplazar el lote.</p>
      <img src="/reactor-classifier/04-eda-graficos.png" alt="Gráfico de barras de la página de EDA de la demo: órdenes de producción por reactor (mediano, grande, pequeño), divididas según viscosidad correcta o incorrecta" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">Cuatro hipótesis en paralelo</h3>
      <p class="mb-4">En lugar de apostar por una única familia de features, el TFM ejecutó cuatro experimentos contra el mismo objetivo binario. Cada uno responde a una pregunta de negocio distinta: ¿el fallo está en la fórmula, en cómo se comporta el reactor, o en ambos?</p>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>H1 — Proporciones de la fórmula + grado de llenado.</strong> La proporción de cada uno de los 42 componentes, más lo lleno que va el reactor. Ganó XGBoost tras GridSearch sobre cinco semillas aleatorias.</li>
        <li><strong>H2 — Cantidades absolutas + tests de significancia.</strong> Masa total por componente, y un test de significancia al 95% de confianza para cada componente por separado. Ganó GradientBoosting, y diez componentes quedaron señalados como factores que mueven materialmente la tasa de reprocesado.</li>
        <li><strong>H3 — Solo sensores del reactor.</strong> Temperatura, presión, velocidad de agitador y de emulsionador, peso y tiempo de reacción, agregados como media / desviación / última lectura. Sin fórmula alguna — y aun así había señal.</li>
        <li><strong>H4 — Sensores + fórmula combinados.</strong> La comprobación cruzada de si las dos familias juntas superan a cada una por separado. Aquí ganó RandomForest.</li>
      </ul>
      <p class="mb-4">El resultado de H3 merece una pausa: el comportamiento del reactor por sí solo predice el desenlace sin conocer la receta. Es una pista útil para cualquier planta donde las fórmulas son confidenciales pero la telemetría está disponible.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">El modelo detrás de la demo</h3>
      <p class="mb-4">El modelo que sirve las predicciones es el de H1: un clasificador XGBoost sobre proporciones de componentes y grado de llenado, que alcanza un <strong>86% de accuracy en test</strong> con una precisión de 0,88 en la clase de reprocesado.</p>
      <p class="mb-4">Una decisión de ajuste importó más que cualquier hiperparámetro: el umbral de decisión se bajó de 0,5 a 0,4. No es una elección técnica, es de negocio — codifica la asimetría de costes del dominio. Un reprocesado no detectado (un lote que dejas correr y luego hay que rehacer) cuesta mucho más que una falsa alarma (un aviso innecesario que compruebas y descartas), así que el modelo cede deliberadamente algo de precisión a cambio de recall.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">Trece recomendaciones que no hizo el modelo</h3>
      <p class="mb-4">El resultado del que sigo más satisfecho no es el clasificador — son las 13 recomendaciones de negocio que salieron del análisis exploratorio y de los tests de significancia por componente. Cosas como: qué reactor elegir para cada rango de tamaño de lote, qué ingredientes concretos evitar o limitar en el reactor grande, un componente que acertó en el 100% de sus 14 ejecuciones y merecía <em>más</em> uso, y ventanas de operación de 20–32 Hz para la velocidad del agitador en los reactores pequeño y mediano.</p>
      <p class="mb-4">Nada de eso necesita un modelo en producción para ser útil. Una planta podría ignorar la app por completo, aplicar las recomendaciones y aun así reducir el reprocesado. A veces el análisis estadístico alrededor del modelo vale más que el propio modelo.</p>

      <h3 class="text-xl font-bold mb-2 mt-6">La demo viva</h3>
      <p class="mb-4">La demo expone el modelo de H1 de punta a punta: eliges un código de producto, un reactor y una cantidad de lote, y la app reconstruye el vector de features de 42 proporciones a partir del catálogo de productos y devuelve la probabilidad de reprocesado para cada reactor compatible. Una página de EDA muestra el dataset que hay detrás — distribución del objetivo, producción por reactor, correlaciones.</p>
      <p class="mb-4">Un ejemplo real: el código de producto 629915 con 800 kg devuelve un 18,05% de probabilidad de reprocesado en el reactor grande y un 24,77% en el mediano, con un aviso de capacidad para el pequeño — el propio modelo argumenta a favor de ejecutar ese lote en el tanque grande. La app es una aplicación Streamlit multipágina, dockerizada y alojada en mi propia infraestructura.</p>
      <img src="/reactor-classifier/02-prediccion.png" alt="Página de predicción de la demo viva: el código de producto 629915 con 800 kg devuelve un 18,05% de probabilidad de reprocesado en el reactor grande y un 24,77% en el mediano, con aviso de capacidad para el pequeño" class="w-full rounded-lg my-6" />

      <h3 class="text-xl font-bold mb-2 mt-6">Conclusiones</h3>
      <ul class="list-disc list-inside mb-4 space-y-1">
        <li><strong>Ajustar el umbral es una decisión de negocio.</strong> Pasar de 0,5 a 0,4 codifica lo que de verdad cuesta un falso negativo en planta — ninguna búsqueda de hiperparámetros puede tomar esa decisión por ti.</li>
        <li><strong>Los tests de significancia convierten el EDA en acciones.</strong> Las 13 recomendaciones funcionan con la app apagada, y salieron de estadística clásica, no del clasificador.</li>
        <li><strong>Familias de features compitiendo ganan a una única apuesta.</strong> Ejecutar fórmula, sensores y su combinación como hipótesis paralelas produjo hallazgos que un único modelo habría escondido.</li>
      </ul>
      <p class="mb-4">Pruébala en <a href="https://reactor-classifier.nicolasbarcelo.dev" target="_blank" rel="noopener noreferrer">reactor-classifier.nicolasbarcelo.dev</a> — el proyecto completo (notebook, dataset anonimizado y app) está en <a href="https://github.com/ferreret/batch-reactor-reprocess-classifier" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
`;

export const predictingBatchReactorReprocessing: { en: BlogPost; es: BlogPost } = {
  en: {
    id: "5",
    title: "Predicting Reprocessing in an Industrial Batch Reactor with XGBoost",
    date: "2026-08-14",
    readTime: "6 min read",
    tags: ["Machine Learning", "XGBoost", "Data Science", "Streamlit"],
    excerpt: "Four competing hypotheses, an XGBoost classifier with the threshold tuned for recall, and 13 business recommendations from significance tests: how to predict which batch orders will fail before running them — with a live demo.",
    content: contentEn
  },
  es: {
    id: "5",
    title: "Predecir reprocesados en un reactor industrial por lotes con XGBoost",
    date: "14-08-2026",
    readTime: "6 min lectura",
    tags: ["Machine Learning", "XGBoost", "Data Science", "Streamlit"],
    excerpt: "Cuatro hipótesis compitiendo, un clasificador XGBoost con el umbral ajustado para recall y 13 recomendaciones de negocio salidas de tests de significancia: cómo predecir qué órdenes de lote fallarán antes de ejecutarlas — con demo viva.",
    content: contentEs
  }
};
