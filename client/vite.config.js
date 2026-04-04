import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// GitHub Pages project site: https://<user>.github.io/<REPO>/
// Must match your repository name (case-sensitive in the URL path).
const repoName = "RyNex_Land";

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === "build" ? `/${repoName}/` : "/",
  server: {
    port: 5173
  }
}));

