import type { Meta, StoryObj } from '@storybook/react';

import BarPropsExample from './examples/bar-chart/bars-props';
import BarExample from './examples/bar-chart/bar';
import BasicUsageExample from './examples/bar-chart/basic-usage';
import DateFormatExample from './examples/bar-chart/date-format-with-tooltip';
import GroupedBarsExample from './examples/bar-chart/grouped-bars';
import LegendAndPatternFillExample from './examples/bar-chart/legend-and-pattern-fill';
import NegativeValuesExample from './examples/bar-chart/negative-values';
import TooltipExample from './examples/bar-chart/tooltip';
import TrendLineExample from './examples/bar-chart/trend-line';
import BarHoverExample from './examples/bar-chart/bar-hover';


const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Chart',
};

export default meta;

export const BarProps: StoryObj = {
  render: BarPropsExample,
};

export const BarHover: StoryObj = {
  render: BarHoverExample,
};

export const Bar: StoryObj = {
  render: BarExample,
};

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const DateFormat: StoryObj = {
  render: DateFormatExample,
};

export const GroupedBars: StoryObj = {
  render: GroupedBarsExample,
};

export const NegativeValues: StoryObj = {
  render: NegativeValuesExample,
};

export const Tooltip: StoryObj = {
  render: TooltipExample,
};

export const TrendLine: StoryObj = {
  render: TrendLineExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};