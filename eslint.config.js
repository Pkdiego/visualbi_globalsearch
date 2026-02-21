const powerbiVisuals = require("eslint-plugin-powerbi-visuals");
const tsParser = require("@typescript-eslint/parser");

module.exports = [
  {
    ignores: [".tmp/**", "dist/**", "node_modules/**"]
  },
  {
    files: ["src/**/*.ts"],
    plugins: {
      "powerbi-visuals": powerbiVisuals
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        window: "readonly",
        document: "readonly"
      }
    },
    rules: {
      "powerbi-visuals/no-implied-inner-html": "warn",
      "powerbi-visuals/no-inner-outer-html": "warn",
      "powerbi-visuals/no-http-string": "error",
      "powerbi-visuals/no-banned-terms": "error"
    }
  }
];
