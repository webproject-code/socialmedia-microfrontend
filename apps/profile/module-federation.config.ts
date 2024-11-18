import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'profile',

  exposes: {
    './Module': './src/remote-entry.ts',
  },

  shared: (library, defaultConfig) => {
    if (library === '@social-media/evoke-ui') {
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
    if (library === '@hookform/resolvers/zod') {
      return {
        ...defaultConfig,
        strictVersion: false,
      };
    }
    if (library === '@tanstack/react-query') {
      return {
        ...defaultConfig,
        strictVersion: false,
      };
    }
    return defaultConfig;
  },
};

export default config;
