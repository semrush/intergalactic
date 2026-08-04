import type { NSFlex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type Icon from '@semcore/icon';
import type React from 'react';

import type { PatternsConfig } from '../../Pattern';
// @ts-ignore
import type { PlotSummarizerConfig } from '../../Plot';
import type { PlotEventEmitter } from '../../utils';
import type { BaseChartLegendProps } from '../ChartLegend/BaseLegend.type';
import type { TrendProps } from '../ChartLegend/LegendFlex/LegendFlex.type';
import type { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';

export type BaseLegendProps = BaseChartLegendProps & {
  /**
   * Disable hover (for transition items legend of each not hovered)
   */
  disableHoverItems?: boolean;
  /**
   * Disable selectable of data items by checkboxes in Legend
   */
  disableSelectItems?: boolean;
} & (
    | (TrendProps & {
      /**
         * How to render Legend - Flex view. Just list of legend items
         */
      legendType?: never | 'Flex';
      /**
         * Config for Legend items
         */
      legendMap?: LegendDataMap<'Flex'>;
    })
    | {
      /**
         * How to render Legend - Table view. Table of legend items with some additional information in columns
         */
      legendType: 'Table';
      /**
         * Config for Legend items
         */
      legendMap?: LegendDataMap<'Table'>;
    }
  );

export type ObjectData = Record<string, unknown>;
export type ListData = ObjectData[];

/**
 * Chart, Legend must have an accessible names (aria-name).
 * It should describe chart or legend content.
 */
export type AriaNameProps = Intergalactic.RequireAtLeastOne<{
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'title'?: string;
}>;

export type BaseChartProps<T extends ListData | ObjectData> = NSFlex.Props & {
  /**
   * Chart data. For all charts except Donut(Pie), Radar and Venn should be an Array
   */
  data: T;
  /**
   * Width of plot
   * @default width is 100% of the parent element.
   */
  plotWidth?: number;
  /**
   * Height of plot
   * @default height is 100% of the parent element.
   */
  plotHeight?: number;

  /** Enables charts patterns that enhances charts accessibility */
  patterns?: PatternsConfig;
  /**
   * Margin (for Y axis points) from left side of chart container to Y axis
   */
  marginY?: number;
  /**
   * Margin (for X axis points) from bottom of chart container to X axis
   */
  marginX?: number;
  /**
   * invert axis and show horizontal charts (only for Bars!)
   */
  invertAxis?: boolean;

  /**
   * Show X axis
   * @default true (for charts with axis: Area, Line, Bar, ScatterPlot, ...)
   */
  showXAxis?: boolean;
  /**
   * Show Y axis
   * @default true (for charts with axis: Area, Line, Bar, ScatterPlot, ...)
   */
  showYAxis?: boolean;
  /**
   * Map with colors for data items
   */
  colorMap?: Record<string, string>;
  /**
   * Show tooltip's.
   * @default true
   */
  showTooltip?: boolean;
  /**
   * Show sum of values for selected point in tooltip
   */
  showTotalInTooltip?: boolean;
  /**
   * Scale for xAxis (see more in d3-scale)
   */
  xScale?: unknown;
  /**
   * Scale for yAxis (see more in d3-scale)
   */
  yScale?: unknown;
  /**
   * Count of ticks for X axis
   */
  xTicksCount?: number;
  /**
   * Count of ticks for Y axis
   */
  yTicksCount?: number;
  /** Enables multiline tick labels for X axis, applicable only for band scales */
  multilineXTicks?: boolean;
  /** Enables multiline tick labels for Y axis, applicable only for band scales */
  multilineYTicks?: boolean;
  /**
   * Group key for all array-based charts (for get keys of items for legend except that group key)
   */
  groupKey?: string;
  /**
   * function for format axis item text
   */
  axisXValueFormatter?: (value: unknown) => string;
  axisYValueFormatter?: (value: unknown) => string;
  /**
   * Function for format text for tooltip
   */
  tooltipValueFormatter?: (value?: unknown) => string;
  /**
   * Custom event emitter. Could be useful to handle event on few charts at the same time.
   */
  eventEmitter?: InstanceType<typeof PlotEventEmitter>;
  /**
   * Config for a11y summary
   */
  a11yAltTextConfig?: PlotSummarizerConfig;

  /**
   * Animations duration, set 0 to disable animations
   */
  duration?: number;
  /**
   * Flag to show/hide legend
   */
  showLegend?: boolean;
  /**
   * Relation between height and width dimensions block.
   * height = width / aspect, so an aspect could be set as `16 / 9` for example.
   */
  aspect?: number;
  /** Callback which will be called after changing the block size */
  onResize?: (size: [number, number], entries: ResizeObserverEntry[]) => void;
  /**
   * Props for Legend
   */
  legendProps?: Partial<BaseLegendProps>;
} & (
  | {
  /**
   * Don't show legend
   */
    showLegend?: false;
    legendProps?: never;
  }
  | {
  /**
   *  By default (if showLegend don't set), for one data item on chart,
   *  Legend component will be hide, and show for more then 1 data item.
   *  If set `true` - Legend component will show always.
   */
    showLegend?: true;
    /**
   * Props for Legend
   */
    legendProps?: Partial<BaseLegendProps>;
  }
  );

type LegendDataMap<T extends 'Flex' | 'Table'> = Record<
  LegendItemKey,
  {
    /**
     * Custom label for legend item (by default use keys from data item object)
     */
    label?: string;
    /**
     * Additional text after label
     */
    additionalInfo?: string;
    /**
     * Count after label
     */
    count?: number;
    /**
     * Custom Icon
     */
    icon?: typeof Icon;
    /**
     * Flag for uncheck some items by default
     */
    defaultChecked?: boolean;
  } & (T extends 'Table' ? { columns?: React.ReactNode[] } : { columns?: never })
>;
