// Datos personales y links en UN solo lugar. Cambiá acá y se actualiza todo el sitio.
export const site = {
  name: "Lucía Miloro",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "lucia.miloro.klimunda@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/lucia-miloro",
    github: "https://github.com/luciamiloro",
    behance: "", // dejalo vacío para ocultarlo
  },
  // Poné los PDFs en /public/cv/
  cv: {
    es: "/cv/CV_Lucia_Miloro_es.pdf",
    en: "/cv/CV_Lucia_Miloro_en.pdf",
  },
} as const;
