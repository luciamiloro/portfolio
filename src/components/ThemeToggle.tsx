"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations("nav");
  const [mounted, setMounted] = useState(false);

  // El tema real solo se conoce en el cliente: evitamos mismatch de hidratación.
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={t("theme")}
      title={isDark ? t("themeLight") : t("themeDark")}
      className="grid size-10 place-items-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent"
    >
      {mounted ? (
        isDark ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />
      ) : (
        <span className="size-[18px]" />
      )}
    </button>
  );
}
