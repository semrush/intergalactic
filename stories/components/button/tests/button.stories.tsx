import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonBaseExample, { defaultButtonProps } from './examples/button-base';
import ButtonIconOnlyExample, { defaultIconButtonProps } from './examples/button-icon-only';
import ButtonNeighborLocationExample, { defaultButtonNeighborProps } from './examples/button-neighbor-location';
const meta: Meta = {
  title: 'Components/Button/Tests',
};

export default meta;

const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  use: {
    control: { type: 'select' },
    options: ['primary', 'secondary', 'tertiary'],
  },
  theme: {
    control: { type: 'select' },
    options: ['info', 'success', 'brand', 'danger', 'invert'],
  },
  active: {
    control: { type: 'boolean' },
  },
  disabled: {
    control: { type: 'boolean' },
  },
  loading: {
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

export const ButtonBase: StoryObj<typeof defaultButtonProps> = {
  render: ButtonBaseExample,
  argTypes: commonArgTypes,
  args: defaultButtonProps,
};

export const ButtonIconOnly: StoryObj<typeof defaultIconButtonProps> = {
  render: ButtonIconOnlyExample,
  argTypes: commonArgTypes,
  args: defaultIconButtonProps,
};

export const ButtonNeighborLocation: StoryObj<typeof defaultButtonNeighborProps> = {
  render: ButtonNeighborLocationExample,
  argTypes: commonArgTypes,
  args: defaultButtonNeighborProps,
};
