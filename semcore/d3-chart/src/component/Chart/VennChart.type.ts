import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleLinear } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';

export type DataKey = string;

export type VennChartData = Record<DataKey, number>;

export type VennChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<VennChartData>,
  'showTotalInTooltip'
> & {
  /** Internal */
  groupKey?: never;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
  /** Callback triggered when a user clicks on a circle */
  onClickVennItem?: (key: DataKey, e: React.SyntheticEvent) => void;
};

export type VennChartDefaultProps = {
  direction: 'row-reverse';
  alignItems: 'flex-start';
  marginY: 0;
  marginX: 0;
};

export type VennChartType = Intergalactic.Component<typeof Flex, VennChartProps>;
