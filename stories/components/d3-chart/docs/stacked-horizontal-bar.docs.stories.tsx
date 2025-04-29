import type { Meta, StoryObj } from '@storybook/react';

import HorizontalStackedBarExample from './examples/stacked-horizontal-bar/horizontal-stacked-bar';
import LegendAndPatternFillExample from './examples/stacked-horizontal-bar/legend-and-pattern-fill';

const meta: Meta = {
  title: 'Components/d3Charts/Documentation/Stacked-Horizontal-Bar',
};

export default meta;

export const HorizontalStackedBar: StoryObj = {
  render: HorizontalStackedBarExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};
