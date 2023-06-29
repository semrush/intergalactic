import { useContext, useState } from 'react';
// @ts-ignore
import assignProps from '@semcore/utils/lib/assignProps';
// @ts-ignore
import useEnhancedEffect from '@semcore/utils/lib/use/useEnhancedEffect';
// @ts-ignore
import pick from '@semcore/utils/lib/pick';

export const HOIST_CONTEXT = Symbol('HOIST_CONTEXT');
const HOIST_SELF = Symbol('HOIST_SELF');
const HOIST_SET = Symbol('HOIST_SET');

function flatChildComponent(childComponents) {
  return Object.values(childComponents).reduce<unknown[]>((acc, Component) => {
    if (Array.isArray(Component)) {
      acc = [...acc, Component[0], ...flatChildComponent(Component[1])];
    } else {
      acc.push(Component);
    }
    return acc;
  }, []);
}

function Enhancement(childComponents, Context) {
  return {
    condition: function (Component) {
      return [Component, ...flatChildComponent(childComponents)].some((Component) =>
        Boolean(Component.hoistProps?.length),
      );
    },
    init: function (props, WrapperComponent, isFunction) {
      if (isFunction) {
        // TODO: might breake rules of hooks (by lsroman)
        this[HOIST_SELF] = useState({});
      } else {
        this[HOIST_SELF] = [
          {},
          (obj) => {
            this[HOIST_SELF][0] = obj;
            this.forceUpdate();
          },
        ];
      }
      // For optimization render
      this[HOIST_SET] = (obj) => {
        this[HOIST_SELF][1](obj);
      };
    },
    context: function (context) {
      // TODO: need to optimizte container initialization (by lsroman)
      // WrapperComponent.hoistProps
      return {
        ...context,
        [HOIST_CONTEXT]: this[HOIST_SET],
      };
    },
    asProps: function (props) {
      // TODO: need to check for no props overwriting (by lsroman)
      return assignProps(this[HOIST_SELF][0], props);
    },
    wrapperProps: function (props, WrapperComponent) {
      if (WrapperComponent.hoistProps?.length) {
        const context = useContext(Context);
        const renameProps = WrapperComponent.hoistProps.reduce((acc, propName) => {
          const [name, rename] = propName.split(':');
          acc[name] = rename || name;
          return acc;
        }, {});
        const hoistProps = Object.entries(pick(props, Object.keys(renameProps))).reduce(
          (acc, [name, value]) => {
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
