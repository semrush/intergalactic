import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  presets: ['@semcore/panda-preset'],
  include: [],
  exclude: [],
  outdir: '.',
  jsxFramework: 'react',

  // it needs to generate full css
  // staticCss: {
  //   recipes: '*',
  // },
});
