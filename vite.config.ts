import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// En desarrollo Vite no sirve las funciones serverless de Vercel (/api/*).
// Este plugin ejecuta api/webhook.js localmente, con las variables de .env,
// para poder probar el formulario completo con `npm run dev`.
const devApi = (env: Record<string, string>): Plugin => ({
  name: "dev-api-webhook",
  apply: "serve",
  configureServer(server) {
    Object.assign(process.env, env);
    server.middlewares.use("/api/webhook", async (req, res) => {
      let raw = "";
      for await (const chunk of req) raw += chunk;
      let body: unknown;
      try {
        body = raw ? JSON.parse(raw) : undefined;
      } catch {
        body = undefined;
      }
      const shim = res as typeof res & { status: (c: number) => typeof shim; json: (d: unknown) => void };
      shim.status = (code: number) => {
        res.statusCode = code;
        return shim;
      };
      shim.json = (data: unknown) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(data));
      };
      try {
        const mod = await server.ssrLoadModule("/api/webhook.js");
        await mod.default({ method: req.method, body }, shim);
      } catch (e) {
        console.error("[dev-api] error:", e);
        shim.status(500).json({ error: "Error interno (dev)" });
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "development" && devApi(loadEnv(mode, process.cwd(), "")),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
}));
