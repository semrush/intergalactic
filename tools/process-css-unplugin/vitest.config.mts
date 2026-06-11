import { resolve as resolvePath } from 'node:path';

import { defineConfig } from 'vitest/config';

import { vitestPlugins, vitestResolve } from '../../vitest.config.mts';

export default defineConfig({
  plugins: vitestPlugins,
  resolve: vitestResolve,
  test: {
    include: [
      '__tests__/**/*.test.ts',
    ],
    environment: 'jsdom',
    setupFiles: [resolvePath(__dirname, '../testing-utils/setupTests')],
  },
});
