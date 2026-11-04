"use server";

import { Resend } from "resend";

export type ContactState = { status: "idle" | "success" | "error" | "invalid" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot anti-spam: los bots completan este campo oculto.
  if (formData.get("website")) return { status: "success" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !EMAIL_RE.test(email) || message.length < 10 || message.length > 5000) {
    return { status: "invalid" };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] Falta RESEND_API_KEY o CONTACT_TO_EMAIL");
    return { status: "error" };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Portfolio · ${name}${company ? ` (${company})` : ""}`,
      text: `${message}\n\n— ${name} <${email}>${company ? ` · ${company}` : ""}`,
    });
    return { status: error ? "error" : "success" };
  } catch (err) {
    console.error("[contact]", err);
    return { status: "error" };
  }
}
