import { ModuleFederationConfig } from '@nx/rspack/module-federation';
import { SharedConfig } from '@rspack/core';

const config: ModuleFederationConfig = {
  name: 'chatlist',

  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName: string, sharedConfig: SharedConfig) => {
    const sharedPackages = {
      react: { singleton: true },
      'react-dom': { singleton: true },
      '@hookform/resolvers': { singleton: true },
      'react-hook-form': { singleton: true },
    };

    if (libraryName in sharedPackages) {
      return {
        ...sharedConfig,
        ...sharedPackages[libraryName as keyof typeof sharedPackages],
      };
    }
    return sharedConfig;
  },
};

export default config;
