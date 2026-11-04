import { useTranslations } from "next-intl";
import { SectionHeading } from "./Projects";

// Nombres de tecnologías: no se traducen, por eso viven acá y no en messages/.
const stack = {
  lowcode: ["Power Apps", "Power Automate", "Power Automate Desktop (RPA)", "Power BI · DAX", "Dataverse", "SharePoint", "Appian", "Azure OpenAI", "Cognitive Search"],
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Material UI", "Styled Components", "Tailwind CSS"],
  backend: ["MySQL", "MongoDB", "Supabase", "REST APIs"],
  design: ["Figma", "Photoshop", "Illustrator", "Lightroom", "After Effects"],
  tools: ["Git", "GitHub", "GitLab", "Postman", "Vercel", "AWS", "Scrum", "Kanban"],
} as const;

type Edu = { year: string; title: string; place: string };

export function About() {
  const t = useTranslations("about");
  const education = t.raw("education") as Edu[];
  const academic = t.raw("academic") as Edu[];

  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-16 px-4 py-24 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-2">
            <p>{t("p1")}</p>
            <p>{t("p2")}</p>
            <p className="text-ink">{t("p3")}</p>
          </div>

          <h3 className="mt-14 text-sm font-semibold uppercase tracking-wider">{t("timelineTitle")}</h3>
          <ol className="mt-5 border-l border-line">
            {education.map((e) => (
              <li key={e.title} className="relative pb-5 pl-6 last:pb-0">
                <span className="absolute -left-[5px] top-2 size-2.5 rounded-full border-2 border-paper bg-accent" aria-hidden />
                <span className="text-xs font-semibold text-accent">{e.year}</span>
                <p className="font-medium">{e.title}</p>
                <p className="text-sm text-ink-2">{e.place}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 text-sm font-semibold uppercase tracking-wider">{t("academicTitle")}</h3>
          <ul className="mt-5 space-y-4">
            {academic.map((a) => (
              <li key={a.title} className="rounded-xl border border-line p-4">
                <span className="text-xs font-semibold text-accent">{a.year}</span>
                <p className="font-medium">{a.title}</p>
                <p className="text-sm text-ink-2">{a.place}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-2xl font-medium">{t("stackTitle")}</h3>
          <div className="mt-6 space-y-7">
            {(Object.keys(stack) as (keyof typeof stack)[]).map((g) => (
              <div key={g}>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-ink-2">
                  {t(`groups.${g}`)}
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {stack[g].map((s) => (
                    <li key={s} className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm transition hover:border-accent">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
