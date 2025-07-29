import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/donut-chart/donut-props';
import ShowLegendPropExample, { defaultProps as ShowLegendPropExampleProps } from './examples/donut-chart/donut-show-legend-prop';
import LegendAndPatternFillExample from './examples/donut-chart/legend-and-pattern-fill';
import SemiDonutExample from './examples/donut-chart/semi-donut';

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

export const ShowLegendProp: StoryObj<typeof ShowLegendPropExample> = {
  render: ShowLegendPropExample,
  argTypes: {
    showLegend: {
      control: 'select',
      options: [true, false, undefined],
    },
    data: {
      control: 'object',
    },
  },
  args: ShowLegendPropExampleProps,
};
