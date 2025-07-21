import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear, ScaleTime } from 'd3-scale';
import type { CurveFactory } from 'd3-shape';

import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';

export type AreaChartData = Array<Record<string, number | typeof interpolateValue | Date>>;

export type AreaChartProps = BaseChartProps<AreaChartData> & {
  groupKey: string;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  showDots?: boolean;
  curve?: CurveFactory;
  stacked?: boolean;
  /** Callback triggered when a user clicks on a chart at a position corresponding to a data item */
  onClickArea: (index: number, event: React.SyntheticEvent) => void;
};

export type AreaChartType = Intergalactic.Component<typeof Flex, AreaChartProps>;
