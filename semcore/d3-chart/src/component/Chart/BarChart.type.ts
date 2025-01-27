import React from 'react';
import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import type { BaseChartProps } from './AbstractChart.type';
import type { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';

type TrendItem = {
  x: number;
  y: number;
};

type BarKey = string;

export type BarChartData = Array<Record<BarKey, string | number | Date>>;

export type BarChartProps = BaseChartProps<BarChartData> & {
  groupKey: string;
  xScale?: ScaleBand<any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  type?: 'stack' | 'group';
  trend?: Record<LegendItemKey, TrendItem[]>;

  /** Handle click by `HoverRect`. `index` is an index of the data array. */
  onClickHoverRect?: (index: number, e: React.SyntheticEvent) => void;

  /** Handle click by Bar. */
  onClickBar?: (barItem: number, barKey: BarKey, e: React.SyntheticEvent) => void;
};

export type BarChartType = Intergalactic.Component<typeof Flex, BarChartProps>;
