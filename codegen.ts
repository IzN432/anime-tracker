import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "lib/graphql/schema/schema.json",
  documents: ["lib/graphql/queries/*.graphql"],
  generates: {
    "lib/graphql/generated/graphql-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
