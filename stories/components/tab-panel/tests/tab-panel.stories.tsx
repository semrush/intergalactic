import TabPanel from '@semcore/ui/tab-line';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TabPanelItemAddonsExample, { defaultProps as TabPanelItemAddonsProps } from './examples/tab_panel_item_addons_and_props';
import ValueAndDefaultValueExample from './examples/value_and_default_value';
import WithUpdateValueExample from './examples/with_update_value';

const meta: Meta<typeof TabPanel> = {
  title: 'Components/TabPanel/Tests',
  component: TabPanel,
};

export default meta;

export const TabPanelItemAddons: StoryObj<typeof TabPanelItemAddonsProps> = {
  render: TabPanelItemAddonsExample,
  argTypes: {
    disabled: {
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
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
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
  args: TabPanelItemAddonsProps,
};

export const ValueAndDefaultValue: StoryObj<typeof TabPanel> = {
  render: ValueAndDefaultValueExample,
};

export const WithUpdateValue: StoryObj<typeof TabPanel> = {
  render: WithUpdateValueExample,
};
