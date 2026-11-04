# Portfolio — Lucía Miloro

Next.js 16 (App Router, SSG) · TypeScript · Tailwind CSS v4 · next-intl (ES/EN) · next-themes (claro/oscuro) · Resend (contacto)

## Correr local

```bash
npm install
cp .env.example .env.local   # completá RESEND_API_KEY si querés probar el form
npm run dev                  # http://localhost:3000 → redirige a /es o /en
```

**Para verificar que todo anda:**
- `/` te manda a `/es` o `/en` según el idioma del navegador.
- Cambiá a EN con el selector → recargá `/` → entra en `/en` (queda guardado en la cookie `NEXT_LOCALE`).
- Cambiá a oscuro → recargá → sigue oscuro (queda en `localStorage.theme`), sin "flash" blanco.
- `npm run build` tiene que listar `/es` y `/en` como ● (SSG).

## Estructura

```
messages/            es.json · en.json  ← TODOS los textos (copies y proyectos)
public/cv/           PDFs del CV (es / en)
public/projects/     screenshots <id>.webp (1600×1000) → activalos con `image` en projects.ts
src/
  app/
    [locale]/        layout.tsx (SEO, providers) · page.tsx (secciones)
    actions/         contact.ts (Server Action + Resend + honeypot)
    globals.css      tokens de color claro/oscuro + tipografías
    sitemap.ts · robots.ts
  components/
    sections/        Hero · Projects · About · Contact
    projects/        ProjectGrid (filtros) · ProjectModal (<dialog>) · ProjectCover
    Header · Footer · LocaleSwitcher · ThemeToggle · ThemeProvider · ContactForm · SocialLinks · PersonJsonLd
  config/site.ts     email, links, rutas del CV
  content/projects.ts  stack, links, categoría de cada proyecto
  i18n/              routing · request · navigation
  proxy.ts           detección de idioma (ex "middleware" en Next 16)
```

### Agregar un proyecto
1. Sumalo en `src/content/projects.ts` con un `id` nuevo.
2. Agregá `projects.items.<id>` en **los dos** JSON de `messages/`.

## Deploy en Vercel + dominio propio

1. Subí el repo a GitHub (`git init && git add . && git commit -m "init" && git push`).
2. vercel.com → **Add New → Project** → importá el repo. Framework: Next.js (lo detecta solo).
3. **Environment Variables**: `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
4. Deploy. Cada push a `main` redeploya solo.
5. Dominio: `luciamiloro.com.ar`, registrado en NIC Argentina (nic.ar, con Clave Fiscal de ARCA nivel 2+).
6. Vercel → Project → **Settings → Domains** → agregá `luciamiloro.com.ar` y `www.luciamiloro.com.ar`.
7. NIC Argentina **no deja cargar registros A/CNAME**, solo delegar. En nic.ar → tu dominio → **Delegaciones** → cargá los nameservers de Vercel: `ns1.vercel-dns.com` y `ns2.vercel-dns.com` (sin IP). La propagación tarda de minutos a ~24 h.
8. HTTPS se genera solo. Cargá `NEXT_PUBLIC_SITE_URL=https://luciamiloro.com.ar` y redeployá.
9. (Opcional) Resend → **Domains** → verificá `luciamiloro.com.ar` (los registros TXT/MX se cargan en Vercel → Domains → DNS Records, porque Vercel pasa a ser tu DNS) y cambiá `CONTACT_FROM_EMAIL` a `Portfolio <hola@luciamiloro.com.ar>`.
10. Google Search Console → agregá el dominio → enviá `https://luciamiloro.com.ar/sitemap.xml`.

**Netlify:** también funciona (Add new site → Import from Git; el runtime de Next.js se instala solo). Dominios en *Domain management*. Si ya usás Vercel para Cuentas Claras, quedate en Vercel.

## Pendientes antes de publicar
- [ ] Reemplazar los `⟨completar⟩` de `messages/*.json` con métricas reales (o borrar esas líneas).
- [ ] Links de demo/repo de los proyectos 2–6 en `projects.ts` (sin link → muestra "Demo próximamente").
- [ ] `public/cv/CV_Lucia_Miloro_en.pdf` (versión en inglés).
- [ ] Transferir `lumikli/cuentas-claras` a `luciamiloro` (el link ya apunta ahí).
- [ ] Screenshots reales en `public/projects/` → reemplazan las portadas generativas.
- [ ] Imagen Open Graph 1200×630: `src/app/[locale]/opengraph-image.png`.
