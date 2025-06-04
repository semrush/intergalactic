import type { Meta, StoryObj } from '@storybook/react';

import PlotAndA11yPropsExample from './examples/d3-chart/plot-props';
import GridAxisPropsExample from './examples/d3-chart/grid-axis-props';
import ReferenceLinePropsExample from './examples/d3-chart/reference-line-props';
import AdaptivePropsExample from './examples/d3-chart/adaptive-props';
import TooltipHoverExample from './examples/d3-chart/tooltip-and-hover-line';



const meta: Meta = {
  title: 'Components/d3Charts/Tests/D3-Chart',
};

export default meta;

export const PlotAndA11yProps: StoryObj = {
  render: PlotAndA11yPropsExample,
};

export const GridAxisProps: StoryObj = {
  render: GridAxisPropsExample,
};

export const ReferenceLineProps: StoryObj = {
  render: ReferenceLinePropsExample,
};

export const AdaptiveProps: StoryObj = {
  render: AdaptivePropsExample,
};

export const TooltipHover: StoryObj = {
  render: TooltipHoverExample,
};