import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // CORRECCIÓN DE RUTA ABSOLUTA PARA PRODUCCIÓN (Monorepo en Render)
  // Apunta con precisión a la carpeta real donde Vite deposita el build del cliente.
  const distPath = path.resolve(process.cwd(), "client/dist");

  if (!fs.existsSync(distPath)) {
    console.error(
      `[Static] Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // 1. Servir archivos estáticos físicos reales (.js, .css, .png, etc.) desde la raíz correcta
  app.use(express.static(distPath, { index: false }));

  // 2. Fallback definitivo para Single Page Application (React Router)
  // Intercepta las solicitudes de navegación del navegador y les sirve el index.html
  app.get("*", (req, res, next) => {
    // Si la petición es explícitamente para endpoints de la API o tRPC, la dejamos seguir su flujo normal
    if (req.path.startsWith("/api") || req.path.startsWith("/trpc")) {
      return next();
    }

    const indexPath = path.join(distPath, "index.html");
    
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.error(`[Static Fallback] Critical Error: index.html missing at ${indexPath}`);
      res.status(404).send("Frontend build assets missing. Please trigger a clean redeploy.");
    }
  });
}
