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

declare const Bar: <T>(props: CProps<IBarProps & T, IBarContext>) => ReturnEl;

export default Bar;
