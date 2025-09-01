import TimePicker from '@semcore/time-picker';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DifferentCasesExample, { defaultProps as baseExampleProps2 } from './examples/different_cases';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker/Tests',
  component: TimePicker,
};

export default meta;

export const DifferentCases: StoryObj<typeof baseExampleProps2> = {
  render: DifferentCasesExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid'],
    },
    is12Hour: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    value: {
      control: { type: 'text' },
      description: 'Time in the hh:mm format',
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'Default value if `value` property is not provided',
    },
    step: {
      control: { type: 'number' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    locale: {
      control: { type: 'select' },
      options: ['ko', 'pl'],
    },

  },
  args: baseExampleProps2,
};
