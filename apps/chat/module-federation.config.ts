import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'chat',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (library, defaultConfig) => {
    if (library === '@hookform/resolvers/zod') {
      return {
        ...defaultConfig,
        strictVersion: false,
      };
    }
    if (library === 'socket.io-client') {
      return {
        ...defaultConfig,
        strictVersion: false,
      };
    }
    return defaultConfig;
  },
};

export default config;
