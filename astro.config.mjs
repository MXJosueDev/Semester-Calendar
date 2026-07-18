// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

const repoName = process.env.GITHUB_REPOSITORY 
  ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` 
  : '/';

// https://astro.build/config
export default defineConfig({
  base: repoName,
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});