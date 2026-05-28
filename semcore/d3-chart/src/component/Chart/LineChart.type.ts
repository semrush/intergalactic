import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import type { CurveFactory } from 'd3-shape';

import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';
import type { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';

type AreaItem = {
  x: number;
  y0: number;
  y1: number;
};

export type LineChartData = Array<Record<string, string | number | typeof interpolateValue | Date>>;

export type LineChartProps = BaseChartProps<LineChartData> & {
  /**  Field name that groups the data points */
  groupKey: string;
  /** Optional area data for rendering filled areas under lines */
  area?: Record<LegendItemKey, AreaItem[]>;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
  /** Controls whether to display dots on the line chart */
  showDots?: boolean;
  /** D3 curve factory for line interpolation */
  curve?: CurveFactory;
  /** Curve factory specifically for area rendering */
  areaCurve?: CurveFactory;
  /** Callback triggered when a user clicks on a line */
  onClickLine?: (index: number, event: React.SyntheticEvent) => void;
};

export type LineChartDefaultProps = {
  direction: 'column';
  showXAxis: true;
  showYAxis: true;
  showTooltip: true;
};

export type LineChartType = Intergalactic.Component<typeof Flex, LineChartProps>;
