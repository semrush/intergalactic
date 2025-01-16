import React from 'react';
import { FlexProps } from '@semcore/flex-box';
import { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';
import Icon from '@semcore/icon';
import { BaseChartLegendProps } from '../ChartLegend/BaseLegend.type';
import { TrendProps } from '../ChartLegend/LegendFlex/LegendFlex.type';
import { PatternsConfig } from '../../Pattern';
// @ts-ignore
import { PlotSummarizerConfig } from '../../Plot';
import { Intergalactic } from '@semcore/core';

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
  title?: string;
}>;

export type BaseChartProps<T extends ListData | ObjectData> = FlexProps &
  AriaNameProps & {
    /**
     * Chart data. For all charts except Donut(Pie), Radar and Venn should be an Array
     */
    data: T;
    /**
     * Width of plot
     */
    plotWidth: number;
    /**
     * Height of plot
     */
    plotHeight: number;

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
     * Config for a11y summary
     */
    a11yAltTextConfig?: PlotSummarizerConfig;

    /**
     * Animations duration, set 0 to disable animations
     */
    duration?: number;
  } /**
   * By default, we show the Legend for all charts with more the one data item.
   * For hide the Legend, you should set showLegend prop to `false`.
   */ & (
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
