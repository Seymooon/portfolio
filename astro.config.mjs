import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://seymooon.github.io",
  base: "/portfolio/",
  vite: {
    plugins: [tailwindcss()],
  },
});