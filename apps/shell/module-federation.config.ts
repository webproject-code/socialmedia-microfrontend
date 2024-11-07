import { ModuleFederationConfig } from '@nx/rspack/module-federation';
import { SharedConfig } from '@rspack/core';

const config: ModuleFederationConfig = {
  name: 'shell-with-remotes',
  /**
   * To use a remote that does not exist in your current Nx Workspace
   * You can use the tuple-syntax to define your remote
   *
   * remotes: [['my-external-remote', 'https://nx-angular-remote.netlify.app']]
   *
   * You _may_ need to add a `remotes.d.ts` file to your `src/` folder declaring the external remote for tsc, with the
   * following content:
   *
   * declare module 'my-external-remote';
   *
   */
  remotes: [],
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
