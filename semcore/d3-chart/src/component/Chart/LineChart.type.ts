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

type ReferenceLine = {
  /**
   * Simple reference line.
   */
  value: string;

  /**
   * Size of area near line
   */
  area?: number;
};

type ReferenceArea = {
  /**
   * Reference line with area.
   */
  value: [string, string];
  /**
   * @default neutral.
   */
  use?: 'neutral' | 'insight' | 'good' | 'bad';
  /**
   * Title of the area.
   */
  title?: string;
  /**
   * Custom subtitle with data.
   */
  subTitle?: string;
};

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
  /**
   * Settings for render reference line.
   */
  referenceLine?: ReferenceLine;
  /**
   * Settings for render reference area.
   */
  referenceArea?: ReferenceArea;
};

export type LineChartDefaultProps = {
  direction: 'column';
  showXAxis: true;
  showYAxis: true;
  showTooltip: true;
  locale: 'en';
  deltaPercentGrowthColor: 'good';
};

export type LineChartType = Intergalactic.Component<typeof Flex, LineChartProps>;
