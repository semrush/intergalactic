import React, {
  AllHTMLAttributes,
  ForwardRefExoticComponent,
  PureComponent,
  ReactNode,
  RefObject,
} from 'react';
import { IStyledProps } from './styled';

type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K;
} extends { [_ in keyof T]: infer U }
  ? U
  : never;

export type HandlersType<UCProps> = { [K in keyof UCProps]?: <T = unknown>(arg: T) => void };
export type ChildrenType<Props = {}, Ctx = {}, UCProps = {}> =
  | ((props: Props & Ctx, handlers: HandlersType<UCProps>) => ReactNode)
  | ReactNode;

export type RootComponentHandler = (...args: any[]) => void | false;

export interface IRootComponentHandlers {
  [key: string]: RootComponentHandler;
}

export interface IRootComponentProps<Props = {}, Ctx = {}> {
  forwardRef?: RefObject<any>;
  Children?: any;
  children?: ChildrenType<Props, Ctx>;
  styles?: IStyledProps['styles'];
}

export type IComponentProps<Props = {}, Ctx = {}> = Props & IRootComponentProps<Props, Ctx>;

export type IFunctionProps<Props = {}, Ctx = {}> = IComponentProps<Props, Ctx> &
  Omit<AllHTMLAttributes<any>, keyof IComponentProps<Props, Ctx>> & { Root?: Root };

export type PropsWithRenderFnChildren<Props = {}, Ctx = {}, UCProps = {}> = Omit<
  Pick<Props, KnownKeys<Props>>,
  'children'
> & {
  children?: ChildrenType<Props, Ctx, UCProps>;
  [key: string]: unknown;
};

export type CProps<Props, Ctx = {}, UCProps = {}> = Props & {
  children?: ((props: Props & Ctx, handlers: UCProps) => React.ReactNode) | React.ReactNode;
};
export type ReturnEl = React.ReactElement | null;

export interface IRootNodeProps {
  render: React.ElementType;
  tag?: React.ElementType | string;

  [key: string]: any;
}

export type Root = ForwardRefExoticComponent<IRootNodeProps>;

/**
 * @deprecated since version ^1.8.0
 */
export type PropGetter<T extends (...args: any) => any> = <P>(props?: P) => ReturnType<T> & P;
/**
 * @deprecated since version ^1.8.0
 */
export type PropGetterReturn<T extends (...args: any) => any> = Partial<ReturnType<T>>;
export type PropGetterFn = <T extends {}>(props?: T) => T & { [key: string]: unknown };
export type Merge<Props, HTMLProps> = Props & Omit<HTMLProps, keyof Props>;
export type MergeGetters<G1 extends (...args: any) => any, G2 extends (...args: any) => any> = <P>(
  props?: P,
) => Merge<ReturnType<G1>, ReturnType<G2>> & P;

export default abstract class RootComponent<
  Props = {},
  Context = {},
  State = {}
> extends PureComponent<Props & IRootComponentProps<Props, Context>, State> {
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
