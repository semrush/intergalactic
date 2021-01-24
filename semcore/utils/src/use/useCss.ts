/* eslint-disable */
import { useContext } from 'react';
import { CssLikeObject } from 'nano-css/types/common';
import { initNanoCss, normaliseCss, WithCssContext } from '../enhances/WithCSS';

export type IUseCssArg = CssLikeObject;

const useCss = (css: IUseCssArg = {}) => {
  const nanoOptions = useContext(WithCssContext);
  const nano = initNanoCss(nanoOptions);
  const cleanCss = normaliseCss(css);
  return Object.keys(cleanCss).length ? nano.cache(cleanCss) : '';
};

export default useCss;
