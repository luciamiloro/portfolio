// Next.js 16: "middleware" pasó a llamarse "proxy".
// Detecta el idioma del navegador / cookie y redirige "/" → "/es" o "/en".
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
