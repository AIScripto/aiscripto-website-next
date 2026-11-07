import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync, readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  
  // Security headers: reuse the site-wide headers from vercel.json (incl. CSP) so the
  // local production server matches what Vercel sends. Dev mode skips the CSP, since
  // it must reach local APIs and Vite's HMR socket.
  const vercelConfig = JSON.parse(readFileSync(path.join(__dirname, "vercel.json"), "utf8")) as {
    headers: { source: string; headers: { key: string; value: string }[] }[];
  };
  const siteHeaders = vercelConfig.headers.find((h) => h.source === "/(.*)")?.headers ?? [];
  const isProduction = process.env.NODE_ENV === "production";
  app.use((req, res, next) => {
    for (const { key, value } of siteHeaders) {
      if (!isProduction && key === "Content-Security-Policy") continue;
      res.setHeader(key, value);
    }
    next();
  });
  
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, "dist");

    // Mirror Vercel "redirects" (e.g. /company -> /about, /service/:slug* -> /services/:slug*).
    const redirects = ((vercelConfig as unknown as { redirects?: { source: string; destination: string; permanent?: boolean }[] }).redirects ?? []).map((r) => {
      const names: string[] = [];
      const pattern = r.source
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replace(/\/:([A-Za-z]+)\*/g, (_m, n: string) => (names.push(n), "(?:/(.*))?"))
        .replace(/:([A-Za-z]+)/g, (_m, n: string) => (names.push(n), "([^/]+)"));
      return { re: new RegExp(`^${pattern}$`, "i"), names, destination: r.destination, status: r.permanent ? 308 : 307 };
    });
    app.use((req, res, next) => {
      for (const r of redirects) {
        const m = r.re.exec(req.path);
        if (!m) continue;
        let target = r.destination;
        r.names.forEach((n, i) => {
          target = target.replace(new RegExp(`:${n}\\*?`), m[i + 1] ?? "");
        });
        return res.redirect(r.status, target.replace(/\/+$/, "") || "/");
      }
      next();
    });

    // Mirror Vercel: trailingSlash=false redirects /services/erp/ -> /services/erp.
    app.use((req, res, next) => {
      if (req.path.length > 1 && req.path.endsWith("/")) {
        const query = req.url.slice(req.path.length);
        return res.redirect(308, req.path.replace(/\/+$/, "") + query);
      }
      next();
    });

    // Mirror Vercel cleanUrls: /products -> dist/products.html. This runs before
    // express.static because /products is also a directory (dist/products/*.html),
    // which express.static would otherwise treat as a missing directory index.
    app.use((req, res, next) => {
      if (req.method !== "GET" && req.method !== "HEAD") return next();
      if (path.extname(req.path)) return next();
      const file = path.join(distDir, `${req.path === "/" ? "/index" : req.path}.html`);
      if (!file.startsWith(distDir + path.sep) || !existsSync(file)) return next();
      res.sendFile(file);
    });

    app.use(express.static(distDir, { redirect: false }));

    // Anything else is a real 404 (dist/404.html is the prerendered Not Found page).
    app.use((req, res) => {
      res.status(404).sendFile(path.join(distDir, "404.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
