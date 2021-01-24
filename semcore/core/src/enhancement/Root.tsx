import React from 'react';
import assignProps from '@semcore/utils/lib/assignProps';
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
    // TODO: разобраться как то иначе
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
      throw new Error('В Root нужно передать render');
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
