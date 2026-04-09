import type { Meta, StoryObj } from '@storybook/react-vite';

import BaseExample, { defaultLinkTriggerProps } from './examples/link-trigger/base';
import DifferentSizesExample, { defaultLinkTriggerSizesProps } from './examples/link-trigger/link-trigger-different-sizes';
import AddonExample, { linkTriggerWithAddonExampleProps } from './examples/link-trigger/with-addons';
import SelectExample, { linkTriggerSelectExampleProps } from './examples/link-trigger/with-select';

const sharedArgTypes = {
  size: {
    control: { type: 'select' },
    options: [100, 200, 300, 400, 500, 600, 700, 800, undefined],
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

export const Base: StoryObj<typeof defaultLinkTriggerProps> = {
  render: BaseExample,
  argTypes: {
    ...sharedArgTypes,
    text: {
      control: { type: 'text' },
    },
    showAddonLeft: {
      control: { type: 'boolean' },
    },
    showAddonRight: {
      control: { type: 'boolean' },
    },
    addonLeftType: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    addonRightType: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    merged: {
      control: { type: 'boolean' },
    },
    w: {
      control: { type: 'number' },
    },
    hintPlacement: {
      control: { type: 'select' },
      options: ['top', 'bottom', 'left', 'right'],
    },
    hintProps: {
      control: 'select',
      options: ['default', 'false'],
      mapping: {
        default: undefined,
        false: false,
      },
    },
    ellipsis: {
      control: { type: 'select' },
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
      mapping: {
        'false': { ellipsis: false },
        'true': { ellipsis: true },
        'cropPosition:middle': { 'ellipsis:cropPosition': 'middle' },
        'cropPosition:end': { 'ellipsis:cropPosition': 'end' },
        'cropPosition:end maxLine:2': { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 2 },
        'cropPosition:end maxLine:6': { 'ellipsis:cropPosition': 'end', 'ellipsis:maxLine': 6 },
        'cropPosition:middle lastRequiredSymbols:3': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 3 },
        'cropPosition:middle lastRequiredSymbols:0': { 'ellipsis:cropPosition': 'middle', 'ellipsis:lastRequiredSymbols': 0 },
      },
    },
  },
  args: defaultLinkTriggerProps,
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
      options: ['icon', 'badge', 'counter', 'spin', 'none'],
    },
    ellipsis: { control: { type: 'boolean' } },
  },
  args: defaultLinkTriggerSizesProps,
};
