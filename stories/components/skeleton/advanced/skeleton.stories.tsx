import Skeleton from '@semcore/ui/skeleton';
import type { Meta, StoryObj } from '@storybook/react-vite';

import AllSkeletonExample from './examples/all-skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton/Advanced',
  component: Skeleton,
};

export default meta;

type Story = StoryObj<typeof Skeleton>;

export const AllSkeleton: Story = {
  name: 'All Skeleton',
  render: AllSkeletonExample,
};
