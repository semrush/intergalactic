import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear } from 'd3-scale';
import type { BaseChartProps } from './AbstractChart.type';

export type VennChartData = Record<string, number>;

export type VennChartProps = BaseChartProps<VennChartData> & {
  groupKey?: never;
  xScale?: ScaleLinear<any, any>;
  yScale?: ScaleLinear<any, any>;
};

export type VennChartType = Intergalactic.Component<typeof Flex, VennChartProps>;
