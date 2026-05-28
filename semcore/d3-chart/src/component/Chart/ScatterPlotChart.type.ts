import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleLinear, ScaleTime } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';

export type ScatterPlotChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type ScatterPlotChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<ScatterPlotChartData>,
  'showTotalInTooltip'
> & {
  /** Field name that groups the data points */
  groupKey: string;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
  /**  Optional field name for additional value data */
  valueKey?: string;
  /** Callback triggered when a user clicks on a scatter item */
  onClickScatterItem?: (index: number, event: React.SyntheticEvent) => void;
};

export type ScatterPlotChartDefaultProps = {
  direction: 'column';
  showXAxis: true;
  showYAxis: true;
  showTooltip: true;
  showLegend: false;
};

export type ScatterPlotChartType = Intergalactic.Component<typeof Flex, ScatterPlotChartProps>;
