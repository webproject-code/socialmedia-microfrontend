import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'auth',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    const singletonDeps = {
      '@hookform/resolvers': '^3.9.0',
    };

    if (libraryName in singletonDeps) {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
        requiredVersion: singletonDeps[libraryName],
      };
    }

    return defaultConfig;
  },
};

export default config;
