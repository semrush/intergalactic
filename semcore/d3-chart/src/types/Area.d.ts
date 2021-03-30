import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';
import { CurveFactory } from 'd3-shape';

export interface IAreaProps extends IContext {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y for line*/
  y?: string;
  /** Field from data for Axis x for area*/
  y1?: string;
  /** Field from data for Axis x for area bottom line */
  y0?: Symbol;
  /** Area generators
   * @default d3.area() */
  d3?: Area<Datum>;
  /** Color line
   * @default '#50aef4'*/
  color?: string;
  /** Area color
   * @default '#50aef450'*/
  fill?: string;
  /** Element hide property */
  hide?: boolean;
  /** Curve method */
  curve?: CurveFactory;
}

export interface IAreaDotsProps extends IContext {
  /** Show all Dot */
  display?: boolean;
  /** Hide property */
  hide?: boolean;
  /** Index active of element */
  activeIndex?: number;
}

export interface IAreaDotsContext {
  /** Value element of data */
  value?: any;
  /** Index element of data */
  index?: number;
}

export interface IAreaNullProps extends IContext {
  /** Hide property */
  hide?: boolean;
}

declare const Area: (<T>(props: CProps<IAreaProps & T>) => ReturnEl) & {
  Dots: <T>(props: CProps<IAreaDotsProps & T, IAreaDotsContext>) => ReturnEl;
  Null: <T>(props: CProps<IAreaNullProps & T>) => ReturnEl;
};

export default Area;
