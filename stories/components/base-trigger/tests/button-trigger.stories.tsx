import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseExample, { buttonTriggerBaseExampleProps } from './examples/button-trigger/base';
import NeighborLocationExample, { buttonTriggerNeighborLocationExampleProps } from './examples/button-trigger/neighbor-location';
import AddonExample, { buttonTriggerWithAddonExampleProps } from './examples/button-trigger/with-addons';
import SelectDDMenuExample, { buttonTriggerSelectDDMenuExampleProps } from './examples/button-trigger/with-select-and-dd-menu';

const sharedArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l', undefined],
  },
  state: {
    control: { type: 'select' },
    options: ['normal', 'valid', 'invalid', undefined],
  },
  active: { control: { type: 'boolean' } },
  empty: { control: { type: 'boolean' } },
  placeholder: { control: { type: 'text' } },
  disabled: { control: { type: 'boolean' } },
  loading: { control: { type: 'boolean' } },
  chevron: { control: { type: 'boolean' } },
} as const;

const meta: Meta = {
  title: 'Components/Base Trigger/Test/Button Trigger',
};
export default meta;

export const Base: StoryObj<typeof buttonTriggerBaseExampleProps> = {
  render: BaseExample,
  argTypes: sharedArgTypes,
  args: buttonTriggerBaseExampleProps,
};

export const NeighborLocation: StoryObj<typeof buttonTriggerNeighborLocationExampleProps> = {
  render: NeighborLocationExample,
  argTypes: sharedArgTypes,
  args: buttonTriggerNeighborLocationExampleProps,
};

export const Addon: StoryObj<typeof buttonTriggerWithAddonExampleProps> = {
  render: AddonExample,
  argTypes: sharedArgTypes,
  args: buttonTriggerWithAddonExampleProps,
};

export const SelectDDMenu: StoryObj<typeof buttonTriggerSelectDDMenuExampleProps> = {
  render: SelectDDMenuExample,
  argTypes: sharedArgTypes,
  args: buttonTriggerSelectDDMenuExampleProps,
};
