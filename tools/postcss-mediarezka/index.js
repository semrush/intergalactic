const postcss = require('postcss');

const pluginName = 'postcss-mediarezka';
const functionName = 'media';
const defaults = {
  changePX: 1.3,
  precision: 5,
  mediaQuery: 'max-width: 768px',
  include: false,
  getMedia: () => {},
};

module.exports = postcss.plugin(pluginName, (opts = {}) => {
  const options = Object.assign({}, defaults, opts);

  const regexp = new RegExp('(?!\\W+)' + functionName + '\\(([^()]+)\\)', 'g');

  const rounded = (value, precision) => {
    precision = Math.pow(10, precision);
    return Math.floor(value * precision) / precision;
  };

  const convert = (values) =>
    values.replace(/(\d*\.?\d+)(px)/g, (match, value, from) => {
      if (from === 'px') {
        return rounded(parseFloat(value) * options.changePX, options.precision) + 'px';
      }
      return match;
    });

  return (root, result) => {
    let css = postcss.parse(`@media (${options.mediaQuery}) {}`);
    const media = css.last;
    root.walkRules(function(rule) {
      const mediaRule = rule.clone({ nodes: [] });
      rule.walkDecls(function(decl) {
        if (decl.value && decl.value.includes(functionName + '(')) {
          const value = decl.value.replace(regexp, '$1');
          decl.value = value;
          mediaRule.append(decl.clone({ value: convert(value) }));
        }
      });
      if (mediaRule.nodes.length) {
        media.append(mediaRule);
      }
    });
    // root.walkAtRules('media', (rule) => {
    //   css.append(rule.clone());
    //   rule.remove();
    // });
    if (media.nodes.length) {
      result.messages.push({
        type: 'export',
        plugin: pluginName,
        exportMedia: css.toString(),
      });

      if (options.include) {
        root.append(css);
      }
      return options.getMedia(css.toString());
    }
  };
});
