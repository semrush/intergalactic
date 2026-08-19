import InputNumber from '@semcore/ui/input-number';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample, { defaultProps as baseExampleProps } from './examples/basic_example';
import BasicExampleAddon, { defaultProps as baseExampleAddonProps } from './examples/basic_example_addon';

const meta: Meta<typeof InputNumber> = {
  title: 'Components/InputNumber/Tests',
  component: InputNumber,
};

export default meta;
type Story = StoryObj<typeof InputNumber>;

export const Basic: StoryObj<typeof baseExampleProps> = {
  render: BasicExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    locale: {
      control: { type: 'select' },
      options: ['de', 'ko', 'es'],
    },
    disabledValue: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'invalid', 'valid'],
    },
    max: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    value: {
      control: { type: 'number' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    showControls: {
      control: { type: 'boolean' },
    },
    logChanges: {
      control: { type: 'boolean' },
    },
    controlled: {
      control: { type: 'boolean' },
    },
  },
  args: baseExampleProps,
};

export const BasicAddon: StoryObj<typeof baseExampleAddonProps> = {
  render: BasicExampleAddon,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    locale: {
      control: { type: 'select' },
      options: ['de', 'ko'],
    },
    disabledValue: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    state: {
      control: { type: 'select' },
      options: ['normal', 'invalid', 'valid'],
    },
    max: {
      control: { type: 'number' },
    },
    min: {
      control: { type: 'number' },
    },
    step: {
      control: { type: 'number' },
    },
    value: {
      control: { type: 'number' },
    },
    placeholder: {
      control: { type: 'text' },
    },
    readOnly: {
      control: { type: 'boolean' },
    },
    showControls: {
      control: { type: 'boolean' },
    },
  },
  args: baseExampleAddonProps,
};
