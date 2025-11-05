import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/scatterplot-chart/basic-usage';
import ColorCustomizationAndValuesInsideExample from './examples/scatterplot-chart/color-customization-and-values-inside';
import LegendAndPatternFillExample from './examples/scatterplot-chart/legend-and-pattern-fill';
import { getChartArgTypes } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Scatterplot-Chart',
};

export default meta;

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: BasicUsageProps,
};

export const ColorCustomizationAndValuesInside: StoryObj = {
  render: ColorCustomizationAndValuesInsideExample,
};

export const LegendAndPatternFill: StoryObj = {
  render: LegendAndPatternFillExample,
};
