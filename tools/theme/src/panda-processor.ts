import type { Theme } from './theme.ts';
import type { N } from './utils.ts';
import { processValue } from './utils.ts';

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

const kebabToCamel = (str: string) => {
  return str.replace(/-./g, (match: string) => match[1].toUpperCase());
};

const sizeMapper = {
  s: 'small',
  m: 'medium',
  l: 'large',
};

function processValues(node: N, config: Theme) {
  if ('value' in node && typeof node.value === 'string') {
    node.value = processValue(node.value, config);
  } else {
    Object.keys(node).forEach((key) => {
      processValues(node[key], config);
    });
  }
}

function processKebabToCamel(node: N) {
  if ('value' in node && typeof node.value === 'string') {
    return;
  } else {
    Object.keys(node).forEach((key) => {
      if (key.includes('-')) {
        const newKey = kebabToCamel(key);
        node[newKey] = { ...node[key] };
        delete node[key];
        processKebabToCamel(node[newKey]);
      } else if (key === 's' || key === 'm' || key === 'l') {
        const newKey = sizeMapper[key];
        node[newKey] = { ...node[key] };
        delete node[key];
        processKebabToCamel(node[newKey]);
      } else {
        processKebabToCamel(node[key]);
      }
    });
  }
}

function toTree(node: N) {
  Object.keys(node).forEach((key) => {
    if (key.includes('_')) {
      const paths = key.split('_');
      let current = node;

      paths.forEach((path, index) => {
        if (index === paths.length - 1) {
          current[path] = node[key];
          delete node[key];
        } else {
          current[path] = current[path] || {};
          current = current[path];
        }
      });
    } else {
      if ('value' in node[key]) {
        return;
      } else {
        toTree(node[key]);
      }
    }
  });
}

export const toPandaPreset = (config: Theme) => {
  processValues(config, config);
  toTree(config);
  processKebabToCamel(config);

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
    breakpoints:${breakpoints.split('\n').map((line, index) => index === 0 ? ` ${line}` : `    ${line}`).join('\n')},
  },
});

export default semcorePreset;
`;

  return preset;
};
