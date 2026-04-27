import type { Theme } from './theme';

// export const processTokens = (base: TokensInput, tokens: TokensInput, featureHighlight: TokensInput, prefix: string) => {
//   const values: { [tokenName: string]: string } = {};
//   const basicTokens = new Set<string>();
//   const highlightTokens = new Set<string>();
//   const modifications: {
//     [tokenName: string]: {
//       type: 'lighten' | 'darken' | 'alpha';
//       value: number;
//       space: 'lch' | 'srgb' | 'p3' | 'hsl';
//     }[];
//   } = {};
//   const types: { [tokenName: string]: string } = {};
//   const descriptions: { [tokenName: string]: string } = {};
//   const mixins: string[] = [];
//   type ColorPattern =
//     | `{${string}.${string}}`
//     | `{${string}.${string}}, ${number}`
//     | `#${string}`
//     | `{${string}.${string}}, ${number}`;
//   type DesignTokenNode =
//     | {
//       type: string;
//       value:
//         | string
//         | { [subTokens: string]: `{${string}}` }
//         | ColorPattern
//         | `{${string}}`
//         | `{${string}*${number}}`
//         | `${ColorPattern}; ${ColorPattern}`;
//
//       description?: string;
//       $extensions?: ExtensionsInput;
//     }
//     | DesignTokenTree;
//   type DesignTokenTree = { [childrenNodeName: string]: DesignTokenNode };
//   const traverse = (node: DesignTokenNode, pathParts: string[] = [], setToAdd?: Set<string>) => {
//     for (const key in node) {
//       if (key === 'type') continue;
//       if (key === 'value') continue;
//       if (key === 'description') continue;
//       if (key === '$extensions') continue;
//       traverse((node as any)[key], [...pathParts, key], setToAdd);
//     }
//     if ('type' in node && typeof node.type === 'string') {
//       const path = pathParts.join('-');
//       types[path] = node.type;
//       if (typeof node.value === 'object') {
//         mixins.push(path);
//         return;
//       }
//       if (values[path]) {
//         throw new Error(`Duplicated design token "${path}"`);
//       }
//       values[path] = node.value;
//       setToAdd?.add(path);
//
//       if (typeof node.description === 'string') descriptions[path] = node.description;
//       if (node.$extensions) {
//         for (const extension in node.$extensions) {
//           if (extension === 'studio.tokens') {
//             modifications[path] ??= [];
//             modifications[path].push((node.$extensions as any)['studio.tokens'].modify);
//           } else {
//             throw new Error(`Unsupported extension "${extension}" for design token "${path}"`);
//           }
//         }
//       }
//     }
//   };
//
//   traverse(base, [], basicTokens);
//   traverse(tokens);
//   traverse(featureHighlight, [], highlightTokens);
//
//   const resolveColor = (color: string): string => {
//     if (color.includes('linear-gradient')) {
//       if (color.includes('rgba')) {
//         return replaceColors(color);
//       } else {
//         return color.replace(/\{[a-z0-9.]+\}/g, resolveColor);
//       }
//     }
//     if (color.startsWith('rgba(') && color.endsWith(')')) {
//       const lastComa = color.lastIndexOf(',');
//       const alpha = Number.parseFloat(color.substring(lastComa + 1, color.length - 1));
//       if (Number.isNaN(alpha)) {
//         throw new Error(`Unable to parse rgba of ${color}`);
//       }
//       let resolvedColor = color.substring('rgba('.length, lastComa);
//       if (resolvedColor.startsWith('{')) resolvedColor = resolveColor(resolvedColor);
//       if (resolvedColor.startsWith('$')) resolvedColor = resolveColor(resolvedColor);
//       if (resolvedColor.startsWith('#')) {
//         if (resolvedColor.length === 1 + 3) {
//           resolvedColor = [resolvedColor[1], resolvedColor[2], resolvedColor[3]]
//             .map((hex) => Number.parseInt(hex, 16))
//             .join(', ');
//         } else if (resolvedColor.length === 1 + 6) {
//           resolvedColor = [
//             resolvedColor.substring(1, 3),
//             resolvedColor.substring(3, 5),
//             resolvedColor.substring(5, 7),
//           ]
//             .map((hex) => Number.parseInt(hex, 16))
//             .join(', ');
//         } else {
//           throw new Error(
//             `Unable to convert hex ${resolveColor} to rgb list of colors (processing ${color})`,
//           );
//         }
//       }
//
//       if (!resolvedColor || resolvedColor.split(',').length !== 3) {
//         throw new Error(`Unable to produce rgba of ${color} (input format is not supported yet)`);
//       }
//
//       return `rgba(${resolvedColor}, ${alpha})`;
//     }
//     if (color.split(', ').length === 2) {
//       const baseColor = resolveColor(color.split(', ')[0]);
//       const [r, g, b] = (
//         baseColor.length === 4
//           ? [baseColor[1], baseColor[2], baseColor[3]]
//           : [baseColor.substring(1, 3), baseColor.substring(3, 5), baseColor.substring(5, 7)]
//       ).map((chunk) => Number.parseInt(chunk, 16));
//       const a = Number.parseFloat(color.split(', ')[1]);
//
//       return `rgba(${r}, ${g}, ${b}, ${a})`;
//     }
//     if (color.startsWith('{') && color.split('.').length > 0 && color.endsWith('}')) {
//       const path = color.substring(1, color.length - 1);
//       const resolvedColor =
//         getByPath(base as any, path)?.value ?? values[path.split('.').join('-')];
//       if (!resolvedColor) {
//         throw new Error(`Color ${color} was not found in base palette`);
//       }
//       return resolvedColor;
//     }
//     if (color.startsWith('$') && color.split('.').length > 0) {
//       const path = color.substring(1);
//       const resolvedColor =
//         getByPath(base as any, path)?.value ?? values[path.split('.').join('-')];
//       if (!resolvedColor) {
//         throw new Error(`Color ${color} was not found`);
//       }
//       return resolvedColor;
//     }
//     if (color.startsWith('#')) {
//       return color;
//     }
//     throw new Error(`Unable to process color ${color}`);
//   };
//   const resolveToken = (token: string): string => {
//     if (token.includes('*')) {
//       const [value, factor] = token.split('*');
//       const resolvedValue = resolveToken(value);
//       if (!resolvedValue.endsWith('px')) {
//         throw new Error(`Unsupported expression ${token}`);
//       }
//       return `${Number.parseFloat(resolvedValue) * Number.parseFloat(factor)}px`;
//     } else if (token.includes('{') && token.includes('}')) {
//       const reference = token
//         .substring(token.indexOf('{') + 1, token.indexOf('}'))
//         .replace(/\./g, '-');
//       const resolvedToken =
//         token.substring(0, token.indexOf('{')) +
//         values[reference] +
//         token.substring(token.indexOf('}') + 1);
//       if (!resolvedToken || resolvedToken.includes('{')) {
//         throw new Error(`On moment of resolving ${token}, ${resolvedToken} was not resolved yet`);
//       }
//       return resolvedToken;
//     } else {
//       return token;
//     }
//   };
//   const replaceColors = (str: string) => {
//     let result = '';
//     for (let i = 0; i < str.length; i++) {
//       if (str.substring(i, i + 'rgba('.length) === 'rgba(') {
//         const start = i;
//         while (str[i] !== undefined && str[i] !== ')') i++;
//         result += resolveColor(str.substring(start, i + 1));
//       } else {
//         result += str[i];
//       }
//     }
//
//     return result;
//   };
//
//   const rawValues = { ...values };
//
//   for (const token in values) {
//     if (types[token] === 'color') {
//       values[token] = resolveColor(values[token]);
//     } else if (types[token] === 'boxShadow') {
//       values[token] = resolveToken(values[token].split('; ').map(replaceColors).join(', '));
//     } else if (
//       types[token] === 'sizing' ||
//       types[token] === 'spacing' ||
//       types[token] === 'borderRadius' ||
//       types[token] === 'other'
//     ) {
//       values[token] = resolveToken(values[token]);
//     }
//     for (const modification of modifications[token] ?? []) {
//       // refer to https://docs.tokens.studio/tokens/color-modifiers and https://github.com/tokens-studio/figma-plugin/tree/main/src/utils/color if extension is needed
//
//       rawValues[token] = `${rawValues[token]} / ${modification.type}(${modification.value}) / ${modification.space}`;
//
//       // array + regex to process gradients with several colors
//       const colorRegex = /(#[0-9a-f]{6}|rgba\([0-9., ]+\))/gi;
//       const colors = values[token].match(colorRegex) ?? [];
//
//       for (const originalColor of colors) {
//         let color = new Color(originalColor);
//
//         if (modification.space === 'hsl') {
//           if (modification.type === 'lighten') {
//             const lightness = color.hsl.l;
//             const difference = 100 - lightness;
//             color.set('hsl.l', Math.min(100, lightness + difference * modification.value));
//           } else {
//             throw new Error(`Unsupported color modification ${modification.type} of token ${token}`);
//           }
//         } else {
//           throw new Error(`Unsupported color space ${modification.space} of token ${token}`);
//         }
//
//         color = color.to('sRGB');
//         let modifiedColor = '';
//
//         if (color.alpha !== 1) {
//           const r = Math.round(color.r * 255);
//           const g = Math.round(color.g * 255);
//           const b = Math.round(color.b * 255);
//           const a = color.alpha;
//           modifiedColor = `rgba(${r}, ${g}, ${b}, ${a})`;
//         } else {
//           modifiedColor = color.toString({ format: 'hex' });
//         }
//
//         values[token] = values[token].replace(originalColor, modifiedColor);
//       }
//     }
//   }
//
//   const processedTokens: { name: string; value: string; description: string; originalName: string }[] = [];
//   const highlightsTokens: { name: string; value: string; description: string; originalName: string }[] = [];
//
//   for (const token in values) {
//     const isBase = basicTokens.has(token) && types[token] === 'color';
//     (highlightTokens.has(token) ? highlightsTokens : processedTokens).push({
//       name: isBase ? `--${token}` : `--${prefix}-${token}`,
//       description: descriptions[token],
//       value: values[token],
//       originalName: token,
//     });
//   }
//
//   return { processedTokens, highlightsTokens, values, types, rawValues, descriptions, basicTokens };
// };

type ProcessedTokens = {
  values: Record<string, string>;
  descriptions: Record<string, string>;
  processedTokens: { name: string; value: string; description: string }[];
  highlightsTokens: [];
};

// @ts-ignore
type N = Record<string, N | string>;

export const logger = {
  // eslint-disable-next-line no-console
  log: console.log,
  // eslint-disable-next-line no-console
  error: console.error,
};

export function processTokens(config: Theme, prefix: string): ProcessedTokens {
  const processedTokens: ProcessedTokens = {
    values: {},
    descriptions: {},
    processedTokens: [],
    highlightsTokens: [],
  };

  function getConfigValue(path: string[]) {
    try {
      const valueObj = getByPath(config, path);

      if ('value' in valueObj) {
        return valueObj.value;
      }

      if ('DEFAULT' in valueObj && 'value' in valueObj.DEFAULT) {
        return valueObj.DEFAULT.value;
      }
    } catch (e) {
      logger.log(e);
      logger.log(path);
    }

    return `{${path.join('.')}}`;
  }

  function processValue(value: string) {
    if (value.startsWith('{') && value.endsWith('}')) {
      return getConfigValue(value.slice(1, -1).split('.'));
    }
    if (value.includes('{') && value.includes('}')) {
      const replacer = new RegExp(`{([a-z.-])+}`, 'gi');

      const result = value.replace(replacer, (match) => {
        const calculatedValue = getConfigValue(match.slice(1, -1).split('.'));

        return calculatedValue;
      });

      return result;
    }

    return value;
  }

  function traverse(node: N, path: string[], prefix: string = '', postfix: string = '') {
    if ('value' in node && typeof node.value === 'string') {
      const nodeKey = path.filter((p) => p !== 'DEFAULT').join('-');
      let key = prefix ? `--${prefix}-${nodeKey}` : `--${nodeKey}`;
      if (postfix) {
        key = `${key}-${postfix}`;
      }
      const value = processValue(node.value);
      processedTokens.values[key] = value;
      processedTokens.descriptions[key] = node.description;
      processedTokens.processedTokens.push({
        name: key,
        value: value,
        description: node.description,
      });
    } else {
      Object.keys(node).forEach((key) => {
        traverse(node[key], [...path, key], prefix, postfix);
      });
    }
  }

  (Object.keys(config.baseTokens) as Array<keyof typeof config.baseTokens>).forEach((key) => {
    switch (key) {
      case 'colors': {
        traverse(config.baseTokens[key], []);
        break;
      }
      case 'fontWeights':
      case 'letterSpacings':
      case 'fonts': {
        traverse(config.baseTokens[key], [], prefix);
        break;
      }
      case 'fontSizes': {
        traverse(config.baseTokens[key], [], `${prefix}-fs`);
        break;
      }
      case 'lineHeights': {
        traverse(config.baseTokens[key], [], `${prefix}-lh`);
        break;
      }
      case 'spacing': {
        const { 'scale-indent': scaleIndent, ...spacing } = config.baseTokens[key];
        traverse({ 'scale-indent': { ...scaleIndent } }, [], `${prefix}`);
        traverse(spacing, [], `${prefix}-spacing`);
        break;
      }
      case 'radii': {
        traverse(config.baseTokens[key], [], `${prefix}-rounded`);
        break;
      }
      case 'breakpoints': {
        traverse(config.baseTokens[key], [], `${prefix}-screen`);
        break;
      }
      case 'durations': {
        traverse(config.baseTokens[key], [], `${prefix}-duration`);
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
        traverse(config.semanticTokens[key], [], `${prefix}-duration`);
        break;
      }
      case 'radii': {
        traverse(config.semanticTokens[key], [], prefix, 'rounded');
        break;
      }
      case 'opacity': {
        traverse(config.semanticTokens[key], [], prefix, 'opacity');
        break;
      }
      default: {
        traverse(config.semanticTokens[key], [], prefix);
      }
    }
  });

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

const getByPath = (obj: any, parts: string[]) => {
  let result = obj;
  for (const part of parts) {
    result = result?.[part];
  }
  return result;
};
