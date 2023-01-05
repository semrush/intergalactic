const Tokenizer = require('css-selector-tokenizer');
const ValueParser = require('postcss-value-parser');
const stringHash = require('string-hash');
const path = require('path');
const finderPackageJson = require('find-package-json');

const PLACEHOLDER_REPLACER = '_gg_';

function walkRule(nodes = [], parentNode, generateClassName, tokens) {
  let element;
  nodes.forEach((node, i) => {
    if (node.type === 'nested-pseudo-class' && node.name === 'global') {
      if (parentNode) {
        parentNode.nodes[i] = node.nodes;
        parentNode.nodes = parentNode.nodes.flat();
        // node = parentNode
      }
    } else if (node.type === 'element' && /^[A-Z]/.test(node.name)) {
      node.type = 'class';
      element = node.name;
      tokens['__' + node.name] = node.name = generateClassName([node.name]);
    } else if (node.type === 'class') {
      if (tokens['__' + node.name]) element = node.name;
    } else if (node.type === 'attribute' && !node.content.startsWith('data-')) {
      node.type = 'class';
      let [mod, value] = node.content.split('=');
      mod = mod.split('|').pop();
      if (value) {
        value = value.replace(/['"]/g, '');
        tokens['_' + mod + '_' + value] = node.name = generateClassName([element, mod, value]);
      } else {
        tokens['_' + mod] = node.name = generateClassName([element, mod]);
      }
    } else {
      element = undefined;
    }
    if (node.nodes?.length) {
      walkRule(node.nodes, node, generateClassName, tokens);
    }
  });
}

function walkVar(nodes, hash, variables) {
  nodes.forEach((node) => {
    if (node.type === 'word' && /^--/.test(node.value)) {
      variables[node.value] = node.value = `${node.value}_${hash}`;
    }
    if (node.nodes?.length) {
      walkVar(node.nodes, hash, variables);
    }
  });
}

function walkAnimation(nodes, hash) {
  nodes.forEach((node) => {
    if (node.type === 'word' && !['none', 'initial', 'inherit', 'unset'].includes(node.value)) {
      node.value = `${node.value}_${hash}`;
    }
    if (node.nodes?.length) {
      walkAnimation(node.nodes, hash);
    }
  });
}

const DEFAULT_OPTS = {
  generateScopedName: function ([el, mod, value], filename, css, hashFile) {
    if (value) {
      return `_${mod}_${value}_${hashFile}${PLACEHOLDER_REPLACER}`;
    }
    if (mod) {
      return `__${mod}_${hashFile}${PLACEHOLDER_REPLACER}`;
    }
    return `___${el}_${hashFile}${PLACEHOLDER_REPLACER}`;
  },
  generateHash: function (css, filename) {
    const packageJson = finderPackageJson(filename).next();
    const relativeFilename = path.relative(packageJson.filename, filename);
    return stringHash(css + relativeFilename)
      .toString(36)
      .substring(0, 5);
  },
};

const processed = Symbol('processed');

module.exports = (opts) => {
  const options = Object.assign({}, DEFAULT_OPTS, opts);

  return {
    postcssPlugin: 'postcss-shadow-styles',
    prepare(result) {
      const tokens = {};
      if (!result.root) {
        throw new Error(`Failed to process .shadow.css file ${result.opts.from}`);
      }
      const hash = options.generateHash(
        result.root.source.input.css,
        result.root.source.input.file,
      );

      const generateScopedName = (classes) =>
        options.generateScopedName(
          classes,
          result.root.source.input.file,
          result.root.source.input.css,
          hash,
        );

      return {
        AtRule(AtRule) {
          if (!AtRule[processed] && AtRule.name.endsWith('keyframes')) {
            tokens[`@${AtRule.params}`] = AtRule.params += `_${hash}`;
            AtRule[processed] = true;
          }
        },
        Rule(Rule) {
          if (!Rule[processed]) {
            const rootNode = Tokenizer.parse(Rule.selector);
            walkRule(rootNode.nodes, null, generateScopedName, tokens);
            Rule.selector = Tokenizer.stringify(rootNode);
            Rule[processed] = true;
          }
        },
        OnceExit(css, { result }) {
          result.messages.push({
            type: 'export',
            plugin: 'postcss-shadow-styles',
            tokens: tokens,
            hash: hash,
          });
        },
        Declaration(Declaration) {
          if (!Declaration[processed]) {
            if (Declaration.value.includes('var(')) {
              if (Declaration.value.includes('var(--intergalactic-')) return;
              const rootNode = ValueParser(Declaration.value);
              walkVar(rootNode.nodes, hash, tokens);
              Declaration.value = rootNode.toString();
              Declaration[processed] = true;
            } else if (Declaration.prop.endsWith('animation-name')) {
              const rootNode = ValueParser(Declaration.value);
              walkAnimation(rootNode.nodes, hash);
              Declaration.value = rootNode.toString();
              Declaration[processed] = true;
            }
          }
        },
      };
    },
  };
};

module.exports.PLACEHOLDER_REPLACER = PLACEHOLDER_REPLACER;
module.exports.postcss = true;
