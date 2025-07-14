import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear, ScaleTime } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';

export type ScatterPlotChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type ScatterPlotChartProps = BaseChartProps<ScatterPlotChartData> & {
  /** Field name that groups the data points */
  groupKey: string;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
  /**  Optional field name for additional value data */
  valueKey?: string;
};

export type ScatterPlotChartType = Intergalactic.Component<typeof Flex, ScatterPlotChartProps>;
