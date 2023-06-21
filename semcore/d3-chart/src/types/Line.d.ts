import { Intergalactic } from '@semcore/core';
import { Context } from './context';
import { CurveFactory } from 'd3-shape';
import { FadeInOutProps } from '@semcore/animation';

/** @deprecated */
export interface ILineProps extends LineProps, UnknownProperties {}
export type LineProps = Context & {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
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
export interface ILineDotsProps extends LineDotsProps, UnknownProperties {}
export type LineDotsProps = Context &
  FadeInOutProps & {
    /** Show all Dot */
    display?: boolean;
    /** Hide property */
    hide?: boolean;
    /** Index active of element */
    activeIndex?: number;
  };

/** @deprecated */
export interface ILineDotsContext extends LineDotsContext, UnknownProperties {}
export type LineDotsContext = {
  /** Value element of data */
  value?: any;
  /** Index element of data */
  index?: number;
};

/** @deprecated */
export interface ILineNullProps extends LineNullProps, UnknownProperties {}
export type LineNullProps = Context & {
  /** Hide property */
  hide?: boolean;
};

declare const Line: Intergalactic.Component<'line', LineProps, Context> & {
  Dots: Intergalactic.Component<'circle', LineDotsProps, LineDotsContext>;
  Null: Intergalactic.Component<'path', LineNullProps, LineNullContext>;
};

export default Line;
