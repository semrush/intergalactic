import type { UnknownProperties } from '@semcore/core';
import type { Context } from './context';
import type { TooltipType } from './Tooltip';
import type { IntergalacticD3Component } from './Plot';
import type { PatternsConfig } from './Pattern';

/** @deprecated */
export interface IScatterPlotProps extends ScatterPlotProps, UnknownProperties {}
export type ScatterPlotProps = Context & {
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
  /** Enables charts patterns that enhances charts accessibility */
  patterns?: PatternsConfig;
};

declare const ScatterPlot: IntergalacticD3Component<'g', ScatterPlotProps, Context> & {
  Tooltip: TooltipType<
    ScatterPlotProps & {
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
