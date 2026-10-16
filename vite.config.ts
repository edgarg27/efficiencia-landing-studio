import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// En desarrollo Vite no sirve las funciones serverless de Vercel (/api/*).
// Este plugin ejecuta api/webhook.js localmente, con las variables de .env,
// para poder probar el formulario completo con `npm run dev`.
const devApi = (env: Record<string, string>): Plugin => ({
  name: "dev-api-webhook",
  apply: "serve",
  configureServer(server) {
    for (const k of ["RECAPTCHA_SECRET_KEY", "N8N_WEBHOOK_URL", "N8N_WEBHOOK_SECRET", "RECAPTCHA_HOSTNAMES"]) {
      if (env[k]) process.env[k] = env[k];
    }
    server.middlewares.use("/api/webhook", async (req, res) => {
      if (req.method === "POST" && !String(req.headers["content-type"] ?? "").startsWith("application/json")) {
        res.statusCode = 415;
        return res.end();
      }
      let raw = "";
      for await (const chunk of req) {
        raw += chunk;
        if (raw.length > 16_384) {
          res.statusCode = 413;
          return res.end();
        }
      }
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
    mode === "development" && devApi(loadEnv(mode, process.cwd(), "")),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
}));
