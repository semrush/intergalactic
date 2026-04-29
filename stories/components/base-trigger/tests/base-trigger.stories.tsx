import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseExample, { baseTriggerBaseExampleProps } from './examples/base-trigger/base';
import BaseTriggerExample from './examples/base-trigger/base-trigger';
import NeighborLocationExample, { baseTriggerNeighborLocationExampleProps } from './examples/base-trigger/neighbor-location';
import AddonExample, { baseTriggerWithAddonExampleProps } from './examples/base-trigger/with-addons';
import SelectDDMenuExample, { baseTriggerSelectDDMenuExampleProps } from './examples/base-trigger/with-select-and-dd-menu';
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
} as const;
const meta: Meta = {
  title: 'Components/Base Trigger/Test/Base Trigger',
};
export default meta;
export const Base: StoryObj<typeof baseTriggerBaseExampleProps> = {
  render: BaseExample,
  argTypes: sharedArgTypes,
  args: baseTriggerBaseExampleProps,

};
export const NeighborLocation: StoryObj<typeof baseTriggerNeighborLocationExampleProps> = {
  render: NeighborLocationExample,
  argTypes: sharedArgTypes,
  args: baseTriggerNeighborLocationExampleProps,

};
export const Addon: StoryObj<typeof baseTriggerWithAddonExampleProps> = {
  render: AddonExample,
  argTypes: sharedArgTypes,
  args: baseTriggerWithAddonExampleProps,

};
export const SelectDDMenu: StoryObj<typeof baseTriggerSelectDDMenuExampleProps> = {
  render: SelectDDMenuExample,
  argTypes: sharedArgTypes,
  args: baseTriggerSelectDDMenuExampleProps,

};
export const BaseTrigger: StoryObj = {
  render: BaseTriggerExample,

};
