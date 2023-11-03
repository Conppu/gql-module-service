import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/modules/**/*.graphql",
  generates: {
    "./src/modules/": {
      preset: "graphql-modules",
      presetConfig: {
        baseTypesPath: "../types/graphql.ts",
        filename: "types.ts",
      },
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./context#Context",
        defaultMapper: "NonNullable<unknown>",
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: "change-case-all#upperCase",
          transformUnderscore: true,
        },
      },
      hooks: {
        afterOneFileWrite: ["prettier --write"],
      },
    },
  },
};

export default config;
