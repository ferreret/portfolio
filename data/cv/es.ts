import { CVContent } from '@/types';

export const cvEs: CVContent = {
  labels: {
    summary: "Resumen",
    experience: "Experiencia Profesional",
    education: "Educación",
    certifications: "Certificaciones",
    skills: "Habilidades",
    languages: "Idiomas",
    portfolio: "Portfolio",
  },
  summary: [
    "Senior Data Scientist & Software Engineer con más de 26 años de experiencia diseñando e implementando soluciones de alto impacto en sistemas empresariales, gestión documental y automatización de procesos.",
    "Actualmente enfocado en Agentes de IA, orquestación de LLMs y automatización inteligente, combinando una sólida base en desarrollo .NET con experiencia en Python, NLP e IA Generativa.",
    "Apasionado por prototipar, probar y escalar rápidamente sistemas de IA que mejoren la toma de decisiones, optimicen flujos de trabajo y entreguen valor comercial medible.",
  ],
  experience: [
    {
      company: "Tecnomedia Sistemas",
      role: "Especialista en Tecnología de Datos y Documentación",
      period: "Nov 2002 – Actualidad",
      location: "Barcelona, España",
      sections: [
        {
          title: "Agentes de IA e IA Generativa",
          bullets: [
            "Construcción y despliegue de agentes de IA para automatización de decisiones e integración de sistemas empresariales usando LangChain, LangGraph, CrewAI, n8n y Azure AI.",
            "Integración de modelos de IA generativa mediante el SDK de OpenAI, habilitando prototipado rápido y automatización fiable basada en LLMs.",
            "Diseño de pipelines de orquestación multi-agente para casos de uso reales (flujos documentales, programación sanitaria, integraciones CRM).",
            "Aplicación de principios de Programación Agéntica y herramientas CLI modernas (Claude Code, Gemini CLI, Antigravity) para construir, probar y escalar arquitecturas autónomas de agentes y automatización inteligente en los proyectos de la empresa.",
          ],
        },
        {
          title: "Soluciones Documentales y de Datos",
          bullets: [
            "Liderazgo en el desarrollo de aplicaciones de gestión documental en .NET (C# / WPF / WinForms) y SQL Server.",
            "Diseño de flujos de trabajo para digitalización, indexación, OCR/ICR y reconocimiento de códigos de barras en ámbitos industriales y sanitarios.",
          ],
        },
        {
          title: "Proyectos de IA/ML",
          bullets: [
            "Desarrollo de clasificación de texto basada en contenido (NLP) para gestión del conocimiento.",
            "Dirección de un proyecto de predicción de calidad en la industria química utilizando modelos de ML.",
          ],
        },
        {
          title: "Integración y Automatización",
          bullets: [
            "Implementación de soluciones RPA con C#, Python y low-code (n8n).",
            "Desarrollo de APIs REST e integración de sistemas empresariales con Minimal API y FastAPI.",
          ],
        },
      ],
    },
    {
      company: "NexTReT",
      role: "Programador - Analista Programador",
      period: "Dic 2000 – Nov 2002",
      location: "Barcelona, España",
      sections: [
        {
          bullets: [
            "Desarrollo de aplicaciones empresariales en VB6, SQL Server, ASP (VBScript) para clientes de seguros y consultoría.",
            "Construcción de soluciones de gestión de RRHH y nóminas con PowerBuilder.",
          ],
        },
      ],
    },
    {
      company: "Datasix Sistemas",
      role: "Consultor",
      period: "Oct 1999 – Dic 2000",
      location: "Barcelona, España",
      sections: [
        {
          bullets: [
            "Diseño e implementación de soluciones de Business Intelligence (VBA, SQL Server, análisis multidimensional).",
            "Desarrollo de Data Warehouses y Data Marts y formación de usuarios en herramientas de BI.",
          ],
        },
      ],
    },
  ],
  skills: [
    {
      category: "IA y ML",
      items: "LLMs, Programación Agéntica, Prompt Engineering, Agentes de IA, LangChain, LangGraph, CrewAI, OpenAI SDK, Claude Code, Gemini CLI, Antigravity, NLP, pipelines RAG",
    },
    {
      category: "Desarrollo de Software",
      items: ".NET (C#, VB.NET, WinForms, WPF), Python, JavaScript/TypeScript",
    },
    {
      category: "Datos y Cloud",
      items: "SQL Server, NoSQL, Azure (Functions, AI, Synapse, Data Factory), Docker",
    },
    {
      category: "Automatización",
      items: "Frameworks RPA, n8n, desarrollo de APIs (REST, OpenAPI)",
    },
    {
      category: "BI y Visualización",
      items: "Power BI, mapeo de procesos, sistemas human-in-the-loop",
    },
  ],
  languages: "Español y Catalán nativos · Inglés profesional",
};
