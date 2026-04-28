import type { Meta, StoryObj } from '@storybook/react-vite';

import StackBarPropsExample, { defaultProps as StackBarPropsDefaultProps } from './examples/stacked-bar-chart/stack-bar-props-cases';

const meta: Meta = {
  title: 'Components/d3Charts/Tests/Stacked-Bar-Chart',
};

export default meta;

export const StackBarProps: StoryObj = {
  render: StackBarPropsExample,
  argTypes: {
    barColor1: {
      control: { type: 'select' },
      options: ['#3498db', 'yellow'],
    },
    barColor2: {
      control: { type: 'select' },
      options: ['#3bdb30ff', 'pink'],
    }, barColor3: {
      control: { type: 'select' },
      options: ['#db309fff', 'violet'],
    },
    barRadius: { control: { type: 'number', min: 0, max: 20, step: 1 } },
    barHMin: { control: { type: 'number', min: 0, max: 50, step: 1 } },
    barTransparent: { control: 'boolean' },
    maxBarSize: { control: { type: 'number', min: 10, max: 100, step: 5 } },
    duration: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
  },
  args: StackBarPropsDefaultProps,
};
