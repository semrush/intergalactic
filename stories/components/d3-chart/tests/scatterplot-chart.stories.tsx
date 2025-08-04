import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/scatterplot-chart/basic-usage';
import ColorCustomizationAndValuesInsideExample from './examples/scatterplot-chart/color-customization-and-values-inside';
import LegendAndPatternFillExample from './examples/scatterplot-chart/legend-and-pattern-fill';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Scatterplot-Chart',
};

export default meta;

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

export const ColorCustomizationAndValuesInside: StoryObj = {
  render: ColorCustomizationAndValuesInsideExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};
