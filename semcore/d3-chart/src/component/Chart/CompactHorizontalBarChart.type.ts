import React from 'react';
import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

type BarKey = string;

export type CompactHorizontalBarChartData = Array<Record<BarKey, number | string>>;

export type CompactHorizontalBarChartProps = BaseChartProps<CompactHorizontalBarChartData> & {
  x: string;
  y: string;
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
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
