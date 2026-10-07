import { AppContent } from './types';

// Projects
import { docscanStudio } from './data/projects/docscan-studio';
import { batchReactorReprocessClassifier } from './data/projects/batch-reactor-reprocess-classifier';

// Articles
import { aboutMe } from './data/articles/about-me';
import { claudioPersonalAssistant } from './data/articles/claudio-personal-assistant';
import { predictingBatchReactorReprocessing } from './data/articles/predicting-batch-reactor-reprocessing';

const enContent: AppContent = {
  ui: {
    locale: "en-GB",
    home: "Home",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact me",
    downloadCv: "Download CV",
    viewProjects: "View projects",
    heroTitlePrefix: "Designing intelligent ",
    heroTitleHighlight: "agents",
    heroTitleSuffix: " & systems",
    experienceTitle: "About me",
    coreTechTitle: "Core technologies",
    journeyTitle: "Professional journey",
    educationTitle: "Education",
    certificationsTitle: "Certifications",
    featuredProjectsTitle: "Selected projects",
    featuredProjectsSubtitle: "A selection of work demonstrating capabilities in generative AI, data science, and software architecture.",
    projectsPageTitle: "Projects",
    latestPostsTitle: "Latest articles",
    viewAllPosts: "View all articles",
    openSourceTitle: "Open source",
    codeBadge: "Code",
    nextProject: "Next project",
    nextPost: "Next article",
    relatedPost: "Read the article about this project",
    relatedProject: "See the project",
    ariaGithubProfile: "GitHub profile",
    ariaFooterNav: "Footer navigation",
    blogTitle: "Technical notes",
    blogSubtitle: "Thoughts on AI, automation, and software engineering.",
    backToBlog: "Back to blog",
    backToProjects: "Back to projects",
    readArticle: "Read article",
    available: "Available for new projects",
    copyright: "All rights reserved.",
    footerTagline: "Empowering enterprises with intelligent automation, generative AI, and robust software architecture.",
    skillsSubtitle: "Technologies and tools I use to bring ideas to life",
    activityTitle: "Currently building",
    activitySubtitle: "Recent public commits across my open source repositories. Updated automatically every 6 hours.",
    activityCommitSingular: "commit",
    activityCommitPlural: "commits",
    activityViewCommit: "View commit",
    allTags: "All",
    noProjectsFound: "No projects found with tag",
    noPostsFound: "No articles found with tag",
    clearFilter: "Clear filter",
    contactTitle: "Let's talk",
    contactSubtitle: "Open to conversations about AI Agents, LLM systems, and software architecture — whether it's a role, a collaboration, or an interesting problem you'd like to explore.",
    contactEmailTitle: "Email",
    contactEmailDesc: "Best channel for detailed proposals, roles, or project briefs. I reply within a couple of working days.",
    contactEmailCta: "Send an email",
    contactEmailSubject: "Portfolio contact",
    contactLinkedinTitle: "LinkedIn",
    contactLinkedinDesc: "Quick intros, recruiter messages, or just to connect. My primary social network for professional conversations.",
    contactLinkedinCta: "Open LinkedIn",
    contactGithubTitle: "GitHub",
    contactGithubDesc: "Browse my public projects and recent activity. The portfolio itself lives here too.",
    contactGithubCta: "Open GitHub",
    contactXTitle: "X",
    contactXDesc: "Where I post technical notes and share what I'm working on in machine learning and on Kaggle. For professional inquiries, email or LinkedIn work best.",
    contactXCta: "Open X",
    notFoundTitle: "Page not found",
    notFoundDescription: "The page you're looking for doesn't exist or has been moved.",
    notFoundCta: "Back to home",
    skipToContent: "Skip to content",
    emailCopiedLabel: "Copied!",
    ariaLangToggle: "Switch language to Spanish",
    ariaThemeToDark: "Switch to dark mode",
    ariaThemeToLight: "Switch to light mode",
    ariaOpenMenu: "Open menu",
    ariaCloseMenu: "Close menu",
    ariaMainNav: "Main navigation",
    ariaMobileNav: "Mobile navigation",
    ariaCopyEmail: "Copy email",
    ariaLinkedinProfile: "LinkedIn profile",
    ariaXProfile: "X profile",
    contactEmailCopy: "Copy",
    metaDescription: "Senior Data Scientist & AI Engineer with 26+ years of experience. Specialized in AI Agents, LLM orchestration, and intelligent automation.",
    githubLanguagesTitle: "Top languages",
    githubGraphAlt: "GitHub contribution graph for the last year",
    githubLess: "Less",
    githubMore: "More",
    errorTitle: "Something went wrong",
    errorDescription: "This page couldn't load. The site may have been updated while you had it open.",
    errorReload: "Reload page",
    caseStudy: {
      statusLabel: "Status",
      statusProduction: "In production",
      statusPrototype: "Prototype",
      statusArchived: "Archived",
      statusInDevelopment: "In development",
      roleLabel: "Role",
      timelineLabel: "Timeline",
      problemTitle: "Problem",
      solutionTitle: "Solution",
      metricsTitle: "Key figures",
      architectureTitle: "Architecture",
      techStackTitle: "Tech stack",
      lessonsLearnedTitle: "Lessons learned",
      liveDemo: "Live demo",
      viewCode: "View code"
    }
  },
  profile: {
    name: "Nicolás Barceló Lozano",
    title: "Senior Data Scientist & AI Engineer",
    location: "Barcelona, Spain",
    email: "nicolas.barcelo.lozano@gmail.com",
    linkedin: "https://www.linkedin.com/in/ferreret/",
    github: "https://github.com/ferreret",
    x: "https://x.com/nickpage100",
    summary: `Senior Data Scientist & AI Engineer with 26+ years of experience designing and implementing high-impact solutions across enterprise systems, document management, and process automation. Currently focused on AI Agents, LLM orchestration, and intelligent automation, combining a strong foundation in .NET development with expertise in Python, NLP, and Generative AI. Passionate about rapidly prototyping, testing, and scaling AI systems that enhance decision-making, optimize workflows, and deliver measurable business impact.`,
    education: [
      {
        degree: "Master's in AI, Data Science & ML and Big Data",
        institution: "IEBS Business School",
        period: "Nov 2022 - Sept 2023"
      },
      {
        degree: "Bachelor's Degree in Physics",
        institution: "Universitat de Barcelona",
        period: "Jun 1999"
      }
    ],
    certifications: [
      "TensorFlow Developer Certificate (2024)",
      "AZ-900 Azure Fundamentals",
      "AI-900 Azure AI Fundamentals",
      "PCEP-30-02 – Certified Entry-Level Python Programmer",
      "PCAP-31-03 – Certified Associate in Python"
    ]
  },
  experience: [
    {
      company: "Tecnomedia Sistemas",
      role: "Data and Documentation Technology Specialist",
      period: "Nov 2002 – Present",
      location: "Barcelona, Spain",
      highlights: [
        "Built and deployed AI agents for decision automation and enterprise system integration using LangChain, LangGraph, CrewAI, n8n, and Azure AI.",
        "Integrated generative AI models through the OpenAI SDK, enabling rapid prototyping and reliable LLM-based automation.",
        "Designed multi-agent orchestration pipelines for real-world use cases (document workflows, healthcare scheduling, CRM integrations).",
        "Led development of document management applications in .NET (C# / WPF / WinForms) and SQL Server.",
        "Developed content-based text classification (NLP) for knowledge management and directed quality prediction projects using ML models.",
        "Leveraged agentic coding tools (Claude Code, Gemini CLI, Antigravity) for accelerated software development and AI-assisted prototyping."
      ]
    },
    {
      company: "NexTReT",
      role: "Programmer - Analyst Programmer",
      period: "Dec 2000 - Nov 2002",
      location: "Barcelona, Spain",
      highlights: [
        "Developed enterprise applications in VB6, SQL Server, ASP (VBScript) for insurance and consultancy clients.",
        "Built HR and payroll management solutions with PowerBuilder."
      ]
    },
    {
      company: "Datasix Sistemas",
      role: "Consultant",
      period: "Oct 1999 - Dec 2000",
      location: "Barcelona, Spain",
      highlights: [
        "Designed and implemented Business Intelligence solutions (VBA, SQL Server, multidimensional analysis).",
        "Developed Data Warehouses and Data Marts and trained users in BI tools."
      ]
    }
  ],
  skillCategories: [
    {
      category: "AI & Machine Learning",
      skills: ["LLMs", "Prompt Engineering", "AI Agents", "Agentic Coding", "Claude Code", "Gemini CLI", "Antigravity", "LangChain", "LangGraph", "CrewAI", "OpenAI SDK", "NLP", "RAG Pipelines", "pgvector", "Qdrant", "Pinecone", "LangSmith", "Scikit-learn", "TensorFlow", "YOLO"]
    },
    {
      category: "Software Development",
      skills: [".NET (C#, VB.NET)", "Python", "JavaScript/TypeScript", "WinForms", "WPF"]
    },
    {
      category: "Data & Cloud",
      skills: ["SQL Server", "NoSQL", "Azure Functions", "Azure AI", "Synapse", "Data Factory", "Docker"]
    },
    {
      category: "Automation & BI",
      skills: ["RPA Frameworks", "n8n", "REST APIs", "Power BI", "Process Mapping"]
    }
  ],
  heroStats: [
    { value: "26+", label: "Years in tech" },
    { value: "23+", label: "Years at Tecnomedia" },
    { value: "2023", label: "Master in AI — IEBS" }
  ],
  projects: [
    docscanStudio.en,
    batchReactorReprocessClassifier.en
  ],
  blog: [
    predictingBatchReactorReprocessing.en,
    claudioPersonalAssistant.en,
    aboutMe.en
  ]
};

const esContent: AppContent = {
  ui: {
    locale: "es-ES",
    home: "Inicio",
    projects: "Proyectos",
    blog: "Blog",
    contact: "Contáctame",
    downloadCv: "Descargar CV",
    viewProjects: "Ver proyectos",
    heroTitlePrefix: "Diseñando ",
    heroTitleHighlight: "agentes inteligentes",
    heroTitleSuffix: " y sistemas",
    experienceTitle: "Sobre mí",
    coreTechTitle: "Tecnologías principales",
    journeyTitle: "Trayectoria profesional",
    educationTitle: "Formación",
    certificationsTitle: "Certificaciones",
    featuredProjectsTitle: "Proyectos seleccionados",
    featuredProjectsSubtitle: "Una selección de trabajos que demuestran capacidades en IA generativa, ciencia de datos y arquitectura de software.",
    projectsPageTitle: "Proyectos",
    latestPostsTitle: "Últimos artículos",
    viewAllPosts: "Ver todos los artículos",
    openSourceTitle: "Código abierto",
    codeBadge: "Código",
    nextProject: "Siguiente proyecto",
    nextPost: "Siguiente artículo",
    relatedPost: "Lee el artículo sobre este proyecto",
    relatedProject: "Ver el proyecto",
    ariaGithubProfile: "Perfil de GitHub",
    ariaFooterNav: "Navegación del pie de página",
    blogTitle: "Notas técnicas",
    blogSubtitle: "Reflexiones sobre IA, automatización e ingeniería de software.",
    backToBlog: "Volver al blog",
    backToProjects: "Volver a proyectos",
    readArticle: "Leer artículo",
    available: "Disponible para nuevos proyectos",
    copyright: "Todos los derechos reservados.",
    footerTagline: "Potenciando empresas con automatización inteligente, IA generativa y arquitectura de software robusta.",
    skillsSubtitle: "Tecnologías y herramientas que utilizo para dar vida a las ideas",
    activityTitle: "Construyendo ahora",
    activitySubtitle: "Últimos commits públicos en mis repositorios open source. Se actualiza automáticamente cada 6 horas.",
    activityCommitSingular: "commit",
    activityCommitPlural: "commits",
    activityViewCommit: "Ver commit",
    allTags: "Todos",
    noProjectsFound: "No se encontraron proyectos con la etiqueta",
    noPostsFound: "No se encontraron artículos con la etiqueta",
    clearFilter: "Limpiar filtro",
    contactTitle: "Hablemos",
    contactSubtitle: "Abierto a conversaciones sobre Agentes de IA, sistemas con LLM y arquitectura de software, ya sea una oferta, una colaboración o un problema interesante que quieras explorar.",
    contactEmailTitle: "Email",
    contactEmailDesc: "El mejor canal para propuestas detalladas, ofertas o briefs de proyecto. Respondo en un par de días laborables.",
    contactEmailCta: "Enviar un email",
    contactEmailSubject: "Contacto desde el portfolio",
    contactLinkedinTitle: "LinkedIn",
    contactLinkedinDesc: "Presentaciones rápidas, mensajes de recruiters o simplemente conectar. Mi red social principal para conversaciones profesionales.",
    contactLinkedinCta: "Abrir LinkedIn",
    contactGithubTitle: "GitHub",
    contactGithubDesc: "Explora mis proyectos públicos y actividad reciente. El propio portfolio vive aquí también.",
    contactGithubCta: "Abrir GitHub",
    contactXTitle: "X",
    contactXDesc: "Donde publico notas técnicas y comparto lo que voy haciendo en machine learning y en Kaggle. Para consultas profesionales, mejor por email o LinkedIn.",
    contactXCta: "Abrir X",
    notFoundTitle: "Página no encontrada",
    notFoundDescription: "La página que buscas no existe o ha sido movida.",
    notFoundCta: "Volver al inicio",
    skipToContent: "Saltar al contenido",
    emailCopiedLabel: "¡Copiado!",
    ariaLangToggle: "Cambiar idioma a inglés",
    ariaThemeToDark: "Cambiar a modo oscuro",
    ariaThemeToLight: "Cambiar a modo claro",
    ariaOpenMenu: "Abrir menú",
    ariaCloseMenu: "Cerrar menú",
    ariaMainNav: "Navegación principal",
    ariaMobileNav: "Navegación móvil",
    ariaCopyEmail: "Copiar email",
    ariaLinkedinProfile: "Perfil de LinkedIn",
    ariaXProfile: "Perfil de X",
    contactEmailCopy: "Copiar",
    metaDescription: "Senior Data Scientist & AI Engineer con más de 26 años de experiencia. Especializado en Agentes de IA, orquestación de LLMs y automatización inteligente.",
    githubLanguagesTitle: "Lenguajes principales",
    githubGraphAlt: "Gráfico de contribuciones en GitHub del último año",
    githubLess: "Menos",
    githubMore: "Más",
    errorTitle: "Algo ha fallado",
    errorDescription: "No se ha podido cargar esta página. Puede que la web se haya actualizado mientras la tenías abierta.",
    errorReload: "Recargar la página",
    caseStudy: {
      statusLabel: "Estado",
      statusProduction: "En producción",
      statusPrototype: "Prototipo",
      statusArchived: "Archivado",
      statusInDevelopment: "En desarrollo",
      roleLabel: "Rol",
      timelineLabel: "Periodo",
      problemTitle: "Problema",
      solutionTitle: "Solución",
      metricsTitle: "En cifras",
      architectureTitle: "Arquitectura",
      techStackTitle: "Stack técnico",
      lessonsLearnedTitle: "Lecciones aprendidas",
      liveDemo: "Demo en vivo",
      viewCode: "Ver código"
    }
  },
  profile: {
    name: "Nicolás Barceló Lozano",
    title: "Senior Data Scientist & AI Engineer",
    location: "Barcelona, España",
    email: "nicolas.barcelo.lozano@gmail.com",
    linkedin: "https://www.linkedin.com/in/ferreret/",
    github: "https://github.com/ferreret",
    x: "https://x.com/nickpage100",
    summary: `Senior Data Scientist & AI Engineer con más de 26 años de experiencia diseñando e implementando soluciones de alto impacto en sistemas empresariales, gestión documental y automatización de procesos. Actualmente enfocado en Agentes de IA, orquestación de LLMs y automatización inteligente, combinando una sólida base en desarrollo .NET con experiencia en Python, NLP e IA Generativa. Apasionado por prototipar, probar y escalar rápidamente sistemas de IA que mejoren la toma de decisiones, optimicen flujos de trabajo y entreguen valor comercial medible.`,
    education: [
      {
        degree: "Máster en IA, Data Science & ML y Big Data",
        institution: "IEBS Business School",
        period: "Nov 2022 - Sept 2023"
      },
      {
        degree: "Licenciatura en Física",
        institution: "Universitat de Barcelona",
        period: "Jun 1999"
      }
    ],
    certifications: [
      "TensorFlow Developer Certificate (2024)",
      "AZ-900 Azure Fundamentals",
      "AI-900 Azure AI Fundamentals",
      "PCEP-30-02 – Certified Entry-Level Python Programmer",
      "PCAP-31-03 – Certified Associate in Python"
    ]
  },
  experience: [
    {
      company: "Tecnomedia Sistemas",
      role: "Especialista en Tecnología de Datos y Documentación",
      period: "Nov 2002 – Actualidad",
      location: "Barcelona, España",
      highlights: [
        "Construcción y despliegue de agentes de IA para automatización de decisiones e integración de sistemas empresariales usando LangChain, LangGraph, CrewAI, n8n y Azure AI.",
        "Integración de modelos de IA generativa a través del SDK de OpenAI, permitiendo prototipado rápido y automatización confiable basada en LLMs.",
        "Diseño de pipelines de orquestación multi-agente para casos de uso reales (flujos de trabajo documentales, programación sanitaria, integraciones CRM).",
        "Liderazgo en el desarrollo de aplicaciones de gestión documental en .NET (C# / WPF / WinForms) y SQL Server.",
        "Desarrollo de clasificación de texto basada en contenido (NLP) para gestión del conocimiento y proyectos de predicción de calidad utilizando modelos de ML.",
        "Uso de herramientas de programación agéntica (Claude Code, Gemini CLI, Antigravity) para desarrollo acelerado de software y prototipado asistido por IA."
      ]
    },
    {
      company: "NexTReT",
      role: "Programador - Analista Programador",
      period: "Dic 2000 - Nov 2002",
      location: "Barcelona, España",
      highlights: [
        "Desarrollo de aplicaciones empresariales en VB6, SQL Server, ASP (VBScript) para clientes de seguros y consultoría.",
        "Construcción de soluciones de gestión de RRHH y nóminas con PowerBuilder."
      ]
    },
    {
      company: "Datasix Sistemas",
      role: "Consultor",
      period: "Oct 1999 - Dic 2000",
      location: "Barcelona, España",
      highlights: [
        "Diseño e implementación de soluciones de Business Intelligence (VBA, SQL Server, análisis multidimensional).",
        "Desarrollo de Data Warehouses y Data Marts y formación de usuarios en herramientas de BI."
      ]
    }
  ],
  skillCategories: [
    {
      category: "IA y Machine Learning",
      skills: ["LLMs", "Prompt Engineering", "AI Agents", "Agentic Coding", "Claude Code", "Gemini CLI", "Antigravity", "LangChain", "LangGraph", "CrewAI", "OpenAI SDK", "NLP", "RAG Pipelines", "pgvector", "Qdrant", "Pinecone", "LangSmith", "Scikit-learn", "TensorFlow", "YOLO"]
    },
    {
      category: "Desarrollo de Software",
      skills: [".NET (C#, VB.NET)", "Python", "JavaScript/TypeScript", "WinForms", "WPF"]
    },
    {
      category: "Datos y Cloud",
      skills: ["SQL Server", "NoSQL", "Azure Functions", "Azure AI", "Synapse", "Data Factory", "Docker"]
    },
    {
      category: "Automatización y BI",
      skills: ["RPA Frameworks", "n8n", "REST APIs", "Power BI", "Mapeo de Procesos"]
    }
  ],
  heroStats: [
    { value: "26+", label: "Años en tecnología" },
    { value: "23+", label: "Años en Tecnomedia" },
    { value: "2023", label: "Máster en IA — IEBS" }
  ],
  projects: [
    docscanStudio.es,
    batchReactorReprocessClassifier.es
  ],
  blog: [
    predictingBatchReactorReprocessing.es,
    claudioPersonalAssistant.es,
    aboutMe.es
  ]
};

export const content = {
  en: enContent,
  es: esContent
};
