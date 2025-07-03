import type { Meta, StoryObj } from '@storybook/react-vite';

import AllControlsExample, { defaultProps } from './examples/all-controls';

const meta: Meta = {
  title: 'Patterns/UX Patterns/Feature Highlight/Advanced',
};

export const AllControls: StoryObj<typeof defaultProps> = {
  render: AllControlsExample,
  argTypes: {
    disabled: { control: 'boolean' },
    active: { control: 'boolean' },
    loading: { control: 'boolean' },
    animatedSparkleCount: { control: 'number' },
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl'],
    },
    checked: { control: 'boolean' },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid'],
    },
  },
  args: defaultProps,
};

export default meta;
