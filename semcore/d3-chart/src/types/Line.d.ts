import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';
import { CurveFactory } from 'd3-shape';

export interface ILineProps extends IContext {
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
}

export interface ILineDotsProps extends IContext {
  /** Show all Dot */
  display?: boolean;
  /** Hide property */
  hide?: boolean;
  /** Index active of element */
  activeIndex?: number;
}

export interface ILineDotsContext {
  /** Value element of data */
  value?: any;
  /** Index element of data */
  index?: number;
}

export interface ILineNullProps extends IContext {
  /** Hide property */
  hide?: boolean;
}

declare const Line: (<T>(props: CProps<ILineProps & T>) => ReturnEl) & {
  Dots: <T>(props: CProps<ILineDotsProps & T, ILineDotsContext>) => ReturnEl;
  Null: <T>(props: CProps<ILineNullProps & T>) => ReturnEl;
};

export default Line;
