import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import type { CurveFactory } from 'd3-shape';

import type { AriaNameProps, BaseChartProps } from './AbstractChart.type';
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
  /** Callback triggered when a user clicks on a chart at a position corresponding to a data item */
  onClickArea?: (index: number, event: React.SyntheticEvent) => void;
};

export type AreaChartDefaultProps = {
  direction: 'column';
  showXAxis: true;
  showYAxis: true;
  showTooltip: true;
};

export type AreaChartType = Intergalactic.Component<typeof Flex, Intergalactic.InternalTypings.EfficientOmit<AreaChartProps, 'showLegend'> & { showLegend?: boolean } & AriaNameProps>;
