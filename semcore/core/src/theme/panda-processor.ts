const FIGMA_TOKENS_ONLY = [
  'keyboard-focus-feature-highlight',
];

const PANDA_DURATIONS_KEY = 'durations';

const INTERGALACTIC_TYPE_TO_PANDA: Record<string, string> = {
  color: 'colors',
  sizing: 'sizes',
  spacing: 'spacing',
  fontFamilies: 'fonts',
  fontSizes: 'fontSizes',
  fontWeights: 'fontWeights',
  letterSpacing: 'letterSpacings',
  lineHeights: 'lineHeights',
  borderRadius: 'radii',
  border: 'borders',
  boxShadow: 'shadows',
  opacity: 'opacity',
  // z-index - zIndex
  // duration - durations
};

type TokenType = {
  [key: string]: TokenType | { value: string };
};

type PandaConfig = {
  tokens: TokenType;
  semanticTokens: TokenType;
};

const setToken = (
  value: string,
  from: Array<string>,
  to: Record<string, any>,
  description?: string,
): TokenType => {
  const [part, ...parts] = from;

  if (parts.length === 0) {
    if (to[part] && typeof to[part] === 'object') {
      to[part].DEFAULT = { value, ...(description && { description }) };
    } else {
      to[part] = { value, ...(description && { description }) };
    }

    return to;
  }

  if (to[part] && 'value' in to[part]) {
    to[part] = { DEFAULT: { ...to[part] } };
  }

  to[part] = {
    ...to[part],
    ...setToken(value, parts, to[part] ?? {}, description),
  };

  return to;
};

const ifZIndex = (key: string) => key.startsWith('z-index-');
const ifDuration = (key: string) => key.startsWith('duration-');

const getKeyParts = (key: string) => {
  const parts = key.split('-');

  if (key === 'disabled-opacity') {
    return [parts[0]];
  }

  if (ifDuration(key)) {
    return parts.filter((p) => !p.startsWith('duration'));
  }

  if (ifZIndex(key)) {
    return parts.filter((p) => !p.startsWith('z') && !p.startsWith('index'));
  }

  return parts;
};

export const getPandaConfig = (
  values: Record<string, string>,
  basicTokens: Set<string>,
  types: Record<string, string>,
  descriptions: Record<string, string>,
): PandaConfig => {
  const tokens: TokenType = {};
  const semanticTokens: TokenType = {};

  Object.entries(types).forEach(([key, type]) => {
    if (FIGMA_TOKENS_ONLY.includes(key)) return;

    const value = values[key];
    const description = descriptions[key];

    let pandaKey = INTERGALACTIC_TYPE_TO_PANDA[type];
    const isDurationKey = ifDuration(key);

    if (!pandaKey && !isDurationKey) return;

    const isBaseToken = basicTokens.has(key);

    if (isDurationKey) {
      pandaKey = PANDA_DURATIONS_KEY;
    }

    const keyParts = getKeyParts(key);

    if (isBaseToken) {
      tokens[pandaKey] = setToken(value, keyParts, tokens[pandaKey] ?? {}, description);
    } else {
      semanticTokens[pandaKey] = setToken(value, keyParts, semanticTokens[pandaKey] ?? {}, description);
    }
  });

  return {
    tokens,
    semanticTokens,
  };
};

export const toPandaPreset = (config: PandaConfig) => {
  const preset = `
    import { definePreset } from '@pandacss/dev';

    export default definePreset({
      name: '@semcore/panda-preset',
      theme: {
        tokens: ${JSON.stringify(config.tokens, undefined, 4)},
        semanticTokens: ${JSON.stringify(config.semanticTokens, undefined, 4)}
      },
    });
    `;

  return preset;
};
