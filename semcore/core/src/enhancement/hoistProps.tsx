import React from 'react';
import assignProps from '../utils/assignProps';
import useEnhancedEffect from '../utils/use/useEnhancedEffect';
import pick from '../utils/pick';

export const HOIST_CONTEXT = Symbol('HOIST_CONTEXT');
const HOIST_SELF = Symbol('HOIST_SELF');
const HOIST_SET = Symbol('HOIST_SET');

function flatChildComponent(childComponents: any) {
  return Object.values(childComponents).reduce<unknown[]>((acc, Component) => {
    if (Array.isArray(Component)) {
      acc.push(Component[0]);
      acc.push(...flatChildComponent(Component[1]));
    } else {
      acc.push(Component);
    }
    return acc;
  }, []);
}

/** @deprecated Doesn't work in ssr and sometimes breakes rulles of hooks. We should never use it. */
function Enhancement(childComponents: any, Context: any) {
  return {
    condition: function (Component: any) {
      return [Component, ...flatChildComponent(childComponents)].some((Component) =>
        Boolean(Component.hoistProps?.length),
      );
    },
    init: function (this: any, props: any, WrapperComponent: any, isFunction: boolean) {
      if (isFunction) {
        // TODO: might breake rules of hooks (by lsroman)
        this[HOIST_SELF] = React.useState({});
      } else {
        this[HOIST_SELF] = [
          {},
          (obj: any) => {
            this[HOIST_SELF][0] = obj;
            this.forceUpdate();
          },
        ];
      }
      // For optimization render
      this[HOIST_SET] = (obj: any) => {
        this[HOIST_SELF][1](obj);
      };
    },
    context: function (this: any, context: any) {
      // TODO: need to optimizte container initialization (by lsroman)
      // WrapperComponent.hoistProps
      return {
        ...context,
        [HOIST_CONTEXT]: this[HOIST_SET],
      };
    },
    asProps: function (this: any, props: any) {
      // TODO: need to check for no props overwriting (by lsroman)
      return assignProps(this[HOIST_SELF][0], props);
    },
    wrapperProps: function (props: any, WrapperComponent: any) {
      if (WrapperComponent.hoistProps?.length) {
        const context: any = React.useContext(Context);
        const renameProps: any = WrapperComponent.hoistProps.reduce((acc: any, propName: any) => {
          const [name, rename] = propName.split(':');
          acc[name] = rename || name;
          return acc;
        }, {});
        const hoistProps = Object.entries(pick(props, Object.keys(renameProps))).reduce(
          (acc: any, [name, value]) => {
            acc[renameProps[name]] = value;
            return acc;
          },
          {},
        );

        useEnhancedEffect(() => {
          if (context[HOIST_CONTEXT]) {
            context[HOIST_CONTEXT](hoistProps);
          }
        }, Object.values(hoistProps));
      }
      return props;
    },
  };
}

export default Enhancement;
