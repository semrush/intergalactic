import React from 'react';
import { FlexProps } from '@semcore/flex-box';
import { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';
import Icon from '@semcore/icon';
import { BaseChartLegendProps } from '../ChartLegend/BaseLegend.type';
import { LineChartType } from './LineChart.type';
import { BarChartType } from './BarChart.type';
import { HistogramChartType } from './HistogramChart.type';
import { ScatterPlotChartType } from './ScatterPlotChart.type';
import { AreaChartType } from './AreaChart.type';
import { BubbleChartType } from './BubbleChart.type';
import { DonutChartType } from './DonutChart.type';
import { VennChartType } from './VennChart.type';
import { TrendProps } from '../ChartLegend/LegendFlex/LegendFlex.type';
import { RadarChartType } from './RadarChart.type';

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

export type BaseChartProps = FlexProps & {
  /**
   * Chart data. For all charts except Donut(Pie), Radar and Venn should be an Array
   */
  data: Array<Record<string, unknown>> | Record<string, unknown>;
  /**
   * Width of plot
   */
  plotWidth: number;
  /**
   * Height of plot
   */
  plotHeight: number;
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
   * Don't show X axis
   */
  hideXAxis?: boolean;
  /**
   * Don't show Y axis
   */
  hideYAxis?: boolean;
  /**
   * Map with colors for data items
   */
  colorMap?: Record<string, string>;
  /**
   * Don't show tooltip's
   */
  hideTooltip?: boolean;
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
} & (
    | {
        /**
         * Don't show legend
         */
        hideLegend?: true;
        legendProps?: never;
      }
    | {
        hideLegend?: never;
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

export type ChartMap = {
  Line: LineChartType;
  Bar: BarChartType;
  Histogram: HistogramChartType;
  ScatterPlot: ScatterPlotChartType;
  Area: AreaChartType;
  Bubble: BubbleChartType;
  Donut: DonutChartType;
  Venn: VennChartType;
  Radar: RadarChartType;
};
