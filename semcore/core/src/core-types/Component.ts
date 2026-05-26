import type React from 'react';
import { type
AllHTMLAttributes, type
ForwardRefExoticComponent,
PureComponent, type
ReactNode, type
RefObject,
} from 'react';

import type { CORE_COMPONENT } from './symbols';
import { CORE_INSTANCE } from './symbols';
import type { IStyledProps } from '../styled/index';

type HandlersType<UCProps> = { [K in keyof UCProps]?: <T = unknown>(arg: T) => void };

export interface IRootComponentProps<Props = {}, Ctx = {}, H = {}> {
  'forwardRef'?: RefObject<any>;
  'Children'?: any;
  'children'?: ReactNode | ((props: Props & Ctx, handlers: HandlersType<H>) => ReactNode);
  'styles'?: IStyledProps['styles'];
  'data-ui-name'?: string;
}

export interface IRootNodeProps {
  render: React.ElementType | string;
  tag?: React.ElementType | string;

  [key: string]: any;
}

type Root = ForwardRefExoticComponent<IRootNodeProps>;

/** @deprecated */
export type PropGetterFn = <T extends {}>(props?: T) => T & { [key: string]: unknown };

const Root: Root = undefined as any;

export { Root };

type RootResult<T extends Intergalactic.Tag | never> = ForwardRefExoticComponent<IRootNodeProps & Intergalactic.InternalTypings.ComponentPropsNesting<T>>;

type BaseAsProps<Props = {}, Enhance extends readonly ((...args: any[]) => any)[] = [], InnerProps = {}> = Readonly<
  Props &
  IRootComponentProps &
  Intergalactic.InternalTypings.ExtractEnhanceType<Enhance> &
  InnerProps
>;

type UncontrolledPropValue<V> =
  | V
  | null
  | ((value: V, e?: any) => void | boolean | V)
  | ((value: V, e?: any) => void | boolean | V)[]
  | ((e?: any) => void | boolean | V);

export interface IComponent<
  C,
  /*
  * Infered this way since `Props` within `Component` abstract class
  * is used in multiple places in different variance positions
  * causing the final type to be `never`.
  * */
  P = C extends { props: Readonly<infer P> } ? P : never,
  DP = C extends Component<any, any, any, any, any, infer DP> ?
    DP extends never
      ? never
      : DP
    : never,
> {
  new (...args: any[]): C;
  defaultProps?: DP | ((props: P) => DP) | (() => DP);
}
export abstract class Component<
  Props = {},
  Enhance extends readonly ((...args: any[]) => any)[] = [],
  Uncontrolled extends Readonly<{ [key in keyof Props]?: UncontrolledPropValue<Props[key]> }> = never,
  InnerProps = {},
  State = {},
  DefaultProps extends Intergalactic.InternalTypings.ValidDefaultProps<DefaultProps, Props & InnerProps> = never,
> extends PureComponent<Props, State> {
  protected __defaultProps: DefaultProps = {} as DefaultProps;

  protected uncontrolledProps(): [Uncontrolled] extends [never] ? never : Uncontrolled {
    // @ts-ignore. This is a default value. Should be defined in related classes.
    return {};
  }

  protected get handlers(): Readonly<{
    [key in keyof Uncontrolled]: key extends keyof Props
      ? Uncontrolled[key] extends null | Props[key]
        ? (value: Props[key], e?: any) => void
        : Uncontrolled[key] extends Array<any>
          ? Uncontrolled[key][0]
          : Uncontrolled[key]
      : never;
  }> {
    // @ts-ignore. The body will be generated in factory
    return {};
  }

  protected get asProps() {
    return {} as Readonly<
      { Root: RootResult<any> } & BaseAsProps<Props, Enhance, InnerProps> &
      Intergalactic.InternalTypings.EfficientOmit<
        AllHTMLAttributes<any>,
        keyof BaseAsProps<Props, Enhance, InnerProps>
      > &
      ([DefaultProps] extends [never] ? {} : Intergalactic.InternalTypings.MappedDefaultProps<DefaultProps, Props & InnerProps>)
    >;
  }

  protected Root: RootResult<any> = undefined as any;

  protected isControlled = false;

  protected [CORE_INSTANCE]: any;
}

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
    AdditionalContext extends Readonly<any[]> = never[],
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
    type StripDefaultPrefix<K> = K extends `default${infer Rest}` ? Uncapitalize<Rest> : K;

    export type ValidDefaultProps<DefaultProps, MergedProps> = {
      [K in keyof DefaultProps]: K extends keyof MergedProps
        ? MergedProps[K]
        : StripDefaultPrefix<K> extends keyof MergedProps
          ? MergedProps[StripDefaultPrefix<K>]
          : never;
    };

    export type MappedDefaultProps<DefaultProps, MergedProps> = {
      [K in keyof DefaultProps as StripDefaultPrefix<K>]: K extends keyof MergedProps
        ? Required<MergedProps>[K]
        : StripDefaultPrefix<K> extends keyof MergedProps
          ? Required<MergedProps>[StripDefaultPrefix<K>]
          : never;
    };

    type MergeChildProps<Root, Component> = {
      [K in keyof Root | keyof Component]:
      K extends keyof Root
        ? K extends keyof Component
          ? Root[K] & Component[K] extends never
            ? Root[K] | Component[K]
            : Root[K] & Component[K]
          : Root[K]
        : K extends keyof Component
          ? Component[K]
          : never
    };

    type InferPropsFromRoot<
      Root extends new (...args: any) => any,
      Child extends string,
    > = InstanceType<Root>[`get${Child}Props`] extends (...args: any[]) => infer R ? R : Record<string, never>;

    export type InferComponentProps<
      Component extends ReactFCLike,
    > = Omit<IRootComponentProps & ReactFCLikeProps<Component>, 'tag'>;

    export type InferChildComponentProps<
      Component extends ReactFCLike,
      Root extends new (...args: any) => any,
      ChildName extends string,
      MergedProps = MergeChildProps<InferPropsFromRoot<Root, ChildName>, InferComponentProps<Component>>,
    > = MergedProps & IStyledProps;

    export type PartialRequired<T, K extends keyof T> = Omit<T, K> & {
      [key in K]-?: T[key];
    };
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
    export type ComponentPropsNesting<Tag extends InternalTypings.ComponentTag> = Omit<
      MergeProps<
        Tag extends React.FC
          ? ReactFCProps<Tag>
          : Tag extends React.ComponentClass
            ? ReactComponentProps<Tag>
            : Tag extends ReactFCLike
              ? ReactFCLikeProps<Tag>
              : Tag extends keyof JSX.IntrinsicElements
                ? JSX.IntrinsicElements[Tag]
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
      | keyof JSX.IntrinsicElements
      | React.ComponentClass
      | React.FC
      | ReactFCLike;
    export type ComponentProps<
      Tag extends ComponentTag | [ComponentTag, keyof JSX.IntrinsicElements],
      BaseTag extends ComponentTag | never,
      Props,
      Context = never,
      AdditionalContext extends Readonly<any[]> = never[],
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
      __IS_ICON: boolean;
      displayName: string;
      newInstance: () => Component<BaseTag, Props, Context>;
      [CORE_COMPONENT]: boolean;
    };
    export type InferJsxIntrinsicElement<T extends React.DetailedHTMLProps<any, any>> =
      T extends React.DetailedHTMLProps<infer _, infer Element> ? Element : HTMLElement;
    type InferElementFromRef<T> = T extends React.Ref<infer Element> ? Element : never;
    type InferRefElementFromProps<T> = 'ref' extends keyof T
      ? InferElementFromRef<T['ref']>
      : HTMLElement;
    export type ComponentHtmlElement<Tag extends ComponentTag> =
      Tag extends keyof JSX.IntrinsicElements
        ? InferJsxIntrinsicElement<JSX.IntrinsicElements[Tag]>
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
    AdditionalContext extends Readonly<any[]> = never[],
  > = (<
    Tag extends InternalTypings.ComponentTag | [InternalTypings.ComponentTag, keyof JSX.IntrinsicElements] = BaseTag,
    Props extends BaseProps = BaseProps,
  >(
    props: InternalTypings.ComponentProps<Tag, BaseTag, Props, Context, AdditionalContext>,
  ) => InternalTypings.ComponentRenderingResults) &
  InternalTypings.ComponentAdditive<BaseTag, Tag, BaseProps, Context, AdditionalContext>;
  export type Tag = InternalTypings.ComponentTag;
  export type DomProps<Tag extends keyof JSX.IntrinsicElements> =
    InternalTypings.InferJsxIntrinsicElement<JSX.IntrinsicElements[Tag]>;
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
