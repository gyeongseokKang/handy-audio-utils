/// <reference types="vitest/config" />
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({ insertTypesEntry: true, rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "HandyAudioUtils",
      fileName: "handy-audio-utils",
    },
    sourcemap: true,
    minify: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.{js,ts,jsx,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/*.test.{js,ts,jsx,tsx}",
        "src/**/*.spec.{js,ts,jsx,tsx}",
        "src/**/index.{js,ts,jsx,tsx}",
        "src/**/*.stories.{js,ts,jsx,tsx}",
        "src/utils/test-utils/mock",
      ],
      reporter: ["text", "json-summary"],
      reportsDirectory: "./coverage",
    },
  },
});
