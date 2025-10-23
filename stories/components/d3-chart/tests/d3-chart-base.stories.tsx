import type { Meta, StoryObj } from '@storybook/react-vite';

import AdaptivePropsExample from './examples/d3-chart/adaptive-props';
import GridAxisPropsExample, { defaultProps as BasicUsageProps } from './examples/d3-chart/grid-axis-props';
import PlotAndA11yPropsExample from './examples/d3-chart/plot-props';
import ReferenceLinePropsExample from './examples/d3-chart/reference-line-props';
import TooltipHoverExample from './examples/d3-chart/tooltip-and-hover-line';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/D3-Chart',
};

export default meta;

export const PlotAndA11yProps: StoryObj = {
  render: PlotAndA11yPropsExample,
};

export const GridAxisProps: StoryObj<typeof BasicUsageProps> = {
  render: GridAxisPropsExample,
  argTypes: {
    multiline: {
      control: 'select',
      options: [true, false, undefined],
    },
  },
  args: BasicUsageProps,
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
