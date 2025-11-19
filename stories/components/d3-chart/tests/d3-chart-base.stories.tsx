import type { Meta, StoryObj } from '@storybook/react-vite';

import AdaptivePropsExample from './examples/d3-chart/adaptive-props';
import EnforcingPatternsExample from './examples/d3-chart/enforcing-patterns';
import GridAxisPropsExample, { defaultProps as BasicUsageProps } from './examples/d3-chart/grid-axis-props';
import PatternFillExample from './examples/d3-chart/pattern-fill';
import PlotAndA11yPropsExample from './examples/d3-chart/plot-props';
import ReferenceLinePropsExample from './examples/d3-chart/reference-line-props';
import TooltipHoverExample from './examples/d3-chart/tooltip-and-hover-line';
import TooltipControlExample from './examples/d3-chart/tooltip-control';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/D3-Chart',
};

export default meta;

export const PlotAndA11yProps: StoryObj = {
  render: PlotAndA11yPropsExample,
};

export const PatternFill: StoryObj = {
  render: PatternFillExample,
};

export const EnforcingPatterns: StoryObj = {
  render: EnforcingPatternsExample,
};

export const TooltipControl: StoryObj = {
  render: TooltipControlExample,
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
