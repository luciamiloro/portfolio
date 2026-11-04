"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink, Lock, X } from "lucide-react";
import type { Project } from "@/content/projects";
import { ProjectCover } from "./ProjectCover";

// Usa <dialog> nativo: foco atrapado, cierre con ESC y accesibilidad gratis.
export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const t = useTranslations("projects");

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (project && !dialog.open) {
      dialog.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!project && dialog.open) dialog.close();
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);

  const k = project ? `items.${project.id}` : "";
  const highlights = project ? (t.raw(`${k}.highlights`) as string[]) : [];
  const title = project ? t(`${k}.title`) : "";

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()} // click en el backdrop
      aria-labelledby="project-title"
      className="m-auto w-[min(760px,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-line bg-paper p-0 text-ink shadow-2xl"
    >
      {project && (
        <article>
          <div className="relative">
            <ProjectCover project={project} title={title} large />
            <button
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-paper text-ink shadow transition hover:text-accent"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <div className="space-y-8 p-6 sm:p-10">
            <header>
              <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                {t(`filters.${project.category}`)}
              </p>
              <h3 id="project-title" className="mt-2 font-display text-3xl font-medium sm:text-4xl">
                {title}
              </h3>
              <p className="mt-2 text-lg text-ink-2">{t(`${k}.tagline`)}</p>
            </header>

            <div className="grid gap-6 sm:grid-cols-2">
              <Block title={t("problem")}>{t(`${k}.problem`)}</Block>
              <Block title={t("solution")}>{t(`${k}.solution`)}</Block>
            </div>

            <Block title={t("role")}>{t(`${k}.role`)}</Block>

            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">{t("highlights")}</h4>
              <ul className="space-y-2">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-ink-2">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider">{t("stack")}</h4>
              <ul className="flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-3 py-1 text-sm">{s}</li>
                ))}
              </ul>
            </div>

            <footer className="flex flex-wrap gap-3 border-t border-line pt-6">
              {project.links.demo ? (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent hover:text-accent-ink">
                  {t.has(`${k}.demoLabel`) ? t(`${k}.demoLabel`) : t("demo")} <ExternalLink size={16} aria-hidden />
                </a>
              ) : (
                project.category === "professional" ? (
                <p className="flex items-center gap-2 text-sm text-ink-2">
                  <Lock size={16} aria-hidden className="shrink-0 text-accent" /> {t("confidential")}
                </p>
              ) : (
                <span className="rounded-full border border-dashed border-line px-5 py-2.5 text-sm text-ink-2">{t("soon")}</span>
              )
              )}
              {project.links.extraDemos?.map((d) => (
                <a key={d.url} href={d.url} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent hover:text-accent-ink">
                  {t(`${k}.demos.${d.key}`)} <ExternalLink size={16} aria-hidden />
                </a>
              ))}
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm font-medium transition hover:border-accent hover:text-accent">
                  {t("repo")} <ExternalLink size={16} aria-hidden />
                </a>
              )}
            </footer>
          </div>
        </article>
      )}
    </dialog>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider">{title}</h4>
      <p className="leading-relaxed text-ink-2">{children}</p>
    </section>
  );
}
