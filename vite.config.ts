import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".svelte"],
  },
  server: {
    host: "0.0.0.0",
    port: 8081, // Porta do front-end
    strictPort: true,
    proxy: {
      "/records": process.env.VITE_API_URL || "http://localhost:3000", // Usando a variável de ambiente para produção ou localhost
    },
  },
  preview: {
    host: "0.0.0.0",
    port: 8081,
    strictPort: true,
    allowedHosts: ["defspace.up.railway.app"], // Permite acessos do Railway
  },
});
