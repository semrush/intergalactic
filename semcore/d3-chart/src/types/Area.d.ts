import { Intergalactic } from '@semcore/core';
import { Context } from './context';
import { CurveFactory } from 'd3-shape';

/** @deprecated */
export interface IAreaProps extends AreaProps, UnknownProperties {}
export type AreaProps = Context & {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis*/
  y?: string;
  /** Line color
   * @default '#50aef4'*/
  color?: string;
  /** Element hide property */
  hide?: boolean;
  /** Curve method */
  curve?: CurveFactory;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Enables element transparency */
  transparent?: boolean;
};

/** @deprecated */
export interface IAreaDotsProps extends AreaDotsProps, UnknownProperties {}
export type AreaDotsProps = Context & {
  /** Show all Dot */
  display?: boolean;
  /** Hide property */
  hide?: boolean;
  /** Enables element transparency */
  transparent?: boolean;
};

/** @deprecated */
export interface IAreaDotsContext extends AreaDotsContext, UnknownProperties {}
export type AreaDotsContext = {
  /** Value element of data */
  value?: any;
  /** Index element of data */
  index?: number;
};

/** @deprecated */
export interface IAreaNullProps extends AreaNullProps, UnknownProperties {}
export type AreaNullProps = Context & {
  /** Hide property */
  hide?: boolean;
};

declare const Area: Intergalactic.Component<'path', AreaProps, Context> & {
  Dots: Intergalactic.Component<'circle', AreaDotsProps, AreaDotsContext>;
  Null: Intergalactic.Component<'path', AreaNullProps, Context>;
  Line: Intergalactic.Component<'path', Context, Context>;
};

export default Area;
