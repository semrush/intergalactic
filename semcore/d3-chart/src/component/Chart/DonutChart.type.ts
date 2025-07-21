import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear } from 'd3-scale';
import type React from 'react';

import type { BaseChartProps } from './AbstractChart.type';

export type DataKey = string;

export type DonutChartData = Record<DataKey, number>;

export type DonutChartProps = BaseChartProps<DonutChartData> & {
  groupKey?: never;
  xScale?: ScaleLinear<any, any>;
  yScale?: ScaleLinear<any, any>;
  innerRadius?: number;
  halfsize?: boolean;
  innerLabel?: React.ReactNode;
  /** Callback triggered when a user clicks on a pie */
  onClickPie: (key: DataKey, e: React.SyntheticEvent) => void;
};

export type DonutChartType = Intergalactic.Component<typeof Flex, DonutChartProps>;
