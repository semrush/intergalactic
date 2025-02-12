import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from '@semcore/skeleton';

import SkeletonExampleForChartExample from './examples/skeleton_examples_for_charts';
import TextInitialLoadingExample from './examples/text_initial_loading';
import UsageWithOtherElementsExample from './examples/usage_with_other_elements';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton/Documentation',
  component: Skeleton,
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const SkeletonExampleForChart: Story = {
  render: SkeletonExampleForChartExample,
};

export const TextInitialLoading: Story = {
  render: TextInitialLoadingExample,
};

export const UsageWithOtherElements: Story = {
  render: UsageWithOtherElementsExample,
};
