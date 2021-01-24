/* eslint-disable */
import React, { PureComponent } from 'react';
import { NanoOptions } from 'nano-css';
import { CssLikeObject } from 'nano-css/types/common';
import createHoc from '../createHoc';
import CSSinJS from '../CSSinJS';

const getStylesheet = () => CSSinJS().raw;

/**
 * Ф-ция очистки обьекта стилей nanoCSS от ключей со значнение undefined
 * @param {Object} obj - обьект стилей nanoCSS
 * @returns {Object}
 */
function normaliseCss(obj: CssLikeObject) {
  return Object.keys(obj).reduce((acc, key) => {
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

export interface IEnhancedWithCSSProps {
  className?: string;
  css?: {};

  children(props: { className: string }): React.ReactNode;
}

class EnhancedWithCSS extends PureComponent<IEnhancedWithCSSProps> {
  static contextType = WithCssContext;

  static defaultProps = {
    css: {},
  };

  state = {
    dynamicClassName: '',
  };

  static getDerivedStateFromProps(props) {
    const cleanCss = normaliseCss(props.css);
    return {
      dynamicClassName: Object.keys(cleanCss).length ? CSSinJS().cache(cleanCss) : '',
    };
  }

  constructor(props, context) {
    super(props, context);

    initNanoCss(context);
  }

  render() {
    const { children, className = '' } = this.props;
    const { dynamicClassName } = this.state;
    return children({
      className: className + dynamicClassName || undefined,
    });
  }
}

export { getStylesheet, EnhancedWithCSS, Provider, WithCssContext, initNanoCss, normaliseCss };
export default createHoc(EnhancedWithCSS);
