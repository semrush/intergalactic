import Switch from '@semcore/switch';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomIconOnToggleExample, { defaultProps as CustomIconOnToggleProps } from './examples/custom-icon-on-toggle';
import type { defaultProps as LongTextProps } from './examples/long-text-addon';
import LongTextExample from './examples/long-text-addon';
import BasicExample, { defaultProps as BasicProps } from './examples/switch-with-input-props';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch/Tests',
  component: Switch,
};

export default meta;
export const CustomIconOnToggle: StoryObj<typeof CustomIconOnToggleProps> = {
  render: CustomIconOnToggleExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
    defaultChecked: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select' },
      options: ['info', 'success', 'blanchedalmond', 'dark-violet', '#3eeb4c'],
    },
  },
  args: CustomIconOnToggleProps,
};

export const Basic: StoryObj<typeof BasicProps> = {
  render: BasicExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
    defaultChecked: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select' },
      options: ['info', 'success', 'blanchedalmond', 'dark-violet', '#3eeb4c'],
    },
  },
  args: BasicProps,
};

export const LongText: StoryObj<typeof LongTextProps> = {
  render: LongTextExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select' },
      options: ['info', 'success', 'blanchedalmond', 'dark-violet', '#3eeb4c'],
    },
  },
  args: BasicProps,
};
