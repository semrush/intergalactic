import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import { TooltipType } from './Tooltip';

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
  /**
   * Human readable name of the segment
   * */
  name: string;
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
}

export interface IEmptyDataProps extends IContext {}

export interface ILabelProps extends IContext {}

declare const Donut: (<T>(props: MapProps<IDonutProps & T>) => ReturnEl) & {
  Pie: <T>(props: MapProps<IPieProps & T>) => ReturnEl;
  EmptyData: <T>(props: MapProps<IEmptyDataProps & T>) => ReturnEl;
  Label: <T>(props: MapProps<ILabelProps & T>) => ReturnEl;
  Tooltip: TooltipType<IPieProps>;
};

export default Donut;
