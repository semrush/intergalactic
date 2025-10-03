import TabLine from '@semcore/ui/tab-line';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TabLineItemAddonsExample, { defaultProps as TabLineItemAddonsProps } from './examples/tab_line_item_addons_and_props';
import ValueAndDefaultValueExample from './examples/value_and_default_value';

const meta: Meta<typeof TabLine> = {
  title: 'Components/TabLine/Tests',
  component: TabLine,
};

export default meta;

export const TabLineItemAddons: StoryObj<typeof TabLineItemAddonsProps> = {
  render: TabLineItemAddonsExample,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['m', 'l'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    underlined: {
      control: { type: 'boolean' },
    },
    selected: {
      control: { type: 'boolean' },
    },
    behavior: {
      control: { type: 'select' },
      options: ['auto', 'manual'],
    },
    w: {
      control: { type: 'number' },
    },
  },
  args: TabLineItemAddonsProps,
};

export const ValueAndDefaultValue: StoryObj<typeof TabLine> = {
  render: ValueAndDefaultValueExample,
};
