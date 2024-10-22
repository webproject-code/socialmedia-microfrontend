import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'auth',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (libraryName === '@hookform/resolvers') {
      return {
        ...defaultConfig,
        singleton: true,
        requiredVersion: '^3.9.0',
      };
    }
    // Add any other shared dependencies here
    return defaultConfig;
  },
};

export default config;
