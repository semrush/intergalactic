import Skeleton from '@semcore/ui/skeleton';
import type { Meta, StoryObj } from '@storybook/react-vite';

import ObserveParentSizeExample from './examples/observe-parent-size';
import SkeletonThemesExample, { defaultProps } from './examples/skeleton-themes';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton/Tests',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

const commonArgTypes = {
  placement: {
    theme: { type: 'select' },
    options: ['default', 'invert'],
  },
  amount: {
    control: { type: 'number' },
  },
  duration: {
    control: { type: 'number' },
  },
  w: {
    control: { type: 'number' },
  },
} as const;

export const SkeletonThemes: StoryObj<typeof defaultProps> = {
  render: SkeletonThemesExample,
  argTypes: commonArgTypes,
  args: defaultProps,
};

export const ObserveParentSize: Story = {
  render: ObserveParentSizeExample,
};
