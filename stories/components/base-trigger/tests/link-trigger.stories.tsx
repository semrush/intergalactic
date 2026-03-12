import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseExample, { linkTriggerBaseExampleProps } from './examples/link-trigger/base';
import DifferentSizesExample, { defaultLinkTriggerSizesProps } from './examples/link-trigger/link-trigger-different-sizes';
import AddonExample, { linkTriggerWithAddonExampleProps } from './examples/link-trigger/with-addons';
import SelectExample, { linkTriggerSelectExampleProps } from './examples/link-trigger/with-select';

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
  color: {
    control: { type: 'select' },
    options: ['violet', 'blue', 'text-success', undefined],
  },
} as const;

const meta: Meta = {
  title: 'Components/Base Trigger/Test/Link Trigger',
};
export default meta;

export const Base: StoryObj<typeof linkTriggerBaseExampleProps> = {
  render: BaseExample,
  argTypes: sharedArgTypes,
  args: linkTriggerBaseExampleProps,
};

export const Addon: StoryObj<typeof linkTriggerWithAddonExampleProps> = {
  render: AddonExample,
  argTypes: sharedArgTypes,
  args: linkTriggerWithAddonExampleProps,
};

export const Select: StoryObj<typeof linkTriggerSelectExampleProps> = {
  render: SelectExample,
  argTypes: sharedArgTypes,
  args: linkTriggerSelectExampleProps,
};

export const DifferentSizes: StoryObj<typeof defaultLinkTriggerSizesProps> = {
  render: DifferentSizesExample,
  argTypes: {
    ...sharedArgTypes,
    addonLeft: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    addonRight: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    ellipsis: { control: { type: 'boolean' } },
  },
  args: defaultLinkTriggerSizesProps,
};
