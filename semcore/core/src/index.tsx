import React, { ForwardRefExoticComponent, RefAttributes, useRef } from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
// @ts-ignore
import { useForkRef } from '@semcore/utils/lib/ref';
// @ts-ignore
import useEnhancedEffect from '@semcore/utils/lib/use/useEnhancedEffect';
// @ts-ignore
import _assignProps from '@semcore/utils/lib/assignProps';

import Component, { PropsWithRenderFnChildren } from './Component';
import register from './register';

import childrenEnhancement, { CHILDREN_COMPONENT } from './enhancement/Children';
import rootEnhancement from './enhancement/Root';
import uncontrolledPropsEnhancement from './enhancement/uncontrolledProps';
import functionDefaultPropsEnhancement from './enhancement/functionDefaultProps';
import staticChildrenEnhancement, { STATIC_COMPONENT } from './enhancement/staticChildren';
import inheritedNameEnhancement, { INHERITED_NAME } from './enhancement/inheritedName';
import hoistPropsEnhancement from './enhancement/hoistProps';
import dataNameEnhancement from './enhancement/dataName';
import enhanceEnhancement from './enhancement/enhance';
import styleEnhancement from './enhancement/style';
import bindHandlerEnhancement from './enhancement/bindHandler';

const CORE_COMPONENT = Symbol('CORE_COMPONENT');
const CORE_INSTANCE = Symbol('CORE_INSTANCE');
const CORE_AS_PROPS = Symbol('CORE_AS_PROPS');
const CORE_INIT = Symbol('CORE_INIT');
const CONTEXT_COMPONENT = Symbol('CONTEXT_COMPONENT');
const CREATE_COMPONENT = Symbol('CREATE_COMPONENT');
const PARENT_COMPONENTS = Symbol('PARENT_COMPONENTS');

function isEmptyObject(obj) {
  return (
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols && // For IE 11
    Object.getOwnPropertySymbols(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

function createGetField(enhancements, Component, isFunction) {
  return function getField(key) {
    return enhancements
      .filter((enhancement) => {
        if (!enhancement.condition) {
          return true;
        }
        return enhancement.condition(Component, isFunction);
      })
      .reduce((acc, item) => {
        if (item[key]) {
          acc.push(item[key]);
        }
        return acc;
      }, []);
  };
}

function createForwardWrapper(Component, wrapperProps, statics, isFunction) {
  // @ts-ignore
  const WrapperComponent = React.forwardRef(function ({ forwardRef = null, ...other }, ref) {
    // WRAPPER PROPS
    const { ref: enhancementRef = null, ...props } = wrapperProps.reduce(
      (acc, enhancement) => enhancement(acc, WrapperComponent, isFunction),
      other,
    );
    // @ts-ignore
    return <Component {...props} forwardRef={useForkRef(enhancementRef, ref, forwardRef)} />;
  });

  hoistNonReactStatics(WrapperComponent, Component);

  WrapperComponent.displayName = Component.displayName;
  // TODO: defaultProps is only empty
  WrapperComponent.defaultProps = Component.defaultProps;
  // STATIC
  statics.forEach((enhancement) =>
    Object.assign(WrapperComponent, enhancement(WrapperComponent, isFunction)),
  );

  return WrapperComponent;
}

function wrapClass(OriginComponent, enhancements, Context) {
  const getField = createGetField(enhancements, OriginComponent, false);

  const inits = getField('init');
  const props = getField('asProps');
  const renders = getField('render');
  const statics = getField('static');
  const wrapperProps = getField('wrapperProps');
  const contexts = getField('context');

  class Component extends OriginComponent {
    [CORE_AS_PROPS] = null;
    [CORE_INSTANCE] = WrapperComponent;
    [CORE_INIT] = false;

    constructor(props, context) {
      super(props, context);
      // INITS
      inits.forEach((enhancement) => enhancement.call(this, props, WrapperComponent, false));
      this[CORE_INIT] = true;
    }

    get asProps() {
      // TODO if not production
      if (!this[CORE_INIT]) {
        throw new Error('Can not call asProps in constructor');
      }
      if (!this[CORE_AS_PROPS]) {
        // PROPS
        this[CORE_AS_PROPS] = props.reduce(
          (acc, enhancement) => enhancement.call(this, acc, WrapperComponent, false),
          this.props,
        );
      }
      return this[CORE_AS_PROPS];
    }

    setContext() {
      const contextProps = super.setContext ? super.setContext() : {};
      // CONTEXT
      return contexts.reduce(
        (acc, enhancement) => enhancement.call(this, acc, WrapperComponent, false),
        contextProps,
      );
    }

    render() {
      this[CORE_AS_PROPS] = null;
      // TODO if not production
      if (!super.render) {
        throw new Error('нужно определить render метод');
      }
      const asProps = this.asProps;
      const ctx = this.setContext();
      // RENDER
      const render = renders.reduce(
        (acc, enhancement) => enhancement.call(this, acc, asProps, WrapperComponent, false),
        super.render(),
      );
      if (!WrapperComponent[STATIC_COMPONENT] && !isEmptyObject(ctx)) {
        return <Context.Provider value={{ ...asProps, ...ctx }}>{render}</Context.Provider>;
      } else {
        return render;
      }
    }
  }

  const WrapperComponent = createForwardWrapper(Component, wrapperProps, statics, false);
  return WrapperComponent;
}

function wrapFunction(OriginComponent, enhancements, Context) {
  const getField = createGetField(enhancements, OriginComponent, true);

  const inits = getField('init');
  const props = getField('asProps');
  const renders = getField('render');
  const statics = getField('static');
  const wrapperProps = getField('wrapperProps');
  const contexts = getField('context');

  const Component = React.memo(function FunctionMemoComponent(other) {
    const selfRef = useRef({});
    const firstRender = useRef(true);
    useEnhancedEffect(() => {
      firstRender.current = false;
    }, []);
    if (firstRender.current) {
      // INITS
      inits.forEach((enhancement) =>
        enhancement.call(selfRef.current, other, WrapperComponent, true),
      );
    }
    // PROPS
    const asProps = props.reduce(
      (acc, enhancement) => enhancement.call(selfRef.current, acc, WrapperComponent, true),
      other,
    );
    // CONTEXT
    const ctx = contexts.reduce(
      (acc, enhancement) => enhancement.call(selfRef.current, acc, WrapperComponent, true),
      {},
    );

    // RENDER
    const render = renders.reduce(
      (acc, enhancement) => enhancement.call(selfRef.current, acc, asProps, WrapperComponent, true),
      <OriginComponent {...asProps} />,
    );

    if (!WrapperComponent[STATIC_COMPONENT] && !isEmptyObject(ctx)) {
      return <Context.Provider value={{ ...asProps, ...ctx }}>{render}</Context.Provider>;
    } else {
      return render;
    }
  });
  Object.assign(Component, OriginComponent);
  const WrapperComponent = createForwardWrapper(Component, wrapperProps, statics, true);
  return WrapperComponent;
}

function wrapCore(OriginComponent, enhancements, Context) {
  const Component = function ({ Root }) {
    return <Root render={OriginComponent} />;
  };
  hoistNonReactStatics(Component, OriginComponent);
  Component.displayName = OriginComponent.displayName;
  Component.defaultProps = OriginComponent.defaultProps;
  return wrapFunction(Component, enhancements, Context);
}

function createComposeComponent(OriginComponent, Context, enhancements): any {
  if (
    React.PureComponent.isPrototypeOf(OriginComponent) ||
    React.Component.isPrototypeOf(OriginComponent)
  ) {
    if (OriginComponent.prototype instanceof Component) {
      return wrapClass(OriginComponent, enhancements, Context);
    } else {
      throw new Error('Must inherit from our component');
    }
  } else if (typeof OriginComponent === 'function') {
    return wrapFunction(OriginComponent, enhancements, Context);
  } else if (OriginComponent[CORE_COMPONENT]) {
    return wrapCore(OriginComponent, enhancements, Context);
  } else {
    throw new Error('Must be a React component');
  }
}

export type PropsAndRef<T, Ctx, UCProps> = PropsWithRenderFnChildren<T, Ctx, UCProps> &
  RefAttributes<unknown>;
export type ForwardRefComponent<T, Ctx, UCProps> = ForwardRefExoticComponent<
  PropsAndRef<T, Ctx, UCProps>
>;
type ComponentOrProps<T, Context, UCProps> = T extends [infer ParentProps, infer ChildProps]
  ? ComponentType<ParentProps, ChildProps, Context, UCProps>
  : ForwardRefComponent<T, Context, UCProps>;

export type ComponentType<
  ComponentProps,
  ChildComponentProps = {},
  ContextType = {},
  UCProps = {},
  FNType = null
> = (FNType extends null
  ? ForwardRefComponent<ComponentProps, ContextType, UCProps>
  : FNType & { displayName: string }) &
  {
    [K in keyof ChildComponentProps]: ComponentOrProps<
      ChildComponentProps[K],
      ContextType,
      UCProps
    >;
  } & {
    [CORE_COMPONENT]: boolean;
    [CREATE_COMPONENT]: () => ComponentType<
      ComponentProps,
      ChildComponentProps,
      ContextType,
      UCProps
    >;
  };

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ClassWithUncontrolledProps<Props> {
  uncontrolledProps(): unknown;
}

function assignProps(p1, p2) {
  return _assignProps(p2, p1);
}

function createComponent<ComponentProps, ChildComponentProps = {}, ContextType = {}, FNType = null>(
  OriginComponent,
  childComponents = {},
  options: {
    context?: React.Context<ContextType>;
    parent?: ComponentType<unknown> | ComponentType<unknown>[];
    enhancements?: [any];
  } = {},
): ComponentType<
  ComponentProps extends Component<infer Props> ? Props : ComponentProps,
  ChildComponentProps,
  ContextType,
  ComponentProps extends ClassWithUncontrolledProps<any>
    ? ReturnType<ComponentProps['uncontrolledProps']>
    : { [key: string]: (arg: unknown) => void },
  FNType
> {
  const {
    context = React.createContext<ContextType>({} as ContextType),
    parent = [],
    enhancements = [],
  } = options;
  let parents = Array.isArray(parent) ? parent : [parent];
  if (parents.length) {
    const wholeFamily = parents.reduce((acc, parent) => {
      if (parent[PARENT_COMPONENTS]) {
        acc = [...parent[PARENT_COMPONENTS], ...acc];
      }
      return acc;
    }, parents);
    OriginComponent[PARENT_COMPONENTS] = wholeFamily;
    parents = wholeFamily;
  }
  if (OriginComponent[CORE_COMPONENT]) {
    parents.push(OriginComponent);
  }
  const Component = createComposeComponent(OriginComponent, context, [
    // @ts-ignore
    ...enhancements.map((f) => f(context, parents, createComponent, childComponents)),
    bindHandlerEnhancement(),
    childrenEnhancement(context, parents),
    // root must be under the children
    rootEnhancement(),
    uncontrolledPropsEnhancement(),
    staticChildrenEnhancement(childComponents, createComponent, {
      context,
      parent,
      enhancements,
    }),
    // functionDefaultProps must be under the staticChild
    functionDefaultPropsEnhancement(),
    // inheritedName must be under the staticChild
    inheritedNameEnhancement(),
    // dataName must be under the staticChild
    dataNameEnhancement(),
    // enhanceEnhancement must be under the functionDefaultPropsEnhancement
    enhanceEnhancement(),
    styleEnhancement(childComponents, context),
    // must be the last one so any properties can be raised
    hoistPropsEnhancement(childComponents, context),
  ]);
  Component[CONTEXT_COMPONENT] = context;
  Component[CREATE_COMPONENT] = function (
    _OriginComponent = OriginComponent,
    _childComponents = childComponents,
    _options = options,
  ) {
    return createComponent(_OriginComponent, _childComponents, _options);
  };
  Component[CORE_COMPONENT] = true;
  return Component;
}

function createBaseComponent<ComponentProps>(OriginComponent): ComponentType<ComponentProps> {
  let Component = null;
  if (
    !React.PureComponent.isPrototypeOf(OriginComponent) &&
    !React.Component.isPrototypeOf(OriginComponent) &&
    typeof OriginComponent === 'function'
  ) {
    Component = React.forwardRef(OriginComponent);
    Component.displayName = OriginComponent.displayName;
    Component.defaultProps = {
      'data-ui-name': OriginComponent.displayName,
      ...OriginComponent.defaultProps,
    };
    Component[CORE_COMPONENT] = true;
  } else {
    throw new Error('createBaseComponent accepts only functional component');
  }
  return Component;
}

export * from './Component';
export * from './styled';
export * from './register';
export {
  createBaseComponent,
  Component,
  register,
  CREATE_COMPONENT,
  CORE_INSTANCE,
  CONTEXT_COMPONENT,
  CHILDREN_COMPONENT,
  INHERITED_NAME,
  CORE_COMPONENT,
  STATIC_COMPONENT,
  assignProps,
};
export default createComponent;
