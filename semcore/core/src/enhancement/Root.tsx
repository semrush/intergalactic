import React from 'react';
import assignProps from '../utils/assignProps';
import { useForkRef } from '../utils/ref';

function createRootRender() {
  // @ts-ignore
  const Root = React.forwardRef(function ({ render: Tag, ...source }, ref) {
    const {
      Root: _Root,

      styles,

      children,
      Children,
      forwardRef = null,
      ...props
      // @ts-ignore
    } = Root.props;

    const clearProps = Object.entries(props).reduce((props: any, [name, value]) => {
      if (value !== undefined) {
        props[name] = value;
      }
      return props;
    }, {});

    const child = {};
    // TODO: need to find better check solution (by lsroman)
    if (typeof Children.origin !== 'undefined') {
      // @ts-ignore
      child.children = <Children />;
    }

    const other = assignProps(
      {
        ...clearProps,
        ref: useForkRef(forwardRef, ref),
      },
      {
        ...child,
        ...source,
      },
    );
    if (!Tag) {
      throw new Error('`render` prop of Root is not provided');
    }
    if (Tag === React.Fragment) return <React.Fragment>{other.children}</React.Fragment>;

    return <Tag {...other} />;
  });
  // @ts-ignore
  Root.props = {};
  return Root;
}

function Enhancement() {
  return {
    init: function (this: any) {
      this.Root = createRootRender();
    },
    asProps: function (this: any, props: any, WrapperComponent: any, isFunction: boolean) {
      if (isFunction) {
        return {
          ...props,
          Root: this.Root,
        };
      }
      return props;
    },
    render: function (this: any, render: any, props: any) {
      this.Root.props = props;
      return render;
    },
  };
}

export default Enhancement;
