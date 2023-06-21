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
export type ReturnEl = React.ReactElement | React.ReactNode | React.ReactNode[] | string | null;

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

declare const Root: Root;

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

  Root: Root;
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
  export type ReactFCProps<C extends React.FC> = C extends React.FC<infer Props>
    ? Omit<Props, 'tag'>
    : {};
  export type ReactComponentProps<C extends React.ComponentClass> = C extends React.ComponentClass<
    infer Props
  >
    ? Omit<Props, 'tag'>
    : never;
  export type ReactFCLike = (props: any) => any;
  export type ReactFCLikeProps<C extends ReactFCLike> = C extends (props: infer Props) => any
    ? Props
    : {};
  export type ComponentTag =
    | keyof JSX.IntrinsicElements
    | React.ComponentClass
    | React.FC
    | ReactFCLike;
  export type ComponentChildren<Props, Context, Handlers> =
    | ((props?: Context & Omit<Props, 'chldren'>, handlers?: Handlers) => ReturnEl)
    // | ((props?: Context & Omit<Props, 'chldren'>) => ReturnEl)
    // | (() => ReturnEl)
    | ReturnEl;
  export type ComponentBasicProps = {
    ref?: React.ForwardedRef<HTMLElement | null>;
    /** @private DO NOT USE IT. Low-level api that prevents specified props from being applied as DOM attribute. */
    __excludeProps?: string[];
  };
  export type MergeProps<HighPriorityProps, LowPriorityProps> = Omit<
    LowPriorityProps,
    keyof HighPriorityProps
  > &
    HighPriorityProps;
  export type ComponentPropsNesting<Tag extends ComponentTag> = Omit<
    (Tag extends React.FC
      ? ReactFCProps<Tag>
      : Tag extends React.ComponentClass
      ? ReactComponentProps<Tag>
      : Tag extends ReactFCLike
      ? ReactFCLikeProps<Tag>
      : Tag extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[Tag]
      : {}) &
      (Tag extends { __nestedProps: infer NestedProps } ? NestedProps : {}),
    'children' | 'tag' | 'ref'
  >;
  export type Component<
    BaseTag extends ComponentTag = never,
    BaseProps = {},
    Context = {},
    Handlers = never,
  > = (<Tag extends ComponentTag = BaseTag, Props extends BaseProps = BaseProps>(
    props: {
      tag?: Tag;
      children?: ComponentChildren<Props, Context, Handlers>;
    } & ComponentBasicProps &
      MergeProps<Omit<Props, 'tag' | 'ref'>, ComponentPropsNesting<Tag>>,
  ) => React.ReactElement) & { __nestedProps?: ComponentPropsNesting<BaseTag> };

  /** After updating types in the namespace checkout all types with marker "Intergalactic.Component generic override" and update correspondingly. */

  // const x: any = null;
  // const C1: Component<'div', { x1: number }> = x;
  // type TC1 = ComponentPropsNesting<typeof C1>;
  // type TC2 = ReactFCLikeProps<typeof C1>;
  // // const X1: TC1 = x;
  // // const X2: TC2 = x;
  // const C2: Component<'a', { x2: boolean }> = x;
  // const C3 = <C1 tag={C2} x1={3} x2 hr/>;
}
