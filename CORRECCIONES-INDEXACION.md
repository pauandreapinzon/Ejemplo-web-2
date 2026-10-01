# Correcciones de indexación — Search Console [WNC-20237597]

## Problema 1 — "Alternate page with proper canonical tag" en `/conferencias`

**Causa raíz:** `/conferencias` es una ruta de React Router sin carpeta propia en el
hosting. En Hostinger/Apache el fallback SPA del `.htaccess` la servía con el
`index.html` raíz (el de la home): mismo `<title>`, misma meta description y
`<link rel="canonical" href="https://www.paulaandreapinzon.com/">`. Google
interpretaba que el contenido "real" estaba en la home y no la indexaba aparte.

**Solución (vive en el build, no es un parche manual en el hosting):**

1. **`vite.config.ts` — nuevo plugin `prerenderStaticRoutes`.**
   Tras el build (`closeBundle`), genera `dist/conferencias/index.html` a partir
   del `dist/index.html` recién compilado. Reutiliza las etiquetas `<script>`/
   `<link>` **con el hash del build actual** (así React arranca igual que en la
   home) pero con:
   - `<title>`, meta description y keywords propios de conferencias.
   - `<link rel="canonical" href="https://www.paulaandreapinzon.com/conferencias/">`
     autorreferenciado (ya **no** apunta a la home).
   - Open Graph, Twitter Card y JSON-LD (`CollectionPage` + `ItemList` de las 3
     charlas + `BreadcrumbList`).
   - Dentro de `#root`, un **fallback estático legible por crawlers sin JS**
     (mismo patrón que el bloque `#ssr-fallback` de la home). React
     (`createRoot().render`) lo reemplaza al montar, por lo que el usuario ve la
     página interactiva normal.

   Es genérico: para pre-renderizar otra ruta en el futuro, anade una entrada a
   `prerenderRoutes` con su `head` y `body`.

2. **`src/pages/Conferencias.tsx`.**
   El `useEffect` ahora sincroniza en cliente `document.title`, `meta description`,
   `og:title/og:description/og:url` y `link canonical` al montar, y **restaura**
   los valores previos al desmontar (para no arrastrar el canonical de
   conferencias al volver a la home por navegacion SPA).

3. **`public/sitemap.xml`.**
   La entrada de conferencias paso de `/conferencias` a `/conferencias/` (con
   barra final) en el `<loc>` y en los `hreflang`, para coincidir con el canonical
   y evitar un salto de redireccion innecesario.

**Desplegar:** ejecuta `npm run build` y sube el contenido de `dist/` como
`public_html`. El `dist/` incluido en este .zip ya trae `conferencias/index.html`
generado con los hashes actuales, asi que tambien puede subirse tal cual sin
reconstruir. Tras subir, en Search Console pulsa **"Validate Fix"** en el reporte.

> Nota: revisa/ajusta description, keywords y OG con precios/fechas/formato reales
> de cada charla si aplica; los redacte con base en el contenido visible de la pagina.

## Problema 2 — "Redirect error" en `/blog/como-elegir-mejor-conferencista-ia-2026` (sin barra)

**No es un problema de codigo.** Esa URL ya tiene su carpeta pre-renderizada con
canonical autorreferenciado correcto (`.../como-elegir-mejor-conferencista-ia-2026/`).
La redireccion normal de la version sin barra a la version con barra es la que hace
Apache (`DirectorySlash`, 301). El "Redirect error" vino de una respuesta **HTTP 503**
intermitente del servidor durante al menos una carga antes de completar el 301.

**Que hacer (hosting, no repo):**

1. Revisar en Hostinger los **logs de acceso/errores** alrededor de las fechas en
   que Googlebot rastreo esa URL: buscar 503, `Resource limit reached`, picos de
   CPU/RAM o entradas de LiteSpeed/Apache que coincidan.
2. Descartar **limites del plan** (CPU/procesos/entry processes) y, si aparecen,
   subir el plan o activar cache para reducir carga.
3. Confirmar que **Googlebot no esta bloqueado** por WAF/rate-limiting del hosting.
4. Una vez estable, pulsar **"Validate Fix"** en el reporte de indexacion para que
   Google reintente. Como la causa es intermitente, la validacion deberia pasar si
   no reaparecen 503 durante el reintento.
