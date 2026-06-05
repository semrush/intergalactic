import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
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

export type BubbleChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<BubbleChartData>,
  'showTotalInTooltip'
> & {
  /** Field name that groups the data points */
  groupKey?: never;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
  /** Callback triggered when a user clicks on a bubble */
  onClickBubble?: (index: number, event: React.SyntheticEvent) => void;
};

export type BubbleChartDefaultProps = {
  direction: 'column';
  showXAxis: true;
  showYAxis: true;
  showTooltip: true;
};

export type BubbleChartType = Intergalactic.Component<typeof Flex, BubbleChartProps>;
