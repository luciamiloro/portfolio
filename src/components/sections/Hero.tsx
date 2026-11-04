import { useLocale, useTranslations } from "next-intl";
import { ArrowDownRight, Download } from "lucide-react";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { SketchTitle } from "../SketchTitle";

// Años desde que entraste a Softtek (nov 2023): se actualiza solo en cada build.
function yearsSince(year: number, monthIndex: number) {
  const now = new Date();
  let y = now.getFullYear() - year;
  if (now.getMonth() < monthIndex) y -= 1;
  return Math.max(y, 1);
}

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale() as "es" | "en";

  const stats = [
    { value: `${yearsSince(2023, 10)}+`, label: t("stats.years") },
    { value: String(projects.length), label: t("stats.projects") },
    { value: "2", label: t("stats.langs") },
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Grilla de fondo: guiño a la retícula del diseño editorial */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-20 sm:px-6 sm:pt-28">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-xs font-medium text-ink-2">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
          {t("eyebrow")}
        </p>

        <SketchTitle lineA={t("titleA")} lineB={t("titleB")} />

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">
          {t("lead")}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent hover:text-accent-ink"
          >
            {t("ctaProjects")} <ArrowDownRight size={18} aria-hidden />
          </a>
          <a
            href={site.cv[locale]}
            download
            className="inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3 font-medium transition hover:border-accent hover:text-accent"
          >
            <Download size={18} aria-hidden /> {t("ctaCv")}
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-3 font-medium underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
          >
            {t("ctaContact")}
          </a>
        </div>

        <dl className="mt-16 grid max-w-3xl grid-cols-1 gap-6 border-t border-line pt-8 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="font-display text-4xl font-medium">{s.value}</span>
                <span className="mt-1 block text-sm text-ink-2">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
