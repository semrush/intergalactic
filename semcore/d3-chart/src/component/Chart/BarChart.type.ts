import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import type React from 'react';

import type { AriaNameProps, BaseChartProps } from './AbstractChart.type';
import type { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';

type TrendItem = {
  x: number | string;
  y: number | string;
};

type BarKey = string;

export type BarChartData = Array<Record<BarKey, string | number | Date>>;

export type BarChartProps = BaseChartProps<BarChartData> & {
  /** Field name that groups the data points */
  groupKey: string;
  /** Custom x-axis scale */
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
  /** Controls whether bars are grouped side-by-side or stacked */
  type?: 'stack' | 'group';
  /** Optional trend line data to overlay on the bars */
  trend?: Record<LegendItemKey, TrendItem[]>;
  /** Handle click by `HoverRect`. `index` is an index of the data array. */
  onClickHoverRect?: (index: number, e: React.SyntheticEvent) => void;
  /** Handle click by Bar. */
  onClickBar?: (barItem: number, barKey: BarKey, e: React.SyntheticEvent) => void;
};

export type BarChartType = Intergalactic.Component<typeof Flex, BarChartProps & AriaNameProps>;
