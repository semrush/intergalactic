import { defineConfig } from 'vitest/config';

import { vitestPlugins, vitestResolve } from '../../vitest.config.mts';

export default defineConfig({
  plugins: vitestPlugins,
  resolve: vitestResolve,
  test: {
    include: [
      '__tests__/**/*.test.ts',
    ],
    environment: 'node',
  },
});
