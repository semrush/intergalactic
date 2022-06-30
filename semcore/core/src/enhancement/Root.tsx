import React from 'react';
// @ts-ignore
import assignProps from '@semcore/utils/lib/assignProps';
// @ts-ignore
import { useForkRef } from '@semcore/utils/lib/ref';

function createRootRender() {
  // @ts-ignore
  const Root = React.forwardRef(function ({ render: Tag, ...source }, ref) {
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Root: _Root,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      styles,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      children,
      Children,
      forwardRef = null,
      ...props
      // @ts-ignore
    } = Root.props;

    const clearProps = Object.entries(props).reduce((props, [name, value]) => {
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
    return <Tag {...other} />;
  });
  // @ts-ignore
  Root.props = {};
  return Root;
}

function Enhancement() {
  return {
    init: function () {
      this.Root = createRootRender();
    },
    asProps: function (props, WrapperComponent, isFunction) {
      if (isFunction) {
        return {
          ...props,
          Root: this.Root,
        };
      }
      return props;
    },
    render: function (render, props) {
      this.Root.props = props;
      return render;
    },
  };
}

export default Enhancement;
