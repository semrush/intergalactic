import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear, ScaleTime } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';

export type ScatterPlotChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type ScatterPlotChartProps = BaseChartProps<ScatterPlotChartData> & {
  groupKey: string;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  valueKey?: string;
  /** Callback triggered when a user clicks on a scatter item */
  onClickScatterItem: (index: number, event: React.SyntheticEvent) => void;
};

export type ScatterPlotChartType = Intergalactic.Component<typeof Flex, ScatterPlotChartProps>;
