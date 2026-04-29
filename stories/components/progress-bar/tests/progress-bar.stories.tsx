import ProgressBar from '@semcore/ui/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllThemesExample from './examples/all-themes';
import CustomizingTheBarExample, { defaultProps as CustomizingTheBarProps } from './examples/customizing_the_bar_with_background';
import CustomizingTheValueExample, { defaultProps as CustomizingTheValueProps } from './examples/customizing_the_value';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Tests',
  component: ProgressBar,
};

export default meta;

export const AllThemes: StoryObj = {
  name: 'All themes',
  render: AllThemesExample,
};

const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['s', 'm', 'l'],
  },
  value: {
    control: { type: 'number' },
  },
  duration: {
    control: { type: 'number' },
  },
  theme: {
    control: { type: 'select' },
    options: ['invert', 'dark', 'violet-100'],
  },
} as const;

export const CustomizingTheBar: StoryObj<typeof CustomizingTheBarProps> = {
  render: CustomizingTheBarExample,
  argTypes: {
    ...commonArgTypes,
  },
  args: CustomizingTheBarProps,
};

export const CustomizingTheValue: StoryObj<typeof CustomizingTheValueProps> = {
  render: CustomizingTheValueExample,
  argTypes: {
    ...commonArgTypes,
  },
  args: CustomizingTheValueProps,
};
