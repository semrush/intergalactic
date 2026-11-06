import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import type { BaseChartProps } from './AbstractChart.type';

export type ScoreBarChartData = Array<Record<string, number | string>>;

export type ScoreBarChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<ScoreBarChartData>,
  'showTotalInTooltip' | 'showDeltaPercentInTooltip' | 'getPercentDelta' | 'deltaPercentGrowthColor'
> & {
  /** Field name from data array for the x-axis values */
  x: string;
  /** Field name from data array for the y-axis values */
  y: string;
  /** Custom x-axis scale */
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;

  /** Handle click by `HoverRect`. `index` is an index of the data array. */
  onClickHoverRect?: (index: number, e: React.SyntheticEvent) => void;

  /** Handle click by Bar. */
  onClickBar?: (barItem: number, e: React.SyntheticEvent) => void;
  /**
   * Value for 100% of bars.
   * @default sum of all bars values.
   */
  totalValue?: number;
};

export type ScoreBarChartDefaultProps = {
  direction: 'column';
  showXAxis: false;
  showYAxis: false;
  showTooltip: true;
  showLegend: false;
  locale: 'en';
};

export type ScoreBarChartType = Intergalactic.Component<typeof Flex, ScoreBarChartProps>;
