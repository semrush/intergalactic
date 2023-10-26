import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { interpolateValue } from '../../utils';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { CurveFactory } from 'd3-shape';
import { BaseChartProps } from './AbstractChart.type';

export type AreaChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type AreaChartProps = BaseChartProps<AreaChartData> & {
  groupKey: string;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  hideDots?: boolean;
  curve?: CurveFactory;
  stacked?: boolean;
};

export type AreaChartType = Intergalactic.Component<typeof Flex, AreaChartProps>;
