import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path"; // Requerido para resolver las rutas absolutas de forma segura
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  registerStorageProxy(app);
  registerOAuthRoutes(app);

  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // 1. CAPTURA DE RUTAS VIRTUALES DEL CLIENTE (Evita que serveStatic tire un 404 anticipado)
    app.get("*", (req, res, next) => {
      // Si la petición va a la API, a tRPC, o tiene extensión de archivo físico (ej: .js, .css, .png), déjala pasar
      if (
        req.path.startsWith("/api") || 
        req.path.startsWith("/trpc") || 
        req.path.includes(".")
      ) {
        return next();
      }

      try {
        // Resolvemos la ruta absoluta desde la raíz de ejecución del proyecto en Render
        const clientDistPath = path.resolve(process.cwd(), "client/dist");
        
        res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
          if (err) {
            console.error("[Static Fallback] No se pudo enviar index.html, delegando:", err);
            next();
          }
        });
      } catch (error) {
        console.error("[Static Fallback] Error crítico en ruteo virtual:", error);
        next();
      }
    });

    // 2. SERVIR ARCHIVOS ESTÁTICOS BASE
    // Si la petición no se interceptó arriba (porque era un archivo real), delegamos en tu función nativa
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`[Server] Running in ${process.env.NODE_ENV} mode on http://localhost:${port}/`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Fatal error during startup:", err);
});
