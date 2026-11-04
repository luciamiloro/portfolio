"use client";

import { ThemeProvider as NextThemes } from "next-themes";

// Persiste la elección en localStorage ("theme") y respeta el modo del sistema
// la primera vez. Inyecta un script inline que evita el "flash" de tema incorrecto.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      // React 19 avisa si renderiza un <script> en el cliente. El script solo hace
      // falta en el HTML del servidor; en el cliente lo marcamos como no ejecutable.
      scriptProps={typeof window === "undefined" ? undefined : { type: "application/json" }}
    >
      {children}
    </NextThemes>
  );
}
