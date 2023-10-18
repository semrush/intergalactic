import { FlexProps } from '@semcore/flex-box';
import { LegendItemKey } from '../ChartLegend/LegendItem/LegendItem.type';
import Icon from '@semcore/icon';
import { BaseChartLegendProps } from '../ChartLegend/BaseLegend.type';
import { LineChartType } from './LineChart.type';

type LegendProps = BaseChartLegendProps & {
  disableSelectItems?: boolean;
  disableCheckedItems?: boolean;
  legendMap?: LegendDataMap;
};

export type BaseChartProps = FlexProps & {
  width: number;
  height: number;
  margin?: number;
  colorMap?: Record<string, string>;
  hideTooltip?: boolean;
} & (
    | { hideLegend?: true; legendProps?: never }
    | { hideLegend?: never; legendProps?: Partial<LegendProps> }
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

export type ChartMap = {
  Line: LineChartType;
};

export type ChartType = keyof ChartMap;
