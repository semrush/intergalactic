import { Intergalactic } from '@semcore/core';
import { Flex } from '@semcore/flex-box';
import { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';
import Icon from '@semcore/icon';
import { interpolateValue } from '../../utils';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { BaseChartLegendProps } from '../ChartLegend/BaseLegend.type';
import { CurveFactory } from 'd3-shape';

type LegendProps = BaseChartLegendProps & {
  disableSelectItems?: boolean;
  disableCheckedItems?: boolean;
  legendMap?: LegendDataMap;
};

type BaseChartProps = {
  width: number;
  height: number;
  margin?: number;
  colorMap?: Record<string, string>;
  hideTooltip?: boolean;
} & (
  | { hideLegend?: true; legendProps?: never }
  | { hideLegend?: never; legendProps?: LegendProps }
);

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
  data: Array<Record<string | number, number | typeof interpolateValue | Date>>;
  xKey: string | number;
  xScale?: ScaleLinear<any, any> | ScaleTime<any, any>;
  yScale?: ScaleLinear<any, any>;
  disableDots?: boolean;
  disableTooltip?: boolean;
  tooltipValueFormatter?: (value: number | typeof interpolateValue | Date) => string;
  curve?: CurveFactory;
};

type LineChartType = Intergalactic.Component<typeof Flex, LineChartProps>;

export type ChartMap = {
  Line: LineChartType;
};

export type ChartType = keyof ChartMap;
