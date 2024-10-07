import js from "@eslint/js";
import imports from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-plugin-prettier/recommended";
import security from "eslint-plugin-security";
import ts from "typescript-eslint";

// noinspection JSUnusedGlobalSymbols
export default [
    {
        ignores: [".idea", "eslint.config.mjs", "node_modules", "reports", "test-data", "test-results"]
    },
    ...ts.configs.recommended,
    js.configs.recommended,
    jsdoc.configs["flat/recommended"],
    imports.flatConfigs.recommended,
    prettier,
    security.configs.recommended,
    {
        ...playwright.configs["flat/recommended"],
        files: ["**/tests/**"]
    },
    {
        name: "E2E",

        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module"
        },

        files: ["**/*.{js,ts,jsx,tsx}"],

        rules: {
            "max-len": ["error", { code: 200, ignoreUrls: true }],
            "@typescript-eslint/no-explicit-any": "off",
            "guard-for-in": "error",
            "@typescript-eslint/ban-eslint-comment": "off",
            "@typescript-eslint/ban-ts-comment": "off",
            "import/no-duplicates": "error",
            "import/order": [
                "error",
                {
                    alphabetize: { order: "asc" },
                    groups: [["builtin", "external"], "internal", ["parent", "sibling", "index"], ["type"]],
                    "newlines-between": "always"
                }
            ],
            "import/namespace": "off",
            "jsdoc/require-jsdoc": [
                "error",
                {
                    checkConstructors: false,
                    contexts: ["MethodDefinition:not([accessibility='private'])"],
                    require: {
                        ClassDeclaration: true,
                        ClassExpression: true,
                        FunctionDeclaration: true
                    }
                }
            ],
            "jsdoc/require-param-type": "off",
            "jsdoc/require-returns-type": "off",
            "jsdoc/tag-lines": ["warn", "any", { startLines: 1 }],
            "no-bitwise": "error",
            "no-caller": "error",
            "no-constructor-return": "error",
            "no-duplicate-imports": "off",
            "no-return-await": "warn",
            "no-self-compare": "error",
            "no-unsafe-optional-chaining": "error",
            "no-unreachable-loop": "error",
            "no-unused-vars": "off",
            "no-undef": "off",
            "no-useless-backreference": "error",
            "sort-imports": [
                "error",
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    allowSeparatedGroups: true
                }
            ],
            "@typescript-eslint/array-type": ["error", { default: "array" }],
            "@typescript-eslint/no-extraneous-class": ["error", { allowWithDecorator: true }],
            "@typescript-eslint/no-require-imports": "error",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/parameter-properties": [
                "error",
                {
                    allow: ["private readonly", "readonly"]
                }
            ]
        },

        settings: {
            "import/resolver": {
                typescript: {
                    project: "."
                }
            }
        }
    }
];
