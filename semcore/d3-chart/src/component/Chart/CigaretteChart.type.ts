import React from 'react';
import { Intergalactic } from '@semcore/core';
import { BaseChartProps } from './AbstractChart.type';
import { interpolateValue } from '../../utils';

export type CigaretteChartData = Record<string, number | typeof interpolateValue>;

export type CigaretteChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<CigaretteChartData>,
  'xScale' | 'yScale'
> & {
  tooltipTitle?: string;
  tooltipViewType?: 'all' | 'single';
  header?: React.ReactNode;
  duration?: number;
};

export type CigaretteChartType = Intergalactic.Component<'div', CigaretteChartProps>;
