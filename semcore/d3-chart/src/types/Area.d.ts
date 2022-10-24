import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import { CurveFactory } from 'd3-shape';

export interface IAreaProps extends IContext {
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
}

export interface IAreaDotsProps extends IContext {
  /** Show all Dot */
  display?: boolean;
  /** Hide property */
  hide?: boolean;
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

declare const Area: (<T>(props: MapProps<IAreaProps & T>) => ReturnEl) & {
  Dots: <T>(props: MapProps<IAreaDotsProps & T, IAreaDotsContext>) => ReturnEl;
  Null: <T>(props: MapProps<IAreaNullProps & T>) => ReturnEl;
  Line: <T>(props: MapProps<IContext & T>) => ReturnEl;
};

export default Area;
