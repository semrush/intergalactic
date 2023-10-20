import React from 'react';
import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { ScaleLinear } from 'd3-scale';
import { BaseChartProps } from './AbstractChart.type';

export type DonutChartProps = BaseChartProps & {
  data: Record<string, number>;
  groupKey?: never;
  xScale?: ScaleLinear<any, any>;
  yScale?: ScaleLinear<any, any>;
  innerRadius?: number;
  halfsize?: boolean;
  innerLabel?: React.ReactNode;
};

export type DonutChartType = Intergalactic.Component<typeof Flex, DonutChartProps>;
