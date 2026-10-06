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
const storyKnob = { table: { category: 'Story data knobs' } } as const;

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes({
    showDots: { control: 'boolean' },
    stacked: { control: 'boolean' },

    useCustomValueFormatter: { control: 'boolean', ...storyKnob },
    withZeroValue: { control: 'boolean', ...storyKnob },
    singleSeries: { control: 'boolean', ...storyKnob },
    withInterpolatedGaps: { control: 'boolean', ...storyKnob },
    curveName: {
      control: 'select',
      options: ['linear', 'cardinal', 'monotoneX', 'step', 'basis'],
      ...storyKnob,
    },
    highlightDots: {
      control: 'select',
      options: ['none', 'good', 'bad', 'insightful', 'mixed'],
      ...storyKnob,
    },
    dataType: {
      control: 'select',
      options: ['none', 'forecast', 'potential', 'both'],
      ...storyKnob,
    },
  }),
  args: areaExampleProps,
};
