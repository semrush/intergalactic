import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';

export type ScaledValues = {
  x: number[];
  y: number[];
};

export type BubbleChartData = Array<{
  x: number;
  y: number;
  value: number;
  label?: string;
  color?: string;
}>;

export type BubbleChartProps = BaseChartProps<BubbleChartData> & {
  /** Field name that groups the data points */
  groupKey?: never;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
};

export type BubbleChartType = Intergalactic.Component<typeof Flex, BubbleChartProps>;
