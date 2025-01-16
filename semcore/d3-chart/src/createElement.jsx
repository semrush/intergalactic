import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { createComponent, createBaseComponent, CONTEXT_COMPONENT } from '@semcore/core';
import assignProps from '@semcore/core/lib/utils/assignProps';
import { useForkRef } from '@semcore/core/lib/utils/ref';
import propsForElement from '@semcore/core/lib/utils/propsForElement';
import getOriginChildren from '@semcore/core/lib/utils/getOriginChildren';
import Plot from './Plot';

const EXCLUDE_PROPS = ['data', 'scale'];

function createElementRender() {
  const Element = React.forwardRef(function (
    { render, childrenPosition = 'below', x: xS, y: yS, ...source },
    ref,
  ) {
    const {
      forwardRef = null,

      children: _children,
      Children,
      x = xS,
      y = yS,
      ...props
    } = Element.props;
    let children = getOriginChildren(Children);

    let mergedProps = assignProps(
      {
        x: xS,
        y: yS,
        ...props,
        ref: useForkRef(forwardRef, ref),
      },
      {
        x,
        y,
        ...source,
      },
    );

    if (typeof children === 'function') {
      const _child = mergedProps.children;
      mergedProps = assignProps(children(mergedProps), mergedProps);
      children = mergedProps.children;
      mergedProps.children = _child;
    }

    const Tag = typeof render === 'string' ? mergedProps.tag || render : render;

    if (childrenPosition === 'inside') {
      mergedProps.children = children === undefined ? mergedProps.children : children;
    }

    if (!Tag) {
      throw new Error('Element expected render prop to be passed');
    }
    return [
      <React.Fragment key='child-above'>
        {childrenPosition === 'above' ? children : null}
      </React.Fragment>,
      <Tag
        aria-hidden
        {...propsForElement(
          {
            __excludeProps: EXCLUDE_PROPS,
            ...mergedProps,
          },
          Tag,
        )}
        key='element'
      />,
      <React.Fragment key='child-below'>
        {childrenPosition === 'below' ? children : null}
      </React.Fragment>,
    ];
  });

  Element.props = {};
  return Element;
}

function elementEnhancement() {
  return {
    init: function () {
      this.Element = createElementRender();
    },
    asProps: function ({ $rootProps, ...props }, WrapperComponent, isFunction) {
      if (isFunction) {
        return {
          ...$rootProps,
          ...props,
          Element: this.Element,
        };
      }
      return {
        ...$rootProps,
        ...props,
      };
    },
    render: function (render, props) {
      this.Element.props = props;
      return render;
    },
  };
}

function WrapComponent(Element) {
  function ElementWithContext(props, ref) {
    const { $rootProps } = React.useContext(Plot[CONTEXT_COMPONENT]);
    return <Element ref={ref} $rootProps={$rootProps} {...props} />;
  }

  ElementWithContext.displayName = Element.displayName;

  const WrapperComponent = createBaseComponent(ElementWithContext);
  WrapperComponent.displayName = Element.displayName;

  return hoistNonReactStatics(WrapperComponent, Element);
}

function createElement(ElementRoot, child = {}, options = {}) {
  const Element = createComponent(ElementRoot, child, {
    ...options,
    enhancements: [elementEnhancement],
  });

  Object.keys(child).forEach((n) => {
    Element[n] = WrapComponent(Element[n]);
  });

  return WrapComponent(Element);
}

export default createElement;
