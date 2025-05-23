import React from 'react';
import { CssLikeObject } from '@phytonmk/nano-css/types/common';
import { initNanoCss, normaliseCss, WithCssContext } from '../enhances/WithCSS';

export type IUseCssArg = CssLikeObject;

const useCss = (css: IUseCssArg = {}) => {
  const nanoOptions = React.useContext(WithCssContext);
  const nano = initNanoCss(nanoOptions);
  const cleanCss = normaliseCss(css);
  return Object.keys(cleanCss).length ? nano.cache?.(cleanCss) : '';
};

export default useCss;
