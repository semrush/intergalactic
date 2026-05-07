import type { ButtonProps } from '@semcore/ui/button';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import ButtonBaseExample, { defaultButtonProps } from './examples/button-base';
import ButtonIconOnlyExample, { defaultIconButtonProps } from './examples/button-icon-only';
import ButtonNeighborLocationExample, { defaultButtonNeighborProps } from './examples/button-neighbor-location';
import ButtonWithEllipsisExample, { defaultButtonEllipsisProps } from './examples/button-with-ellipsis';

const meta: Meta = { title: 'Components/Button/Tests' };
export default meta;

// Allowed `theme` per `use`. Mirrors SButton[theme='<use>-<theme>'] in
// semcore/button/src/component/Button/button.shadow.css. First entry = default.
const THEMES = {
  primary: ['info', 'success', 'brand', 'danger', 'invert'],
  secondary: ['muted', 'invert', 'info'],
  tertiary: ['muted', 'invert', 'info'],
} as const satisfies Record<NonNullable<ButtonProps['use']>, ReadonlyArray<NonNullable<ButtonProps['theme']>>>;

type Use = keyof typeof THEMES;

const themeFor = (args: any): ButtonProps['theme'] => {
  const use: Use = args.use ?? 'primary';
  const picked = args[`theme_${use}`];
  return THEMES[use].includes(picked) ? picked : THEMES[use][0];
};

const themeArg = (use: Use) => ({
  name: `theme (${use})`,
  control: { type: 'select' as const },
  options: THEMES[use],
  if: { arg: 'use', eq: use },
});

const commonArgTypes = {
  size: { control: { type: 'select' }, options: ['m', 'l'] },
  use: { control: { type: 'select' }, options: Object.keys(THEMES) },
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
};

export const ButtonBase: StoryObj<typeof defaultButtonProps> = {
  render: (args) => <ButtonBaseExample {...args} theme={themeFor(args)} />,
  argTypes: commonArgTypes,
  args: { ...defaultButtonProps, ...themeDefaults },
};

export const ButtonIconOnly: StoryObj<typeof defaultIconButtonProps> = {
  render: (args) => <ButtonIconOnlyExample {...args} theme={themeFor(args)} />,
  argTypes: commonArgTypes,
  args: { ...defaultIconButtonProps, ...themeDefaults },
};

export const ButtonNeighborLocation: StoryObj<typeof defaultButtonNeighborProps> = {
  render: (args) => <ButtonNeighborLocationExample {...args} theme={themeFor(args)} />,
  argTypes: commonArgTypes,
  args: { ...defaultButtonNeighborProps, ...themeDefaults },
};

const ellipsisHintArgTypes = {
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
  w: { control: { type: 'number' }, description: 'Width of the button text' },
  hintPlacement: { control: { type: 'select' }, options: ['top', 'bottom', 'left', 'right'] },
  hintProps: {
    control: 'select',
    options: ['default', 'false'],
    mapping: { default: undefined, false: false },
  },
} as const;

export const ButtonWithEllipsis: StoryObj<typeof defaultButtonEllipsisProps> = {
  render: (args) => <ButtonWithEllipsisExample {...args} theme={themeFor(args)} />,
  argTypes: ellipsisHintArgTypes,
  args: { ...defaultButtonEllipsisProps, ...themeDefaults },
};
