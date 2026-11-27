import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleLinear } from 'd3-scale';

import type { AbstractAxisChartProps } from './AbstractChart/AbstractAxisChart.type';
import type { BaseChartProps } from './AbstractChart/AbstractChart.type';

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
  AbstractAxisChartProps<BubbleChartData>,
  'showTotalInTooltip' | 'showDeltaPercentInTooltip' | 'getPercentDelta' | 'deltaPercentGrowthColor' | 'showYAxis' | 'showXAxis'
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
  showTooltip: true;
  locale: 'en';
};

export type BubbleChartType = Intergalactic.Component<typeof Flex, BubbleChartProps>;
