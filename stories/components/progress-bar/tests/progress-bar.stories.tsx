import ProgressBar from '@semcore/ui/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizingTheBarExample, { defaultProps as CustomizingTheBarProps } from './examples/customizing_the_bar_with_background';
import CustomizingTheValueExample, { defaultProps as CustomizingTheValueProps } from './examples/customizing_the_value';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Tests',
  component: ProgressBar,
};

export default meta;

/** Built-in themes of the root component. Anything else is resolved as a color token. */
const BUILT_IN_THEMES = ['default', 'invert', 'brand'];
/** Colors used to exercise the custom-theme path. */
const COLOR_TOKENS = ['violet-dusty-500', 'pink-400', 'violet-100', 'brand-secondary'];

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
} as const;

export const CustomizingTheBar: StoryObj<typeof CustomizingTheBarProps> = {
  render: CustomizingTheBarExample,
  argTypes: {
    ...commonArgTypes,
    theme: {
      control: { type: 'select' },
      options: [...BUILT_IN_THEMES, ...COLOR_TOKENS],
      description:
        'Built-in themes are `default`, `invert` and `brand`. Any other value falls through to the custom-theme path and is resolved as a color token.',
    },
  },
  args: CustomizingTheBarProps,
};

export const CustomizingTheValue: StoryObj<typeof CustomizingTheValueProps> = {
  render: CustomizingTheValueExample,
  argTypes: {
    ...commonArgTypes,
    // ProgressBar.Value has no built-in themes — its `theme` is always a color token
    theme: {
      control: { type: 'select' },
      options: COLOR_TOKENS,
      description: 'The value is resolved as a color token.',
    },
  },
  args: CustomizingTheValueProps,
};
