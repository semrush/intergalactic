import cn from 'classnames';
import type React from 'react';

/** @ts-ignore */
import { getStyles as reshadowGetStyles } from './reshadow-core';
import { validAttr } from '../utils/propsForElement';

const RESHADOW_ID = '__reshadow__';

const isSSR = !(typeof window !== 'undefined' && window.document && window.document.createElement);

const serverMap = reshadowGetStyles().map as any;

const getStyles = () => ({
  map: serverMap,
  get css() {
    let serverStyles = '';
    for (const id in serverMap) {
      serverStyles += `<style type='text/css' id='${id}'>${serverMap[id]}</style>`;
    }
    return serverStyles;
  },
});

function insert(code: any, hash: any) {
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
        document.head.appendChild(container as any);
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
  return Object.entries(s2).reduce((acc: any, [key, value]: any) => {
    if (key.startsWith('@') || key.startsWith('--')) {
      acc[key] = value;
    } else {
      acc[key] = cn(acc[key], value);
    }
    return acc;
  }, Object.assign({}, s1));
}

function getClassAndVars(styles: [key: string, value: unknown][], name: any, props: any) {
  function getPropValue(key: any, props: any) {
    return props[`use:${key}`] ?? props[key];
  }

  return styles.reduce(
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

const reshadowMap = new WeakMap();

function reshadowToShadow(obj: any) {
  if (reshadowMap.has(obj)) {
    return reshadowMap.get(obj);
  }

  const shadowStyle = Object.entries(obj).reduce((style: any, [name, value]) => {
    let n = name;
    if (name.startsWith('__')) {
      n = name.replace(/^__/, '');
    } else if (name.startsWith('_')) {
      n = name.replace(/^_/, '').replace('_', '=');
    }
    style[n] = value;
    return style;
  }, {});

  reshadowMap.set(obj, shadowStyle);

  return shadowStyle;
}

function sstyled(styles = {}): ((ReactNode: any) => React.ReactNode) & {
  cn(name: string, props: any): any;
} {
  // @ts-ignore
  return {
    cn(name, props) {
      const shadowStyles = Object.entries(reshadowToShadow(styles));
      const [classes, style] = getClassAndVars(shadowStyles, name, props);

      if (Object.keys(classes).length) {
        props.className = cn(props.className, classes);
      }

      if (Object.keys(style).length) {
        props.style = Object.assign(style, props.style);
      }

      shadowStyles.forEach(([key]) => {
        if (!key.startsWith('--')) {
          const compareKey = key.split('=')[0];

          if (!validAttr(compareKey)) {
            delete props[compareKey];
          }
        }
      });

      return props;
    },
  };
}

sstyled.css = function (_css: any): { [key: string]: string } {
  throw new Error('Enable babel plugin');
};
sstyled.insert = insert;
sstyled.merge = merge;
sstyled.getStyles = getStyles;
sstyled.SHADOW_STYLES = Symbol('SHADOW_STYLES');

export { sstyled };
