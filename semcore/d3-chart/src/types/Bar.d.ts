import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IBarProps extends IContext {
  /** Field from data for Axis x */
  x?: string;
  /** Field from data for Axis y */
  y?: string;
  /** Color line
   * @default '#50aef4'*/
  color?: string;
  /** Element hide property */
  hide?: boolean;
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

declare const Bar: (<T>(props: CProps<IBarProps & T, IBarContext>) => ReturnEl) & {
  Background: <T>(props: CProps<IBackgroundProps & T>) => ReturnEl;
};

export default Bar;
