import { Intergalactic } from '@semcore/core';
import { Context } from './context';

/** @deprecated */
export interface IDonutProps extends DonutProps, UnknownProperties {}
export type DonutProps = Context & {
  /** Inner radius
   * @default 0
   * */
  innerRadius?: number;
  /** Outer radius
   * @default calculated by the formula from width, height
   * */
  outerRadius?: number;
  /** Semi donut */
  halfsize?: boolean;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
};

/** @deprecated */
export interface IPieProps extends PieProps, UnknownProperties {}
export type PieProps = Context & {
  /**
   * Name of the field in the data
   * */
  dataKey: string;
  /** Color pie
    @default #50aef4
   **/
  color?: string;
  /**
   * Active sector
   * */
  active?: boolean;
  /** Enables element transparency */
  transparent?: boolean;
};

/** @deprecated */
export interface IEmptyDataProps extends EmptyDataProps, UnknownProperties {}
export type EmptyDataProps = Context & {};

/** @deprecated */
export interface ILabelProps extends LabelProps, UnknownProperties {}
export type LabelProps = Context & {};

declare const Donut: Intergalactic.Component<'g', DonutProps> & {
  Pie: Intergalactic.Component<'path', PieProps>;
  EmptyData: Intergalactic.Component<'path', IEmptyDataProps>;
  Label: Intergalactic.Component<'text', LabelProps>;
};

export default Donut;
