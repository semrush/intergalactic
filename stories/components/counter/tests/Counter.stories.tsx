import Counter from '@semcore/ui/counter';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CounterExample, { defaultProps as CounterDefProps } from './examples/counter';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter/Tests',
  component: Counter,
};

export default meta;

export const CounterBase: StoryObj<typeof CounterDefProps> = {
  render: CounterExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['s', 'm', 'l'],
    },
    theme: {
      control: { type: 'select' },
      options: ['warning', 'danger', 'info', 'bg-primary-neutral', ''],
    },
  },
  args: CounterDefProps,
};
