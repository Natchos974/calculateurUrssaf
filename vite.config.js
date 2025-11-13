import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-react-components/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    AutoImport({
      imports: ["react"],
      dts: "src/auto-imports.d.ts", // Génère la déclaration TS
    }),
    // Auto import components
    Components({
      dirs: ["src/components"], // Dossier à scanner
      extensions: ["jsx", "tsx"],
      deep: true,
      dts: "src/components.d.ts",
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
