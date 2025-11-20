import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizableLegendExample, { defaultProps as args } from './examples/chart-legend/customizable_legend';
import LegendShapesColumnExample from './examples/chart-legend/shapes-column';
import LegendShapesRowExample from './examples/chart-legend/shapes-row';

const meta: Meta = {
  title: 'Components/d3Charts/tests/ChartLegend',
};

export default meta;

export const CustomizableLegend = {
  render: CustomizableLegendExample,
  args,
};

export const LegendShapesColumn: StoryObj = {
  render: LegendShapesColumnExample,
};

export const LegendShapesRow: StoryObj = {
  render: LegendShapesRowExample,
};
