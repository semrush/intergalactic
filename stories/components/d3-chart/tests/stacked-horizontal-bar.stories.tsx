import type { Meta, StoryObj } from '@storybook/react';

import HorizontalStackedBarNegativeExample from './examples/stacked-horizontal-bar/horizontal-stacked-bar-negative';
import HorizontalStackedBarExample from './examples/stacked-horizontal-bar/horizontal-stacked-bar';
import LegendAndPatternFillExample from './examples/stacked-horizontal-bar/legend-and-pattern-fill';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Stacked-Horizontal-Bar',
};

export default meta;

export const HorizontalStackedBar: StoryObj = {
  render: HorizontalStackedBarExample,
};

export const HorizontalStackedBarNegative: StoryObj = {
  render: HorizontalStackedBarNegativeExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};