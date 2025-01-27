import type React from 'react';
import type { Intergalactic } from '@semcore/core';
import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';

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
