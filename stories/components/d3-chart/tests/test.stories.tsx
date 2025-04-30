import type { Meta, StoryObj } from '@storybook/react';

import PlotAndA11yPropsExample from './examples/d3-chart/plot-props';
import GridPropsExample from './examples/d3-chart/grid-props';



const meta: Meta = {
  title: 'Components/d3Charts/tests/D3-Chart',
};

export default meta;

export const PlotAndA11yProps: StoryObj = {
  render: PlotAndA11yPropsExample,
};

export const GridProps: StoryObj = {
  render: GridPropsExample,
};
