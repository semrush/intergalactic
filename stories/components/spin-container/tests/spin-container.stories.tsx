import SpinContainer from '@semcore/ui/spin-container';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SpinContainerBaseExample, {
  defaultSpinContainerProps,
} from './examples/spin-container-base';

const meta: Meta<typeof SpinContainer> = {
  title: 'Components/SpinContainer/Tests',
  component: SpinContainer,
};

export default meta;

const spinContainerArgTypes = {
  loading: {
    control: { type: 'boolean' },
    description: 'Shows the overlay with the spinner',
  },
  size: {
    control: { type: 'select' },
    options: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
    description: 'Size of the nested Spin',
  },
  theme: {
    control: { type: 'select' },
    options: ['default', 'invert', 'dark'],
    description: 'Overlay and spinner theme (\'dark\' is deprecated, behaves as \'default\')',
  },
  background: {
    control: { type: 'select' },
    options: ['none', 'blanchedalmond', '#3eeb4c', 'dark-violet', 'blue-400'],
    mapping: {
      'none': undefined,
      'blanchedalmond': 'blanchedalmond',
      '#3eeb4c': '#3eeb4c',
      'dark-violet': 'dark-violet',
      'blue-400': 'blue-400',
    },
    description: 'Custom overlay background; overrides the theme background',
  },
  duration: {
    control: { type: 'number' },
    description: 'Fade in/out duration of the overlay, ms',
  },
  advancedMode: {
    control: { type: 'boolean' },
    description: 'Render SpinContainer.Content and SpinContainer.Overlay explicitly',
  },
  overlayText: {
    control: { type: 'text' },
    description: 'Text inside SpinContainer.Overlay (replaces the spinner, advanced mode only)',
  },
  w: { control: { type: 'number' }, description: 'Box prop: width override' },
  h: { control: { type: 'number' }, description: 'Box prop: height override' },
  m: { control: { type: 'number' }, description: 'Box prop: margin' },
  p: { control: { type: 'number' }, description: 'Box prop: padding' },
} as const;

export const SpinContainerBase: StoryObj<typeof defaultSpinContainerProps> = {
  render: SpinContainerBaseExample,
  argTypes: spinContainerArgTypes,
  args: defaultSpinContainerProps,
};
