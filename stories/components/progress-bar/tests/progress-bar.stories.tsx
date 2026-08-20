import ProgressBar from '@semcore/ui/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizingTheBarExample, { defaultProps as CustomizingTheBarProps } from './examples/customizing_the_bar_with_background';
import CustomizingTheValueExample, { defaultProps as CustomizingTheValueProps } from './examples/customizing_the_value';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Tests',
  component: ProgressBar,
};

export default meta;

const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['s', 'm', 'l'],
    description: 'Height and border-radius of the bar',
  },
  value: {
    control: { type: 'number' },
    description: 'Progress as a percentage. Omit it to get the indeterminate animated bar',
  },
  duration: {
    control: { type: 'number' },
    description: 'Animation/transition duration in ms',
  },
  theme: {
    control: { type: 'select' },
    options: ['default', 'invert', 'violet-100', 'brand-secondary'],
    description:
      'Built-in themes are `default` (light backgrounds) and `invert` (dark backgrounds). Any other value falls through to the custom-theme path and is resolved as a color token.',
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
