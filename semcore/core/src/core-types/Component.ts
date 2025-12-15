import type { ElementRef, AllHTMLAttributes, ForwardRefExoticComponent, RefObject } from 'react';
import React from 'react';

import type { CORE_COMPONENT, PARENT_COMPONENTS } from './symbols';
import type { IStyledProps } from '../styled/index';

export interface IRootComponentProps {
  'forwardRef'?: RefObject<any>;
  'ref'?: RefObject<any>;
  'Children'?: any;
  'children'?: React.ReactNode;
  'styles'?: IStyledProps['styles'];
  'data-ui-name'?: string;
}

export interface IRootNodeProps<T extends Intergalactic.Tag | never> {
  render?: Intergalactic.Tag;
  tag?: T;
}

export type RootResult<T extends Intergalactic.Tag | never> = ForwardRefExoticComponent<IRootNodeProps<T> & Intergalactic.InternalTypings.ComponentPropsNesting<T>>;

/** @deprecated */
export type PropGetterFn = <T extends {}>(props?: T) => T & { [key: string]: unknown };

export function Root<T extends Intergalactic.Tag | never>(): RootResult<T> {
  // @ts-ignore
  return {};
}

type BaseAsProps<Props = {}, Enhance extends readonly ((...args: any[]) => any)[] = [], InnerProps = {}> = Readonly<
  Props &
  IRootComponentProps &
  Intergalactic.InternalTypings.ExtractEnhanceType<Enhance> &
  InnerProps
>;

type ClassPropsExtractor<
  T extends React.PureComponent,
  D extends keyof React.JSX.IntrinsicElements,
> = T extends React.PureComponent<infer P, any>
  ? P & Intergalactic.InternalTypings.EfficientOmit<Intergalactic.InternalTypings.ComponentPropsNesting<ExtendedFromHTMLProps<P, D>>, keyof P> & Partial<IRootNodeProps<any>>
  : never;

export type PropsExtractor<
  C extends FunctionComponent<any> | AbstractComponent<any, any, any, any, any> | AbstractCtor<AbstractComponent<any, any, any, any, any>>,
  D extends keyof React.JSX.IntrinsicElements = 'div',
> = C extends new (...args: any[]) => infer AC
  ? AC extends AbstractComponent<any, any, any, any, any>
    ? PropsExtractor<AC, D>
    : never
  : C extends (...args: infer P) => any
    ? P[0] extends undefined
      ? Intergalactic.InternalTypings.ComponentPropsNesting<D>
      : P[0] & Intergalactic.InternalTypings.EfficientOmit<Intergalactic.InternalTypings.ComponentPropsNesting<ExtendedFromHTMLProps<P[0], D>>, keyof P[0]> & Partial<IRootNodeProps<any>>
    : C extends AbstractComponent<any, any, any, any, any>
      ? ClassPropsExtractor<C, D>
      : never;

export interface AbstractCtor<T extends AbstractComponent<any, any, any, any, any>> {
  new (...args: any[]): T;
  displayName?: string;
  [CORE_COMPONENT]?: boolean;
  [PARENT_COMPONENTS]?: Array<AbstractCtor<AbstractComponent<any, any, any, any, any>> | FunctionComponent<any>>;
  enhance?: T extends AbstractComponent<infer P, any, any, any, any> ? Readonly<Array<(props: P) => any>> : [];
}

export interface FunctionComponent<P = {}> extends React.FunctionComponent<P> {
  [CORE_COMPONENT]?: boolean;
  [PARENT_COMPONENTS]?: Array<AbstractCtor<AbstractComponent<any, any, any, any, any>> | FunctionComponent<any>>;
  enhance?: Readonly<Array<(props: P) => any>>;
}

type ExtendedFromHTMLProps<P, D extends keyof React.JSX.IntrinsicElements> = P extends IRootNodeProps<any>
  ? P['render'] extends | AbstractCtor<AbstractComponent<any, any, any, any, any>> | FunctionComponent<any>
    ? P['render']
    : P['tag'] extends keyof React.JSX.IntrinsicAttributes | AbstractCtor<AbstractComponent<any, any, any, any, any>> | FunctionComponent<any>
      ? P['tag']
      : D
  : D;

export abstract class AbstractComponent<
  Props = {},
  Enhance extends readonly ((...args: any[]) => any)[] = [],
  Uncontrolled extends Readonly<{ [key in keyof Props]?: Props[key] | null | ((value: Props[key], e?: any) => void | boolean | Props[key]) | ((value: Props[key], e?: any) => void | boolean | Props[key])[] }> = never,
  InnerProps = {},
  State = {},
> extends React.PureComponent<Props, State> {
  protected uncontrolledProps(): [Uncontrolled] extends [never] ? never : Uncontrolled {
    // @ts-ignore. This is a default value. Should be defined in related classes.
    return;
  };

  protected get handlers(): Readonly<{
    [key in keyof Uncontrolled]: key extends keyof Props
      ? Uncontrolled[key] extends (null | Props[key])
        ? (value: Props[key], e?: any) => void
        : Uncontrolled[key] extends Array<any> ? Uncontrolled[key][0] : Uncontrolled[key]
      : never
  }> {
    // @ts-ignore. The body will be generated in factory
    return;
  }

  protected get asProps() {
    return {} as Readonly<
      { Root: RootResult<any> } &
      BaseAsProps<Props, Enhance, InnerProps> &
      Intergalactic.InternalTypings.EfficientOmit<AllHTMLAttributes<any>, keyof BaseAsProps<Props, Enhance, InnerProps>>
    >;
  }

  protected Root: RootResult<any> = undefined as any;

  protected isControlled = false;

  // protected [CORE_COMPONENT] = true;
  // protected [PARENT_COMPONENTS]: Array<AbstractCtor<AbstractComponent<any, any, any, any, any>> | FunctionComponent<any>> = [];
}

export type ChildMapLastLevelValue = AbstractCtor<AbstractComponent<any, any, any, any, any>> | FunctionComponent<any>;

export type ChildMapValue = Readonly<Record<string, ChildMapLastLevelValue | [ChildMapLastLevelValue, ChildMapValue]>>;

export type IntergalacticComponent<
  Tag extends keyof React.JSX.IntrinsicElements,
  Ctor extends AbstractCtor<AbstractComponent<any, any, any, any, any>> | FunctionComponent<any>,
  ChildMap extends ChildMapValue,
  ContextType,
> = (React.FC<React.PropsWithChildren<Intergalactic.InternalTypings.EfficientOmit<PropsExtractor<Ctor, Tag>, keyof IRootComponentProps>> & { ref?: React.LegacyRef<ElementRef<Tag>> }>) & {
  [key in keyof ChildMap]: ChildMap[key] extends ChildMapLastLevelValue
    ? IntergalacticComponent<'div', ChildMap[key], Readonly<{}>, ContextType>
    : ChildMap[key] extends [infer Parent, infer Ch]
      ? Parent extends ChildMapLastLevelValue
        ? Ch extends ChildMapValue
          ? IntergalacticComponent<'div', Parent, Ch, ContextType>
          : never
        : never
      : never;
  //   ? Parent extends new (...args: any[]) => infer C
  //   ? C extends AbstractComponent<any, any, any, any, any>
  //     // eslint-disable-next-line @stylistic/indent-binary-ops
  //     ? Intergalactic.Component<'div', ChildProps<PropsExtractor<C>, OriginCtor, key>, ContextType> & {
  //       [key in keyof Ch]: Ch[key] extends new (...args: any[]) => infer C
  //         ? C extends AbstractComponent<any, any, any, any, any>
  //           ? Intergalactic.Component<'div', ChildProps<PropsExtractor<C>, OriginCtor, key>, ContextType>
  //           : never
  //         : Ch[key] extends FunctionComponent<any>
  //           ? Intergalactic.Component<'div', ChildProps<PropsExtractor<Ch[key]>, OriginCtor, key>, ContextType>
  //           : never
  //     }
  //     : never
  //   : Parent extends FunctionComponent<any>
  //   // eslint-disable-next-line @stylistic/indent-binary-ops
  //     ? Intergalactic.Component<'div', ChildProps<PropsExtractor<Parent>, OriginCtor, key>, ContextType> & {
  //       [key in keyof Ch]: Ch[key] extends new (...args: any[]) => infer C
  //         ? C extends AbstractComponent<any, any, any, any, any>
  //           ? Intergalactic.Component<'div', ChildProps<PropsExtractor<C>, OriginCtor, key>, ContextType>
  //           : never
  //         : Ch[key] extends FunctionComponent<any>
  //           ? Intergalactic.Component<'div', ChildProps<PropsExtractor<Ch[key]>, OriginCtor, key>, ContextType>
  //           : never
  //     }
  //     : never
  // : IntergalacticComponent<'div', ChildMap[key], {}, ContextType>;
  // extends AbstractCtor<AbstractComponent<any, any, any, any, any>>
  //     ? Intergalactic.Component<'div', ChildProps<PropsExtractor<ChildMap[key]>, OriginCtor, key>, ContextType>
  //     : ChildMap[key] extends FunctionComponent<any>
  //       ? Intergalactic.Component<'div', ChildProps<PropsExtractor<ChildMap[key]>, OriginCtor, key>, ContextType>
  //       : never;
};

type ChildProps<P, OriginCtor extends AbstractCtor<AbstractComponent<any, any, any, any, any>> | FunctionComponent<any>, K> = OriginCtor extends new (...args: any[]) => infer C
  ? C extends AbstractComponent<any, any, any, any, any> ? OptionalizeIfIn<P, K extends keyof MapChildrenPropsGetters<C> ? MapChildrenPropsGetters<C>[K] & IRootComponentProps : IRootComponentProps> : never
  : OriginCtor extends FunctionComponent<any>
    ? OptionalizeIfIn<P, IRootComponentProps>
    : never;

type MapChildrenPropsGetters<T extends AbstractComponent<any, any, any, any, any>> = {
  [K in keyof T as K extends `get${infer Rest}Props`
    ? Rest extends ''
      ? never
      : Rest
    : never
  ]: T[K] extends (...args: any[]) => infer R
    ? R
    : {};
};

type OptionalizeIfIn<T, U> = {
  [P in keyof T as P extends keyof U ? never : P]: T[P]
} & {
  [P in keyof T as P extends keyof U ? P : never]?: T[P]
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Intergalactic {
  type ReactFCProps<C extends React.FC> = C extends React.FC<infer Props> ? Omit<Props, 'tag'> : {};
  type ReactComponentProps<C extends React.ComponentClass> = C extends React.ComponentClass<
    infer Props
  >
    ? Omit<Props, 'tag'>
    : never;
  type ReactFCLike = (props: any) => any;
  type ReactFCLikeProps<C extends ReactFCLike> = C extends (props: infer Props) => any ? Props : {};
  type ComponentChildren<
    Props,
    Context,
    RenderingResult = InternalTypings.ReturnResult,
    AdditionalContext extends any[] = never[],
  > =
    | ((props: MergeProps<Context, Props>, ...args: AdditionalContext) => RenderingResult)
    | InternalTypings.ReturnResult;
  type ComponentBasicProps<Tag extends InternalTypings.ComponentTag> = {
    ref?: React.Ref<InternalTypings.ComponentHtmlElement<Tag> | null>;
    /** @private DO NOT USE IT. Low-level api that prevents specified props from being applied as DOM attribute. */
    __excludeProps?: string[];
  };
  type MergeProps<HighPriorityProps, LowPriorityProps> = {
    [K in keyof LowPriorityProps]: K extends keyof HighPriorityProps
      ? HighPriorityProps[K]
      : LowPriorityProps[K];
  } & HighPriorityProps;
  /** @private */
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace InternalTypings {
    export type EfficientOmit<Type, Keys> = {
      [Property in keyof Type as Exclude<Property, Keys>]: Type[Property];
    };
    export type ExtractEnhanceType<F extends readonly ((...args: any[]) => any)[]> =
      F['length'] extends 0
        ? {}
        : F['length'] extends 1
          ? {
              [K in keyof ReturnType<F[0]>]: ReturnType<F[0]>[K];
            }
          : F['length'] extends 2
            // eslint-disable-next-line @stylistic/indent-binary-ops
            ? {
              [K in keyof ReturnType<F[0]>]: ReturnType<F[0]>[K];
            } & {
              [K in keyof ReturnType<F[1]>]: ReturnType<F[1]>[K];
            }
            : F['length'] extends 3
              // eslint-disable-next-line @stylistic/indent-binary-ops
              ? {
                [K in keyof ReturnType<F[0]>]: ReturnType<F[0]>[K];
              } & {
                [K in keyof ReturnType<F[1]>]: ReturnType<F[1]>[K];
              } & {
                [K in keyof ReturnType<F[2]>]: ReturnType<F[2]>[K];
              }
              : F['length'] extends 4
                // eslint-disable-next-line @stylistic/indent-binary-ops
                ? {
                  [K in keyof ReturnType<F[0]>]: ReturnType<F[0]>[K];
                } & {
                  [K in keyof ReturnType<F[1]>]: ReturnType<F[1]>[K];
                } & {
                  [K in keyof ReturnType<F[2]>]: ReturnType<F[2]>[K];
                } & {
                  [K in keyof ReturnType<F[3]>]: ReturnType<F[3]>[K];
                }
                : {};
    export type ComponentPropsNesting<Tag extends InternalTypings.ComponentTag> = EfficientOmit<
      MergeProps<
        Tag extends React.FC
          ? ReactFCProps<Tag>
          : Tag extends React.ComponentClass
            ? ReactComponentProps<Tag>
            : Tag extends ReactFCLike
              ? ReactFCLikeProps<Tag>
              : Tag extends keyof React.JSX.IntrinsicElements
                ? React.JSX.IntrinsicElements[Tag]
                : {},
        Tag extends { __nestedProps: infer NestedProps } ? NestedProps : {}
      >,
      'children' | 'tag'
    >;
    export type ReturnResult =
      | React.ReactElement
      | React.ReactNode
      | React.ReactNode[]
      | string
      | null;
    export type ComponentTag =
      | keyof React.JSX.IntrinsicElements
      | AbstractCtor<AbstractComponent<any, any, any, any, any>>
      | FunctionComponent
      | ReactFCLike;
    export type ComponentProps<
      Tag extends ComponentTag | [ComponentTag, keyof JSX.IntrinsicElements],
      BaseTag extends ComponentTag | never,
      Props,
      Context = never,
      AdditionalContext extends any[] = never[],
    > = {
      tag?: Tag;
      children?: ComponentChildren<
        EfficientOmit<Props, 'children'> & { children: React.ReactNode },
        Context,
        ReturnResult,
        AdditionalContext
      >;
    } & ComponentBasicProps<Tag extends [ComponentTag, keyof JSX.IntrinsicElements] ? Tag[0] : Tag> &
    MergeProps<
      EfficientOmit<Props, 'tag' | 'children'>,
      MergeProps<ComponentPropsNesting<Tag extends [ComponentTag, keyof JSX.IntrinsicElements] ? Tag[0] : Tag>, ComponentPropsNesting<BaseTag>>
    >;
    export type PropsRenderingResultComponentProps<
      Tag extends ComponentTag,
      Props,
      Context = {},
      AdditionalContext extends any[] = never[],
    > = {
      tag?: Tag;
      children?: ComponentChildren<
        EfficientOmit<Props, 'children'> & { children: React.ReactNode },
        Context,
        Partial<
          EfficientOmit<
            MergeProps<Props, ComponentPropsNesting<Tag>>,
            'children' | 'tag' | 'ref'
          > & {
            children?: React.ReactNode;
          }
        >,
        AdditionalContext
      >;
    } & ComponentBasicProps<Tag> &
    MergeProps<EfficientOmit<Props, 'tag' | 'children'>, ComponentPropsNesting<Tag>>;
    export type ComponentRenderingResults = React.ReactElement;
    export type ComponentAdditive<
      BaseTag extends ComponentTag,
      Tag extends ComponentTag,
      Props = {},
      Context = {},
      AdditionalContext = {},
    > = {
      __nestedProps: ComponentPropsNesting<BaseTag>;
      __tag: Tag;
      __props: Props;
      __context: Context;
      __additionalContext: AdditionalContext;
      displayName: string;
      newInstance: () => Component<BaseTag, Props, Context>;
      [CORE_COMPONENT]: boolean;
      defaultProps?: object;
    };
    export type InferJsxIntrinsicElement<T extends React.DetailedHTMLProps<any, any>> =
      T extends React.DetailedHTMLProps<infer _, infer Element> ? Element : HTMLElement;
    type InferElementFromRef<T> = T extends React.Ref<infer Element> ? Element : never;
    type InferRefElementFromProps<T> = 'ref' extends keyof T
      ? InferElementFromRef<T['ref']>
      : HTMLElement;
    export type ComponentHtmlElement<Tag extends ComponentTag> =
      Tag extends keyof React.JSX.IntrinsicElements
        ? InferJsxIntrinsicElement<React.JSX.IntrinsicElements[Tag]>
        : Tag extends { __nestedProps: infer NestedProps }
          ? InferRefElementFromProps<NestedProps>
          : HTMLElement;
    export type UntypeRefAndTag<Props> = Intergalactic.InternalTypings.EfficientOmit<
      Props,
      'ref' | 'tag'
    > & {
      ref: React.Ref<any>;
      tag: Intergalactic.InternalTypings.ComponentTag;
    };
  }
  export type Component<
    BaseTag extends InternalTypings.ComponentTag = never,
    BaseProps = {},
    Context = {},
    AdditionalContext extends any[] = never[],
  > = (<Tag extends InternalTypings.ComponentTag | [InternalTypings.ComponentTag, keyof JSX.IntrinsicElements] = BaseTag, Props extends BaseProps = BaseProps>(
    props: InternalTypings.ComponentProps<Tag, BaseTag, Props, Context, AdditionalContext>,
  ) => InternalTypings.ComponentRenderingResults) &
  InternalTypings.ComponentAdditive<BaseTag, Tag, BaseProps, Context, AdditionalContext>;
  export type Tag = InternalTypings.ComponentTag;
  export type DomProps<Tag extends keyof React.JSX.IntrinsicElements> =
    InternalTypings.InferJsxIntrinsicElement<React.JSX.IntrinsicElements[Tag]>;
  export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
    T,
    Exclude<keyof T, Keys>
  > &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];
}

export const wrapIntergalacticComponent = <
  Component extends Intergalactic.Component<any, any, any, any>,
  PropsExtending = {},
>(
  wrapper: (
    props: Intergalactic.InternalTypings.UntypeRefAndTag<
      Intergalactic.InternalTypings.ComponentPropsNesting<Component>
    > &
    PropsExtending,
  ) => React.ReactNode,
): Intergalactic.Component<
  Component['__tag'],
  Component['__props'] & Component['__nestedProps'] & PropsExtending,
  Component['__context'],
  Component['__additionalContext']
> => wrapper as any;

// type PropsAndRef<T, Ctx, UCProps> = PropsWithRenderFnChildren<T, Ctx, UCProps> &
//   RefAttributes<unknown>;
//
// export type ForwardRefComponent<T, Ctx, UCProps> = ForwardRefExoticComponent<
//   PropsAndRef<T, Ctx, UCProps>
// >;
// type ComponentOrProps<T, Context, UCProps> = T extends [infer ParentProps, infer ChildProps]
//   ? ComponentType<ParentProps, ChildProps, Context, UCProps>
//   : ForwardRefComponent<T, Context, UCProps>;
//
// export type ComponentType<
//   ComponentProps,
//   ChildComponentProps = {},
//   ContextType = {},
//   UCProps = {},
//   FNType = null,
// > = (FNType extends null
//   ? ForwardRefComponent<ComponentProps, ContextType, UCProps>
//   : FNType & { displayName: string }) & {
//     [K in keyof ChildComponentProps]: ComponentOrProps<ChildComponentProps[K], ContextType, UCProps>;
//   } & {
//     [CORE_COMPONENT]: boolean;
//     [CREATE_COMPONENT]: () => ComponentType<
//       ComponentProps,
//       ChildComponentProps,
//       ContextType,
//       UCProps
//     >;
//   };
