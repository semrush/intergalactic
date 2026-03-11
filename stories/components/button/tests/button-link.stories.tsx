import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonLinkBaseExample, { defaultButtonLinkProps } from './examples/button-link/button-link-base';
import ButtonLinkIconOnlyExample, { defaultButtonLinkIconOnlyProps } from './examples/button-link/button-link-icon-only';
import ButtonLinkInTextExample, { defaultButtonLinkInTextProps } from './examples/button-link/button-link-in-text';
import ButtonLinkSizesAddonsExample, { defaultButtonLinkSizesProps } from './examples/button-link/button-link-sizes-addons';
import ButtonLinkSizesWrapExample from './examples/button-link/button-link-sizes-wrap';

const meta: Meta = {
  title: 'Components/Button/Tests/Button Link',
};
export default meta;

const commonArgTypes = {
  size: {
    control: { type: 'number' },
  },
  color: {
    control: { type: 'select' },
    options: ['text-critical', 'violet'],
  },
  use: {
    control: { type: 'select' },
    options: ['primary', 'secondary'],
  },
  active: {
    control: { type: 'boolean' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  hintPlacement: {
    control: { type: 'select' },
    options: ['top', 'bottom', 'left', 'right'],
  },
} as const;

export const ButtonLinkBase: StoryObj<typeof defaultButtonLinkProps> = {
  render: ButtonLinkBaseExample,
  argTypes: {
    ...commonArgTypes,
    text: {
      control: { type: 'text' },
    },
    size: {
      control: { type: 'select' },
      options: [100, 200, 300, 400, 500, 600, 700, 800],
    },
    loading: {
      control: { type: 'boolean' },
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
    ellipsis: {
      control: { type: 'select' },
      options: ['false', 'true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
      mapping: {
        'false': false,
        'true': true,
        'cropPosition:middle': { cropPosition: 'middle' },
        'cropPosition:end': { cropPosition: 'end' },
        'cropPosition:end maxLine:2': { cropPosition: 'end', maxLine: 2 },
        'cropPosition:end maxLine:6': { cropPosition: 'end', maxLine: 6 },
        'cropPosition:middle lastRequiredSymbols:3': { cropPosition: 'middle', lastRequiredSymbols: 3 },
        'cropPosition:middle lastRequiredSymbols:0': { cropPosition: 'middle', lastRequiredSymbols: 0 },
      },
    },
  },
  args: defaultButtonLinkProps,
};

export const ButtonLinkInText: StoryObj<typeof defaultButtonLinkInTextProps> = {
  render: ButtonLinkInTextExample,
  argTypes: commonArgTypes,
  args: defaultButtonLinkInTextProps,
};

export const ButtonLinkIconOnly: StoryObj<typeof defaultButtonLinkIconOnlyProps> = {
  render: ButtonLinkIconOnlyExample,
  argTypes: commonArgTypes,
  args: defaultButtonLinkIconOnlyProps,
};

export const ButtonLinkSizesWrap: StoryObj = {
  render: ButtonLinkSizesWrapExample,
};

export const ButtonLinkSizesAddons: StoryObj<typeof defaultButtonLinkSizesProps> = {
  render: ButtonLinkSizesAddonsExample,
  args: defaultButtonLinkSizesProps,
  argTypes: {
    ...commonArgTypes,
    addonLeft: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    addonRight: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
  },
};
