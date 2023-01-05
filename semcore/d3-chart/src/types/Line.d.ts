import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import { CurveFactory } from 'd3-shape';
import { IFadeInOutProps } from '@semcore/animation';

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
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Element opacity property */
  transparent?: boolean;
}

export interface ILineDotsProps extends IContext, IFadeInOutProps {
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

declare const Line: (<T>(props: MapProps<ILineProps & T>) => ReturnEl) & {
  Dots: <T>(props: MapProps<ILineDotsProps & T, ILineDotsContext>) => ReturnEl;
  Null: <T>(props: MapProps<ILineNullProps & T>) => ReturnEl;
};

export default Line;
