import React from 'react';
import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';
import { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';

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
