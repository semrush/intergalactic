import Pills from '@semcore/ui/pills';
import type { Meta, StoryObj } from '@storybook/react-vite';

import BasicUsageExample, { defaultProps as BasicUsageProps } from './examples/basic_example';
import PillsAmountExample, { defaultProps as PillsAmountProps } from './examples/different-amount-of-pills';
import DynamicPillsExample, { defaultProps as DynamicPillsProps } from './examples/dynamic-pills';

const meta: Meta<typeof Pills> = {
  title: 'Components/Pills/Tests',
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

export const PillsAmount: StoryObj<typeof PillsAmountProps> = {
  render: PillsAmountExample,
  argTypes: {
    selected: {
      control: { type: 'boolean' },
    },
  },
  args: PillsAmountProps,
};

export const DynamicPills: StoryObj<typeof DynamicPillsProps> = {
  render: DynamicPillsExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    behavior: {
      control: { type: 'select' },
      options: ['manual', 'auto'],
    },
    label: {
      control: { type: 'text' },
      description: 'Applied through React — triggers a re-render, indicator is recalculated',
    },
    domLabel: {
      control: { type: 'text' },
      description: 'Applied straight to the DOM — no re-render, only ResizeObserver can notice',
    },
  },
  args: DynamicPillsProps,
};
