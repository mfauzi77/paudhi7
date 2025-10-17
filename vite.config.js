import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const proxyTarget = (env.VITE_PROXY_TARGET || env.VITE_API_URL || "http://localhost:5000/api").replace(/\/$/, "").replace(/\/api$/, "");

  return {
    base: '/',
    plugins: [react(), tailwindcss()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['lucide-react', 'framer-motion']
          }
        }
      }
    },
    server: {
      port: 5173,
      host: true,
      proxy: {
        // Allow frontend to call relative "/api" in dev; proxied to backend origin
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
