import type { Intergalactic } from '@semcore/core';
import type React from 'react';

import type { BaseChartProps } from './AbstractChart.type';
import type { interpolateValue } from '../../utils';

export type CigaretteChartDataKey = string;

export type CigaretteChartData = Record<CigaretteChartDataKey, number | typeof interpolateValue>;

export type CigaretteChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<CigaretteChartData>,
  'xScale' | 'yScale'
> & {
  /** Title text displayed in the tooltip */
  tooltipTitle?: string;
  /** Controls whether the tooltip shows all data or single item data */
  tooltipViewType?: 'all' | 'single';
  /** Show percent value in tooltip */
  showPercentValueInTooltip?: boolean;
  /** Custom percent formatter. */
  percentFormatter?: (value: number) => number;
  /** Header content for the chart */
  header?: React.ReactNode;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Click handler that receives the data key and event */
  onClick?: (key: CigaretteChartDataKey, event: React.SyntheticEvent) => void;
  /** Minimal bar width in pixels. Default is `2`. */
  minimalBarWidth?: number;
};

export type CigaretteChartType = Intergalactic.Component<'div', CigaretteChartProps>;
