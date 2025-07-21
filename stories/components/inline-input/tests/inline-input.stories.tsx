import type { Meta, StoryObj } from '@storybook/react-vite';

import OnBlurExample from './examples/on-blur-behavior-test';
import StatesExample, { stylesDefaultProps } from './examples/styles';
import CustomTextExample from './examples/with-custom-text';

const meta: Meta = {
  title: 'Components/Inline-Input/Tests',
};

export default meta;
type Story = StoryObj;

export const States: StoryObj<typeof stylesDefaultProps> = {
  render: StatesExample,
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
    placeholder: {
      control: { type: 'text' },
    },
    showControls: {
      control: { type: 'boolean' },
    },
    onBlurBehavior: {
      control: { type: 'select' },
      options: ['cancel', 'confirm', 'none'],
    },
  },
  args: stylesDefaultProps,
};

export const CustomText: Story = {
  render: CustomTextExample,
};

export const OnBlur: Story = {
  render: OnBlurExample,
};
