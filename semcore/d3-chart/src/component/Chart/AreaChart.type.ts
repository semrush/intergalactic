import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import type { CurveFactory } from 'd3-shape';

import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';

export type AreaChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type AreaChartProps = BaseChartProps<AreaChartData> & {
  /** Field name that groups the data points */
  groupKey: string;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
  /** Controls whether to display dots on the area chart lines */
  showDots?: boolean;
  /** D3 curve factory for line interpolation (e.g., curveLinear, curveCardinal) */
  curve?: CurveFactory;
  /**  Enables stacked area chart mode */
  stacked?: boolean;
};

export type AreaChartType = Intergalactic.Component<typeof Flex, AreaChartProps>;
