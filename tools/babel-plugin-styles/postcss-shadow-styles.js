const Tokenizer = require('css-selector-tokenizer');
const ValueParser = require('postcss-value-parser');
const stringHash = require('string-hash');

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
  generateScopedName: function([el, mod, value], filename, css) {
    // const i = css.indexOf(`.${name}`);
    // const lineNumber = css.substr(0, i).split(/[\r\n]/).length;
    // const hash = stringHash(css + version + filename + lineNumber)
    //   .toString(36)
    //   .substr(0, 5);

    const hash = stringHash(css + filename)
      .toString(36)
      .substr(0, 5);

    if (value) {
      return `_${mod}_${value}_${hash}${PLACEHOLDER_REPLACER}`;
    }
    if (mod) {
      return `__${mod}_${hash}${PLACEHOLDER_REPLACER}`;
    }
    return `___${el}_${hash}${PLACEHOLDER_REPLACER}`;
  },
};

const processed = Symbol('processed');

module.exports = (opts) => {
  const options = Object.assign({}, DEFAULT_OPTS, opts);

  return {
    postcssPlugin: 'postcss-shadow-styles',
    prepare(result) {
      const tokens = {};
      const hash = stringHash(result.root.source.input.css).toString(36);
      const generateScopedName = (classes) =>
        options.generateScopedName(classes, result.opts.from, result.root.source.input.css);
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
              const rootNode = ValueParser(Declaration.value);
              walkVar(rootNode.nodes, hash, tokens);
              Declaration.value = rootNode.toString();
              Declaration[processed] = true;
              // else что бы не обрабатывать animation с переменными
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
