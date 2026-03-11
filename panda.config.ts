import { defineConfig } from '@pandacss/dev';

import preset from './semcore/panda-preset/src';

export default defineConfig({
  // presets: ['@semcore/panda-preset'],
  presets: [preset],
  include: ['./semcore/**/*.{js,ts,jsx,tsx}', './stories/**/*.{js,ts,jsx,tsx}'],
  exclude: ['**/node_modules/**', '**/__tests__/**', '**/lib/**'],
  importMap: '@semcore/styled-system',
});
