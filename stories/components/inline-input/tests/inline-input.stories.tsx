import type { Meta, StoryObj } from '@storybook/react';

import OnBlurExample from './examples/on-blur-behavior-test';
import StatesExample from './examples/styles';
import CustomTextExample from './examples/with-custom-text';

const meta: Meta = {
  title: 'Components/Inline-Input/Tests',
};

export default meta;
type Story = StoryObj;

export const States: Story = {
  render: StatesExample,
};

export const CustomText: Story = {
  render: CustomTextExample,
};

export const OnBlur: Story = {
  render: OnBlurExample,
};
