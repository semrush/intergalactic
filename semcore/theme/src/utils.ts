import type { Theme } from './theme';

export type Token = {
  name: string;
  value: string;
  description: string;
};

type ProcessedTokens = {
  baseTokens: Token[];
  semanticTokens: Token[];
  highlightsTokens: Token[];
};

// @ts-ignore
export type N = Record<string, N | string>;

export const logger = {
  // eslint-disable-next-line no-console
  log: console.log,
  // eslint-disable-next-line no-console
  error: console.error,
};

export function processTokens(config: Theme, prefix: string): ProcessedTokens {
  const processedTokens: ProcessedTokens = {
    baseTokens: [],
    semanticTokens: [],
    highlightsTokens: [],
  };

  function getConfigValue(path: string[]): string {
    try {
      const valueObj = getByPath(config, path);

      if ('value' in valueObj) {
        return processValue(valueObj.value);
      }

      if ('DEFAULT' in valueObj && 'value' in valueObj.DEFAULT) {
        return processValue(valueObj.DEFAULT.value);
      }
    } catch (e) {
      logger.log(e);
      logger.log(path);
    }

    return `{${path.join('.')}}`;
  }

  function processValue(value: string): string {
    if (value.startsWith('{') && value.endsWith('}')) {
      return getConfigValue(value.slice(1, -1).split('.'));
    }
    if (value.includes('{') && value.includes('}')) {
      const replacer = new RegExp(`{([a-z0-9.-])+}`, 'gi');

      const result = value.replace(replacer, (match) => {
        const calculatedValue = getConfigValue(match.slice(1, -1).split('.'));

        return calculatedValue;
      });

      return result;
    }

    return value;
  }

  function traverse(params: { node: N; path: string[]; prefix?: string; postfix?: string; groupKey: keyof ProcessedTokens }) {
    const { node, path, prefix = '', postfix = '', groupKey } = params;
    if ('value' in node && typeof node.value === 'string') {
      const nodeKey = path.filter((p) => p !== 'DEFAULT').join('-');
      let key = prefix ? `--${prefix}-${nodeKey}` : `--${nodeKey}`;
      if (postfix) {
        key = `${key}${postfix}`;
      }
      const value = processValue(node.value);
      processedTokens[groupKey].push({
        name: key,
        value: value,
        description: node.description,
      });
    } else {
      Object.keys(node).forEach((key) => {
        traverse({
          node: node[key],
          path: [...path, key],
          prefix,
          postfix,
          groupKey,
        });
      });
    }
  }

  (Object.keys(config.baseTokens) as Array<keyof typeof config.baseTokens>).forEach((key) => {
    switch (key) {
      case 'colors': {
        traverse({ node: config.baseTokens[key], path: [], groupKey: 'baseTokens' });
        break;
      }
      case 'fontWeights':
      case 'letterSpacings':
      case 'fonts': {
        traverse({ node: config.baseTokens[key], path: [], prefix, groupKey: 'baseTokens' });
        break;
      }
      case 'fontSizes': {
        traverse({ node: config.baseTokens[key], path: [], prefix: `${prefix}-fs`, groupKey: 'baseTokens' });
        break;
      }
      case 'lineHeights': {
        traverse({ node: config.baseTokens[key], path: [], prefix: `${prefix}-lh`, groupKey: 'baseTokens' });
        break;
      }
      case 'scale': {
        traverse({ node: config.baseTokens[key], path: [], prefix: `${prefix}-scale`, groupKey: 'baseTokens' });
        break;
      }
      case 'spacing': {
        traverse({ node: config.baseTokens[key], path: [], prefix: `${prefix}-spacing`, postfix: 'x', groupKey: 'baseTokens' });
        break;
      }
      case 'radii': {
        traverse({ node: config.baseTokens[key], path: [], prefix: `${prefix}-rounded`, groupKey: 'baseTokens' });
        break;
      }
      case 'breakpoints': {
        traverse({ node: config.baseTokens[key], path: [], prefix: `${prefix}-screen`, groupKey: 'baseTokens' });
        break;
      }
      case 'durations': {
        traverse({ node: config.baseTokens[key], path: [], prefix: `${prefix}-duration`, groupKey: 'baseTokens' });
        break;
      }
      default: {
        const k: never = key;
        throw new Error(`Please, handle key ${k}`);
      }
    }
  });
  (Object.keys(config.semanticTokens) as Array<keyof typeof config.semanticTokens>).forEach((key) => {
    switch (key) {
      case 'durations': {
        traverse({ node: config.semanticTokens[key], path: [], prefix: `${prefix}-duration`, groupKey: 'semanticTokens' });
        break;
      }
      case 'radii': {
        traverse({ node: config.semanticTokens[key], path: [], prefix, postfix: '-rounded', groupKey: 'semanticTokens' });
        break;
      }
      case 'opacity': {
        traverse({ node: config.semanticTokens[key], path: [], prefix, postfix: '-opacity', groupKey: 'semanticTokens' });
        break;
      }
      default: {
        traverse({ node: config.semanticTokens[key], path: [], prefix, groupKey: 'semanticTokens' });
      }
    }
  });

  traverse({ node: config.featureHighlight, path: [], prefix, groupKey: 'highlightsTokens' });

  return processedTokens;
}

export const tokensToCss = (
  tokens: { name: string; value: string; description: string }[],
  selector = ':root',
) => {
  const cssLines: string[] = [];
  cssLines.push(`${selector} {`);
  for (const token of tokens) {
    if (token.description) cssLines.push(`  /* ${token.description} */`);
    cssLines.push(`  ${token.name}: ${token.value};`);
  }
  cssLines.push('}');
  return cssLines.join('\n');
};

export const tokensToJs = (tokens: { name: string; value: string; description: string }[]) => {
  const jsLines: string[] = [];
  jsLines.push('export default {');
  for (const token of tokens) {
    jsLines.push(`  '${token.name}': '${token.value}',`);
  }
  jsLines.push('};\n');
  return jsLines.join('\n');
};

export const getByPath = (obj: any, parts: string[]) => {
  let result = obj;
  for (const part of parts) {
    result = result?.[part];
  }
  return result;
};
