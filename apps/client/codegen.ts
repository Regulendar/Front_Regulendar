import { resolve } from 'path';
import { CodegenConfig } from '@graphql-codegen/cli';

const schemaPath = resolve(__dirname, '/packages/shared/graphql/schema.gql');

const config: CodegenConfig = {
  schema: schemaPath,
  documents: ['src/**/*.graphql'],

  generates: {
    'src/graphql/types.ts': {
      plugins: ['typescript'],
    },

    'src/': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: 'graphql/types.ts',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;
