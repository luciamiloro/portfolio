import { useTranslations } from "next-intl";
import { ProjectGrid } from "../projects/ProjectGrid";

export function Projects() {
  const t = useTranslations("projects");
  return (
    <section id="projects" className="border-t border-line bg-paper-2/50">
      <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
        <SectionHeading kicker={t("kicker")} title={t("title")} />
        <p className="mt-4 max-w-2xl text-lg text-ink-2">{t("intro")}</p>
        <ProjectGrid />
      </div>
    </section>
  );
}

export function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <header>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{kicker}</p>
      <h2 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">{title}</h2>
    </header>
  );
}
