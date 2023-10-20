import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

export type BubbleChartProps = BaseChartProps & {
  data: Array<{
    x: number;
    y: number;
    value: number;
    label?: string;
    color?: string;
  }>;
  groupKey?: never;
  xScale?: ScaleLinear<any, any>;
  yScale?: ScaleLinear<any, any>;
};

export type BubbleChartType = Intergalactic.Component<typeof Flex, BubbleChartProps>;
