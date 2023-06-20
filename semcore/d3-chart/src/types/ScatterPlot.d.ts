import { ReturnEl } from '@semcore/core';
import { MapProps } from './Plot';
import IContext from './context';
import { TooltipType } from './Tooltip';

export interface IScatterPlotProps extends IContext {
  /** Field name from `data` array item for the XAxis */
  x: string;
  /** Field name from `data` array item for the YAxis */
  y: string;
  /** Field name from `data` array item for the circle value */
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
}

declare const ScatterPlot: (<T>(props: MapProps<IScatterPlotProps & T>) => ReturnEl) & {
  Tooltip: TooltipType<
    IScatterPlotProps & {
      /**
       * @deprecated Use `index` instead.
       */
      xIndex: number;
      /**
       * Index of item in the `data` array used to render related circle.
       */
      index: number;
    }
  >;
};

export default ScatterPlot;
