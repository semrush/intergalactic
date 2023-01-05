import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';

export interface IBarProps extends IContext {
  /** Field from data for XAxis */
  x?: string;
  /** Field from data for YAxis */
  y?: string;
  /** Line color
   * @default '#50aef4'*/
  color?: string;
  /** Element hide property */
  hide?: boolean;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Radius of curvature
   * @default 2
   */
  r?: number | number[];
  /** Minimal height
   * @default 4
   */
  hMin?: number;
  /**
   * Bar click handler
   */
  onClick?: (data: { [key: string]: string | number }, event: Event) => void;
}

export interface IBarContext {
  /** Value element of data */
  value: any;
  /** Index element of data */
  index: number;
}

export interface IBackgroundProps extends IContext {
  /** Coordinate x */
  x?: number | string;
  /** Coordinate y */
  y?: number | string;
  /** Value element of data */
  value?: any;
  /** Width rect */
  width?: number | string;
  /** Height rect */
  height?: number | string;
}

declare const Bar: (<T>(props: MapProps<IBarProps & T, IBarContext>) => ReturnEl) & {
  Background: <T>(props: MapProps<IBackgroundProps & T>) => ReturnEl;
};

export default Bar;
