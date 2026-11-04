import Image from "next/image";
import type { Project } from "@/content/projects";

// Portada: usa el screenshot si existe; si no, una composición tipográfica
// generada con el color del proyecto (así el sitio se ve terminado desde el día 1).
export function ProjectCover({ project, title, large = false }: { project: Project; title: string; large?: boolean }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={title}
        width={1600}
        height={1000}
        sizes={large ? "(min-width: 768px) 720px, 100vw" : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"}
        className="aspect-[16/10] w-full object-cover"
      />
    );
  }


  return (
    <div
      aria-hidden
      className="relative aspect-[16/10] w-full overflow-hidden"
      style={{ background: `var(--c-${project.accent})` }}
    >
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:18px_18px]" />
      <span
        className={`absolute -bottom-6 right-3 font-display font-semibold italic leading-none text-white/90 ${
          large ? "text-[11rem]" : "text-[8rem]"
        }`}
      >
        {project.mark}
      </span>
      <span className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-widest text-white backdrop-blur">
        {project.stack[0]}
      </span>
    </div>
  );
}
