import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [vue()],
    base: command === "serve" ? "/" : "/webapp-dev/",
  };
});
