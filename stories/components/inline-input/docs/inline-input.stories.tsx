import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample from './examples/basic_usage';
import InheritingTextSizeExample from './examples/inheriting_text_size';
import NumberOnlyInputExample from './examples/number-only_input';

const meta: Meta = {
  title: 'Components/Inline-Input/Documentation',
};

export default meta;
type Story = StoryObj;

export const BasicUsage: Story = {
  render: BasicUsageExample,
};

export const InheritingTextSize: Story = {
  render: InheritingTextSizeExample,
};

export const NumberOnlyInput: Story = {
  render: NumberOnlyInputExample,
};
