import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import type { BaseChartProps } from './AbstractChart.type';

export type HistogramChartData = Array<Record<string, number | Date>>;

export type HistogramChartProps = BaseChartProps<HistogramChartData> & {
  groupKey: string;
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
};

export type HistogramChartType = Intergalactic.Component<typeof Flex, HistogramChartProps>;
