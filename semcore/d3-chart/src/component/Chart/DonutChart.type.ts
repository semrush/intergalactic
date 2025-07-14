import type { Intergalactic } from '@semcore/core';
import type { Flex } from '@semcore/flex-box';
import type { ScaleLinear } from 'd3-scale';
import type React from 'react';

import type { BaseChartProps } from './AbstractChart.type';

export type DonutChartData = Record<string, number>;

export type DonutChartProps = BaseChartProps<DonutChartData> & {
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
};

export type DonutChartType = Intergalactic.Component<typeof Flex, DonutChartProps>;
