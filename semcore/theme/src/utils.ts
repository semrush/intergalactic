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

export const processTokens = (base: TokensInput, tokens: TokensInput, featureHighlight: TokensInput, prefix: string) => {
  const values: { [tokenName: string]: string } = {};
  const basicTokens = new Set<string>();
  const highlightTokens = new Set<string>();
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
  const traverse = (node: DesignTokenNode, pathParts: string[] = [], setToAdd?: Set<string>) => {
    for (const key in node) {
      if (key === 'type') continue;
      if (key === 'value') continue;
      if (key === 'description') continue;
      if (key === '$extensions') continue;
      traverse((node as any)[key], [...pathParts, key], setToAdd);
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
      setToAdd?.add(path);

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

  traverse(base, [], basicTokens);
  traverse(tokens);
  traverse(featureHighlight, [], highlightTokens);

  const resolveOklch = (raw: string): string => {
    const trimmed = raw.trim();
    if (!trimmed.startsWith('oklch(') || !trimmed.endsWith(')')) return raw;
    const inner = trimmed.slice(6, -1).trim();
    const parts = inner.split(/[\s/]+/);
    const L = parts[0];
    const C = parts[1] ?? '0';
    const hasAlpha = parts.length > 3;
    const alpha = hasAlpha ? parseFloat(parts[parts.length - 1]) : 1;
    const isWhite = (C === '0' || parseFloat(C) === 0) && (L === '1' || L === '100%' || parseFloat(L) === 1);
    if (isWhite) {
      return alpha < 1 ? `rgba(255, 255, 255, ${alpha})` : '#ffffff';
    }
    try {
      const c = new Color(trimmed);
      const srgb = c.to('sRGB');
      const r = Math.round(srgb.r * 255);
      const g = Math.round(srgb.g * 255);
      const b = Math.round(srgb.b * 255);
      const a = srgb.alpha ?? 1;
      return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a})` : srgb.toString({ format: 'hex' });
    } catch {
      return raw;
    }
  };

  const resolveColor = (color: string): string => {
    if (color.includes('linear-gradient')) {
      if (color.includes('rgba')) {
        return replaceColors(color);
      } else {
        return color.replace(/\{[a-z0-9.]+\}/g, resolveColor);
      }
    }
    if (color.startsWith('rgba(') && color.endsWith(')')) {
      const lastComa = color.lastIndexOf(',');
      const alpha = Number.parseFloat(color.substring(lastComa + 1, color.length - 1).trim());
      if (Number.isNaN(alpha)) {
        throw new Error(`Unable to parse rgba of ${color}`);
      }
      let resolvedColor = color.substring('rgba('.length, lastComa).trim();
      if (resolvedColor.startsWith('{')) resolvedColor = resolveColor(resolvedColor);
      if (resolvedColor.startsWith('$')) resolvedColor = resolveColor(resolvedColor);
      resolvedColor = resolveOklch(resolvedColor);
      if (resolvedColor.startsWith('#')) {
        if (resolvedColor.length === 1 + 3) {
          resolvedColor = [resolvedColor[1], resolvedColor[2], resolvedColor[3]]
            .map((hex) => Number.parseInt(hex, 16))
            .join(', ');
        } else if (resolvedColor.length === 1 + 6) {
          resolvedColor = [
            resolvedColor.substring(1, 3),
            resolvedColor.substring(3, 5),
            resolvedColor.substring(5, 7),
          ]
            .map((hex) => Number.parseInt(hex, 16))
            .join(', ');
        } else {
          throw new Error(
            `Unable to convert hex ${resolveColor} to rgb list of colors (processing ${color})`,
          );
        }
      }

      if (!resolvedColor || resolvedColor.split(',').length !== 3) {
        try {
          const c = new Color(resolvedColor.trim());
          const srgb = c.to('sRGB');
          resolvedColor = [
            Math.round(srgb.r * 255),
            Math.round(srgb.g * 255),
            Math.round(srgb.b * 255),
          ].join(', ');
        } catch (e) {
          throw new Error(
            `Unable to produce rgba of ${color} (input format is not supported yet): ${e instanceof Error ? e.message : e}`,
          );
        }
      }

      return `rgba(${resolvedColor}, ${alpha})`;
    }
    if (color.startsWith('{') && color.split('.').length > 0 && color.endsWith('}')) {
      const path = color.substring(1, color.length - 1).trim();
      let resolvedColor =
        getByPath(base as any, path)?.value ?? values[path.split('.').join('-')];
      if (!resolvedColor) {
        throw new Error(`Color ${color} was not found in base palette`);
      }
      resolvedColor = resolveOklch(resolvedColor);
      return resolveColor(resolvedColor);
    }
    if (color.startsWith('$') && color.split('.').length > 0) {
      const path = color.substring(1).trim();
      let resolvedColor =
        getByPath(base as any, path)?.value ?? values[path.split('.').join('-')];
      if (!resolvedColor) {
        throw new Error(`Color ${color} was not found`);
      }
      resolvedColor = resolveOklch(resolvedColor);
      return resolveColor(resolvedColor);
    }
    if (color.startsWith('#')) {
      return color;
    }
    if (color.startsWith('oklch(') && color.endsWith(')')) {
      const resolved = resolveOklch(color);
      if (resolved !== color) return resolved;
      try {
        const c = new Color(color);
        const srgb = c.to('sRGB');
        const r = Math.round(srgb.r * 255);
        const g = Math.round(srgb.g * 255);
        const b = Math.round(srgb.b * 255);
        const alpha = srgb.alpha ?? 1;
        if (alpha < 1) {
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
        return srgb.toString({ format: 'hex' });
      } catch (e) {
        throw new Error(`Unable to process oklch color ${color}: ${e instanceof Error ? e.message : e}`);
      }
    }
    throw new Error(`Unable to process color ${color}`);
  };
  const resolveToken = (token: string, refStack: Set<string> = new Set()): string => {
    if (token.includes('*')) {
      const [value, factor] = token.split('*');
      const resolvedValue = resolveToken(value, refStack);
      if (!resolvedValue.endsWith('px')) {
        throw new Error(`Unsupported expression ${token}`);
      }
      return `${Number.parseFloat(resolvedValue) * Number.parseFloat(factor)}px`;
    }
    let result = token;
    while (result.includes('{') && result.includes('}')) {
      const match = result.match(/\{([^}]+)\}/);
      if (!match) break;
      const reference = match[1].replace(/\./g, '-');
      if (refStack.has(reference)) {
        throw new Error(`Circular token reference detected: ${reference} in "${token}"`);
      }
      const rawRefValue = values[reference];
      if (rawRefValue === undefined) {
        throw new Error(`Token "${reference}" was not found when resolving "${token}"`);
      }
      refStack.add(reference);
      const replacement = resolveToken(rawRefValue, refStack);
      refStack.delete(reference);
      result =
        result.substring(0, match.index!) + replacement + result.substring(match.index! + match[0].length);
    }
    return result;
  };

  /** Replaces simple calc() expressions with computed px values for final CSS/TS output. */
  const evaluateSimpleCalc = (value: string): string => {
    let result = value;
    let prev: string;
    const toPx = (n: number) => `${n % 1 === 0 ? n : Math.round(n * 100) / 100}px`;
    do {
      prev = result;
      const addMatch = result.match(/calc\(\s*([\d.]+)px\s*\+\s*([\d.]+)px\s*\)/);
      if (addMatch) {
        result = result.replace(addMatch[0], toPx(Number.parseFloat(addMatch[1]) + Number.parseFloat(addMatch[2])));
        continue;
      }
      const subMatch = result.match(/calc\(\s*([\d.]+)px\s*-\s*([\d.]+)px\s*\)/);
      if (subMatch) {
        result = result.replace(subMatch[0], toPx(Number.parseFloat(subMatch[1]) - Number.parseFloat(subMatch[2])));
        continue;
      }
      const mulMatch = result.match(/calc\(\s*([\d.]+)px\s*\*\s*([\d.]+)\s*\)/);
      if (mulMatch) {
        result = result.replace(mulMatch[0], toPx(Number.parseFloat(mulMatch[1]) * Number.parseFloat(mulMatch[2])));
        continue;
      }
      const divMatch = result.match(/calc\(\s*([\d.]+)px\s*\/\s*([\d.]+)\s*\)/);
      if (divMatch) {
        result = result.replace(divMatch[0], toPx(Number.parseFloat(divMatch[1]) / Number.parseFloat(divMatch[2])));
        continue;
      }
    } while (prev !== result);
    return result;
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
      if (typeof values[token] === 'string' && values[token].trim().startsWith('oklch(')) {
        try {
          const c = new Color(values[token].trim());
          const srgb = c.to('sRGB');
          const r = Math.round(srgb.r * 255);
          const g = Math.round(srgb.g * 255);
          const b = Math.round(srgb.b * 255);
          const alpha = srgb.alpha ?? 1;
          values[token] =
            alpha < 1 ? `rgba(${r}, ${g}, ${b}, ${alpha})` : srgb.toString({ format: 'hex' });
        } catch {
          // leave as-is if conversion fails
        }
      }
    } else if (types[token] === 'boxShadow') {
      values[token] = resolveToken(values[token].split('; ').map(replaceColors).join(', '));
    } else if (
      types[token] === 'sizing' ||
      types[token] === 'spacing' ||
      types[token] === 'borderRadius' ||
      types[token] === 'other'
    ) {
      values[token] = evaluateSimpleCalc(resolveToken(values[token]));
    }
    for (const modification of modifications[token] ?? []) {
      // refer to https://docs.tokens.studio/tokens/color-modifiers and https://github.com/tokens-studio/figma-plugin/tree/main/src/utils/color if extension is needed

      rawValues[token] = `${rawValues[token]} / ${modification.type}(${modification.value}) / ${modification.space}`;

      // array + regex to process gradients with several colors
      const colorRegex = /(#[0-9a-f]{6}|rgba\([0-9., ]+\))/gi;
      const colors = values[token].match(colorRegex) ?? [];

      for (const originalColor of colors) {
        let color = new Color(originalColor);

        if (modification.space === 'hsl') {
          if (modification.type === 'lighten') {
            const lightness = color.hsl.l;
            const difference = 100 - lightness;
            color.set('hsl.l', Math.min(100, lightness + difference * modification.value));
          } else {
            throw new Error(`Unsupported color modification ${modification.type} of token ${token}`);
          }
        } else {
          throw new Error(`Unsupported color space ${modification.space} of token ${token}`);
        }

        color = color.to('sRGB');
        let modifiedColor = '';

        if (color.alpha !== 1) {
          const r = Math.round(color.r * 255);
          const g = Math.round(color.g * 255);
          const b = Math.round(color.b * 255);
          const a = color.alpha;
          modifiedColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        } else {
          modifiedColor = color.toString({ format: 'hex' });
        }

        values[token] = values[token].replace(originalColor, modifiedColor);
      }
    }
  }

  const processedTokens: { name: string; value: string; description: string; originalName: string }[] = [];
  const highlightsTokens: { name: string; value: string; description: string; originalName: string }[] = [];

  for (const token in values) {
    const isBase = basicTokens.has(token) && types[token] === 'color';
    (highlightTokens.has(token) ? highlightsTokens : processedTokens).push({
      name: isBase ? `--${token}` : `--${prefix}-${token}`,
      description: descriptions[token],
      value: values[token],
      originalName: token,
    });
  }

  return { processedTokens, highlightsTokens, values, types, rawValues, descriptions, basicTokens };
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
  jsLines.push('};\n');
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
