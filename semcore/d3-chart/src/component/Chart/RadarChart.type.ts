import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleLinear } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';

export type RadarChartData = Record<string, string[] | number[]>;

export type RadarChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<RadarChartData>,
  'showTotalInTooltip' | 'showPercentValueInTooltip'
> & {
  groupKey: string;
  scale?: ScaleLinear<any, any>;
  xScale?: never;
  yScale?: never;
  showDots?: boolean;
  circle?: boolean;
  /** Callback triggered when a user clicks on a chart at a position corresponding to a category */
  onClickRadar?: (index: number, e: React.SyntheticEvent) => void;
};

export type RadarChartDefaultProps = {
  direction: 'column';
  showXAxis: true;
  showYAxis: true;
  showTooltip: true;
};

export type RadarChartType = Intergalactic.Component<typeof Flex, RadarChartProps>;
