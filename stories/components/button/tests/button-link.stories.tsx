import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonLinkBaseExample, { defaultButtonLinkProps } from './examples/button-link/button-link-base';
import ButtonLinkDifferentSizesExample from './examples/button-link/button-link-different-sizes';
import ButtonLinkIconOnlyExample, { defaultButtonLinkIconOnlyProps } from './examples/button-link/button-link-icon-only';
import ButtonLinkInTextExample, { defaultButtonLinkInTextProps } from './examples/button-link/button-link-in-text';

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

export const ButtonLinkDifferentSizes: StoryObj = {
  render: ButtonLinkDifferentSizesExample,
};
