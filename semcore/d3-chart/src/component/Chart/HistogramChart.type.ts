import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

export type HistogramChartData = Array<Record<string, number | Date>>;

export type HistogramChartProps = BaseChartProps<HistogramChartData> & {
  groupKey: string;
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
};

export type HistogramChartType = Intergalactic.Component<typeof Flex, HistogramChartProps>;
