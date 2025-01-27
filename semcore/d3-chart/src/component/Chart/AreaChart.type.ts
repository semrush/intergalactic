import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { interpolateValue } from '../../utils';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import type { CurveFactory } from 'd3-shape';
import type { BaseChartProps } from './AbstractChart.type';

export type AreaChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type AreaChartProps = BaseChartProps<AreaChartData> & {
  groupKey: string;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  showDots?: boolean;
  curve?: CurveFactory;
  stacked?: boolean;
};

export type AreaChartType = Intergalactic.Component<typeof Flex, AreaChartProps>;
