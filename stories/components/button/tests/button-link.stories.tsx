import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonLinkBaseExample, { defaultButtonLinkProps } from './examples/button-link/button-link-base';
import ButtonLinkIconOnlyExample, { defaultButtonLinkIconOnlyProps } from './examples/button-link/button-link-icon-only';
import ButtonLinkInTextExample, { defaultButtonLinkInTextProps } from './examples/button-link/button-link-in-text';
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
  style: {
    control: { type: 'select' },
    options: [undefined, { backgroundColor: '#191B23' }],
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
    options: ['true', 'cropPosition:middle', 'cropPosition:end', 'cropPosition:end maxLine:2', 'cropPosition:end maxLine:6', 'cropPosition:middle lastRequiredSymbols:3', 'cropPosition:middle lastRequiredSymbols:0'],
    mapping: {
      'true': true,
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
  enableHintTriggerRef: {
    control: { type: 'boolean' },
    description: 'Enable triggerRef in hintProps (sets button link as hint trigger)',
  },
  hintProps: {
    control: { type: 'object' },
    description: 'Hint properties (triggerRef is set automatically when enableHintTriggerRef is true)',
  },
} as const;

export const ButtonLinkWithEllipsis: StoryObj<typeof defaultButtonLinkEllipsisProps> = {
  render: ButtonLinkWithEllipsisExample,
  argTypes: ellipsisArgTypes,
  args: defaultButtonLinkEllipsisProps,
};
