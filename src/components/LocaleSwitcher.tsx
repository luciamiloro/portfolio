"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// Selector segmentado ES | EN. next-intl guarda la elección en la cookie NEXT_LOCALE,
// así que la próxima visita a "/" entra directo en el idioma elegido.
export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");

  function change(next: Locale) {
    if (next === locale) return;
    router.replace(pathname + window.location.hash, { locale: next, scroll: false });
  }

  return (
    <div role="group" aria-label={t("language")} className="flex rounded-full border border-line p-1 text-xs font-semibold">
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          aria-pressed={l === locale}
          onClick={() => change(l)}
          className={`rounded-full px-3 py-1.5 uppercase tracking-wide transition ${
            l === locale ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
