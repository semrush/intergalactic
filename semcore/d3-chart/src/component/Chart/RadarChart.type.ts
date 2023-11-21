import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleLinear } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

export type RadarChartData = Record<string, string[] | number[]>;

export type RadarChartProps = BaseChartProps<RadarChartData> & {
  groupKey: string;
  scale?: ScaleLinear<any, any>;
  xScale?: never;
  yScale?: never;
  showDots?: boolean;
  circle?: boolean;
};

export type RadarChartType = Intergalactic.Component<typeof Flex, RadarChartProps>;
