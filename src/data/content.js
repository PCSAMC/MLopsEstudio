export const MODS = [
  {
    id: 'm1', name: 'Fundamentos MLOps', iconName: 'BrainCircuit',
    colors: ['#7C6EFA', '#A78BFA'],
    cards: [
      { q: '¿Qué porcentaje de modelos ML nunca llega a producción?', a: '85% debido a procesos manuales que impiden su operatividad a escala.' },
      { q: '¿Cuánto cuesta la hora de inactividad en sistemas predictivos?', a: '$125,000 por hora promedio en sistemas predictivos en producción.' },
      { q: '¿Qué significa "MLOps no es infraestructura, es inmunidad"?', a: 'Construir un modelo es ciencia. Mantener su precisión frente a la entropía del mundo real es ingeniería de máxima precisión.' },
      { q: '¿Cuál es la diferencia clave entre DevOps y MLOps?', a: 'DevOps maneja código estático y determinista. MLOps añade datos estocásticos y modelos que se degradan silenciosamente en producción.' },
      { q: '¿Qué son CI, CD, CM y CT en MLOps?', a: 'CI: pruebas de código y datos. CD: despliegue de servicios de predicción. CM: detección de caída de métricas. CT: reentrenamiento automático.' },
      { q: '¿Cuáles son los 3 niveles de madurez MLOps de Google?', a: 'Nivel 0: Manual (Jupyter). Nivel 1: Pipeline Automatizado. Nivel 2: Automatización Total con disparadores y monitoreo de deriva.' },
      { q: '¿Qué reglas de oro sintetizan MLOps?', a: '1. Versionar todo (datos, código, entornos). 2. Evaluar sistemas encapsulados (f = g∘h). 3. Automatizar la detección, no solo el despliegue.' },
      { q: '¿Qué es el Inner Loop vs Outer Loop?', a: 'Inner Loop: Data Science Sandbox (experimentación). Outer Loop: Engineering Production (CI/CD, servicio a escala, monitoreo continuo).' },
      { q: '¿Qué es el Technical Debt en ML?', a: 'Deuda técnica oculta: datos sin versionar, modelos sin firma, pipelines frágiles que fallan silenciosamente en producción.' },
      { q: '¿Por qué el 80% del tiempo se gasta en limpieza de datos?', a: 'Los datos del mundo real son ruidosos, incompletos y cambiantes. Sin datos de calidad, ningún modelo puede mantenerse estable en producción.' },
    ]
  },
  {
    id: 'm2', name: 'Deriva y Degradación', iconName: 'TrendingDown',
    colors: ['#F87171', '#FBBF24'],
    cards: [
      { q: '¿Qué es la degradación silenciosa del modelo?', a: 'HTTP 200 OK: el software funciona. Pero la precisión baja porque la realidad cambió. El negocio sufre pérdidas sin alertas técnicas.' },
      { q: '¿Qué es Data Drift?', a: 'Cambia la distribución P(X) de las variables de entrada. Ej: comportamiento del usuario cambia o un sensor IoT se degrada.' },
      { q: '¿Qué es Concept Drift?', a: 'Cambia la relación fundamental P(Y|X). Ej: regulaciones económicas → las mismas características resultan en un precio diferente.' },
      { q: '¿Qué es Prior Probability Drift?', a: 'Cambian las probabilidades de las clases P(Y). Ej: aumento de fraudes en temporada festiva cambia el ratio esperado.' },
      { q: '¿Cómo interpretar el PSI?', a: 'PSI < 0.1: Estable. 0.1 ≤ PSI < 0.2: Alerta Temprana. PSI ≥ 0.2: Deriva Significativa → Disparador Crítico de reentrenamiento.' },
      { q: '¿Qué diferencia hay entre prueba KS y KL Divergence?', a: 'KS: identifica si dos distribuciones son estadísticamente distintas. KL Divergence: mide cuánta información se pierde entre distribuciones.' },
      { q: '¿Cuándo usar Expanding Window vs Sliding Window?', a: 'Expanding: deriva gradual (más datos = mejor). Sliding: Concept Drift abrupto, descarta conocimiento obsoleto que ahora es dañino.' },
      { q: '¿Cuáles son los 3 triggers del Continuous Training?', a: '1. Temporal (programado, ej: mensual). 2. Rendimiento (caída en F1-Score). 3. Deriva estadística (PSI > 0.25).' },
      { q: '¿Por qué el Concept Drift es más peligroso que el Data Drift?', a: 'La relación entre features y etiquetas cambia fundamentalmente. El modelo recibe datos "normales" pero genera predicciones incorrectas sin señal de error.' },
      { q: '¿Qué es Covariate Shift?', a: 'La distribución marginal P(X) cambia entre entrenamiento y producción, pero la relación condicional P(Y|X) permanece estable.' },
    ]
  },
  {
    id: 'm3', name: 'Pipelines y Evaluación', iconName: 'GitBranch',
    colors: ['#34D399', '#2DD4BF'],
    cards: [
      { q: '¿Por qué el pipeline debe ser un artefacto inmutable?', a: 'Para el Escalado Justo: usar el scaler antiguo con datos nuevos recorta valores y evalúa un sistema contrafactual que nunca existió en producción.' },
      { q: '¿Qué es f = g∘h?', a: 'El modelo (f) es un sistema compuesto: g = preprocesamiento (scaler), h = estimador aprendido. Deben versionarse y evaluarse juntos.' },
      { q: '¿Cuál es la Regla de Oro del pipeline?', a: 'Empaquetar scaler + modelo como un solo paso secuencial (sklearn.Pipeline). Comparar versiones empaquetadas en los mismos datos crudos retenidos.' },
      { q: '¿Qué es un Quality Gate?', a: 'La frontera entre sandbox de ciencia de datos y producción. Evaluación estricta y automatizada: rechazo si no supera umbral de F1-Score mínimo.' },
      { q: '¿Qué es el Mandato de Reproducibilidad?', a: '"Si no puedes reconstruir un modelo de hace 6 meses en una hora, no estás haciendo MLOps." Requiere Git, DVC y Docker.' },
      { q: '¿Cuáles son los 4 cuadrantes del ML Test Score?', a: 'Pruebas de Datos, Pruebas del Modelo, Pruebas de Infraestructura y Monitoreo. Cada uno con checklist específico.' },
      { q: '¿Qué hace DVC?', a: 'Almacena punteros ligeros en Git que referencian datos inmutables en S3/GCS. El código versiona los datos sin guardarlos en el repositorio.' },
      { q: '¿Por qué usar stratify=y en train_test_split?', a: 'Preserva el balance original de clases para evitar sesgos, especialmente crítico en clasificación desbalanceada.' },
      { q: '¿Qué es Data Leakage y por qué es crítico?', a: 'Información del futuro contamina el entrenamiento. El modelo aprende a "hacer trampa" → métricas infladas que colapsan en producción real.' },
      { q: '¿Qué debe contener un artefacto de evaluación en MLflow?', a: 'Trazabilidad de datos (split_metadata.json), métricas baseline, análisis de umbrales Recall/Precision, y modelo serializado con firma validada.' },
    ]
  },
  {
    id: 'm4', name: 'MLflow', iconName: 'BarChart3',
    colors: ['#60A5FA', '#818CF8'],
    cards: [
      { q: '¿Qué registra MLflow Tracking?', a: 'Parámetros (configuración), Métricas (resultados numéricos), Artefactos (modelos, gráficas, reportes) y código de cada ejecución.' },
      { q: '¿Qué es el MLflow Model Registry?', a: 'Almacén centralizado para versionar modelos, gestionar transiciones de estado (Staging/Producción) y recuperar por URI semántica.' },
      { q: '¿Qué es la firma (signature) del modelo?', a: 'Infiere y guarda la estructura de entrada esperada. Es el contrato del modelo que rechaza datos malformados en producción.' },
      { q: '¿Cómo se inicia un run de MLflow?', a: 'with mlflow.start_run(): → log_param(k,v) → log_metrics(dict) → sklearn.log_model(modelo, "nombre", signature=firma)' },
      { q: '¿Qué valor añade MLflow respecto a un script aislado?', a: 'Trazabilidad completa, Reproducibilidad garantizada y Gestión del Ciclo de Vida desde experimentación hasta despliegue versionado.' },
      { q: '¿Cómo funciona el ciclo Tracking → Registry → Inferencia?', a: 'Tracking registra experimentos. Registry promueve al ganador. Inferencia carga por URI semántica "models:/nombre/1" sin conocer cómo se entrenó.' },
      { q: '¿Qué son los "Child Runs" de AutoML en MLflow?', a: 'Sub-experimentos dentro de un Parent Run. FLAML crea un child por configuración. El ganador se promueve al Registry como versión lista para producción.' },
      { q: '¿Qué es FLAML y cómo se integra con MLflow?', a: 'AutoML liviano que explora hiperparámetros con presupuesto de tiempo. Se integra con MLflow registrando cada iteración y promoviendo el mejor modelo.' },
      { q: '¿Cómo se carga un modelo de producción?', a: 'mlflow.pyfunc.load_model("models:/NombreModelo/Production") — URI semántica sin conocer la ruta física del artefacto.' },
      { q: '¿Qué estados tiene un modelo en el Registry?', a: 'None → Staging (candidato) → Production (activo) → Archived (retirado). Transiciones registradas con fecha y responsable.' },
    ]
  },
  {
    id: 'm5', name: 'Apache Airflow', iconName: 'Wind',
    colors: ['#FBBF24', '#FB923C'],
    cards: [
      { q: '¿Qué es un DAG en Airflow?', a: 'Directed Acyclic Graph: el plano del flujo de trabajo. Define tareas con dependencias direccionales y sin ciclos. Única fuente de verdad del pipeline.' },
      { q: '¿Diferencia entre Operator, Task y Sensor?', a: 'Operator: plantilla (BashOperator, PythonOperator). Task: instancia en ejecución. Sensor: operador especial que pausa hasta un evento externo.' },
      { q: '¿Cuáles son los 5 componentes de Airflow?', a: 'Scheduler, DAG Processor, Metadata Database (PostgreSQL), API & Webserver (React), Workers/Triggerer (ejecutan el código real).' },
      { q: '¿Cuáles son las 4 Reglas de Oro de Airflow?', a: '1. Encapsulamiento. 2. Idempotencia. 3. Separación del Cómputo (Airflow orquesta, no procesa). 4. XComs solo para metadatos pequeños.' },
      { q: '¿Qué es un XCom y cuál es su límite?', a: 'Cross-Communication: pasa metadatos pequeños entre tareas. NUNCA DataFrames. Para datos grandes: guardar en S3/disco y pasar solo la ruta.' },
      { q: '¿Qué es la TaskFlow API?', a: 'API moderna con @dag y @task que convierte funciones Python en nodos del DAG. Dependencias implícitas por el orden de llamadas.' },
      { q: '¿Diferencia entre "Failed" y "Upstream Failed"?', a: 'Failed: la tarea falló por error de código. Upstream Failed: no se ejecutó porque un eslabón previo falló (efecto dominó).' },
      { q: '¿Qué hay de nuevo en Airflow 3?', a: 'Asset Partitioning, Human-in-the-Loop (aprobación humana), Despliegues Multi-Equipo aislados y UI reconstruida en React.' },
      { q: '¿Qué NO es Airflow?', a: 'No es streaming. No es No-Code. No procesa terabytes directamente. Es el director de orquesta que coordina cuándo y cómo otros sistemas mueven datos.' },
      { q: '¿Por qué la idempotencia es crítica en Airflow?', a: 'Una tarea idempotente produce el mismo resultado sin importar cuántas veces se reintente. Fundamental cuando hay fallos y re-ejecuciones en pipelines ML.' },
    ]
  },
  {
    id: 'm6', name: 'RAG y LLMs', iconName: 'Bot',
    colors: ['#A78BFA', '#F472B6'],
    cards: [
      { q: '¿Por qué los LLMs necesitan RAG?', a: 'Un LLM estándar tiene conocimiento estático. RAG desacopla el conocimiento del modelo, reduciendo alucinaciones hasta un 70% y permitiendo actualizaciones en tiempo real.' },
      { q: '¿Qué es RAG Nivel 1 (Básico)?', a: 'Flujo lineal: Consulta → Embedding → Búsqueda Vectorial Top-K → Contexto → Generación. Simple y ultrarrápido. Sin verificación de calidad.' },
      { q: '¿Qué añade RAG Nivel 2 (Avanzado)?', a: 'Pre-Recuperación: Query Rewriting + HyDE. Recuperación: Búsqueda Híbrida (vectores + BM25). Post-Recuperación: Cross-Encoder para reordenar.' },
      { q: '¿Qué es RAG Adaptativo (Nivel 3)?', a: 'Router LLM clasifica la consulta: pregunta general → respuesta directa, búsqueda de hechos → pipeline RAG, análisis estructurado → Text-to-SQL.' },
      { q: '¿Qué es CRAG/Self-RAG (Nivel 4)?', a: 'Un módulo evaluador critica el contexto: si es irrelevante lo rechaza y activa búsqueda web. Maximiza fidelidad anulando respuestas incorrectas.' },
      { q: '¿Qué es Graph RAG (Nivel 5)?', a: 'Cambia la unidad de recuperación de fragmentos a entidades interconectadas en un grafo. Ideal para consultas multi-salto con razonamiento complejo.' },
      { q: '¿Qué es RAG Agéntico (Nivel 6)?', a: 'Transforma el pipeline en equipo autónomo: Orquestador + Agente Web + Agente DB + Agente Crítico + Agente Redactor. Mayor latencia, máximo razonamiento.' },
      { q: '¿Cuáles son las 3 métricas de la Tríada RAG?', a: 'Precisión del Contexto (recuperación correcta sin ruido), Fidelidad (respuesta basada en contexto sin alucinaciones) y Relevancia (intención del usuario).' },
      { q: '¿Qué es el chunking y por qué el overlap?', a: 'División del documento en fragmentos (CHUNK_SIZE=1000). El CHUNK_OVERLAP=200 preserva contexto entre chunks contiguos para no perder información en bordes.' },
      { q: '¿Qué es un Transformer?', a: 'Arquitectura del paper "Attention Is All You Need" (Vaswani et al., 2017). Mecanismo de atención que procesa relaciones entre todas las palabras simultáneamente.' },
    ]
  },
  {
    id: 'm7', name: 'Bases Vectoriales', iconName: 'Database',
    colors: ['#60A5FA', '#34D399'],
    cards: [
      { q: '¿Qué diferencia a una BD vectorial de una relacional?', a: 'La BD vectorial mide distancia física entre conceptos en un espacio de alta dimensión. Los embeddings capturan significado, no texto literal.' },
      { q: '¿Cuáles son las 3 métricas de similitud vectorial?', a: 'L2 (Euclidiana): ruta más corta, sensible a magnitud. Coseno: mide el ángulo, escala -1 a 1. Producto Punto: combina ángulo y magnitud.' },
      { q: '¿Qué es HNSW vs IVF?', a: 'HNSW: grafo jerárquico, Recall 95-98%+, alto RAM. IVF: indexación por clústeres, eficiente en memoria, filtra por metadatos.' },
      { q: '¿Cuándo elegir Pinecone?', a: '<5M vectores, cero DevOps, velocidad de prototipado. Serverless, desde $50/mes.' },
      { q: '¿Cuándo elegir Weaviate?', a: 'RAG complejo con búsqueda híbrida nativa (BM25 + vectores + ML integrados). Desde $45/mes.' },
      { q: '¿Cuándo elegir Qdrant?', a: 'Presupuesto estricto, filtros lógicos complejos de payload. Motor en Rust, ultra-eficiente, bajo consumo de RAM. Open source.' },
      { q: '¿Cuándo elegir Milvus?', a: '>100M vectores, escala masiva distribuida. Arquitectura de microservicios, el rey para datos a escala empresarial.' },
      { q: '¿Cuándo elegir pgvector?', a: 'Si ya operan con PostgreSQL y buscan máxima simplicidad. Extensión relacional, sin nueva infraestructura ni ops adicional.' },
      { q: '¿Cuál es el Crossover Point?', a: 'A partir de 60-100M consultas/mes, self-hosting ahorra 50-75% vs SaaS. A 100M vectores: SaaS Pinecone $15k-$19k/mes vs Milvus Self-Hosted $3.2k-$6.5k/mes.' },
      { q: '¿Qué es un embedding y cómo se genera?', a: 'Representación numérica de alta dimensión (768-1536 dims) que captura significado semántico. Generados con text-embedding-ada-002 o sentence-transformers.' },
    ]
  },
  {
    id: 'm8', name: 'Despliegue y CI/CD', iconName: 'Rocket',
    colors: ['#34D399', '#60A5FA'],
    cards: [
      { q: '¿Qué es Shadow Deployment?', a: 'El nuevo modelo recibe tráfico en paralelo pero sus respuestas NO se muestran al usuario. Valida estabilidad en tiempo real sin ningún impacto al negocio.' },
      { q: '¿Qué es Canary Deployment?', a: 'Desvía un 5% del tráfico real al nuevo modelo. Si es saludable, escala al 100%. Prueba real con usuarios reales, riesgo controlado.' },
      { q: '¿Qué es Blue/Green Deployment?', a: 'Dos entornos idénticos: Azul (actual) y Verde (nuevo). Un load balancer hace traspaso instantáneo. Permite rollback inmediato sin downtime.' },
      { q: '¿Qué son @champion y @challenger en MLflow?', a: 'Champion: modelo en producción. Challenger: candidato nuevo. Se evalúan en el mismo tráfico real antes de que el challenger reemplace al champion.' },
      { q: '¿Qué es CML (Continuous Machine Learning)?', a: 'DVC versiona datos/modelos como código en Git. CML inyecta reportes de métricas (Markdown + gráficas) directamente en Pull Requests.' },
      { q: '¿Cuál es el flujo completo de CI/CD para ML?', a: 'Pull Request → Ejecución Automática (GPU + DVC) → Reporte CML → Decisión basada en datos → Merge a main → Despliegue automático.' },
      { q: '¿Qué debe existir en MLflow para aprobar pase a producción?', a: '1. Trazabilidad de Datos. 2. Métricas baseline. 3. Análisis Recall/Precision. 4. Modelo serializado en Registry con firma validada.' },
      { q: '¿Cuál es la diferencia entre Rollback y Rollforward?', a: 'Rollback: volver al champion anterior. Rollforward: corregir el problema y desplegar versión mejorada. El Registry permite ambas estrategias.' },
      { q: '¿Por qué no desplegar desde el notebook directamente?', a: 'Sin Quality Gate, sin pruebas de datos, sin firma ni versionado: cualquier cambio puede degradar silenciosamente el servicio sin alertas ni rollback.' },
      { q: '¿Qué son los Feature Flags en despliegue ML?', a: 'Separar deploy de feature release. Activar por segmento de usuarios. Permiten probar en producción sin exponer a todos los usuarios simultáneamente.' },
    ]
  },
]

export const SUMS = [
  {
    mod: 'Fundamentos MLOps', icon: '🧠', colors: ['#7C6EFA', '#A78BFA'],
    content: `El 85% de los modelos ML nunca llega a producción por procesos manuales. El costo de inactividad en sistemas predictivos es de <strong>$125,000/hora</strong>. MLOps automatiza el ciclo completo: <strong>CI</strong> (pruebas) → <strong>CD</strong> (despliegue) → <strong>CM</strong> (monitoreo) → <strong>CT</strong> (reentrenamiento). Madurez Google: Nivel 0 (manual/Jupyter), Nivel 1 (pipeline automatizado), Nivel 2 (automatización total con monitoreo de deriva).`,
    kws: [['CI/CD/CT', 'purple'], ['Model Decay', 'coral'], ['Madurez', 'teal'], ['Inner Loop', 'amber'], ['Quality Gate', 'teal'], ['Reproducibilidad', 'purple']]
  },
  {
    mod: 'Deriva y Degradación', icon: '📉', colors: ['#F87171', '#FBBF24'],
    content: `El modelo devuelve HTTP 200 (funciona técnicamente), pero la relevancia operativa cae. 3 tipos de deriva: <strong>Data Drift</strong> P(X), <strong>Concept Drift</strong> P(Y|X), <strong>Prior Drift</strong> P(Y). Detección: KS Test, KL Divergence, PSI (< 0.1 estable, ≥ 0.2 crítico). Reentrenamiento: Expanding Window para deriva gradual, Sliding Window para Concept Drift severo.`,
    kws: [['Data Drift', 'coral'], ['Concept Drift', 'coral'], ['PSI', 'purple'], ['KS Test', 'teal'], ['Expanding Window', 'amber'], ['Sliding Window', 'amber']]
  },
  {
    mod: 'MLflow — Ciclo de Vida', icon: '📊', colors: ['#60A5FA', '#818CF8'],
    content: `"Un modelo sin registro es un experimento perdido." 4 componentes: <strong>Tracking</strong> (parámetros, métricas, artefactos), <strong>Model Registry</strong> (estados Staging/Producción/Archived), <strong>Projects</strong> (reproducibilidad), <strong>Models</strong> (múltiples plataformas). La <strong>firma del modelo</strong> define el contrato de entrada. Ciclo: start_run() → log → Registry → inferencia por URI semántica.`,
    kws: [['Tracking', 'purple'], ['Model Registry', 'teal'], ['Artefactos', 'coral'], ['Firma', 'purple'], ['FLAML', 'pink'], ['AutoML', 'pink']]
  },
  {
    mod: 'Apache Airflow', icon: '🌀', colors: ['#FBBF24', '#FB923C'],
    content: `<strong>Airflow es el director de orquesta, no el procesador de datos.</strong> DAGs como plano del pipeline. TaskFlow API: @dag + @task = funciones Python como nodos. Regla crítica de XComs: solo metadatos pequeños (rutas, conteos). Para datos masivos: guardar en S3/disco y pasar solo la ruta. Idempotencia garantizada en cada tarea.`,
    kws: [['DAG', 'purple'], ['Operator', 'teal'], ['Sensor', 'amber'], ['Scheduler', 'purple'], ['XCom', 'coral'], ['TaskFlow API', 'pink'], ['Idempotencia', 'teal']]
  },
  {
    mod: 'RAG y LLMs', icon: '🤖', colors: ['#A78BFA', '#F472B6'],
    content: `RAG reduce alucinaciones hasta un 70%. 6 niveles de sofisticación: <strong>Básico</strong> (lineal), <strong>Avanzado</strong> (híbrido BM25+vectores+cross-encoder), <strong>Adaptativo</strong> (router LLM), <strong>Reflexivo CRAG</strong> (crítica + búsqueda web), <strong>Graph RAG</strong> (entidades interconectadas), <strong>Agéntico</strong> (equipo autónomo). Pipeline de ingesta: Carga → OCR → Chunking (1000/200) → Embeddings → Vector Store.`,
    kws: [['RAG Básico', 'purple'], ['RAG Avanzado', 'teal'], ['CRAG', 'coral'], ['Graph RAG', 'pink'], ['Chunking', 'amber'], ['Tríada RAG', 'teal']]
  },
  {
    mod: 'Bases de Datos Vectoriales', icon: '🗄️', colors: ['#60A5FA', '#34D399'],
    content: `La búsqueda semántica mide distancia física entre conceptos en un espacio vectorial. "Banco" e "institución financiera" son léxicamente distintos pero semánticamente cercanos. Algoritmos: <strong>HNSW</strong> (95-98% Recall, alto RAM) vs <strong>IVF</strong> (eficiente en memoria, filtros de metadatos). Usar siempre la misma métrica con la que se entrenó el modelo de embeddings.`,
    table: {
      heads: ['Base de datos', 'Cuándo usarla', 'Costo'],
      rows: [
        ['Pinecone', '<5M vectores, zero DevOps', '$50+/mes'],
        ['Weaviate', 'RAG híbrido BM25+vectores', '$45+/mes'],
        ['Qdrant', 'Filtros complejos, presupuesto bajo', 'Open source'],
        ['Milvus', '>100M vectores, escala masiva', 'Open source'],
        ['pgvector', 'Ya tienen PostgreSQL', 'Open source'],
      ]
    },
    kws: [['HNSW', 'purple'], ['IVF', 'teal'], ['Coseno', 'amber'], ['Crossover Point', 'pink'], ['ANN Search', 'teal']]
  },
  {
    mod: 'Despliegue y CI/CD', icon: '🚀', colors: ['#34D399', '#60A5FA'],
    content: `Estrategias de despliegue seguro: <strong>Shadow</strong> (paralelo invisible, riesgo 0%), <strong>Canary</strong> (5% tráfico real, escala gradual), <strong>Blue/Green</strong> (switch instantáneo + rollback inmediato). Champion/Challenger: competencia en tráfico real. CML inyecta reportes de métricas en Pull Requests para decisiones basadas en datos.`,
    kws: [['Shadow', 'purple'], ['Canary', 'teal'], ['Blue/Green', 'amber'], ['Champion', 'pink'], ['CML', 'coral'], ['DVC', 'teal'], ['Rollback', 'amber']]
  },
]

export const CHEAT_SECTIONS = [
  {
    title: '📐 Fórmulas Clave', items: [
      { key: 'f = g∘h', val: 'Pipeline = Preprocesador(g) + Estimador(h) como unidad atómica' },
      { key: 'PSI', val: 'Σ (P_prod − P_train) × ln(P_prod / P_train)' },
      { key: 'KL Divergence', val: 'Σ P(x) × log(P(x)/Q(x)) — info perdida entre distribuciones' },
      { key: 'Cosine Sim', val: 'cos(θ) = (A·B) / (|A|×|B|) — rango [-1, 1]' },
      { key: 'Distancia L2', val: '√Σ(aᵢ-bᵢ)² — distancia euclidiana en espacio vectorial' },
    ]
  },
  {
    title: '🔢 Umbrales Críticos', items: [
      { key: 'PSI < 0.1', val: '✅ Estable — sin acción requerida' },
      { key: 'PSI 0.1–0.2', val: '⚠️ Alerta temprana — monitorear de cerca' },
      { key: 'PSI ≥ 0.2', val: '🚨 Deriva crítica — disparar reentrenamiento' },
      { key: 'Canary %', val: '5% tráfico inicial → escala gradual hasta 100%' },
      { key: 'CHUNK_SIZE', val: '1000 chars | CHUNK_OVERLAP: 200 chars' },
    ]
  },
  {
    title: '🛠️ Stack MLOps', items: [
      { key: 'Git', val: 'Versionado de código — commits, branches, PRs' },
      { key: 'DVC', val: 'Versionado de datos — punteros en Git → S3/GCS' },
      { key: 'MLflow', val: 'Tracking + Model Registry + Firma del modelo' },
      { key: 'Docker', val: 'Reproducibilidad de entornos garantizada' },
      { key: 'Airflow', val: 'Orquestación DAGs + scheduling + monitoreo' },
    ]
  },
  {
    title: '📦 MLflow API', items: [
      { key: 'start_run()', val: 'Abre un experimento. Usar con "with" para cierre automático' },
      { key: 'log_param(k,v)', val: 'Registra hiperparámetro string. Ej: log_param("lr", 0.01)' },
      { key: 'log_metrics(d)', val: 'Registra dict de métricas numéricas con step opcional' },
      { key: 'log_model(m,n,sig)', val: 'Serializa modelo + firma como artefacto auditable' },
      { key: 'load_model(uri)', val: '"models:/Nombre/Production" — carga por URI semántica' },
    ]
  },
  {
    title: '🌀 Airflow Rápido', items: [
      { key: '@dag', val: 'Decorador que convierte función en definición de DAG' },
      { key: '@task', val: 'Decorador que convierte función Python en Operator' },
      { key: 'task1 >> task2', val: 'Dependencia: task2 ejecuta después de task1' },
      { key: 'XCom', val: 'Solo metadatos pequeños (<48KB). Datos grandes → S3 + path' },
      { key: 'schedule', val: '"@daily", "0 9 * * *" (cron), o None para manual' },
    ]
  },
  {
    title: '🤖 RAG Toolkit', items: [
      { key: 'Top-K', val: 'Número de chunks recuperados para el contexto (típico: 3-5)' },
      { key: 'HyDE', val: 'Hypothetical Document Embedding — genera doc hipotético para buscar' },
      { key: 'Cross-Encoder', val: 'Reordena chunks por relevancia real (lento pero más preciso)' },
      { key: 'BM25', val: 'Búsqueda léxica tradicional combinada con vectores = híbrida' },
      { key: 'Tríada RAG', val: 'Precisión Contexto + Fidelidad + Relevancia Respuesta' },
    ]
  },
  {
    title: '🗄️ Vector DB', items: [
      { key: 'Pinecone', val: 'Cloud, zero ops, <5M vectores — ideal startups' },
      { key: 'Weaviate', val: 'Búsqueda híbrida nativa BM25+vector+ML integrado' },
      { key: 'Qdrant', val: 'Rust, ultra-eficiente RAM, filtros payload complejos' },
      { key: 'Milvus', val: '>100M vectores, microservicios distribuidos' },
      { key: 'pgvector', val: 'Extension PostgreSQL — 0 nueva infra' },
    ]
  },
  {
    title: '🚀 Estrategias Deploy', items: [
      { key: 'Shadow', val: 'Paralelo + invisible al usuario. Riesgo: 0%' },
      { key: 'Canary', val: '5% tráfico real. Monitorear 24-48h. Rollback en segundos' },
      { key: 'Blue/Green', val: 'Switch DNS instantáneo. Rollback = flip del switch' },
      { key: 'Champion', val: 'Modelo activo en producción. Challenger lo desafía con A/B test' },
      { key: 'Feature Flags', val: 'Separar deploy de release. Activar por segmento de users' },
    ]
  },
]

export const MM_NODES = [
  { id: 'center', label: 'MLOps', x: .5, y: .5, r: 38, col: '#7C6EFA', tc: '#fff', desc: 'Industrialización del ciclo de vida de modelos ML. Automatiza validación y reentrenamiento continuo cuando los datos cambian o el rendimiento cae.', children: ['fnd', 'drift', 'pipe', 'mlf', 'air', 'rag', 'dep'] },
  { id: 'fnd', label: 'Fundamentos', x: .15, y: .15, r: 30, col: '#9B8DF9', tc: '#fff', desc: '85% de modelos nunca llegan a producción. CI/CD/CT/CM. Madurez en 3 niveles de Google. Inner Loop vs Outer Loop.', children: ['ci', 'madurez'] },
  { id: 'drift', label: 'Deriva', x: .5, y: .1, r: 28, col: '#F87171', tc: '#fff', desc: '3 tipos: Data Drift P(X), Concept Drift P(Y|X), Prior Drift P(Y). Detectar con PSI, KS Test, KL Divergence.', children: ['psi', 'triggers'] },
  { id: 'pipe', label: 'Pipelines', x: .85, y: .15, r: 28, col: '#34D399', tc: '#fff', desc: 'f = g∘h. Pipeline como artefacto inmutable. Scaler + Modelo versionados juntos. Quality Gate entre sandbox y producción.', children: ['dvc', 'eval'] },
  { id: 'mlf', label: 'MLflow', x: .85, y: .5, r: 28, col: '#60A5FA', tc: '#fff', desc: 'Tracking (parámetros, métricas, artefactos), Model Registry (champion/challenger), Firma del modelo, URI semántica.', children: ['flaml', 'registry'] },
  { id: 'air', label: 'Airflow', x: .85, y: .85, r: 28, col: '#FBBF24', tc: '#1A1730', desc: 'DAGs, Operators, Tasks, XComs. Orquestador: no procesa datos, coordina cuándo y cómo otros los mueven.', children: ['dag', 'xcom'] },
  { id: 'rag', label: 'RAG / LLMs', x: .5, y: .9, r: 28, col: '#A78BFA', tc: '#fff', desc: '6 niveles: Básico → Avanzado → Adaptativo → Reflexivo → Graph → Agéntico. Chunking, embeddings, vector stores.', children: ['niveles', 'vdb'] },
  { id: 'dep', label: 'Despliegue', x: .15, y: .85, r: 28, col: '#34D399', tc: '#fff', desc: 'Shadow → Canary (5%) → Blue/Green. CML en Pull Requests. Champion/Challenger en Model Registry.', children: ['shadow', 'canary'] },
  { id: 'ci', label: 'CI/CD/CT', x: .05, y: .32, r: 20, col: '#C4B5FD', tc: '#26215C', desc: 'CI: pruebas de código y datos. CD: despliegue. CT: reentrenamiento continuo. CM: detección de caída de métricas.' },
  { id: 'madurez', label: 'Madurez', x: .2, y: .3, r: 18, col: '#DDD6FE', tc: '#26215C', desc: 'Nivel 0: manual. Nivel 1: pipeline automatizado. Nivel 2: automatización total con monitoreo de deriva.' },
  { id: 'psi', label: 'PSI/KS', x: .35, y: .06, r: 18, col: '#FCA5A5', tc: '#4A1B0C', desc: 'PSI < 0.1: estable. 0.1-0.2: alerta. ≥ 0.2: deriva crítica. KS Test detecta diferencias estadísticas entre distribuciones.' },
  { id: 'triggers', label: 'Triggers CT', x: .62, y: .06, r: 18, col: '#FB923C', tc: '#3B1500', desc: '1. Temporal (programado mensual). 2. Rendimiento (caída en F1). 3. Deriva estadística (PSI > 0.25).' },
  { id: 'dvc', label: 'DVC/Git', x: .96, y: .32, r: 18, col: '#6EE7B7', tc: '#04342C', desc: 'DVC: punteros en Git → datos en S3/GCS. Docker para entornos reproducibles. Hash = snapshot inmutable.' },
  { id: 'eval', label: 'Quality Gate', x: .82, y: .3, r: 18, col: '#34D399', tc: '#04342C', desc: 'Evaluación estricta entre sandbox y producción. Rechazo automático si no supera umbral de F1. Sin métricas = sin promoción.' },
  { id: 'flaml', label: 'FLAML', x: .97, y: .5, r: 18, col: '#93C5FD', tc: '#042C53', desc: 'AutoML liviano. Búsqueda heurística en espacio de hiperparámetros con presupuesto de tiempo configurable.' },
  { id: 'registry', label: 'Registry', x: .82, y: .65, r: 18, col: '#60A5FA', tc: '#042C53', desc: 'Model Registry: versiona modelos, gestiona transiciones Staging→Production→Archived. URI semántica.' },
  { id: 'dag', label: 'DAGs', x: .97, y: .72, r: 18, col: '#FCD34D', tc: '#412402', desc: 'Grafo Acíclico Dirigido: plano del pipeline ML. Tareas con dependencias direccionales y sin ciclos.' },
  { id: 'xcom', label: 'XComs', x: .82, y: .82, r: 18, col: '#FBBF24', tc: '#412402', desc: 'Solo metadatos pequeños entre tareas. Nunca DataFrames. Datos grandes: ruta del archivo en S3.' },
  { id: 'niveles', label: 'Niveles RAG', x: .62, y: .96, r: 18, col: '#C4B5FD', tc: '#26215C', desc: '1:Básico 2:Avanzado(híbrido) 3:Adaptativo(router) 4:Reflexivo(CRAG) 5:Graph 6:Agéntico' },
  { id: 'vdb', label: 'Vector DBs', x: .35, y: .96, r: 18, col: '#A5F3FC', tc: '#042C4A', desc: 'Pinecone (cloud), Weaviate (híbrido), Qdrant (Rust eficiente), Milvus (escala masiva), pgvector (Postgres).' },
  { id: 'shadow', label: 'Shadow', x: .05, y: .7, r: 18, col: '#A7F3D0', tc: '#052E16', desc: 'Nuevo modelo en tráfico real sin impactar al usuario. Cero riesgo de negocio. Primer paso del despliegue seguro.' },
  { id: 'canary', label: 'Canary', x: .2, y: .68, r: 18, col: '#34D399', tc: '#052E16', desc: '5% de tráfico real al nuevo modelo. Si es saludable, escala al 100%. Blue/Green para rollback instantáneo.' },
]
