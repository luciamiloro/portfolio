import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { SectionHeading } from "./Projects";
import { ContactForm } from "../ContactForm";
import { SocialLinks } from "../SocialLinks";

export function Contact() {
  const t = useTranslations("contact");
  return (
    <section id="contact" className="border-t border-line bg-paper-2/50">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading kicker={t("kicker")} title={t("title")} />
          <p className="mt-6 text-lg text-ink-2">{t("lead")}</p>
          <p className="mt-8 text-sm text-ink-2">{t("or")}</p>
          <a href={`mailto:${site.email}`} className="mt-1 inline-block break-all font-display text-xl underline decoration-accent decoration-2 underline-offset-4 hover:text-accent sm:text-2xl">
            {site.email}
          </a>
          <div className="mt-8">
            <SocialLinks />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
