import React from 'react';
import { CONTEXT_COMPONENT, CHILDREN_COMPONENT } from '../core-types/symbols';

const CHILDREN_SELF = Symbol('CHILDREN_SELF');

const GETTER_REG = /^get[\w]+Props$/;

function splitPropsAndGetters(props: any) {
  return Object.entries(props).reduce(
    (acc: any, [key, value]) => {
      if (GETTER_REG.exec(key) === null) {
        acc.props[key] = value;
      } else {
        acc.getters[key] = value;
      }
      return acc;
    },
    { props: {}, getters: {} },
  );
}

function getterToArray(getter: any) {
  if (!Array.isArray(getter)) {
    return typeof getter === 'function' ? [getter] : [];
  }
  return getter;
}

function mergeObjects(a: any = {}, b: any = {}) {
  const core = { ...a, ...b };
  return Object.keys(core).reduce((acc: any, key) => {
    a[key] = getterToArray(a[key]);
    b[key] = getterToArray(b[key]);
    acc[key] = [...a[key], ...b[key]];
    return acc;
  }, {});
}

function assignGettersChain(getters: Array<Function>) {
  return function (props = {}) {
    return getters.reduce((acc, getter) => {
      return getter(acc);
    }, props);
  };
}

function createChildren(Context: any, contexts: any) {
  const Children: any = function () {
    const children = Children.origin;
    if (typeof children === 'function') {
      const {
        handlers = {},
        getters = {},
        ...props
      } = [...contexts, Context].reduce((acc, ctx) => {
        const { handlers, ...propsAndGetters } = React.useContext(ctx) as any;
        const { props, getters } = splitPropsAndGetters(propsAndGetters);
        return Object.assign({}, acc, {
          handlers: Object.assign({}, acc.handlers, handlers),
          getters: mergeObjects(acc.getters, getters),
          ...props,
        });
      }, Children.props);

      const mergedGetters = Object.entries(getters).reduce((acc: any, [key, value]) => {
        acc[key] = assignGettersChain(value as []);
        return acc;
      }, {});

      return children({ ...props, ...mergedGetters }, handlers);
    } else if (children === undefined) {
      return null;
    }
    return children;
  };
  Children.origin = null;
  Children.props = {};
  Children[CHILDREN_COMPONENT] = true;
  return Children;
}

function Enhancement(this: any, Context: any, parent: any) {
  return {
    init: function (this: any) {
      const contexts = (Array.isArray(parent) ? parent : [parent])
        .map((component) => component[CONTEXT_COMPONENT])
        .filter(Boolean);
      this[CHILDREN_SELF] = createChildren(Context, contexts);
    },
    asProps: function (this: any, props: any) {
      // TODO: learn the reason what it was used for (by lsroman)
      // this[CHILDREN_SELF].origin = _Children ? _Children.origin : children;
      this[CHILDREN_SELF].origin = props.children;
      this[CHILDREN_SELF].props = props;
      return {
        ...props,
        Children: this[CHILDREN_SELF],
      };
    },
  };
}

export default Enhancement;
