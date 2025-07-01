import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageWithPropsExample, { basicUsageDefaultProps } from './examples/basic_usage_with_props';
import OnBlurExample from './examples/on-blur-behavior-test';
import StatesExample from './examples/styles';
import CustomTextExample from './examples/with-custom-text';

const meta: Meta = {
  title: 'Components/Inline-Input/Tests',
};

export default meta;
type Story = StoryObj;

export const BasicUsageWithProps: StoryObj<typeof basicUsageDefaultProps> = {
  render: BasicUsageWithPropsExample,
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: basicUsageDefaultProps,
};

export const States: Story = {
  render: StatesExample,
};

export const CustomText: Story = {
  render: CustomTextExample,
};

export const OnBlur: Story = {
  render: OnBlurExample,
};
