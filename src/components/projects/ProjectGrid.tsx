"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Star } from "lucide-react";
import { categories, projects, type CategoryFilter, type Project } from "@/content/projects";
import { ProjectCover } from "./ProjectCover";
import { ProjectModal } from "./ProjectModal";

export function ProjectGrid() {
  const t = useTranslations("projects");
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selected, setSelected] = useState<Project | null>(null);
  const grid = useRef<HTMLUListElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const reduce = useRef(false);

  const visible = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  // Entrada escalonada al hacer scroll. Se activa recién al hidratar:
  // sin JS las tarjetas se ven normales.
  useEffect(() => {
    const ul = grid.current;
    if (!ul) return;
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    ul.classList.add("reveal-ready");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    ul.querySelectorAll(".pcard-wrap:not(.in)").forEach((el, i) => {
      (el as HTMLElement).style.setProperty("--d", `${(i % 3) * 90}ms`);
      io.observe(el);
    });
    return () => io.disconnect();
  }, [filter]);

  // Inclinación 3D + luz que sigue al mouse + cursor "Ver"
  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (!reduce.current) {
      el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * 5}deg) rotateY(${(px - 0.5) * 6}deg) translateY(-4px)`;
    }
    const c = cursor.current;
    if (c) {
      c.style.left = `${e.clientX}px`;
      c.style.top = `${e.clientY}px`;
      c.classList.add("show");
    }
  }
  function onLeave(e: React.MouseEvent<HTMLButtonElement>) {
    e.currentTarget.style.transform = "";
    cursor.current?.classList.remove("show");
  }

  return (
    <>
      {/* Filtros */}
      <div role="tablist" aria-label={t("title")} className="mt-10 flex flex-wrap gap-2">
        {categories.map((c) => {
          const count = c === "all" ? projects.length : projects.filter((p) => p.category === c).length;
          const active = filter === c;
          return (
            <button
              key={c}
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-2 hover:border-ink hover:text-ink"
              }`}
            >
              {t(`filters.${c}`)} <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Grilla */}
      <ul ref={grid} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => {
          const title = t(`items.${p.id}.title`);
          const featured = p.featured && filter === "all";
          return (
            <li key={p.id} className={`pcard-wrap ${featured ? "sm:col-span-2 lg:col-span-3" : ""}`}>
              <button
                type="button"
                onClick={() => {
                  cursor.current?.classList.remove("show");
                  setSelected(p);
                }}
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                aria-haspopup="dialog"
                className={`pcard group flex h-full w-full flex-col overflow-hidden ${featured ? "lg:grid lg:grid-cols-[1.4fr_1fr]" : ""} rounded-2xl border border-line bg-paper text-left hover:border-accent`}
              >
                <div className="relative overflow-hidden">
                  <div className="transition duration-500 group-hover:scale-[1.03]">
                    <ProjectCover project={p} title={title} large={featured} />
                  </div>
                  {p.featured && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink">
                      <Star size={12} className="fill-current text-accent" aria-hidden /> {t("featured")}
                    </span>
                  )}
                </div>
                <div className={`flex flex-1 flex-col gap-3 p-6 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                    {t(`filters.${p.category}`)}
                  </p>
                  <h3 className={`font-display font-medium leading-tight ${featured ? "text-3xl lg:text-4xl" : "text-2xl"}`}>{title}</h3>
                  <p className="text-ink-2">{t(`items.${p.id}.tagline`)}</p>
                  <ul className={`flex flex-wrap gap-1.5 pt-3 ${featured ? "" : "mt-auto"}`}>
                    {p.stack.slice(0, 4).map((s) => (
                      <li key={s} className="rounded-md bg-paper-2 px-2 py-1 text-xs text-ink-2">
                        {s}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold group-hover:text-accent">
                    {t("viewDetail")} <ArrowUpRight size={16} aria-hidden className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      <div ref={cursor} className="view-cursor" aria-hidden>
        {t("cursor")}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
