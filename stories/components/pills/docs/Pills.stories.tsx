import Pills from '@semcore/ui/pills';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/basic_example';
import CustomPillsExample, { defaultProps as CustomPillsProps } from './examples/custom_pills_example';
import TabsExample, { defaultProps as TabExampleProps } from './examples/tabs_example';

const meta: Meta<typeof Pills> = {
  title: 'Components/Pills/Documentation',
  component: Pills,
};

export default meta;

export const BasicUsage: StoryObj<typeof BasicUsageProps> = {
  render: BasicUsageExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    behavior: {
      control: { type: 'select' },
      options: ['manual', 'auto'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: BasicUsageProps,
};

export const Tabs: StoryObj<typeof TabExampleProps> = {
  render: TabsExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    behavior: {
      control: { type: 'select' },
      options: ['manual', 'auto'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: TabExampleProps,
};

export const CustomPills: StoryObj<typeof CustomPillsProps> = {
  render: CustomPillsExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    behavior: {
      control: { type: 'select' },
      options: ['manual', 'auto'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
  args: CustomPillsProps,
};
