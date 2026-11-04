import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // /es y /en siempre visibles en la URL: mejor para SEO (hreflang) y para compartir links.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
