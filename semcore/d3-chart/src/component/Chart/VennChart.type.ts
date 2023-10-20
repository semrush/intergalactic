import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleLinear } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

export type VennChartProps = BaseChartProps & {
  /**
   * Intersections in data should have keys like id1/id2/id3/... - with `/` between items
   */
  data: Record<string, number>;
  xScale?: ScaleLinear<any, any>;
  yScale?: ScaleLinear<any, any>;
};

export type VennChartType = Intergalactic.Component<typeof Flex, VennChartProps>;
