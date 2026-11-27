import type React from 'react';

import type { BaseChartProps, ListData } from './AbstractChart.type';
import type { NSAxis } from '../../Axis/Axis.type';

export type AbstractAxisChartProps<D extends ListData = ListData> = BaseChartProps<D> & {
  /**
   * Group key for all array-based charts (for get keys of items for legend except that group key)
   */
  groupKey?: string;
  /**
   * Show X axis
   * @default true
   */
  showXAxis?: boolean;
  /**
   * Show Y axis
   * @default true
   */
  showYAxis?: boolean;

  /**
   * Position of Y axis.
   * @default 'left'
   */
  yAxisPosition?: NSAxis.Props['yAxisPosition'] | 'both';

  /**
   * Count of ticks for X axis
   */
  xTicksCount?: number;
  /**
   * Count of ticks for Y axis
   */
  yTicksCount?: number;

  /**
   * function for format axis item text
   */
  axisXValueFormatter?: (value: unknown) => React.ReactNode;
  axisYValueFormatter?: (value: unknown) => React.ReactNode;
};
