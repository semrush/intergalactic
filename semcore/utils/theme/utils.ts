import ColorJS from 'colorjs.io';
const Color = ColorJS as any;

type ExtensionsInput = {
  'studio.tokens': {
    modify: {
      type: string;
      value: number;
      space: string;
    };
  };
};

type TokensInput = {
  [nestedKey: string]:
    | TokensInput
    | {
        value: string;
        type: string;
        description: string;
        $extensions?: ExtensionsInput;
      };
};

export const processTokens = (base: TokensInput, tokens: TokensInput, prefix: string) => {
  const values: { [tokenName: string]: string } = {};
  const modifications: {
    [tokenName: string]: {
      type: 'lighten' | 'darken' | 'alpha';
      value: number;
      space: 'lch' | 'srgb' | 'p3' | 'hsl';
    }[];
  } = {};
  const types: { [tokenName: string]: string } = {};
  const descriptions: { [tokenName: string]: string } = {};
  const mixins: string[] = [];
  type ColorPattern =
    | `{${string}.${string}}`
    | `{${string}.${string}}, ${number}`
    | `#${string}`
    | `{${string}.${string}}, ${number}`;
  type DesignTokenNode =
    | {
        type: string;
        value:
          | string
          | { [subTokens: string]: `{${string}}` }
          | ColorPattern
          | `{${string}}`
          | `{${string}*${number}}`
          | `${ColorPattern}; ${ColorPattern}`;

        description?: string;
        $extensions?: ExtensionsInput;
      }
    | DesignTokenTree;
  type DesignTokenTree = { [childrenNodeName: string]: DesignTokenNode };
  const traverse = (node: DesignTokenNode, pathParts: string[] = []) => {
    for (const key in node) {
      if (key === 'type') continue;
      if (key === 'value') continue;
      if (key === 'description') continue;
      if (key === '$extensions') continue;
      traverse((node as any)[key], [...pathParts, key]);
    }
    if ('type' in node && typeof node.type === 'string') {
      const path = pathParts.join('-');
      types[path] = node.type;
      if (typeof node.value === 'object') {
        mixins.push(path);
        return;
      }
      if (values[path]) {
        throw new Error(`Duplicated design token "${path}"`);
      }
      values[path] = node.value;
      if (typeof node.description === 'string') descriptions[path] = node.description;
      if (node.$extensions) {
        for (const extension in node.$extensions) {
          if (extension === 'studio.tokens') {
            modifications[path] ??= [];
            modifications[path].push((node.$extensions as any)['studio.tokens'].modify);
          } else {
            throw new Error(`Unsupported extension "${extension}" for design token "${path}"`);
          }
        }
      }
    }
  };

  traverse(tokens);

  const resolveColor = (color: string): string => {
    if (color.includes('linear-gradient')) {
      return replaceColors(color);
    }
    if (color.startsWith('rgba(') && color.endsWith(')')) {
      const lastComa = color.lastIndexOf(',');
      const alpha = parseFloat(color.substring(lastComa + 1, color.length - 1));
      if (Number.isNaN(alpha)) {
        throw new Error(`Unable to parse rgba of ${color}`);
      }
      let resolvedColor = color.substring('rgba('.length, lastComa);
      if (resolvedColor.startsWith('{')) resolvedColor = resolveColor(resolvedColor);
      if (resolvedColor.startsWith('$')) resolvedColor = resolveColor(resolvedColor);
      if (resolvedColor.startsWith('#')) {
        if (resolvedColor.length === 1 + 3) {
          resolvedColor = [resolvedColor[1], resolvedColor[2], resolvedColor[3]]
            .map((hex) => parseInt(hex, 16))
            .join(', ');
        } else if (resolvedColor.length === 1 + 6) {
          resolvedColor = [
            resolvedColor.substring(1, 3),
            resolvedColor.substring(3, 5),
            resolvedColor.substring(5, 7),
          ]
            .map((hex) => parseInt(hex, 16))
            .join(', ');
        } else {
          throw new Error(
            `Unable to convert hex ${resolveColor} to rgb list of colors (processing ${color})`,
          );
        }
      }

      if (!resolvedColor || resolvedColor.split(',').length !== 3) {
        throw new Error(`Unable to produce rgba of ${color} (input format is not supported yet)`);
      }

      return `rgba(${resolvedColor}, ${alpha})`;
    }
    if (color.split(', ').length === 2) {
      const baseColor = resolveColor(color.split(', ')[0]);
      const [r, g, b] = (
        baseColor.length === 4
          ? [baseColor[1], baseColor[2], baseColor[3]]
          : [baseColor.substring(1, 3), baseColor.substring(3, 5), baseColor.substring(5, 7)]
      ).map((chunk) => parseInt(chunk, 16));
      const a = parseFloat(color.split(', ')[1]);

      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    if (color.startsWith('{') && color.split('.').length > 0 && color.endsWith('}')) {
      const path = color.substring(1, color.length - 1);
      const resolvedColor =
        getByPath(base as any, path)?.value ?? values[path.split('.').join('-')];
      if (!resolvedColor) {
        throw new Error(`Color ${color} was not found in base palette`);
      }
      return resolvedColor;
    }
    if (color.startsWith('$') && color.split('.').length > 0) {
      const path = color.substring(1);
      const resolvedColor =
        getByPath(base as any, path)?.value ?? values[path.split('.').join('-')];
      if (!resolvedColor) {
        throw new Error(`Color ${color} was not found`);
      }
      return resolvedColor;
    }
    if (color.startsWith('#')) {
      return color;
    }
    throw new Error(`Unable to process color ${color}`);
  };
  const resolveToken = (token: string): string => {
    if (token.includes('*')) {
      const [value, factor] = token.split('*');
      const resolvedValue = resolveToken(value);
      if (!resolvedValue.endsWith('px')) {
        throw new Error(`Unsupported expression ${token}`);
      }
      return `${parseFloat(resolvedValue) * parseFloat(factor)}px`;
    } else if (token.includes('{') && token.includes('}')) {
      const reference = token
        .substring(token.indexOf('{') + 1, token.indexOf('}'))
        .replace(/\./g, '-');
      const resolvedToken =
        token.substring(0, token.indexOf('{')) +
        values[reference] +
        token.substring(token.indexOf('}') + 1);
      if (!resolvedToken || resolvedToken.includes('{')) {
        throw new Error(`On moment of resolving ${token}, ${resolvedToken} was not resolved yet`);
      }
      return resolvedToken;
    } else {
      return token;
    }
  };
  const replaceColors = (str: string) => {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      if (str.substring(i, i + 'rgba('.length) === 'rgba(') {
        const start = i;
        while (str[i] !== undefined && str[i] !== ')') i++;
        result += resolveColor(str.substring(start, i + 1));
      } else {
        result += str[i];
      }
    }

    return result;
  };

  const rawValues = { ...values };

  for (const token in values) {
    if (types[token] === 'color') {
      values[token] = resolveColor(values[token]);
    } else if (types[token] === 'boxShadow') {
      values[token] = resolveToken(values[token].split('; ').map(replaceColors).join(', '));
    } else if (
      types[token] === 'sizing' ||
      types[token] === 'spacing' ||
      types[token] === 'borderRadius' ||
      types[token] === 'other'
    ) {
      values[token] = resolveToken(values[token]);
    }
    for (const modification of modifications[token] ?? []) {
      // refer to https://docs.tokens.studio/tokens/color-modifiers and https://github.com/tokens-studio/figma-plugin/tree/main/src/utils/color if extention is needed
      let color = new Color(values[token]);

      if (modification.space === 'hsl') {
        if (modification.type === 'lighten') {
          const lightness = color.hsl.l;
          const difference = 100 - lightness;
          color.set('hsl.l', Math.min(100, lightness + difference * modification.value));
          rawValues[token] = `${rawValues[token]} / lighten(${modification.value}) / hsl`;
        } else {
          throw new Error(`Unsupported color modification ${modification.type} of token ${token}`);
        }
      } else {
        throw new Error(`Unsupported color space ${modification.space} of token ${token}`);
      }

      color = color.to('sRGB');

      if (color.alpha !== 1) {
        const r = Math.round(color.r * 255);
        const g = Math.round(color.g * 255);
        const b = Math.round(color.b * 255);
        const a = color.alpha;
        values[token] = `rgba(${r}, ${g}, ${b}, ${a})`;
      } else {
        values[token] = color.toString({ format: 'hex' });
      }
    }
  }

  const processedTokens: { name: string; value: string; description: string }[] = [];
  for (const token in values) {
    processedTokens.push({
      name: `--${prefix}-${token}`,
      description: descriptions[token],
      value: values[token],
    });
  }

  return { processedTokens, values, types, rawValues, descriptions };
};

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
export const tokensToJson = (tokens: { name: string; value: string; description: string }[]) => {
  const themeFile: Record<string, string> = {};
  for (const token of tokens) {
    themeFile[token.name] = token.value;
  }
  return JSON.stringify(themeFile, null, 2) + '\n';
};
export const tokensToJs = (tokens: { name: string; value: string; description: string }[]) => {
  const jsLines: string[] = [];
  jsLines.push('export default {');
  for (const token of tokens) {
    jsLines.push(`  '${token.name}': '${token.value}',`);
  }
  jsLines.push('}\n');
  return jsLines.join('\n');
};

const getByPath = (obj: any, path: string) => {
  const parts = path.split('.');
  let result = obj;
  for (const part of parts) {
    result = result?.[part];
  }
  return result;
};
