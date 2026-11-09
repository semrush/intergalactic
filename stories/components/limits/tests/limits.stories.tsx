import type { Meta, StoryObj } from '@storybook/react-vite';

import UsageMeterExample, { defaultProps as defaultUsageMeterExampleProps } from './examples/usage-meter';

const meta: Meta = {
  title: 'Components/Limits/Tests',
};

export default meta;

export const UsageMeter: StoryObj<typeof defaultUsageMeterExampleProps> = {
  render: UsageMeterExample,
  argTypes: {
    min: {
      control: { type: 'number' },
    },
    max: {
      control: { type: 'number' },
    },
    value: {
      control: { type: 'number' },
    },
    feature: {
      control: { type: 'text' },
    },
    theme: {
      control: { type: 'select' },
      options: ['default', 'invert'],
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'warning'],
    },
  },
  args: defaultUsageMeterExampleProps,
};
