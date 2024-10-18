import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'profile',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
};

export default config;
