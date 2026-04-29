import Dot from '@semcore/ui/dot';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllDotsExample from './examples/all-dots';
import SizesAndPositionsExample, { defaultDotProps } from './examples/sizes-and-positions';
import WithCounterSizesAndPositionsExample, {
  defaultCounterDotProps,
} from './examples/with-counter-sizes-and-positions';

const meta: Meta<typeof Dot> = {
  title: 'Components/Dot/Tests',
  component: Dot,
};

export default meta;

export const AllDots: StoryObj = {
  render: AllDotsExample,
};

const commonArgTypes = {
  size: {
    control: { type: 'select' },
    options: ['m', 'l'],
  },
  up: {
    control: { type: 'boolean' },
  },
} as const;

export const SizesAndPositions: StoryObj<typeof defaultDotProps> = {
  render: SizesAndPositionsExample,
  argTypes: commonArgTypes,
  args: defaultDotProps,
};

export const WithCounterSizesAndPositions: StoryObj<typeof defaultCounterDotProps> = {
  render: WithCounterSizesAndPositionsExample,
  argTypes: commonArgTypes,
  args: defaultCounterDotProps,
};
