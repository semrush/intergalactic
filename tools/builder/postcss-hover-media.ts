import selectorParser from 'postcss-selector-parser';
import { Plugin, Rule } from 'postcss';

const selectorProcessor = selectorParser((selectors) => {
  const hoverSelectors = [];

  selectors.walk((selector) => {
    if (
      selector.type === 'pseudo' &&
      selector.toString() === ':hover' &&
      selector.parent.value !== ':not' &&
      selector.parent.toString() !== ':hover'
    ) {
      hoverSelectors.push(selector.parent.toString());
    }
  });

  const nonHoverSelectors = selectors.reduce((acc, selector) => {
    if (hoverSelectors.includes(selector.toString())) {
      return acc;
    }

    return [...acc, selector.toString()];
  }, []);

  return { hoverSelectors, nonHoverSelectors };
});

const postcssHoverMediaPlugin = ({} = {}) => {
  const appendToMediaQuery = (rule: Rule, { parent }) => {
    let selector = rule.selector;
    while (selector.includes('&') && parent && parent.type !== 'root') {
      selector = selector.replace('&', parent.selector);
      parent = parent.parent;
    }

    media.source = rule.source;
    rule.selector = selector;
    media.append(rule);
    appended = true;

    return media;
  };

  function isAlreadyNested(rule) {
    let container = rule.parent;

    while (container !== null && container.type !== 'root') {
      if (container.type === 'atrule' && container.params.includes('hover: hover')) {
        return true;
      }

      container = container.parent;
    }

    return false;
  }

  let appended = false;
  let media = null;

  return {
    postcssPlugin: 'postcss-hover-media-feature',

    Once(_root, { AtRule }) {
      media = new AtRule({ name: 'media', params: '(hover: hover)' });
    },

    OnceExit(root) {
      if (appended) {
        root.append(media);
      }
    },

    Rule(rule) {
      if (!rule.selector.includes(':hover') || isAlreadyNested(rule)) {
        return;
      }

      const { hoverSelectors = [], nonHoverSelectors = [] } = selectorProcessor.transformSync(
        rule.selector,
        { lossless: false },
      );

      if (hoverSelectors.length === 0) {
        return;
      }

      appendToMediaQuery(rule.clone({ selectors: hoverSelectors }), {
        parent: rule.parent,
      });

      if (nonHoverSelectors.length > 0) {
        rule.replaceWith(rule.clone({ selectors: nonHoverSelectors }));

        return;
      }

      rule.remove();
    },
  } as Plugin;
};
postcssHoverMediaPlugin.postcss = true;

export default postcssHoverMediaPlugin;
