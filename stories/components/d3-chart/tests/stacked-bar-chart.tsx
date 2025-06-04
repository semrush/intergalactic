import type { Meta, StoryObj } from '@storybook/react';

import BasicUsageExample from './examples/stacked-bar-chart/basic-usage';
import LegendAndPatternFillExample from './examples/stacked-bar-chart/legend-and-pattern-fill';
import StackedBarChartExample from './examples/stacked-bar-chart/stacked-bar-chart';
import StackedGroupedBarExample from './examples/stacked-bar-chart/stacked-grouped-bar';
import EdgeCasesExample from './examples/stacked-bar-chart/edge-cases';


const meta: Meta = {
  title: 'Components/d3Charts/Tests/Stacked-Bar-Chart',
};

export default meta;

export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};

export const StackedBarChart: StoryObj = {
  render: StackedBarChartExample,
};

export const StackedGroupedBar: StoryObj = {
  render: StackedGroupedBarExample,
};

export const EdgeCases: StoryObj = {
  render: EdgeCasesExample,
};
