import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { interpolateValue } from '../../utils';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import type { BaseChartProps } from './AbstractChart.type';

export type ScatterPlotChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type ScatterPlotChartProps = BaseChartProps<ScatterPlotChartData> & {
  groupKey: string;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  valueKey?: string;
};

export type ScatterPlotChartType = Intergalactic.Component<typeof Flex, ScatterPlotChartProps>;
