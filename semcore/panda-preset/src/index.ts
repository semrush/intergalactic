import { definePreset } from '@pandacss/dev';

import input from './slot-recipies/input';
import { tokens, semanticTokens } from './tokens';
import focusOutline from './utilities/focus-outline';

export default definePreset({
  name: '@semcore/panda-preset',
  theme: {
    slotRecipes: {
      input,
    },
    tokens,
    semanticTokens,
  },
  utilities: {
    extend: {
      focusOutline,
    },
  },
  staticCss: {
    recipes: '*',
  },
});
