import type { Meta, StoryObj } from '@storybook/react';

import BasicUsageExample from './examples/donut-chart/donut-props';
import SemiDonutExample from './examples/donut-chart/semi-donut';
import LegendAndPatternFillExample from './examples/donut-chart/legend-and-pattern-fill';


const meta: Meta = {
  title: 'Components/d3Charts/Tests/Donut-Chart',
};

export default meta;


export const BasicUsage: StoryObj = {
  render: BasicUsageExample,
};

export const SemiDonutWithOneActive: StoryObj = {
  render: SemiDonutExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};