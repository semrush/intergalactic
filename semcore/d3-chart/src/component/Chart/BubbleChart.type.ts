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
  groupKey?: never;
  xScale?: ScaleLinear<any, any>;
  yScale?: ScaleLinear<any, any>;
  /** Callback triggered when a user clicks on a bubble */
  onClickBubble?: (index: number, event: React.SyntheticEvent) => void;
};

export type BubbleChartType = Intergalactic.Component<typeof Flex, BubbleChartProps>;
