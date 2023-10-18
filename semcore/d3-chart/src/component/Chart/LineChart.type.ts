import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { interpolateValue } from '../../utils';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { CurveFactory } from 'd3-shape';
import { BaseChartProps } from './Chart.type';

export type LineChartProps = BaseChartProps & {
  data: Array<Record<string | number, number | typeof interpolateValue | Date>>;
  xKey: string | number;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  disableDots?: boolean;
  disableTooltip?: boolean;
  tooltipValueFormatter?: (value: number | typeof interpolateValue | Date) => string;
  curve?: CurveFactory;
};

export type LineChartType = Intergalactic.Component<typeof Flex, LineChartProps>;
