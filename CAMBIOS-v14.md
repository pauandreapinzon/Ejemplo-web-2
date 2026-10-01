# Cambios de la v14 — 27 de julio de 2026

Esta versión sincroniza el código fuente con lo que hay realmente en producción
y corrige los defectos técnicos que estaban bloqueando la indexación en Google
y la citabilidad en motores de IA.

## Por qué existe esta versión

El ZIP anterior (`Web-Paula-Pinzon-v13.zip`) llevaba meses **desincronizado** del
servidor. Los archivos de `public_html` en Hostinger se habían editado a mano
después del último despliegue, así que el `index.html` del ZIP (70.750 B) estaba
muy por detrás del de producción (91.986 B): le faltaban decenas de entidades en
los datos estructurados, el bloque de fallback estático y el splash de apertura.

**Desplegar la v13 habría borrado todo ese trabajo.** La v14 arregla eso: parte
del código fuente de la v13 y le incorpora todo lo que estaba sólo en el servidor,
más las correcciones nuevas.

## 1. El defecto grave: soft-404 universal

`public/.htaccess` tenía esta regla al final del bloque de reescritura:

```apache
RewriteRule . /index.html [L]
```

Cualquier URL que no existiera —incluidas `.png`, `.pdf`, `.xml`— devolvía
**código 200 con la página de inicio completa**. Para Google eso significa un
sitio lleno de contenido duplicado que nunca falla, uno de los patrones que más
castiga el rastreo y la indexación. Para los motores de IA significa que
cualquier enlace inventado "existe", lo que degrada la confianza en el dominio.

Ahora sólo `/conferencias` cae al router de React (y sólo si no hay archivo ni
carpeta con ese nombre); todo lo demás devuelve un 404 real:

```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^conferencias/?$ /index.html [L]

RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ - [R=404,L]

ErrorDocument 404 /404.html
```

Verificado en producción: `/no-existe-abc/`, `/imagen-inventada.png` y
`/algo.pdf` devuelven 404; `/`, `/conferencias/`, `/blog/`, `/juego/`,
`/sitemap.xml`, `/llms.txt`, `/robots.txt` y `/feed.xml` siguen en 200.

## 2. `public/404.html` (nuevo, 3.150 B)

Página de error propia, con la identidad visual del sitio, `noindex` y enlaces
de vuelta a las secciones principales.

## 3. `public/opengraph-image.png` (nuevo, 162.415 B)

La imagen de Open Graph estaba referenciada en **siete sitios** (cinco veces en
`index.html`, una en `juego/index.html` y una en `sitemap.xml`) y **no existía**:
daba 404. Por eso al compartir el enlace en WhatsApp o LinkedIn no aparecía vista
previa.

La nueva es de 1200×630 con la marca, la foto y las credenciales. Está optimizada
por debajo del límite en el que WhatsApp deja de generar la miniatura.

> Nota: la que está ahora mismo en el servidor son 333.603 B (se generó en el
> navegador). Ésta es la misma imagen reencodificada, más ligera. Al desplegar,
> mejora.

## 4. `index.html` sincronizado con producción (91.731 B)

Se tomó el de producción y se le devolvió la etiqueta de desarrollo
(`<script type="module" src="/src/main.tsx">`) en lugar de las referencias a los
bundles compilados, para que Vite pueda volver a construirlo.

Incluye, respecto a la v13:

- **CCB Tech Day 2026** — los dos eventos del 23 de julio de 2026 en Ágora Bogotá
  como objetos `Event` en JSON-LD (la charla de apertura de la Sala IA
  «Bienvenidos a la era agéntica: ¿Qué es Tribu IA?» a las 8:50 y el taller
  «Creatividad agéntica en acción: Crea con Claude» a la 1:00 p.m.), más el ítem
  correspondiente en la lista visible de eventos.
- Todas las organizaciones, universidades, eventos y credenciales que se habían
  añadido a mano en el servidor y no estaban en el código fuente.
- El bloque de fallback estático `<main id="ssr-fallback">`, que sobrevive a la
  hidratación de React y es lo que leen los agentes que no ejecutan JavaScript.
- **Corrección de ids duplicados**: el fallback estático repetía los mismos `id`
  que el árbol de React (`about`, `hero-title`, `services`, `faq`...). Ahora
  llevan prefijo `ssr-`, así que el HTML servido tiene 0 ids duplicados,
  0 `aria-labelledby` huérfanos y un solo `<h1>`.
- **Splash de apertura corregido**: antes tapaba la pantalla **7 segundos
  completos** por un `animation-delay` fijo, lo que empeoraba el LCP y la primera
  impresión. Ahora un `MutationObserver` lo retira en cuanto React monta —medido:
  ~800 ms— y el keyframe a 3,5 s queda sólo como red de seguridad.

Los 12 bloques JSON-LD parsean sin errores.

## 5. `public/sitemap.xml` (16.494 B) y `public/llms.txt` (13.527 B)

Sitemap depurado y `llms.txt` actualizado con CCB Tech Day 2026.

## 6. Páginas estáticas que faltaban en el código fuente

`public/juego/index.html` y `public/conferencias/index.html` existían en el
servidor pero no en el ZIP. Ya están.

## ⚠️ Antes de desplegar, leer esto

1. **`juego/assets/`** (el JS y el CSS del minijuego) **no está en este ZIP** ni
   en el código fuente: es un mini-proyecto aparte compilado. Si se despliega
   borrando `public_html`, el juego se rompe. Hay que conservar esa carpeta del
   servidor o volver a subirla.
2. **`assets/`** de la app principal se regenera con `npm run build`; no hay que
   conservarla.
3. Antes de tocar nada se copiaron los originales del servidor a
   `/copias-claude-2026-07-27/`, **fuera de `public_html`** y no accesible por
   web: `index.html`, `sitemap.xml`, `llms.txt`, `htaccess.txt`,
   `juego-index.html`, `conferencias-index.html`. Todo es reversible.

## Cómo construir

```bash
npm install
npm run build      # genera dist/
```

El contenido de `dist/` es lo que va a `public_html`.

## Lo que se revisó y NO hacía falta tocar

Los textos alternativos de las imágenes ya estaban bien: las decorativas llevan
`alt=""` con `aria-hidden`, y las de contenido (`paula-focus.webp`, las
miniaturas del portafolio) llevan `alt` descriptivo real.
