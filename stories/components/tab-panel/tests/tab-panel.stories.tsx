import TabPanel from '@semcore/tab-line';
import type { Meta, StoryObj } from '@storybook/react-vite';

import TabPanelItemAddonsExample, { defaultProps as TabPanelItemAddonsProps } from './examples/tab_panel_item_addons_and_props';
import ValueAndDefaultValueExample from './examples/value_and_default_value';

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
  args: TabPanelItemAddonsProps,
};

export const ValueAndDefaultValue: StoryObj<typeof TabPanel> = {
  render: ValueAndDefaultValueExample,
};
