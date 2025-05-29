import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { interpolateValue } from '../../utils';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import type { CurveFactory } from 'd3-shape';
import type { BaseChartProps } from './AbstractChart.type';
import type { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';

type AreaItem = {
  x: number;
  y0: number;
  y1: number;
};

export type LineChartData = Array<Record<string, string | number | typeof interpolateValue | Date>>;

export type LineChartProps = BaseChartProps<LineChartData> & {
  groupKey: string;
  area?: Record<LegendItemKey, AreaItem[]>;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  showDots?: boolean;
  curve?: CurveFactory;
  areaCurve?: CurveFactory;
};

export type LineChartType = Intergalactic.Component<typeof Flex, LineChartProps>;
