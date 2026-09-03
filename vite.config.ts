import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

function githubPagesSpa() {
  return {
    name: "github-pages-spa",
    closeBundle() {
      const dist = resolve(root, "dist");
      const index = resolve(dist, "index.html");
      mkdirSync(resolve(dist, "halloween"), { recursive: true });
      copyFileSync(index, resolve(dist, "halloween", "index.html"));
      copyFileSync(index, resolve(dist, "404.html"));
    },
  };
}

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/welcome/" : "/",
  plugins: [react(), githubPagesSpa()],
}));
