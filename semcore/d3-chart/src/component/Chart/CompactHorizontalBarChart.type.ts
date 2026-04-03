import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import type React from 'react';

import type { BaseChartProps } from './AbstractChart.type';

type BarKey = string;

export type CompactHorizontalBarChartData = Array<Record<BarKey, number | string>>;

export type CompactHorizontalBarChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<CompactHorizontalBarChartData>,
  'showTotalInTooltip'
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
};

export type CompactHorizontalBarChartType = Intergalactic.Component<
  typeof Flex,
  CompactHorizontalBarChartProps
>;
