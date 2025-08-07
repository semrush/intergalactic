import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/stacked-horizontal-bar/basic-usage';
import HorizontalStackedBarExample from './examples/stacked-horizontal-bar/horizontal-stacked-bar';
import HorizontalStackedBarNegativeExample from './examples/stacked-horizontal-bar/horizontal-stacked-bar-negative';
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

export const BasicUsage: StoryObj<typeof BasicUsageProps> = {
  render: BasicUsageExample,
  argTypes: {
    showLegend: {
      control: 'select',
      options: [true, false, undefined],
    },
  },
  args: BasicUsageProps,
};
