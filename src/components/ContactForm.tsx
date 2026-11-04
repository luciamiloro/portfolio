"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { sendContact, type ContactState } from "@/app/actions/contact";
import { site } from "@/config/site";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const t = useTranslations("contact");
  const [state, action, pending] = useActionState(sendContact, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="grid place-items-center rounded-2xl border border-line bg-paper p-10 text-center">
        <p className="font-display text-2xl">{t("success")}</p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-2/60 transition focus:border-accent focus:outline-none";

  return (
    <form action={action} className="space-y-4 rounded-2xl border border-line bg-paper p-6 sm:p-8" noValidate={false}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">{t("name")}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium">{t("email")}</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{t("company")}</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm font-medium">{t("message")}</span>
        <textarea name="message" required minLength={10} rows={5} className={`${field} resize-y`} />
      </label>

      {/* Honeypot: invisible para personas */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      {state.status === "invalid" && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{t("invalid")}</p>}
      {state.status === "error" && (
        <p role="alert" className="text-sm text-red-600 dark:text-red-400">
          {t("error")} <a className="underline" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:bg-accent hover:text-accent-ink disabled:opacity-60 sm:w-auto"
      >
        {pending ? t("sending") : t("send")} <Send size={16} aria-hidden />
      </button>
    </form>
  );
}
