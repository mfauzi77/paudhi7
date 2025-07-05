import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Ganti 'nama-repo' dengan nama repository GitHub kamu
export default defineConfig({
  base: '', // Ganti dengan nama repository kamu
  plugins: [react(), tailwindcss()],
});
