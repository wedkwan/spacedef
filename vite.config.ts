import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".svelte"],
  },
  server: {
    host: "0.0.0.0", // Permite acesso externo
    port: 8080, // Usa a porta esperada pelo Railway
    strictPort: true,
    allowedHosts: ["invigorating-vitality-production.up.railway.app"], // Adiciona seu domínio
  },
});
