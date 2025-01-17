module.exports = {
  env: {
    es6: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.eslint.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "eslint-plugin-tsdoc", "import"],
  ignorePatterns: ["vitest.config.js", "node_modules"],
  rules: {
    // When array types get complex enough `Array<...>` is nicer looking than `(...)[]`.
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/consistent-indexed-object-style": "off",
    // `allowInterfaces` allows the pattern of `interface X extends _X {}`.
    // This is sometimes done as a performance optimization, to allow declaration merging with a dynamic base, or simply to display a different name in intellisense.
    "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
    // TODO(LukeAbby): reenable once all document declaration merges can be removed
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    "@typescript-eslint/no-unused-expressions": "off", // expectTypeOf seems to trip this rule.
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        varsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/prefer-namespace-keyword": "error",
    "import/consistent-type-specifier-style": ["warn", "prefer-top-level"],
    "import/extensions": ["error", "always"],
    "import/first": "warn",
    "import/newline-after-import": "warn",
    "import/no-absolute-path": "error",
    "import/no-amd": "error",
    "import/no-anonymous-default-export": "warn",
    "import/no-commonjs": "error",
    "import/no-empty-named-blocks": "warn",
    "import/no-extraneous-dependencies": "error",
    "import/no-import-module-exports": "error",
    "import/no-named-default": "warn",
    // Some classes like `DataModel` are both default and named exports.
    "import/no-named-as-default": "off",
    "import/no-self-import": "error",
    "import/no-unused-modules": "warn",
    "import/no-useless-path-segments": "warn",
    "import/no-webpack-loader-syntax": "error",
    "tsdoc/syntax": "warn",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".mts", ".ts"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ["tests/**"],
      rules: {
        // Using interfaces is normally helpful so that users can declaration merge fvtt-types if necessary.
        // However in tests it doesn't matter.
        "@typescript-eslint/consistent-type-definitions": "off",

        // There aren't even function bodies in the majority of the codebase.
        // It can make sense to have empty functions in tests.
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  ],
};
