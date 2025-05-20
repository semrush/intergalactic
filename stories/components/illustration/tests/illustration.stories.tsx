import type { Meta, StoryObj } from '@storybook/react';

import AllIllustrationGeneratedExample from './examples/all-illustration-generated';
import SizesExample from './examples/illustration_sizes';

const meta: Meta = {
  title: 'Components/Illustration/Tests',
};

export default meta;
type Story = StoryObj;

export const AllIllustrationGenerated: Story = {
  render: AllIllustrationGeneratedExample,
};

export const Sizes: Story = {
  render: SizesExample,
};
