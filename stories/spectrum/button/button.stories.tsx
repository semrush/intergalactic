import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import ButtonBaseExample, { defaultButtonProps } from './examples/button_base';
import { themeArg, THEMES } from './themeUtils';

const meta: Meta = { title: 'Spectrum/Button' };
export default meta;

const commonArgTypes = {
  size: { control: { type: 'select' }, options: ['m', 'l'] },
  use: { control: { type: 'select' }, options: Object.keys(THEMES).concat('accent') },
  theme: { table: { disable: true } },
  theme_primary: themeArg('primary'),
  theme_secondary: themeArg('secondary'),
  theme_tertiary: themeArg('tertiary'),
  active: { control: { type: 'boolean' } },
  disabled: { control: { type: 'boolean' } },
  loading: { control: { type: 'boolean' } },
  style: { control: { type: 'select' }, options: [undefined, { backgroundColor: '#191B23' }] },
} as const;

const themeDefaults = {
  theme_primary: THEMES.primary[0],
  theme_secondary: THEMES.secondary[0],
  theme_tertiary: THEMES.tertiary[0],
  theme_accent: THEMES.accent[0],
};

export const ButtonBase: StoryObj<typeof defaultButtonProps> = {
  render: ButtonBaseExample,
  argTypes: commonArgTypes,
  args: { ...defaultButtonProps, ...themeDefaults },
};
