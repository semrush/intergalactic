import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizableLegendExample, { defaultProps as args } from './examples/chart-legend/customizable_legend';

const meta: Meta = {
  title: 'Components/d3Charts/tests/ChartLegend',
};

export default meta;

export const CustomizableLegend = {
  render: CustomizableLegendExample,
  args,
};
