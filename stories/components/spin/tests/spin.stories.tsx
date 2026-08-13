import Spin from '@semcore/ui/spin';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SpinBaseExample, { defaultSpinProps } from './examples/spin-base';

const meta: Meta<typeof Spin> = {
  title: 'Components/Spin/Tests',
  component: Spin,
};

export default meta;

const spinArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
    description: 'Spinner size',
  },
  theme: {
    control: { type: 'select' },
    options: ['default', 'invert', 'dark', 'blue-400', 'red-400', 'blanchedalmond', '#3eeb4c'],
    description: 'Built-in themes (\'default\', \'invert\', deprecated \'dark\') or any custom color',
  },
  centered: {
    control: { type: 'boolean' },
    description: 'Centers the spinner inside its flex parent',
  },
  locale: {
    control: { type: 'select' },
    options: ['en', 'de', 'es', 'fr', 'it', 'ja', 'ko', 'nl', 'pl', 'pt', 'sv', 'tr', 'vi', 'zh'],
    description: 'Locale of the aria-label text',
  },
  w: { control: { type: 'number' }, description: 'Box prop: width override' },
  h: { control: { type: 'number' }, description: 'Box prop: height override' },
  m: { control: { type: 'number' }, description: 'Box prop: margin' },
  p: { control: { type: 'number' }, description: 'Box prop: padding' },
} as const;

export const SpinBase: StoryObj<typeof defaultSpinProps> = {
  render: SpinBaseExample,
  argTypes: spinArgTypes,
  args: defaultSpinProps,
};
