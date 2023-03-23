type TokensInput = {
  [nestedKey: string]: TokensInput | { value: string; type: string; description: string };
};

export const processTokens = (base: TokensInput, tokens: TokensInput, prefix: string) => {
  const values: { [tokenName: string]: string } = {};
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
      }
    | DesignTokenTree;
  type DesignTokenTree = { [childrenNodeName: string]: DesignTokenNode };
  const traverse = (node: DesignTokenNode, pathParts: string[] = []) => {
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
      return;
    }
    for (const key in node) {
      traverse(node[key], [...pathParts, key]);
    }
  };

  traverse(tokens);
  const resolveColor = (color: string) => {
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
    if (color.startsWith('{') && color.split('.').length === 2 && color.endsWith('}')) {
      const [group, index] = color.substring(1, color.length - 1).split('.');
      const resolvedColor = base[group][index].value;
      if (!resolvedColor) {
        throw new Error(`Color ${color} was not found in base palette`);
      }
      return resolvedColor;
    }
    if (color.startsWith('$') && color.split('.').length === 2) {
      const [group, index] = color.substring(1).split('.');
      const resolvedColor = base[group]?.[index]?.value ?? values[`${group}-${index}`];
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
  const resolveToken = (token: string) => {
    if (token.includes('*')) {
      const [value, factor] = token.split('*');
      const resolvedValue = resolveToken(value);
      if (!resolvedValue.endsWith('px')) {
        throw new Error(`Unsupported expression ${token}`);
      }
      return `${parseFloat(resolvedValue) * parseFloat(factor)}px`;
    } else if (token.startsWith('{') && token.endsWith('}')) {
      const resolvedToken = values[token.substring(1, token.length - 1).replace(/\./g, '-')];
      if (!resolvedToken || resolvedToken.startsWith('{')) {
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
      values[token] = values[token].split('; ').map(replaceColors).join(', ');
    } else if (
      types[token] === 'sizing' ||
      types[token] === 'spacing' ||
      types[token] === 'borderRadius' ||
      types[token] === 'other'
    ) {
      values[token] = resolveToken(values[token]);
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

export const tokensToCss = (tokens: { name: string; value: string; description: string }[]) => {
  const cssLines: string[] = [];
  cssLines.push(':root {');
  for (const token of tokens) {
    if (token.description) cssLines.push(`  /* ${token.description} */`);
    cssLines.push(`  ${token.name}: ${token.value};`);
  }
  cssLines.push('}');
  return cssLines.join('\n');
};
export const tokensToJson = (tokens: { name: string; value: string; description: string }[]) => {
  const themeFile = {};
  for (const token of tokens) {
    themeFile[token.name] = token.value;
  }
  return JSON.stringify(themeFile, null, 2) + '\n';
};
