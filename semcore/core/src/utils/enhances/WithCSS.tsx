import React, { PureComponent } from 'react';
import { NanoOptions } from '@phytonmk/nano-css';
import { CssLikeObject } from '@phytonmk/nano-css/types/common';
import createHoc from '../createHoc';
import CSSinJS from '../CSSinJS';
import { UnknownProperties } from '../../core-types/UnknownProperties';

const getStylesheet = () => CSSinJS().raw;

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

/** @deprecated */
export interface IEnhancedWithCSSProps extends EnhancedWithCSSProps, UnknownProperties {}
export type EnhancedWithCSSProps = {
  className?: string;
  css?: {};

  children(props: { className: string | undefined }): React.ReactNode;
};

class EnhancedWithCSS extends PureComponent<IEnhancedWithCSSProps> {
  static contextType = WithCssContext;

  static defaultProps = {
    css: {},
  };

  state = {
    dynamicClassName: '',
  };

  static getDerivedStateFromProps(props: any) {
    const cleanCss = normaliseCss(props.css);
    return {
      dynamicClassName: Object.keys(cleanCss).length ? CSSinJS().cache?.(cleanCss) : '',
    };
  }

  constructor(props: any, context: any) {
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
