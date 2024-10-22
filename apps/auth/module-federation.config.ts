import { ModuleFederationConfig } from '@nx/rspack/module-federation';

const config: ModuleFederationConfig = {
  name: 'auth',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    const singletonDeps = [
      '@hookform/resolvers',
      'react-hook-form',
      'zod',
      'react',
      'react-dom',
      '@tanstack/react-query',
      'zustand',
    ];

    if (singletonDeps.includes(libraryName)) {
      return {
        ...defaultConfig,
        singleton: true,
        strictVersion: false,
      };
    }

    return defaultConfig;
  },
};

export default config;
