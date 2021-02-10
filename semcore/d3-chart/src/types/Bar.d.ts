import IContext from './context';
import { CProps, ReturnEl } from '@semcore/core';

export interface IBarProps {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Bar offset
   * @default [0, 0]*/
  offset?: [number, number];
  /** Color line
   * @default '#50aef4'*/
  color?: string;
  /** Element hide property */
  hide?: boolean;
}

export interface IBarContext extends IContext {
  /** Value element of data */
  value: any;
  /** Index element of data */
  index: number;
  /** Hide property*/
  hide: boolean;
  /** Width of Bar */
  width: number;
  /** Height of Bar */
  height: number;
  /** Value coordinate of x */
  x?: string;
  /** Value coordinate of y */
  y?: string;
}

declare const Bar: <T>(props: CProps<IBarProps & T, IBarContext>) => ReturnEl;

export default Bar;
