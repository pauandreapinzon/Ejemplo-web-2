import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

const SITE = "https://www.paulaandreapinzon.com";

// En desarrollo, sirve las carpetas del blog estático (public/blog/...) como lo haría Apache:
// /blog/ -> /blog/index.html, /blog/post/ -> /blog/post/index.html
const serveStaticBlog = (): Plugin => ({
  name: "serve-static-blog",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url) {
        const clean = req.url.split("?")[0];
        if (clean === "/blog" || clean === "/blog/") {
          req.url = "/blog/index.html";
        } else if (clean.startsWith("/blog/") && !clean.split("/").pop()?.includes(".")) {
          req.url = clean.replace(/\/?$/, "/index.html");
        }
      }
      next();
    });
  },
});

// ---------------------------------------------------------------------------
// Pre-renderizado de rutas React que necesitan HTML propio para SEO/crawlers.
//
// Motivo: en Hostinger/Apache, una URL como /conferencias que NO tiene carpeta
// propia cae al index.html raíz (el de la home) por el fallback SPA del
// .htaccess. Resultado: /conferencias servía el <title>, la meta description y
// el canonical de la home -> Google la marcaba como "Alternate page with proper
// canonical tag" y no la indexaba por separado.
//
// Este plugin, tras el build, genera dist/<ruta>/index.html reutilizando los
// <script>/<link> con hash del build ACTUAL (para que React arranque igual que
// en la home) pero con un <head> propio (title, description, canonical
// autorreferenciado, Open Graph, Twitter, JSON-LD) y un contenido estático
// dentro de #root legible por crawlers SIN ejecutar JavaScript. React
// (createRoot().render) reemplaza ese bloque al montar, igual que hace la home
// con su bloque #ssr-fallback, así que el usuario ve la página interactiva.
//
// Como vive aquí (en el build), sobrevive a cada despliegue de un nuevo .zip:
// no es un parche manual en el hosting.
// ---------------------------------------------------------------------------
type PrerenderRoute = { dir: string; head: string; body: string };

const CONFERENCIAS_HEAD = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Conferencias de IA 2026 | Paula Andrea Pinzón — Mentes en Beta, Del Guion al Algoritmo, Invisible o Indispensable</title>
    <meta name="description" content="Conferencias de IA para empresas y equipos creativos: Mentes en Beta, Del Guion al Algoritmo e Invisible o Indispensable. Charlas de Paula Andrea Pinzón sobre cómo integrar IA Generativa en flujos creativos, marca y estrategia empresarial.">
    <meta name="author" content="Paula Andrea Pinzón">
    <meta name="keywords" content="conferencias IA 2026, conferencista IA para empresas, charlas IA equipos creativos, Del Guion al Algoritmo, Mentes en Beta, Invisible o Indispensable, Paula Pinzón conferencista">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,500..800&display=swap" rel="stylesheet">

    <link rel="canonical" href="https://www.paulaandreapinzon.com/conferencias/">
    <link rel="alternate" hreflang="es" href="https://www.paulaandreapinzon.com/conferencias/">
    <link rel="alternate" hreflang="x-default" href="https://www.paulaandreapinzon.com/conferencias/">
    <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml">
    <link rel="icon" href="/favicon.ico">

    <meta property="og:type" content="website">
    <meta property="og:title" content="Conferencias de IA 2026 | Paula Andrea Pinzón">
    <meta property="og:description" content="Conferencias sobre IA Generativa para empresas y equipos creativos: Mentes en Beta, Del Guion al Algoritmo e Invisible o Indispensable.">
    <meta property="og:url" content="https://www.paulaandreapinzon.com/conferencias/">
    <meta property="og:image" content="https://www.paulaandreapinzon.com/Paula-Pinzon-profesiona-IA.png">
    <meta property="og:locale" content="es_ES">
    <meta property="og:site_name" content="Paula Andrea Pinzón">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Conferencias de IA 2026 | Paula Andrea Pinzón">
    <meta name="twitter:description" content="Conferencias sobre IA Generativa para empresas y equipos creativos: Mentes en Beta, Del Guion al Algoritmo e Invisible o Indispensable.">
    <meta name="twitter:image" content="https://www.paulaandreapinzon.com/Paula-Pinzon-profesiona-IA.png">

    <meta name="theme-color" content="#0f172a">

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://www.paulaandreapinzon.com/conferencias/#webpage",
          "url": "https://www.paulaandreapinzon.com/conferencias/",
          "name": "Conferencias de IA 2026 | Paula Andrea Pinzón",
          "description": "Conferencias de IA para empresas y equipos creativos: Mentes en Beta, Del Guion al Algoritmo e Invisible o Indispensable.",
          "inLanguage": "es",
          "isPartOf": { "@type": "WebSite", "@id": "https://www.paulaandreapinzon.com/#website", "url": "https://www.paulaandreapinzon.com/", "name": "Paula Andrea Pinzón" },
          "about": { "@type": "Person", "@id": "https://www.paulaandreapinzon.com/#persona", "name": "Paula Andrea Pinzón", "url": "https://www.paulaandreapinzon.com/" }
        },
        {
          "@type": "ItemList",
          "name": "Conferencias de Paula Andrea Pinzón 2026",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "item": { "@type": "CreativeWork", "name": "Mentes en Beta", "alternateName": "El arte de rediseñar la organización", "description": "La base de toda estrategia futura. Antes de implementar herramientas, hay que actualizar el \\"sistema operativo\\" de las personas: cultura y mentalidad.", "author": { "@type": "Person", "name": "Paula Andrea Pinzón", "url": "https://www.paulaandreapinzon.com/" }, "url": "https://www.paulaandreapinzon.com/conferencias/#mentes-en-beta" } },
            { "@type": "ListItem", "position": 2, "item": { "@type": "CreativeWork", "name": "Del Guion al Algoritmo", "alternateName": "La IA como pincel aumentado", "description": "Diseñada para equipos creativos, de marketing y directivos que necesitan entender cómo escala la producción de contenido con IA Generativa.", "author": { "@type": "Person", "name": "Paula Andrea Pinzón", "url": "https://www.paulaandreapinzon.com/" }, "url": "https://www.paulaandreapinzon.com/conferencias/#del-guion-al-algoritmo" } },
            { "@type": "ListItem", "position": 3, "item": { "@type": "CreativeWork", "name": "Invisible o Indispensable", "alternateName": "Dominando los motores de respuesta", "description": "Una conferencia estratégica para directivos que entienden que el SEO tradicional ya no es suficiente en un mundo de respuestas generativas.", "author": { "@type": "Person", "name": "Paula Andrea Pinzón", "url": "https://www.paulaandreapinzon.com/" }, "url": "https://www.paulaandreapinzon.com/conferencias/#invisible-o-indispensable" } }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.paulaandreapinzon.com/" },
            { "@type": "ListItem", "position": 2, "name": "Conferencias", "item": "https://www.paulaandreapinzon.com/conferencias/" }
          ]
        }
      ]
    }
    </script>`;

const CONFERENCIAS_BODY = `      <!-- ============================================================= -->
      <!-- FALLBACK ESTÁTICO PARA CRAWLERS / GEO-AEO                     -->
      <!-- Contenido legible por Googlebot, GPTBot, ClaudeBot, etc. SIN  -->
      <!-- ejecutar JavaScript. React (createRoot().render) reemplaza     -->
      <!-- este bloque al montar y muestra la página interactiva.        -->
      <!-- ============================================================= -->
      <main id="ssr-fallback" aria-label="Conferencias de IA de Paula Andrea Pinzón">
        <nav aria-label="Ruta de navegación">
          <a href="https://www.paulaandreapinzon.com/">Inicio</a> / Conferencias
        </nav>
        <header>
          <p>Roadmap de conferencias 2026</p>
          <h1 data-speakable="true">Conferencias que convierten la incertidumbre en ventaja competitiva</h1>
          <p data-speakable="true">Estrategias de adaptabilidad, mentalidad y tecnología para la nueva era digital. Tres keynotes de Paula Andrea Pinzón diseñados como un camino: cultura, producción y visibilidad. Formatos: keynote magistral (45–60 min), workshop inmersivo, paneles y moderación, en español e inglés.</p>
          <p><a href="https://sessionize.com/paula-andrea-pinzon/" rel="noopener">Ver perfil en Sessionize</a> · <a href="https://www.paulaandreapinzon.com/#contact">Agendar conferencia</a></p>
        </header>

        <section id="mentes-en-beta" aria-labelledby="mentes-en-beta-title">
          <h2 id="mentes-en-beta-title">01 · Mentes en Beta — El arte de rediseñar la organización</h2>
          <p>La base de toda estrategia futura. Antes de implementar herramientas, hay que actualizar el «sistema operativo» de las personas: cultura y mentalidad.</p>
          <p><strong>Enfoque:</strong> la transformación digital como un desafío humano y cultural, no solo técnico. La reconfiguración del mindset para la adopción tecnológica.</p>
          <p><strong>Impacto:</strong> reducción de la resistencia al cambio y creación de una cultura organizacional flexible y curiosa.</p>
          <h3>Temario</h3>
          <ul>
            <li><strong>Resiliencia Radical:</strong> cómo construir equipos que se fortalecen ante el cambio en lugar de romperse.</li>
            <li><strong>Humanidad Aumentada:</strong> superar el miedo al reemplazo mediante una cultura de colaboración humano-máquina.</li>
            <li><strong>Liderazgo Elástico:</strong> gestión de equipos que deben operar en «modo beta» constante.</li>
          </ul>
        </section>

        <section id="del-guion-al-algoritmo" aria-labelledby="del-guion-al-algoritmo-title">
          <h2 id="del-guion-al-algoritmo-title">02 · Del Guion al Algoritmo — La IA como pincel aumentado</h2>
          <p>Diseñada para equipos creativos, de marketing y directivos que necesitan entender cómo escala la producción de contenido con IA Generativa.</p>
          <p><strong>Enfoque:</strong> la eficiencia estética y la profesionalización del uso de IA dentro de la empresa.</p>
          <p><strong>Impacto:</strong> reducción de tiempos de producción hasta en un 40% y una hoja de ruta clara para integrar al experto en IA en sus flujos de trabajo.</p>
          <h3>Temario</h3>
          <ul>
            <li><strong>El Rol del AI Expert:</strong> por qué su empresa necesita un perfil estratégico que domine la narrativa artística y la ingeniería de prompts para garantizar calidad, coherencia y ética.</li>
            <li><strong>Narrativas Sintéticas:</strong> optimización de flujos de trabajo en pre y postproducción.</li>
            <li><strong>Identidad de Marca:</strong> definir dónde termina la máquina y dónde empieza el artista para mantener la esencia corporativa.</li>
          </ul>
        </section>

        <section id="invisible-o-indispensable" aria-labelledby="invisible-o-indispensable-title">
          <h2 id="invisible-o-indispensable-title">03 · Invisible o Indispensable — Dominando los motores de respuesta</h2>
          <p>Una conferencia estratégica para directivos que entienden que el SEO tradicional ya no es suficiente en un mundo de respuestas generativas.</p>
          <p><strong>Enfoque:</strong> estrategias para que su marca sea la «respuesta elegida» en el nuevo ecosistema de búsqueda inteligente.</p>
          <p><strong>Impacto:</strong> posicionamiento estratégico en las fuentes de información que sus clientes consultarán en el futuro cercano.</p>
          <h3>Temario</h3>
          <ul>
            <li><strong>GEO (Generative Engine Optimization):</strong> cómo ser citado y recomendado por la IA generativa.</li>
            <li><strong>AEO (Answer Engine Optimization):</strong> la transición del «clic en un enlace» a la «respuesta directa».</li>
            <li><strong>Adaptabilidad Técnica:</strong> preparar sus activos digitales para modelos como Perplexity, Gemini y ChatGPT.</li>
          </ul>
        </section>

        <section aria-labelledby="gobernanza-title">
          <h2 id="gobernanza-title">Gobernanza y ética: el estándar ISO/IEC 42001</h2>
          <p>Toda implementación se acompaña con un enfoque seguro y auditable. La innovación sin gobernanza es un riesgo; con gobernanza, es una estrategia sostenible.</p>
        </section>

        <section aria-label="Contacto">
          <p>«La tecnología evoluciona cada semana; la mentalidad debe evolucionar cada día. ¿Comenzamos?»</p>
          <p><a href="https://www.paulaandreapinzon.com/#contact">Agendar conferencia</a> · <a href="https://sessionize.com/paula-andrea-pinzon/" rel="noopener">Sessionize</a></p>
        </section>
      </main>`;

const prerenderRoutes: PrerenderRoute[] = [
  { dir: "conferencias", head: CONFERENCIAS_HEAD, body: CONFERENCIAS_BODY },
];

const prerenderStaticRoutes = (): Plugin => ({
  name: "prerender-static-routes",
  apply: "build",
  closeBundle() {
    const distDir = path.resolve(__dirname, "dist");
    const indexPath = path.join(distDir, "index.html");
    if (!fs.existsSync(indexPath)) return;
    const indexHtml = fs.readFileSync(indexPath, "utf8");

    // Reutiliza las etiquetas de assets con hash del build ACTUAL
    // (<script type="module">, modulepreload y stylesheet que apuntan a /assets/).
    const assetTags = indexHtml
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => /\/assets\//.test(l) && /^<(script|link)\b/.test(l))
      .join("\n    ");

    if (!assetTags) {
      this.warn("[prerender] No se encontraron etiquetas de assets en dist/index.html; se omite el pre-render.");
      return;
    }

    for (const route of prerenderRoutes) {
      const html = `<!doctype html>
<html lang="es">
  <head>
    ${route.head}
  </head>
  <body>
    <div id="root">
${route.body}
    </div>
    ${assetTags}
  </body>
</html>
`;
      const outDir = path.join(distDir, route.dir);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
      // eslint-disable-next-line no-console
      console.log(`[prerender] dist/${route.dir}/index.html generado (${SITE}/${route.dir}/)`);
    }
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), serveStaticBlog(), prerenderStaticRoutes()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
