import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseExample, { filterTriggerBaseExampleProps } from './examples/filter-trigger/base';
import SelectExample, { filterTriggerSelectDDMenuExampleProps } from './examples/filter-trigger/select';
import AddonExample, { filterTriggerWithAddonExampleProps } from './examples/filter-trigger/with-addons';

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
  title: 'Components/Base Trigger/Test/Filter Trigger',
};

export default meta;

export const Base: StoryObj<typeof filterTriggerBaseExampleProps> = {
  render: BaseExample,
  argTypes: sharedArgTypes,
  args: filterTriggerBaseExampleProps,
};

export const Addon: StoryObj<typeof filterTriggerWithAddonExampleProps> = {
  render: AddonExample,
  argTypes: sharedArgTypes,
  args: filterTriggerWithAddonExampleProps,
};

export const Select: StoryObj<typeof filterTriggerSelectDDMenuExampleProps> = {
  render: SelectExample,
  argTypes: {
    ...sharedArgTypes,
    ellipsis: { control: { type: 'boolean' } },
    w: { control: { type: 'number' } },
  },
  args: filterTriggerSelectDDMenuExampleProps,
};
