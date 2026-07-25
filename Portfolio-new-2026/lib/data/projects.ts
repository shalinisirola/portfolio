import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "PlanGrid",
    category: "ML-Based Material Demand Forecasting",
    description:
      "A machine-learning-powered forecasting platform that predicts material demand for power infrastructure projects using budget, location, tower type, substation type, and tax rates. Full-stack app with an interactive dashboard for visualizing demand forecasts and supporting procurement planning.",
    tech: ["React.js", "Flask", "MongoDB", "XGBoost", "REST APIs"],
    href: "https://github.com/shalinisirola/planGrid",
    demoHref: "https://plangridd.netlify.app/",
  },
  {
    title: "Aura",
    category: "AI-Powered Desktop Assistant",
    description:
      "A local AI desktop assistant with conversational memory, real-time streaming responses, and voice interaction. Built on a Retrieval-Augmented Generation (RAG) pipeline with ChromaDB for semantic search, plus secure terminal execution and Whisper-based speech recognition.",
    tech: ["Python", "REST APIs", "LangChain", "Ollama", "ChromaDB"],
    href: "https://github.com/shalinisirola/aura",
  },
  {
    title: "Visit South Africa",
    category: "Travel Website",
    description:
      "A responsive travel website showcasing South African destinations and attractions, with engaging layouts and an immersive browsing experience across devices. Focused on clean UI/UX principles and optimized performance.",
    tech: ["HTML", "CSS", "JavaScript"],
    href: "https://github.com/shalinisirola/visit-south-africa",
    demoHref: "https://visitsouthafrica.netlify.app/",
  },
];
