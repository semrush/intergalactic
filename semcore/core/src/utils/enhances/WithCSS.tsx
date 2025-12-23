import type { NanoOptions } from '@phytonmk/nano-css';
import type { CssLikeObject } from '@phytonmk/nano-css/types/common';
import React from 'react';

import CSSinJS from '../CSSinJS';

/**
 * Function to clear the nano CSS styles object from keys with undefined value
 * @param {Object} obj - nano CSS styles object
 * @returns {Object}
 */
function normaliseCss(obj: CssLikeObject) {
  return Object.keys(obj).reduce((acc: any, key) => {
    const result = acc;
    if (obj[key] !== undefined) {
      result[key] = obj[key];
    }
    return result;
  }, {});
}

const WithCssContext = React.createContext<NanoOptions>({});
const { Provider } = WithCssContext;

function initNanoCss(options: NanoOptions = {}) {
  return CSSinJS(options);
}

export { Provider, WithCssContext, initNanoCss, normaliseCss };
