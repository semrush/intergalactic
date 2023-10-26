import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';
import { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';

type TrendItem = {
  x: number;
  y: number;
};

export type BarChartData = Array<Record<string, string | number | Date>>;

export type BarChartProps = BaseChartProps<BarChartData> & {
  groupKey: string;
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  type?: 'stack' | 'group';
  trend?: Record<LegendItemKey, TrendItem[]>;
};

export type BarChartType = Intergalactic.Component<typeof Flex, BarChartProps>;
