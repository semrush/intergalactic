import React, {
  AllHTMLAttributes,
  ForwardRefExoticComponent,
  PureComponent,
  ReactNode,
  RefObject,
} from 'react';
import { IStyledProps } from './styled';

/** @deprecated */
type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

/** @deprecated */
export type HandlersType<UCProps> = { [K in keyof UCProps]?: <T = unknown>(arg: T) => void };
/** @deprecated */
export type ChildrenType<Props = {}, Ctx = {}, UCProps = {}> =
  | ((props: Props & Ctx, handlers: HandlersType<UCProps>) => ReactNode)
  | ReactNode;

/** @deprecated */
export type RootComponentHandler = (...args: any[]) => void | false;

/** @deprecated */
export interface IRootComponentHandlers {
  [key: string]: RootComponentHandler;
}

/** @deprecated */
export interface IRootComponentProps<Props = {}, Ctx = {}> {
  forwardRef?: RefObject<any>;
  Children?: any;
  children?: ChildrenType<Props, Ctx>;
  styles?: IStyledProps['styles'];
}

/** @deprecated */
export type IComponentProps<Props = {}, Ctx = {}> = Props & IRootComponentProps<Props, Ctx>;

/** @deprecated */
export type IFunctionProps<Props = {}, Ctx = {}> = IComponentProps<Props, Ctx> &
  Omit<AllHTMLAttributes<any>, keyof IComponentProps<Props, Ctx>> & { Root?: Root };

/** @deprecated */
export type PropsWithRenderFnChildren<Props = {}, Ctx = {}, UCProps = {}> = Omit<
  Pick<Props, KnownKeys<Props>>,
  'children'
> & {
  children?: ChildrenType<Props, Ctx, UCProps>;
  [key: string]: unknown;
};

/** @deprecated */
export type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactNode) | React.ReactNode;
};
/** @deprecated */
export type ReturnEl = React.ReactElement | null;

export interface IRootNodeProps {
  render: React.ElementType | string;
  tag?: React.ElementType | string;

  [key: string]: any;
}

type Root = ForwardRefExoticComponent<IRootNodeProps>;

/**
 * @deprecated since version ^1.8.0
 */
export type PropGetter<T extends (...args: any) => any> = <P>(props?: P) => ReturnType<T> & P;
/**
 * @deprecated since version ^1.8.0
 */
/** @deprecated */
export type PropGetterReturn<T extends (...args: any) => any> = Partial<ReturnType<T>>;
/** @deprecated */
export type PropGetterFn = <T extends {}>(props?: T) => T & { [key: string]: unknown };
/** @deprecated */
export type Merge<Props, HTMLProps> = Props & Omit<HTMLProps, keyof Props>;
/** @deprecated */
export type MergeGetters<G1 extends (...args: any) => any, G2 extends (...args: any) => any> = <P>(
  props?: P,
) => Merge<ReturnType<G1>, ReturnType<G2>> & P;

const Root: Root = undefined as any;

export { Root };

/** @deprecated */
abstract class RootComponent<Props = {}, Context = {}, State = {}> extends PureComponent<
  Props & IRootComponentProps<Props, Context>,
  State
> {
  get handlers(): Readonly<IRootComponentHandlers> {
    return {};
  }

  get asProps() {
    return {} as Readonly<
      Merge<Props & IRootComponentProps<Props, Context>, AllHTMLAttributes<any>>
    >;
  }

  Root: Root = undefined as any;
}

export const Component = RootComponent;
/** @deprecated */
export type Component<
  Props = {},
  Context = {},
  State = {},
  Handlers extends IRootComponentHandlers = IRootComponentHandlers,
> = React.ComponentClass<Props, State> & {
  handlers: Readonly<Handlers>;

  asProps: Readonly<Merge<Props & IRootComponentProps<Props, Context>, AllHTMLAttributes<any>>>;

  Root: Root;
};

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
  type RemoveFields<Type, Keys> = {
    [Property in keyof Type as Exclude<Property, Keys>]: Type[Property];
  };
  /** @private */
  export namespace InternalTypings {
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
      Tag extends ComponentTag,
      BaseTag extends ComponentTag | never,
      Props,
      Context = never,
      AdditionalContext extends any[] = never[],
    > = {
      tag?: Tag;
      children?: ComponentChildren<
        RemoveFields<Props, 'children'> & { children: React.ReactNode },
        Context,
        ReturnResult,
        AdditionalContext
      >;
    } & ComponentBasicProps<Tag> &
      MergeProps<
        RemoveFields<Props, 'tag' | 'children'>,
        MergeProps<ComponentPropsNesting<Tag>, ComponentPropsNesting<BaseTag>>
      >;
    export type PropsRenderingResultComponentProps<
      Tag extends ComponentTag,
      Props,
      Context = {},
      AdditionalContext extends any[] = never[],
    > = {
      tag?: Tag;
      children?: ComponentChildren<
        RemoveFields<Props, 'children'> & { children: React.ReactNode },
        Context,
        Partial<
          RemoveFields<
            MergeProps<Props, ComponentPropsNesting<Tag>>,
            'children' | 'tag' | 'ref'
          > & {
            children?: React.ReactNode;
          }
        >,
        AdditionalContext
      >;
    } & ComponentBasicProps<Tag> &
      MergeProps<RemoveFields<Props, 'tag' | 'children'>, ComponentPropsNesting<Tag>>;
    export type ComponentRenderingResults = React.ReactElement;
    export type ComponentAdditive<BaseTag extends ComponentTag> = {
      __nestedProps: ComponentPropsNesting<BaseTag>;
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
  }
  export type Component<
    BaseTag extends InternalTypings.ComponentTag = never,
    BaseProps = {},
    Context = {},
    AdditionalContext extends any[] = never[],
  > = (<Tag extends InternalTypings.ComponentTag = BaseTag, Props extends BaseProps = BaseProps>(
    props: InternalTypings.ComponentProps<Tag, BaseTag, Props, Context, AdditionalContext>,
  ) => InternalTypings.ComponentRenderingResults) &
    InternalTypings.ComponentAdditive<BaseTag>;
  export type Tag = InternalTypings.ComponentTag;
  export type DomProps<Tag extends keyof JSX.IntrinsicElements> =
    InternalTypings.InferJsxIntrinsicElement<JSX.IntrinsicElements[Tag]>;
}
