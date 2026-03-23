import hoistNonReactStatics from 'hoist-non-react-statics';
import React from 'react';

import { type Intergalactic, Component } from './core-types/Component';
import {
  CONTEXT_COMPONENT,
  CORE_AS_PROPS,
  CORE_COMPONENT,
  CORE_INIT,
  CORE_INSTANCE,
  CREATE_COMPONENT,
  PARENT_COMPONENTS,
} from './core-types/symbols';
import childrenEnhancement from './enhancement/Children';
import dataNameEnhancement from './enhancement/dataName';
import enhanceEnhancement from './enhancement/enhance';
import functionDefaultPropsEnhancement from './enhancement/functionDefaultProps';
import i18nAppLocaleEnhance from './enhancement/i18n';
import inheritedNameEnhancement from './enhancement/inheritedName';
import rootEnhancement from './enhancement/Root';
import staticChildrenEnhancement, {
  getterMethodNameByDisplayName,
  ROOT_COMPONENT,
  STATIC_COMPONENT,
} from './enhancement/staticChildren';
import styleEnhancement from './enhancement/style';
import uncontrolledPropsEnhancement from './enhancement/uncontrolledProps';
import _assignProps from './utils/assignProps';
import { useForkRef } from './utils/ref';
import useEnhancedEffect from './utils/use/useEnhancedEffect';

function isEmptyObject(obj: any) {
  return (
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols && // For IE 11
    Object.getOwnPropertySymbols(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
}

function createGetField(enhancements: any, Component: any, isFunction: boolean) {
  return function getField(key: string) {
    return enhancements
      .filter((enhancement: any) => {
        if (!enhancement.condition) {
          return true;
        }
        return enhancement.condition(Component, isFunction);
      })
      .reduce((acc: any, item: any) => {
        if (item[key]) {
          acc.push(item[key]);
        }
        return acc;
      }, []);
  };
}

function createForwardWrapper(Component: any, wrapperProps: any, statics: any, isFunction: any) {
  const RootComponent = Component[ROOT_COMPONENT];
  const getterMethodName = getterMethodNameByDisplayName(Component?.displayName);
  const getterMethod = RootComponent?.prototype
    ? RootComponent.prototype[getterMethodName]
    : undefined;
  const useGetterIndex = getterMethod?.length >= 2;

  function WrapperForwardRefWithBind({ forwardRef = null, ...other }, ref: any) {
    return <BindingWrapper {...other} forwardRef={useForkRef(ref, forwardRef)} />;
  }

  function WrapperForwardRef(
    { forwardRef = null, __WRAPPER_PROPS_BIND__, ...other }: any,
    ref: any,
  ) {
    const { ref: enhancementRef = null, ...props } = (
      __WRAPPER_PROPS_BIND__ || wrapperProps
    ).reduce((acc: any, enhancement: any) => enhancement(acc, WrapperComponent, isFunction), other);
    return <Component {...props} forwardRef={useForkRef(enhancementRef, ref, forwardRef)} />;
  }

  class BindingWrapper extends React.Component<any> {
    index = -1;
    render() {
      return (
        <WrapperForwardRef
          {...this.props}
          __WRAPPER_PROPS_BIND__={wrapperProps.map((fn: any) => fn.bind(this))}
        />
      );
    }
  }

  const WrapperComponent = React.forwardRef(
    useGetterIndex ? WrapperForwardRefWithBind : WrapperForwardRef,
  );

  hoistNonReactStatics(WrapperComponent, Component);

  WrapperComponent.displayName = Component.displayName;
  // TODO: defaultProps is only empty
  WrapperComponent.defaultProps = Component.defaultProps;
  // STATIC
  statics.forEach((enhancement: any) =>
    Object.assign(WrapperComponent, enhancement(WrapperComponent, Component, isFunction)),
  );

  return WrapperComponent;
}

function wrapClass(OriginComponent: any, enhancements: any, Context: any) {
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

    constructor(props: any, context: any) {
      super(props, context);
      // INITS
      inits.forEach((enhancement: any) => enhancement.call(this, props, WrapperComponent, false));
      this[CORE_INIT] = true;
    }

    get asProps() {
      // TODO if not production
      if (!this[CORE_INIT]) {
        throw new Error('Can not call asProps in constructor');
      }
      if (!this[CORE_AS_PROPS]) {
        // PROPS
        this[CORE_AS_PROPS] = props.reduce((acc: any, enhancement: any) => {
          return enhancement.call(this, acc, WrapperComponent, false);
        }, this.props);

        if (this[CORE_AS_PROPS] !== null) {
          const prefixesMap = new Map<string, Record<string, unknown>>();
          Object.entries(this[CORE_AS_PROPS]).forEach(([key, value]) => {
            const [prefix, propertyKey] = key.split(':');
            if (prefix !== 'use' && propertyKey) {
              const obj = prefixesMap.get(prefix) ?? {};
              obj[propertyKey] = value;

              prefixesMap.set(prefix, obj);
            }
          });

          for (const [key, value] of prefixesMap.entries()) {
            if (!Object.hasOwn(this[CORE_AS_PROPS], `${key}Props`) || this[CORE_AS_PROPS][`${key}Props`] === undefined) {
              Object.defineProperty(this[CORE_AS_PROPS], `${key}Props`, { value });
            }
          }
        }
      }
      return this[CORE_AS_PROPS];
    }

    setContext() {
      const contextProps = super.setContext ? super.setContext() : {};
      // CONTEXT
      return contexts.reduce(
        (acc: any, enhancement: any) => enhancement.call(this, acc, WrapperComponent, false),
        contextProps,
      );
    }

    render() {
      this[CORE_AS_PROPS] = null;
      // TODO if not production
      if (!super.render) {
        throw new Error('Component `render` method is not defined');
      }
      const asProps: any = this.asProps;
      const ctx = this.setContext();
      // RENDER
      const render = renders.reduce(
        (acc: any, enhancement: any) =>
          enhancement.call(this, acc, asProps, WrapperComponent, false),
        super.render(),
      );
      if (!WrapperComponent[STATIC_COMPONENT] && !isEmptyObject(ctx)) {
        return <Context.Provider value={{ ...asProps, ...ctx }}>{render}</Context.Provider>;
      } else {
        return render;
      }
    }
  }

  const WrapperComponent: any = createForwardWrapper(Component, wrapperProps, statics, false);
  return WrapperComponent;
}

function wrapFunction(OriginComponent: any, enhancements: any, Context: any) {
  const getField = createGetField(enhancements, OriginComponent, true);

  const inits = getField('init');
  const props = getField('asProps');
  const renders = getField('render');
  const statics = getField('static');
  const wrapperProps = getField('wrapperProps');
  const contexts = getField('context');

  const Component = React.memo(function FunctionMemoComponent(other) {
    const selfRef = React.useRef({});
    const firstRender = React.useRef(true);
    useEnhancedEffect(() => {
      firstRender.current = false;
    }, []);
    if (firstRender.current) {
      // INITS
      inits.forEach((enhancement: any) =>
        enhancement.call(selfRef.current, other, WrapperComponent, true),
      );
    }
    // PROPS
    const asProps = props.reduce(
      (acc: any, enhancement: any) =>
        enhancement.call(selfRef.current, acc, WrapperComponent, true),
      other,
    );
    // CONTEXT
    const ctx = contexts.reduce(
      (acc: any, enhancement: any) =>
        enhancement.call(selfRef.current, acc, WrapperComponent, true),
      {},
    );

    // RENDER
    const render = renders.reduce(
      (acc: any, enhancement: any) =>
        enhancement.call(selfRef.current, acc, asProps, WrapperComponent, true),
      <OriginComponent {...asProps} />,
    );

    if (!WrapperComponent[STATIC_COMPONENT] && !isEmptyObject(ctx)) {
      return <Context.Provider value={{ ...asProps, ...ctx }}>{render}</Context.Provider>;
    } else {
      return render;
    }
  });
  Object.assign(Component, OriginComponent);
  const WrapperComponent: any = createForwardWrapper(Component, wrapperProps, statics, true);
  return WrapperComponent;
}

function wrapCore(OriginComponent: any, enhancements: any, Context: any) {
  const Component = function ({ Root }: any) {
    const defaultProps = OriginComponent.defaultProps || {};
    return <Root {...defaultProps} render={OriginComponent} />;
  };
  hoistNonReactStatics(Component, OriginComponent);
  Component.displayName = OriginComponent.displayName;
  return wrapFunction(Component, enhancements, Context);
}

function createComposeComponent(OriginComponent: any, Context: any, enhancements: any): any {
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

export function assignProps(p1: any, p2: any) {
  return _assignProps(p2, p1);
}

function createComponent<T extends Intergalactic.InternalTypings.ComponentTag = 'div', ComponentProps = {}, ContextType = {}, E extends Readonly<any[]> = never[]>(
  OriginComponent: any,
  childComponents: any = {},
  options: {
    context?: React.Context<ContextType>;
    parent?: Intergalactic.Component<any, any, any, any> | Intergalactic.Component<any, any, any, any>[];
    enhancements?: [any];
  } = {},
): Intergalactic.Component<T, ComponentProps, ContextType, E> {
  const {
    context = React.createContext<ContextType>({} as ContextType),
    parent = [],
    enhancements = [],
  } = options;
  let parents: any[] = Array.isArray(parent) ? parent : [parent];
  if (parents.length) {
    const wholeFamily = parents.reduce((acc: any, parent: any) => {
      if (parent[PARENT_COMPONENTS]) {
        acc = [...parent[PARENT_COMPONENTS], ...acc];
      }
      return acc;
    }, parents);
    // @ts-ignore
    OriginComponent[PARENT_COMPONENTS] = wholeFamily;
    parents = wholeFamily;
  }
  // @ts-ignore
  if (OriginComponent[CORE_COMPONENT]) {
    parents.push(OriginComponent);
  }
  const Component = createComposeComponent(OriginComponent, context, [
    // @ts-ignore
    ...enhancements.map((f) => f(context, parents, createComponent, childComponents)),
    i18nAppLocaleEnhance(),
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
  ]);
  Component[CONTEXT_COMPONENT] = context;
  Component._______childrenComponents = childComponents;
  Component[CREATE_COMPONENT] = function (
    _OriginComponent = OriginComponent,
    _childComponents = childComponents,
    _options = options,
  ) {
    return createComponent(_OriginComponent, _childComponents, _options);
  };
  Component.newInstance = function (
          _OriginComponent = OriginComponent,
          _childComponents = childComponents,
          _options = options,
  ) {
    return createComponent(_OriginComponent, _childComponents, _options);
  };
  Component[CORE_COMPONENT] = true;
  return Component;
}

function createBaseComponent<T extends keyof React.JSX.IntrinsicElements, P>(OriginComponent: React.ForwardRefRenderFunction<React.ElementRef<T>, P>) {
  const Component = React.forwardRef<React.ElementRef<T>, P>(OriginComponent) as unknown as Intergalactic.Component<T, P>;
  Component.displayName = OriginComponent.displayName ?? '';
  // @ts-ignore
  Component.defaultProps = {
    'data-ui-name': OriginComponent.displayName,
  };
  Component[CORE_COMPONENT] = true;

  return Component;
}

export { createComponent, createBaseComponent };
