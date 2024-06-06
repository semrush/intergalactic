import stylelint, { PostcssResult, Rule } from 'stylelint';
import postcssValueParser, {} from 'postcss-value-parser';
import levenshtein from 'js-levenshtein';
import type { Declaration } from 'postcss';
import { resolve as resolvePath, isAbsolute as isAbsolutePath } from 'path';

const ruleName = 'intergalactic/design-tokens';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (property, usedToken, recommendation) => {
    if (recommendation)
      return `Unexpected design token "${usedToken}" in property "${property}". Did you mean ${recommendation}?`;
    return `Unexpected design token "${usedToken}" in property "${property}".`;
  },
});

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
const validateToken = (
  value: string,
  prefix: string,
  designTokensSet: Set<string>,
  designTokensList: string[],
): Replacement => {
  let replacement: Replacement = null;

  const parsedValue = postcssValueParser(value);
  parsedValue.walk((node) => {
    if (replacement) return;
    if (node.type === 'function' && node.value === 'var' && node.nodes.length > 0) {
      const token = node.nodes[0].value;
      if (token.startsWith(prefix) && !designTokensSet.has(token)) {
        replacement = {
          from: token,
          to: stringifyList(getClosestTokens(token, designTokensList)),
        };
      }
    }
  });

  return replacement;
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

  const replacement = validateToken(value, prefix, designTokensSet, designTokensList);

  if (replacement) {
    stylelint.utils.report({
      ruleName,
      result,
      node: decl,
      message: messages.expected(property, replacement.from, replacement.to),
    });
  }
};

type Options = {
  tokensSource?: string;
  include?: string[];
  exclude?: string[];
  prefix?: string;
};

const defaultOptions = {
  tokensSource: 'node_modules/intergalactic/utils/lib/themes/default.json',
  include: [],
  exclude: [],
  prefix: '--intergalactic-',
} satisfies Options;

const meta = {
  url: 'https://developer.semrush.com/intergalactic/style/design-tokens/design-tokens#stylelint-plugin',
};

const rule: Rule = (enabled: boolean, providedOptions: Options = {}) => {
  if (!enabled) return () => {};

  const options = { ...defaultOptions, ...providedOptions };
  const tokensSource = isAbsolutePath(options.tokensSource)
    ? options.tokensSource
    : resolvePath(process.cwd(), options.tokensSource!);
  const designTokens = require(tokensSource);
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
