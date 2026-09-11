import type { Meta, StoryObj } from '@storybook/react-vite';

import { themeArg, THEMES } from '../tests/themeUtils';
import AllButtonsExample from './examples/all-buttons';
import ButtonPlaygroundExample, { defaultProps as playgroundProps } from './examples/button-playground';

const meta: Meta = {
  title: 'Components/Button/Advanced',
};

export default meta;

export const AllButtons: StoryObj = {
  render: AllButtonsExample,
};

export const ButtonPlayground: StoryObj<typeof playgroundProps> = {
  render: ButtonPlaygroundExample,
  argTypes: {
    use: { control: { type: 'select' }, options: Object.keys(THEMES) },
    theme_primary: themeArg('primary'),
    theme_secondary: themeArg('secondary'),
    theme_tertiary: themeArg('tertiary'),
    size: { control: { type: 'select' }, options: ['m', 'l'] },
    addonLeft: { control: { type: 'boolean' }, name: 'addonLeft (MathPlus)' },
    addonRight: { control: { type: 'boolean' }, name: 'addonRight (ChevronRight)' },
    linkUse: { control: { type: 'select' }, options: ['primary', 'secondary'] },
    linkSize: {
      control: { type: 'select' },
      options: [100, 200, 300, 400, 500, 600, 700, 800],
    },
  },
  args: {
    ...playgroundProps,
    theme_primary: THEMES.primary[0],
    theme_secondary: THEMES.secondary[0],
    theme_tertiary: THEMES.tertiary[0],
  },
};
