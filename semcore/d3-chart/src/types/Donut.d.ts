import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IDonutProps extends IContext {
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
}

export interface IPieProps extends IContext {
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
}

export interface IEmptyDataProps extends IContext {}

export interface ILabelProps extends IContext {}

declare const Donut: (<T>(props: CProps<IDonutProps & T>) => ReturnEl) & {
  Pie: <T>(props: CProps<IPieProps & T>) => ReturnEl;
  EmptyData: <T>(props: CProps<IEmptyDataProps & T>) => ReturnEl;
  Label: <T>(props: CProps<ILabelProps & T>) => ReturnEl;
};

export default Donut;
