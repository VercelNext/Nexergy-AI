import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path"; // 1. Añadimos path para resolver la ruta de producción
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
    serveStatic(app);
    
    // 2. SOLUCIÓN AL 404: Captura cualquier ruta que no sea de API y sirve el index.html
    // Apunta a tu carpeta dist de producción. Ajustamos la jerarquía según tu monorepo.
    const clientDistPath = path.join(__dirname, "../../../client/dist");
    
    app.get("*", (req, res, next) => {
      // Si la petición viene buscando explícitamente una ruta de API o tRPC, la dejamos pasar
      if (req.path.startsWith("/api") || req.path.startsWith("/trpc")) {
        return next();
      }
      res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
        if (err) {
          next();
        }
      });
    });
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
