import React from 'react';
import { sstyled } from '../styled/index';
import { STATIC_COMPONENT } from './staticChildren';

export const STYLES_CONTEXT = Symbol('STYLES_CONTEXT');
const STYLES_SELF = Symbol('STYLES_SELF');

function Enhancement(childComponents: any, Context: any) {
  return {
    condition: function (Component: any) {
      return Boolean(Component.style || Component[STATIC_COMPONENT]);
    },
    init: function (this: any, props: any, WrapperComponent: any) {
      if (props.styles) {
        this[STYLES_SELF] = props.styles;
      }
      if (WrapperComponent.style) {
        this[STYLES_SELF] = sstyled.merge(WrapperComponent.style, props._styles);
      }
    },
    context: function (this: any, context: any): any {
      // Optimization: if has no children there is no need to create new context (by lsroman)
      if (!this[STYLES_SELF] || !Object.keys(childComponents).length) {
        return context;
      }
      return {
        ...context,
        [STYLES_CONTEXT]: this[STYLES_SELF],
      };
    },

    asProps: function (this: any, { _styles, styles, ...props }: any) {
      return {
        ...props,
        styles: this[STYLES_SELF],
      };
    },
    wrapperProps: function (this: any, { styles, ...props }: any) {
      const context: any = React.useContext(Context);
      return {
        ...props,
        _styles: styles,
        styles: context[STYLES_CONTEXT],
      };
    },
  };
}

export default Enhancement;
