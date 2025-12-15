import type { ScaleLinear } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';

export type RadarChartData = Record<string, string[] | number[]>;

export type RadarChartProps = BaseChartProps<RadarChartData> & {
  groupKey: string;
  scale?: ScaleLinear<any, any>;
  xScale?: never;
  yScale?: never;
  showDots?: boolean;
  circle?: boolean;
  /** Callback triggered when a user clicks on a chart at a position corresponding to a category */
  onClickRadar?: (index: number, e: React.SyntheticEvent) => void;
};
