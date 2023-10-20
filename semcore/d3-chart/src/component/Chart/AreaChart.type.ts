import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { interpolateValue } from '../../utils';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { CurveFactory } from 'd3-shape';
import { BaseChartProps } from './AbstractChart.type';

type AreaChartValue = number | typeof interpolateValue | Date;

export type AreaChartProps = BaseChartProps & {
  data: Array<Record<string, AreaChartValue>>;
  groupKey: string;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  disableDots?: boolean;
  curve?: CurveFactory;
  stacked?: boolean;
};

export type AreaChartType = Intergalactic.Component<typeof Flex, AreaChartProps>;
