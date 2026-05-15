import { resolve as resolvePath, isAbsolute as isAbsolutePath } from 'node:path';

import levenshtein from 'js-levenshtein';
import type { Declaration } from 'postcss';
import postcssValueParser from 'postcss-value-parser';
import stylelint, { type PostcssResult, type Rule } from 'stylelint';

const ruleName = 'intergalactic/design-tokens';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (property, usedToken, recommendation) => {
    if (recommendation)
      return `Unexpected design token "${usedToken}" in property "${property}". Did you mean ${recommendation}?`;
    return `Unexpected design token "${usedToken}" in property "${property}".`;
  },
  deprecated: (token) => {
    return `Design token "${token}" is deprecated and will be removed in future versions. Please use arbitrary numeric values.`;
  },
});

type TokensCache = Record<string, unknown>;

let cachedTokens: TokensCache | null = null;
let cachedTokensPath: string | null = null;

const deprecatedTokens = new Set<string>([
  '--intergalactic-z-index-deep',
  '--intergalactic-z-index-overlay',
  '--intergalactic-z-index-modal',
  '--intergalactic-z-index-popper',
  '--intergalactic-z-index-dropdown',
  '--intergalactic-z-index-tooltip',
  '--intergalactic-z-index-notice-bubble',
]);

function loadTokens(tokensSource: string): TokensCache | null {
  if (cachedTokens && cachedTokensPath === tokensSource) {
    return cachedTokens;
  }

  const module = require(tokensSource);

  cachedTokens = module.default ?? module;
  cachedTokensPath = tokensSource;

  return cachedTokens;
}

const getClosestTokens = (value: string, designTokensList: string[]) => {
  const distanced = designTokensList.map((token) => {
    const distance = levenshtein(token, value);
    return {
      token,
      distance,
    };
  });
  distanced.sort((a, b) => a.distance - b.distance);

  return distanced
    .filter(({ distance }) => distance <= 5)
    .slice(0, 3)
    .map(({ token }) => token);
};

const stringifyList = (list: string[]) => {
  if (list.length === 0) return '';
  if (list.length === 1) return list[0];
  return `${list.slice(0, -1).join(', ')} or ${list.slice(-1)}`;
};

type Replacement = { from: string; to: string } | null;
type DeprecatedToken = string | null;

type ValidationResult = {
  replacement: Replacement;
  deprecatedToken: DeprecatedToken;
};

const validateToken = (
  value: string,
  prefix: string,
  designTokensSet: Set<string>,
  designTokensList: string[],
): ValidationResult => {
  let replacement: Replacement = null;
  let deprecatedToken: DeprecatedToken = null;

  const parsedValue = postcssValueParser(value);
  parsedValue.walk((node) => {
    if (replacement || deprecatedToken) return;
    if (node.type === 'function' && node.value === 'var' && node.nodes.length > 0) {
      const token = node.nodes[0].value;
      if (token.startsWith(prefix)) {
        if (!designTokensSet.has(token)) {
          replacement = {
            from: token,
            to: stringifyList(getClosestTokens(token, designTokensList)),
          };
        } else if (deprecatedTokens.has(token)) {
          deprecatedToken = token;
        }
      }
    }
  });

  return { replacement, deprecatedToken };
};

const validateDecl = (
  decl: Declaration,
  result: PostcssResult,
  prefix: string,
  designTokensSet: Set<string>,
  designTokensList: string[],
) => {
  const property = decl.prop;
  const value = decl.value;

  const { replacement, deprecatedToken } = validateToken(value, prefix, designTokensSet, designTokensList);

  if (replacement) {
    stylelint.utils.report({
      ruleName,
      result,
      node: decl,
      message: messages.expected(property, replacement.from, replacement.to),
    });
  }

  if (deprecatedToken) {
    stylelint.utils.report({
      ruleName,
      result,
      node: decl,
      message: messages.deprecated(deprecatedToken),
      severity: 'warning',
    });
  }
};

type Options = {
  tokensSource: string;
  include: string[];
  exclude: string[];
  prefix: string;
};

const defaultOptions = {
  tokensSource: 'node_modules/@semcore/theme/lib/light.js',
  include: [],
  exclude: [],
  prefix: '--intergalactic-',
} satisfies Options;

const meta = {
  url: 'https://developer.semrush.com/intergalactic/style/design-tokens/design-tokens#stylelint-plugin',
};

const rule: Rule = (enabled: boolean, providedOptions: Partial<Options> = {}) => {
  if (!enabled) return () => {};

  const options = { ...defaultOptions, ...providedOptions };
  const tokensSource = isAbsolutePath(options.tokensSource)
    ? options.tokensSource
    : resolvePath(process.cwd(), options.tokensSource);

  const designTokens = loadTokens(tokensSource);

  if (!designTokens) return () => {};

  const designTokensList = [...Object.keys(designTokens), ...options.include].filter(
    (token) => !options.exclude.includes(token),
  );
  const designTokensSet = new Set(designTokensList);
  const prefix = options.prefix;

  return (postcssRoot, result) => {
    postcssRoot.walkDecls((decl) => {
      validateDecl(decl, result, prefix, designTokensSet, designTokensList);
    });
  };
};

rule.ruleName = ruleName;
rule.messages = messages;
rule.meta = meta;
(rule as any).rule = rule;

module.exports = rule;
