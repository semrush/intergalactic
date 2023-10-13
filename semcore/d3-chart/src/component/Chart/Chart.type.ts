import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';
import Icon from '@semcore/icon';
import { interpolateValue } from '../../utils';
import { ScaleLinear } from 'd3-scale';

type BaseChartProps = {
  width: number;
  height: number;
  margin?: number;
  colorMap?: Record<string, string>;
};

type LegendDataMap = Record<
  LegendItemKey,
  {
    label?: string;
    additionalInfo?: string;
    count?: number;
    icon?: typeof Icon;
    defaultChecked?: boolean;
  }
>;

export type LineChartProps = BaseChartProps & {
  data: Array<Record<string | number, number | typeof interpolateValue>>;
  xKey: string | number;
  legendMap?: LegendDataMap;
  xScale?: ScaleLinear<any, any>;
  yScale?: ScaleLinear<any, any>;
};

type LineChartType = Intergalactic.Component<typeof Flex, LineChartProps>;

export type ChartMap = {
  Line: LineChartType;
};

export type ChartType = keyof ChartMap;
