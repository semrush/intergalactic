import type { Flex } from '@semcore/base-components';
import type { Intergalactic } from '@semcore/core';
import type { ScaleLinear } from 'd3-scale';
import type React from 'react';

import type { BaseChartProps } from './AbstractChart.type';

export type DataKey = string;

export type DonutChartData = Record<DataKey, number>;

export type DonutChartProps = Intergalactic.InternalTypings.EfficientOmit<
  BaseChartProps<DonutChartData>,
  'showTotalInTooltip'
> & {
  /** Internal */
  groupKey?: never;
  /** Custom x-axis scale */
  xScale?: ScaleLinear<any, any>;
  /** Custom y-axis scale */
  yScale?: ScaleLinear<any, any>;
  /** Controls the inner radius of the donut */
  innerRadius?: number;
  /** Creates a semi-donut chart when enabled */
  halfsize?: boolean;
  /** Content displayed in the center of the donut */
  innerLabel?: React.ReactNode;
  /** Callback triggered when a user clicks on a pie */
  onClickPie?: (key: DataKey, e: React.SyntheticEvent) => void;
};

export type DonutChartDefaultProps = {
  direction: 'row-reverse';
  alignItems: 'flex-start';
  innerRadius: 100;
  marginX: 0;
  marginY: 0;
};

export type DonutChartType = Intergalactic.Component<typeof Flex, DonutChartProps>;
