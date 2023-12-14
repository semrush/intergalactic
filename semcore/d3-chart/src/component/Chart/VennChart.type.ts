import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleLinear } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

export type VennChartData = Record<string, number>;

export type VennChartProps = BaseChartProps<VennChartData> & {
  groupKey?: never;
  xScale?: ScaleLinear<any, any>;
  yScale?: ScaleLinear<any, any>;
};

export type VennChartType = Intergalactic.Component<typeof Flex, VennChartProps>;
