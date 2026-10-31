import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores([
    "coverage/**",
    "dist/**",
    "node_modules/**",
    "public/ocr/**",
    "aidlc/**",
    ".agents/**",
    ".codex/**",
    ".serena/**",
    "playwright-report/**",
    "test-results/**",
  ]),
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: { parserOptions: { project: "./tsconfig.eslint.json" } },
  },
  {
    files: ["src/**/*.test.{ts,tsx}"],
    plugins: { vitest },
    rules: { ...vitest.configs.recommended.rules },
  },
);
