import Switch from '@semcore/switch';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicExample, { defaultProps as BasicProps } from './examples/basic_example';
import BasicWithIconExample, { defaultProps as BasicWithIconProps } from './examples/basic_example_with_icon';
import ExternalLabelExample from './examples/external_label';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch/Documentation',
  component: Switch,
};

export default meta;
type Story = StoryObj<typeof Switch>;

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

export const BasicWithIcon: StoryObj<typeof BasicWithIconProps> = {
  render: BasicWithIconExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l', 'xl'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    theme: {
      control: { type: 'select' },
      options: ['info', 'success', 'blanchedalmond', 'dark-violet', '#3eeb4c'],
    },
  },
  args: BasicWithIconProps,
};

export const ExternalLabel: Story = {
  render: ExternalLabelExample,
};
