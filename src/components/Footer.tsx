import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-ink-2 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}. {t("rights")}
          <br className="sm:hidden" /> <span className="opacity-70">{t("built")}</span>
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
