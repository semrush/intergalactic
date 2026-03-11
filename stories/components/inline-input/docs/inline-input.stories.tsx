import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { basicUsageDefaultProps } from './examples/basic_usage';
import InheritingTextSizeExample from './examples/inheriting_text_size';
import NumberOnlyInputExample from './examples/number-only_input';

const meta: Meta = {
  title: 'Components/Inline-Input/Documentation',
};

export default meta;
type Story = StoryObj;

export const BasicUsage: Story = {
  render: BasicUsageExample,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    autoFocus: {
      control: { type: 'boolean' },
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'valid', 'invalid'],
    },
    defaultValue: {
      control: { type: 'text' },
    },
  },
  args: basicUsageDefaultProps,
};

export const InheritingTextSize: Story = {
  render: InheritingTextSizeExample,
};

export const NumberOnlyInput: Story = {
  render: NumberOnlyInputExample,
};
