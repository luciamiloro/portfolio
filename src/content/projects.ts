// Datos "duros" de cada proyecto (stack, links, categoría).
// Los textos (título, problema, solución, métricas) viven en messages/es.json y en.json
// bajo projects.items.<id>, así se traducen sin tocar este archivo.

/** personal = proyecto propio con demo · professional = trabajo para clientes (confidencial) */
export type ProjectCategory = "personal" | "professional";

export type Project = {
  id: string;
  category: ProjectCategory;
  stack: string[];
  featured?: boolean;
  /** Color de la portada generativa (cuando no hay screenshot). */
  accent: "lake" | "clay" | "moss" | "ink" | "violet" | "sand";
  /** 2 letras grandes de la portada generativa */
  mark: string;
  /** Screenshot opcional en /public/projects/<id>.webp (1600x1000 recomendado) */
  image?: string;
  links: {
    demo?: string;
    repo?: string;
    /** Demos adicionales; el texto del botón sale de projects.items.<id>.demos.<key> */
    extraDemos?: { key: string; url: string }[];
  };
};

export const projects: Project[] = [
  // ---------- Proyectos propios ----------
  {
    id: "expenses",
    mark: "CC",
    category: "personal",
    featured: true,
    accent: "lake",
    image: "/projects/expenses.webp",
    stack: ["TypeScript", "React", "Vite", "Supabase", "Google OAuth", "Power BI", "Vercel"],
    links: {
      demo: "https://cuentas-claras-iota-ten.vercel.app",
      repo: "https://github.com/luciamiloro/cuentas-claras",
    },
  },
  {
    id: "realestate",
    mark: "Re",
    category: "personal",
    accent: "clay",
    image: "/projects/realestate.webp",
    stack: ["Vite", "Leaflet", "OpenStreetMap", "Responsive", "UX/UI", "Vercel"],
    links: {
      demo: "https://casa-lago-puelo.vercel.app",
      repo: "https://github.com/luciamiloro/casa-lago-puelo",
      extraDemos: [{ key: "rent", url: "https://deptodiucon.vercel.app" }],
    },
  },
  {
    id: "mementomori",
    mark: "MM",
    category: "personal",
    accent: "ink",
    image: "/projects/mementomori.webp",
    stack: ["TypeScript", "React", "Vite", "CSS print", "Vercel"],
    links: {
      demo: "https://mementomori-calendar.vercel.app",
      repo: "https://github.com/luciamiloro/memento-mori",
    },
  },

  // ---------- Experiencia en Softtek (sin demos: confidencial) ----------
  {
    id: "canvas",
    mark: "PA",
    category: "professional",
    accent: "violet",
    stack: ["Power Apps", "Power Fx", "Dataverse", "SharePoint"],
    links: {},
  },
  {
    id: "automate",
    mark: "Fx",
    category: "professional",
    accent: "sand",
    stack: ["Power Automate", "Power Automate Desktop (RPA)", "Dataverse", "SharePoint"],
    links: {},
  },
  {
    id: "powerbi",
    mark: "BI",
    category: "professional",
    accent: "moss",
    stack: ["Power BI", "DAX", "Data modeling"],
    links: {},
  },
  {
    id: "chatbot",
    mark: "AI",
    category: "professional",
    accent: "ink",
    stack: ["Azure OpenAI", "Azure Cognitive Search", "RAG"],
    links: {},
  },
];

export const categories = ["all", "personal", "professional"] as const;
export type CategoryFilter = (typeof categories)[number];
