import type { Intergalactic } from '@semcore/core';
import type React from 'react';

import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';

type DataKey = string;

export type CigaretteChartData = Record<DataKey, number | typeof interpolateValue>;

export type CigaretteChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<CigaretteChartData>,
  'xScale' | 'yScale'
> & {
  /** Title text displayed in the tooltip */
  tooltipTitle?: string;
  /** Controls whether the tooltip shows all data or single item data */
  tooltipViewType?: 'all' | 'single';
  /** Header content for the chart */
  header?: React.ReactNode;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Click handler that receives the data key and event */
  onClick?: (key: DataKey, event: React.SyntheticEvent) => void;
};
