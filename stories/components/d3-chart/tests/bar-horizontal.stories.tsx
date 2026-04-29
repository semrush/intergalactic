import type { Meta, StoryObj } from '@storybook/react-vite';

import HorizontalBarPropsExample, { defaultProps as HorizontalBarPropsDefaultProps } from './examples/bar-horizontal/horizontal-bar-props';
const meta: Meta = {
  title: 'Components/d3Charts/Tests/Bar-Horizontal-Chart',
};
export default meta;
export const HorizontalBarProps: StoryObj = {
  render: HorizontalBarPropsExample,
  argTypes: {
    barColor: { control: 'color' },
    barRadius: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    barTransparent: { control: 'boolean' },
    maxBarSize: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
    primaryText: { control: 'boolean' },
  },
  args: HorizontalBarPropsDefaultProps,
};
