import typescriptEslint from "@typescript-eslint/eslint-plugin";
import node from "eslint-plugin-node";
import jest from "eslint-plugin-jest";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: ["*", "!**/src/"],
}, ...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-plugin-jest/recommended",
    "eslint-config-prettier",
), {
    plugins: {
        "@typescript-eslint": typescriptEslint,
        node,
        jest,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...jest.environments.globals.globals,
        },

        parser: tsParser,
    },

    rules: {
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-empty-function": "off",

        "@typescript-eslint/ban-ts-comment": ["error", {
            "ts-ignore": "allow-with-description",
        }],

        "no-console": "error",
        yoda: "error",

        "prefer-const": ["error", {
            destructuring: "all",
        }],

        "no-control-regex": "off",

        "no-constant-condition": ["error", {
            checkLoops: false,
        }],

        "node/no-extraneous-import": "error",
    },
}, {
    files: ["**/*{test,spec}.ts"],

    rules: {
        "@typescript-eslint/no-unused-vars": "off",
        "jest/no-standalone-expect": "off",
        "jest/no-conditional-expect": "off",
        "no-console": "off",
    },
}];