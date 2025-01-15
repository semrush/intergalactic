import React from 'react';
import assignProps from '../utils/assignProps';
import pick from '../utils/pick';
import logger from '../utils/logger';

function assign(target: any, source: any) {
  return Object.defineProperties(
    target,
    Object.keys(source).reduce((descriptors: any, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {}),
  );
}

export function getterMethodName(name: string) {
  return `get${name}Props`;
}

export function getterMethodNameByDisplayName(displayName = '') {
  const displayNames = displayName.split('.');
  const name = displayNames.slice(-(displayNames.length - 1)).join('');
  return getterMethodName(name);
}

function flatGetterMethodNames(childComponents: any, parentName?: string) {
  return Object.entries(childComponents).reduce<string[]>((acc, [name, value]) => {
    if (Array.isArray(value)) {
      acc.push(...flatGetterMethodNames(value[1], name));
    }
    name = parentName ? `${parentName}${name}` : name;
    acc.push(getterMethodName(name));
    return acc;
  }, []);
}

export const STATIC_COMPONENT = Symbol('STATIC_COMPONENT');
export const ROOT_COMPONENT = Symbol('ROOT_COMPONENT');
const SELF_GETTER_METHOD = Symbol('SELF_GETTER_METHOD');

function Enhancement(childComponents: any, createComponent: any, options: any) {
  const getterMethodNames = flatGetterMethodNames(childComponents);
  return {
    condition: function (Component: any) {
      return Boolean(Component[STATIC_COMPONENT] || Object.keys(childComponents).length);
    },
    init: function (this: any, props: any, WrapperComponent: any) {
      const getterMethods: any = pick(this, getterMethodNames);
      this[SELF_GETTER_METHOD] = () => {
        const selfGetterMethod = getterMethodNameByDisplayName(WrapperComponent.displayName);
        logger.warn(
          true,
          `Getter \`${selfGetterMethod}\` can't be fired as it is a getter of static component`,
          props['data-ui-name'] || WrapperComponent.displayName,
        );
      };
      assign(
        this,
        getterMethodNames.reduce((acc: any, name) => {
          const getterMethod = getterMethods[name];
          if (!getterMethod) return acc;
          acc[name] = (childrenProps = {}) => {
            const getterProps = getterMethod.call(this, childrenProps, acc[name].index);
            return assignProps(childrenProps, getterProps);
          };
          acc[name].index = -1;
          acc[name].cache = new Set();
          return acc;
        }, {}),
      );
    },
    static: function (WrapperComponent: any, Component: any) {
      if (Object.keys(childComponents).length && !WrapperComponent.displayName) {
        throw new Error('"displayName" is not defined');
      }
      return Object.entries(childComponents).reduce((acc: any, [name, value]: any) => {
        let childComponents = {};

        if (Array.isArray(value)) {
          childComponents = value[1];
          value = value[0];
        }

        const prevStaticComponent = value[STATIC_COMPONENT];
        // @ts-ignore
        const prevDisplayName = value.displayName;
        // @ts-ignore
        value.displayName = `${WrapperComponent.displayName}.${name}`;
        value[STATIC_COMPONENT] = true;
        value[ROOT_COMPONENT] = Component[ROOT_COMPONENT] || Component;
        acc[name] = createComponent(value, childComponents, options);
        // @ts-ignore
        value.displayName = prevDisplayName;
        value[STATIC_COMPONENT] = prevStaticComponent;
        return acc;
      }, {});
    },
    context: function (context: any /*, WrapperComponent*/) {
      // const getterMethod = getterMethodNameByDisplayName(WrapperComponent.displayName);
      return {
        ...context,
        // [getterMethod]: this[SELF_GETTER_METHOD],
        ...pick(this, getterMethodNames as any),
      };
    },
    wrapperProps: function (this: any, props: any, WrapperComponent: any) {
      if (!WrapperComponent[STATIC_COMPONENT]) return props;
      const context: any = React.useContext(options.context);
      const getterMethod = context[getterMethodNameByDisplayName(WrapperComponent.displayName)];
      if (getterMethod) {
        if (!getterMethod.cache.has(this)) {
          getterMethod.cache.add(this);
          getterMethod.index++;
          if (this) this.index = getterMethod.index;
        }
        if (this) getterMethod.index = this.index;
        return getterMethod(props);
      }
      return props;
    },
    render: function (this: any, render: any) {
      getterMethodNames.forEach((name) => {
        if (this[name] === undefined) return;
        this[name].index = -1;
        this[name].cache.clear();
      });
      return render;
    },
  };
}

export default Enhancement;
