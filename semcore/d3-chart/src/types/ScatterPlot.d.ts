import { CProps, ReturnEl } from '@semcore/core';
import IContext from './context';

export interface IScatterPlotProps extends IContext {
  /** Field from data for XAxis */
  x: string;
  /** Field from data for YAxis */
  y: string;
  /** Field from data for circle value */
  value?: string;
  /** Circle color */
  color?: string;
  /** Circle value color */
  valueColor?: string;
  /** Animation duration in ms
   * @default 500
   */
  duration?: number;
  /** Radius of circles
   * @default 5.5 or 12 with value
   */
  r?: number;
}

declare const ScatterPlot: <T>(props: CProps<IScatterPlotProps & T>) => ReturnEl;

export default ScatterPlot;
