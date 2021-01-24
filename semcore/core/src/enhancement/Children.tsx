import { useContext } from 'react';
import { CONTEXT_COMPONENT } from '../index';

export const CHILDREN_COMPONENT = Symbol('CHILDREN_COMPONENT');
const CHILDREN_SELF = Symbol('CHILDREN_SELF');

const GETTER_REG = /^get[\w]+Props$/;

function splitPropsAndGetters(props) {
  return Object.entries(props).reduce(
    (acc, [key, value]) => {
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

function getterToArray(getter) {
  if (!Array.isArray(getter)) {
    return typeof getter === 'function' ? [getter] : [];
  }
  return getter;
}

function mergeObjects(a = {}, b = {}) {
  const core = { ...a, ...b };
  return Object.keys(core).reduce((acc, key) => {
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

function createChildren(Context, contexts) {
  const Children = function () {
    const children = Children.origin;
    if (typeof children === 'function') {
      const { handlers = {}, getters = {}, ...props } = [...contexts, Context].reduce(
        (acc, ctx) => {
          const { handlers, ...propsAndGetters } = useContext(ctx);
          const { props, getters } = splitPropsAndGetters(propsAndGetters);
          return Object.assign({}, acc, {
            handlers: Object.assign({}, acc.handlers, handlers),
            getters: mergeObjects(acc.getters, getters),
            ...props,
          });
        },
        Children.props,
      );

      const mergedGetters = Object.entries(getters).reduce((acc, [key, value]) => {
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

function Enhancement(Context, parent) {
  return {
    init: function () {
      const contexts = (Array.isArray(parent) ? parent : [parent])
        .map((component) => component[CONTEXT_COMPONENT])
        .filter(Boolean);
      this[CHILDREN_SELF] = createChildren(Context, contexts);
    },
    asProps: function (props) {
      // TODO: разобраться зачем это надо было
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
