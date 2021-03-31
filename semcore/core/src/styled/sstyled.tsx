/* eslint-disable */
import cn from 'classnames';
import { ReactNode } from 'react';
export { getStyles } from '@reshadow/core';

const RESHADOW_ID = '__reshadow__';

const isSSR = !(typeof window !== 'undefined' && window.document && window.document.createElement);

const serverMap = getStyles().map;

const getStyles = () => ({
  map: serverMap,
  get css() {
    let serverStyles = '';
    for (const id in serverMap) {
      serverStyles += `<style type="text/css" id="${id}">${serverMap[id]}</style>`;
    }
    return serverStyles;
  },
});

function insert(code, hash) {
  const id = 'reshadow-'.concat(hash);

  if (isSSR) {
    serverMap[id] = code;
    return;
  }

  let container = document.getElementById(RESHADOW_ID);

  if (!container) {
    container = document.createElement('object');
    container.id = RESHADOW_ID;

    if (document.head) {
      document.head.appendChild(container);
    } else {
      document.addEventListener('DOMContentLoaded', function () {
        document.head.appendChild(container);
      });
    }
  }

  let css = document.getElementById(id);

  if (!css) {
    css = document.createElement('style');
    css.id = id;
    // @ts-ignore
    css.type = 'text/css';
    container.appendChild(css);
  }

  css.innerHTML = code;
}

function merge(s1 = {}, s2 = {}) {
  return Object.entries(s2).reduce((acc, [key, value]) => {
    if (key.startsWith('@') || key.startsWith('--')) {
      acc[key] = value;
    } else {
      acc[key] = cn(acc[key], value);
    }
    return acc;
  }, Object.assign({}, s1));
}

function getClassAndVars(styles, name, props) {
  function getPropValue(key, props) {
    return props[`use:${key}`] ?? props[key];
  }
  return Object.entries(styles).reduce(
    (acc, [key, value]) => {
      if (key.startsWith('--')) {
        // @ts-ignore
        acc[1][value] = getPropValue(key.substring(2), props);
      } else if (name === key) {
        // @ts-ignore
        acc[0][value] = true;
      } else {
        const [mod, modValue] = key.split('=');
        const propValue = getPropValue(mod, props);
        if (modValue === undefined) {
          // @ts-ignore
          acc[0][value] = Boolean(propValue ?? false);
        } else {
          // @ts-ignore
          acc[0][value] = propValue == modValue;
        }
      }
      return acc;
    },
    [{}, {}],
  );
}

function sstyled(
  styles = {},
): ((ReactNode) => ReactNode) & {
  cn(name: string, props: any): any;
} {
  // @ts-ignore
  return {
    cn(name, props) {
      const [classes, style] = getClassAndVars(styles, name, props);
      const extraProps = {};

      if (Object.keys(classes).length) {
        // @ts-ignore
        extraProps.className = cn(props.className, classes);
      }

      if (Object.keys(style).length) {
        // @ts-ignore
        extraProps.style = Object.assign(style, props.style);
      }
      return {
        ...props,
        ...extraProps,
      };
    },
  };
}

sstyled.css = function (css): { [key: string]: string } {
  throw new Error('Enable babel plugin');
};
sstyled.insert = insert;
sstyled.merge = merge;
sstyled.getStyles = getStyles;

export { sstyled };
/* eslint-enable */
