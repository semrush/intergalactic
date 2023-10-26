import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { interpolateValue } from '../../utils';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

export type ScatterPlotChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type ScatterPlotChartProps = BaseChartProps<ScatterPlotChartData> & {
  groupKey: string;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  valueKey?: string;
};

export type ScatterPlotChartType = Intergalactic.Component<typeof Flex, ScatterPlotChartProps>;
