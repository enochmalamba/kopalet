import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "http://api.kopalet.com",
        changeOrigin: true,
        secure: false,
      },
      "/sanctum": {
        target: "http://api.kopalet.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
