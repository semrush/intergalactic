import type { Theme } from './theme.ts';
import type { N } from './utils.ts';

function merge(node: N, resultNode: N) {
  Object.keys(node).forEach((key) => {
    if (resultNode[key] &&
      typeof node[key] === 'object' &&
      typeof resultNode[key] === 'object'
    ) {
      merge(node[key], resultNode[key]);
    } else {
      resultNode[key] = node[key];
    }
  });
}

export const toPandaPreset = (config: Theme) => {
  const tokens = JSON.stringify({ ...config.baseTokens, breakpoints: undefined }, undefined, 2);
  const semanticTokens = {
    ...config.semanticTokens,
    zIndexes: undefined,

  };

  merge(config.featureHighlight, semanticTokens.colors);

  const semantic = JSON.stringify(semanticTokens, undefined, 2);
  const breakpointsObject = Object.entries(config.baseTokens.breakpoints).reduce<Record<string, string | undefined>>((acc, [key, valueObj]) => {
    acc[key] = 'value' in valueObj ? valueObj.value : undefined;
    return acc;
  }, {});
  const breakpoints = JSON.stringify(breakpointsObject, undefined, 2);

  const preset = `import { definePreset } from '@pandacss/dev';

export const semcorePreset = definePreset({
  name: '@semcore/panda-preset',
  theme: {
    tokens:${tokens.split('\n').map((line, index) => index === 0 ? ` ${line}` : `    ${line}`).join('\n')},
    semanticTokens:${semantic.split('\n').map((line, index) => index === 0 ? ` ${line}` : `    ${line}`).join('\n')},
    extend: {
      breakpoints:${breakpoints.split('\n').map((line, index) => index === 0 ? ` ${line}` : `      ${line}`).join('\n')},
    },
  },
});
`;

  return preset;
};
