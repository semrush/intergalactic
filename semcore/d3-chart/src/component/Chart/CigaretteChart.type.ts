import React from 'react';
import { Intergalactic } from '@semcore/core';
import { BaseChartProps } from './AbstractChart.type';
import { interpolateValue } from '../../utils';

type DataKey = string;

export type CigaretteChartData = Record<DataKey, number | typeof interpolateValue>;

export type CigaretteChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<CigaretteChartData>,
  'xScale' | 'yScale'
> & {
  tooltipTitle?: string;
  tooltipViewType?: 'all' | 'single';
  header?: React.ReactNode;
  duration?: number;
  onClick?: (key: DataKey, event: React.SyntheticEvent) => void;
};

export type CigaretteChartType = Intergalactic.Component<'div', CigaretteChartProps>;
