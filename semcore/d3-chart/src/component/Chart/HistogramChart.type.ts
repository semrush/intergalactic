import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';

export type HistogramChartData = Array<Record<string, number | Date>>;

export type HistogramChartProps = BaseChartProps<HistogramChartData> & {
  /** Field name that groups the data points */
  groupKey: string;
  /** Custom x-axis scale */
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
};

export type HistogramChartDefaultProps = {
  direction: 'column';
  showXAxis: true;
  showYAxis: true;
  showTooltip: true;
};

export type HistogramChartType = Intergalactic.Component<typeof Flex, HistogramChartProps>;
