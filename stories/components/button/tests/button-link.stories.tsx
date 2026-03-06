import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonLinkBaseExample, { defaultButtonLinkProps } from './examples/button-link/button-link-base';
import ButtonLinkIconOnlyExample, { defaultButtonLinkIconOnlyProps } from './examples/button-link/button-link-icon-only';
import ButtonLinkInTextExample, { defaultButtonLinkInTextProps } from './examples/button-link/button-link-in-text';
import ButtonLinkSizesAddonsExample, { defaultButtonLinkSizesProps } from './examples/button-link/button-link-sizes-addons';
import ButtonLinkSizesWrapExample from './examples/button-link/button-link-sizes-wrap';
import ButtonLinkWithEllipsisExample, { defaultButtonLinkEllipsisProps } from './examples/button-link/button-link-with-ellipsis';

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
  argTypes: commonArgTypes,
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

const ellipsisArgTypes = {
  ...commonArgTypes,
  ellipsis: {
    control: 'select',
    options: ['true', 'false', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
    mapping: {
      'true': true,
      'false': false,
      'cropPosition:middle': { cropPosition: 'middle' },
      'cropPosition:end': { cropPosition: 'end' },
      'cropPosition:end maxLine:2': { cropPosition: 'end', maxLine: 2 },
      'cropPosition:end maxLine:6': { cropPosition: 'end', maxLine: 6 },
      'cropPosition:middle lastRequiredSymbols:3': { cropPosition: 'middle', lastRequiredSymbols: 3 },
      'cropPosition:middle lastRequiredSymbols:0': { cropPosition: 'middle', lastRequiredSymbols: 0 },
    },
  },
  w: {
    control: { type: 'number' },
    description: 'Width of the button link text',
  },
} as const;

export const ButtonLinkWithEllipsis: StoryObj<typeof defaultButtonLinkEllipsisProps> = {
  render: ButtonLinkWithEllipsisExample,
  argTypes: ellipsisArgTypes,
  args: defaultButtonLinkEllipsisProps,
};

export const ButtonLinkSizesWrap: StoryObj = {
  render: ButtonLinkSizesWrapExample,
};

export const ButtonLinkSizesAddons: StoryObj<typeof defaultButtonLinkSizesProps> = {
  render: ButtonLinkSizesAddonsExample,
  args: defaultButtonLinkSizesProps,
  argTypes: {
    addonLeft: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    addonRight: {
      control: { type: 'select' },
      options: ['icon', 'badge', 'counter', 'spin'],
    },
    use: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
  },
};
