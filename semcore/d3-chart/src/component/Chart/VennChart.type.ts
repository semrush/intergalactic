import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';

export type VennChartData = Record<string, number>;

export type VennChartProps = BaseChartProps<VennChartData> & {
  /** Internal */
  groupKey?: never;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
};

export type VennChartType = Intergalactic.Component<typeof Flex, VennChartProps>;
