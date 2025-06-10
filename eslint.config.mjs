import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["src/**/*{js,mjs,cjs}"], plugins: { js },  extends: ["js/recommended"] }, // only lint inside src directory
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);

