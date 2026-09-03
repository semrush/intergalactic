import ProgressBar from '@semcore/ui/progress-bar';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CustomizingTheBarExample, { defaultProps as CustomizingTheBarProps } from './examples/customizing_the_bar_with_background';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar/Tests',
  component: ProgressBar,
};

export default meta;

/** Built-in themes of the root component. Anything else is resolved as a color token. */
const BUILT_IN_THEMES = ['default', 'invert', 'brand'];
/** Colors used to exercise the custom-theme path. */
const COLOR_TOKENS = ['violet-dusty-500', 'pink-400', 'violet-100', 'brand-secondary'];

export const CustomizingTheBar: StoryObj<typeof CustomizingTheBarProps> = {
  render: CustomizingTheBarExample,
  argTypes: {
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
      options: [...BUILT_IN_THEMES, ...COLOR_TOKENS],
      description:
        'Built-in themes are `default`, `invert` and `brand`. Any other value falls through to the custom-theme path and is resolved as a color token.',
    },
    valueTheme: {
      control: { type: 'select' },
      // only custom colors: a built-in theme name is not a color token, so it would
      // leave ProgressBar.Value without a color
      options: [undefined, ...COLOR_TOKENS],
      description:
        'Color token passed to `ProgressBar.Value`. Custom colors only. Deprecated on the component itself — prefer the root `theme`.',
    },
  },
  args: CustomizingTheBarProps,
};
