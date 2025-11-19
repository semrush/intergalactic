import type { BarChartProps } from '@semcore/ui/d3-chart';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BarPropsExample, { defaultProps as BarPropsDefaultProps } from './examples/bar-chart/bars-props';
import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/bar-chart/basic-usage';
import { getChartArgTypes } from './examples/stories_props_helper';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Chart',
};

export default meta;

export const BarProps: StoryObj = {
  render: BarPropsExample,
  argTypes: {
    barColor: { control: 'color' },
    barRadius: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    barHMin: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    barHide: { control: 'boolean' },
    barTransparent: { control: 'boolean' },
    maxBarSize: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
  },
  args: BarPropsDefaultProps,
};

export const BasicUsage = {
  render: BasicUsageExample,
  argTypes: getChartArgTypes({
    type: { control: 'select', options: ['stack', 'group'] },
  }),
  args: BasicUsageProps,
};
