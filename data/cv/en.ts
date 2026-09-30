import { CVContent } from '@/types';

export const cvEn: CVContent = {
  labels: {
    summary: "Summary",
    experience: "Professional Experience",
    education: "Education",
    certifications: "Certifications",
    skills: "Skills",
    languages: "Languages",
    portfolio: "Portfolio",
  },
  summary: [
    "Senior Data Scientist & Software Engineer with 26+ years of experience designing and implementing high-impact solutions across enterprise systems, document management, and process automation.",
    "Currently focused on AI Agents, LLM orchestration, and intelligent automation, combining a strong foundation in .NET development with expertise in Python, NLP, and Generative AI.",
    "Passionate about rapidly prototyping, testing, and scaling AI systems that enhance decision-making, optimize workflows, and deliver measurable business impact.",
  ],
  experience: [
    {
      company: "Tecnomedia Sistemas",
      role: "Data and Documentation Technology Specialist",
      period: "Nov 2002 – Present",
      location: "Barcelona, Spain",
      sections: [
        {
          title: "AI Agents & Generative AI",
          bullets: [
            "Built and deployed AI agents for decision automation and enterprise system integration using LangChain, LangGraph, CrewAI, n8n, and Azure AI.",
            "Integrated generative AI models through the OpenAI SDK, enabling rapid prototyping and reliable LLM-based automation.",
            "Designed multi-agent orchestration pipelines for real-world use cases (document workflows, healthcare scheduling, CRM integrations).",
            "Leveraging Agentic Programming principles and modern CLI tools (Claude Code, Gemini CLI, Antigravity) to build, test, and scale autonomous agent architectures and intelligent automation within company projects.",
          ],
        },
        {
          title: "Document & Data Solutions",
          bullets: [
            "Led development of document management applications in .NET (C# / WPF / WinForms) and SQL Server.",
            "Designed workflows for digitization, indexing, OCR/ICR, and barcode recognition in industrial and healthcare domains.",
          ],
        },
        {
          title: "AI/ML Projects",
          bullets: [
            "Developed content-based text classification (NLP) for knowledge management.",
            "Directed a quality prediction project in the chemical industry using ML models.",
          ],
        },
        {
          title: "Integration & Automation",
          bullets: [
            "Implemented RPA solutions with C#, Python, and low-code (n8n).",
            "Built REST APIs and integrated enterprise systems with Minimal API and FastAPI.",
          ],
        },
      ],
    },
    {
      company: "NexTReT",
      role: "Programmer - Analyst Programmer",
      period: "Dec 2000 – Nov 2002",
      location: "Barcelona, Spain",
      sections: [
        {
          bullets: [
            "Developed enterprise applications in VB6, SQL Server, ASP (VBScript) for insurance and consultancy clients.",
            "Built HR and payroll management solutions with PowerBuilder.",
          ],
        },
      ],
    },
    {
      company: "Datasix Sistemas",
      role: "Consultant",
      period: "Oct 1999 – Dec 2000",
      location: "Barcelona, Spain",
      sections: [
        {
          bullets: [
            "Designed and implemented Business Intelligence solutions (VBA, SQL Server, multidimensional analysis).",
            "Developed Data Warehouses and Data Marts and trained users in BI tools.",
          ],
        },
      ],
    },
  ],
  skills: [
    {
      category: "AI & ML",
      items: "LLMs, Agentic Programming, Prompt Engineering, AI Agents, LangChain, LangGraph, CrewAI, OpenAI SDK, Claude Code, Gemini CLI, Antigravity, NLP, RAG pipelines",
    },
    {
      category: "Software Development",
      items: ".NET (C#, VB.NET, WinForms, WPF), Python, JavaScript/TypeScript",
    },
    {
      category: "Data & Cloud",
      items: "SQL Server, NoSQL, Azure (Functions, AI, Synapse, Data Factory), Docker",
    },
    {
      category: "Automation",
      items: "RPA frameworks, n8n, API development (REST, OpenAPI)",
    },
    {
      category: "BI & Visualization",
      items: "Power BI, process mapping, human-in-the-loop systems",
    },
  ],
  languages: "Native Spanish & Catalan · Professional English",
};
