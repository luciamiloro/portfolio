import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const t = useTranslations("nav");
  const items = [
    { href: "#projects", label: t("projects") },
    { href: "#about", label: t("about") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-display text-xl font-semibold tracking-tight">
          Lucía Miloro<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8 text-sm text-ink-2">
            {items.map((i) => (
              <li key={i.href}>
                <a href={i.href} className="transition hover:text-ink">
                  {i.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
