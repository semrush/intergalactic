import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleLinear } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

export type RadarChartProps = BaseChartProps & {
  data: Record<string, string[] | number[]>;
  groupKey: string;
  scale?: ScaleLinear<any, any>;
  xScale?: never;
  yScale?: never;
  hideDots?: boolean;
  circle?: boolean;
};

export type RadarChartType = Intergalactic.Component<typeof Flex, RadarChartProps>;
