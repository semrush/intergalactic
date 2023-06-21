import { Intergalactic } from '@semcore/core';
import { Context } from './context';

/** @deprecated */
export interface IScatterPlotProps extends ScatterPlotProps, UnknownProperties {}
export type ScatterPlotProps = Context & {
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
  /** Enables element transparency */
  transparent?: boolean;
};

declare const ScatterPlot: Intergalactic.Component<'g', ScatterPlotProps, Context>;

export default ScatterPlot;
