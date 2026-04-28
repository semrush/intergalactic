import type { Meta, StoryObj } from '@storybook/react-vite';

import AnimatedDotsExample from './examples/area-chart/animated-dots';
import BasicUsageExample, { defaultProps as areaExampleProps } from './examples/area-chart/basic-usage';
import { getChartArgTypes } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Area-Chart',
};

export default meta;

export const AnimatedDots: StoryObj = {
  render: AnimatedDotsExample,
};

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes(),
  args: areaExampleProps,
};
