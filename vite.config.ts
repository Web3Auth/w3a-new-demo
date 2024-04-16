/* eslint-disable no-console */
import { fileURLToPath } from "node:url";
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import viteTsconfigPaths from "vite-tsconfig-paths";

const { VITE_APP_INFURA_PROJECT_KEY } = loadEnv("development", process.cwd());
console.log("VITE_APP_INFURA_PROJECT_KEY", VITE_APP_INFURA_PROJECT_KEY);
process.env.VITE_APP_INFURA_PROJECT_KEY = VITE_APP_INFURA_PROJECT_KEY;
// TODO: code split and load controllers after login
// https://vitejs.dev/config/
export default defineConfig ({
  server: {
    port: 4050,
  },
  build: {
    sourcemap: false,
    // sourcemap: true,
  },
  define: {
    __SENTRY_DEBUG__: false,
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.VITE_APP_INFURA_PROJECT_KEY": JSON.stringify(VITE_APP_INFURA_PROJECT_KEY),
  },
  plugins: [
    vue(),
    viteTsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});

