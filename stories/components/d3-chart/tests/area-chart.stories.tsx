import type { AreaChartProps } from '@semcore/d3-chart';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AnimatedDotsExample from './examples/area-chart/animated-dots';
import BasicUsageExample, { defaultProps as areaExampleProps } from './examples/area-chart/basic-usage';
import DifferentPropsExample from './examples/area-chart/different-props';
import { getChartArgTypes } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Area-Chart',
};

export default meta;

export const DifferentProps: StoryObj = {
  render: DifferentPropsExample,
};

export const AnimatedDots: StoryObj = {
  render: AnimatedDotsExample,
};

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: areaExampleProps,
};
