import TabLine from '@semcore/ui/tab-line';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TabLineItemAddonsExample, { defaultProps as TabLineItemAddonsProps } from './examples/tab_line_item_addons_and_props';
import ValueAndDefaultValueExample from './examples/value_and_default_value';
import WithUpdateValueExample from './examples/with_update_value';

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
    behavior: {
      control: { type: 'select' },
      options: ['auto', 'manual'],
    },
    w: {
      control: { type: 'number' },
    },
    ellipsis: {
      control: 'select',
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
      mapping: {
        'false': false,
        'true': true,
        'cropPosition:middle': { cropPosition: 'middle' },
        'cropPosition:end': { cropPosition: 'end' },
        'cropPosition:middle lastRequiredSymbols:3': { cropPosition: 'middle', lastRequiredSymbols: 3 },
        'cropPosition:middle lastRequiredSymbols:0': { cropPosition: 'middle', lastRequiredSymbols: 0 },
      },
    },
  },
  args: TabLineItemAddonsProps,
};

export const ValueAndDefaultValue: StoryObj<typeof TabLine> = {
  render: ValueAndDefaultValueExample,
};

export const WithUpdateValue: StoryObj<typeof TabLine> = {
  render: WithUpdateValueExample,
};
